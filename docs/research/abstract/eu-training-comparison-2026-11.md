# EU Training samples compared with our abstract bank

Reviewed 8 November 2026. The uploaded PDF contains **15 distinct question screenshots**, each with five displayed frames and five choices. I inspected all 15 visually and OCR-read the visible explanations. Several explanations and selected/correct choices are below the screenshot edge. I distinguish visible observations from an established intended rule; a selected answer marked wrong is not treated as the key.

The current remote branch is `ccc0072`. Its abstract questions, generator inputs and renderer match the locally reviewed `424b28c` revision. This comparison makes **no changes to the application or question bank**.

## Assessment

The bank is useful for learning rotation, movement, fill cycles, alternation and delayed relationships. The latest patterned items improve its resemblance to the commercial examples. However, the earlier comparison placed too much weight on patterned graphics. This larger sample exposes gaps in **the kinds of relationships candidates must discover**, the ability to **ignore irrelevant details**, and whether **the answer choices actually require the intended reasoning**.

The right next step is a targeted answer-choice review followed by a small, more varied pilot. Increasing the number of variants of the present three patterned families would leave the main gaps unresolved.

## What is currently in our bank

- **270 items: 29 Easy, 181 Medium, 60 Hard.** These are editorial labels, not measured commercial-equivalence ratings.
- **150 foundation items:** 30 each of Single figure, Grid movement, Overlapping shapes, Divided circle and Rotating hands. These use familiar independent feature tracks.
- **70 challenge items:** 20 named model variants, drawn in two main layouts: 56 orbit/arrow series and 14 three-panel compositions. They include delayed, conditional, interleaved, reflected and Boolean-composition relationships. These capabilities should be preserved.
- **50 new Medium items:** 17 alternating grid shifts, 17 rotating quadrants with a fixed segment, and 16 opposed conveyor rows. All fifty come from three model families.
- **192 items show five frames; 78 show six.** The basic five-frame/five-choice format is already close to the supplied sample. Six frames remain justified where a delayed or alternating rule needs the additional evidence.

Counts were recomputed from all registered abstract files. Current geometry-based oracle tests also passed: **7 tests, 0 failures**, covering the foundation, challenge and patterned banks. This supports the existing answers within the tested rule grammars. It does not establish equal human difficulty or complete coverage of the commercial examples.

## Page-by-page comparison

Page numbers refer to the uploaded PDF, not external EU Training question IDs.

