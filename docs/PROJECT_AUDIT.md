# Full project audit

19 October 2026 · audited application commit `ef17a7f3e96da78a40817dfc17ecc7b6dd4a962c`.

The application works across its main flows, and the existing automated suite passes. However, it has a release configuration blocker, reproducible persistence and keyboard defects, inconsistent practice feedback and remaining content-quality debt. It should not yet be described as a fully validated measure of exam readiness.

This audit records **12 open findings: one P1 and eleven P2**. No critical issue or substantiated remote-code-execution/data-exfiltration vulnerability was found in this review. That is a bounded review result, not a guarantee of security. Application behaviour and question content were preserved; the deliverables are this report, evidence and reproducible audit scripts.

## Findings by priority

P1 means fix before relying on the release process. P2 means a reproducible functional, accessibility, recovery or content-quality issue to address in the next repair pass. Coverage limitations and optional improvements are listed separately rather than counted as confirmed defects.

| ID | Priority | Finding | User impact |
|---|---|---|---|
| A01 | P1 | CI and deployment target `main`, but the remote default branch is `claude/cool-darwin-kjgme8` | Pushing completed work to the current default branch does not trigger the configured push checks or Pages deployment. |
| A02 | P2 | Published site package omits `version.js` | Every source-page visit requests a missing file; automatic asset versioning is disabled. |
| A03 | P2 | Stored JSON is parsed without schema validation | Certain invalid saved preferences/stats/sessions stop the whole app from loading. |
| A04 | P2 | Storage write failures are silent | Users can complete work that will disappear on reload without a warning. |
| A05 | P2 | Confirmation dialogs do not contain keyboard focus | Background question navigation remains operable while a modal is open. |
| A06 | P2 | Question shortcuts override horizontal table scrolling | Arrow keys change the question instead of scrolling a focused wide table. |
| A07 | P2 | Escape does not dismiss a keyboard-focused help tooltip | Help remains visible and can obstruct nearby controls. |
| A08 | P2 | Unchecked practice answers are treated inconsistently in results | Score, green review indicators and remedial coaching disagree. |
| A09 | P2 | Scientific-notation calculator results cannot be chained | A valid result becomes an invalid next expression. |
| A10 | P2 | Abstract coaching still tells users to predict frame 6 | New challenge series already display six frames and require frame 7. |
| A11 | P2 | Legacy numerical distractors still include generic fillers | 94 questions have distractors without a modelled calculation mistake. |
| A12 | P2 | Legacy verbal explanations retain a confirmed taxonomy inconsistency | A direct contradiction is taught as an overstatement, contrary to the authoring rules. |

## Reproduction and repair criteria

### A01 — Release branch mismatch

**Location:** [workflow](../.github/workflows/pages.yml), push branch filter and deployment `if` condition.

`git ls-remote --symref origin HEAD` returned:

```text
ref: refs/heads/claude/cool-darwin-kjgme8 HEAD
ef17a7f3e96da78a40817dfc17ecc7b6dd4a962c HEAD
```

The workflow accepts push events only on `main`; its deploy job also requires `refs/heads/main`. Pull requests and manual dispatch are separate triggers and do not resolve automatic publishing of pushes to the current default branch. A successful Git push is therefore not evidence of a website update.

**Repair:** agree on the production branch and make the repository default, workflow triggers and deployment condition consistent. Keep PR validation separate from production deployment. Verify an actual run and deployed version after the change. This audit did not inspect authenticated GitHub deployment settings or claim that the currently hosted website is down.

### A02 — Missing version file in the Pages artifact

**Location:** workflow `Prepare site` command; [index.html](../index.html), `load("version.js?t=" + Date.now(), ...)`.

The workflow copies `index.html assets questions dist`, omitting the root `version.js`. The audit reproduced that exact package on an isolated local HTTP server: `/version.js` returned **404**, all 620 questions loaded through the fallback, `EPSO_VERSION` was absent and **zero** scripts carried a version query.

**Repair:** include `version.js` in the published artifact. Browser-test the prepared `_site` artifact, including the version response and every asset's version query, before deployment. The current source-page browser check runs against the complete repository, so it cannot catch this packaging omission.

### A03 — Invalid saved-state structures break startup

