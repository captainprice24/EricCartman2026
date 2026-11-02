# Verbal questions, answers and Coach review

2 November 2026. Reference: the user-supplied *How to succeed in EPSO verbal reasoning tests, volume 2* (2022), especially its methods, worked analyses and conclusions. The book informs the emphasis on complete textual support, scope, efficient reading and careful option elimination. Its questions and prose were not imported.

## Results

All **300 passages and option sets** received a new independent blind review. The reviewers initially found 299 unique supported keys and one defective question: former `v18-08` lacked a premise needed for its intended answer. It is now repaired and independently reviewed again.

A further author check found an unstated release-status assumption in the reserve-stock bound. That premise is now explicit and the revised question also passed fresh independent review.

The final bank agrees with the reconciled review on **300 keys and 900 distractor labels**. There are **97 revised items with fresh IDs** and 203 unchanged items. Revisions affect 14 passages, six option sets, 79 hint pairs, 23 explanations, 19 new worked reasoning paths and nine distractor classifications. These categories overlap. Correct answer positions remain unchanged; the defective item was repaired by supplying its missing premise, not by asserting that the former key had been valid.

## Confirmed defects and repairs

| Finding | Repair |
|---|---|
| The allergen item's proof treated a lot change as a source change, although only source change or new cross-contact triggered the changed-meal rule. | `v18-08-r2` explicitly states that both source and lot changed. Its hint, evidence chain and explanation now use the source-change trigger. A fresh blind reviewer finds one supported answer. |
| The park item imposed supervision on every school-permit holder while also allowing dual holders to enter on keycards. | The condition now applies to entrants **using** a school permit. A distractor explicitly claiming that both routes require identity checks is directly refuted, avoiding a classification dispute about the inference. |
| The reserve-stock lower bound treated absence from a pending-release group as proof of passing quality release. | Explicitly establish that packages outside the pending group had passed release. The 150 confirmed unexpired and uncommitted packages then meet all three eligibility conditions, supporting the lower bound. |
| The waiver item's pressure/seal provision did not explicitly define the alternative tested route. | The route now expressly requires both tests. Distractors distinguish missing seal evidence, the paperwork exception and the expressly permitted coexistence of classes. |
| Registered-reports feedback treated a pre-results decision as an unconditional guarantee about eventual publication. | Distinguish in-principle acceptance from final execution/quality checks. The key now concerns positive results being unable to influence the initial decision before outcomes are known. |
| Solar-cell wording promoted a conclusion within a conventional model into a necessity for every possible architecture. | The passage and key now limit the comparison to the conventional single-semiconductor model described. |
| Mitochondrial-DNA wording claimed maternal relatives could never be distinguished despite mentioning mutations. | Recognise differentiating mutations; the key concerns the inability of a **shared match alone** to uniquely identify one relative. |
| The pollinator explanation supplied an assessed-only denominator that the passage did not expressly define. | Explain only the supported possibility left open by missing assessments, without inventing that denominator or claiming the true share is known to be higher. |
| The consumer-rights explanation referred to “both overstated options” although one was labelled False; another explanation said an example could never contain frequency information. | Replace category-count wording with substantive reasons. Explain that an example **alone** does not establish prevalence. |
| Several distractor classifications did not follow the direct-contradiction versus missing-evidence distinction consistently. | Reconcile every initial disagreement with the reviewers. Nine final classifications change, including overstated economic guarantees, invented marketplace prevalence, an unsupported seven-year majority, and explicit procedural contradictions. Initial votes and reasons remain archived. |
| One cybersecurity note used non-commercial open-source exclusion to refute a claim about software **sold**. | Explain the relevant sector exclusions and qualified support duration; the non-commercial exclusion alone does not refute the sold-software claim. |

## Factual precision within the passages

Seven legal passages were narrowed or qualified without changing their intended inference tasks:

- Single-use plastics: specify the covered up-to-three-litre beverage scope.
- REACH: use tonnage-band boundaries, including ten tonnes, rather than a continuously rising information requirement.
- Consumer withdrawal: include the return/evidence reimbursement-withholding exception and the consent/acknowledgement qualification for digital content.
- Free movement: separate personal-conduct rules for public policy/security from public-health restrictions.
- Migration solidarity: distinguish collective reference planning and relocation-equivalents from an obligation for each state to both relocate and pay.
- CBAM: qualify the annual net-mass exemption and exclude electricity and hydrogen from that exemption.
- Pay transparency: use sufficiently early informed pay negotiation rather than an unconditional before-interview deadline, and distinguish rights from size-dependent reporting duties.

These are targeted editorial precision corrections, not a comprehensive legal update. The fresh reviewers assessed entailment from the revised text. This session did not retrieve current consolidated legislation or independently certify every legal statement. Historical competition formats in the book are not treated as current rules.

## Coach and Practice improvements

Nineteen challenge items had the same generic hint pair and takeaway. Each now has case-specific hints, a specific takeaway and three worked reasoning steps. These explain, for example, why 48% of half a waste total is less tonnage than 40% of the original total; why a 23-versus-14 detection count establishes a lower bound without proving new occupancy; and why usable reserve has a range rather than an exact inferred count.

All sixty later challenge items now start with individual prompts about their actual routes, dates or definitions. The former instruction to trace conditions “in both directions” has been removed: necessary conditions must not be reversed without an explicit converse.

The Coach lesson now offers passage-first and option-first reading routes instead of prescribing a 30-second skim. It teaches direct contradiction before overstatement, complete support for every clause, and necessary versus sufficient conditions. Three original worked examples cover missing evidence versus contradiction, one-way implications, and percentages with changing denominators.

Every verbal question now visibly tells the learner to judge statements using the passage alone. This resolves the reviewers' concern that a generic “correct” stem can invite selection of a true outside fact. The instruction reveals no answer. Worked reasoning remains hidden until checking, alongside the existing explanations of all four options in Coach and Practice.

## Traceability and limits

The complete fresh review, initial disagreements, reconciliations, wording iterations, final answers and content hashes are in [the review archive](research/verbal/blind-review/book-2026-11/README.md). `docs/audit/verbal-book-review.json` records the counts and nine label changes. A fourth reviewer, not given author keys, reviewed all 14 changed passage/option pairs. The assembled final answer file is a reconciliation record, not an additional independent review.

The 15 fixed tests preserve their previous item membership using replacement IDs. The earlier numerical repairs remain in the draft. No new branch was created and nothing was published.

Difficulty remains editorial: 38 Easy, 105 Medium and 157 Hard. Reviewers noted simple elimination routes in some nominally hard procedural chains, and some medium foundation items felt easy. Those observations are retained rather than being rewritten as agreement on uniformly extreme difficulty. Neither long passages nor multiple written premises establish measured hardness. First-exposure accuracy and time, preferably with human learners, remain necessary for calibration and evidence of learning gains.

Verification completed: all 19 blind-review comparisons agree on 300 keys and 900 labels; content hashes and fresh-review traceability tests pass; lint, the full unit suite, 740-item validation, the verbal audit and local build pass. The full Chromium browser suite passed, including desktop/phone Coach examples and the hidden-until-checked verbal proof regression. After the final stock-status clarification, all fourteen revised passage/option pairs were additionally exercised in the final artifact at desktop light and phone dark sizes: 28 checks passed, recorded in `docs/audit/verbal-rendering.json`. Reproduce those targeted checks with a local server and `E2E_BASE_URL=http://127.0.0.1:8000 CHROMIUM_PATH=/usr/bin/chromium node scripts/audit-verbal-rendering.mjs`.
