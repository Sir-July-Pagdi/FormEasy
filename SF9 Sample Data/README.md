# FormEasy

**Build in seconds. Collect with ease.**

FormEasy turns a class roster and a grades CSV into ready-to-print DepEd report cards —
correct fonts, lines and layout, matching the official form exactly. SF9 is supported today;
SF10 and other DepEd forms are on the way.

Everything runs in the browser. Nothing is uploaded to a server — your roster, grades and
remarks are kept on your own device (`localStorage`) until you clear them.

## Using it

1. Open `index.html` (works as a local file, or served from a web address — see "Templates"
   below for the difference).
2. **Select a Form** — pick the grade level and track (Academic or TechPro).
3. **Template** — the form's blank PDF is loaded automatically.
4. **Subjects & Electives** — confirm core subjects, then choose the electives. For Grade 11
   and Grade 12 Academic, use **+ Add elective** to add more per term, within each form's caps
   (see below). Effective Communication and Mabisang Komunikasyon are graded separately here.
5. **Class Setup** — School Year, Section, Grade, School Head, Adviser, Track.
6. **Roster** — upload the master roster CSV (LRN, Name, DOB, Sex).
7. **Grades, Attendance & Remarks** — upload grades and attendance CSVs (templates are
   downloadable from this step), set school days per month, and write per-term remarks.
8. **Preview & Download** — check a learner's card, then download as separate PDFs (zipped)
   or one merged PDF, in either A5 (front/back pages) or A4 landscape layout.

## Templates

Each form is a PDF + JSON pair with the same name (`templates/g11_academic.pdf` /
`templates/g11_academic.json`, etc.). The JSON says where each field, table row and box sits
on the PDF, in points measured from the top-left.

- When FormEasy is opened from a web address, it fetches the PDF/JSON pair for the current
  template from the `templates/` folder next to `index.html`. Replace a file there (and
  regenerate its matching JSON) to change a form's layout without rebuilding the app.
- When opened as a local file, or if those files are missing, FormEasy falls back to the
  copies built into `index.html`.

### Dynamic Academic electives

G11 and G12 Academic no longer ship one PDF per elective combination. Instead:

- The **base template** (the prescribed elective count — 3 for G11, 12 for G12) is always the
  built-in copy.
- Any other combination is fetched from a **variant folder** next to `index.html`:
  `templates/G11 Academic variant/` and `templates/G12 Academic variant/`, named
  `g11_academic_<T1>-<T2>-<T3>.pdf` / `.json`. These are pre-generated for every valid
  combination and are **not** built into `index.html` — they only work when FormEasy is served
  from the address hosting that folder.
- Caps: G11 Academic allows up to 2 electives per term, 5 total. G12 Academic allows up to 7
  in Term 1, 7 in Term 2, 4 in Term 3.

TechPro electives are still a fixed set for now.

### Effective Communication / Mabisang Komunikasyon (G11 Academic and G11 TechPro)

These are graded as two separate subjects — each with its own T1/T2/T3, Final Grade and
Remarks entry — but printed as three rows on the form:

- **Effective Communication** and **Mabisang Komunikasyon** each print their own actual T1/T2/T3
  grades. Units, Final Grade and Remarks are left blank on these two rows.
- The combined **"Effective Communication /Mabisang Komunikasyon"** row prints each term as the
  average of the two subjects, 6 Units, a Final Grade averaged from the two subjects' finals,
  and the matching Remarks. Only this combined row counts toward General Average.

## App icon / Add to Home Screen

`index.html` links `manifest.json` and expects `favicon.ico`, `apple-touch-icon.png`,
`icon-192.png` and `icon-512.png` inside an `assets/` folder next to it. Keep those in place so
"Add to Home Screen" picks up the FormEasy mark instead of a generic icon.

## Development notes

- `config.js` — template metadata and the cell bindings measured from each SF9 workbook.
- `pdfgen.js` — loads a template's PDF + JSON spec and draws grades onto it with pdf-lib.
- `app.js` — UI state, CSV parsing, the Subjects & Electives step (including dynamic elective
  add/remove), and wiring the above two together.

Changes are tracked in [CHANGELOG.md](CHANGELOG.md).