**Location:** [assets/app.js](../assets/app.js), `load`, preference initialisation, `deserialize` and `viewHome`.

In a fresh browser context, seed one local-storage key and reload:

```js
localStorage.setItem('ad5trainer.prefs.v1', 'null');
// or:
localStorage.setItem('ad5trainer.qstats.v1', 'null');
// or:
localStorage.setItem('ad5trainer.session.v1', '{"v":1,"sections":[{}]}');
```

All three prevent the home page from rendering. Errors respectively reference `count`, a question ID and `map`. Invalid JSON syntax is already caught; syntactically valid JSON with an invalid shape is not. This is a recovery failure under damaged/stale storage, not an assertion that normal new profiles generate these values.

**Repair:** validate types, section keys, item IDs, option orders and indices before use; recover per key, preserving unaffected progress. Provide an accessible reset/recovery path. Test nulls, wrong containers, missing arrays and obsolete IDs.

### A04 — Progress can fail to save without notice

**Location:** `save` in [assets/app.js](../assets/app.js).

The audit makes `Storage.prototype.setItem` throw `QuotaExceededError`, then answers and checks a practice question. The round remains usable, but no session is stored, no warning appears, and reload offers no Resume. This represents storage denial or exhausted quota; ordinary storage works in baseline tests.

**Repair:** expose a persistent, non-blocking “progress cannot be saved” state, check availability early and preserve the in-memory round. Consider export/import for recovery. Do not display unconditional assurances of persistence after a failed write.

### A05 — Modal background remains keyboard-operable

**Location:** `confirmHTML`, `render`, `onKey` and `onClick` in [assets/app.js](../assets/app.js).

Start practice, open **End round**, then press Shift+Tab twice from the initially focused confirmation button. Focus reaches the background **Next** button. Pressing Enter changes question index **0 → 1 while the confirmation dialog remains open**. `aria-modal="true"` alone does not trap focus or prevent native button activation. An axe scan does not exercise this interaction.

**Repair:** contain Tab/Shift+Tab within the dialog, make the background inert while it is open, block background actions and restore focus on close. Verify both keyboard directions and native Enter/Space activation.

### A06 — Wide-table scrolling invokes question navigation

**Location:** table focus region in [assets/render.js](../assets/render.js); global ArrowRight/ArrowLeft handlers in [assets/app.js](../assets/app.js).

At 390px width, start numerical Set 5 and focus its first table region. The measured table is wider than its **324px** viewport. Press ArrowRight: table scroll remains **0**, and the session changes question **0 → 1**.

**Repair:** let native arrow scrolling operate inside focusable scroll regions, and scope question-navigation shortcuts to appropriate targets. Add a browser test that actually scrolls a focused overflowing table; checking that a page has no horizontal overflow is insufficient.

### A07 — Tooltip remains visible after Escape

**Location:** `.info-btn:focus-visible + .tip` and hover rules in [assets/styles.css](../assets/styles.css); tooltip Escape handling in [assets/app.js](../assets/app.js).

Keyboard-focus the test-type help button, confirm its tooltip is visible and press Escape. It remains visible because CSS focus visibility is independent of the `state.ui.tip` flag. The existing test checks `aria-expanded` and moves focus away before later hover checks; it does not prove dismissal of the focused tooltip.

**Repair:** explicitly track dismissal until focus/hover changes, preserving keyboard focus. Check actual tooltip visibility after Escape for focus-, hover- and click-opened states, rather than the ARIA attribute alone.

### A08 — Practice result views disagree about unchecked answers

**Location:** `sectionScore` in [assets/core.js](../assets/core.js); topic totals, review rows, `wrongCount` and `startRetryCoach` in [assets/app.js](../assets/app.js).

Start five-question practice. Select the correct answer to question 1 but **do not check it**, then end and confirm. The result shows **0/5**, marks question 1 green as **Correct**, and offers coaching for **4 mistakes**. The score excludes the unchecked answer while the review and coaching selection treat it as a success. Topic summaries use the latter policy too.

**Repair:** choose one explicit policy for unchecked answers and apply it consistently to score, denominator wording, review status, weak topics, history and remedial selection. Preserving the existing “only checked answers count” policy requires a distinct unchecked state, not a green scored-success indicator.

