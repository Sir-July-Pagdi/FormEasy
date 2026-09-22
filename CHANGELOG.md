# Changelog

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

**Branding**
- New tagline: "Build in seconds. Collect with ease." (browser tab title and a short welcome
  panel on the Select a Form step explaining what FormEasy does).
- Added a proper app icon: favicon, Apple touch icon, and a `manifest.json` with 192px/512px
  icons so "Add to Home Screen" uses the FormEasy mark instead of a generic icon.
- "Select a Form" step now mentions SF10 is on the way, alongside SF9.

## v1.0.0

- Initial release: SF9 report-card generation for G11/G12, Academic and TechPro, from a class
  roster and grades/attendance CSVs. A5 (front/back page) and A4 landscape download layouts,
  separate-PDFs-in-a-zip or one merged PDF.