| PDF page | Visible content or displayed explanation | Our coverage and implication |
|---|---|---|
| 1 | A two-row banded background changes while foreground symbol identity, number and arrangement also vary. The complete intended explanation is not visible. | Patterned fills exist, but our new medium pictures attach them mostly to fixed grid/ring/row layouts. The sample requires separating foreground and background information in a less uniform scene. Add variety in what a pattern represents, without claiming its precise unseen rule. |
| 2 | Three columns of segmented bars. The visible feedback states that each column follows a different movement rule; first-frame arrows help indicate direction. | Our conveyor/grid families cover related movement concepts. We have less variation in independently moving subgroups and segmented-bar displays. This is partial coverage, not a missing movement concept altogether. |
| 3 | The displayed explanation links the current large shape to the **previous frame's small-symbol identity**, compares grey and black counts using **fewer than**, and alternates their inside/outside positions. | We have delayed position/angle handoffs, but no equivalent shape-identity handoff or inside/outside counting model. Exact cyclic counts do not train the same inequality. High-priority addition. |
| 4 | Arrows enter and leave a central lens-like object. Their side, direction, line style and grey/black appearance vary. No complete explanation is shown. | Our orbit arrows cover orientation and conditional relationships, but not this input/object/output presentation. A useful original future family would make an observable transformation depend on arrow style or direction. Its precise commercial rule should not be assumed from appearance alone. |
| 5 | Nested regions and a two-part central object have patterned/solid fills and changing positions. The selected B is marked wrong; the key and full explanation are not visible. | We have outer/inner rotations and a fixed exception, so this is not wholly absent. Broaden layered object tracking and region-specific transformations; do not treat extra shading or the screenshot's glow as added reasoning. |
| 6 | The displayed explanation explicitly says arrows continue across opposite frame edges, **arrow count varies randomly**, and their common destination side rotates. | Our rows wrap discrete cells, but we do not train matching clipped arrow fragments across boundaries. Nor do our current models teach an expressly irrelevant changing count. High-priority addition. |
| 7 | Six asymmetric shapes move among positions and change orientation/fill. The selected C is marked wrong; full explanation absent. | Our foundation shapes change or rotate in fixed roles. We need more tracking of a persistent object's identity while it moves and undergoes a local transformation. The exact full rule is inferred only provisionally. |
| 8 | A changing diagonal partition separates patterned regions. Symbols vary in fill, distribution and counts across the regions. Full explanation absent. | Patterned quadrants provide partial visual practice. Counting/distributing objects relative to a changing boundary is underrepresented. Avoid claiming a specific count relationship that the screenshot does not establish. |
| 9 | The visible explanation describes a striped background growing by thirds then uncovering, and a circle's striped area shrinking then returning. A small central symbol also appears in some frames; its explanation is cut off. | Our fills mostly switch among categories or move between segments. Area coverage that grows, reaches a limit and reverses is a different useful track. We should add reversible coverage and explicitly separate it from rotation. |
| 10 | Large and small shapes share identity within a frame; symbols are distributed inside/outside; counts and background shades vary. Full explanation is off-screen. | Related to page 3's visual demands, but it must not be assumed to have the same identity lag. Add same-frame identity matching, group counts and region relationships as distinct possibilities. |
| 11 | Four triangular background regions change while named foreground objects persist and appear over different regions; their fill/outline contrast varies. Full explanation absent. | We already cover multi-region motion. Broader object/background binding and visibility/contrast relationships would improve transfer beyond our fixed segment/pointer vocabulary. Exact appearance rules remain provisional. |
| 12 | Six distinguishable irregular symbols change position, orientation, size/shape details and pattern. No full explanation or key shown. | A strong case for object-specific transformations and permutation scenes. We should create asymmetric original glyphs and independently verify rotation versus reflection; regular polygons can hide that distinction. |
| 13 | Connected boxes contain symbol groups with changing counts, orientations and a background that alternates. Full explanation absent. | We have count cycles, but not this multi-container accounting/flow presentation. It is a candidate for conservation or transfer questions; the screenshot alone does not establish its complete flow rule. |
| 14 | Three marked cells move on a grid. The visible first rule says the black cell moves horizontally and bounces at an edge. Further feedback is cut off. | This is already close to our grid movement foundations and boundary-reversal tracks. Keep these modules. The sample does not imply every good question needs dense artwork or a complicated dependency. |
| 15 | Three horizontal slider-like rows have white segments with different positions/lengths across frames. No key/explanation shown. | Simple position cycles and boundary reversal already exist conceptually in our bank. Sliders would vary the presentation. Segment length should be a deliberate signal or controlled nuisance, not an accidental rendering difference. |

## Newly measured answer-choice weakness

I decoded the fifty patterned Medium items using the existing visible-geometry reader and inferred their next feature values from the displayed series. For each feature I counted how many choices match that prediction. A feature can select the answer alone when exactly one choice has the predicted value.

**Four of fifty have a simple single-feature solution:**

| Item | Sufficient feature | Why it matters |
|---|---|---|
| `a12-05` | Alternating centre-square colour | All four wrong choices have the wrong centre, so the outer and inner rotations can be ignored. |
| `a15-04` | Corner-marker position | Predicting the marker alone selects the answer. |
| `a15-10` | Alternating background | Predicting the background alone selects the answer. |
| `a16-02` | Pointer direction | All five choices have the same top row and same bottom row. Neither conveyor movement has to be solved. |

**Nine of fifty can be selected using only supporting features**, leaving the main grid/ring/tile transformation unnecessary. This includes the four above and `a13-03`, `a13-06`, `a14-05`, `a14-08`, `a16-06`. For the additional five, a combination of background/corner/marker-fill values is sufficient.

In the foundation bank, **70 of 150**, including **53 of 121 labelled Medium**, have at least one individually discriminating decoded feature. Some are legitimate foundation/elimination exercises. This finding calls for item-level review, not automatic rejection or a blanket difficulty change. Some decoded features, such as an entire grid arrangement, themselves contain substantial reasoning. The more compelling weaknesses above use a simple colour, corner or pointer.

