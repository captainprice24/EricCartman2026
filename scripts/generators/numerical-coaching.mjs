// Worked teaching paths for the ten expansion models; original authoring, not book text.
const f = (v, d = 6) => v.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: d});
export function completeExpansionCoaching(t) {
  const label = t.stem.match(/(?:district|Tank|code|Plan|account|office|route|asset|club|line) ([A-D])[, .]/)[1];
  const r = t.exhibits[0].rows.find(row => row[0] === label);
  const p = t.exhibits[1]?.rows[0];
  let steps;
  switch (t.topic) {
    case 'Sequential screening posterior': {
      const yes = 1000 * r[1], no = 100000 - yes;
      const trueBoth = yes * r[2] / 100 * r[4] / 100;
      const falseBoth = no * r[3] / 100 * r[5] / 100;
      steps = [`Use 100,000 hypothetical people: ${f(yes)} have the condition; ${f(no)} do not.`,
        `With the condition and both positive: ${f(yes)} × (${r[2]} ÷ 100) × (${r[4]} ÷ 100) ≈ ${f(trueBoth)}.`,
        `Without the condition and both positive: ${f(no)} × (${r[3]} ÷ 100) × (${r[5]} ÷ 100) ≈ ${f(falseBoth)}.`,
        `Both-positive denominator ≈ ${f(trueBoth)} + ${f(falseBoth)} = ${f(trueBoth + falseBoth)}.`,
        `Required share = true both-positive count ÷ total both-positive count × 100 ≈ ${t.format(t.correct)}.`];
      break;
    }
    case 'Evaporation and replacement mixture': {
      const solute = r[1] * r[2] / 100 * (1 - r[3] / 100);
      const volume = r[1] * (1 - r[3] / 100) * (1 - r[4] / 100);
      const water = Number(t.stem.match(/exactly (\d+) litres/)[1]);
      steps = [`After draining: solute = ${r[1]} × (${r[2]} ÷ 100) × (1 − ${r[3]} ÷ 100) ≈ ${f(solute)} litres.`,
        `After evaporation: volume = ${r[1]} × (1 − ${r[3]} ÷ 100) × (1 − ${r[4]} ÷ 100) ≈ ${f(volume)} litres; solute stays unchanged.`,
        `Final solute = ${f(solute)} + (${r[5]} ÷ 100)x; final volume = ${f(volume)} + ${water} + x.`,
        `Equate solute to target fraction × volume. Thus x = ((${p[1]} ÷ 100) × (${f(volume)} + ${water}) − ${f(solute)}) ÷ ((${r[5]} − ${p[1]}) ÷ 100) ≈ ${t.format(t.correct)}.`];
      break;
    }
    case 'Inverse capped-contribution taxation': {
      const taxable = t.correct - r[6] - r[1], contributionBeforeCap = t.correct * r[5] / 100;
      steps = [...t.solution.slice(0, 3),
        `Solve (1 − ${r[4]} ÷ 100)G = ${p[1]} − ${p[2]} + ${r[6]} + ${r[2]} × (${r[3]} ÷ 100) − (${r[6]} + ${r[1]} + ${r[2]}) × (${r[4]} ÷ 100).`,
        `Gross pay ≈ ${t.format(t.correct)}. Uncapped contribution ≈ EUR ${f(contributionBeforeCap)} > EUR ${r[6]}, and taxable pay ≈ EUR ${f(taxable)} > EUR ${r[2]}; both assumed regimes hold.`];
      break;
    }
    case 'Reverse savings with intervening withdrawal': {
      const factor1 = 1 + r[1] / 100 * (1 - r[3] / 100), factor2 = 1 + r[2] / 100 * (1 - r[3] / 100);
      const beforeFee = p[1] / (1 - r[4] / 100), secondOpening = beforeFee / factor2;
      steps = [`Before the final fee: ${p[1]} ÷ (1 − ${r[4]} ÷ 100) ≈ EUR ${f(beforeFee)}.`,
        `Year 2 after-tax multiplier = 1 + (${r[2]} ÷ 100) × (1 − ${r[3]} ÷ 100) = ${f(factor2)}.`,
        `Reverse year 2 growth: opening balance ≈ EUR ${f(secondOpening)}. Restore the withdrawal: ≈ EUR ${f(secondOpening + r[5])}.`,
        `Year 1 after-tax multiplier = 1 + (${r[1]} ÷ 100) × (1 − ${r[3]} ÷ 100) = ${f(factor1)}.`,
        `Initial deposit = restored balance ÷ year 1 multiplier ≈ ${t.format(t.correct)}.`];
      break;
    }
    case 'Fee-sensitive portfolio rebalance': {
      const x = r[1] * (1 + r[3] / 100), y = r[2] * (1 - r[4] / 100), fee = r[5] / 100, target = p[1] / 100;
      steps = [`After price changes: X = ${r[1]} × (1 + ${r[3]} ÷ 100) ≈ EUR ${f(x)}; Y ≈ EUR ${f(y)}.`,
        `After selling s: X = ${f(x)} + (1 − ${fee})s; total = ${f(x + y)} − ${fee}s.`,
        `Set X = ${target} × total, giving (1 − ${fee} + ${target} × ${fee})s = ${target} × ${f(x + y)} − ${f(x)}.`,
        `Solve s ≈ ${t.format(t.correct)}. It lies between zero and available Y (EUR ${f(y)}), so the transfer is feasible.`];
      break;
    }
    case 'Deduplicated workload with conditional rework': {
      const web = r[1] - r[3], desk = r[2] - r[3], unique = web + desk + r[3];
      const rework = web * r[4] / 100 + desk * r[5] / 100 + r[3] * (r[4] + r[5]) / 200;
      const extra = rework * p[2] / 100, days = t.correct;
      steps = [`Disjoint groups: web-only = ${web}; desk-only = ${desk}; both = ${r[3]}. Initial reviews = ${unique}.`,
        `Expected rework = ${web} × (${r[4]} ÷ 100) + ${desk} × (${r[5]} ÷ 100) + ${r[3]} × ((${r[4]} + ${r[5]}) ÷ 200) ≈ ${f(rework)}.`,
        `Extra reviews = rework × (${p[2]} ÷ 100) ≈ ${f(extra)}. Total expected reviews ≈ ${f(unique + extra)}.`,
        `Days = ceiling(total reviews ÷ ${p[1]}) = ${days}. Check: ${days - 1} days cover ${(days - 1) * p[1]} reviews, below demand; ${days} days cover ${days * p[1]}.`];
      break;
    }
    case 'Emissions-constrained minimum journey time': {
      const budgetLeft = p[1] - r[1] * r[4], fast = budgetLeft / (r[5] - r[4]), slow = r[1] - fast;
      steps = [`All-slow emissions = ${r[1]} × ${r[4]} = ${r[1] * r[4]} g; budget remaining = ${budgetLeft} g.`,
        `Each fast km adds ${r[5] - r[4]} g, so fast distance = ${budgetLeft} ÷ ${r[5] - r[4]} ≈ ${f(fast)} km. Slow distance ≈ ${f(slow)} km.`,
        `The fast distance is within the route length; faster travel reduces time, so using the full emissions budget is optimal.`,
        `Total minutes = (slow distance ÷ ${r[2]} + fast distance ÷ ${r[3]}) × 60 + ${p[2]} ≈ ${t.format(t.correct)}.`];
      break;
    }
    case 'Replacement finance after taxed disposal': {
      const book = r[1] * (1 - r[2] / 100) ** r[3], gain = Math.max(0, r[4] - book), tax = gain * r[5] / 100;
      const cash = r[4] - tax - r[6], gap = p[1] - cash;
      steps = [`Book value = ${r[1]} × (1 − ${r[2]} ÷ 100)^${r[3]} ≈ EUR ${f(book)}.`,
        `Positive sale gain = max(0, ${r[4]} − book value) ≈ EUR ${f(gain)}; gain tax ≈ EUR ${f(tax)}.`,
        `Usable cash = sale proceeds − gain tax − old debt ≈ EUR ${f(cash)}. Funding gap = ${p[1]} − usable cash ≈ EUR ${f(gap)}.`,
        `Gross loan = gap ÷ (1 − ${p[2]} ÷ 100) ≈ ${t.format(t.correct)}. Forward check: loan × surviving fraction supplies the gap before final rounding.`];
      break;
    }
    case 'Reverse entrant composition after cohort attrition': {
      const openingP = r[1] * r[2] / 100 * r[3] / 100, openingOther = r[1] * (1 - r[2] / 100) * r[4] / 100;
      const entrants = r[5] * p[2] / 100, total = openingP + openingOther + entrants, required = total * p[1] / 100 - openingP;
      steps = [`Retained opening P = ${r[1]} × (${r[2]} ÷ 100) × (${r[3]} ÷ 100) ≈ ${f(openingP)}.`,
        `Retained opening other ≈ ${f(openingOther)}; retained entrants = ${r[5]} × (${p[2]} ÷ 100) ≈ ${f(entrants)}.`,
        `Final population ≈ ${f(total)}; P needed among retained entrants = total × (${p[1]} ÷ 100) − retained opening P ≈ ${f(required)}.`,
        `Required entrant P share = required P ÷ retained entrants × 100 ≈ ${t.format(t.correct)}. Equal retention for both entrant categories preserves their original proportion.`];
      break;
    }
    case 'Indivisible capacity after serial losses': {
      const yieldFraction = (1 - r[2] / 100) * (1 - r[3] / 100), hours = p[1] * p[2] * (1 - r[5] / 100);
      const delivered = hours * r[4] * yieldFraction, modules = Math.ceil(r[1] / delivered);
      steps = [`Delivered yield = (1 − ${r[2]} ÷ 100) × (1 − ${r[3]} ÷ 100) = ${f(yieldFraction)}.`,
        `Productive hours per module = ${p[1]} × ${p[2]} × (1 − ${r[5]} ÷ 100) ≈ ${f(hours)}.`,
        `Delivered units per module = productive hours × ${r[4]} × yield ≈ ${f(delivered)}.`,
        `Modules = ceiling(${r[1]} ÷ delivered capacity) = ${modules}. Check: ${modules - 1} modules deliver ≈ ${f((modules - 1) * delivered)} < ${r[1]}; ${modules} deliver ≈ ${f(modules * delivered)} ≥ ${r[1]}.`,
        `Outlay = ${p[4]} + ${modules} × ${p[3]} = ${t.format(t.correct)}; setup is paid once.`];
      break;
    }
    default: throw Error('Unreviewed expansion teaching path: ' + t.topic);
  }
  t.solution = ['Displayed intermediate decimals are approximations. Retain the original expressions in calculations and round only the final answer.', ...steps];
  return t;
}
