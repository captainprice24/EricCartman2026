# Abstract follow-up: reasoning variety and answer-choice quality

8 November 2026. Reference: the owner's 15-page EU Training screenshot PDF. All pages were viewed; observations with missing explanations were kept separate from confirmed visible feedback. [The pre-change comparison](research/abstract/eu-training-comparison-2026-11.md) records the page-by-page evidence. The samples informed relationships only: no commercial figures, wording or questions were imported. This is not official EPSO certification or a claim of measured equivalence.

## Changes

- **50 patterned answer sets repaired.** All now leave at least two choices matching any single decoded feature. Supporting background, pointer, centre and marker cues together cannot select the answer without the main spatial transformation. This closes the four individual-cue and nine combined-support shortcuts found in the comparison. Each wrong choice describes its actual one-/two-feature error.
- **150 foundations reviewed by the shortest sufficient route.** 112 formerly Medium items become Easy; 141 foundations are now Easy and nine Medium. Explanations identify a sufficient elimination route as well as all observed rules. Foundation figures and options remain identical. An entire grid arrangement is not treated as a simple colour cue in the patterned families.
- **30 original transfer questions, five per family**, interleaved across sets 17–19. Identity handoff and container transfer use six observations; the other four families use five. New totals: **300 abstract questions, 141 Easy / 89 Medium / 70 Hard**.
- Coach now explains identity versus location, previous-frame inputs, inequalities, inside/outside, irrelevant detail, wrapping, reflection and area reversal. Three new worked examples use plain language.

| Family | What must be discovered | Controls and verification |
|---|---|---|
| Identity handoff | Large output copies the preceding small input's identity and fill | Six observations break a misleading short fill cycle. The future small input is identical across choices and irrelevant to the current output. |
| Region inequalities | Colour groups swap inside/outside; grey remains fewer/more than black | Counts vary. Equal-count and reversed-comparison distractors are invalid; each single property leaves multiple choices. |
| Boundary continuation | Arrow fragments reconnect across opposite edges; direction rotates | Boundary coordinate and slope checked independently. Varying arrow count is expressly irrelevant; mismatched fragments are distractors. |
| Persistent objects | Three distinguishable irregular objects move while rotating or mirroring separately | Original polygons have distinguishable rotations/reflections. The independent reader ignores vertex order. A symmetry defect was found and corrected before release. |
| Reversible coverage | Background and circle coverage grow/shrink at bounds, with a separate sector orientation | Counts are measured in quarters. Hidden orientation at zero/full coverage is excluded from candidate comparisons. Coverage bands avoid size-only option traps. |
| Conserved transfers | Prior arrow and quantity update container counts; indicators then advance | Six observations; all choices conserve the total. Indicator-only cues cannot select the key. Token spacing enlarged after visual inspection. |

## Traceability and checks

All 270 prior stimuli remain identical. The 150 foundations use fresh `-r3` IDs; the 50 patterned items use fresh `-r2` IDs; 70 challenge questions remain byte-for-byte equivalent as question objects. `abstract-transfer-baseline.json` preserves the prior published objects at `ccc0072`; the revision registry locks before/after hashes. New items have separate fingerprints. Generator reruns must reproduce them. Fifteen fixed full-test forms retain their old membership, substituting the corresponding revised IDs; new sets are practice supplements.

`tests/abstract-transfer-solver.mjs` receives visible primitives only. It identifies layouts, decodes geometry and infers the relationships without keys, author states or model tags. Tests then require exactly one matching option. Reversed drawing/vertex order must preserve predictions; deliberately damaged handoffs, wrap joins and transfers must fail. Additional checks reject conflicting short identity/fill cycles and elementary independent count progressions. Existing foundation, patterned and challenge solvers remain active. This is independent solver code, not a second human blind review, and its grammar is bounded.

Per-set medoid, outlier and element-majority guessing rates remain at or below 30%. Full feature-subset diagnostics are saved in `docs/audit/abstract-transfer-review.json`. These heuristics cannot rule out every possible human shortcut.

The actual renderer produces all 300 items in light/dark contact sheets. Browser regression coverage traverses all 80 repaired/new patterned and transfer items at desktop and phone widths, checks feedback and overflow, scans accessibility, and checks pixel-distinct choices for the new families. See [visual inspection notes](research/abstract/VISUAL_REVIEW.md). Required release checks are lint, all unit/oracle tests, validation, build and full browser regressions.

## Calibration still needs learner attempts

Editorial labels are preparation guidance, not measured AD difficulty. Use the first unseen variant of each family, mixed with familiar reference items, at 60 seconds per question. Record correctness, time, confidence, hint use and the actual rule used. Keep repeat attempts and related-family exposure separate; do not count five variants from one person as five independent first exposures. Compare family-level results and revise unusually easy, slow or misleading questions before expanding the pilot. No accuracy, speed or equivalence results have been fabricated.
