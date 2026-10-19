# Verbal reasoning reference library

Research date: 19 October 2026. This is an authoring library, not model training. Original numerical work remains unchanged.

Inspected 21 repository READMEs and available licence files from 25 candidates. Four candidate paths were unresolved and ten websites were blocked by the environment policy. Four GitHub search pages returned HTML without usable search results. `sources.json` records successes, failures, URLs, excerpts and hashes; unavailable sources are not presented as inspected.

## Source assessments

| Source | Use and rights decision |
|---|---|
| [ReClor](https://github.com/yuweihao/reclor) | argument structure, necessary conditions and close logical distractors. README restricts the released data to noncommercial research; exam-derived material is not a ready app import. |
| [LogiQA](https://github.com/lgw863/LogiQA-dataset) | logical reading comprehension; commercial exam provenance needs review. Civil-service exam provenance; no dataset licence confirmed. Do not import question text. |
| [LogiQA 2.0](https://github.com/csitfun/LogiQA2.0) | logical reasoning and multi-hop textual inference. CC BY-NC-SA 4.0 declared; translated exam provenance and noncommercial/share-alike terms require care. |
| [FOLIO](https://github.com/Yale-LILY/FOLIO) | first-order logic, quantifiers, contradiction and unknown. CC BY-SA 4.0 licence retrieved; useful quantified multi-step logic, but not automatically EPSO-style or unrestricted reuse. |
| [ProofWriter](https://github.com/allenai/proofwriter) | multi-step proof chains, negation and exceptions. Candidate path could not be retrieved. Keep as an unverified follow-up lead; no content imported. |
| [RuleTaker](https://github.com/allenai/ruletaker) | rule application and depth-controlled entailment. Apache 2.0 repository; useful rule chains, proof depth and open-world versus closed-world distinctions. |
| [CLUTRR](https://github.com/facebookresearch/clutrr) | compositional relational reasoning and held-out structures. CC BY-NC 4.0; useful compositional relation chains, not unrestricted app content. |
| [ANLI](https://github.com/facebookresearch/anli) | adversarial entailment, contradiction and neutral examples. CC BY-NC 4.0; adversarial errors are useful for author study, not an unrestricted import. |
| [SNLI](https://github.com/stanfordnlp/snli) | entailment/neutral/contradiction distinctions. Candidate path could not be retrieved. Keep as an unverified follow-up lead; no content imported. |
| [MultiNLI](https://github.com/nyu-mll/multiNLI) | cross-domain inference and genre variation. NYU permission notice retrieved; inference genre diversity is useful, but verify source-text provenance before redistribution. |
| [HANS](https://github.com/tommccoy1/hans) | lexical overlap, subsequence and constituent shortcuts. MIT; twelve synthetic reference examples and the complete licence are saved locally. Key lesson: lexical overlap and syntactic subsequences do not establish entailment. |
| [ConTRoL](https://github.com/csitfun/ConTRoL) | contextual reading over longer passages. Candidate path could not be retrieved. Keep as an unverified follow-up lead; no content imported. |
| [ContractNLI](https://github.com/stanfordnlp/contract-nli) | exceptions, scope and evidence-based contract inference. CC BY 4.0; useful exceptions, evidence spans and contract scope; dataset file was not fetched at the attempted path. |
| [DocNLI](https://github.com/salesforce/DocNLI) | document-level inference and evidence dispersion. Salesforce redistribution notice retrieved; useful document-level inference, but source-text and data-specific conditions need review. |
| [VitaminC](https://github.com/TalSchuster/VitaminC) | contrastive claims and minimal factual edits. MIT repository; study minimal factual changes and contrastive evidence; upstream Wikipedia provenance still matters. |
| [FEVER](https://github.com/sheffieldnlp/fever-baselines) | supported/refuted/not-enough-information classification. Apache repository code is not blanket permission for all underlying Wikipedia text. Study supported/refuted/unknown labels. |
| [SciFact](https://github.com/allenai/scifact) | scientific claims, uncertainty and evidence qualification. Licence distinguishes claims/annotations from source abstracts. Read those separate terms before copying abstracts. |
| [RACE](https://github.com/qizhex/RACE_AR_baselines) | reading comprehension options; exam-content provenance. Candidate path could not be retrieved. Keep as an unverified follow-up lead; no content imported. |
| [DREAM](https://github.com/nlpdata/dream) | dialogue comprehension and inference. No licence file confirmed in this inspection. Dialogue/exam material is reference-only. |
| [QuAIL](https://github.com/text-machine-lab/quail) | passage-level reasoning and question taxonomy. CC BY-NC-SA 4.0; question taxonomy useful, unrestricted upload not established. |
| [BoolQ](https://github.com/google-research-datasets/boolean-questions) | yes/no inference and careful evidence selection. README states CC BY-SA 3.0; yes/no inference differs from the app’s four-option format. |
| [StrategyQA](https://github.com/eladsegal/strategyqa) | implicit multi-step reasoning; outside knowledge is unsuitable for EPSO keys. MIT repository; multi-hop decomposition useful, but outside-knowledge answers should not become passage-supported EPSO keys. |
| [Abduction and Argument Reasoning](https://github.com/UKPLab/argument-reasoning-comprehension-task) | hidden assumptions and competing warrants. Apache 2.0; useful competing warrants. Distinguish plausible explanation from logical entailment. |
| [ART abductive reasoning](https://github.com/allenai/abductive-commonsense-reasoning) | plausibility versus entailment; avoid confusing the two. Apache 2.0; useful foil to entailment: a plausible missing cause is not necessarily supported by the passage. |
| [TRUE](https://github.com/google-research/true) | factual consistency and benchmark reliability. Apache 2.0 repository; component benchmarks have their own underlying source conditions. |

## Saved examples and reuse

`reference-data/hans-reference-sample.json` contains 12 selected HANS premise/hypothesis examples, drawn from 30,000 parsed evaluation records, with source URL, attribution, selection method and full-file SHA-256. Text fields are unchanged; irrelevant parse columns were omitted. The complete MIT notice is in `reference-data/HANS-LICENSE.md`. Attribution: R. Thomas McCoy, Ellie Pavlick and Tal Linzen (2019), *Right for the Wrong Reasons: Diagnosing Syntactic Heuristics in Natural Language Inference*. These short synthetic examples are for author study and are not registered as app questions.

No paid or leaked provider sets were imported. Public access, an academic code licence or a noncommercial dataset release does not establish permission for unrestricted republishing of exam questions. Ready datasets also need substantial format and difficulty review; no official EPSO difficulty calibration was possible because its site was blocked.

## Authoring rules for harder items

- Start from a necessary inference chain, not an answer paraphrasing the final paragraph. Use alternative routes, a shared hidden prerequisite, an exception eliminated by a case fact, contraposition, temporal scope, intersecting groups or a justified aggregate bound.
- Make the closest alternatives fail at different logical steps. Do not give the answer away through a sole cautious option or three plainly invented facts. Shorter or more familiar prose can still require harder reasoning.
- Keep all facts needed for the answer inside the passage. Fictional studies and procedures must be identified as fictional; do not teach invented EU rules as current law.
- Exactly one option must be entailed. Unknown information is not false, and the possibility of a future event is not evidence that it occurred. Necessary conditions are not sufficient; absence from a selective file is not confirmed absence.
- Define physical status versus procedural certification precisely: intact is not necessarily inspected; rostered is not necessarily present; a calculated conditional payment is not an actual payment; only-if is not if-and-only-if. Blind review found these exact issues and prompted repairs.
- Retain the existing 170–260-word range, four options, progressive hints, honest distractor labels and answer-cue limits. A multi-clause correct option must not routinely be the longest.
- Use the blind-review export so a second reviewer sees no keys, notes or author metadata. Reconcile every key and label; the comparison command now fails label disagreement as well as key disagreement.
- Difficulty remains editorial. Independent review found strong chains and some more moderate items within the challenge collection. Pilot first-attempt correctness and time before claiming uniform extreme difficulty.

## The four new sets

Sets 10–13 contain 10 questions each: **40 original questions**, timed at 17 minutes 30 seconds per round. Forty items were independently reviewed in two source batches, repaired, and then partitioned into four sets meeting the unchanged cue limits and balanced keys (two or three of each letter). Only IDs and set composition changed at partition; passages and option order stayed unchanged. The final `review-mapping.json` records source IDs and passage/option hashes. All four final comparisons agree on 40/40 keys and 120/120 distractor labels. The source reviews retain the reviewer’s actual difficulty judgments rather than claiming blanket agreement with a Very hard label.

The earlier abandoned draft and unused author drafts are not part of the bank. No existing question ID, passage or answer was changed. The complete 240-item inventory and structural audit are in `inventory.csv`, `inventory.json` and `docs/VERBAL_AUDIT.md`. Existing 200 editorial levels were retained; they did not receive a new full blind semantic review.

## Reuse later

Read this library, `docs/VERBAL_AUTHORING_BRIEF.md`, `docs/VERBAL_AUDIT.md` and the final blind-review traces before adding items. Write new files by hand, preserve IDs, add new files to the manifest, balance letters, complete blind review, validate and rebuild.

```bash
python scripts/research-verbal.py
python scripts/research-verbal-samples.py
npm run audit:reasoning
npm run lint
npm test
npm run validate
npm run build
npm run test:e2e
```
