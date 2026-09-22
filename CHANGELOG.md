# Changelog

All notable FormEasy documentation and implementation milestones are recorded here.

## [v1.0.0] — Current consolidated implementation

### Added

- Consolidated the FormEasy README around the current SF9 workflow.
- Documented support for Grade 11 and Grade 12 Academic and TechPro SF9 templates.
- Documented the end-to-end workflow: form selection, template selection, subject configuration, class setup, roster import, grades, attendance, remarks, preview, and export.
- Documented CSV expectations for roster, grades, and attendance imports.
- Added links to the fictional SF9 sample data pack and explained how to use it.
- Documented the static browser architecture, local HTTP-server requirement, deployment options, project structure, and CDN dependencies.
- Added explicit versioning guidance and a limitations section for operational review.
- Created this changelog to make the project transition auditable.

### Current implementation

- Supports SF9 (Learner's Report Card) for four variants:
  - Grade 11 — Academic
  - Grade 11 — TechPro
  - Grade 12 — Academic
  - Grade 12 — TechPro
- Supports DepEd Academic and TechPro elective catalogs.
- Imports roster, grades, and June–April attendance data from CSV files.
- Provides preset English and Filipino remarks plus free-text comments.
- Renders template-derived, two-page report-card previews in the browser.
- Exports individual PDFs for small selections and a ZIP for larger selections.
- Calculates age as of October 31 in the first year of the school year.

### Notes

- SF10 (Form 137) remains planned and is not included in v1.0.0.
- The General Average uses a units-weighted calculation based on each subject's available-term average.
- The female learner row offsets and generated output should be verified against actual school data before operational use.
- Source template changes from DepEd require corresponding layout-data updates.

## [v0.0.0] — Original README/project baseline

The v0.0.0 baseline is the original README and project description. It established FormEasy as a DepEd SF9 form-filling tool and described the initial implementation, including:

- SF9 support for Grade 11 and Grade 12 Academic and TechPro tracks.
- The planned SF10 slot in the form-selection screen.
- Template-derived pixel-accurate rendering using extracted layout JSON data.
- CSV-based roster, grades, and attendance workflows.
- Per-learner remarks and comments.
- Browser preview and PDF/ZIP export.
- Local HTTP serving and static-host deployment instructions.
- The initial project structure and known limitations.

## Transition from v0.0.0 to v1.0.0

v1.0.0 is a consolidation and documentation milestone rather than a claim that every planned form is complete. The current SF9 implementation remains the product scope; the principal change is that the README now presents the implementation as a coherent, versioned workflow and makes its input formats, deployment model, limitations, sample data, and operational cautions explicit.

No SF10 functionality is added by this transition. Existing SF9 behavior should be treated as the v1.0.0 implementation baseline.
