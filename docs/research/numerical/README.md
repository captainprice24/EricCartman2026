# Numerical reasoning reference library

Research date: 19 October 2026. Scope: numerical reasoning only. This library supports future authoring; it does not fine-tune a model or automatically import benchmark questions into the app.

## What was inspected and saved

- 24 repository/dataset READMEs were retrieved and inspected for task structure, data locations and rights evidence. Licence files were retrieved where found. `sources.json` retains URLs, access outcomes, README hashes, excerpts and dataset-specific licence declarations.
- Six data files were fetched and parsed: FinQA test (1,147 records), TAT-QA dev (278 table contexts), GSM8K test (1,319 questions), AQuA test (254 questions), TabMWP test (7,686 questions) and SVAMP (1,000 questions). This is schema and sample inspection, not manual review of every record. Inspection files retain content hashes and field names; FinQA's file also retains example calculation programs without the source passages.
- Four GitHub repository search pages were attempted. HTML loaded, but usable search results were not returned to this session. The catalogue comes from directly inspecting the repositories below; it is not an exhaustive search result list.
- Eleven further websites were attempted and explicitly blocked by the environment's HTTP policy, including EPSO, SHL, AssessmentDay, EU Training, Eurostat, World Bank, OECD, ONS and UNdata. Their links are saved as follow-up leads; their contents and terms have not been verified here.
- Small reusable reference samples are saved locally: **8 GSM8K questions** and **8 TAT-QA table contexts containing 48 questions**, including 21 arithmetic questions. These are author-study examples with attribution, not additional app questions. Only the 40 newly authored original questions are registered in the application.

## Best sources for improving this trainer

