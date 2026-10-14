EPSO_BANK.registerSet({
  id: "numerical-01",
  section: "numerical",
  title: "Numerical Reasoning · Set 1",
  description: "10 EPSO-style data interpretation items: percentages, ratios, density, currency, speed.",
  version: 1,
  questions: [
    {
      id: "n01-01",
      topic: "Density / ratios",
      difficulty: 2,
      exhibit: {
        type: "table",
        title: "Population and area, selected EU Member States (illustrative figures)",
        columns: ["Country", "Population (millions)", "Area (thousand km²)"],
        rows: [
          ["Austria", "9.1", "83.9"],
          ["Belgium", "11.8", "30.7"],
          ["Czechia", "10.9", "78.9"],
          ["Denmark", "5.9", "42.9"],
          ["Portugal", "10.4", "92.2"]
        ]
      },
      stem: "Which country has the second-highest population density?",
      options: ["Austria", "Belgium", "Czechia", "Denmark", "Portugal"],
      answer: 2,
      hints: [
        "Density = population ÷ area. The units cancel consistently, so you can compare 'millions per thousand km²' directly.",
        "Belgium is clearly highest. Compare Czechia (10.9 ÷ 78.9) with Denmark (5.9 ÷ 42.9) carefully, because they are very close."
      ],
      solution: [
        "Austria: 9.1 ÷ 83.9 ≈ 0.1085 → about 108 people per km²",
        "Belgium: 11.8 ÷ 30.7 ≈ 0.3844 → about 384 per km² (highest)",
        "Czechia: 10.9 ÷ 78.9 ≈ 0.1381 → about 138 per km²",
        "Denmark: 5.9 ÷ 42.9 ≈ 0.1375 → about 138 per km² (slightly lower)",
        "Portugal: 10.4 ÷ 92.2 ≈ 0.1128 → about 113 per km²",
        "Second-highest: Czechia."
      ],
      optionNotes: [
        "About 108 people per km², which is one of the lowest.",
        "Highest, not second-highest. Read the question carefully.",
        "Correct: about 138.1 people per km².",
        "About 137.5 people per km². This is the close trap: just below Czechia.",
        "About 112.8 people per km²."
      ],
      explanation: "When two values look close, calculate to at least three significant figures before choosing. Czechia's 0.1381 beats Denmark's 0.1375."
    },
    {
      id: "n01-02",
      topic: "Percentage change",
      difficulty: 1,
      exhibit: {
        type: "table",
        title: "Agency budget by programme line (EUR million)",
        columns: ["Programme line", "2022", "2023", "2024"],
        rows: [
          ["Research", "120", "126", "138"],
          ["Training", "80", "84", "86"],
          ["Outreach", "50", "52", "51"]
        ]
      },
      stem: "By what percentage did the agency's total budget increase between 2022 and 2024?",
      options: ["9.1%", "10%", "11%", "12%", "12.5%"],
      answer: 1,
      hints: [
        "Add each column first: you need the totals for 2022 and 2024. Ignore 2023.",
        "Percentage change = (new − old) ÷ old × 100."
      ],
      solution: [
        "Total 2022 = 120 + 80 + 50 = 250",
        "Total 2024 = 138 + 86 + 51 = 275",
        "Change = (275 − 250) ÷ 250 = 25 ÷ 250 = 0.10 → 10%"
      ],
      optionNotes: [
        "This is (275 − 250) ÷ 275 ≈ 9.1%. Dividing by the new value instead of the old one is a classic error.",
        "Correct.",
        "Too high.",
        "Too high.",
        "This is not the growth of the total. Research alone grew 15%, and Outreach barely changed."
      ],
      explanation: "Always divide the change by the starting (old) value."
    },
    {
      id: "n01-03",
      topic: "Ratios from a chart",
      difficulty: 2,
      exhibit: {
        type: "bar",
        title: "Exports to non-EU partners by quarter (EUR billion)",
        unit: "EUR bn",
        categories: ["Q1", "Q2", "Q3", "Q4"],
        series: [
          { name: "Machinery", values: [42, 45, 39, 48] },
          { name: "Chemicals", values: [30, 36, 26, 40] }
        ]
      },
      stem: "In which quarter was the ratio of machinery exports to chemicals exports highest?",
      options: ["Q1", "Q2", "Q3", "Q4", "Q1 and Q3 equally"],
      answer: 2,
      hints: [
        "Compute machinery ÷ chemicals for each quarter.",
        "The quarter with the highest machinery value is not necessarily the one with the highest ratio."
      ],
      solution: [
        "Q1: 42 ÷ 30 = 1.40",
        "Q2: 45 ÷ 36 = 1.25",
        "Q3: 39 ÷ 26 = 1.50",
        "Q4: 48 ÷ 40 = 1.20",
        "Highest ratio: Q3."
      ],
      optionNotes: [
        "1.40, which is second.",
        "1.25.",
        "Correct: 1.50.",
        "Q4 has the highest absolute exports, but its ratio is the lowest (1.20).",
        "Q1 = 1.40 and Q3 = 1.50, so they are not equal."
      ],
      explanation: "Ratio questions reward computing every option. The intuitive choice (the biggest bar) is often wrong."
    },
    {
      id: "n01-04",
      topic: "Currency conversion",
      difficulty: 2,
      exhibit: {
        type: "table",
        title: "Exchange rates: units of foreign currency per 1 EUR",
        columns: ["Currency", "Rate per EUR"],
        rows: [
          ["US dollar (USD)", "1.08"],
          ["Pound sterling (GBP)", "0.85"],
          ["Swiss franc (CHF)", "0.96"],
          ["Japanese yen (JPY)", "160.00"]
        ],
        note: "Assume no fees or commissions."
      },
      stem: "A traveller converts GBP 500 into Swiss francs at these rates (via the euro). How many francs do they receive?",
      options: ["CHF 442.71", "CHF 510.00", "CHF 531.25", "CHF 564.71", "CHF 588.24"],
      answer: 3,
      hints: [
        "First convert GBP to EUR: divide by the GBP rate, because the rate is GBP per EUR.",
        "Then convert EUR to CHF: multiply by the CHF rate."
      ],
      solution: [
        "GBP 500 ÷ 0.85 = EUR 588.235…",
        "EUR 588.235 × 0.96 = CHF 564.71"
      ],
      optionNotes: [
        "This comes from 500 × 0.85 ÷ 0.96. The rates are applied the wrong way round.",
        "Not derived from these rates.",
        "Not derived from these rates. Check the direction of each conversion.",
        "Correct.",
        "This is the euro amount. You stopped after the first step."
      ],
      explanation: "With rates quoted as 'foreign currency per EUR', divide to get euros and multiply to get foreign currency."
    },
    {
      id: "n01-05",
      topic: "Percentages of a subgroup",
      difficulty: 1,
      exhibit: {
        type: "table",
        title: "Staff of a Directorate-General by function group and gender",
        columns: ["Function group", "Women", "Men"],
        rows: [
          ["Administrators (AD)", "132", "108"],
          ["Assistants (AST)", "96", "64"]
        ]
      },
      stem: "What percentage of AD staff are women?",
      options: ["45%", "50%", "53%", "55%", "57%"],
      answer: 3,
      hints: [
        "The base (denominator) is AD staff only, not all staff.",
        "AD total = 132 + 108."
      ],
      solution: [
        "AD total = 132 + 108 = 240",
        "Women share = 132 ÷ 240 = 0.55 → 55%"
      ],
      optionNotes: [
        "This is the share of men in AD.",
        "Too low.",
        "Not derived from the table.",
        "Correct.",
        "This is the share of women across all staff: 228 ÷ 400 = 57%. You used the wrong base."
      ],
      explanation: "Identify the correct base before calculating. EPSO distractors are built from the most common wrong bases."
    },
    {
      id: "n01-06",
      topic: "Relative vs absolute change",
      difficulty: 3,
      exhibit: {
        type: "bar",
        title: "Share of renewables in electricity consumption (%)",
        unit: "%",
        categories: ["Country A", "Country B", "Country C", "Country D", "Country E"],
        series: [
          { name: "2019", values: [20, 35, 25, 40, 12] },
          { name: "2023", values: [30, 45, 36, 52, 20] }
        ]
      },
      stem: "Which country recorded the largest relative (percentage) increase in its renewables share between 2019 and 2023?",
      options: ["Country A", "Country B", "Country C", "Country D", "Country E"],
      answer: 4,
      hints: [
        "'Relative increase' means the change divided by the 2019 value, not the change in percentage points.",
        "A small starting value can produce a big relative increase."
      ],
      solution: [
        "A: (30 − 20) ÷ 20 = 50%",
        "B: (45 − 35) ÷ 35 ≈ 28.6%",
        "C: (36 − 25) ÷ 25 = 44%",
        "D: (52 − 40) ÷ 40 = 30%",
        "E: (20 − 12) ÷ 12 ≈ 66.7%",
        "Largest relative increase: Country E."
      ],
      optionNotes: [
        "50%: large, but not the largest.",
        "About 28.6%.",
        "44%.",
        "D has the largest increase in percentage points (+12), but only 30% in relative terms. This is the main trap.",
        "Correct: about 66.7%, even though it has the smallest increase in percentage points (8)."
      ],
      explanation: "Percentage points measure absolute change in a percentage. A percentage change is relative to the starting value. EPSO frequently tests this distinction."
    },
    {
      id: "n01-07",
      topic: "Average speed",
      difficulty: 2,
      exhibit: {
        type: "table",
        title: "Rail journey legs",
        columns: ["Leg", "Distance (km)", "Travel time"],
        rows: [
          ["1", "120", "48 min"],
          ["2", "200", "1 h 12 min"],
          ["3", "80", "40 min"]
        ],
        note: "Ignore time spent at intermediate stations."
      },
      stem: "What is the average speed over the whole journey?",
      options: ["145 km/h", "150 km/h", "155 km/h", "160 km/h", "166 km/h"],
      answer: 1,
      hints: [
        "Average speed = total distance ÷ total time. Do not average the three leg speeds.",
        "Convert all times to minutes, add them up, then convert to hours."
      ],
      solution: [
        "Total distance = 120 + 200 + 80 = 400 km",
        "Total time = 48 + 72 + 40 = 160 min = 2.667 h",
        "Average speed = 400 ÷ 2.667 = 150 km/h"
      ],
      optionNotes: [
        "This is the simple mean of the leg speeds (150, 166.7 and 120), about 145.6. Averaging speeds ignores how long each leg takes.",
        "Correct.",
        "Too high.",
        "Too high.",
        "This is the speed on leg 2 only (200 km in 72 min ≈ 166.7 km/h)."
      ],
      explanation: "Never average speeds directly unless every leg lasts the same time. Use the total distance divided by the total time."
    },
    {
      id: "n01-08",
      topic: "Multi-step: rate then total",
      difficulty: 3,
      exhibit: {
        type: "table",
        title: "Grant applications by programme",
        columns: ["Programme", "Applications received", "Applications approved", "Average grant (EUR thousand)"],
        rows: [
          ["P1", "400", "92", "150"],
          ["P2", "250", "70", "120"],
          ["P3", "320", "80", "200"],
          ["P4", "180", "45", "90"]
        ]
      },
      stem: "What was the total funding awarded under the programme with the highest approval rate?",
      options: ["EUR 4.05 million", "EUR 8.4 million", "EUR 10.5 million", "EUR 13.8 million", "EUR 16.0 million"],
      answer: 1,
      hints: [
        "Step 1: approval rate = approved ÷ received for each programme.",
        "Step 2: total funding for that programme = approved × average grant. Watch the units (thousands)."
      ],
      solution: [
        "P1: 92 ÷ 400 = 23%",
        "P2: 70 ÷ 250 = 28% (highest)",
        "P3: 80 ÷ 320 = 25%",
        "P4: 45 ÷ 180 = 25%",
        "P2 funding = 70 × EUR 120 thousand = EUR 8,400 thousand = EUR 8.4 million"
      ],
      optionNotes: [
        "This is P4's total (45 × 90), and P4 is not the highest rate.",
        "Correct.",
        "Not derived from the table.",
        "This is P1's total (92 × 150). P1 has the most approvals, but the lowest rate.",
        "This is P3's total (80 × 200), the largest amount, but not the highest rate."
      ],
      explanation: "In multi-step questions, distractors are usually the totals for the other rows. Finish step 1 before calculating anything in step 2."
    },
    {
      id: "n01-09",
      topic: "Budget reallocation",
      difficulty: 2,
      exhibit: {
        type: "table",
        title: "Breakdown of an EU-funded project budget of EUR 2.4 million",
        columns: ["Cost category", "Share of budget"],
        rows: [
          ["Staff", "45%"],
          ["Equipment", "20%"],
          ["Subcontracting", "18%"],
          ["Other costs", "12%"],
          ["Travel", "5%"]
        ]
      },
      stem: "The travel budget is increased by 50%, with the extra money taken entirely from equipment. What is the new equipment budget?",
      options: ["EUR 420,000", "EUR 432,000", "EUR 440,000", "EUR 456,000", "EUR 480,000"],
      answer: 0,
      hints: [
        "Find travel and equipment in euros first.",
        "The 50% increase applies to the travel budget, not to equipment."
      ],
      solution: [
        "Travel = 5% × 2,400,000 = EUR 120,000",
        "Increase = 50% × 120,000 = EUR 60,000",
        "Equipment = 20% × 2,400,000 = EUR 480,000",
        "New equipment = 480,000 − 60,000 = EUR 420,000"
      ],
      optionNotes: [
        "Correct.",
        "This cuts equipment by 10% (480,000 × 0.9). It mixes up the percentages.",
        "This takes only 40,000 from equipment. It does not follow from the question.",
        "This takes only 5% of equipment.",
        "This is the original equipment budget, unchanged."
      ],
      explanation: "Convert the percentages into amounts first, then apply the change to the right category."
    },
    {
      id: "n01-10",
      topic: "Rates with changing base",
      difficulty: 3,
      exhibit: {
        type: "table",
        title: "Labour market, Country X",
        columns: ["Indicator", "2023"],
        rows: [
          ["Labour force", "4.0 million"],
          ["Unemployment rate", "6.5%"]
        ],
        note: "In 2024 the labour force grew by 2.5% and the number of unemployed people fell by 10,000."
      },
      stem: "What was the unemployment rate in 2024 (to one decimal place)?",
      options: ["6.0%", "6.1%", "6.3%", "6.4%", "6.5%"],
      answer: 1,
      hints: [
        "Convert the 2023 rate into a number of people first.",
        "Both the numerator (unemployed) and the denominator (labour force) change in 2024."
      ],
      solution: [
        "Unemployed 2023 = 6.5% × 4,000,000 = 260,000",
        "Unemployed 2024 = 260,000 − 10,000 = 250,000",
        "Labour force 2024 = 4,000,000 × 1.025 = 4,100,000",
        "Rate 2024 = 250,000 ÷ 4,100,000 ≈ 6.10% → 6.1%"
      ],
      optionNotes: [
        "This is 240,000 ÷ 4,000,000, which applies neither change correctly.",
        "Correct.",
        "This is 250,000 ÷ 4,000,000 ≈ 6.25%. You forgot that the labour force grew.",
        "Not derived from the data.",
        "This is the 2023 rate, unchanged."
      ],
      explanation: "When a rate's base changes, recompute both the numerator and the denominator."
    }
  ]
});
