// FormEasy Worker — Authentication + Form Set Storage
// Uses D1 (binding: DB) for user accounts and form sets
// Password hashing uses Web Crypto API (PBKDF2)

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// --- Helpers ---

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

async function hashPassword(password, saltHex) {
  const salt = saltHex
    ? hexToBytes(saltHex)
    : crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return {
    salt: bytesToHex(salt),
    hash: bytesToHex(new Uint8Array(hash)),
  };
}

async function verifyPassword(password, saltHex, hashHex) {
  const { hash } = await hashPassword(password, saltHex);
  return hash === hashHex;
}

function hexToBytes(hex) {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    arr[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return arr;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateToken() {
  const arr = crypto.getRandomValues(new Uint8Array(32));
  return bytesToHex(arr);
}

// Simple session token store — tokens are stored in D1
async function createSession(db, userId) {
  const token = generateToken();
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  await db.prepare(
    'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)'
  ).bind(token, userId, expires).run();
  return token;
}

async function getUserFromToken(db, token) {
  if (!token) return null;
  const session = await db.prepare(
    'SELECT user_id, expires_at FROM sessions WHERE token = ?'
  ).bind(token).first();
  if (!session) return null;
  if (Date.now() > session.expires_at) {
    await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    return null;
  }
  const user = await db.prepare(
    'SELECT id, email FROM users WHERE id = ?'
  ).bind(session.user_id).first();
  return user;
}

function getAuthToken(request) {
  const auth = request.headers.get('Authorization');
  if (auth && auth.startsWith('Bearer ')) {
    return auth.slice(7);
  }
  // Also check cookie
  const cookie = request.headers.get('Cookie');
  if (cookie) {
    const match = cookie.match(/formeasy_token=([^;]+)/);
    if (match) return match[1];
  }
  return null;
}

// --- Route Handlers ---

// POST /api/signup — { email, password }
async function handleSignup(db, request) {
  const { email, password } = await request.json();
  if (!email || !password) return json({ error: 'Email and password required' }, 400);
  if (password.length < 6) return json({ error: 'Password must be at least 6 characters' }, 400);

  const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (existing) return json({ error: 'Email already registered' }, 409);

  const { salt, hash } = await hashPassword(password);
  const result = await db.prepare(
    'INSERT INTO users (email, password_salt, password_hash) VALUES (?, ?, ?)'
  ).bind(email, salt, hash).run();

  const userId = result.meta.last_row_id;
  const token = await createSession(db, userId);
  return json({ token, user: { id: userId, email } });
}

// POST /api/login — { email, password }
async function handleLogin(db, request) {
  const { email, password } = await request.json();
  if (!email || !password) return json({ error: 'Email and password required' }, 400);

  const user = await db.prepare(
    'SELECT id, email, password_salt, password_hash FROM users WHERE email = ?'
  ).bind(email).first();
  if (!user) return json({ error: 'Invalid email or password' }, 401);

  const valid = await verifyPassword(password, user.password_salt, user.password_hash);
  if (!valid) return json({ error: 'Invalid email or password' }, 401);

  const token = await createSession(db, user.id);
  return json({ token, user: { id: user.id, email: user.email } });
}

// POST /api/logout
async function handleLogout(db, request) {
  const token = getAuthToken(request);
  if (token) {
    await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
  }
  return json({ success: true });
}

// GET /api/me — get current user
async function handleMe(db, request) {
  const token = getAuthToken(request);
  const user = await getUserFromToken(db, token);
  if (!user) return json({ error: 'Not authenticated' }, 401);
  return json({ user });
}

// GET /api/sets — list all form sets for current user
async function handleListSets(db, request) {
  const token = getAuthToken(request);
  const user = await getUserFromToken(db, token);
  if (!user) return json({ error: 'Not authenticated' }, 401);

  const sets = await db.prepare(
    'SELECT id, title, created_at, updated_at FROM form_sets WHERE user_id = ? ORDER BY updated_at DESC'
  ).bind(user.id).all();
  return json({ sets: sets.results });
}

// GET /api/sets/:id — get a specific form set
async function handleGetSet(db, request, setId) {
  const token = getAuthToken(request);
  const user = await getUserFromToken(db, token);
  if (!user) return json({ error: 'Not authenticated' }, 401);

  const set = await db.prepare(
    'SELECT id, title, form_data, created_at, updated_at FROM form_sets WHERE id = ? AND user_id = ?'
  ).bind(setId, user.id).first();
  if (!set) return json({ error: 'Form set not found' }, 404);
  return json({ set });
}

// POST /api/sets — create a new form set { title, form_data }
async function handleCreateSet(db, request) {
  const token = getAuthToken(request);
  const user = await getUserFromToken(db, token);
  if (!user) return json({ error: 'Not authenticated' }, 401);

  const { title, form_data } = await request.json();
  if (!title) return json({ error: 'Title is required' }, 400);

  const dataStr = typeof form_data === 'string' ? form_data : JSON.stringify(form_data);
  const result = await db.prepare(
    'INSERT INTO form_sets (user_id, title, form_data) VALUES (?, ?, ?)'
  ).bind(user.id, title, dataStr).run();

  const setId = result.meta.last_row_id;
  return json({ id: setId, title, form_data: dataStr });
}

// PUT /api/sets/:id — update a form set { title?, form_data? }
async function handleUpdateSet(db, request, setId) {
  const token = getAuthToken(request);
  const user = await getUserFromToken(db, token);
  if (!user) return json({ error: 'Not authenticated' }, 401);

  const existing = await db.prepare(
    'SELECT id FROM form_sets WHERE id = ? AND user_id = ?'
  ).bind(setId, user.id).first();
  if (!existing) return json({ error: 'Form set not found' }, 404);

  const body = await request.json();
  const updates = [];
  const binds = [];
  if (body.title) { updates.push('title = ?'); binds.push(body.title); }
  if (body.form_data) {
    const dataStr = typeof body.form_data === 'string' ? body.form_data : JSON.stringify(body.form_data);
    updates.push('form_data = ?'); binds.push(dataStr);
  }
  updates.push('updated_at = ?'); binds.push(Date.now());

  if (updates.length > 1) {
    binds.push(setId);
    await db.prepare(
      `UPDATE form_sets SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...binds).run();
  }
  return json({ success: true });
}

// DELETE /api/sets/:id — delete a form set
async function handleDeleteSet(db, request, setId) {
  const token = getAuthToken(request);
  const user = await getUserFromToken(db, token);
  if (!user) return json({ error: 'Not authenticated' }, 401);

  const existing = await db.prepare(
    'SELECT id FROM form_sets WHERE id = ? AND user_id = ?'
  ).bind(setId, user.id).first();
  if (!existing) return json({ error: 'Form set not found' }, 404);

  await db.prepare('DELETE FROM form_sets WHERE id = ?').bind(setId).run();
  return json({ success: true });
}

// --- Main Worker ---

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const db = env.DB;

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // --- API Routes ---
    if (path === '/api/signup' && method === 'POST') {
      return handleSignup(db, request);
    }
    if (path === '/api/login' && method === 'POST') {
      return handleLogin(db, request);
    }
    if (path === '/api/logout' && method === 'POST') {
      return handleLogout(db, request);
    }
    if (path === '/api/me' && method === 'GET') {
      return handleMe(db, request);
    }
    if (path === '/api/sets' && method === 'GET') {
      return handleListSets(db, request);
    }
    if (path === '/api/sets' && method === 'POST') {
      return handleCreateSet(db, request);
    }

    // /api/sets/:id routes
    const setMatch = path.match(/^\/api\/sets\/(\d+)$/);
    if (setMatch) {
      const setId = parseInt(setMatch[1]);
      if (method === 'GET') return handleGetSet(db, request, setId);
      if (method === 'PUT') return handleUpdateSet(db, request, setId);
      if (method === 'DELETE') return handleDeleteSet(db, request, setId);
    }

        // --- Static assets (your HTML/CSS/JS) ---
    // Pass through to the static asset handler, then add no-cache header
    const assetResponse = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(assetResponse.headers);
    newHeaders.set('Cache-Control', 'no-cache');
    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers: newHeaders,
    });
  },
};
  
