# Verbal item authoring brief

This brief is for anyone, human or agent, who writes or revises verbal reasoning items. Read it with
`docs/QUESTION_FORMAT.md`. Round 2 of the external audit (finding N2) showed that the first bank could
be passed **by form alone**: the key was usually the hedged option ("may", "can", "likely") and the
distractors were usually the absolute ones ("only", "always"). Every item also had the same
False / Not supported / Overstated structure. Candidates who learn these cues are not learning to read.
The validator now measures these cues per set and rejects a set that leaks them.

## What makes an item correct

- Exactly one option is supported by the text, directly or by clear logic. A careful reader must be able
  to reach it with certainty, using the text alone.
- Every other option must be clearly wrong *according to the text*:
  - **False.** The text contradicts it.
  - **Not supported.** The text does not say it. This includes true outside facts, invented details,
    unstated causes and comparisons the text does not make.
  - **Overstated.** Partly right, but stronger or wider than the text ("some" becomes "most", "advises"
    becomes "decides", "in principle" becomes "in every case").
- Label each distractor honestly. A plain contradiction is **False**, even when it contains a strong
  word. (Audit example: "The Board sets the EU's climate targets", against a text that says the Board
  "advises on measures and targets", is False, not Overstated.)
- Facts must be accurate as of 2026. If you are not sure of a fact, leave it out. The passage may
  simplify, but it must not be wrong.
- Original wording only. Never copy from EPSO, EU Training, EPSOready or any other provider.

## Cue limits (enforced per set by `scripts/validate-questions.mjs`)

| Measure | Limit |
|---|---|
| Blind heuristic: prefer hedged options, avoid absolute ones, then pick the option with the least passage wording | key found in ≤ 35% of items |
| Key is the option with the least passage wording | ≤ 40% |
| Key is the option with the most passage wording | 10–40% |
| Key is the shortest option | 10–35% |
| Key is the longest option | ≤ 30% |
| Key within ±25% of the mean option length | ≥ 80% of items |
| Hedging words in keys vs in distractors (may, might, can, could, likely, probably, generally, usually, often, tend, mainly, largely, partly, some, in principle…) | rates within 10 points |
| Absolute words in keys vs in distractors (only, all, always, never, every, entirely, solely, exclusively, completely, wholly, none, invariably) | rates within 10 points |
| Most common distractor-type pattern (for example False + Not supported + Overstated) | ≤ 50% of items |
| Keys of type combination or inference | ≥ 40% |

The word lists are in `scripts/lib/blind.mjs`. Matching is on whole words, so "can" in "cannot" does
not count, but "all" in "all Member States" does.

## How to write items that pass, and are better items

1. **Absolute keys.** In about a quarter to a third of items, write the key with an absolute word that the
   text truly supports: "All Member States must…", "never", "only the Council can…". Make sure the
   passage itself is absolute on that point.
2. **Hedged distractors.** In about a quarter to a third of distractors, hedge a statement that is still
   unsupported or false: "may have reduced…", "could be the main cause", "generally requires…" when
   the text says something else.
3. **Plain keys.** Many keys need neither: a precise paraphrase or inference with no hedge and no absolute
   word.
4. **Vary the structure.** Each item has 3 distractors with 0–2 of each type. Mix patterns such as
   NS + NS + O, F + NS + O, NS + O + O, F + NS + NS and F + O + O. No single pattern in more than half
   the items; aim for at most a third.
5. **Close paraphrase traps.** Make some Not-supported distractors close paraphrases of the passage that
   add one unstated detail (a date, a cause, a scope). They reuse passage wording, so the key is not
   always the option with the least passage wording.
6. **Lengths.** Keep the four options within roughly ±25% of each other. Let the key be the shortest in
   some items and the longest in a few.
7. **Letters.** Spread keys across A–D. After writing, run
   `node scripts/format-set.mjs <file> --letters ABCD…` to place keys on target letters if needed;
   it moves each option with its note.

## Item format

Copy the layout of `questions/verbal/verbal-set-01.js`. Each item needs:

- `id`: set prefix plus a number, such as `v04-01`.
- `topic`, and `difficulty` set by the rubric in `docs/QUESTION_FORMAT.md` (aim for about 25% 1, 50% 2, 25% 3).
- `keyType`: paraphrase, combination or inference.
- `passage`: 170–260 words in 2–3 paragraphs separated by `\n\n`. Aim for 190–230 words.
- `stem`: "Which of the following statements is correct?"
- `options`: 4 options.
- `answer`
- `hints`: 1–3 progressive hints that do not give the answer away.
- `optionNotes`: one per option, beginning `Correct.`, `False.`, `Not supported.` or `Overstated.`,
  followed by the reason with a short quote from the text.
- `explanation`: the general lesson.

Hints and explanations never mention option letters.

## Checking

```bash
node scripts/validate-questions.mjs --only verbal/verbal-set-04.js
```

It must print ✓. It also prints the cue statistics and any similar subjects already in the bank.
After the author is done, a second reviewer answers the items blind (`scripts/blind-review.mjs`).
Every key and every distractor label must survive that review.
