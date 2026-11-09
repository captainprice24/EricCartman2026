# Abstract bank audit

**300 questions: 0 Easy, 160 Medium, 140 Hard.** Editorial bands; first-exposure learner calibration pending.

At the owner’s request, all 141 Easy abstract items were replaced under fresh IDs: 71 Medium and 70 Hard. The other 159 questions are unchanged. Verbal and numerical content is unchanged by this revision. See [ABSTRACT_NO_EASY_REVIEW.md](ABSTRACT_NO_EASY_REVIEW.md).

Medium replacements use alternating grid shifts, opposed conveyors and counter-rotating patterned regions. Their options require the main spatial transformation; no single visible feature selects the key. Hard replacements use necessary delayed, conditional or composed transformations. Simple independent orbit continuations are excluded, and supporting cycles cannot select the key.

| Set | Easy | Medium | Hard | Most central | Outlier | Element majority |
|---|---:|---:|---:|---:|---:|---:|
| abstract-01 | 0 | 6 | 4 | 20.0% | 10.0% | 20.0% |
| abstract-02 | 0 | 26 | 24 | 16.0% | 4.0% | 10.8% |
| abstract-03 | 0 | 26 | 24 | 20.7% | 2.0% | 18.7% |
| abstract-04 | 0 | 22 | 18 | 16.3% | 2.5% | 11.3% |
| abstract-05 | 0 | 3 | 7 | 8.3% | 0.0% | 8.3% |
| abstract-06 | 0 | 1 | 9 | 15.0% | 0.0% | 15.0% |
| abstract-07 | 0 | 1 | 9 | 20.0% | 0.0% | 5.0% |
| abstract-08 | 0 | 2 | 8 | 20.0% | 0.0% | 20.0% |
| abstract-09 | 0 | 1 | 9 | 15.0% | 0.0% | 15.0% |
| abstract-10 | 0 | 2 | 8 | 15.0% | 0.0% | 8.3% |
| abstract-11 | 0 | 0 | 10 | 20.0% | 0.0% | 15.0% |
| abstract-12 | 0 | 10 | 0 | 20.0% | 10.0% | 15.0% |
| abstract-13 | 0 | 10 | 0 | 20.0% | 10.0% | 10.0% |
| abstract-14 | 0 | 10 | 0 | 10.0% | 10.0% | 7.0% |
| abstract-15 | 0 | 10 | 0 | 15.0% | 10.0% | 8.3% |
| abstract-16 | 0 | 10 | 0 | 20.0% | 10.0% | 20.0% |
| abstract-17 | 0 | 7 | 3 | 21.5% | 4.0% | 20.0% |
| abstract-18 | 0 | 6 | 4 | 19.0% | 4.0% | 18.0% |
| abstract-19 | 0 | 7 | 3 | 17.0% | 2.0% | 10.0% |

## Coverage and verification

- Current solver coverage: 9 retained foundation items, 121 patterned items, 140 orbit/panel items and 30 transfer items. Each is solved from visible geometry without author labels or parameters. The historical 270-item transfer-review baseline remains tested separately.
- All 141 replacements have different stimuli and alternatives from their retired Easy versions. Their new IDs preserve the fifteen fixed forms through revision lineage. Current fingerprints reject silent edits on regeneration.
- All 300 items appear in reproducible light/dark contact sheets. Browser checks traverse all 150 items in Sets 01–04 at desktop and phone widths, including feedback and overflow, alongside existing challenge and transfer checks.
- Medoid, outlier and element-majority guessing rates must stay at or below 30% per set. Single-feature and supporting-cue checks cover each replacement. These bounded checks do not prove resistance to every possible human shortcut.
- The earlier [commercial-sample follow-up](ABSTRACT_TRANSFER_REVIEW.md) and [book review](ABSTRACT_BOOK_REVIEW.md) are historical records; their then-current difficulty totals are superseded here.

## Refresh and calibration

Run `node scripts/generators/abstract.mjs`, `npm run audit:abstract`, the independent tests and `node scripts/render-abstract-contact-sheets.mjs`. Pilot first attempts at 60 seconds per question and record accuracy, time, confidence and the actual solving route. Keep repeat exposure separate before adjusting editorial levels.
