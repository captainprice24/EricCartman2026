# Blind review: medium verbal Sets 20–24 (November 2026)

One independent reviewer per set answered from passages and options only (`set-NN-blind.md`, exported with
`scripts/blind-review.mjs export`). Reviewers' answers, labels, difficulty ratings and comments are in
`set-NN-review.json`.

- Keys: 50/50 agreed at first review.
- Distractor labels: 142/150 agreed at first review. Six disagreements were settled by relabelling to the reviewer's
  label (each a case where the text contradicts the option). Two options were reworded and re-reviewed blind
  (`recheck-*`); the first recheck raised one further borderline option in v22-03, which was reworded and checked
  again (`recheck2-*`). The final agreement is 150/150.
- `final.json` records the final key, labels, review file and passage/option hashes for every item;
  `tests/verbal-bank.test.mjs` checks them.

Reviewers rated most items 2–3 on a 1–5 scale (3 = typical exam item), consistent with the Medium band; some found
individual items easier than a typical exam item. Difficulty remains editorial pending learner data.

The [independent follow-up](follow-up-2026-11-07/README.md) reviewed the published batch after concurrent work was detected. Eleven verbal items received fresh revision IDs, clearer inference targets or more precise wording, and another key-free review. Its original concerns, final answers, label reconciliation and fingerprints remain archived; `final.json` points to the current evidence.
