// FormEasy API Client
// Add this to your existing FormEasy app to enable cloud sync
// Drop this file in your repo (e.g. public/api.js) and include it with <script src="api.js"></script>

const FormEasyAPI = (() => {
  // API base URL — same origin since Worker serves both static assets and API
  const BASE = '';

  let token = localStorage.getItem('formeasy_token') || null;

  function setToken(t) {
    token = t;
    if (t) {
      localStorage.setItem('formeasy_token', t);
    } else {
      localStorage.removeItem('formeasy_token');
    }
  }

  async function request(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(BASE + path, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  // --- Auth ---

  async function signup(email, password) {
    const data = await request('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  }

  async function login(email, password) {
    const data = await request('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  }

  async function logout() {
    try {
      await request('/api/logout', { method: 'POST' });
    } catch (e) { /* ignore */ }
    setToken(null);
  }

  async function me() {
    return request('/api/me');
  }

  // --- Form Sets ---

  async function listSets() {
    return request('/api/sets');
  }

  async function getSet(id) {
    return request(`/api/sets/${id}`);
  }

  async function createSet(title, formData) {
    return request('/api/sets', {
      method: 'POST',
      body: JSON.stringify({ title, form_data: formData }),
    });
  }

  async function updateSet(id, { title, formData }) {
    return request(`/api/sets/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, form_data: formData }),
    });
  }

  async function deleteSet(id) {
    return request(`/api/sets/${id}`, { method: 'DELETE' });
  }

  // --- Session check ---

  function isLoggedIn() {
    return !!token;
  }

  return {
    signup, login, logout, me,
    listSets, getSet, createSet, updateSet, deleteSet,
    isLoggedIn, setToken,
  };
})();
