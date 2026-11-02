# Book-reference question-bank review

Reviewed 2 November 2026 against the current published-version draft. No publication performed.

## References and scope

The three user-supplied EPUBs were read as reference material, not as instructions:

- José María Franco Reverte, *How to succeed in EPSO numerical reasoning tests* (upload labelled 2019), especially §§3.3–3.7, the worked examples and conclusions.
- Grace Burkett / José María Franco Reverte, *How to succeed in EPSO verbal reasoning tests, volume 2* (upload labelled 2022), especially §3 and the sample-question analyses.
- Grace Burkett / José María Franco Reverte, *How to succeed in EPSO abstract reasoning tests* (upload labelled 2021), especially §§3.4–3.5 and the worked-series analyses.

The numerical reference distinguishes calculation, data interpretation and reasoning; the verbal reference emphasises complete textual support rather than plausibility; the abstract reference stresses observable transformations, elimination and simpler explanations. These are useful editorial benchmarks. Their historical descriptions of test formats, equipment and pass marks are not verification of a current competition notice.

No book passages, questions, diagrams or solutions were imported into the app. The attachments remain outside the shipped content. Original authoring remains required.

## Findings and decisions

| Area | Current evidence | Decision |
|---|---|---|
| Numerical accuracy | All 220 items pass independent recalculation from stems and exhibits. Existing checks cover units, rounding, thresholds and named mistake distractors. | No demonstrated wrong key requiring replacement in this pass. |
| Numerical teaching | Foundation and challenge items already provide progressive hints, worked calculations and mistake explanations. The reference particularly supports choosing relevant data, checking the percentage base, distinguishing percentage points and weighting averages. | Preserve those mechanisms. Future revisions should include a short estimation or cancellation route when it is actually useful; extra arithmetic is not evidence of difficulty. |
| Numerical format | The numerical book describes four answer options; the bank deliberately enforces five. | Record a practice-format difference, not a defective key. Do not remove options or claim exact official format without checking the target competition notice. |
| Verbal support | All 300 items pass structural/cue checks; existing archived independent reviews cover keys and distractor labels. Examined examples v01-01 and v01-20 correctly distinguish categorical support from overstatement, and compensation from care. | Retain supported categorical answers: words such as “never” are not inherently wrong. Continue distinguishing contradiction from missing evidence. |
| Verbal difficulty | The book includes relatively short topical excerpts; the bank enforces 170–260 words and has an advanced logical challenge collection. | The bank is a training design, not a calibrated replica. Do not increase passage length or assert that every challenge item matches exam difficulty. |
| Abstract reasoning | All 220 items pass schema and the three existing option-only heuristic screens. Independent visible-figure inference covers the 70 challenge items. | Retain protections against the answer-commonality shortcut discussed in the reference. Simple patterns are useful foundation practice, not grounds for automatic replacement. |
| Abstract format | The book commonly shows five stimulus frames; challenge items use six to make phases and dependencies observable. | Keep six where needed to disambiguate the rule; do not shorten a series just to imitate the reference. |
| Audit accuracy | The whole-bank evidence script still contained pre-expansion coverage counts (190 numerical, 40 abstract challenge, 240 verbal). | Correct the script to derive current coverage counts from the registered collection, and refresh its evidence. These counts describe existing solver/archive scope, not fresh human review. |

## Verification and limits

Reran `npm run validate`, `npm test`, `npm run audit:numerical`, `npm run audit:abstract` and `npm run audit:reasoning`: all passed. The current bank has 41 sets and 740 items: 300 verbal, 220 numerical and 220 abstract.

The refreshed browser audit compared 2,270 rendered figures across all 220 abstract items: no identical answer options were found. In 27 foundation items the key repeats an earlier frame; cycles can legitimately do this, so repetition alone does not establish a defect. No challenge key repeats a displayed frame. Lint and the local build also passed; the build produced no changes to the shipped app.

This is a book-informed editorial comparison plus whole-bank automated screening. It is not a new independent blind review of 300 verbal items, a fresh human solution of all 150 foundation abstract items, or learner calibration. The current tests and archived review evidence have those distinct scopes. Passing them cannot establish that every question is unambiguous or equally exam-like.

