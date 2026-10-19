# Independent foundation verbal review

All 200 foundation items were exported without answer keys, hints, notes, explanations or difficulty labels. Three independent reviewers answered disjoint batches: 70 items (sets 1–3), 66 (sets 4–6), and 64 (sets 7–9). Reviewers had only the blind exports and repository authoring requirements; they did not inspect author keys or each other's answers.

The initial reviews agreed with all intended best keys but identified six scope/entailment ambiguities. Clarifications were independently reviewed again. Two further items needed option revisions because correct classification gave three Not supported distractors, exceeding the existing maximum of two. The withdrawal item received an additional scope clarification to exclude ineligible goods, also reviewed again. Eight substantive revisions use fresh IDs and a `supersedes` field. Fifty-eight original labels were corrected; the original cue thresholds and difficulty bands were retained.

- `initial-set-*.json`: the 200 original blind exports.
- `initial-review-*.json` / `.md`: initial answers, all 600 labels and exact issue descriptions.
- `clarified-review-*.json`: independent reviews of the first six clarifications.
- `extra-review-*.json`: final reviews of two taxonomy-driven revisions and the eligible-purchase clarification.
- `final-blind-export.json`: final passages, stems and options only.
- `answers.json`: all 200 reconciled reviewer answers and labels.
- `review-mapping.json`: final ID, actual reviewer file and hashes binding the passage and options to review.

`tests/verbal-bank.test.mjs` verifies every current item against its actual review, including zero remaining reviewer issues, key agreement, all labels and unchanged reviewed text. The existing forty challenge reviews remain in the parent directory. This is text-based independent review by AI reviewers, not a human field trial or empirical difficulty calibration.
