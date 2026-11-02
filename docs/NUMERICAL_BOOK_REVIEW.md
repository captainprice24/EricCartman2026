# Numerical questions, answers and Coach: detailed review

2 November 2026. Based on José María Franco Reverte's user-supplied *How to succeed in EPSO numerical reasoning tests*, especially §§3.3–3.7, the worked exercises and conclusions. The book was used as an editorial reference: read the question, select relevant data, establish units and percentage bases, choose an efficient method, and check the result. No book questions or prose were imported.

## Outcome

All **220 numerical keys** still agree with independent calculations from the displayed data. No wrong final answer was confirmed. The earlier broad screening missed defects in the teaching paths and question assumptions; this pass repairs those rather than treating a passing key test as sufficient evidence of quality.

**200 items have new revision IDs**: 130 numeric-answer foundation items and all 70 challenge items. Most revisions make rounding explicit or improve teaching, rather than changing the mathematical problem. Twenty categorical foundation items retain their IDs. Their candidate comparisons are now also tested for a unique best answer. All exhibits, answer options and keys remain unchanged; fixed full tests retain their original membership with replacement IDs.

## Confirmed flaws and repairs

| Finding | Example before repair | Repair |
|---|---|---|
| Implicit percentage conversion | `n01-03-r2`: a ratio minus one was presented as a percentage without showing the ×100 conversion explicitly. | All four per-capita change solutions now show the full expression with ×100 and the original inputs. |
| Incorrect dimensional presentation | `n02-03-r2`: TWh was divided by “million people” and then multiplied by 1,000, mixing written units with already-adjusted numerical scales. | All six unit-per-capita variants now explain that the scale factor accounts for both exhibit units; corrected the library-loan conversion statement as well. |
| Rounded intermediate result cannot reproduce the final answer | `n02-23-r2`: 25 × displayed EUR 1,190.93 equals EUR 29,773.25, while the key is EUR 29,773.35 from the unrounded unit cost. | Four VAT-order stems specify order-level calculation and no unit-price rounding. Their solutions retain the original multiplication factors through the final total. |
| Premature rounding in compound/reverse calculations | Growth projection, compound growth, proportional allocation, required growth, currency conversion and changing-base rates reused displayed rounded factors. | Final expressions now use original inputs instead of the rounded factors. Numeric foundation stems state final precision and solutions explicitly reach the displayed answer. Intermediate displays are identified as approximations. |
| Overgeneralised average-speed advice | `n02-05-r2` said averaging speeds is always wrong for unequal legs. Equal-duration legs can justify an arithmetic mean. | Explain total distance / total elapsed time, and the equal-time exception; stops must still be included here. |
| Explanation did not describe the actual options | `n01-02-r2` said distractors used neighbouring columns or a wrong denominator, while all four selected distractors substituted countries. | The explanation now covers the actual possible mistake types and refers to each option's specific note. |
| Unclear discrete versus continuous time | Rates-of-work items asked for working days but offered fractional results. | Four stems explicitly permit partial working days and assume uniform output. |
| Break-even versus minimum feasible quantity | `n02-21-r2` asked “above how many pages” but supplied a rounded continuous threshold, not a minimum whole page count. | Four stems explicitly ask for the continuous break-even threshold; the cheaper region is strictly above the unrounded value. The rounded answer is not represented as a feasible integer minimum. |
| Fractional people or awards presented as exact counts | Survey and grant-share problems calculated fractional counts from reported percentages. | Four survey and four grant-share stems now request approximate counts and identify reported percentages as estimates. Final rounding is explicit. |
| Missing numerical teaching steps | The 30 newer challenge solutions often gave a formula, then jumped to a final answer without evaluating the intermediate quantities or showing the algebra. | Added complete paths for all ten models: screening, mixture, capped tax, savings, rebalance, rework, journey time, disposal finance, cohort composition and module capacity. Integer problems show why one fewer day or module fails. |
| Computer floating-point artefacts | Screening showed `0.9299999999999999`; capped weights showed values such as `3486.7000000000003`. | Use legible formatted numbers and exact percentage inputs. A regression rejects long raw decimal artefacts in every numerical solution. |
| Incomplete emissions units | Delivered-energy intensities were labelled grams rather than g/kWh; total emissions were left merely “proportional”. | The four substitution solutions label intensity in g/kWh and emissions in kilotonnes, including the TWh-to-kilotonne conversion. |
| Correct-option feedback did not teach the reasoning | Foundation feedback just said “Correct”; challenge feedback directed the learner elsewhere. | Numeric foundation feedback states the final rounded answer and the role of base/units; challenge feedback explains the model's reasoning. Full worked solutions remain visible in both modes after checking. |

## Coach improvements

Numerical Coach now includes three original worked examples before the round: reversing a percentage with a forward check, distinguishing percentage points from relative change, and pooling counts for a weighted pass rate with a range check. The existing method checklist still starts with the requested quantity, relevant data, units/base and appropriate precision. This avoids teaching calculator keystrokes as the reasoning method.

Progressive hints remain optional and question-specific. They guide the relevant base or model without changing the options or identifying an answer letter. The newer challenge paths now make the transition from hints to a complete solution substantially more explicit.

## Traceability and verification

- `docs/audit/numerical-book-review.json` records all 220 IDs, previous IDs, changed fields and unchanged exhibits/keys, and confirms fixed-form membership preservation.
- `scripts/generators/numerical-review-revisions.json` freezes before/after content hashes. Original foundation revision records remain intact. Normal generation rejects unregistered content changes; `--register-review` explicitly registers new revisions, never overwrites an existing fingerprint.
- The generator changes, not the generated question files, are the source of the repairs. `scripts/generators/numerical-coaching.mjs` supplies the ten expanded teaching paths.
- Independent solver checks cover all keys and numeric-answer uniqueness at display precision; categorical comparisons check for ties. Additional regressions cover the corrected percentage expression, VAT calculation policy, thresholds, units, precision and floating-point display.
- The stable form builder uses prior IDs for its original allocation ordering, preventing the new revisions from silently reshuffling full tests.

Difficulty remains editorial: 56 Easy, 82 Medium, 82 Hard. The seven challenge sets deliberately include reasoning beyond the book's simpler worked examples; their 120-second pace has not been validated by learner results. This review does not establish official exam equivalence, learning gains, independent human agreement on every hint, or an independent recalculation of every distractor value. The book's historical test formats and equipment descriptions are not treated as current competition rules.

New changes are local to the draft; no branch was created and nothing was published.

The numerical inventory audit also now preserves the original mechanical labels from the saved pre-review inventory. It no longer recomputes historical labels from today's longer teaching paths; current workload diagnostics remain separate from difficulty.

Verification completed: all eleven numerical oracle/regression checks, the full unit suite, lint, 740-item validation, numerical inventory audit, normal generator reproduction and the local build passed. The complete Chromium browser suite passed, including numerical Coach examples on desktop and phone, all twelve repair regressions and all five full-test checks. No publication was performed.
