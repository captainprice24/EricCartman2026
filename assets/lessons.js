/*
 * Coach mode lessons: the method taught before each training round.
 * Plain data so it can be edited without touching app logic.
 */
window.EPSO_LESSONS = {
  verbal: {
    title: "Verbal reasoning method",
    format: "20 questions · 35 minutes (≈1 min 45 s each) · pass mark 10/20, and the score counts towards the EPSO ranking. Each item is a dense text of about 200 words followed by four statements; exactly one is correct.",
    steps: [
      { name: "Know what 'correct' means", text: "The question asks which statement is correct: the one the text supports, directly or by clear logic. A statement can be true in the real world and still be wrong because the text does not say it." },
      { name: "Skim the passage for structure", text: "Spend about 30 seconds finding what each paragraph is about: definitions, numbers, exceptions, dates." },
      { name: "Test each statement against one sentence", text: "For every option, find the exact sentence it relies on. If you cannot find one, the statement is probably unsupported." },
      { name: "Classify each option", text: "Label each option: supported, false (the text contradicts it), not supported (the text is silent) or overstated (partly right but stronger than the text). Only 'supported' can be the answer." },
      { name: "Eliminate, then confirm", text: "Strike out options you have disproved. Before moving on, reread the surviving option against the text once." }
    ],
    traps: [
      "Overstatement: the text says 'often', 'much of' or 'some', and the option says 'always', 'entirely' or 'all'.",
      "Absolute words: always, never, only, solely, all. The text often contains an exception.",
      "Swapped details: dates, percentages or institutions exchanged between two facts.",
      "Outside knowledge: a statement can be true in real life but not supported by the text. EU topics make this trap especially tempting.",
      "Proposals presented as decisions, and expectations presented as results.",
      "Scope creep: the text says 'some' or 'mainly', and the option says 'all' or 'exclusively'.",
      "Reversed cause and effect, or an old policy presented as the new one.",
      "Do not judge by form. An absolute statement ('only', 'never', 'all') is correct when the text is absolute too, and a cautious one ('may', 'can') is wrong when the text does not support it. Check the wording against the text every time."
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
    format: "10 questions · 10 minutes (1 min each) · pass mark 10/20 combined with numerical. A series of figures with several elements; pick the next figure from five options.",
    steps: [
      { name: "Inventory the elements", text: "List what is in each frame: shapes, count, colour or fill, position, size, rotation." },
      { name: "Find one rule at a time", text: "Compare frame 1 → 2 → 3 for a single element. Typical rules: rotation by a fixed angle, movement around corners, a colour or shape cycle, counting. Expect two to four rules at once, and some elements that never change." },
      { name: "Check the cycle length", text: "Some attributes alternate (period 2), others cycle every 3 or 4 steps. Write the cycle down." },
      { name: "Predict the next frame before looking at the options", text: "Form your own answer first, so you are not drawn to an option that is almost right." },
      { name: "Eliminate by rule", text: "Discard every option that breaks a rule. Usually only one option satisfies all of them." }
    ],
    traps: [
      "Options may satisfy some relationships but miss others. Track each feature and check alternating, conditional and previous-frame relationships as well as simple repetition.",
      "Clockwise versus anticlockwise movement.",
      "Wrapping around a grid or bouncing at the edge.",
      "Counting series that are not +1 (for example Fibonacci, +2 or doubling).",
      "Off-by-one: the option that matches the last frame or skips a step."
    ],
    pacing: "Allow 60 seconds per item. If no rule appears within 40 seconds, eliminate what you can, guess, flag it and move on."
  }
};
