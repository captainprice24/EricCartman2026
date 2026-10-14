# Research: EPSO AD5 reasoning tests and practice platforms

Compiled October 2026. Check the Notice of Competition for your own competition before relying on these figures.

## The test format this app simulates

The AD5 competition now runs in two stages. Stage 1 (expected October/November 2026) is the
computer-based reasoning tests, and only candidates who pass them go on to Stage 2
(EU knowledge, digital skills and the EU free-text essay, expected in 2027).

| Test | Questions | Time | Pass mark |
|---|---|---|---|
| Verbal reasoning | 20 | 35 min | 10/20 |
| Numerical reasoning | 10 | 20 min | 10/20 combined with abstract |
| Abstract reasoning | 10 | 10 min | 10/20 combined with numerical |

- Verbal items: a short text, then "Which of the following statements is correct?" with four options (A–D).
- Numerical items: a table or chart with five options. An on-screen calculator and scratchpad are provided.
- Abstract items: a series of five figures; choose the next one from five options.
- Delivery: remote, on the TAO (Testing Assisté par Ordinateur) platform.

Sources: [EU Training AD5 2026 guide](https://eutraining.eu/content/your-complete-guide-2026-epso-ad5-graduates-exam),
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
