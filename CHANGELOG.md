# Changelog

## v1.2.0

**Remarksand Comments System**
- Mapping:
- > 97 → Comment 1
75–97 → Comments 2–61 distributed across the range
< 75 → Comment 62
- Default automatic suggestion language is English.
- English / Filipino toggle changes the language of automatic suggestions.
- Teacher can still:
choose any preset remark,
switch an individual term's language,
enter a custom remark.
- The automatically selected suggestion is actually passed into the printed SF9 PDF.
- Existing saved states are protected: missing remarkSuggestionLang is automatically restored to English.
- Cedarville Cursive is now used for the teacher comments only, in the updated `index.html` below. I generated a test PDF from it and checked the back page. The comments render in cursive, and the rest of the form is still Bookman.

**Spreadsheet CSV Editor**
- In-app Excel-style CSV editor for Roster, Grades, and Attendance.
- Editing of existing and imported FormEasy data.
- Paste, drag-fill, resize, row/column operations, undo/redo, and context menu.
- CSV import/export.
- Direct transfer of edited data back into FormEasy.
- Updated CSV controls to Transfer / Edit your data for a clearer workflow.

## v1.1.0

**Dynamic Academic electives (G11/G12)**
- Subjects & Electives now has a **+ Add elective** button per term for G11 and G12 Academic,
  in place of a fixed list. Caps: G11 up to 2 per term / 5 total; G12 up to 7 / 7 / 4 per term.
- Adding or removing an elective automatically loads the matching pre-generated PDF/JSON
  variant from that form's `<Grade> Academic variant` folder (or the built-in base template,
  for the prescribed count). Clear message if a variant folder isn't hosted with this copy.
- Fixed: the Units column wasn't being drawn for elective rows or General Average; both are
  now drawn correctly for every elective count, not just the prescribed default.

**Effective Communication / Mabisang Komunikasyon (G11 Academic, G11 TechPro)**
- These are now graded as two separate subjects, each with its own T1/T2/T3, Final Grade and
  Remarks entry on the Subjects & Electives step and in the grades CSV.
- On the printed form: each subject prints its own actual T1/T2/T3 on its own row (Units,
  Final Grade and Remarks left blank there). The combined row above them prints each term as
  the average of the two subjects, 6 Units, and a Final Grade/Remarks averaged from the two.
  Only the combined row counts toward General Average.
- Fixed: an older "print on whichever row is chosen" step (from before these were split into
  two always-printed rows) was still running and was blanking the combined row's own 6-Units
  cell on every card. It now only acts when a row actually asks for it.
- Fixed: the "Dear Parents" intro paragraph (reflowed to the printed width in this version)
  could run into the School Head / Adviser names on templates with less room above them, such
  as G12 Academic. It now shrinks slightly to fit whenever a template needs it to.

**Branding**
- New tagline: "Build in seconds. Collect with ease." (browser tab title and a short welcome
  panel on the Select a Form step explaining what FormEasy does).
- Added a proper app icon: favicon, Apple touch icon, and a `manifest.json` with 192px/512px
  icons so "Add to Home Screen" uses the FormEasy mark instead of a generic icon. Icon files
  live in `assets/`.
- "Select a Form" step now mentions SF10 is on the way, alongside SF9.

## v1.0.0

- Initial release: SF9 report-card generation for G11/G12, Academic and TechPro, from a class
  roster and grades/attendance CSVs. A5 (front/back page) and A4 landscape download layouts,
  separate-PDFs-in-a-zip or one merged PDF.
