# Blind re-check of the whole verbal bank (9 November 2026)

All 350 live verbal items (Sets 01–24) were answered again by seven fresh blind reviewers, 50 items each. They saw
passages and options only (`batch-N-blind.md`), followed `reviewer-instructions.md`, and wrote their answers,
distractor labels, difficulty ratings and comments to `batch-N-answers.json`. `compare.mjs` compares them with the
live bank. The batch-2 reviewer wrote `v03-06-c` for `v03-06-r2-c`; the script maps it.

## Results

- **Keys:** 350 of 350 agreed. No item had no defensible answer or two.
- **Distractor labels:** 966 of 1,050 agreed with the bank before this re-check (92%), 969 after it. Almost every
  difference sits on the borderline between False and Overstated (a strong claim against a limited statement) or
  between Overstated and Not supported (a wider claim against an unstated detail).

## Decisions

Each of the 84 differences was judged against the convention in `reviewer-instructions.md`. A label changed only
where the bank clearly misapplied it; where both readings are defensible, the reviewed label stands.

| Item | Option | Was | Now | Reason |
| --- | --- | --- | --- | --- |
| v24-05 | D | Overstated | False | "Remains debated" directly contradicts "proved"; the first reviewer had already flagged it. |
| v01-17-c | C | Overstated | False | A third city only "every third year" contradicts "every year three cities". The author's original label, restored. |
| v05-18-c | B | Overstated | Not supported | The text gives no motive for devising the criterion. The author's original label, restored. |

v24-07 C ("historians have shown" against "treat the tale with caution") was left as Overstated: the passage reports
caution rather than a denial, and a third False would break the 0–2 rule for that item.

Notes and explanations were rewritten to match. `../compact-2026-11/final.json`, `label-reconciliation.json` and
`../medium-2026-11/final.json` record the new labels with their reconciliation, and `tests/verbal-bank.test.mjs`
checks them. No passage or option changed, so no id changed.

## Text fixes found in the same audit

A strict audit of every item against `docs/VERBAL_AUTHORING_BRIEF.md` found three faults in notes and explanations,
corrected without changing passages, options, keys or labels:

- v09-16-c: the note now quotes the passage exactly ("has varied over time").
- v22-04: the note now quotes the passage exactly ("still depend largely on imported oil").
- v22-03: the explanation still described two distractors as they were before the earlier recheck reworded them;
  it now describes the current options.

One open point: in Set 23 the key is never D (4/3/3/0). Fixing it means reordering options, which needs new ids
and a fresh blind review, so it is left for a later revision.
