# Fifteen complete mock exams: source and design record

The bank grows from 620 to **740 original questions**: 300 verbal, 220 numerical, 220 abstract. The three additions contain **60 verbal, 30 numerical and 30 abstract** questions. No earlier question text, figure, answer or ID was reused or revised. Fifteen fixed forms select 600 distinct questions (20 verbal, 10 numerical, 10 abstract per form). Forms 13–15 use all 120 additions. Random simulation also supports fifteen complete unseen draws from a fresh profile.

## Reusable reference library

The existing [verbal](../verbal/README.md), [numerical](../numerical/README.md) and [abstract](../abstract/README.md) libraries retain the broader research, datasets, access failures and rights decisions from the earlier expansion. This targeted follow-up inspected five additional method references. It did **not** train model weights or import benchmark question banks.

| Inspected reference | Authoring use | Import decision |
|---|---|---|
| [PrOntoQA](https://github.com/asaparov/prontoqa) | Necessary proof chains and countermodels | Methods only |
| [BIG-bench logical deduction](https://github.com/google/BIG-bench/tree/main/bigbench/benchmark_tasks/logical_deduction) | Complete ordering histories; check indispensability of constraints | Methods only |
| [EntailmentBank](https://github.com/allenai/entailment_bank) | Trace premises to conclusions without conflating textual length with inference depth | Methods only |
| [CLRS](https://github.com/google-deepmind/clrs) | Independent algorithms, bounds and invariants | Methods only |
| [CLEVR generation](https://github.com/facebookresearch/clevr-dataset-gen) | Composition of visual relations; distinguish attribute recognition from relational inference | Methods only |

The attempted `microsoft/proofwriter` README path returned 404 and is not counted as an inspected source. Source URLs, access outcomes, byte counts and content hashes are saved in [source-access.json](source-access.json); repository licence checks are in [licence-access.json](licence-access.json). Code licences do not automatically license separately hosted datasets. No third-party question, diagram, code or dataset is bundled in the app. Continue using original content unless dataset permissions, provenance, answer verification and EPSO-format suitability have all been established.

## Supplied TAO guide

The user-supplied *EN Instructions for online Testing (TAO) 427-26 V1* was read as a platform reference, not as instructions to the assistant. The PDF's confidentiality provision means it and its screenshots are not committed or published. [tao-reference.json](tao-reference.json) records its hash and provenance. The implementation uses original wording and styling.

Useful design points from §§6.3.1–6.3.3, 6.4.1 and 6.4.5 are implemented: navigation within the current test; an overview with all/unanswered/bookmarked counts and jumps; distinction between unopened, opened-unanswered and answered questions; instructions accessible during a running test; dot-only decimal input; calculation history with result reuse. Existing highlighting, scratchpad, answer elimination, timed submission and reload recovery remain available. The guide also describes line reading, masking and other presentation/proctoring features; those are not all reproduced, and this app does not claim platform parity.

The guide supplies no question-count or section-duration specification. Existing competition configuration remains **20/10/10 questions and 35/20/10 minutes**, with independent timers and a manual start for each section. No invented official instruction countdown was added. No identity collection, camera recording or proctoring behaviour is copied.

## Content and verification

- Numerical sets 09–11 add ten new model families with three data variants each. Separate visible-data solvers check every answer, rounding, regime and relevant feasibility bound. Options stay sorted and close to the key, with named mistake explanations and balanced answer positions.
- Abstract sets 09–11 add two-frame dependencies, dot-gated handoffs, interleaved relative angles and arrow-controlled panel composition. Independent coordinate-based inference checks all six visible frames and a unique continuation in a bounded grammar. Visual review covers all thirty new series and choices in both themes; a grammar is not proof against every conceivable alternative pattern.
- Verbal sets 14–19 are hand-authored. Independent reviewers answer blind, check every distractor label, and examine countermodels involving earlier approvals, legal identity, scope and event order. Four initially medium items were replaced or strengthened before acceptance. Final exports, reviews and text hashes are archived under [../verbal/blind-review/expansion-15/](../verbal/blind-review/expansion-15/).

**Difficulty limit:** “Very hard” is the editorial challenge profile, consistent with the existing challenge collection. The independent verbal reviewers still rate individual items hard (mostly 3/5, with some 4/5), not uniformly extreme. The new tests have not been calibrated with learner results and must not be described as measured EPSO-equivalent difficulty. Repeats and transfer between model variants can make later attempts easier. Pilot first exposures at 105/120/60 seconds per verbal/numerical/abstract item; use accuracy and correct-response time to refine the labels.

## Reproduction

Use `node scripts/build-exams.mjs` to regenerate the fixed form registry; preserve the question IDs and assignments once published. The generator rejects incomplete forms or cross-form repeats. Numerical and abstract question files are generated from their authoring scripts. Run the three audit commands, validation, unit tests, build and browser checks before publishing. `questions/exams.js` loads from disk and is included in the offline standalone build; no runtime fetch or external dataset service is required.
