# Changelog

All notable changes to FormEasy are documented in this file.

The project uses the following version history:

* v0.0.0 — original FormEasy implementation and documented baseline
* v1.0.0 — current major release

⸻

# [1.0.0] — Current Release

## Overview

Version 1.0.0 is the first major revision of FormEasy after the original v0.0.0 implementation.

The core purpose remains the same: provide a browser-based tool for preparing and generating DepEd Senior High School SF9 Learner’s Report Cards.

## Application Architecture

* Consolidated the application into the current single-file index.html implementation.
* Moved away from the original multi-file runtime structure documented in v0.0.0.
* Kept the application suitable for static hosting.
* Retained the SF9 template-driven rendering approach.

## SF9 Support

* Continued support for:
    * Grade 11 Academic
    * Grade 11 TechPro
    * Grade 12 Academic
    * Grade 12 TechPro
* Retained the existing SF9 workflow for:
    * form selection
    * template selection
    * subjects and electives
    * class setup
    * roster
    * grades
    * attendance
    * remarks and comments
    * preview
    * PDF generation
    * ZIP generation

## Local Workspace Persistence

* Added IndexedDB persistence for the current FormEasy workspace.
* Added persistence for the application’s current state, including:
    * selected form
    * selected template
    * class setup
    * subject/elective configuration
    * roster
    * grades
    * attendance
    * remarks
    * selected learners
    * preview state
* Added restoration of the saved workspace when the application is reopened.
* Added a function to clear the saved local workspace.
* Workspace persistence remains local to the browser/device and does not provide cloud synchronization.

## Typography

* Replaced the previous Bookman-style report-card font mapping with EB Garamond.

## Data Input

* Continued CSV-based roster, grade, and attendance workflows.
* Retained monthly attendance support from June through April.
* Retained term-based grade input.
* Retained preset English and Filipino remarks together with free-text remarks.

## Age Calculation

* Retained automatic age calculation based on the learner’s DOB.
* The reference date is October 31 of the first calendar year of the school year.

## Sample Data

* Added the current SF9 Sample Data repository package.
* Included sample datasets for testing the supported SF9 variants.
* Sample learners are fictional and intended only for testing.

## Repository Documentation

* Reworked the root README to document the current v1.0.0 architecture and workflow.
* Added this changelog to distinguish the original v0.0.0 baseline from the v1.0.0 implementation.

⸻

# [0.0.0] — Original Baseline

Version 0.0.0 represents the original FormEasy implementation as documented by the project’s previous README.

## Initial Form Support

* Introduced FormEasy as a DepEd form-filling tool.
* Supported SF9 — Learner’s Report Card.
* Supported Grade 11 and Grade 12.
* Supported Academic and TechPro tracks.
* Reserved a planned slot for future SF10/Form 137 support.

## Original Workflow

Established the original workflow:

1. Select Form
2. Select Template
3. Subjects & Electives
4. Class Setup
5. Roster
6. Grades
7. Attendance
8. Remarks & Comments
9. Preview
10. Download

## Template-Based Rendering

* Established the template-driven SF9 rendering approach.
* Used layout information extracted from the source DepEd SF9 templates.
* Preserved template geometry, formatting, borders, alignment, merged ranges, and embedded logos/images.
* Used the extracted layout information to produce a pixel-oriented browser rendering.

## CSV Import

Established CSV-based data import for:

* learner roster
* grades
* attendance

The original documented roster fields were:

* LRN
* Name
* DOB
* Sex

The original documented attendance period was June through April.

## Subjects and Electives

* Introduced the Academic and TechPro elective catalog.
* Supported configuration of elective slots through the application’s subject-selection workflow.
* Used the official HELPER-sheet-derived catalog described in the original README.

## Remarks

* Introduced preset remarks/comments.
* Included English and Filipino comment lists.
* Supported free-text remarks.

## PDF and ZIP Output

* Introduced browser-based PDF generation.
* Supported individual PDF downloads.
* Supported packaging multiple generated report cards into a ZIP.

## Original Project Structure

The original implementation used a multi-file static application structure containing separate:

* HTML
* CSS
* JavaScript
* JSON data
* image assets
* font assets
* source XLSX templates

The original README documented files such as:

* css/style.css
* js/config.js
* js/renderer.js
* js/app.js
* data/electives_catalog.json
* data/remarks_catalog.json
* data/layout/*.json
* assets/images/
* assets/fonts/
* assets/templates/*.xlsx

## Original Limitations

The original README documented limitations and verification requirements including:

* female roster row offsets requiring verification against real classes
* CDN dependencies
* General Average calculation behavior
* the need to re-extract layout information if DepEd revised the SF9 templates

⸻

# Versioning Note

v0.0.0 is the historical baseline.

v1.0.0 represents the current FormEasy implementation.

Future changes should be recorded under a new version rather than modifying the historical v0.0.0 entry.
