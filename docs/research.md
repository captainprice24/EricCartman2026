# Research: EPSO AD5 reasoning tests and practice platforms

Compiled October 2026. Check the Notice of Competition for your own competition before relying on these figures.

## The test format this app simulates

The AD5 competition (EPSO/AD/427/26) now runs in two parts. Part 1 is the computer-based
reasoning tests, confirmed by EPSO's invitation of 19 October 2026 for the **week of 9–13 November
2026**: individual slots are shown on the TAO platform from 19 October, and a mandatory technical
prerequisite check must be completed between 20 October and 6 November, otherwise technical
complaints on test day are dismissed. Only candidates who pass go on to Part 2 (EU knowledge,
digital skills and the EU free-text essay, expected in 2027).

**Delivery.** Remote, from the candidate's own computer, on the TAO platform of Open Assessment
Technologies with the Proctorio browser extension (Chrome or Edge, single display, webcam and
microphone). There is no live proctor: audio, video and screen are recorded and reviewed. Closing or
reloading the test tab, opening another tab, leaving full screen or losing the connection for more
than two minutes terminates the test. General instructions are in English and French; all three
reasoning tests are taken in Language 1.

**Platform tools (TAO guide 427-26 V1, Annex I).** A fixed toolbar with attached documents
(instructions), highlighter (colours, eraser, clear all), line reader, scratchpad (a movable,
resizable drawing window with select, text, brush, shape and erase tools), calculator (movable and
resizable, keyboard input, dot decimals, previous operations reviewed with arrows), a settings
menu that switches on answer elimination and answer masking, and accessibility tools (contrast
themes, cursor, font, size, line height, word and letter spacing); a movable Proctorio toolbar
with zoom in/out. The navigation bar has a back arrow, numbered circles (grey not opened, outlined
opened but unanswered, filled answered, arrow under the current one), an Overview button with a
bookmarked list, and a forward arrow. Each part opens on an instruction page with its own countdown
and starts automatically; the clock at the top shows the minutes and seconds left in the part.
[docs/ENVIRONMENT_AUDIT.md](ENVIRONMENT_AUDIT.md) records how the trainer compares and what was
changed to match.

| Test | Questions | Time | Pass mark |
|---|---|---|---|
| Verbal reasoning | 20 | 35 min | 10/20 |
| Numerical reasoning | 10 | 20 min | 10/20 combined with abstract |
| Abstract reasoning | 10 | 10 min | 10/20 combined with numerical |

**Scoring and ranking (official).** EPSO's assessment page for EPSO/AD/427/26 confirms the pass
marks and states that the verbal reasoning score also counts towards the ranking: **40% of the
preliminary score and 35% of the final score**. Numerical and abstract reasoning are pass/fail
gates only. In Stage 2, EU knowledge has a pass mark of 15/30 (30% preliminary, 25% final), digital
skills 20/40 (30% preliminary, 25% final) and the EUFTE 5/10 (15% of the final score).
An earlier version of this file gave the digital skills pass mark as 15/30; the official page says
20/40. EPSO does not publish cut-off scores, so candidates should aim well above the verbal pass mark.

**Language.** Candidates sit the tests in the two languages chosen in their application (EPSO
FAQ). Secondary guides state that the reasoning tests are taken in Language 1. This trainer is
English-only for now; the data format supports translations.

- Verbal items: a dense text, then "Which of the following statements is correct?" with four options (A–D).
- Numerical items: a table or chart with five options. An on-screen calculator and scratchpad are provided.
- Abstract items: a series of five figures; choose the next one from five options.
- Delivery: remote, on the TAO (Testing Assisté par Ordinateur) platform.

Sources: [EPSO, AD5 graduates: how you are assessed](https://selection.eu-careers.europa.eu/en/ad5-graduates-selection-process-how-you-are-assessed),
[EPSO, AD5 FAQ](https://selection.eu-careers.europa.eu/en/help/faq/graduate-administrators-ad5),
[EU Training AD5 2026 guide](https://eutraining.eu/content/your-complete-guide-2026-epso-ad5-graduates-exam),
[EU Training reasoning test overview](https://eutraining.eu/content/what-are-epso-reasoning-tests-verbal-numerical-and-abstract-reasoning),
[EU Careers (EPSO)](https://eu-careers.europa.eu/).

## Platforms that offer simulations

| Platform | Model | What it offers |
|---|---|---|
| [EPSO sample tests](https://eu-careers.europa.eu/) | Free, official | A few sample items per test; the only official source. EPSO does not endorse any training provider. |
| [EU Training (eutraining.eu)](https://eutraining.eu/) | Free demo + paid packages | The largest commercial question bank (35,000+ questions claimed), practice and exam modes with explanations, analytics, webinars and workshops. Verbal in 24 languages. |
| [EPSOready (epsoready.eu)](https://epsoready.eu/) | Free tier (25 questions) + one-time €49.99 / €69.99 | Replicates the TAO interface (navigation circles, strike-out, calculator, scratchpad, highlighter), Practice and Exam modes, dashboard, 8 languages. |
| PassEPSO | Paid (€99–€149, per EPSOready's comparison) | Full preparation packages. |
| [European Careers Portal 2.0 (euphorum.org)](https://www.euphorum.org/en/demo/testmodus) | Demo + paid | Practice mode (untimed, with explanations) and real-time test mode (20 / 10 / 10 items, 35 / 20 / 10 min). |
| Training4EU (epso.gnomio.com) | Free | Older sample tests (2016) covering verbal, numerical, abstract and more. |

## REA analysis of the leading TAO simulator

[REA](https://github.com/morluto/rea) (`rea-agents` 6.4.0) was used to passively inspect the
**public** pages of EPSOready, the platform that most closely copies the TAO interface. It
attached to a headless Chromium over the Chrome DevTools Protocol and ran
`rea inspect-web-page` on the home page, the abstract test landing page and the free
diagnostic page. No account was created, no email was submitted, and no paid or
question content was collected.

Findings:

- **Stack:** a Next.js app (Turbopack chunks), localised into 8 languages through path prefixes (`/fr`, `/de`, …).
- **Exam interface features advertised and visible in the public mockup:**
  - question navigation circles with answered, unanswered and flagged states;
  - an answer elimination tool (strike through wrong options);
  - an on-screen calculator;
  - a text scratchpad;
  - a text highlighter on the reading passage;
  - the timer position and format of the real exam;
  - a "Submit test" button in the header.
- **Layout:** the passage sits on the left. The statement panel on the right holds the question and options A–D, each with a ✕ elimination button. A toolbar groups the tools.
- **Modes:** Practice (no time limit, instant step-by-step explanations) and Exam (timed); a progress dashboard; a free 10-question diagnostic gated behind an email address.

How this app uses the findings: every TAO tool in the list above is built into the
exam simulation. Two features go beyond what the analysed platform advertises:

- **Coach mode:** a method lesson before each round, progressive hints, and an explanation for every option.
- **"Coach me on my mistakes":** starts a coach round on the questions you got wrong.

All questions are original.
