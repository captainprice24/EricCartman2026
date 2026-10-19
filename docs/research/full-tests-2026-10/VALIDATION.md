# Expansion validation

Local release checks completed on 19 October 2026:

- ESLint passes; all 41 sets and 740 questions pass schema, duplicate, difficulty-rubric and unchanged answer-cue checks.
- All 35 unit/content tests pass, including independent recalculation of 220 numerical answers, visible-figure inference for all70 abstract challenge answers, all300 verbal review traces and fifteen disjoint full forms.
- All44 Chromium browser checks pass:28 existing checks,11 audit regressions and5 full-test/tool checks. These include every new question and worked answer on desktop and390px phone widths, current-section overview navigation, resume, calculator history reuse, decimal input and accessibility scans.
- Numerical/abstract generators and the fixed-form registry reproduce byte-for-byte. All620 pre-expansion question files retain their content and IDs.
- All60 new verbal keys and180 distractor labels match their independent final blind reviews. Four initially medium items were strengthened. Final verbal reviewer ratings are hard, mostly3/5 with some4/5; no empirical extreme-difficulty claim is established.
- All30 new abstract series/options were visually inspected in both themes. Geometry solvers and option-shortcut checks pass.
- The standalone HTML and cache-version file are regenerated. The shared deployment staging function includes the full-test registry and all question files.

GitHub Actions runs the same suite in Chromium and WebKit and gates publication on success. The local environment provides Chromium; GitHub is the verification environment for WebKit and the actual Pages deployment. Check the workflow run for the pushed commit before treating publication as verified.
