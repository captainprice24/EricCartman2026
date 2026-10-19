# Abstract bank audit

All **190 items** inventoried: **29 Easy, 121 Medium, 40 Hard**.

## Reasoning review

The old labels were mechanically rules minus one: 38 Easy, 75 Medium and 37 Hard. Counting four independent rotations/cycles does not demonstrate difficult inference. The reviewed rubric uses Easy for two familiar independent tracks; Medium for three/four independent tracks or a nonuniform count/boundary phase; Hard for the new coupled, conditional, interleaved or compositional collection. The legacy phase screen uses reviewed generator wording, not general-purpose text scoring. New topics/models require editorial review.

46 foundation difficulty labels changed; all 150 existing IDs, stimuli, options, keys, hints and explanations are preserved. The forty new questions are four ten-question rounds (Sets 5–8), each with the same ten model families but different states. This is forty variants across ten families, not forty unrelated reasoning designs.

These are editorial bands. No human difficulty study or score uplift has been measured. The new collection combines two substantial relational rules with two supporting cycles, or rotating panels with a composition rule. Familiarity with a family will make its later variants easier.

| Set | Easy | Medium | Hard | Most central | Outlier | Element majority |
|---|---:|---:|---:|---:|---:|---:|
| abstract-01 | 3 | 7 | 0 | 10.0% | 20.0% | 10.0% |
| abstract-02 | 8 | 42 | 0 | 13.5% | 20.0% | 13.3% |
| abstract-03 | 12 | 38 | 0 | 16.0% | 20.0% | 12.5% |
| abstract-04 | 6 | 34 | 0 | 16.3% | 20.0% | 11.9% |
| abstract-05 | 0 | 0 | 10 | 8.3% | 0.0% | 8.3% |
| abstract-06 | 0 | 0 | 10 | 15.0% | 0.0% | 15.0% |
| abstract-07 | 0 | 0 | 10 | 20.0% | 0.0% | 5.0% |
| abstract-08 | 0 | 0 | 10 | 20.0% | 0.0% | 20.0% |

## Verification and limits

- All 190 items pass schema, distinct options, series uniqueness and the existing size-only distractor check. Every set stays below the 30% ceilings for three option-only strategies; chance is 20%. These checks cover named heuristics, not every possible shortcut.
- All forty new keys are inferred from visible circle/arrow/cell coordinates and fills by separate code in `tests/abstract-oracle.test.mjs`. It receives no generator parameters or author model labels. The solver fits alternating, accelerating, interleaved, gated, reflected and delayed rules or grid rotations/Boolean combinations. Each six-frame stimulus has one continuation in that bounded grammar and exactly one matching option. This is stronger than checking stored states but is not proof against every conceivable alternative rule.
- Each challenge set has two keys per answer position, ten model families, no repeated stimulus, and single-/double-feature distractor errors. Every feature agrees with the key in at least one distractor, so no single feature alone identifies the key. All four features are tested in the choices. Colour plus dot count cannot select an orbit key; both input grids plus the bottom arrow cannot select a panel key. A harder relation is needed. No challenge key simply repeats a complete displayed frame.
- All forty new series and options are included in reproducible light/dark contact sheets; sample legacy figures cover all five old layouts. Rendering and answer feedback are tested on desktop and phone widths. See `VISUAL_REVIEW.md` for observations.
- The existing 150 questions received structural inventory, heuristic screening and sample visual review, not a fresh item-by-item human semantic review. Their original generators still use fixed steps, cycles and occasional count/boundary phases.

## Organisation and reuse

Use Abstract difficulty: Easy / Medium / Hard in Coach and Practice. For a complete challenge round select Set 5–8, ten questions and timed practice (ten minutes). Exam simulations retain their existing unseen-first mixed-difficulty policy. CSV and JSON inventories list every item, its band and the reason.

The research library separates method references, unresolved paths, blocked websites and licensed author-study examples. No third-party figures or questions are registered in the app.

## Calibration

Pilot unseen items at sixty seconds per question. Record first-attempt correctness, time and omissions separately from hints, repeated items and exposure to another variant of the same model. Investigate competing explanations before changing bands. Prefer novel relationships and plausible errors over extra clutter.

Refresh with `npm run audit:abstract`; regenerate through `node scripts/generators/abstract.mjs`.
