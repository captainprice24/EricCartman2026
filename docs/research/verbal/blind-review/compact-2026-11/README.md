# Verbal condensation review, November 2026

All 300 items in `questions/verbal/verbal-set-01.js` to `verbal-set-19.js` were rewritten to EU Training
length: passages of 130–170 words (here 139–170, mean 163) in one or two paragraphs, and options of about
50–90 characters. Each rewrite has a new id (`<root>-c`, `supersedes: <root>`) and replaces exactly one earlier
reviewed version, recorded in `final.json` with the SHA-256 of that version.

## What had to stay the same

- The key position, `keyType`, `difficulty`, stem, topic and, for challenge items, `reasoning.model` and
  `reasoning.stages`. Hard and challenge items keep every premise, exception and scope word their chain needs.
- The label type of every distractor (False, Not supported, Overstated), unless blind review changed it.
- No new facts: passages were condensed, never extended with invented rules, dates or figures.

## Blind review

Reviewers saw passages and options only (the `*-blind.md` files) and answered every item in the matching
`*-review.json`. They did not see keys, notes or explanations.

- **Keys:** 300 of 300 agreed.
- **Labels:** 74 distractor labels differed. Most were False against Overstated, where a strong claim meets an
  explicit limit. Each was settled by adopting the reviewer's label and rewriting the note
  (`label-reconciliation.json`), or, for two options, by rewording so the author's label held.
- **Rechecks:** six items reworded after review were checked again blind. `recheck-*` covers v15-03-c,
  v15-05-c and v18-04-c (a clearer key and two consistency fixes); `recheck2-*` covers v10-09-c and v11-10-c
  (an all-contradiction distractor set reworded) and v15-09-c (a distractor reworded to keep the set's label
  pattern within limits). Every key and label agreed.
- **Difficulty:** reviewers rated the items 2.79 on average on a 1–5 scale (3 = typical exam item).

v18-05-c was recast from biological-specimen transport to secure data transport with the same logic, key and
labels, after an automated reviewer stopped on the original wording.

## Forms

`scripts/build-exams.mjs` maps each condensed id to the id it replaced, so the fixed full tests keep the same
membership: every slot now holds the condensed version of the item it held before.

`tests/verbal-bank.test.mjs` checks that every live text still matches its blind-reviewed hash, key and labels.

The whole-bank [re-check of 9 November 2026](../recheck-2026-11-09/README.md) confirmed every key again and
restored the author's label for v01-17-c C (False) and v05-18-c B (Not supported).