These are **series-based elimination routes**, not answer-only guessing. A candidate still has to infer a real rule. Efficient elimination is a valid test skill. The design problem is that a lesson labelled “opposed conveyors” can award the answer without the candidate understanding either conveyor. Existing medoid/outlier/majority guessing checks do not catch that problem. Likewise, passing the full-answer oracle does not test which subset of the intended rules is necessary.

## Recommended sequence

### 1. Repair or relabel the clearest answer-choice cases first

Review the four single-cue cases, then all nine supporting-cue cases. For an exam-practice item intended to teach a main mechanism, make at least two answer choices agree with the easy background/pointer/marker cues while disagreeing on that mechanism. Check that the main mechanism still has enough evidence in the series. Preserve helpful Easy elimination exercises in a foundation track, labelled according to their shortest reasonable solution.

Apply the same diagnostic to existing Medium foundation questions. Keep the bank useful for learning; avoid treating every item as a full simulation of the commercial sample's demands.

### 2. Pilot 30 original items across six broader families

Five items per family is a proposed pilot size, not a claim that these samples establish the ideal exam distribution:

1. **Identity handoff:** one frame's small-symbol type controls a later frame's large object. Separate current-frame and previous-frame relationships.
2. **Region relationships:** inside/outside placement with fewer/more/equal counts, rather than requiring exact individual number cycles in every track.
3. **Boundary continuation and irrelevant detail:** match fragments across edges; make a controlled changing count irrelevant in some series.
4. **Persistent object tracking:** permute distinct asymmetric shapes while applying object-specific rotation, reflection or size change.
5. **Area coverage and background interactions:** grow/shrink/reverse a region; track foreground properties against moving patterned areas.
6. **Connected containers and segmented displays:** original count transfers, subgroup shifts or slider/bounce systems, with conservation used only where explicitly supported.

Use different original geometry, rules, parameters and distractors. The commercial material is a design reference; copying its questions would not establish quality or transfer.

### 3. Improve teaching and selection

Coach should teach: identify the objects; separate identity from location; test count relationships; compare current versus previous frames; check inside/outside; test wrap versus bounce; distinguish rotation from reflection; and accept that some changing features can be irrelevant.

Explain the **minimum sufficient route** as well as all observed rules. Where a nuisance feature is intentional, say why it was not needed. In mixed practice, interleave genuinely different families so the layout does not announce the solution method. Keep related variants out of calibration first attempts.

### 4. Verify before releasing

- Generate rather than hand-edit abstract files. Preserve published IDs and give substantive revisions fresh IDs with traceability.
- Add separate solvers for each new visible relationship and tests against plausible simpler alternatives. Include a feature-subset check so the intended mechanism cannot be bypassed unintentionally.
- Obtain a fresh key-free solution/review before release, checking that independent solvers notice the same intended relationship.
- Inspect actual rendered choices in both themes at desktop and phone sizes. For deliberately clipped fragments, test wrap geometry explicitly; do not introduce accidental clipping. Keep asymmetric shapes and hatch patterns distinguishable.
- Run the repository's required validation/build/browser checks before any push. Then measure unseen first-attempt correctness, time and actual solution strategy at the app's 60-second-per-item practice pace. Use those results to revise labels and mix.

## Practical conclusion

Keep the present foundations and the useful conditional/delayed challenge logic. Repair weak answer sets and broaden what the candidate has to discover. A 30-item pilot with new relationships would be more valuable now than another large batch of the same three patterned templates.

This review compares a supplied commercial sample with the bank. It does not claim official EPSO certification or a measured difficulty equivalence. Some provider explanations are unavailable in the screenshots, and the inferred descriptions above are marked accordingly.

## Local evidence

- `our-bank.json`: all 270 registered items used in this comparison.
- `feature-elimination.json`: per-item feature match counts for all 200 non-challenge questions.
- `provider-visible-text.txt`: OCR of screenshot-visible text; images were checked separately and override OCR mistakes.
- `oracle-check.log`: seven existing abstract tests passed.
- `audit_features.mjs`: reproducible supporting-feature analysis.
