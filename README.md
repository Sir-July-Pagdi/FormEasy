# FormEasy

FormEasy is a browser-based DepEd form-filling tool for generating SF9 (Learner’s Report Card) documents for Senior High School. The current release is v1.0.0.

The original implementation described in the previous README is preserved as the v0.0.0 baseline. This release significantly changes the application’s packaging, persistence, rendering, and user workflow while keeping the core purpose of producing SF9 report cards.

# Current Release

Version: v1.0.0
Form: SF9 — Learner’s Report Card
Supported Variants: Grade 11/12, Academic and TechPro
Developer: Sir_JPagdi

SF10 (Form 137) remains planned and is not part of the current release.

# What FormEasy Does

FormEasy takes class and learner data and produces printable SF9 report cards through a browser-based workflow.

# Main Workflow

1. Select Form — choose SF9.
2. Select Template — choose the applicable Grade 11/12 and Academic/TechPro SF9 variant.
3. Subjects & Electives — configure subjects and elective slots using the available DepEd subject/cluster catalog.
4. Class Setup — configure the school/class information required by the selected SF9 template.
5. Roster — import the class roster from CSV.
6. Grades — import learner grades from CSV.
7. Attendance — import monthly attendance from CSV.
8. Remarks & Comments — assign term remarks using the built-in catalog or enter custom text.
9. Preview — select learners and inspect their generated report cards.
10. Download — generate individual PDF files or a ZIP package for multiple selected learners.

# SF9 Support

The current release supports the four SF9 template variants represented by the project:

* Grade 11 Academic
* Grade 11 TechPro
* Grade 12 Academic
* Grade 12 TechPro

The report-card renderer is designed around the actual DepEd template geometry rather than a generic form layout.

# Subjects and Electives

FormEasy includes the project’s DepEd elective catalog for Academic and TechPro subjects and allows elective slots to be configured for the selected template.

The application is template-driven: the number and placement of available subject/elective slots depend on the selected SF9 variant.

# CSV Data

FormEasy uses CSV imports for class data rather than requiring learners to be entered one by one.

## Roster

The roster establishes the master learner list. The expected core fields are:

* LRN
* Name
* DOB
* Sex

## Grades

The grades file uses LRN, Name, and Term 1 / Term 2 / Term 3 values for the configured subjects.

The application can work with subjects whose available term data differs from other subjects.

## Attendance

Attendance uses LRN, Name, and monthly attendance data from June through April.

## Remarks

Remarks are handled inside the application. The current catalog contains preset English and Filipino comments as independent choices, and users may also enter free text.

# Automatic Age Calculation

Age is calculated from the learner’s date of birth using October 31 of the first calendar year of the school year as the reference date.

For example:

* School year: 2026-2027
* Age reference date: October 31, 2026

# Local Workspace Persistence

Version 1.0.0 adds browser-local workspace persistence using IndexedDB.

The current workspace can retain:

* selected form and template
* class setup
* subject/elective configuration
* roster
* grades
* attendance
* remarks
* selected learners
* preview state

This allows the user to close or reload the application without having to re-enter the current workspace.

## Important

This is local browser storage, not cloud synchronization.

The saved workspace belongs to the browser/device and is not automatically shared with another computer, browser, or user.

A clear-workspace function is provided to remove the saved local workspace.

# Report-Card Rendering

The SF9 output is rendered from template layout information derived from the source DepEd spreadsheets.

The renderer preserves template characteristics including:

* page geometry
* row and column positioning
* cell formatting
* borders
* alignment
* merged areas
* embedded logos/images
* learner-specific data placement

The current release uses EB Garamond for report-card text where the original renderer previously relied on Bookman-style font mapping.

The objective is to keep the generated report card visually aligned with the source SF9 template rather than redesigning the form.

# PDF Generation

The application can generate PDF output from the rendered report-card preview.

For multiple selected learners, FormEasy can package the generated PDF files into a ZIP.

The application itself is static and has no backend database or server-side processing.

The current PDF-generation path still uses the configured browser libraries loaded from CDN sources. Therefore, completely offline operation is subject to those PDF-generation dependencies being available.

# Data and Privacy Model

FormEasy is designed as a client-side application.

Class, learner, grade, attendance, and remarks data are processed in the browser. The v1.0.0 workspace persistence feature stores the current workspace locally through IndexedDB.

There is no FormEasy cloud account or cloud database required by the application.

Users should still follow their school’s applicable data-protection and records-handling requirements when working with actual learner information.

# Current Repository Structure

The repository has been simplified around the current single-file application:

    index.html              Main FormEasy application
    templates/              SF9 template/layout resources
    SF9 Sample Data/        Sample CSV datasets for testing
    README                  Project documentation
    CHANGELOG.md            Version history

The current index.html contains the application’s bundled runtime rather than depending on the original multi-file js/, css/, data/, and assets/ structure described by the v0.0.0 README.

# Sample Data

The repository includes an SF9 Sample Data directory containing sample CSV data for testing the supported SF9 variants.

The sample data is intended for development and testing only and does not represent real learners.

# Running FormEasy

Because the current release is a browser application, it can be served from a static web server or static hosting service.

For local testing:

    python3 -m http.server 8080

Then open:

    http://localhost:8080

The application can also be deployed to a static hosting service such as GitHub Pages, Netlify, or Vercel.

# Version History

## v0.0.0

The original FormEasy implementation and documentation.

It established the original SF9 form-filling workflow, template-based rendering approach, CSV imports, elective catalogs, attendance handling, remarks, PDF/ZIP generation, and the initial static multi-file project structure.

## v1.0.0

The current major release.

Major changes include:

* consolidated single-file application packaging
* browser-local IndexedDB workspace persistence
* updated report-card typography using EB Garamond
* revised repository structure
* current SF9 sample-data package
* current SF9 workflow and local workspace handling

# Known Limitations

* The current release is focused on SF9. SF10/Form 137 is not yet implemented.
* Local workspace persistence is browser/device-specific and is not cloud-synchronized.
* PDF generation depends on the configured external browser libraries being available.
* SF9 output should be verified against actual school use before being treated as an authoritative replacement for official DepEd records.
* If DepEd changes an SF9 template, the corresponding template/layout resources will need to be updated and revalidated.

# Credits

FormEasy — developed by Sir_JPagdi.
