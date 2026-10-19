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
