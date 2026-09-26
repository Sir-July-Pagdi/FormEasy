# Changelog

All notable changes to FormEasy (Form Engine) are listed here, newest first.

## v1.3.0

**Account & Cloud Sync**
- Added optional sign in / sign up with email and password.
- Added **Save form set**, which saves your current roster, grades, attendance and remarks
  to your account under a name you choose.
- Added **Load form set**, which lists your saved sets and loads one back into FormEasy.
- Added a logged-in panel showing the signed-in email, with a **Log out** control.
- Sync errors (failed login, failed save/load) are shown inline instead of failing silently.
- FormEasy remains fully usable without an account: skipping sign-in keeps everything in
  `localStorage` on-device, exactly as before.

## v1.2.1

**CSV Editor**
- Fixed Shift + Arrow range selection. The range now grows and shrinks from a fixed starting cell instead of skipping cells.
- Added keyboard shortcuts for Undo (Ctrl/Cmd + Z) and Redo (Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z).
- Fixed Delete/Backspace so it clears the contents of any selection: a cell, a range, whole rows, whole columns, or everything. It never removes rows or columns.
- Each edit, paste, or clear is now a single undo step. Moving around the grid never adds undo steps.
- Selections are now clearly highlighted, with an outline around the range and a marked starting cell.
- Selecting a whole row or column now covers every cell in it.
- Added keyboard navigation: Arrow keys, Tab / Shift + Tab, and Enter / Shift + Enter.
- Improved cell editing:
  - Enter commits the edit and moves down.
  - Escape cancels the edit and no longer closes the editor.
  - Clicking inside a cell you are editing places the cursor instead of ending the edit.
- Improved Copy / Cut / Paste:
  - Copies as tab-delimited text that pastes correctly into Excel, Numbers, and Google Sheets.
  - Pasting a single value into a selected range fills the whole range.
  - Copy and paste now also work after selecting a row, a column, or all cells.
- Improved touch editing on tablets: tap a cell, row number, or column header to select, and double-tap a cell to edit.

**SF9 Generation**
- Improved learner, adviser, and school head name formatting. Names are printed in uppercase, with recognized degree titles kept in their proper capitalization:
  - EDD → EdD
  - PHD → PhD
  - PSYD → PsyD
  - EDS → EdS
  - DED → DEd
- Adjusted the SF9 certification statement to the intended two-line layout: "This is to certify that the above-named learner has satisfactorily completed the requirements for the" / "grade level indicated."

**General**
- The version number in the sidebar footer now opens this changelog.
- No changes to the SF9 grading computation or the CSV data structure.

## v1.2.0

**Remarks and Comments**
- Added automatic remark suggestions for each term, based on that term's average:
  - Above 97 → Comment 1
  - 75 to 97 → Comments 2 to 61, distributed across the range
  - Below 75 → Comment 62
- Suggestions are in English by default, and an English / Filipino toggle switches their language.
- Teachers can still choose any preset remark, change the language for an individual term, or enter a custom remark.
- The selected remark is printed on the back page of the SF9 PDF.
- Teacher comments are now printed in Cedarville Cursive. The rest of the form stays in Bookman.
- Fixed: saved work from an earlier version now defaults to English suggestions when no language was stored.

**CSV Editor**
- Added an in-app spreadsheet-style CSV editor for Roster, Grades, and Attendance.
- Loads your current FormEasy data for editing, or imports a CSV.
- Supports paste, undo/redo, CSV import, and CSV download.
- Transfers edited data directly back into FormEasy.
- Renamed the CSV controls to Transfer / Edit your data for a clearer workflow.

## v1.1.0

**Dynamic Academic Electives (G11 / G12)**
- Added a **+ Add elective** button per term on Subjects & Electives for G11 and G12 Academic, replacing the fixed list.
- Caps: G11 up to 2 per term and 5 in total; G12 up to 7 / 7 / 4 per term.
- Adding or removing an elective automatically loads the matching pre-generated PDF/JSON variant from that form's `<Grade> Academic variant` folder, or the built-in base template for the prescribed count. A clear message appears if a variant folder isn't hosted with your copy.
- Fixed: the Units column was not drawn for elective rows or the General Average. It now prints correctly for every elective count.

**Effective Communication / Mabisang Komunikasyon (G11 Academic, G11 TechPro)**
- These are now graded as two separate subjects, each with its own T1 / T2 / T3, Final Grade, and Remarks on Subjects & Electives and in the grades CSV.
- On the printed form, each subject prints its own T1 / T2 / T3 on its own row, with Units, Final Grade, and Remarks left blank there.
- The combined row above them prints each term as the average of the two subjects, 6 Units, and an averaged Final Grade and Remarks. Only the combined row counts toward the General Average.
- Fixed: an older "print on whichever row is chosen" step was blanking the combined row's 6-Units cell on every card. It now runs only when a row asks for it.
- Fixed: the "Dear Parents" paragraph could run into the School Head / Adviser names on templates with less room, such as G12 Academic. It now shrinks slightly to fit when needed.

**Branding**
- Added the tagline "Build in seconds. Collect with ease." to the browser tab title and to a short welcome panel on the Select a Form step.
- Added an app icon: favicon, Apple touch icon, and a `manifest.json` with 192 px and 512 px icons, so "Add to Home Screen" uses the FormEasy mark. Icon files are in `assets/`.
- The Select a Form step now mentions that SF10 is on the way, alongside SF9.

## v1.0.0

- Initial release: SF9 report-card generation for G11 and G12, Academic and TechPro, from a class roster and grades/attendance CSVs.
- Download layouts: A5 (front and back page) and A4 landscape.
- Output: separate PDFs in a zip, or one merged PDF.
