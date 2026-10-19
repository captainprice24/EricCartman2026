# Abstract reasoning research library

Checked 19 October 2026. This is a reusable authoring library, not a trained model or an imported EPSO question bank.

## What the research yielded

Twenty-two repository/dataset candidates were checked: **18 READMEs verified**, four paths unresolved. Ten official, commercial or research websites were attempted and blocked by this environment's outbound policy. A blocked site was not reviewed. General GitHub searches returned no extractable repository results, so the catalogue uses named sources and links followed from verified project documentation. This is a bounded search, not an exhaustive survey of the web.

The useful result was a set of methods: structured attributes, composing transformations, distinguishing visual perception from rule inference, testing systematic generalisation, and checking whether choices reveal the answer without the stimulus. Most sources use matrices, concept classification or input/output grids. They are not drop-in EPSO series sets. No third-party question or figure is registered in the app.

| Source | Verified finding and practical use | Reuse decision |
|---|---|---|
| [RAVEN](https://github.com/WellyZhang/RAVEN) | Seven visual configurations, structured grammars and explicit attributes. Separate changing elements from irrelevant decoration. | GPL-3.0 repository code; dataset rights are not assumed. Methods only; no code copied. |
| [PGM](https://github.com/google-deepmind/abstract-reasoning-matrices) | Progression, XOR, OR, AND and consistent-union relations; held-out relations/attribute combinations. Informs the two composed-panel families and future family-level evaluation. | README explicitly limits data to non-commercial research. No data imported. |
| [SRAN / I-RAVEN](https://github.com/husheng12345/SRAN) | README explains generating alternative answer sets to correct defects in RAVEN. This is the located I-RAVEN implementation; two initial guessed paths were wrong. | Methods reference. See licence evidence in `sources.json`; no source code/data copied. |
| [SCL / Balanced-RAVEN](https://github.com/dhh1995/SCL) | Object/attribute/relation decomposition and a balanced-answer benchmark. Supports checking individual features as well as overall option similarity. | MIT code does not establish rights to all underlying datasets. Reference only. |
| [ALANS](https://github.com/WellyZhang/ALANS) | Algebraic treatment and systematic generalisation. Informs relative orientation and transformation composition. | Reference only. |
| [PrAE](https://github.com/WellyZhang/PrAE) | Separate perception, abductive rule inference and execution. Informs solving from rendered coordinates rather than trusting generator state. | GPL repository; no code copied. |
| [CoPINet](https://github.com/WellyZhang/CoPINet) | Contrastive spatial-temporal reasoning. Useful for designing close distractors, while retaining checks against answer-only shortcuts. | GPL repository; no code copied. |
| [WReN](https://github.com/Fen9/WReN) | Relational reasoning over matrix panels. | No reusable dataset licence established. Methods only. |
| [Distracting feature / LEN](https://github.com/zkcys001/distracting_feature) | Attribute distraction and learning-to-reason research. | No content imported. |
| [MXGNet](https://github.com/thematrixduo/MXGNet) | Multiple relationships among visual components. | Methods only. |
| [Bongard-LOGO](https://github.com/NVlabs/Bongard-LOGO) | README describes 12,000 concept-learning problems and controllable position/orientation/size nuisances. Keep perceptual clutter separate from reasoning complexity. | MIT repository; dataset downloads not inspected. No examples imported. |
| [Bongard-HOI](https://github.com/NVlabs/Bongard-HOI) | Human/object concept induction. Low direct relevance to a geometric series app; retained as adjacent research. | Not imported. |
| [ARC-AGI-1](https://github.com/fchollet/ARC-AGI) | Exact input/output grid tasks, multiple demonstrations and compositional transformations. Four public **training** tasks parsed and saved for author study. | Apache-2.0, full licence and attribution preserved. Not registered in the app. |
| [ARC DSL](https://github.com/michaelhodel/arc-dsl) | Interpretable grid transformation vocabulary. | Methods only; no code copied. |
| [RE-ARC](https://github.com/michaelhodel/re-arc) | Generators for variations of ARC training tasks and verified generated examples. Supports variation within a known family while recognising family-level repetition. | MIT repository code; no generated examples imported. |
| [CLEVR](https://github.com/facebookresearch/clevr-dataset-gen) | Controlled scene generation and relational programs. Mainly an authoring-method reference. | No images, code or tasks imported. |
| [CLEVRER](https://github.com/chuangg/CLEVRER) | Temporal and counterfactual scene relationships. Adjacent research rather than EPSO content. | No content imported. |
| [Relational networks / Sort-of-CLEVR](https://github.com/kimhc6028/relational-networks) | Relational/non-relational controls. Useful distinction between isolated feature tracking and a dependency. | No content imported. |

`sources.json` preserves checked URLs, access results, README hashes, short relevant excerpts, licence evidence and decisions. README verification is not a full dataset download, content-quality review or licence guarantee. Unresolved candidates were ARC-AGI-2, two guessed I-RAVEN paths and lab42/arc; the I-RAVEN implementation was subsequently located within SRAN. Ten website access failures are recorded separately.

## Licensed reference examples

`reference-data/arc-training-reference-sample.json` contains four unchanged ARC-AGI-1 training tasks: `007bbfb7`, `00d62c1b`, `017c7c7b`, `025d127b`. Attribution: François Chollet and ARC contributors, [upstream repository](https://github.com/fchollet/ARC-AGI). Each record has its source URL, source hash and original demonstration/test pairs. The complete Apache-2.0 licence is in `reference-data/ARC-AGI-LICENSE.txt`; no upstream NOTICE file was found. These are public training examples, not held-out evaluation data and not evidence about EPSO difficulty.

Refresh the research catalogue and samples with `python scripts/research-abstract.py`. Do not silently change the reuse decision to allow app imports merely because a repository contains a code licence.

## Original challenge collection

Sets **5–8** contain **ten questions each**: forty variants across ten families. Each series shows six frames and five options; each round takes ten minutes at the app's exam pace.

1. Alternating marker strides with a delayed arrow relationship.
2. Accelerating marker strides with a delayed arrow relationship.
3. Separate odd/even marker streams with a delayed arrow relationship.
4. Marker movement gated by its previous colour.
5. Colour-gated arrow turns combined with orientation-gated marker moves.
6. Alternating translation and reflection.
7. Alternating arrow turns with delayed marker handoff.
8. Accelerating arrow angle measured relative to a moving marker.
9. Accelerating left-grid turns, rotating middle grid and exclusive-or composition.
10. Accelerating left-grid turns, an additional fixed rotation and union with a moving middle grid.

Orbit families also track colour and dot-count cycles; panel families track a bottom arrow. These supporting tracks do not independently make an item hard. Distractors break one or two features, and each feature alone leaves more than one option. The supporting colour/count cycles together also leave multiple orbit options; for panels, even both inputs plus the arrow leave multiple options, so the output relationship matters. No key repeats a complete displayed frame. Two keys occupy each answer position in each set. The three established option-only heuristics remain below their 30% ceilings. This does not establish resistance to every shortcut.

The independent solver in `tests/abstract-oracle.test.mjs` receives only displayed shapes and enumerates a bounded rule grammar, without generator parameters or author model labels. All forty stimuli yield one continuation in that grammar and one matching option. A finite series can support other invented rules; this is not a proof of universal uniqueness or a human blind review.

## Future authoring brief

- Start with a relationship, not a busier picture. A new angle or more dots is a variant, not a new reasoning family.
- Show enough transitions to repeat each phase and distinguish plausible rules. Six frames support these alternating, delayed and interleaved designs.
- Make dependencies observable: distinguish the current frame from the previous one in explanations. Check whether a simpler independent rule predicts the same continuation.
- Use distinguishable shapes and stable anchors. Avoid overlapping moving elements, symmetry-equivalent rotations, hidden fills and size-only traps.
- Generate plausible single-/double-feature errors. Verify both whole-option and single-feature shortcuts; random wrong pictures are insufficient.
- Infer the key again from rendered geometry using separate code. Then review actual SVGs on desktop/phone and in both themes.
- Split calibration by reasoning family, not just question ID. Seeing another variant can inflate apparent skill.
- Treat difficulty as editorial until first-exposure timing and accuracy are available.

The complete bank inventory is in `inventory.csv` and `inventory.json`; the findings and limitations are in [the audit](../../ABSTRACT_AUDIT.md). The saved [contact sheets](contact-sheets.html) contain every new item and a ten-item foundation sample. `VISUAL_REVIEW.md` records the inspection.
