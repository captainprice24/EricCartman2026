# Abstract visual review

Reviewed 19 October 2026 with Chromium using the application's actual `EPSO_RENDER.figureSVG` implementation.

The contact-sheet script renders all forty challenge series and their five choices, plus ten foundation questions covering all five old layouts. It saves a standalone HTML sheet and ten PNG sheets across light and dark themes. The author visually inspected every new item across the four set sheets, a dark challenge sheet and the dark foundation sample. This was an author inspection, not an independent human blind review.

Observations:

- Orbit markers, arrows and dot counts remain separated. Eight small ring anchors stay fixed; the larger marker is distinguishable in white, grey and black. Direction is carried by an asymmetric arrow, so a rotation is visually meaningful.
- Final revisions prevent an early whole-frame cycle and require a substantive relationship beyond the easy supporting tracks. These constraints are independently tested.
- Each binary composition figure has three separated two-by-two panels and a bottom arrow. Cells remain visible in both themes. The theme reverses the light/dark presentation consistently; comparisons remain within the figure.
- All correct and wrong figures are inside the canvas. No new moving component is hidden behind another; the independent tests check circle and cell bounds.
- Foundation samples show the existing overlap, hands, grid, single-shape and divided-circle layouts. Some old grid elements are small and close together; this pass preserves them. The full 150 foundation items were not individually visually re-reviewed.
- Browser regression checks traverse every new item and its answer feedback at desktop and 390px phone widths, including dark mode, five choices, six stimulus frames, no page overflow and the ten-minute round timer. Accessibility scans cover challenge feedback in both layouts/viewports; they do not make this visual reasoning task usable without vision.

Reproduce with:

```bash
CHROMIUM_PATH=/usr/bin/chromium node scripts/render-abstract-contact-sheets.mjs
```

Omit `CHROMIUM_PATH` to use Playwright's installed Chromium. PNGs go to ignored `test-results/abstract-contact-sheets/`; the durable SVG/HTML sheet goes to this research directory. Its outlined answer is for review only and is never shown before answering in the app.

## Additional full tests (sets09–11)

Reviewed every new series and all five choices in the generated light and dark contact sheets (thirty items, sixty theme rows). Marker positions, grey/white/black fills, arrow angles, dot counts and panel cells remain distinguishable, with no observed clipping or unintended overlap. Panel gutters remain visible at the rendered size. Separate geometry-based inference verifies the continuation, supporting-track ambiguity and absence of repeated complete stimulus keys; visual inspection alone does not establish unique mathematical rules. All original figure files remain unchanged.

## November whole-bank review

The new contact sheets cover all 220 questions and all options (22 groups, 44 PNGs in two themes). Every item was visually inspected on the light sheets; dark samples cover all five foundation layouts and both challenge layouts. The semantic review independently solves all 220 keys within documented bounded grammars. Eight front-layer series now show six observations and three challenge stimuli were replaced.

A theme-specific teaching defect was found: dark mode reversed filled black and white shapes while explanations retained their colour names. Figure tiles now use a fixed black/grey/white palette in both themes. Revised dark sheets confirm visible outlines, grey separation, front-layer boundaries and arrow directions; figure colours now match the teaching. Grid icons remain compact but identifiable. These are author visual checks, not independent human blind review or empirical difficulty calibration. Earlier statements that foundation items were not re-reviewed and all figures were preserved describe the historical pass only.

## 8 November: commercial-sample follow-up

The current sheets cover all **300 questions**, in 30 groups / 60 light-dark PNGs. All 50 repaired patterned answer sets and all 30 new transfer items were visually inspected in both themes. The unchanged 270 stimuli are protected by exact object hashes; foundation option geometry is also unchanged.

New checks and corrections:

- A symmetric corner glyph initially made a reflection equivalent to a rotation. Its original outline was revised; the independent reader now finds exactly one orientation/reflection and does not depend on vertex order.
- Boundary fragments now meet at the drawn frame boundaries (coordinates 2 and 98), with matching slope and crossing coordinate. The earlier draft used the SVG canvas edges, two units beyond the drawn frame. Deliberate nonmatching distractors remain distinguishable.
- Container boxes and token spacing were enlarged. Tokens are solid and separated; small square quantity marks remain outside the boxes. No token is hidden under a transfer arrow.
- Coverage is represented by quarter bands and circle sectors. Empty/full sectors have no visible starting orientation, which the solver handles explicitly. Stripe directions distinguish foreground from background.
- All repaired pattern options remain visibly different. Grey/black/white, the fixed black sector, clockwise/anticlockwise changes and patterned tiles retain their meanings in dark mode.

The browser suite now traverses all 80 repaired/new items at desktop and 390px phone widths, checks answer feedback and overflow, and compares actual option raster images for all 30 new items. Accessibility scans cover the new rounds. This remains an author visual review and independent-code check, not an independent human blind trial or measured AD difficulty calibration.

## 9 November: remove Easy from abstract practice

Regenerated all 300 current items in **35 groups / 70 light-dark PNGs**. Visually inspected every one of the 141 replacements and all five alternatives on the light sheets: 24 grid, 24 quadrant, 23 conveyor, 56 orbit and 14 binary-panel questions. Dark samples cover all five replacement layouts; the fixed figure palette preserves the colour names and patterned fills.

Grid markers remain separated from the patterned cells; quadrant boundaries and the stationary black segment remain visible. Opposed rows have distinct pattern sequences and clear pointers. Orbit markers, arrows, ring anchors and bottom counts do not overlap. All three binary panels retain visible gutters and cell outlines. No clipping or duplicate-looking alternatives were observed. Existing Medium/Hard figures are unchanged, as verified against the archived bank.

The browser suite now visits all 150 questions in Sets 01–04 at desktop and 390px phone widths, in addition to existing rounds. It checks the Medium/Hard selector, safe fallback from a saved Easy preference, exact item counts, timing, feedback and horizontal overflow. Geometry solvers independently verify every key; visual checks alone do not establish a unique rule or a measured difficulty level.
