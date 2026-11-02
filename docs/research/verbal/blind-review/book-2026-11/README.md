# Book-informed verbal review, November 2026

Three independent reviewers received disjoint 100-item blind exports, containing only IDs, passages, stems and options. They did not receive author keys, notes or previous reviews. Their original answers, reasons, issues and suggestions are preserved in `batch-*-review.json`.

The initial reviews agreed on 299 keys; the remaining item, former `v18-08`, had no fully entailed option because a changed ingredient lot did not establish the changed-source trigger. Its passage now explicitly supplies that fact, under a fresh ID.

There were 96 initial distractor-label disagreements. `batch-*-label-disputes.json` records each disputed statement and current note. Reviewers reconciled them using the repository's priority rule: explicit contradiction, including a stated counterexample to a universal rule, is False; a stronger claim without a direct counterexample is Overstated; an added unestablished detail is Not supported. Their per-option decisions and reasons remain in `batch-*-label-reconciliation.json`.

A separate reviewer, not supplied author keys, checked all 14 revised passage/option pairs. All original and subsequent wording exports and reviews are retained (`revised-text-*`, `additional-text-*`, `wording-final-*`, `resolved-wording-*`, `status-final-*`). Later wording passes resolved classification ambiguity and respected the unchanged option-length cue limit. `review-mapping.json` selects the latest applicable export/review for every current item, or the initial export plus reconciliation where text is unchanged.

`answers.json` is the assembled final answer/label record, not another independent reviewer. Every entry is linked to its actual source review and any label reconciliation. All 300 keys and 900 labels agree with the current bank under `scripts/blind-review.mjs compare`; tests verify passage, option and full teaching-content hashes. Prior review archives remain intact.

The [review report](../../../../VERBAL_BOOK_REVIEW.md) distinguishes semantic repairs, coaching changes, factual-precision edits and retained difficulty concerns. Independent AI review does not establish psychometric calibration, current legal completeness or human agreement.
