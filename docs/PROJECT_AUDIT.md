# Project audit repair

19 October 2026. All twelve findings from the [original audit](PROJECT_AUDIT_INITIAL.md) have been repaired in the repository. Local verification covers the application and the actual prepared publication artifact. A live GitHub Actions run and Pages deployment remain unverified; changing the workflow and pushing a commit do not establish that the production website updated.

## Repairs and evidence

| Finding | Repair | Verification |
|---|---|---|
| A01: release branch mismatch | Push checks run on every branch; publication is restricted to the repository's current default branch. PRs cannot deploy. | Workflow configuration reviewed against remote default `claude/cool-darwin-kjgme8`. Live run/settings require external verification. |
| A02: missing version file | Deployment and artifact tests share `scripts/prepare-site.mjs`, which includes `version.js`. | Prepared source and standalone load all 620 questions without HTTP failures; source loads the current version and 35 versioned scripts. |
| A03: invalid saved data | Preferences, history, stats and complete sessions are checked before use. Invalid records/keys recover independently with a visible notice. | Nulls, bad JSON, wrong containers, malformed sections/orders/indices, unknown section names and retired question IDs covered; unrelated history preserved. |
| A04: silent saving failures | Persistent saving warning, availability probe and in-memory fallback for failed writes. | Quota-denial browser test completes a round and retains current-tab history while warning about reload/closure loss. |
| A05: modal focus escape | Inert background, Tab/Shift+Tab containment, background-action guard and focus restoration. | Both Tab directions stay inside; background Next cannot change the question; Escape restores End-round focus. |
| A06: table keyboard scrolling | Scroll-region keys retain native behaviour rather than triggering question shortcuts. | Overflowing phone table scrolls with ArrowRight; question index remains unchanged. |
| A07: tooltip dismissal | Explicit focus/hover/click visibility and Escape dismissal preserve trigger focus. | Actual visibility and ARIA state checked after Escape and subsequent re-entry. |
| A08: unchecked practice inconsistency | Shared answer-state policy across results, topic summaries, review navigation and retry coaching; history records checked count. | Five unchecked items show 0/0 checked, five neutral rows, no weak topics or invented mistakes, and neutral review feedback. Exam scoring is unchanged. |
| A09: calculator chaining | Restricted tokenizer accepts scientific literals and limits expression length. | Tiny and large results chain; malformed notation and non-finite results are rejected. |
| A10: abstract lesson mismatch | Lessons say “next frame” and discuss alternating, conditional and previous-frame relationships. | Coaching checked alongside a six-frame challenge series. |
| A11: numerical filler distractors | Templates use explicit mistakes and reject/regenerate unusable layouts. All 150 foundation items regenerated under new IDs with immutable revision fingerprints. | Zero fillers in all 190 questions; every key independently recalculated; option range, rounding, display-value exclusions and key balance pass. |
| A12: verbal taxonomy and scope | Independent blind review of all 200 foundation keys and 600 distractor labels. Corrected 58 original labels and clarified eight items under new IDs. | All final keys/labels match archived reviews and passage/option hashes; zero unresolved reviewer issues; original cue limits retained. |

`tests/repair-e2e.mjs` adds nine browser regression checks to the standard `npm run test:e2e` command. It starts its own local server from the same prepared artifact used for deployment. The existing end-to-end checks continue to cover complete desktop/phone simulations, training, reload/resume, accessibility scans, difficulty controls and challenge rendering.

## Final checks

- ESLint, schema/cue/duplicate validation and deterministic numerical generation pass.
- **31 unit/content tests pass**, including independent numerical calculation for all 190 items and archived verbal review for all 240 items / 720 labels.
- **37 Chromium browser checks pass**: 28 existing checks plus nine audit regressions. Included axe scans pass.
- All **29 sets / 620 questions** validate. Difficulty counts remain verbal 38/105/97, numerical 56/82/52, abstract 29/121/40 (Easy/Medium/Hard).
- Standalone build and `version.js` are rebuilt. The prepared source artifact includes cache versioning and the standalone includes the complete bank.
- Refreshed numerical/verbal inventories, browser probes and whole-bank evidence are saved. The original evidence remains in the `*-before-repair.json` snapshots.
- The full abstract raster check still finds no duplicate option images across 190 questions / 1,940 figures. Twenty-seven foundation answers repeat an earlier stimulus image, which is compatible with cyclic rules.

## Compatibility and remaining verification limits

Existing completed history and valid per-question statistics are kept. Substantively revised questions use new IDs so old answer indices and exposure records cannot grade changed questions. An unfinished round containing retired IDs is discarded with a recovery notice; unrelated history remains. Existing history without a checked-count field keeps its historical denominator because that count cannot be reconstructed reliably.

Independent verbal review was performed by AI reviewers working from passages/options without author keys, not by human trial participants. Difficulty remains editorial, pending first-exposure accuracy/time calibration. Numerical challenge sets contain ten model families with four variants, and abstract challenge sets similarly reuse families. Repeated practice can improve results without measuring transfer to unseen families.

The forty abstract challenge keys have independent visible-figure inference coverage. The 150 older abstract keys have structural, rendering and raster coverage but have not all been independently re-solved in a fresh semantic review. This is a disclosed coverage limit, not a confirmed incorrect-key finding from the original audit.

Local execution uses Node 24 and system Chromium. CI requests Node 20, Chromium and WebKit; WebKit/Firefox binaries are absent locally. Managed Chromium blocks `file://` with `ERR_BLOCKED_BY_ADMINISTRATOR`, so local browser verification uses HTTP. The code remains dependency-free, uses ES5 browser scripts and makes no runtime third-party requests. Official EPSO pages and the production Pages host are outside the environment's network allowlist; current official competition details and live deployment were not independently verified here.

See [evidence and reproduction commands](audit/README.md), [numerical audit](NUMERICAL_AUDIT.md), [verbal audit](VERBAL_AUDIT.md), and [foundation verbal review archive](research/verbal/blind-review/legacy/README.md).
