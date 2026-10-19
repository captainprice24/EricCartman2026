# Verbal bank audit

All 240 items are inventoried: **38 Easy, 105 Medium, 97 Hard**. Eight foundation items were clarified with new revision IDs; label-only repairs preserve IDs. New challenge sets are ten-question practice rounds; difficulty is editorial pending first-attempt learner results.

The 200 existing labels were retained after structural screening rather than mechanically deriving new levels from word count or key type. Forty new items were independently answered without author keys, with all 40 keys and 120 distractor labels reconciled. Source-batch exports, reviewer reasoning, resolved ambiguities and the final ID/hash mapping are in `docs/research/verbal/blind-review/`. Four sets were composed from those unchanged reviewed items with cue limits and answer-position balance preserved. The reviewer judged the reasoning burden variable: some items have strong backward/constraint chains, while others are more moderate. “Very hard” names the editorial challenge collection; it is not a claim that every item has measured extreme difficulty. The project repair independently reviewed all 200 foundation keys and 600 distractor labels, corrected 58 original labels and clarified eight items under new IDs. Initial exports, reviewer reasoning, final answers and content hashes are archived under `legacy/`. The standard cue limits remain unchanged.

| Set | Easy | Medium | Hard | Quality measures |
|---|---:|---:|---:|---|
| verbal-01 | 2 | 10 | 8 | cue heuristic 20.0%; least/most overlap 22.5% / 17.5%; shortest 17.5% |
| verbal-02 | 4 | 14 | 7 | cue heuristic 8.0%; least/most overlap 28.0% / 20.0%; shortest 24.0% |
| verbal-03 | 4 | 14 | 7 | cue heuristic 22.0%; least/most overlap 25.3% / 16.0%; shortest 16.0% |
| verbal-04 | 5 | 11 | 6 | cue heuristic 9.1%; least/most overlap 6.8% / 22.7%; shortest 25.0% |
| verbal-05 | 5 | 11 | 6 | cue heuristic 22.7%; least/most overlap 29.5% / 18.2%; shortest 22.7% |
| verbal-06 | 5 | 11 | 6 | cue heuristic 9.1%; least/most overlap 29.5% / 18.2%; shortest 22.7% |
| verbal-07 | 5 | 11 | 6 | cue heuristic 22.7%; least/most overlap 9.1% / 22.7%; shortest 22.7% |
| verbal-08 | 4 | 11 | 6 | cue heuristic 14.3%; least/most overlap 16.7% / 19.0%; shortest 19.0% |
| verbal-09 | 4 | 12 | 5 | cue heuristic 14.3%; least/most overlap 7.1% / 31.0%; shortest 26.2% |
| verbal-10 | 0 | 0 | 10 | cue heuristic 30.0%; least/most overlap 20.0% / 20.0%; shortest 35.0% |
| verbal-11 | 0 | 0 | 10 | cue heuristic 20.0%; least/most overlap 20.0% / 40.0%; shortest 30.0% |
| verbal-12 | 0 | 0 | 10 | cue heuristic 20.0%; least/most overlap 20.0% / 20.0%; shortest 30.0% |
| verbal-13 | 0 | 0 | 10 | cue heuristic 20.0%; least/most overlap 10.0% / 35.0%; shortest 25.0% |

## Organisation and checks

Use the section-specific Easy / Medium / Hard selector for Coach and Practice. Filters combine with the selected set. Exam simulations retain their unseen-first mixed-difficulty draw. CSV and JSON inventories list every ID, band and rationale.

The standard cue limits remain in force: hedging/absolute-word gaps, option length, passage overlap, key-position balance and distractor-pattern diversity. Blind review is a separate semantic check. Draft review exposed substantive gaps (supervisor presence, conditional financial decisions and package-inspection status); these were repaired and reviewed again. Do not infer accuracy from a passing cue test alone.

## Calibration

Pilot at exam pace using first exposures: 105 seconds per verbal item. Record correctness, time, omissions and exposure to similar structures. Treat hinted Coach answers and repeats separately. Investigate disagreement before increasing difficulty by length, density or extra decoration. Update editorial bands from learner evidence rather than assuming that a long passage is hard.

Refresh with `npm run audit:reasoning`.