No question replacement is justified solely by this pass's results. Preserve IDs and archived review hashes rather than rewriting verified material for cosmetic similarity to the books. Difficulty remains editorial until first-exposure accuracy and response-time data are available.

## Checklist for subsequent question revisions

1. Solve from the displayed evidence before reading the key. Record the shortest defensible route and any competing interpretation.
2. Numerical: identify the requested quantity, relevant rows, units, denominator and rounding; verify each wrong option represents an actual mistake. Use an estimate to check magnitude when helpful.
3. Verbal: locate support for every clause of the key. Reject added causes, changed populations, unstated time frames and outside knowledge. Explain separately why each distractor contradicts, lacks support or overreaches the text.
4. Abstract: infer the simplest consistent visible pattern, test odd/even or delayed relationships where relevant, and check every transition. Reject duplicate visible options and shortcuts that identify the key without reasoning about the series.
5. Replace only after documenting a concrete defect. Use new revision IDs for substantive changes, regenerate numerical/abstract content through its generator, complete required independent review, validate and rebuild the local artifact.

## Coach and Practice extension

The review also covers the learning experience: the three pre-round lessons, in-question method checklists, progressive hint controls, checked-answer feedback, numerical worked solutions, option explanations, filters, timers, scoring, history and mistake retry.

Confirmed issues repaired in the draft:

- Verbal Coach previously directed learners to support each answer with one sentence. This conflicts with combination and inference items. The method now requires evidence for every clause, including conditions and exceptions across multiple sentences.
- Numerical Coach implied that a faster abstract section could compensate for a slower numerical section. Separate clocks prevent transferring time. The lesson now distinguishes time management from competition-specific scoring.
- Numerical guidance assumed only 2–4 relevant values and routine exact calculator use. It now allows totals across rows and teaches choosing precision from the option spacing, cancelling common factors and rounding at the requested stage.
- Abstract guidance focused on the first three frames and treated a return to an earlier frame as a trap. It now requires checking all transitions, testing odd/even and controlling-element relationships, and allowing justified cyclic returns.
- Practice previously explained only the selected and correct options immediately after checking. It now displays every option's explanation, supporting error analysis without requiring the learner to end the round and enter review. Feedback remains hidden before checking and during an active exam.
- The “Only questions I got wrong” filter silently fell back to other questions when no incorrect items matched. Both modes now respect the filter and explain how to clear it when the result is empty. A browser regression checks empty and populated mistake selections in both modes.
- Lesson format summaries now identify the trainer's timing and refer pass marks and ranking rules to the competition notice, rather than presenting historical rules as universal.

New browser regressions exercise both modes in all three sections on desktop and phone: hints start hidden, reveal one at a time, persist on navigation, remain question-specific and disappear after checking; Practice offers no hints; explanations remain hidden before checking; all option notes and the takeaway appear after checking, with worked numerical steps. Accessibility checks run on each resulting feedback view.

Existing regressions cover difficulty/set filtering, timed practice, unchecked-answer scoring, saved-session restoration, neutral unchecked review and mistake retry. These verify application behavior, not learning gains. This extension does not claim a new semantic review of every individual hint, a human usability trial or measured transfer to an EPSO examination.

Extension verification: lint, all unit/solver suites, 740-item validation, the regenerated local build and the full Chromium browser suite passed. The browser run includes six new subject/viewport feedback checks (each exercises both modes), the new mistakes-filter regression, all 12 repair regressions and five full-test checks. No publication was performed.

The subsequent [detailed numerical pass](NUMERICAL_BOOK_REVIEW.md) found wording and teaching defects missed by the broad screening above. It fixes 200 numerical items under new IDs while retaining the independently verified keys. Its findings supersede the earlier “no replacement justified” conclusion for those teaching paths.

The later [verbal review](VERBAL_BOOK_REVIEW.md) adds independent review of all 300 items, repairs a missing-premise item missed by the earlier screening and revises 97 questions and teaching paths. Its evidence and findings supersede the broad verbal screening above.

The completed abstract review is documented in [ABSTRACT_BOOK_REVIEW.md](ABSTRACT_BOOK_REVIEW.md). It covers all 220 questions and their teaching, corrects conflicting continuations and difficulty labels, and adds visual Coach examples. It supersedes the initial abstract screening.