### A09 — Calculator output is not valid calculator input

**Location:** `calcPress` in [assets/app.js](../assets/app.js); numeric tokenizer in [assets/core.js](../assets/core.js).

Calculate `1 ÷ 10000000 =`: the display correctly returns `1e-7`. Then multiply by 2 and press equals: the display says **Check the expression** instead of `2e-7`. The result is written back with `String(v)`, while the tokenizer rejects exponent notation.

**Repair:** keep numeric result state separately or support properly bounded scientific-notation literals in the parser. Preserve the restricted grammar; do not replace the parser with JavaScript evaluation. Test chaining tiny and large results, unary minus and powers.

### A10 — Coaching instructions lag the question format

**Location:** abstract lesson in [assets/lessons.js](../assets/lessons.js).

The coach says **“Predict frame 6 before looking at the options”** and describes five-frame series. Every new abstract challenge question displays **six** stimulus frames and asks for the seventh. It also says most series combine two rules, although the current bank is mostly three/four relationships.

**Repair:** say “predict the next frame” and teach both foundation independent rules and challenge dependencies, alternating phases, delayed handoffs and composition. Check the lesson alongside a real six-frame challenge item.

### A11 — Numerical filler distractors remain widespread

**Location:** `FILL` and fallback option construction in [scripts/generators/numerical.mjs](../scripts/generators/numerical.mjs); [item-level evidence](audit/question-bank-evidence.json).

**94 of 190** numerical questions contain **180** distractors whose note is “Not derived from a typical mistake.” These are all foundation items; the forty new challenges have none. Their presence is already disclosed by the numerical audit. The numerical keys passing an independent solver does not validate the instructional quality of wrong choices.

**Repair:** revise the affected templates to generate plausible mistakes within the option range, regenerate and re-solve, and review whether display formatting creates new cues. Preserve IDs only for label/metadata changes; substantive revisions need new IDs under the repository rules. Recheck answer-position distribution and the full bank after regeneration.

### A12 — Verbal taxonomy is inconsistent in an inspected item

**Location:** `v03-01`, option D and its note in [questions/verbal/verbal-set-03.js](../questions/verbal/verbal-set-03.js).

The passage explicitly states **“Not every barrier disappeared by the deadline.”** The option claims the internal market was **“fully completed by the end of 1992.”** Its note calls this **Overstated**. Under the project's documented rule that direct contradictions are **False**, that label is inconsistent. This finding concerns distractor feedback; it is not evidence that the keyed answer is wrong.

The author inspected a twenty-item sample spanning all thirteen verbal sets; IDs are saved in the evidence file. A further candidate for editorial review is `v07-02`: its guaranteed compensation claim does not specify the service category despite the passage mentioning possible service exemptions. That is an ambiguity to resolve independently, not a confirmed wrong key in this report.

**Repair:** independently review the original 200 items' keys and all distractor labels. Resolve contradictions and scope exceptions consistently. Changing labels can alter cue-pattern statistics, so rerun the validator after review. The forty new items have archived blind-review traces; this audit does not manufacture equivalent evidence for the old bank.

## What passed

| Check | Observed result |
|---|---|
| ESLint | Pass |
| Unit tests | 23 pass |
| Bank schema, cue and duplicate validator | 29 sets / 620 questions pass |
| Numerical independent answer calculation | All 190 keys pass |
| Abstract independent visible-figure inference | All 40 challenge keys pass in the bounded grammar |
| Verbal archived review trace | 40 keys and 120 labels match saved reviewer answers and content hashes |
| Build | Standalone bundle and version reproduce the committed files |
| Chromium end-to-end and included axe scans | All 28 checks pass over local HTTP |
| Extra 320px layout probe | No page overflow in the three sampled sections |
| Full abstract raster comparison | 1,940 figures across all 190 questions; no pair of identical option images within an item at 100×100, light theme |
| Numerical display precision check | 242 exhibits inspected; no chart values lose precision beyond the renderer's two-decimal formatting |
| Dependency advisory check | `npm audit`: zero reported advisories across the installed development dependency tree |

The raster audit found 27 foundation keys that repeat a complete earlier stimulus image. Repetition is compatible with cyclic rules; it is not an incorrect-answer finding. None of the forty challenge keys repeats a complete displayed frame. Pixel equality at one size/theme is not a full visual ambiguity test.

