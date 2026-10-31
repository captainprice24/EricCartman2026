# Test-environment parity audit: AD5 Reasoning Trainer vs EPSO/AD/427/26 on TAO

**Audit date:** 31 October 2026 · **Commit audited:** `02d0c77` on `claude/admiring-heisenberg-firfio`
**Scope:** does the exam simulation reproduce the environment candidates will meet in the Part 1
reasoning tests of EPSO/AD/427/26 (week of 9–13 November 2026, remote, TAO + Proctorio)?
Question content, difficulty calibration and the coach/practice modes are out of scope except where
they leak into the simulation.

**Overall verdict: NOT YET AT PARITY.** The test format (counts, durations, pass marks, weighting,
language, navigation rules, bookmarking, overview, dot-decimal calculator, auto-submit at zero) is
correct and verified. The **tools are not**: the calculator and the scratchpad are fixed blocks docked
under the question data instead of movable, resizable windows, the scratchpad is a plain text box
rather than a drawing canvas, four TAO tools are missing, and the trainer adds keyboard shortcuts and
timer warnings that do not exist on test day. Two findings are rated High and should be fixed before
the tool is relied on for final rehearsal; none is blocking for content practice.

---

## 1. Sources and method

| Source | Status | Used for |
|---|---|---|
| EPSO invitation to the online tests, EPSO/AD/427/26, published 19 October 2026 (candidate's own copy) | Official, primary | Test window, platform, proctoring model, durations, question counts, language, prerequisite-check window. Personal data in the letter was not recorded. |
| *EPSO Instructions for online testing (TAO) 427-26 V1*, 28 pages, Annex I §6.2–6.4 (candidate's own copy; confidential, not redistributed, summarised in original wording only) | Official, primary | Toolbar composition, behaviour of every e-tool, navigation, overview, timers, submit dialogs, breaks, forbidden items. |
| [EPSO, AD5 graduates: how you are assessed](https://selection.eu-careers.europa.eu/en/ad5-graduates-selection-process-how-you-are-assessed) | Official | Pass marks and weightings. |
| [TAO vendor user guide, test-taker tools](https://userguide.taotesting.com/user-documentation/latest/public/using-test-taker-tools) | Vendor | Generic behaviour of calculator, scratchpad, highlighter, line reader, elimination, masking. |
| Secondary guides (eutesting.org, epsogenius.com, eu-now.com, passepso.com) | Secondary, not relied on where they conflict with the above | Cross-check only. One secondary FAQ claims numerical + abstract run as a single 30-minute block; the official invitation contradicts this (20 min + 10 min). |

**Method.** Source review of `assets/app.js`, `assets/core.js`, `assets/styles.css`, `docs/research.md`
and `docs/research/full-tests-2026-10/`; an instrumented Playwright run in headless Chromium at
1366×768 (exam simulation for each test type, tool opening, drag attempt on the calculator header,
keyboard input, timer thresholds, section transition, submit dialog); and the repository's own gates.

**Repository gates at the audited commit (all pass):** `npm run lint` ✓ · `npm test` 35/35 ✓ ·
`npm run validate` ✓ (41 sets, 740 questions) · `npm run build` reproduces the committed
`dist/ad5-reasoning-trainer.html` and `version.js` byte-for-byte ✓ · no console errors or page errors
during the browser probe ✓. The CI workflow additionally runs the e2e suite in Chromium and WebKit.

---

## 2. Findings

Severity: **High** = a candidate rehearsing with the trainer will meet a materially different tool or
behaviour on test day; **Medium** = builds a habit or expectation that does not transfer, or omits a
tool the candidate should rehearse; **Low** = cosmetic or wording difference; **Info** = cannot be
verified from official material, or no action needed.

| ID | Severity | Finding |
|---|---|---|
| ENV-01 | **High** | Calculator is a static block docked under the data exhibit. It cannot be dragged, resized or placed over the question; it opens below the fold. |
| ENV-02 | **High** | Scratchpad is a plain text box docked under the calculator. TAO's scratchpad is a movable, resizable window with select, text, brush, shape and erase tools plus undo/redo. |
| ENV-03 | Medium | Calculator key set differs from TAO's basic calculator (trainer adds parentheses, √, ^ and a click-to-reuse history list; TAO uses CE/AC and up/down arrows to review previous operations). |
| ENV-04 | Medium | Keyboard answer shortcuts (A–E, 1–5, F, ←/→, X) do not exist in TAO. With the calculator closed, typing a digit on a numerical item silently changes the answer. |
| ENV-05 | Medium | Section flow: no timed instruction page with automatic start; the between-tests screen has no clock and allows an unlimited pause. |
| ENV-06 | Medium | Four TAO tools are absent: line reader, answer masking, accessibility panel (contrast themes, cursor, font size/line height/spacing), zoom in/out. Answer elimination is always on, whereas in TAO it is off until enabled in Settings. |
| ENV-07 | Low | Timer: `mm:ss left`, amber at 5 min, red at 1 min, with spoken warnings. TAO shows `XXmin YYs` at the top with no documented colour warning. |
| ENV-08 | Low | Navigation bar and overview use different colours, legend and placement from TAO (Overview button lives in the TAO navigation bar; states are grey / outlined / filled black). |
| ENV-09 | Low | Submit dialogs use trainer wording ("Submit test / Cancel"). TAO uses "Review my answers / Submit and proceed" and "Keep answering / Submit and proceed" (last part: "Submit the test"). |
| ENV-10 | Low | Highlighter has one colour and no eraser tool; TAO offers colour choice, an eraser and "clear all". |
| ENV-11 | Low | Research notes are stale: "expected October/November 2026"; the window is confirmed as 9–13 November 2026, with the prerequisite check from 20 October to 6 November. Proctorio and the "no live proctoring" model are not documented. |
| ENV-12 | Low | The pre-test briefing says the clock keeps running if you "close the page" and to "choose Resume". On test day closing, reloading or leaving the test tab terminates the test. The wording normalises a disqualifying action. |
| ENV-13 | Info | All three reasoning tests are taken in Language 1; general instructions are in English and French. The trainer is English-only. Correct for L1 = English candidates; others must practise reading in their L1 elsewhere. |
| ENV-14 | Info | Two-column layout (stimulus left, answers right), option lettering A–E and scratchpad scope (per test part) cannot be verified from the official guide. The mandatory prerequisite check and the public TAO sessions are the only authoritative reference for these. |

---

## 3. Detailed findings and evidence

### ENV-01 (High): calculator is docked, not movable

**Official behaviour (TAO guide §6.4.5).** The calculator is a window: relocate it by dragging its
header; resize it in height and width; close it with its own icon; type with the keyboard or the
buttons; `=` or Enter evaluates; the dot is the decimal separator; previous operations are reviewed
with up/down arrows. The vendor guide adds that it stays open and preserves position, size,
expression, result and history between items.

**Trainer behaviour.** `toolTrayHTML()` (`assets/app.js:410-429`) renders the calculator inside the
stimulus column, after the data tables. `.tool-panel` (`assets/styles.css:322`) is `position: static`
with `max-width: 360px`; nothing in the code handles pointer drag or resize.

Probe at 1366×768, numerical exam, calculator and scratchpad opened on question 1:

| Element | Top edge (px) | Comment |
|---|---|---|
| Viewport height | 768 | |
| Calculator panel | 763.5 | Entirely below the fold at open; the candidate must scroll, which scrolls the data table out of view. |
| Scratchpad panel | 1301 | Two screens down. |
| Calculator after a 300×200 px header drag | unchanged | Only the page scrolled. `position: static`, no `draggable` attribute, default cursor. |

What *is* correct: dot-only decimals (a comma is rejected, matching "the comma is not supported"),
Enter and `=` evaluate, the calculator stays open with its expression when moving to the next
question, keyboard digits are routed to the calculator while it is open, Escape closes it.

**Required fix.** Render calculator and scratchpad as floating panels (`position: fixed`, default
top-right under the toolbar, drag by header with pointer events, CSS `resize: both`, z-index above
the question, position and size preserved across questions and persisted in the session). Keep a
"dock" fallback below 900 px for the trainer's phone layout, which is irrelevant to the real test
(TAO does not support phones or tablets). Add an e2e check that the header drag moves the panel and
that the panel can be placed over the answer column.

### ENV-02 (High): scratchpad is a text box, TAO's is a drawing canvas

**Official behaviour (§6.4.4).** A window opened from the toolbar with Select (move items), Text (text
box for plain text), Brush (freehand), Shape (rectangle, ellipse, straight line) and Erase tools, with
undo/redo; it can be resized, expanded and repositioned. Pens and paper are **forbidden** during the
test (§3.2.4), so this window is the only place to work.

**Trainer behaviour.** `<textarea id="scratch">` (`assets/app.js:425-426`), docked, one text per test
part. Abstract reasoning in the trainer offers only this text box, so a candidate cannot rehearse
sketching rotations or counting elements the way they will have to on test day.

**Required fix.** Replace with a canvas-based scratchpad (text tool, freehand brush, line, rectangle,
ellipse, select/move, erase, undo/redo) in the same floating window frame as ENV-01. Persist strokes
in the session (`sec.scratch` can hold a serialised object instead of a string; `validSession` in
`assets/core.js` must accept it). Keep the text tool keyboard-first so typed working remains fast.

### ENV-03 (Medium): calculator key set

The trainer offers `C ( ) ⌫ ÷ × − + . √ ^ =` and a ten-entry history with "reuse" links
(`assets/app.js:414`, `514-517`; `C.calcEval` in `assets/core.js`). The TAO guide shows a basic
calculator with CE and AC keys and describes reviewing previous operations with up/down arrows. The
trainer's on-screen note states the calculator "has no % key"; the audit could not verify the
presence or absence of `%` on the live calculator from official material. A candidate who learns to
rely on parentheses, √ or ^ may find them absent.

**Required fix.** Align the key set with what the candidate sees in the prerequisite check (the
candidate should screenshot nothing, but can report the key layout). Until verified: present the
extra keys as "trainer extras, not confirmed on TAO" or move them behind a non-default option.
Replace the clickable history list with up/down recall to match the described interaction. Keep the
sentence about the comma; drop the unverified sentence about `%`.

### ENV-04 (Medium): keyboard shortcuts that do not exist on test day

`onKey()` (`assets/app.js:1151-1221`) maps A–E and 1–5 to answers, F to flag, ←/→ to previous/next
question, X to strike out. The TAO guide describes mouse interaction only (click the number, click the
arrow, click the bookmark icon); no answer shortcuts are documented.

Probe: on a numerical item, after closing the calculator with Escape, pressing `3` selected option C.
A candidate who types a figure out of habit, or who believes the calculator is still open, changes
their answer without noticing. The brief screen and the home page actively advertise these shortcuts.

**Required fix.** In exam mode default to mouse-only answering (keep the WAI-ARIA radio-group
keyboard navigation for accessibility, which is standard behaviour of a focused radio group, but do
not select on letter/digit keys and do not move questions on ←/→ outside the option list). Offer the
shortcuts as an explicit "trainer shortcuts" option that is off for exam simulation. Remove the
shortcut lines from the pre-test briefing.

### ENV-05 (Medium): section flow and breaks

**Official behaviour (§6.3.5, §6.3.7).** Each part opens on instruction page(s) with their own
countdown; when it elapses the test starts automatically. The test clock then runs for the current
section only. Additional breaks exist only for candidates with prior EPSO authorisation, with their
own timer, and the next part starts automatically when that timer ends.

**Trainer behaviour.** `viewBrief()` and `viewBetween()` (`assets/app.js:692-709`, `775-782`) wait for a
manual "Start …" click with no clock; `tick()` returns early on those views. A candidate can pause
for as long as they like between verbal, numerical and abstract. The between screen also reveals
"You answered N of M questions", which TAO does not show after submission.

**Required fix.** Replace the manual start with a timed instruction screen (suggest 60 s, visible
countdown, "the test starts automatically") that auto-starts the section; allow a "Start now" button.
Remove the answered-count line from the between screen. Keep Resume for the trainer, but see ENV-12.

### ENV-06 (Medium): missing tools and default state of elimination

| TAO fixed-toolbar tool (§6.2.2, §6.4) | Trainer | Gap |
|---|---|---|
| Attached documents (instructions PDF opens on the right, with search, zoom, page jump) | "Instructions" side panel | Equivalent in purpose. |
| Highlighter (colour choice, eraser, clear all) | Single colour, click-to-remove, "Clear highlights" | Low, see ENV-10. |
| Line reader (strip over the text, resizable with the arrow handle, movable with the lines handle) | **Absent** | Candidates with reading-focus needs cannot rehearse it. |
| Scratchpad (drawing window) | Text box | See ENV-02. |
| Calculator (movable window) | Docked block | See ENV-01. |
| Answer elimination (strike-through; **off by default**, enabled via Settings gear) | Always on, ✕ button on every option | Candidates will not know they must enable it; the trainer never shows the Settings step. |
| Answer masking (hide an option; off by default) | **Absent** | |
| Accessibility tools (contrast themes, cursor size/colour, font, size, line height, word and letter spacing) | Light/dark theme only, on the home page | Not reachable during a test. |
| Proctorio movable toolbar (webcam view, battery, zoom in/out, position, minimise) | Not reproduced | Acceptable (proctoring is out of scope), but zoom in/out is the only sanctioned way to enlarge content; the trainer should state that browser zoom shortcuts are discouraged on test day. |

**Required fix.** Add a line reader and answer masking; add a Settings gear that gates elimination and
masking (off by default in exam mode, on in practice if desired); add an accessibility panel with at
least contrast theme and font-size/line-height controls that works during a test; add zoom in/out
buttons that scale the question area.

### ENV-07 (Low): timer presentation and warnings

`timerText()`/`timerClass()` (`assets/app.js:324-333`) show `20:00 left`, turn amber at ≤5 min and red at
≤1 min, and `tick()` announces "5 minutes left" and "1 minute left". TAO (§6.3.5) shows a clock at the
top in the form `34min 42s` and the guide documents no colour or audio warning. Rehearsing with
warnings the real test does not give trains the wrong pacing cue.

**Required fix.** In exam mode render `XXmin YYs` without colour changes; keep the screen-reader
announcements as an opt-in accessibility setting.

### ENV-08 (Low): navigation bar and overview

TAO (§6.3.1–6.3.3): a navigation bar with a back arrow, numbered circles, an **Overview** button inside
the bar and a forward arrow; states are light grey (not opened), black outline (opened, unanswered),
white number on black (answered), small arrow under the current number; the Overview panel has a
Bookmarked section with a count. The trainer's circles use accent-blue fill for answered, an inset
outline for visited and a gold dot for flagged, with the Overview in the tool strip. The trainer's
Overview filters (All / Unanswered / Bookmarked with counts) are functionally equivalent.

**Required fix.** Restyle the circles to the three TAO states, move Overview into the navigation bar,
and add the current-question arrow. Keep the trainer legend.

### ENV-09 (Low): submit dialog wording

The trainer shows one dialog ("N questions are unanswered … You cannot return to this test after
submitting." with Cancel / Submit test). TAO (§6.3.6) uses two variants per part: all answered →
"Review my answers" / "Submit and proceed"; unanswered remaining → "Keep answering" / "Submit and
proceed"; on the final part the confirm button reads "Submit the test". The trainer already computes
the unanswered count; only the wording and button labels need aligning.

### ENV-10 (Low): highlighter

TAO (§6.4.2): pencil icon, select text, choose a colour, eraser for one part, "clear all". Trainer:
single colour, click a highlight to remove it, "Clear highlights" link. Add colour choice and an
eraser mode; keep the per-paragraph offset model, which is sound.

### ENV-11 (Low): stale and incomplete research notes

`docs/research.md` line 7 says Stage 1 is "expected October/November 2026". The invitation fixes the
window at 9–13 November 2026, individual slot visible on TAO from 19 October, prerequisite check
mandatory between 20 October and 6 November, delivery via TAO with the Proctorio extension, recorded
audio/video/screen with human review and no live proctor. None of this is in the research file, and
the on-screen "Instructions" panel does not mention the prerequisite check, which is the single most
useful rehearsal the candidate can do. Update the file and add one line to the Instructions panel.

### ENV-12 (Low): briefing text normalises a disqualifying action

`viewBrief()` tells the candidate the timer "keeps running if you switch tabs or close the page" and to
"reopen it and choose Resume". On test day, closing or reloading the test tab, opening another tab, or
navigating away is listed among the actions that terminate the test (TAO guide §3.2.6). Keep Resume as
a trainer convenience, but word it as such and state the real-test consequence.

### ENV-13 (Info): language

The invitation lists all three reasoning tests in Language 1 and the general instructions in English
and French. The trainer's footer already says this. No action, but the README should state plainly
that candidates whose Language 1 is not English are rehearsing the format, not the language.

### ENV-14 (Info): unverifiable layout details

The official guide does not show a reasoning item in full, so the following cannot be audited and
must not be presented as verified: two-column passage/answers layout; whether options carry letters
A–E; whether the scratchpad is per item or per test part; whether the verbal stem is exactly "Which of
the following statements is correct?". The repository's existing statement that it "does not claim
platform parity" (`docs/research/full-tests-2026-10/README.md`) is correct and should be surfaced in the
README instead of the stronger "TAO-informed tools … in the exam format".

---

## 4. What is confirmed correct

| Item | Trainer | Official | Verdict |
|---|---|---|---|
| Verbal | 20 questions, 35 min, independent timer | 35 min, 20 questions, L1 | ✓ |
| Numerical | 10 questions, 20 min, independent timer | 20 min, 10 questions, L1 | ✓ |
| Abstract | 10 questions, 10 min, independent timer | 10 min, 10 questions, L1 | ✓ |
| Order | verbal → numerical → abstract | listed in that order in the invitation | ✓ (order itself not stated as binding) |
| Pass marks | verbal 10/20; numerical + abstract 10/20 combined | same | ✓ |
| Weighting | verbal 40 % preliminary / 35 % final; numerical and abstract eliminatory only | same | ✓ |
| Navigation | free within the current part; no return after submit | same (§6.3.1, §6.3.6) | ✓ |
| Bookmark | any question, answered or not; listed in overview with count | same (§6.3.2) | ✓ |
| Overview states | not opened / opened-unanswered / answered / current | same four states (§6.3.3) | ✓ semantics, ✗ styling (ENV-08) |
| Calculator input | keyboard or buttons; `=`/Enter; dot decimal; comma rejected | same (§6.4.5) | ✓ |
| Calculator persistence | stays open across questions with its expression | same (vendor guide) | ✓ |
| Time-out | current part auto-submitted at zero | implied by per-section clock and auto-advance | ✓ |
| Answers saved continuously | session persisted on every change | "results are continuously saved" (§4.1) | ✓ |
| No negative marking | stated in briefing | stated on the TAO instruction page screenshot | ✓ |
| Offline, no third-party requests | verified in `index.html` loader and build | n/a (trainer property) | ✓ |

---

## 5. Remediation plan

Priority order, each with its acceptance criterion. Items 1–3 close the High findings and the
user-reported defect; 4–7 close the Medium findings.

1. **Floating tool windows (ENV-01).** Calculator and scratchpad open as fixed-position panels over
   the question, draggable by header, resizable, position/size preserved across questions and reloads.
   Acceptance: e2e test drags the calculator header 300 px right/200 px down and asserts the new
   bounding box; the data exhibit remains in view while the calculator is open at 1366×768.
2. **Canvas scratchpad (ENV-02).** Text, brush, line, rectangle, ellipse, select, erase, undo/redo.
   Acceptance: a freehand stroke on question 1 is still present on question 2 and after reload.
3. **Exam-strict input mode (ENV-04).** Letter/digit answer shortcuts and ←/→ question keys off in
   exam simulation; typing a digit with the calculator closed changes nothing.
4. **Timed instruction page and automatic start (ENV-05).** Countdown, auto-start, no answered count
   between parts.
5. **Missing tools (ENV-06).** Line reader, answer masking, Settings gear gating elimination and
   masking (off by default in exam mode), accessibility panel, zoom in/out.
6. **Calculator key set (ENV-03).** Verify on the prerequisite check, then align keys and recall
   behaviour; remove the unverified `%` statement.
7. **Presentation alignment (ENV-07 to ENV-10).** `XXmin YYs` timer without colour cues, TAO
   navigation states and Overview placement, submit-dialog wording, highlighter colours and eraser.
8. **Documentation (ENV-11 to ENV-14).** Update `docs/research.md`, the Instructions panel, the
   briefing text, and state in the README which TAO features are and are not reproduced.

Every change touches `assets/app.js`, `assets/core.js` (session schema for canvas data) and
`assets/styles.css`; per `AGENTS.md`, run `npm run lint`, `npm test`, `npm run validate`,
`npm run build` and `npm run test:e2e`, and commit the regenerated `dist/` and `version.js`.

---

## 6. Limitations of this audit

- The TAO guide is a generic platform description; it does not show a reasoning item, so layout-level
  parity (ENV-14) can only be confirmed by the candidate during the mandatory prerequisite check or
  in the anonymous public TAO sessions (§2.5.9), which "might not showcase every feature".
- The exact key layout of the live calculator and the presence of a `%` key were not verifiable.
- Browser verification was done in headless Chromium only; the project's CI covers WebKit. Test day
  requires Chrome or Edge 148+ on a desktop with a single display, which the trainer cannot enforce.
- No proctoring, identity, room-scan or full-screen behaviour is reproduced, by design.
