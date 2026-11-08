/*
 * Coach mode lessons: the method taught before each training round.
 * Plain data so it can be edited without touching app logic.
 */
window.EPSO_LESSONS = {
  verbal: {
    title: "Verbal reasoning method",
    format: "Trainer format: 20 questions · 35 minutes (≈1 min 45 s each). Check your competition notice for pass marks and ranking rules. Each item is a dense text of about 200 words followed by four statements; exactly one is correct.",
    steps: [
      { name: "Check the question and choose a reading route", text: "First check whether you need a supported or an incorrect statement. Try passage-first reading, or read one option at a time and scan for its evidence. Choose the route that helps you keep track of conditions; there is no compulsory 30-second skim." },
      { name: "Require complete support", text: "Every part of the answer must follow from the passage, directly or by a necessary inference. A statement can be true in the real world yet unsupported here. Do not use outside knowledge to fill a gap." },
      { name: "Find the evidence for every clause", text: "An answer may combine several sentences or apply a stated rule to a new case. Check every clause against the relevant facts, conditions and exceptions. A plausible extra detail is not evidence." },
      { name: "Explain why each alternative fails", text: "Use False for a direct contradiction, including a stated exception to an 'all' claim. Use Not supported for an added detail the text does not establish, and Overstated for a stronger claim without a direct counterexample. The evidence matters more than the label." },
      { name: "Eliminate, then confirm", text: "Strike out options you have disproved. Before moving on, reread the surviving option against the text once." }
    ],
    examples: [
      { title: "Missing evidence is different from a contradiction", steps: ["A fictional library says: some workshops are online, and one workshop meets only in a room. It gives no prices.", "'Every workshop is online' is false: the room-only workshop is a counterexample. 'Online workshops are free' is unsupported: prices are not given.", "'Most workshops are online' overstates 'some'; neither a majority nor a counterexample to a majority is established. 'At least one workshop meets in a room' is supported."] },
      { title: "Follow conditions in the stated direction", steps: ["A fictional laboratory releases a sample only if a safety check is complete. A released sample therefore had the check.", "A checked sample need not have been released: the check is necessary, and the passage gives no sufficient release rule.", "Reverse a rule only when the passage supplies the reverse implication too, for example with an explicit 'if and only if'."] },
      { title: "Separate a percentage from its population", steps: ["A fictional survey finds 60% support among 50 respondents and later 50% among 80 respondents.", "The supporting counts are 30 and 40. A smaller share can accompany a larger number when the denominator changes.", "Those two results alone do not establish that any particular person changed opinion or that a campaign caused the difference."] }
    ],
    traps: [
      "Overstatement: the text says 'often', 'much of' or 'some', and the option says 'always', 'entirely' or 'all'.",
      "Words such as always, never and only mark scope to check, not an automatic reason to reject an option. Cautious wording is not evidence either.",
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
    examples: [
      { title: "Reverse a percentage with its multiplier", steps: ["A total is 480 after a 20% increase. The original amount × 1.20 = 480.", "Original amount = 480 ÷ 1.20 = 400. Subtracting 20% of 480 would use the wrong base.", "Check forward: 400 × 1.20 = 480."] },
      { title: "Distinguish percentage points from percentage change", steps: ["A share rises from 30% to 36%. The difference is 36 − 30 = 6 percentage points.", "The relative increase is (36 − 30) ÷ 30 × 100 = 20%.", "The question decides which measure to use; the two answers describe the same change on different bases."] },
      { title: "Pool counts before averaging rates", steps: ["A group of 20 has a 70% pass rate; a group of 80 has a 90% pass rate.", "Passes = 20 × 0.70 + 80 × 0.90 = 86. Candidates = 20 + 80 = 100.", "Combined pass rate = 86 ÷ 100 × 100 = 86%. It lies between the two rates and nearer the larger group's rate. The unweighted mean of 80% gives the small group too much influence."] }
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
      { name: "Inventory the elements", text: "List shapes, count, fill, position and direction. Compare the options briefly to identify useful differences, then test those features against every displayed frame." },
      { name: "Find one rule at a time", text: "Track one element across every displayed transition. Start with movement, rotation, fill and count; if a simple rule fails, compare odd and even frames or test whether another element controls the change. Some elements stay constant." },
      { name: "Check the cycle length", text: "Some attributes alternate or repeat after several steps. Check each proposed cycle against the whole series. For a dependency, distinguish the current frame from the previous frame." },
      { name: "Predict, eliminate and verify", text: "Predict a feature from the series, eliminate options that violate it, and check the survivor against the remaining changing and constant features. Similarity alone is not evidence." },
      { name: "Follow identity, not just position", text: "Give each object a name. A shape can move to another corner while turning around its own centre. A mirror flip swaps left and right; a turn moves the whole shape around." },
      { name: "Compare relationships", text: "Try ‘more than’, ‘fewer than’, ‘inside’ and ‘outside’. Counts may vary while a comparison stays true. Follow lines across opposite edges when the frame wraps." },
      { name: "Separate useful detail from noise", text: "An arrow count or new input symbol may vary without helping predict the output. Ignore it only after a rule explains every shown transition. Use the simplest sufficient prediction, then verify the other rules." }
    ],
    examples: [
      { title: "The small input becomes the next large output", steps: [
        "Imagine the small boxes show: triangle, square, star. In the next frames, the large shapes are triangle, square, star in that order.",
        "The large shape copies the small symbol ONE frame earlier. It may copy its fill too. Look back one frame; do not compare only within the same picture.",
        "If the final small input is a grey star, predict a large grey star. A new small input belongs to the following step."
      ] },
      { title: "Fewer dots can be the rule", steps: [
        "Suppose black/grey counts are 5/3, 4/2, 6/3. The exact counts jump around, but grey is always fewer than black.",
        "If black is inside, outside, inside, the next black group goes outside. Grey goes inside.",
        "Check BOTH facts: grey fewer than black, and grey inside. Equal counts break the first rule even when placement is correct."
      ] },
      { title: "Move tokens using the preceding instruction", steps: [
        "Suppose three containers hold 5, 4 and 3 tokens. An arrow points from the first to the second, with two small quantity marks.",
        "For the next picture, take two from the first and give two to the second: 3, 6, 3. The total stays 12.",
        "Use the arrow and marks in the picture BEFORE the one you predict. Then continue the rule for the new arrow and marks separately."
      ] },
  {
    "title": "Separate direction from fill",
    "figures": [
      [
        {
          "t": "arrow",
          "x": 50,
          "y": 50,
          "r": 26,
          "rot": 0,
          "fill": "black"
        },
        {
          "t": "circle",
          "x": 20,
          "y": 20,
          "r": 7,
          "fill": "white"
        }
      ],
      [
        {
          "t": "arrow",
          "x": 50,
          "y": 50,
          "r": 26,
          "rot": 90,
          "fill": "black"
        },
        {
          "t": "circle",
          "x": 20,
          "y": 20,
          "r": 7,
          "fill": "grey"
        }
      ],
      [
        {
          "t": "arrow",
          "x": 50,
          "y": 50,
          "r": 26,
          "rot": 180,
          "fill": "black"
        },
        {
          "t": "circle",
          "x": 20,
          "y": 20,
          "r": 7,
          "fill": "white"
        }
      ],
      [
        {
          "t": "arrow",
          "x": 50,
          "y": 50,
          "r": 26,
          "rot": 270,
          "fill": "black"
        },
        {
          "t": "circle",
          "x": 20,
          "y": 20,
          "r": 7,
          "fill": "grey"
        }
      ]
    ],
    "labels": [
      "Frame 1",
      "Frame 2",
      "Frame 3",
      "Predicted frame 4"
    ],
    "steps": [
      "The arrow turns 90° clockwise at each transition: up, right, down, then left.",
      "The fixed corner circle alternates white and grey. The fourth circle is grey, at the same position.",
      "A left arrow with a white circle satisfies only one rule. Check both features before choosing."
    ]
  },
  {
    "title": "Separate odd and even frames",
    "steps": [
      "Number the frames. Suppose arrow directions are 0°, 180°, 90°, 270°, 180°, 0°, measured clockwise from up.",
      "Odd frames 1, 3, 5 are 0°, 90°, 180°: add 90°. Even frames 2, 4, 6 are 180°, 270°, 0°: also add 90°, wrapping after 360°.",
      "Frame 7 belongs to the odd stream, so predict 270°. Check every feature; this direction alone may leave several choices."
    ]
  },
  {
    "title": "Distinguish exclusive-or from union",
    "steps": [
      "Compare corresponding cells in two input grids. Exclusive-or makes an output cell black when exactly one input is black. Union makes it black when either or both are black.",
      "For inputs [black, white, white, black] and [black, black, white, white], exclusive-or gives [white, black, white, black]; union gives [black, black, white, black]. Lists are in reading order.",
      "The first cell distinguishes the rules because both inputs are black. If an arrow controls a rotation, rotate the specified input first and then compare corresponding cells. Specify whether the arrow belongs to the current or an earlier frame."
    ]
  }
],
    traps: [
      "Options may satisfy some relationships but miss others. Track each feature and check alternating, conditional and previous-frame relationships as well as simple repetition.",
      "Clockwise versus anticlockwise movement.",
      "Wrapping around a grid or bouncing at the edge.",
      "Do not force an exact counting sequence when a stable comparison explains the counts. Coverage can grow, reach full, and then shrink.",
      "Off-by-one: repeating the last frame or skipping a step without justification. A valid cycle can return to an earlier frame, so repetition alone does not make an option wrong."
    ],
    pacing: "Allow 60 seconds per item. If no rule appears within 40 seconds, eliminate what you can, guess, flag it and move on."
  }
};
