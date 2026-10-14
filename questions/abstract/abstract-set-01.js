/* Figures use the shape format in docs/QUESTION_FORMAT.md (100×100 canvas). */
EPSO_BANK.registerSet({
  "id": "abstract-01",
  "section": "abstract",
  "title": "Abstract Reasoning · Set 1",
  "description": "10 figure-series items: rotation, alternation, movement, counting and combined rules.",
  "version": 1,
  "questions": [
    {
      "id": "a01-01",
      "topic": "Rotation",
      "difficulty": 1,
      "stem": "Which figure comes next in the series?",
      "sequence": [
        [{"t":"arrow","x":50,"y":50,"r":32,"rot":0,"fill":"black"}],
        [{"t":"arrow","x":50,"y":50,"r":32,"rot":45,"fill":"black"}],
        [{"t":"arrow","x":50,"y":50,"r":32,"rot":90,"fill":"black"}],
        [{"t":"arrow","x":50,"y":50,"r":32,"rot":135,"fill":"black"}],
        [{"t":"arrow","x":50,"y":50,"r":32,"rot":180,"fill":"black"}]
      ],
      "options": [
        [{"t":"arrow","x":50,"y":50,"r":32,"rot":225,"fill":"black"}],
        [{"t":"arrow","x":50,"y":50,"r":32,"rot":270,"fill":"black"}],
        [{"t":"arrow","x":50,"y":50,"r":32,"rot":180,"fill":"black"}],
        [{"t":"arrow","x":50,"y":50,"r":32,"rot":315,"fill":"black"}],
        [{"t":"arrow","x":50,"y":50,"r":32,"rot":45,"fill":"black"}]
      ],
      "answer": 0,
      "hints": ["Only one element is present. What changes about it from frame to frame?","Measure the angle between consecutive arrows."],
      "optionNotes": ["Correct: 180° + 45° = 225°.","Rotated 90° from the last frame. The step is 45°.","No change from the last frame.","This would be two steps ahead.","Rotated anticlockwise. The sequence turns clockwise."],
      "explanation": "The arrow turns 45° clockwise each step: 0°, 45°, 90°, 135°, 180°, so the next is 225° (pointing down-left)."
    },
    {
      "id": "a01-02",
      "topic": "Counting sides + alternation",
      "difficulty": 2,
      "stem": "Which figure comes next in the series?",
      "sequence": [
        [{"t":"poly","x":50,"y":52,"r":34,"n":3,"rot":0,"fill":"black"}],
        [{"t":"poly","x":50,"y":52,"r":34,"n":4,"rot":0,"fill":"white"}],
        [{"t":"poly","x":50,"y":52,"r":34,"n":5,"rot":0,"fill":"black"}],
        [{"t":"poly","x":50,"y":52,"r":34,"n":6,"rot":0,"fill":"white"}],
        [{"t":"poly","x":50,"y":52,"r":34,"n":7,"rot":0,"fill":"black"}]
      ],
      "options": [
        [{"t":"poly","x":50,"y":52,"r":34,"n":9,"rot":0,"fill":"white"}],
        [{"t":"poly","x":50,"y":52,"r":34,"n":6,"rot":0,"fill":"black"}],
        [{"t":"poly","x":50,"y":52,"r":34,"n":8,"rot":0,"fill":"white"}],
        [{"t":"poly","x":50,"y":52,"r":34,"n":8,"rot":0,"fill":"black"}],
        [{"t":"poly","x":50,"y":52,"r":34,"n":7,"rot":0,"fill":"white"}]
      ],
      "answer": 2,
      "hints": ["Two things change: count the sides, and note the fill colour.","Sides: 3, 4, 5, 6, 7… Colour: black, white, black, white, black…"],
      "optionNotes": ["Skips a step: 9 sides.","The side count goes backwards.","Correct: 8 sides, white.","Right number of sides, but the colour should alternate to white.","Right colour, but the side count must rise to 8."],
      "explanation": "Two independent rules apply. The number of sides increases by one (3 → 7, so next 8), and the fill alternates black/white (next is white)."
    },
    {
      "id": "a01-03",
      "topic": "Movement + alternation",
      "difficulty": 2,
      "stem": "Which figure comes next in the series?",
      "sequence": [
        [{"t":"rect","x":12,"y":12,"w":76,"h":76,"fill":"none"},{"t":"circle","x":28,"y":28,"r":11,"fill":"black"}],
        [{"t":"rect","x":12,"y":12,"w":76,"h":76,"fill":"none"},{"t":"circle","x":72,"y":28,"r":11,"fill":"white"}],
        [{"t":"rect","x":12,"y":12,"w":76,"h":76,"fill":"none"},{"t":"circle","x":72,"y":72,"r":11,"fill":"black"}],
        [{"t":"rect","x":12,"y":12,"w":76,"h":76,"fill":"none"},{"t":"circle","x":28,"y":72,"r":11,"fill":"white"}],
        [{"t":"rect","x":12,"y":12,"w":76,"h":76,"fill":"none"},{"t":"circle","x":28,"y":28,"r":11,"fill":"black"}]
      ],
      "options": [
        [{"t":"rect","x":12,"y":12,"w":76,"h":76,"fill":"none"},{"t":"circle","x":72,"y":28,"r":11,"fill":"black"}],
        [{"t":"rect","x":12,"y":12,"w":76,"h":76,"fill":"none"},{"t":"circle","x":72,"y":72,"r":11,"fill":"white"}],
        [{"t":"rect","x":12,"y":12,"w":76,"h":76,"fill":"none"},{"t":"circle","x":28,"y":28,"r":11,"fill":"white"}],
        [{"t":"rect","x":12,"y":12,"w":76,"h":76,"fill":"none"},{"t":"circle","x":28,"y":72,"r":11,"fill":"black"}],
        [{"t":"rect","x":12,"y":12,"w":76,"h":76,"fill":"none"},{"t":"circle","x":72,"y":28,"r":11,"fill":"white"}]
      ],
      "answer": 4,
      "hints": ["Track the position of the circle around the four corners.","Then track its colour separately."],
      "optionNotes": ["Right position, wrong colour: it alternates.","Moved two corners instead of one.","Did not move.","Moved anticlockwise.","Correct: top-right, white."],
      "explanation": "The circle moves one corner clockwise each step (TL → TR → BR → BL → TL → TR), and its colour alternates black/white. Next: top-right, white."
    },
    {
      "id": "a01-04",
      "topic": "Counting + alternating shapes",
      "difficulty": 1,
      "stem": "Which figure comes next in the series?",
      "sequence": [
        [{"t":"circle","x":22,"y":22,"r":9,"fill":"black"}],
        [{"t":"rect","x":13,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":41,"y":13,"w":18,"h":18,"fill":"black"}],
        [{"t":"circle","x":22,"y":22,"r":9,"fill":"black"},{"t":"circle","x":50,"y":22,"r":9,"fill":"black"},{"t":"circle","x":78,"y":22,"r":9,"fill":"black"}],
        [{"t":"rect","x":13,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":41,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":69,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":13,"y":41,"w":18,"h":18,"fill":"black"}],
        [{"t":"circle","x":22,"y":22,"r":9,"fill":"black"},{"t":"circle","x":50,"y":22,"r":9,"fill":"black"},{"t":"circle","x":78,"y":22,"r":9,"fill":"black"},{"t":"circle","x":22,"y":50,"r":9,"fill":"black"},{"t":"circle","x":50,"y":50,"r":9,"fill":"black"}]
      ],
      "options": [
        [{"t":"rect","x":13,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":41,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":69,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":13,"y":41,"w":18,"h":18,"fill":"black"}],
        [{"t":"rect","x":13,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":41,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":69,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":13,"y":41,"w":18,"h":18,"fill":"black"},{"t":"rect","x":41,"y":41,"w":18,"h":18,"fill":"black"},{"t":"rect","x":69,"y":41,"w":18,"h":18,"fill":"black"}],
        [{"t":"circle","x":22,"y":22,"r":9,"fill":"black"},{"t":"circle","x":50,"y":22,"r":9,"fill":"black"},{"t":"circle","x":78,"y":22,"r":9,"fill":"black"},{"t":"circle","x":22,"y":50,"r":9,"fill":"black"},{"t":"circle","x":50,"y":50,"r":9,"fill":"black"},{"t":"circle","x":78,"y":50,"r":9,"fill":"black"}],
        [{"t":"rect","x":13,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":41,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":69,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":13,"y":41,"w":18,"h":18,"fill":"black"},{"t":"rect","x":41,"y":41,"w":18,"h":18,"fill":"black"}],
        [{"t":"rect","x":13,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":41,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":69,"y":13,"w":18,"h":18,"fill":"black"},{"t":"rect","x":13,"y":41,"w":18,"h":18,"fill":"black"},{"t":"rect","x":41,"y":41,"w":18,"h":18,"fill":"black"},{"t":"rect","x":69,"y":41,"w":18,"h":18,"fill":"black"},{"t":"rect","x":13,"y":69,"w":18,"h":18,"fill":"black"}]
      ],
      "answer": 1,
      "hints": ["Count the shapes in each frame.","Which shape type appears in odd frames, and which in even frames?"],
      "optionNotes": ["The count goes backwards.","Correct: six squares.","Right count, but the shape should switch to squares.","The count must increase to 6.","One too many."],
      "explanation": "The count increases by one each frame (1 → 5, next 6), and the shape alternates circle/square. Frame 6 is even, so it shows squares: six squares."
    },
    {
      "id": "a01-05",
      "topic": "Movement in a grid",
      "difficulty": 3,
      "stem": "Which figure comes next in the series?",
      "sequence": [
        [{"t":"rect","x":8,"y":8,"w":28,"h":28,"fill":"black"},{"t":"rect","x":36,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":64,"w":28,"h":28,"fill":"none"}],
        [{"t":"rect","x":8,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":8,"w":28,"h":28,"fill":"black"},{"t":"rect","x":8,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":64,"w":28,"h":28,"fill":"none"}],
        [{"t":"rect","x":8,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":36,"w":28,"h":28,"fill":"black"},{"t":"rect","x":64,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":64,"w":28,"h":28,"fill":"none"}],
        [{"t":"rect","x":8,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":64,"w":28,"h":28,"fill":"black"},{"t":"rect","x":36,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":64,"w":28,"h":28,"fill":"none"}],
        [{"t":"rect","x":8,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":64,"w":28,"h":28,"fill":"black"}]
      ],
      "options": [
        [{"t":"rect","x":8,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":36,"w":28,"h":28,"fill":"black"},{"t":"rect","x":36,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":64,"w":28,"h":28,"fill":"none"}],
        [{"t":"rect","x":8,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":64,"w":28,"h":28,"fill":"black"},{"t":"rect","x":64,"y":64,"w":28,"h":28,"fill":"none"}],
        [{"t":"rect","x":8,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":64,"w":28,"h":28,"fill":"black"}],
        [{"t":"rect","x":8,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":8,"w":28,"h":28,"fill":"black"},{"t":"rect","x":64,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":64,"w":28,"h":28,"fill":"none"}],
        [{"t":"rect","x":8,"y":8,"w":28,"h":28,"fill":"black"},{"t":"rect","x":36,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":8,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":36,"w":28,"h":28,"fill":"none"},{"t":"rect","x":8,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":36,"y":64,"w":28,"h":28,"fill":"none"},{"t":"rect","x":64,"y":64,"w":28,"h":28,"fill":"none"}]
      ],
      "answer": 3,
      "hints": ["Number the cells 0–8 in reading order (left to right, top to bottom).","The shaded cell advances by a fixed amount. What happens after the last cell?"],
      "optionNotes": ["Not consistent with a step of 2.","Moving backwards.","No movement.","Correct: (8 + 2) wraps around to cell 1 (second cell of the top row).","This treats the step as +1 after the last cell."],
      "explanation": "The shaded cell advances two places in reading order: 0, 2, 4, 6, 8. Continuing wraps around the grid: 8 + 2 = 10 → cell 1 (top row, middle)."
    },
    {
      "id": "a01-06",
      "topic": "Oscillation",
      "difficulty": 2,
      "stem": "Which figure comes next in the series?",
      "sequence": [
        [{"t":"circle","x":14,"y":50,"r":7,"fill":"none"},{"t":"circle","x":32,"y":50,"r":7,"fill":"none"},{"t":"circle","x":50,"y":50,"r":7,"fill":"black"},{"t":"circle","x":68,"y":50,"r":7,"fill":"none"},{"t":"circle","x":86,"y":50,"r":7,"fill":"none"}],
        [{"t":"circle","x":14,"y":50,"r":7,"fill":"none"},{"t":"circle","x":32,"y":50,"r":7,"fill":"none"},{"t":"circle","x":50,"y":50,"r":7,"fill":"none"},{"t":"circle","x":68,"y":50,"r":7,"fill":"black"},{"t":"circle","x":86,"y":50,"r":7,"fill":"none"}],
        [{"t":"circle","x":14,"y":50,"r":7,"fill":"none"},{"t":"circle","x":32,"y":50,"r":7,"fill":"none"},{"t":"circle","x":50,"y":50,"r":7,"fill":"none"},{"t":"circle","x":68,"y":50,"r":7,"fill":"none"},{"t":"circle","x":86,"y":50,"r":7,"fill":"black"}],
        [{"t":"circle","x":14,"y":50,"r":7,"fill":"none"},{"t":"circle","x":32,"y":50,"r":7,"fill":"none"},{"t":"circle","x":50,"y":50,"r":7,"fill":"none"},{"t":"circle","x":68,"y":50,"r":7,"fill":"black"},{"t":"circle","x":86,"y":50,"r":7,"fill":"none"}],
        [{"t":"circle","x":14,"y":50,"r":7,"fill":"none"},{"t":"circle","x":32,"y":50,"r":7,"fill":"none"},{"t":"circle","x":50,"y":50,"r":7,"fill":"black"},{"t":"circle","x":68,"y":50,"r":7,"fill":"none"},{"t":"circle","x":86,"y":50,"r":7,"fill":"none"}]
      ],
      "options": [
        [{"t":"circle","x":14,"y":50,"r":7,"fill":"none"},{"t":"circle","x":32,"y":50,"r":7,"fill":"black"},{"t":"circle","x":50,"y":50,"r":7,"fill":"none"},{"t":"circle","x":68,"y":50,"r":7,"fill":"none"},{"t":"circle","x":86,"y":50,"r":7,"fill":"none"}],
        [{"t":"circle","x":14,"y":50,"r":7,"fill":"black"},{"t":"circle","x":32,"y":50,"r":7,"fill":"none"},{"t":"circle","x":50,"y":50,"r":7,"fill":"none"},{"t":"circle","x":68,"y":50,"r":7,"fill":"none"},{"t":"circle","x":86,"y":50,"r":7,"fill":"none"}],
        [{"t":"circle","x":14,"y":50,"r":7,"fill":"none"},{"t":"circle","x":32,"y":50,"r":7,"fill":"none"},{"t":"circle","x":50,"y":50,"r":7,"fill":"none"},{"t":"circle","x":68,"y":50,"r":7,"fill":"black"},{"t":"circle","x":86,"y":50,"r":7,"fill":"none"}],
        [{"t":"circle","x":14,"y":50,"r":7,"fill":"none"},{"t":"circle","x":32,"y":50,"r":7,"fill":"none"},{"t":"circle","x":50,"y":50,"r":7,"fill":"black"},{"t":"circle","x":68,"y":50,"r":7,"fill":"none"},{"t":"circle","x":86,"y":50,"r":7,"fill":"none"}],
        [{"t":"circle","x":14,"y":50,"r":7,"fill":"none"},{"t":"circle","x":32,"y":50,"r":7,"fill":"none"},{"t":"circle","x":50,"y":50,"r":7,"fill":"none"},{"t":"circle","x":68,"y":50,"r":7,"fill":"none"},{"t":"circle","x":86,"y":50,"r":7,"fill":"black"}]
      ],
      "answer": 0,
      "hints": ["Follow the black circle along the row.","It reached the right end and turned back. Which way is it moving now?"],
      "optionNotes": ["Correct: it keeps moving left.","Jumps two places.","Reverses direction again without reaching the end.","No movement.","Jumps to the far right."],
      "explanation": "The black circle moves one place at a time and bounces at the ends: 3rd, 4th, 5th, 4th, 3rd, so the next is the 2nd position."
    },
    {
      "id": "a01-07",
      "topic": "Two independent rules",
      "difficulty": 2,
      "stem": "Which figure comes next in the series?",
      "sequence": [
        [{"t":"rect","x":14,"y":14,"w":72,"h":72,"fill":"none"},{"t":"arrow","x":50,"y":50,"r":22,"rot":0,"fill":"black"}],
        [{"t":"circle","x":50,"y":50,"r":37,"fill":"none"},{"t":"arrow","x":50,"y":50,"r":22,"rot":90,"fill":"black"}],
        [{"t":"rect","x":14,"y":14,"w":72,"h":72,"fill":"none"},{"t":"arrow","x":50,"y":50,"r":22,"rot":180,"fill":"black"}],
        [{"t":"circle","x":50,"y":50,"r":37,"fill":"none"},{"t":"arrow","x":50,"y":50,"r":22,"rot":270,"fill":"black"}],
        [{"t":"rect","x":14,"y":14,"w":72,"h":72,"fill":"none"},{"t":"arrow","x":50,"y":50,"r":22,"rot":0,"fill":"black"}]
      ],
      "options": [
        [{"t":"circle","x":50,"y":50,"r":37,"fill":"none"},{"t":"arrow","x":50,"y":50,"r":22,"rot":0,"fill":"black"}],
        [{"t":"rect","x":14,"y":14,"w":72,"h":72,"fill":"none"},{"t":"arrow","x":50,"y":50,"r":22,"rot":270,"fill":"black"}],
        [{"t":"circle","x":50,"y":50,"r":37,"fill":"none"},{"t":"arrow","x":50,"y":50,"r":22,"rot":90,"fill":"black"}],
        [{"t":"rect","x":14,"y":14,"w":72,"h":72,"fill":"none"},{"t":"arrow","x":50,"y":50,"r":22,"rot":90,"fill":"black"}],
        [{"t":"circle","x":50,"y":50,"r":37,"fill":"none"},{"t":"arrow","x":50,"y":50,"r":22,"rot":180,"fill":"black"}]
      ],
      "answer": 2,
      "hints": ["Separate the outer shape from the inner arrow.","The arrow turns by the same angle each step. The frame alternates."],
      "optionNotes": ["The arrow did not turn.","Both rules are applied backwards.","Correct: circle frame, arrow pointing right.","Right arrow, but the frame should switch to a circle.","The arrow turned 180° instead of 90°."],
      "explanation": "The arrow turns 90° clockwise each step (up, right, down, left, up → right). The frame alternates square/circle (next is circle)."
    },
    {
      "id": "a01-08",
      "topic": "Colour cycle + flip",
      "difficulty": 3,
      "stem": "Which figure comes next in the series?",
      "sequence": [
        [{"t":"poly","x":50,"y":54,"r":34,"n":3,"rot":0,"fill":"black"}],
        [{"t":"poly","x":50,"y":54,"r":34,"n":3,"rot":180,"fill":"grey"}],
        [{"t":"poly","x":50,"y":54,"r":34,"n":3,"rot":0,"fill":"white"}],
        [{"t":"poly","x":50,"y":54,"r":34,"n":3,"rot":180,"fill":"black"}],
        [{"t":"poly","x":50,"y":54,"r":34,"n":3,"rot":0,"fill":"grey"}]
      ],
      "options": [
        [{"t":"poly","x":50,"y":54,"r":34,"n":3,"rot":0,"fill":"white"}],
        [{"t":"poly","x":50,"y":54,"r":34,"n":3,"rot":180,"fill":"black"}],
        [{"t":"poly","x":50,"y":54,"r":34,"n":3,"rot":180,"fill":"grey"}],
        [{"t":"poly","x":50,"y":54,"r":34,"n":3,"rot":0,"fill":"grey"}],
        [{"t":"poly","x":50,"y":54,"r":34,"n":3,"rot":180,"fill":"white"}]
      ],
      "answer": 4,
      "hints": ["The colour follows a cycle. How long is it?","The orientation alternates up/down."],
      "optionNotes": ["Right colour, but the orientation flips each step.","The colour cycle has period 3, not 2.","Grey would repeat the previous colour.","Identical to the last frame.","Correct: white, pointing down."],
      "explanation": "The fill cycles black → grey → white (period 3): B, G, W, B, G → W. The triangle flips 180° each step: up, down, up, down, up → down."
    },
    {
      "id": "a01-09",
      "topic": "Number series",
      "difficulty": 3,
      "stem": "Which figure comes next in the series?",
      "sequence": [
        [{"t":"star","x":22,"y":22,"r":11,"rot":0,"fill":"black"}],
        [{"t":"star","x":22,"y":22,"r":11,"rot":0,"fill":"black"}],
        [{"t":"star","x":22,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":22,"r":11,"rot":0,"fill":"black"}],
        [{"t":"star","x":22,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":22,"r":11,"rot":0,"fill":"black"}],
        [{"t":"star","x":22,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":22,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":50,"r":11,"rot":0,"fill":"black"}]
      ],
      "options": [
        [{"t":"star","x":22,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":22,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":50,"r":11,"rot":0,"fill":"black"}],
        [{"t":"star","x":22,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":22,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":22,"y":78,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":78,"r":11,"rot":0,"fill":"black"}],
        [{"t":"star","x":22,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":22,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":50,"r":11,"rot":0,"fill":"black"}],
        [{"t":"star","x":22,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":22,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":22,"y":78,"r":11,"rot":0,"fill":"black"}],
        [{"t":"star","x":22,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":22,"r":11,"rot":0,"fill":"black"},{"t":"star","x":22,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":50,"r":11,"rot":0,"fill":"black"},{"t":"star","x":22,"y":78,"r":11,"rot":0,"fill":"black"},{"t":"star","x":50,"y":78,"r":11,"rot":0,"fill":"black"},{"t":"star","x":78,"y":78,"r":11,"rot":0,"fill":"black"}]
      ],
      "answer": 1,
      "hints": ["Count the stars: 1, 1, 2, 3, 5.","Each number is related to the two before it."],
      "optionNotes": ["No change.","Correct: 3 + 5 = 8.","Adding one each time does not fit 1, 1, 2.","Adding two does not fit the series.","Not consistent with the series."],
      "explanation": "The counts form the Fibonacci series: each term is the sum of the previous two (2 + 3 = 5, then 3 + 5 = 8)."
    },
    {
      "id": "a01-10",
      "topic": "Two cycles of different length",
      "difficulty": 3,
      "stem": "Which figure comes next in the series?",
      "sequence": [
        [{"t":"circle","x":50,"y":50,"r":36,"fill":"none"},{"t":"circle","x":50,"y":36,"r":6,"fill":"black"}],
        [{"t":"poly","x":50,"y":56,"r":40,"n":3,"rot":0,"fill":"none"},{"t":"circle","x":50,"y":66,"r":6,"fill":"black"}],
        [{"t":"rect","x":16,"y":16,"w":68,"h":68,"fill":"none"},{"t":"circle","x":50,"y":36,"r":6,"fill":"black"}],
        [{"t":"circle","x":50,"y":50,"r":36,"fill":"none"},{"t":"circle","x":50,"y":66,"r":6,"fill":"black"}],
        [{"t":"poly","x":50,"y":56,"r":40,"n":3,"rot":0,"fill":"none"},{"t":"circle","x":50,"y":36,"r":6,"fill":"black"}]
      ],
      "options": [
        [{"t":"circle","x":50,"y":50,"r":36,"fill":"none"},{"t":"circle","x":50,"y":66,"r":6,"fill":"black"}],
        [{"t":"poly","x":50,"y":56,"r":40,"n":3,"rot":0,"fill":"none"},{"t":"circle","x":50,"y":66,"r":6,"fill":"black"}],
        [{"t":"rect","x":16,"y":16,"w":68,"h":68,"fill":"none"},{"t":"circle","x":50,"y":52,"r":6,"fill":"black"}],
        [{"t":"rect","x":16,"y":16,"w":68,"h":68,"fill":"none"},{"t":"circle","x":50,"y":66,"r":6,"fill":"black"}],
        [{"t":"rect","x":16,"y":16,"w":68,"h":68,"fill":"none"},{"t":"circle","x":50,"y":36,"r":6,"fill":"black"}]
      ],
      "answer": 3,
      "hints": ["The outline shape repeats with one period, and the dot with another.","Shapes: circle, triangle, square, circle, triangle… Dot: top, bottom, top, bottom, top…"],
      "optionNotes": ["The shape cycle is circle → triangle → square.","The triangle would repeat.","The dot is only ever at the top or bottom.","Correct: square, dot at the bottom.","Right shape, but the dot alternates top/bottom."],
      "explanation": "The outer shape cycles circle → triangle → square (period 3), so the next is a square. The dot alternates top/bottom (period 2), so the next is bottom."
    }
  ]
});
