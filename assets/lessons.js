/*
 * Coach mode lessons: the method taught before each training round.
 * Plain data so it can be edited without touching app logic.
 */
window.EPSO_LESSONS = {
  verbal: {
    title: "Verbal reasoning method",
    format: "Trainer format: 20 questions · 35 minutes (≈1 min 45 s each). Check your competition notice for pass marks and ranking rules. Each item is a dense text of about 200 words followed by four statements; exactly one is correct.",
    steps: [
      { name: "Know what 'correct' means", text: "The question asks which statement is correct: the one the text supports, directly or by clear logic. A statement can be true in the real world and still be wrong because the text does not say it." },
      { name: "Skim the passage for structure", text: "Spend about 30 seconds finding what each paragraph is about: definitions, numbers, exceptions, dates." },
      { name: "Find the evidence for every clause", text: "An answer may combine several sentences or apply a stated rule to a new case. Check every clause against the relevant facts, conditions and exceptions. A plausible extra detail is not evidence." },
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
    format: "Trainer format: 10 questions · 20 minutes (2 min each). Check your competition notice for pass marks and combined scoring. Tables or charts, with an on-screen calculator.",
    steps: [
      { name: "Decode the question first", text: "Identify exactly what is asked (a percentage, a ratio, a total or a difference) and in which unit." },
      { name: "Locate only the data you need", text: "Exhibits contain distractor rows and columns, such as a year not mentioned. Note the relevant values and their units on the scratchpad; totals may require several rows." },
      { name: "Check the units and the base", text: "Thousands or millions? Percentage of what? Most traps hide in the denominator." },
      { name: "Estimate before calculating", text: "Inspect how far apart the options are. Use a rough estimate to check the scale; calculate precisely when close options cannot be distinguished safely. Cancel common factors where possible." },
      { name: "Calculate and match", text: "Choose the shortest reliable calculation, mentally or with the calculator. Keep intermediate precision and round only as requested. Check that the result answers the question in the correct unit." }
    ],
    traps: [
      "Dividing a change by the new value instead of the old value.",
      "Confusing percentage points with percentage change.",
      "Averaging rates (speeds, percentages) instead of using the totals.",
      "Applying a percentage to the wrong subgroup (the wrong base).",
      "Stopping one step early. Distractors are often intermediate results."
    ],
    pacing: "Budget about 2 minutes per item across the round. If stuck, flag it, choose your best answer and return if time remains. Numerical and abstract have separate clocks: time saved in one cannot be used in the other. Check your competition notice for scoring rules."
  },
  abstract: {
    title: "Abstract reasoning method",
    format: "Trainer format: 10 questions · 10 minutes (1 min each). Check your competition notice for pass marks and combined scoring. A series of figures with several elements; pick the next figure from five options.",
    steps: [
      { name: "Inventory the elements", text: "List what is in each frame: shapes, count, colour or fill, position, size, rotation." },
      { name: "Find one rule at a time", text: "Track one element across every displayed transition. Start with movement, rotation, fill and count; if a simple rule fails, compare odd and even frames or test whether another element controls the change. Some elements stay constant." },
      { name: "Check the cycle length", text: "Some attributes alternate or repeat after several steps. Check each proposed cycle against the whole series. For a dependency, distinguish the current frame from the previous frame." },
      { name: "Predict the next frame before looking at the options", text: "Form your own answer first, so you are not drawn to an option that is almost right." },
      { name: "Eliminate by rule", text: "Discard every option that breaks a rule. Usually only one option satisfies all of them." }
    ],
    traps: [
      "Options may satisfy some relationships but miss others. Track each feature and check alternating, conditional and previous-frame relationships as well as simple repetition.",
      "Clockwise versus anticlockwise movement.",
      "Wrapping around a grid or bouncing at the edge.",
      "Counting series that are not +1 (for example Fibonacci, +2 or doubling).",
      "Off-by-one: repeating the last frame or skipping a step without justification. A valid cycle can return to an earlier frame, so repetition alone does not make an option wrong."
    ],
    pacing: "Allow 60 seconds per item. If no rule appears within 40 seconds, eliminate what you can, guess, flag it and move on."
  }
};
