# Blind reviewer instructions

You are an independent blind reviewer for an EPSO-style verbal reasoning practice test. Read ONLY the one blind file
named in your assignment (in this folder).
Do not open, search or read any other file (in particular not the question bank or any other review file), because
that would reveal the answer key and invalidate the review.

For every item, using the passage alone (no outside knowledge):
1. Choose the ONE option the passage supports (directly or by clear logic).
2. Label each of the other three options exactly one of: "False" (the passage contradicts it), "Not supported" (the
   passage does not say it: invented detail, unstated cause, outside fact, comparison not made), or "Overstated"
   (partly right but stronger or wider than the passage). Convention: if a strong claim ('proved', 'always',
   'alone', 'every') is directly contradicted by an explicit statement, use False; if the passage states only a
   weaker version of the same claim, use Overstated.
3. Note any issue: no correct option, two defensible options, a factual error, ambiguous wording, or a genuinely
   borderline label (name the alternative).
4. Rate difficulty 1–5 (3 = typical exam item).

Write JSON to the answers file named in your assignment (same folder), in this shape:
{ "<item id>": { "answer": "C", "labels": { "A": "False", "B": "Overstated", "D": "Not supported" }, "issues": [], "difficulty": 3, "reasoning": "one or two sentences" }, ... }
Use item ids exactly as in the file headings, one entry per item, and check the file parses as JSON. Reply with a short
summary: number of items, any items with no or two defensible answers, and borderline labels.
