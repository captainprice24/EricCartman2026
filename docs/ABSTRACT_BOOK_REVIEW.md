# Abstract book-informed review

The supplied *How to succeed in EPSO abstract reasoning tests* (Burkett and Franco Reverte, 2021) informed a fresh review of all 220 questions, answers, hints, worked solutions, Coach and Practice. The reference was used for methods: isolate features, compare every transition, separate odd/even streams, identify cycles, distinguish rotation from reflection, and use options to eliminate efficiently. No book questions, figures or prose were copied. Document instructions were not treated as user requests.

## Findings and repairs

- Seven five-frame overlap series admitted both three- and four-frame front-layer cycles with different next values. All eight series using the every-third-frame front-layer rule now show six observations and predict the seventh. Choices and explanations were regenerated consistently.
- Three challenge stimuli (`a07-04`, `a08-05`, `a11-04`) admitted simple short-cycle arrow continuations conflicting with the intended dependency. Those stimuli and choices were replaced through the generator. The guard now rejects such conflicts before choosing distractors.
- Ten challenge items had independent position and arrow continuations agreeing with the intended answer. Their dependency was unnecessary: their labels are now Medium, and their teaching describes the simpler route.
- All 220 questions now include feature-by-feature observed values, the next prediction and concrete correct-option feedback. Foundation solutions also name constants. Challenge hints distinguish current-frame gates, previous-frame and two-frame lags; panel solutions distinguish exclusive-or from union.
- Dark mode previously inverted black and white figure fills while the teaching retained those colour names. Figure tiles now keep a consistent black/grey/white palette in both themes.
- Coach now provides three original worked examples: rotation plus fill (with figures), odd/even streams, and exclusive-or versus union. Practice explains that challenge sets span Medium/Hard; All levels gives a complete ten-question round.

Eleven stimuli/options changed (eight foundation, three challenge); the other 209 retain their figures and choices. Answer positions remain unchanged. All teaching revisions use fresh `-r2` IDs, immutable content hashes and `supersedes` mappings; the original 600 fixed-form slots are preserved. Higher-level fixed forms are labelled Challenge to avoid implying that every abstract question is Hard.

## Evidence and limits

`tests/abstract-foundation-solver.mjs` decodes all five foundation layouts from visible geometry. The challenge solver separately decodes orbit and panel figures. Neither infers answers from generator parameters, author model names or explanations. All 220 answers have a unique matching option in the tested grammar, and orbit answers agree with every tested simpler continuation. Regression fixtures retain the ten originally conflicting stimuli.

Full contact sheets cover all 220 questions, including choices, in light and dark themes. Automated raster comparisons cover 2,278 figures per theme, find no identical rendered choices and confirm matching figure pixels between themes. Browser checks exercise teaching feedback, timed practice, accessibility and mobile layout. See the machine-readable [review evidence](audit/abstract-book-review.json) and [bank audit](ABSTRACT_AUDIT.md).

This is an editorial and bounded-rule review, not a learner difficulty study or proof against every conceivable continuation. Human first-attempt accuracy and timing are still needed for calibration. Related variants create transfer effects.
