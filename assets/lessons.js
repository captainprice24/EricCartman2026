/*
 * Coach mode lessons: the method taught before each training round.
 * Plain data so it can be edited without touching app logic.
 */
window.EPSO_LESSONS = {
  verbal: {
    title: "Verbal reasoning method",
    format: "20 questions · 35 minutes (≈1 min 45 s each) · pass mark 10/20. Each item is a short text followed by four statements; exactly one is correct.",
    steps: [
      { name: "Read the stem first", text: "Check whether the question asks which statement is correct or which is incorrect. Misreading the stem is the most expensive mistake." },
      { name: "Skim the passage for structure", text: "Spend about 30 seconds finding what each paragraph is about: definitions, numbers, exceptions, dates." },
      { name: "Test each statement against one sentence", text: "For every option, find the exact sentence it relies on. If you cannot find one, the statement is probably unsupported." },
      { name: "Classify each option as true, false or not supported", text: "Only a statement the text confirms, directly or by clear logic, is correct. Plausible but unstated claims count as incorrect." },
      { name: "Eliminate, then confirm", text: "Strike out options you have disproved. Before moving on, reread the surviving option against the text once." }
    ],
    traps: [
      "Absolute words: always, never, only, solely, all. The text often contains an exception.",
      "Swapped details: dates, percentages or institutions exchanged between two facts.",
      "Outside knowledge: a statement can be true in real life but not supported by the text.",
      "Scope creep: the text says 'some' or 'mainly', and the option says 'all' or 'exclusively'.",
      "Reversed cause and effect, or an old policy presented as the new one."
    ],
    pacing: "Aim for 1 min 30 s per item and bank the extra time for the hardest ones. If you are stuck after 2 minutes, flag the question, pick your best guess and move on. There is no negative marking."
  },
  numerical: {
    title: "Numerical reasoning method",
    format: "10 questions · 20 minutes (2 min each) · pass mark 10/20 combined with abstract. Tables or charts, with an on-screen calculator.",
    steps: [
      { name: "Decode the question first", text: "Identify exactly what is asked (a percentage, a ratio, a total or a difference) and in which unit." },
      { name: "Locate only the data you need", text: "Exhibits contain distractor rows and columns, such as a year not mentioned. Note the 2–4 numbers you need on the scratchpad." },
      { name: "Check the units and the base", text: "Thousands or millions? Percentage of what? Most traps hide in the denominator." },
      { name: "Estimate before calculating", text: "Round the numbers to get a ballpark. It often eliminates 2–3 options instantly and catches calculator slips." },
      { name: "Calculate and match", text: "Use the calculator for the exact figure, then pick the option that matches. If two options are close, recompute with more precision." }
    ],
    traps: [
      "Dividing a change by the new value instead of the old value.",
      "Confusing percentage points with percentage change.",
      "Averaging rates (speeds, percentages) instead of using the totals.",
      "Applying a percentage to the wrong subgroup (the wrong base).",
      "Stopping one step early. Distractors are often intermediate results."
    ],
    pacing: "Spend at most 2 minutes per item. Numerical and abstract share a combined pass mark, so a fast abstract section can compensate for a slow numerical one."
  },
  abstract: {
    title: "Abstract reasoning method",
    format: "10 questions · 10 minutes (1 min each) · pass mark 10/20 combined with numerical. Five figures in a series; pick the next one from five options.",
    steps: [
      { name: "Inventory the elements", text: "List what is in each frame: shapes, count, colour or fill, position, size, rotation." },
      { name: "Find one rule at a time", text: "Compare frame 1 → 2 → 3 for a single attribute. Typical rules are rotation by a fixed angle, movement by a fixed step, alternation and counting." },
      { name: "Check the cycle length", text: "Some attributes alternate (period 2), others cycle every 3 or 4 steps. Write the cycle down." },
      { name: "Predict frame 6 before looking at the options", text: "Form your own answer first, so you are not drawn to an option that is almost right." },
      { name: "Eliminate by rule", text: "Discard every option that breaks a rule. Usually only one option satisfies all of them." }
    ],
    traps: [
      "Options that satisfy one rule but not the other. Most series combine two rules.",
      "Clockwise versus anticlockwise movement.",
      "Wrapping around a grid or bouncing at the edge.",
      "Counting series that are not +1 (for example Fibonacci, +2 or doubling).",
      "Off-by-one: the option that matches the last frame or skips a step."
    ],
    pacing: "Allow 60 seconds per item. If no rule appears within 40 seconds, eliminate what you can, guess, flag it and move on."
  }
};
