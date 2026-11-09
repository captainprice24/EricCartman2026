# Abstract-only difficulty upgrade

9 November 2026. Scope confirmed by the owner: abstract questions only. Verbal and numerical content is unchanged.

The bank previously had 141 Easy, 89 Medium and 70 Hard abstract questions. All 141 Easy slots now contain new questions: **71 Medium and 70 Hard**, the closest possible equal split. The resulting bank contains **300 questions: 160 Medium and 140 Hard**. The 159 previously Medium/Hard items remain unchanged.

## Content changes

The replacement Medium items use three established spatial families: alternating row/column shifts, counter-rotating patterned quadrants and opposed conveyor rows. Alternatives require the main spatial transformation and at least one other feature. Neither a single visible feature nor the combined supporting colour/marker/pointer cues can identify the answer.

The replacement Hard items use delayed handoffs, conditional moves, interleaved dependencies, reflections and binary-panel composition. Six frames provide evidence for the dependency. A visible orbit whose position and arrow can both be continued independently is rejected. Conflicting simple continuations are rejected too. Panel inputs and pointer, or orbit colour and count, leave multiple choices, so those supporting tracks cannot bypass the substantive relationship.

These are original variants of the families studied in the [commercial-sample comparison](research/abstract/eu-training-comparison-2026-11.md) and [research library](research/abstract/README.md). No third-party question or figure was copied. Existing transfer families in Sets 17–19 remain available. More variants improve practice volume, not the number of distinct reasoning families.

Every replacement includes progressive hints, explanations of each alternative and a worked solution with observed values and the next prediction. Difficulty is based on required reasoning, not extra drawing clutter or longer explanations. The labels remain editorial rather than measured AD-equivalence claims.

## Traceability

`scripts/generators/abstract-no-easy-baseline.json` archives the 300 published question objects at `6e38ebf`. `abstract-no-easy-revisions.json` records exactly 141 before/after hashes, new `-r4` IDs and levels. The generator constructs the historical bank first and applies the upgrade last. Rerunning it must reproduce the registered content. Historical transfer-review fingerprints remain unchanged.

The fifteen fixed forms retain the same slots through the complete revision chain; upgraded IDs replace their corresponding retired IDs. Answer positions remain unchanged. Easy is no longer offered in the abstract selector, and a previously saved Easy preference falls back to All levels. Verbal retains its existing levels and questions.

## Verification

- Independent visible-geometry inference covers all 300 current items: 9 retained foundation, 121 patterned, 140 orbit/panel and 30 transfer questions. The new generator rejects ambiguous Hard candidates using the separately implemented geometry grammar; tests then check all published choices. This is independent implementation, not an independent human blind review.
- Each of the 141 revised series and answer sets differs from its predecessor. Every question has exactly one matching answer within the bounded solver grammar. All other published Medium/Hard questions are compared against the baseline without modification.
- Per-set centrality, outlier and element-majority answer guesses remain capped at 30%. Each replacement is checked for single-feature and supporting-cue shortcuts.
- Reproducible contact sheets use the app’s SVG renderer in light and dark themes. Browser checks traverse every item in Sets 01–04 on desktop and phone, alongside existing challenge and transfer rounds, checking timing, choices, feedback and page overflow.
- Release checks: lint, unit/oracle tests, validation, bundle generation and all browser regressions. The abstract audit records the current inventory and evidence in `docs/audit/abstract-no-easy-review.json`.

Finite sequences always admit invented alternatives outside any bounded grammar. Pilot first attempts at 60 seconds per item, recording the actual solving route alongside correctness and time; revise levels if learner evidence reveals simpler routes.
