# FormEasy

FormEasy is a browser-based DepEd form-filling tool for preparing **SF9 (Learner's Report Card)** documents for Grade 11 and Grade 12 Academic and TechPro tracks.

> **Current version: v1.0.0**  
> See [`CHANGELOG.md`](CHANGELOG.md) for the version history and the transition from the original v0.0.0 baseline.

## Current scope

- **SF9** is supported for four template variants:
  - Grade 11 — Academic
  - Grade 11 — TechPro
  - Grade 12 — Academic
  - Grade 12 — TechPro
- **SF10 (Form 137)** is planned. The form-selection interface includes a reserved slot for it, but it is not yet implemented.
- FormEasy is a static, client-side application. Learner data is processed in the browser and there is no application backend.

## Workflow

1. **Select Form** — choose SF9.
2. **Select Template** — choose the exact grade and track variant.
3. **Configure Subjects and Electives** — choose the applicable DepEd elective cluster and subject for each elective slot. The catalog includes 5 Academic clusters with 80 subjects and 11 TechPro clusters with 49 subjects.
4. **Class Setup** — review class information, which can be pre-filled from the selected template's `INPUT DATA` sheet.
5. **Import Roster** — upload one CSV containing each learner's LRN, name, date of birth, and sex. This becomes the master learner list.
6. **Import Grades and Attendance** — upload the configured subject grades and monthly attendance data.
7. **Add Remarks and Comments** — choose from preset English or Filipino comments, or enter free text, per learner and term.
8. **Preview and Download** — preview a learner's two-page report card, then download PDFs individually for up to five selected learners or as a ZIP for larger selections.

Age is calculated from the learner's date of birth as of **October 31 of the first year in the school year**. For example, school year `2026-2027` uses October 31, 2026.

## CSV inputs

Use the learner's **LRN** as the stable identifier in every import. The expected data is:

- **Roster:** LRN, name, date of birth, and sex.
- **Grades:** LRN, name, then Term 1, Term 2, and Term 3 columns for every configured subject.
- **Attendance:** LRN, name, then monthly columns from June through April.

The sample data pack in [`SF9 Sample Data/`](SF9%20Sample%20Data/) contains fictional data for all four supported templates. Configure or enable the subjects listed in the relevant `grades.csv` before importing it.

## Pixel-accurate SF9 rendering

The layouts in `data/layout/` were extracted from the source DepEd SF9 templates rather than designed from scratch. They preserve column widths, row heights, cell fonts, borders, alignment, merged ranges, and the browser positions of the embedded school and DepEd logos.

The renderer replays that layout data as positioned HTML. The application then fills only the cells that contain learner-specific information, such as names, LRNs, grades, attendance, and remarks.

## Run locally

Do not open `index.html` directly with the `file://` protocol. Browsers block the local `fetch()` requests used for JSON, images, and templates. Start a local HTTP server from the project directory instead:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then open <http://localhost:8080>.

## Deploy

FormEasy has no build step or backend. It can be deployed as-is to GitHub Pages, Netlify, Vercel, or another static host. For GitHub Pages, publish the repository root from the `main` branch (or the branch configured for Pages).

The PDF and ZIP export features use JSZip, html2canvas, and jsPDF from cdnjs. The first load in a fresh browser cache therefore requires internet access unless those dependencies are provided locally.

## Project structure

```text
index.html                         Application entry point
css/style.css                      Application styling and self-hosted Montserrat fonts
js/config.js                       Template definitions, bindings, loaders, and age calculation
js/renderer.js                     Excel-layout specification to HTML renderer
js/app.js                          State, UI wiring, CSV parsing, and PDF/ZIP generation
data/electives_catalog.json        Academic and TechPro elective catalog
data/remarks_catalog.json          Preset English and Filipino remarks
data/layout/*.json                 Extracted per-template layout data
assets/images/                      Logo images extracted from source templates
assets/fonts/                       Montserrat static weights
assets/templates/*.xlsx            Source SF9 templates used for class-data prefill
SF9 Sample Data/                    Fictional sample CSV data for testing
```

## Important limitations

- Verify the female learner row offsets against a real class before using generated report cards operationally. The offsets were measured from and cross-checked against the four source templates, but real-world verification is still recommended.
- The General Average is calculated as a units-weighted average of each subject's available-term average. It follows the intended template behavior but is not a byte-for-byte replay of spreadsheet formulas.
- If DepEd changes the SF9 templates, the layout JSON files and related source assets will need to be extracted or updated.
- Generated documents should be reviewed against official requirements before distribution. FormEasy is a preparation and export aid, not a replacement for school validation procedures.

## Versioning

- **v0.0.0** — original README and project baseline.
- **v1.0.0** — current consolidated FormEasy implementation and documentation baseline.

The detailed transition is recorded in [`CHANGELOG.md`](CHANGELOG.md).

## Credits

FormEasy was developed by **Sir_JPagdi**.