| Priority/source | Useful material | Rights evidence and reuse decision |
|---|---|---|
| 1. [FinQA](https://github.com/czyssrs/FinQA) | Tables plus financial narrative; explicit arithmetic programs and reverse ratios. Particularly useful for checking that a question requires linked transformations. | Repository MIT licence retrieved. Financial report excerpts have upstream provenance; do not assume repository software terms resolve all document rights. Program patterns studied; no question text imported. |
| 2. [TAT-QA](https://github.com/NExTplusplus/TAT-QA) | Table/text joins, monetary scales, arithmetic derivations and changing denominators. | README explicitly licenses **dataset CC BY 4.0**; repository code is MIT. Eight unmodified table contexts retained with attribution and a licence link. Eligible for attributed adaptation after checking the particular record; requires conversion to five-option questions and independent re-solving. |
| 3. [ConvFinQA](https://github.com/czyssrs/ConvFinQA) | Dependent multi-turn computations; useful for making later calculations depend on reconstructed quantities. | MIT repository licence retrieved; underlying financial-document provenance still matters. Methods only in the app. |
| 4. [MultiHiertt](https://github.com/psunlpgroup/MultiHiertt) | Multiple hierarchical tables, subtotals, cross-table joins. | MIT repository licence retrieved; dataset download is hosted externally and was not fetched. Rights and record quality require review before importing. |
| 5. [HiTab](https://github.com/microsoft/HiTab) | Hierarchical statistical headers and denominator selection. | Computational Use of Data Agreement retrieved. Computational-use rights do not establish permission to republish a question bank. Methods only. |
| 6. [NumGLUE](https://github.com/allenai/numglue) | Numerical inference, quantitative comparison and diverse task structures. | Aggregates source datasets; source-specific licences required. No blanket permission inferred. |
| 7. [SVAMP](https://github.com/arkilpatel/SVAMP) | Semantic perturbations: change the unknown, relationship or wording while controlling arithmetic. | Repository MIT licence retrieved; dataset file parsed. Useful for robustness checks; most individual questions are below the new challenge target. |
| 8. [AQuA-RAT](https://github.com/google-deepmind/AQuA) | Five-option quantitative problems with rationales. Useful for distractor design and equation translation. | Apache 2.0 notice retrieved. Retain required notices and inspect source provenance before adaptation. Data file parsed; no item text imported. |
| 9. [DeepMind Mathematics](https://github.com/google-deepmind/mathematics_dataset) | Compositional generation, separate difficulty controls and extrapolation. | Apache 2.0 licence retrieved. Useful generator architecture; many domains are outside EPSO data interpretation. |
| 10. [TabMWP](https://github.com/lupantech/PromptPG) | Structured tables, tabular solutions and both free-text and multiple-choice formats. | Dataset explicitly **CC BY-NC-SA 4.0**, despite MIT software and inconsistent README badges. Do not treat it as unrestricted ready-to-upload material. Schema inspected; no examples redistributed here. |
| 11. [GSM8K](https://github.com/openai/grade-school-math) | Worked multi-step solutions and clean answer formatting; a useful lower-difficulty baseline. | MIT licence retrieved and stored in full beside eight copied reference examples. Suitable as attributed reference data, but generally too easy and too weak on tables to upload as the requested very hard sets. |
| 12. [TabFact](https://github.com/wenhuchen/Table-Fact-Checking) | Aggregation, ranking, filtering and verifying numerical claims. | MIT repository licence retrieved; underlying Wikipedia data may carry separate attribution/share-alike requirements. Methods only. |
| 13. [WikiTableQuestions](https://github.com/ppasupat/WikiTableQuestions) | Finding relevant rows, joins and multi-operation questions over tables. | CC BY-SA 4.0 licence retrieved. Redistribution/adaptations require attribution and applicable share-alike terms. Not uploaded. |
| 14. [TAT-DQA](https://github.com/NExTplusplus/TAT-DQA) | Document layouts, scale interpretation and locating relevant numerical evidence. | README explicitly identifies dataset CC BY 4.0. Data and layouts not downloaded; less compatible with the current offline table renderer. |
| 15. [DROP / AllenNLP reading comprehension](https://github.com/allenai/allennlp-reading-comprehension) | Discrete arithmetic and combining numerical facts from prose. | No dataset licence confirmed in this inspection; do not import without checking DROP-specific terms. |
| 16. [ASDiv](https://github.com/chaochun/nlu-asdiv-dataset) | Diversity of arithmetic structures and semantic categories. | README states CC BY-NC 4.0. Noncommercial restriction; not treated as unrestricted app content. |
| 17. [MAWPS](https://github.com/sroy9/mawps) | Template diversity, duplicate control and overlap analysis. | Licence not confirmed; source problems may carry separate rights. Methods only. |
| 18. [MathQA](https://github.com/math-qa/math-QA) | Arithmetic operation programs and multiple-choice formats. | Retrieved LICENSE is attributed to Blackrock Digital, consistent with website tooling; this does **not** establish dataset permission. No dataset question text imported. |
| 19. [MathDial](https://github.com/eth-nlped/mathdial) | Socratic tutoring and breaking problems into reasoning steps. | README links CC BY-SA 4.0; also inspect upstream problem provenance. Methods for Coach hints, not a ready numerical test set. |
| 20. [datasets/gdp](https://github.com/datasets/gdp) | Compact country/year GDP CSV; plausible future exhibit inputs. | README explicitly states data CC BY 4.0 with World Bank attribution. The CSV itself was not fetched in this pass. Archive a dated snapshot and preserve units before using it. |
| 21. [Eurostat Python tools](https://github.com/eurostat/pyrostat) | Future access to authentic EU economic indicators. | EUPL 1.1 licence applies to the tool; it does not settle the terms for every statistical dataset. Official data site blocked here. |
| 22. [World Bank API tools](https://github.com/tgherzog/wbgapi) | Indicator selection, country/year alignment and units. | Tool MIT licence retrieved; review the dataset's own terms separately. Official data site blocked here. |
| 23. [OWID Grapher](https://github.com/owid/owid-grapher) | Exhibit design, chart metadata and source provenance. | Licence file retrieved; software and third-party data terms must be distinguished. No data copied. |
| 24. [Plotly datasets / Gapminder mirror](https://github.com/plotly/datasets) | Candidate country/population/GDP tables for weighted comparisons. | MIT repository licence retrieved; check the original Gapminder record licence and provenance before reuse. No blanket permission for all mirrored files inferred. |

## Reference examples and attribution

`reference-data/gsm8k-reference-sample.json` contains the first eight records of the OpenAI GSM8K test split, unchanged inside a metadata wrapper. Source: [OpenAI grade-school-math](https://github.com/openai/grade-school-math), Cobbe et al. (2021), *Training Verifiers to Solve Math Word Problems*. Copyright OpenAI, MIT; full notice in `reference-data/GSM8K-LICENSE.txt`.

`reference-data/tatqa-reference-sample.json` contains the first eight table contexts of the TAT-QA development split, unchanged inside a metadata wrapper. Attribution: Fengbin Zhu et al. (ACL 2021), *TAT-QA: A Question Answering Benchmark on a Hybrid of Tabular and Textual Content in Finance*. Source: [TAT-QA](https://github.com/NExTplusplus/TAT-QA), dataset [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Selection and the wrapper are the only changes. The source URL, retrieval date and full-file SHA-256 are included in each sample file. Preserve these credits if examples are redistributed or adapted. Do not imply endorsement.

These benchmarks are not EPSO practice tests. Many records are straightforward arithmetic; none is certified as hard just because it appears in a research benchmark. Some contain open answers, negative answers, text spans or multiple spans. Bulk uploading them would require content review, format conversion, independent answer verification, plausible distractors, overlap checks and licence compliance.

## Reusable authoring brief

1. **Start with a dependency chain.** Write the shortest valid solution before generating numbers. A very hard item must require at least four linked transformations, including a changing base, a reverse calculation or a binding constraint. A longer table or longer solution alone does not qualify.
2. **Use familiar arithmetic with difficult structure.** Percentages, ratios, weighted totals, units, stock balances and simple inequalities are enough. Supply all finance, VAT, engineering and policy rules in the stem or notes; require no outside specialist knowledge.
3. **Keep the exhibit honest.** Use two related sources where helpful; include realistic irrelevant rows, explicitly stated units and matching dates. Mark synthetic data fictional. For real data, save the precise file, series, release date, licence, revision and transformation before authoring; never fabricate an attribution to Eurostat or another provider.
4. **Vary the unknown.** Turn a forward total into a missing rate, minimum order, maximum allocation or threshold. Test reverse percentages, pooled changing populations, capacity after losses, rebased indices and whole-unit feasibility.
5. **Design mistakes before options.** Calculate wrong bases, wrong rows, omitted fees/losses, additive instead of compounded percentages, omitted constraints, and incorrect rounding. Four plausible incorrect outcomes must survive final rounding. Very hard sets cannot use generic nearby percentage fillers. Keep options sorted and balance key positions without inventing fillers.
6. **Verify from visible data.** Add an independent solver in `tests/numerical-oracle.test.mjs`; do not import generator arithmetic into it. Check units, final precision, one correct rounded answer, rate bounds, cap activation, stock conservation and minimum-feasible thresholds where applicable.
7. **Review shortcuts.** Check that a wrong reading cannot produce an equally valid answer. Do not give away the operation through topic labels before answering. Avoid repeated model and answer-position order across sets.
8. **Pilot the difficulty.** First-attempt correctness and time at 120 seconds per item should validate the labels. Repeated templates, hints and memorised answers contaminate calibration. Current labels are editorial until real response data exist.

The four new original sets use ten models, each with four data variants: pooled real productivity; cross-currency landed cost; reverse pooled success rate; recovered-output capacity; capped weighted redistribution; yield-adjusted profit threshold; linked-index real per-capita change; reverse stock flow with returns; hedged exchange-rate threshold; loss-adjusted emissions substitution. Their structure follows these general methods; their tables, stems, options and solutions were authored for this project.

## How to use this library later

Read this file, `sources.json` and `docs/NUMERICAL_AUDIT.md` before expanding numerical content. Study the small local reference examples; use the source links and scripts when more material is needed. Extend `scripts/generators/numerical-hard.mjs` or `numerical.mjs`, add an independent solver and rubric entry, generate, then run the checks. Preserve existing question IDs; use new IDs for new or substantively rewritten questions.

```bash
# Optional network research refresh; these scripts respect the inherited proxy.
python scripts/research-numerical.py
python scripts/research-reference-samples.py

# Authoring and local checks
node scripts/generators/numerical.mjs
npm run audit:numerical
npm run lint
npm test
npm run validate
npm run build
npm run test:e2e
```

Do not assume a licence excerpt or archived link proves that terms have not changed. Check source-specific terms before a future import. No paid, leaked or proprietary EPSO/provider question sets have been imported.

## Project repair: foundation distractors

All 150 foundation questions were regenerated under new revision IDs; all 190 numerical items now use named calculation mistakes, with no generic fillers. Models include wrong dates/bases, omitted or duplicated adjustments, wrong rows and non-compounded changes. The original 0.7–1.4 option range and exhibit-value exclusion remain enforced, including after rounding. Data regenerates deterministically when a template cannot supply four distinct usable mistakes.

`scripts/generators/numerical-baseline.json` preserves original content fingerprints. `numerical-revisions.json` maps each superseded ID to its revision and content fingerprint; generation rejects an unregistered substantive edit. Future revisions require fresh IDs. Old attempt history is retained; an unfinished round containing retired questions is discarded with a recovery notice because its answer indices cannot safely be applied to changed questions.