## Bank inventory and verification limits

| Section | Questions | Easy | Medium | Hard | Verification available |
|---|---:|---:|---:|---:|---|
| Verbal | 240 | 38 | 105 | 97 | Full structural/cue screening; forty archived blind-reviewed new items; twenty-item author semantic sample in this audit |
| Numerical | 190 | 56 | 82 | 52 | All keys independently recalculated; filler inventory; exhibit precision inspection |
| Abstract | 190 | 29 | 121 | 40 | Full structural/heuristic/raster screening; forty new keys independently inferred; existing 150 not freshly semantically re-solved |

The audit covers the project's components and all-bank automated properties. It is **not** a fresh independent human semantic review of every one of the 620 questions. No learner study has established Easy/Medium/Hard thresholds or uniform “Very hard” performance. The saved verbal reviewer explicitly found variable reasoning burden among the new items.

Current question statistics store aggregate exposures/correctness and latest outcome; hinted Coach work and exam answers share these totals. Per-item first-response time, first-attempt outcome and prior exposure to the same reasoning family are not retained as a usable calibration dataset. Before promoting difficulty or readiness claims, add a first-exposure pilot and distinguish assisted, repeated and same-family attempts. The numerical and abstract challenge collections each have ten families with four variants; new IDs do not imply new families.

## Security, privacy, research and maintainability

The browser app has no runtime package dependencies, account system or server-side data store. Static review found a restricted calculator parser rather than `eval`, escaped passage/scratchpad text, character-offset highlights and `noopener` on external links. The tested runtime makes no third-party asset requests. Progress resides in local storage and has no built-in backup/export. Normal operation is private to that browser profile; storage reliability is addressed in A03/A04.

The three research libraries preserve access outcomes, hashes, attributions and rights decisions. Their verified README counts are 24 numerical, 21 verbal and 18 abstract; these are reference-source checks, not full dataset quality reviews. Licensed author-study samples remain outside the app manifest. No model fine-tuning or import of commercial EPSO questions was performed. The distinction between software and dataset licences is documented. Authoritative EPSO pages remain inaccessible in this environment, so this audit has not independently re-established current competition rules, rankings or timing from the live official source.

The separation between pure core logic, DOM/UI code, rendering and generated bank data is useful. Reproducible generators, independent numerical calculation and saved verbal review hashes provide meaningful protection. Test names and passing checks nevertheless overstate coverage if read as blanket validation: the prepared site, malformed storage structures, modal focus, actual tooltip dismissal and table arrow scrolling were not covered by the standard suite. The new audit probes reproduce these gaps without changing passing tests to conceal them.

## Environment limits

- Local execution used Node 24 and installed system Chromium; the workflow requests Node 20 and Chromium/WebKit. WebKit and Firefox binaries are not installed locally and were not run in this audit.
- Direct `file://` navigation was attempted and returned `ERR_BLOCKED_BY_ADMINISTRATOR`. The HTTP tests and static bundle review do not prove direct-disk behaviour in this managed browser. Verify that mode on an unrestricted supported browser.
- The Pages file-list reproduction is local. Authenticated Pages settings, actual production HTTP headers and a live successful deployment were not inspected.
- Official/third-party source access follows the recorded environment policy; blocked destinations were not bypassed.

## Repair order

1. Align the production branch and publish the complete artifact, then verify a real deployed build (A01–A02).
2. Add saved-state recovery, storage-failure feedback and consistent practice results (A03–A04, A08).
3. Repair modal, table and tooltip keyboard behaviour and the calculator chain (A05–A07, A09).
4. Update lessons and complete the legacy editorial repair (A10–A12), followed by fresh blind review where required.
5. Pilot difficulty on first exposures, including family-level repetition, and test the final product on WebKit and unrestricted disk URLs.

Each repaired finding should receive an assertion in the regular regression suite. Audit probes are evidence collectors, not an “all findings fixed” quality gate.

## Reproduce and inspect

See [audit evidence and commands](audit/README.md), [application probes](audit/project-probes.json), [whole-bank evidence](audit/question-bank-evidence.json) and [dependency advisory snapshot](audit/dependency-audit.json).
