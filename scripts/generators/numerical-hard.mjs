// Original challenge templates. Called by numerical.mjs; never imports third-party question text.
import fs from 'node:fs';
import path from 'node:path';
import { numericalDifficulty } from '../lib/difficulty.mjs';

const sum = a => a.reduce((s, x) => s + x, 0);
const fmt = (n, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const table = (title, columns, rows, note) => ({ type: 'table', title: title + ' (fictional)', columns, rows, ...(note ? { note } : {}) });
const mistake = (v, note) => ({ v, note });
const percent = v => fmt(v, 2) + '%';
const money = v => 'EUR ' + fmt(v, 2);
const templates = [];

// Two totals, a price adjustment and a changing workforce denominator.
templates.push(k => {
  const names = ['North', 'South', 'East', 'West'];
  const rows = names.map((n, i) => [n, 410 + 31 * i + 23 * k, 640 + 57 * i + 37 * k, 1250 + 90 * i + 33 * k, 1390 + 73 * i + 21 * k]);
  const idx = 112 + 2 * k;
  const a = rows[k % 4], b = rows[(k + 2) % 4], N0 = a[1] + b[1], N1 = a[2] + b[2], W0 = a[3] + b[3], W1 = a[4] + b[4];
  const correct = ((N1 / (idx / 100) / W1) / (N0 / W0) - 1) * 100;
  return { topic: 'Real pooled productivity', exhibits: [table('Agency service revenue and full-time equivalents', ['Office', 'Revenue 2022 (EUR million)', 'Revenue 2025 (EUR million)', 'FTE 2022', 'FTE 2025'], rows), table('Service price indices (2022 = 100)', ['Service', '2024', '2025', '2026 forecast'], [['Casework', idx - 3, idx, idx + 4], ['Licensing', 109, 114, 119], ['Inspection', 111, 117, 121], ['Training', 106, 113, 116]])],
    stem: `For ${a[0]} and ${b[0]} combined, by what percentage did real revenue per FTE increase from 2022 to 2025? All their revenue is Casework revenue; deflate 2025 revenue using the Casework index. Use pooled totals and round only the final answer to two decimals.`, correct, format: percent,
    mistakes: [mistake((N1 / ((idx - 3) / 100) / W1 / (N0 / W0) - 1) * 100, 'Uses the 2024 Casework price index instead of the 2025 index.'), mistake((N1 / (idx / 100) / ((W0 + W1) / 2) / (N0 / W0) - 1) * 100, 'Uses the average workforce across the two years as the final-year denominator.'), mistake(((N1 / W1 / (N0 / W0) - 1) * 100) - (idx - 100), 'Subtracts inflation from nominal productivity growth rather than dividing growth factors.'), mistake(sum([a, b].map(r => (r[2] / (idx / 100) / r[4] / (r[1] / r[3]) - 1) * 100)) / 2, 'Averages office productivity growth rates rather than pooling revenue and FTE.'), mistake((N1 / W1 / (N0 / W0) - 1) * 100, 'Uses nominal revenue and omits the price adjustment.'), mistake((N1 / (idx / 100) / N0 - 1) * 100, 'Adjusts prices but omits the workforce change.'), mistake(correct * idx / 100, 'Multiplies the final percentage by the price index instead of deflating revenue.'), mistake(correct * W0 / W1, 'Applies the workforce adjustment to the percentage a second time.'), mistake((1 - (N0 / W0) / (N1 / (idx / 100) / W1)) * 100, 'Uses the final real productivity as the comparison base.')],
    solution: [`Pooled revenue: ${a[1]} + ${b[1]} = ${N0}; ${a[2]} + ${b[2]} = ${N1} million.`, `Pooled FTE: ${a[3]} + ${b[3]} = ${W0}; ${a[4]} + ${b[4]} = ${W1}.`, `Real 2025 revenue = ${N1} ÷ (${idx} ÷ 100) = ${fmt(N1 * 100 / idx, 6)} million.`, `2022 productivity = ${N0} ÷ ${W0} = ${fmt(N0 / W0, 6)} million/FTE.`, `2025 real productivity = ${fmt(N1 * 100 / idx, 6)} ÷ ${W1} = ${fmt(N1 * 100 / idx / W1, 6)} million/FTE.`, `Increase = (real 2025 productivity ÷ 2022 productivity − 1) × 100 = ${percent(correct)}.`],
    hints: ['Pool revenue and FTE separately for the two offices.', 'Deflate revenue, then compare revenue per FTE using the initial value as base.'], explanation: 'Aggregation, price changes and workforce changes affect different parts of the ratio. Keep full precision until the last step.' };
});

// Separate freight, goods discounts, exchange-rate direction and transaction fees.
templates.push(k => {
  const names = ['Atlas', 'Boreal', 'Cedar', 'Delta'];
  const rows = names.map((n, i) => [n, 75 + i * 13 + 7 * k, 240 + 17 * i + 11 * k, 8 + 2 * i + k, 1100 + 130 * i + 83 * k]);
  const rates = names.map((n, i) => [n, +(0.78 + .07 * i + .013 * k).toFixed(3), 2 + i, 30 + i]);
  const sel = [k % 4, (k + 1) % 4];
  const calc = (i, mode = '') => { const r = rows[i], s = rates[i]; const goods = r[1] * r[2]; return (goods * (mode === 'noDiscount' ? 1 : 1 - r[3] / 100) + (mode === 'noFreight' ? 0 : r[4] * (mode === 'discountFreight' ? 1 - r[3] / 100 : 1))) * s[1] * (mode === 'noFee' ? 1 : 1 + s[2] / 100); };
  const correct = sum(sel.map(i => calc(i)));
  return { topic: 'Cross-currency landed cost', exhibits: [table('Equipment orders; each supplier invoices in its own currency', ['Supplier', 'Units', 'Unit list price (supplier currency)', 'Goods discount (%)', 'Freight (supplier currency)'], rows), table('Settlement terms', ['Supplier', 'EUR per supplier-currency unit', 'Bank fee (%)', 'Payment term (days)'], rates)],
    stem: `What is the total EUR cost of the ${names[sel[0]]} and ${names[sel[1]]} orders? Discount applies only to goods. Add freight, convert using EUR per currency unit, then charge the bank fee on the whole converted invoice. There are no other taxes or charges. Round only the final total to cents.`, correct, format: money,
    mistakes: ['noDiscount', 'noFreight', 'discountFreight', 'noFee'].map((m, i) => mistake(sum(sel.map(j => calc(j, m))), ['Omits both goods discounts.', 'Omits freight from both invoices.', 'Incorrectly discounts freight as well as goods.', 'Omits bank fees.'][i])).concat([
      mistake(sum(sel.map(i => calc(i) * (1 + rates[i][2] / 100))), 'Charges the bank fee twice.'),
      mistake(sum(sel.map(i => calc(i) + rows[i][4] * rates[i][1] * (1 + rates[i][2] / 100))), 'Adds freight twice to each invoice.'),
      mistake(sum(sel.map(i => ((rows[i][1] * rows[i][2] - rows[i][3]) + rows[i][4]) * rates[i][1] * (1 + rates[i][2] / 100))), 'Treats the listed discount percentage as a fixed currency deduction.'),
      mistake(sum(sel.map(i => (rows[i][1] * rows[i][2] * (1 - rows[i][3] / 100 + rates[i][2] / 100) + rows[i][4] * (1 + rates[i][2] / 100)) * rates[i][1])), 'Nets goods discount and fee additively rather than compounding them.')
    ]),
    solution: sel.flatMap(i => { const r = rows[i], s = rates[i], net = r[1] * r[2] * (1 - r[3] / 100); return [`${r[0]} goods = ${r[1]} × ${r[2]} × (1 − ${r[3]} ÷ 100) = ${fmt(net, 6)}.`, `${r[0]} converted invoice = (${fmt(net, 6)} + ${r[4]}) × ${s[1]} = ${fmt((net + r[4]) * s[1], 6)} EUR.`, `${r[0]} with bank fee = ${fmt((net + r[4]) * s[1], 6)} × (1 + ${s[2]} ÷ 100) = ${fmt(calc(i), 6)} EUR.`]; }).concat(`Total = ${sel.map(i => fmt(calc(i), 6)).join(' + ')} = ${money(correct)}.`),
    hints: ['Work through each invoice separately; freight does not receive the goods discount.', 'The exchange rate is EUR per foreign unit, so multiply; apply the fee after conversion.'], explanation: 'Each percentage has a specified base. Preserve those bases when combining invoices in different currencies.' };
});

// Recover a missing rate from pooled survivors, rather than averaging percentages.
templates.push(k => {
  const names = ['Policy', 'Digital', 'Audit', 'Languages'];
  const rows = names.map((n, i) => [n, 840 + 120 * i + 40 * k, 10 + i * 3, 62 + i * 3 + k]);
  const a = rows[k % 3], b = rows[(k % 3) + 1]; b[3] = 'Unknown';
  const target = 74 + k;
  const A = a[1] * (1 - a[2] / 100), B = b[1] * (1 - b[2] / 100), required = (A + B) * target / 100 - A * a[3] / 100;
  const correct = required / B * 100;
  return { topic: 'Reverse pooled success rate', exhibits: [table('Training cohorts', ['Stream', 'Enrolled', 'Withdraw before assessment (%)', 'Pass among assessed (%)'], rows), table('Pooled pass-rate targets', ['Year', 'Target (%)', 'Planning capacity'], [['2023', 70, 2200], ['2024', 72, 2400], ['2025', target, 2600 + k * 100], ['2026', 80, 2900]])],
    stem: `In 2025, only ${a[0]} and ${b[0]} form the pooled cohort. Withdrawn participants are not assessed. What pass rate among assessed ${b[0]} participants is needed to meet the pooled target exactly? Treat counts as planning expectations; do not round intermediate values. Give the rate to two decimals.`, correct, format: percent,
    mistakes: [mistake(((a[1] + b[1]) * target / 100 - A * a[3] / 100) / B * 100, 'Applies the pooled target to enrolments rather than the assessed population.'), mistake(required / (b[1] * (1 - rows[(k % 3 + 2) % 4][2] / 100)) * 100, 'Uses another stream’s withdrawal percentage.'), mistake(2 * target - a[3], 'Treats the two assessed cohorts as equally large.'), mistake(((a[1] + b[1]) * target / 100 - a[1] * a[3] / 100) / b[1] * 100, 'Uses enrolled rather than assessed counts.'), mistake(required / b[1] * 100, 'Uses all enrolled participants as the unknown rate denominator.'), mistake(((A + B) * target / 100 - a[1] * a[3] / 100) / B * 100, 'Applies the known pass rate to enrolment before withdrawals.')],
    solution: [`Assessed ${a[0]} = ${a[1]} × (1 − ${a[2]} ÷ 100) = ${fmt(A, 6)}.`, `Assessed ${b[0]} = ${b[1]} × (1 − ${b[2]} ÷ 100) = ${fmt(B, 6)}.`, `Required pooled passes = (${fmt(A, 6)} + ${fmt(B, 6)}) × ${target} ÷ 100 = ${fmt((A + B) * target / 100, 6)}.`, `Known passes = ${fmt(A, 6)} × ${a[3]} ÷ 100 = ${fmt(A * a[3] / 100, 6)}.`, `Required ${b[0]} passes = ${fmt((A + B) * target / 100, 6)} − ${fmt(A * a[3] / 100, 6)} = ${fmt(required, 6)}.`, `Unknown rate = ${fmt(required, 6)} ÷ ${fmt(B, 6)} × 100 = ${percent(correct)}.`],
    hints: ['Subtract withdrawals from both cohort bases before pooling.', 'Required passes in the second stream equal the pooled target count minus passes in the first.'], explanation: 'Reverse a weighted rate by solving for counts first. An unweighted average of percentages loses the cohort sizes.' };
});

// Net output, partial recovery and additional hours on just one line.
templates.push(k => {
  const names = ['Line North', 'Line South', 'Line East', 'Line West'];
  const rows = names.map((n, i) => [n, 760 + 110 * i + 37 * k, 9 + i * 2 + k, 35 + i * 8, 12 + i + k]);
  const a = rows[k % 3], b = rows[k % 3 + 1];
  const rate = r => r[1] * (1 - r[2] / 100 * (1 - r[3] / 100));
  const demand = 53000 + 4700 * k, done = rate(a) * a[4] + rate(b) * b[4], correct = (demand - done) / rate(b);
  return { topic: 'Recovered-output capacity', exhibits: [table('Processing lines', ['Line', 'Gross units/hour', 'Initially rejected (%)', 'Rejected units recovered (%)', 'Hours already run'], rows), table('Firm demand', ['Order', 'Accepted units required', 'Dispatch priority'], [['Current', demand, 1], ['Next', 42000, 2], ['Reserve', 30000, 3], ['Forecast', 60000, 4]])],
    stem: `Only ${a[0]} and ${b[0]} serve the Current order. Both have already run the listed hours. Recovery is automatic and takes no additional line time. Keeping output and rejection rates constant, how many additional hours must ${b[0]} alone run to complete the order? Use continuous hours, rounding only the answer to two decimals.`, correct, format: v => fmt(v) + ' hours',
    mistakes: [mistake((demand - a[1] * a[4] - b[1] * b[4]) / b[1], 'Treats every gross unit as accepted, ignoring unrecovered rejects.'), mistake((demand - a[1] * (1 - a[2] / 100) * a[4] - b[1] * (1 - b[2] / 100) * b[4]) / (b[1] * (1 - b[2] / 100)), 'Treats all rejected units as permanently lost.'), mistake((demand - done) / b[1], 'Accounts for past rejects but uses gross output for future hours.'), mistake((demand - done) / rate(a), 'Uses the other line to calculate the extra hours.')],
    solution: [a, b].flatMap(r => [`${r[0]} permanent loss = ${r[2]} ÷ 100 × (1 − ${r[3]} ÷ 100) = ${fmt(r[2] / 100 * (1 - r[3] / 100), 6)}.`, `${r[0]} accepted rate = ${r[1]} × (1 − permanent loss) = ${fmt(rate(r), 6)} units/hour.`]).concat([`Already accepted = ${fmt(rate(a), 6)} × ${a[4]} + ${fmt(rate(b), 6)} × ${b[4]} = ${fmt(done, 6)}.`, `Remaining = ${demand} − ${fmt(done, 6)} = ${fmt(demand - done, 6)}.`, `Extra hours = ${fmt(demand - done, 6)} ÷ ${fmt(rate(b), 6)} = ${fmt(correct)} hours.`]),
    hints: ['Only rejects that are not recovered reduce the accepted hourly output.', 'Subtract what both lines have already produced, then divide by the accepted rate of the continuing line.'], explanation: 'A recovery percentage applies to rejects, not to all output. Separate past output from the rate used for future work.' };
});

// A binding cap changes the allocation denominator after overhead and reserve.
templates.push(k => {
  const rows = [['North', 930 + 47 * k, 1.8], ['South', 510 + 29 * k, 1.2], ['East', 420 + 31 * k, 1.4], ['West', 390 + 19 * k, 1.1]];
  const budget = 24 + 3 * k, overhead = 7 + k, reserve = 11 + k, cap = +(7.2 + .3 * k).toFixed(1);
  const pool = budget * (1 - overhead / 100) * (1 - reserve / 100), weights = rows.map(r => r[1] * r[2]), total = sum(weights), target = k % 3 + 1;
  const correct = (pool - cap) * weights[target] / (total - weights[0]);
  return { topic: 'Capped weighted redistribution', exhibits: [table('Regional allocation weights', ['Region', 'Population (thousand)', 'Need multiplier'], rows), table('Fund rules', ['Fund', 'Gross EUR million', 'Overhead (%)', 'Reserve of remainder (%)', 'North cap (EUR million)'], [['Current', budget, overhead, reserve, cap], ['Previous', 22, 6, 10, 4], ['Pilot', 18, 5, 9, 3], ['Draft', 35, 8, 12, 6]])],
    stem: `For the Current fund, remove overhead first and reserve that percentage of the remainder second. Initially allocate the available fund in proportion to population × need multiplier. Cap North's award at its listed maximum and redistribute its excess among the other three regions in proportion to their weights. No other cap applies. What is ${rows[target][0]}'s final award, to two decimals in EUR million?`, correct, format: v => 'EUR ' + fmt(v) + ' million',
    mistakes: [mistake((budget * (1 - reserve / 100) - cap) * weights[target] / (total - weights[0]), 'Omits overhead before allocating the fund.'), mistake((budget * (1 - overhead / 100) * (1 - 10 / 100) - cap) * weights[target] / (total - weights[0]), 'Uses the Previous reserve percentage instead of the Current one.'), mistake((budget * (1 - 6 / 100) * (1 - reserve / 100) - cap) * weights[target] / (total - weights[0]), 'Uses the Previous overhead percentage instead of the Current one.'), mistake(pool * weights[target] / total, 'Keeps the preliminary allocation and ignores redistribution after North hits its cap.'), mistake((pool - cap) * weights[target] / total, 'Removes the capped payment but leaves North in the remaining weight denominator.'), mistake((pool - cap) * rows[target][1] / sum(rows.slice(1).map(r => r[1])), 'Redistributes the uncapped pool by population alone, ignoring need multipliers.'), mistake((budget * (1 - overhead / 100 - reserve / 100) - cap) * weights[target] / (total - weights[0]), 'Subtracts both percentages from the gross fund instead of reserving from the remainder.'), mistake((pool - cap * (1 - overhead / 100) * (1 - reserve / 100)) * weights[target] / (total - weights[0]), 'Incorrectly reduces North’s cap by overhead and reserve before redistribution.'), mistake((budget * (1 - overhead / 100) - cap) * weights[target] / (total - weights[0]), 'Omits the reserve.')],
    solution: [`After overhead = ${budget} × (1 − ${overhead} ÷ 100) = ${fmt(budget * (1 - overhead / 100), 6)} million.`, `Available fund = after overhead × (1 − ${reserve} ÷ 100) = ${fmt(pool, 6)} million.`, ...rows.map((r, i) => `${r[0]} weight = ${r[1]} × ${r[2]} = ${fmt(weights[i], 6)}.`), `North preliminary = ${fmt(pool, 6)} × ${weights[0]} ÷ ${total} = ${fmt(pool * weights[0] / total, 6)} million, above the ${cap} cap.`, `Uncapped fund = ${fmt(pool, 6)} − ${cap} = ${fmt(pool - cap, 6)} million.`, `Other weights = ${total} − ${weights[0]} = ${total - weights[0]}.`, `Final award = ${fmt(pool - cap, 6)} × ${weights[target]} ÷ ${total - weights[0]} = ${fmt(correct)} million.`],
    hints: ['Apply overhead and reserve successively, then calculate all four weights.', 'Check whether North hits the cap. If so, the other regions share the available fund minus North’s capped payment.'], explanation: 'A binding cap changes the remaining allocation base. Reweight the uncapped regions after removing the capped payment.' };
});

// Whole-batch threshold after removing VAT and accounting for yield.
templates.push(k => {
  const rows = [['Kit A', 91 + 4 * k, 20, 34 + k, 85], ['Kit B', 128 + 5 * k, 21, 49 + k, 88], ['Kit C', 155, 19, 61, 90], ['Kit D', 178, 20, 70, 92]];
  const mixA = 3 + k % 2, mixB = 2, fixed = 28000 + 1700 * k, profit = 12500 + 1300 * k;
  const net = r => r[1] / (1 + r[2] / 100), cost = r => r[3] / (r[4] / 100);
  const contribution = mixA * (net(rows[0]) - cost(rows[0])) + mixB * (net(rows[1]) - cost(rows[1]));
  const correct = Math.ceil((fixed + profit) / contribution);
  return { topic: 'Yield-adjusted profit threshold', exhibits: [table('Production economics', ['Product', 'Sale price incl. VAT (EUR)', 'VAT (%)', 'Cost per manufactured unit (EUR)', 'Saleable yield (%)'], rows), table('Monthly objectives', ['Scenario', 'Fixed cost (EUR)', 'Required profit (EUR)'], [['Current', fixed, profit], ['Low', 24000, 10000], ['High', 36000, 18000], ['Pilot', 19000, 8000]])],
    stem: `Every sales batch contains ${mixA} saleable Kit A units and ${mixB} saleable Kit B units. Unsaleable output has no revenue or salvage value. Using expected yields, what is the minimum whole number of batches needed to cover Current fixed costs and earn at least the required profit? VAT is remitted in full; all listed production costs are net of recoverable VAT. Do not round unit costs or contribution before rounding the batch count upward.`, correct, format: v => fmt(v, 0) + ' batches',
    mistakes: [mistake(Math.ceil((fixed + profit) / (mixA * (net(rows[0]) - rows[0][3] / (rows[1][4] / 100)) + mixB * (net(rows[1]) - rows[1][3] / (rows[0][4] / 100)))) , 'Swaps the two saleable yields when calculating production costs.'), mistake(Math.ceil((fixed + profit) / (mixA * (net(rows[0]) - cost(rows[0]) / (rows[0][4] / 100)) + mixB * (net(rows[1]) - cost(rows[1]) / (rows[1][4] / 100)))) , 'Divides by saleable yield twice for each product.'), mistake(Math.ceil((fixed + profit) / (mixA * (net(rows[0]) - rows[0][3]) + mixB * (net(rows[1]) - rows[1][3]))), 'Ignores unsaleable production when calculating cost per saleable unit.'), mistake(Math.ceil((fixed + profit) / (mixA * (rows[0][1] - cost(rows[0])) + mixB * (rows[1][1] - cost(rows[1])))), 'Counts VAT receipts as retained revenue.'), mistake(Math.ceil(fixed / contribution), 'Covers fixed costs but omits the required profit.'), mistake(Math.floor((fixed + profit) / contribution), 'Rounds the threshold down, leaving profit below the target.'), mistake(Math.ceil((fixed + profit) / (mixA * (rows[0][1] * (1 - rows[0][2] / 100) - cost(rows[0])) + mixB * (rows[1][1] * (1 - rows[1][2] / 100) - cost(rows[1])))), 'Removes VAT by subtraction instead of dividing by one plus the VAT rate.')],
    solution: rows.slice(0, 2).flatMap(r => [`${r[0]} net revenue = ${r[1]} ÷ (1 + ${r[2]} ÷ 100) = ${fmt(net(r), 6)} EUR.`, `${r[0]} cost per saleable unit = ${r[3]} ÷ (${r[4]} ÷ 100) = ${fmt(cost(r), 6)} EUR.`]).concat([`Batch contribution = ${mixA} × (${fmt(net(rows[0]), 6)} − ${fmt(cost(rows[0]), 6)}) + ${mixB} × (${fmt(net(rows[1]), 6)} − ${fmt(cost(rows[1]), 6)}) = ${fmt(contribution, 6)} EUR.`, `Contribution required = ${fixed} + ${profit} = ${fixed + profit} EUR.`, `Batches = ${fixed + profit} ÷ ${fmt(contribution, 6)} = ${fmt((fixed + profit) / contribution, 6)}; round UP to ${correct}.`]),
    hints: ['Remove VAT from prices and divide manufacturing cost by the saleable fraction.', 'Calculate contribution for a complete batch, add required profit to fixed cost, and round the batch threshold upward.'], explanation: 'Revenue, cost and yield use different bases. A minimum feasible whole batch must meet the inequality, not simply be the nearest integer.' };
});

// Link indices across base changes before deflating a per-capita comparison.
templates.push(k => {
  const rows = [['North', 420 + 21 * k, 760 + 39 * k, +(1.8 + .1 * k).toFixed(1), +(2.1 + .1 * k).toFixed(1)], ['South', 530, 790, 2.2, 2.5], ['East', 390, 620, 1.7, 1.9], ['West', 610, 920, 2.8, 3.1]];
  const base = 103, link = 116 + k, end = 113 + k;
  const r = rows[0], factor = link / base * end / 100, correct = (r[2] / factor / r[4] / (r[1] / r[3]) - 1) * 100;
  return { topic: 'Linked-index real per-capita change', exhibits: [table('Public expenditure and population', ['Region', 'Spending 2021 (EUR million)', 'Spending 2025 (EUR million)', 'Population 2021 (million)', 'Population 2025 (million)'], rows), table('Spending deflator bridge', ['Series', '2021', '2023 link year', '2025'], [['Old base', base, link, 'Not published'], ['New base', 'Not published', 100, end], ['Wage index', 101, 110, 124], ['Housing index', 105, 118, 132]], 'Old and new base deflators measure the same price series; use 2023 to link them.')],
    stem: 'By what percentage did North’s expenditure per resident at constant 2021 prices increase from 2021 to 2025? Link the Old base and New base deflators through 2023 before adjusting nominal spending. Round only the final percentage to two decimals.', correct, format: percent,
    mistakes: [mistake((r[2] / (link / base + end / 100 - 1) / r[4] / (r[1] / r[3]) - 1) * 100, 'Adds the two period price increases instead of compounding their factors.'), mistake((r[2] / (link / 100 * end / 100) / r[4] / (r[1] / r[3]) - 1) * 100, 'Assumes the old-base index in 2021 was 100 instead of its listed value.'), mistake(((r[2] / r[4] / (r[1] / r[3]) - 1) - (factor - 1)) * 100, 'Subtracts cumulative inflation from nominal per-capita growth instead of dividing growth factors.'), mistake((r[2] / (end / 100) / r[4] / (r[1] / r[3]) - 1) * 100, 'Uses the new-base index alone and omits price changes before the link year.'), mistake((r[2] / (end / base) / r[4] / (r[1] / r[3]) - 1) * 100, 'Divides index values that use different bases.'), mistake((r[2] / factor / r[1] - 1) * 100, 'Deflates spending but ignores the population change.'), mistake((r[2] / r[4] / (r[1] / r[3]) - 1) * 100, 'Compares nominal per-capita amounts without deflating.'), mistake((1 - (r[1] / r[3]) / (r[2] / factor / r[4])) * 100, 'Uses final real expenditure per resident as the percentage base.')],
    solution: [`2021–2023 price factor = ${link} ÷ ${base} = ${fmt(link / base, 8)}.`, `2023–2025 price factor = ${end} ÷ 100 = ${fmt(end / 100, 8)}.`, `Linked price factor = ${link} ÷ ${base} × ${end} ÷ 100 = ${fmt(factor, 8)}.`, `2025 real spending = ${r[2]} ÷ linked factor = ${fmt(r[2] / factor, 6)} million.`, `2021 per resident = ${r[1]} ÷ ${r[3]} = ${fmt(r[1] / r[3], 6)} EUR.`, `2025 real per resident = real spending ÷ ${r[4]} = ${fmt(r[2] / factor / r[4], 6)} EUR.`, `Increase = (2025 real per resident ÷ 2021 per resident − 1) × 100 = ${percent(correct)}.`],
    hints: ['The two index rows have different bases; first calculate price factors on either side of the shared year.', 'Multiply the factors, deflate 2025 expenditure, then compare per-capita values.'], explanation: 'A rebased index cannot be compared directly with the old series. Link ratios through the overlap year, then account for population.' };
});

// Reusable returns and transport loss sit on different sides of a stock equation.
templates.push(k => {
  const names = ['North', 'South', 'East', 'West'];
  const rows = names.map((n, i) => [n, 620 + 40 * i + 17 * k, 3200 + 310 * i + 173 * k, 1800 + 170 * i + 127 * k, 8 + i]);
  const policies = names.map((n, i) => [n, 60 + 4 * i, 6 + i + k, 850 + 70 * i + 37 * k]);
  const x = k, r = rows[x], p = policies[x], dispatch = r[2] + r[3], reused = dispatch * r[4] / 100 * p[1] / 100;
  const need = dispatch + p[3] - r[1] - reused, correct = need / (1 - p[2] / 100);
  return { topic: 'Reverse stock flow with returns', exhibits: [table('Weekly warehouse flows (units)', ['Warehouse', 'Opening stock', 'Online dispatch', 'Retail dispatch', 'Dispatch returned (%)'], rows), table('Recovery and replenishment rules', ['Warehouse', 'Returned units reusable (%)', 'Incoming transport loss (%)', 'Required closing stock (units)'], policies)],
    stem: `For ${names[x]}, all listed dispatches must be made this week. Returns from those dispatches arrive and are processed before closing; reusable returns re-enter stock once and are not dispatched again this week. Incoming transport losses apply only to new replenishment. What gross replenishment must leave the central depot to achieve the required closing stock? Treat flows as planning expectations, to two decimal units.`, correct, format: v => fmt(v) + ' units',
    mistakes: [mistake(need, 'Calculates arrivals needed but omits incoming transport losses.'), mistake((dispatch + p[3] - r[1]) / (1 - p[2] / 100), 'Ignores reusable returns.'), mistake((dispatch + p[3] - r[1] - dispatch * r[4] / 100) / (1 - p[2] / 100), 'Assumes all returned units are reusable.'), mistake(need * (1 + p[2] / 100), 'Adds the loss percentage instead of dividing by the surviving fraction.'), mistake((dispatch - r[1] - reused) / (1 - p[2] / 100), 'Omits the closing stock requirement.')],
    solution: [`Dispatch = ${r[2]} + ${r[3]} = ${dispatch}.`, `Returns = ${dispatch} × ${r[4]} ÷ 100 = ${fmt(dispatch * r[4] / 100, 6)}.`, `Reusable returns = returns × ${p[1]} ÷ 100 = ${fmt(reused, 6)}.`, `Required arrivals = ${dispatch} + ${p[3]} − ${r[1]} − ${fmt(reused, 6)} = ${fmt(need, 6)}.`, `Gross replenishment = ${fmt(need, 6)} ÷ (1 − ${p[2]} ÷ 100) = ${fmt(correct)} units.`],
    hints: ['Write closing stock = opening stock + surviving arrivals + reusable returns − dispatch.', 'Only the returned share times the reusable share goes back into stock; reverse the incoming loss last.'], explanation: 'Place each flow on the correct side of the stock equation. Reverse a delivery loss using division, and avoid counting reusable returns twice.' };
});

// Solve an unknown exchange rate after a fixed hedge and a fee.
templates.push(k => {
  const names = ['Sensors', 'Pumps', 'Meters', 'Valves'];
  const rows = names.map((n, i) => [n, 1400 + 140 * i + 70 * k, 92 + i * 11 + k * 3, 38 + i * 4, +(.86 + i * .01).toFixed(2)]);
  const terms = names.map((n, i) => [n, 90000 + i * 12000 + 3500 * k, 13000 + i * 1300 + 700 * k, 2 + i * .25]);
  const x = k, r = rows[x], p = terms[x], sales = r[1] * r[2], hedged = sales * r[3] / 100, unhedged = sales - hedged, target = p[1] + p[2];
  const correct = (target / (1 - p[3] / 100) - hedged * r[4]) / unhedged;
  return { topic: 'Hedged exchange-rate threshold', exhibits: [table('Export invoices, all billed in USD', ['Product', 'Units', 'USD per unit', 'Receipts hedged (%)', 'Hedge rate (EUR per USD)'], rows), table('EUR settlement requirements', ['Product', 'Total EUR cost', 'Minimum EUR profit', 'Fee on total converted receipts (%)'], terms)],
    stem: `For ${names[x]}, the hedged share converts at the fixed hedge rate and the rest at one unknown spot rate. The bank deducts its fee from the entire converted EUR receipt. What minimum spot rate, in EUR per USD, yields the listed minimum profit after covering total cost? Ignore other taxes and charges. Round the mathematical threshold to four decimals (do not round it upward to a tradable quote).`, correct, format: v => fmt(v, 4) + ' EUR per USD',
    mistakes: [mistake((target - hedged * r[4]) / (unhedged * (1 - p[3] / 100)), 'Deducts the bank fee only from unhedged proceeds rather than the whole converted receipt.'), mistake((target / (1 - p[3] / 100) - hedged * rows[(x + 3) % 4][4]) / unhedged, 'Uses another product’s hedge rate.'), mistake((target - hedged * r[4]) / unhedged, 'Omits the settlement fee.'), mistake(target / (1 - p[3] / 100) / sales, 'Treats all receipts as unhedged.'), mistake((target * (1 + p[3] / 100) - hedged * r[4]) / unhedged, 'Reverses a deducted fee by multiplication instead of division.'), mistake((p[1] / (1 - p[3] / 100) - hedged * r[4]) / unhedged, 'Covers cost but omits the profit requirement.'), mistake((target / (1 - p[3] / 100) - sales * r[3] / 100 * rows[(x + 1) % 4][4]) / unhedged, 'Uses another product’s hedge rate.')],
    solution: [`Invoice = ${r[1]} × ${r[2]} = ${sales} USD.`, `Hedged USD = ${sales} × ${r[3]} ÷ 100 = ${fmt(hedged, 6)}.`, `Hedged EUR = ${fmt(hedged, 6)} × ${r[4]} = ${fmt(hedged * r[4], 6)}.`, `Unhedged USD = ${sales} − ${fmt(hedged, 6)} = ${fmt(unhedged, 6)}.`, `Gross EUR needed = (${p[1]} + ${p[2]}) ÷ (1 − ${p[3]} ÷ 100) = ${fmt(target / (1 - p[3] / 100), 6)}.`, `Spot rate = (gross EUR needed − hedged EUR) ÷ unhedged USD = ${fmt(correct, 4)} EUR per USD.`],
    hints: ['Reverse the fee on the total EUR receipt before separating the hedged and unhedged shares.', 'Subtract the EUR guaranteed by the hedge and divide the remainder by the unhedged USD amount.'], explanation: 'The unknown rate applies only to the unhedged balance. Solve the receipt equation backward after restoring the fee and target profit.' };
});

// Fixed delivered output with different generation losses and nonzero life-cycle intensities.
templates.push(k => {
  const rows = [['Gas', 26 + 2 * k, 7 + k, 430 + 10 * k], ['Wind', 15 + k, 12 + k, 28 + 2 * k], ['Nuclear', 21 + k, 5, 18], ['Solar', 10 + k, 10, 44]];
  const cut = 18 + 2 * k, emissions = sum(rows.map(r => r[1] * r[3])), g = rows[0], w = rows[1], eg = 1 - g[2] / 100, ew = 1 - w[2] / 100;
  const saved = emissions * cut / 100, intensity = g[3] / eg - w[3] / ew, delivered = saved / intensity, correct = delivered / ew;
  return { topic: 'Loss-adjusted emissions substitution', exhibits: [table('Annual generation and life-cycle emissions', ['Source', 'Gross generation (TWh)', 'Delivery loss (%)', 'Emissions (g CO2e per gross kWh)'], rows), table('System targets', ['Plan', 'Total emissions reduction (%)', 'Reserve margin (%)'], [['Current', cut, 15], ['Prior', 15, 12], ['Stretch', 30, 18], ['Draft', 25, 16]])],
    stem: 'The Current plan cuts total system emissions by replacing Gas with additional Wind while keeping total delivered electricity unchanged. Nuclear and Solar stay unchanged. Loss rates and emissions intensities remain constant. How much additional gross Wind generation is required, in TWh to two decimals? Include Wind’s own emissions; reserve margin does not change the calculation.', correct, format: v => fmt(v) + ' TWh',
    mistakes: [mistake(saved / (g[3] - w[3] / ew) / ew, 'Uses Gas gross intensity rather than its emissions per delivered kWh.'), mistake(correct / ew, 'Applies the Wind delivery-loss adjustment twice.'), mistake(correct * 1.15, 'Increases the required substitution by the listed reserve margin although reserve does not change.'), mistake(saved / (g[3] - w[3]), 'Treats gross generation as delivered generation and ignores both loss rates.'), mistake(saved / (g[3] / eg) / ew, 'Treats additional Wind as emissions-free.'), mistake(delivered, 'Reports delivered Wind instead of the gross generation required.'), mistake(g[1] * g[3] * cut / 100 / intensity / ew, 'Applies the reduction target only to Gas emissions instead of total system emissions.'), mistake(saved / (g[3] / eg - w[3]) / ew, 'Adjusts Gas losses but uses Wind gross intensity as its delivered intensity.')],
    solution: [`Baseline emissions proportional to ${rows.map(r => `${r[1]} × ${r[3]}`).join(' + ')} = ${emissions}.`, `Required saving = ${emissions} × ${cut} ÷ 100 = ${fmt(saved, 6)} on the same scale.`, `Gas per delivered kWh = ${g[3]} ÷ (1 − ${g[2]} ÷ 100) = ${fmt(g[3] / eg, 6)} g.`, `Wind per delivered kWh = ${w[3]} ÷ (1 − ${w[2]} ÷ 100) = ${fmt(w[3] / ew, 6)} g.`, `Saving per delivered kWh = ${fmt(g[3] / eg, 6)} − ${fmt(w[3] / ew, 6)} = ${fmt(intensity, 6)} g.`, `Delivered substitution = ${fmt(saved, 6)} ÷ ${fmt(intensity, 6)} = ${fmt(delivered, 6)} TWh.`, `Gross Wind = ${fmt(delivered, 6)} ÷ (1 − ${w[2]} ÷ 100) = ${fmt(correct)} TWh.`],
    hints: ['Calculate the emissions saving required from the whole system, including unchanged sources.', 'Compare emissions per delivered kWh for Gas and Wind. Convert the delivered substitution back to gross Wind last.'], explanation: 'Replacing equal gross output would change delivered supply. Compare emissions on a common delivered-energy base and include the replacement source’s emissions.' };
});

function options(t, k, si) {
  const key = t.correct, f = t.format;
  const used = new Set([f(key)]), shown = new Set(t.exhibits.flatMap(e => e.rows.flatMap(r => r.slice(1))).filter(v => typeof v === 'number'));
  const pool = [];
  for (const d of t.mistakes) {
    if (!Number.isFinite(d.v) || d.v < .7 * key || d.v > 1.4 * key || used.has(f(d.v))) continue;
    const val = Number(f(d.v).replace(/,/g, '').match(/\d+(?:\.\d+)?/)[0]);
    if (shown.has(val)) continue;
    pool.push({ v: d.v, s: f(d.v), note: d.note }); used.add(f(d.v));
  }
  if (pool.length < 4) throw Error(`Only ${pool.length} genuine distractors: ${t.topic} variant ${si}: ${t.mistakes.map(d => (d.v / key).toFixed(3)).join(",")}`);
  // Enumerate feasible sorted key positions using genuine mistakes on either side.
  const below = pool.filter(d => d.v < key), above = pool.filter(d => d.v > key);
  return Array.from({ length: 5 }, (_, pos) => pos).filter(pos => below.length >= pos && above.length >= 4 - pos).map(pos => {
    const rotate = a => a.slice((k + si) % (a.length || 1)).concat(a.slice(0, (k + si) % (a.length || 1)));
    const chosen = rotate(below).slice(0, pos).concat(rotate(above).slice(0, 4 - pos), [{ v: key, s: f(key), note: 'Correct. Follow the worked solution, retaining full intermediate precision.', correct: true }]);
    chosen.sort((a, b) => a.v - b.v);
    return { options: chosen.map(x => x.s), answer: pos, optionNotes: chosen.map(x => x.note) };
  });
}

function balancedLayouts(pools) {
  const remaining = [2, 2, 2, 2, 2], chosen = [];
  const order = pools.map((p, i) => i).sort((a, b) => pools[a].length - pools[b].length);
  function visit(at) {
    if (at === order.length) return true;
    const i = order[at];
    for (const layout of pools[i].slice().sort((a, b) => remaining[b.answer] - remaining[a.answer])) {
      if (!remaining[layout.answer]) continue;
      remaining[layout.answer]--; chosen[i] = layout;
      if (visit(at + 1)) return true;
      remaining[layout.answer]++;
    }
    return false;
  }
  if (!visit(0)) throw Error('Cannot balance genuine mistake options: ' + JSON.stringify(pools.map(p => p.map(l => l.answer))));
  return chosen;
}

export function generateHardSets(root) {
  const all = [];
  for (let s = 0; s < 4; s++) {
    const id = String(s + 5).padStart(2, '0');
    // Different model orders prevent the same template/key pattern repeating across sets.
    const sequences = [[4, 1, 9, 0, 6, 3, 7, 8, 5, 2], [7, 3, 0, 5, 8, 2, 9, 1, 4, 6], [2, 8, 5, 9, 1, 6, 4, 0, 3, 7], [6, 0, 7, 4, 2, 8, 3, 5, 9, 1]];
    const drafts = sequences[s].map(i => templates[i](s));
    const layouts = balancedLayouts(drafts.map((t, i) => options(t, i, s)));
    const questions = drafts.map((t, i) => {
      const q = { id: `n${id}-${String(i + 1).padStart(2, '0')}`, topic: t.topic, difficulty: 3, challenge: true, exhibits: t.exhibits, stem: t.stem, ...layouts[i], hints: t.hints, solution: t.solution, explanation: t.explanation };
      if (numericalDifficulty(q) !== 3) throw Error('Challenge rubric mismatch: ' + q.topic);
      return q;
    });
    const set = { id: 'numerical-' + id, section: 'numerical', title: `Numerical reasoning · Set ${s + 5} — Very hard`, description: '10 original challenge items: linked exhibits, reverse calculations and changing bases. Timed practice: 20 minutes. Difficulty is editorial, pending user calibration.', version: 1, challenge: true, questions };
    fs.writeFileSync(path.join(root, `questions/numerical/numerical-set-${id}.js`), '/* Generated by scripts/generators/numerical.mjs. Edit numerical-hard.mjs, not this file. */\nEPSO_BANK.registerSet(' + JSON.stringify(set, null, 2) + ');\n');
    all.push(...questions);
  }
  console.log('numerical challenge: ' + all.length + ' items from ' + templates.length + ' templates; key positions ' + [0, 1, 2, 3, 4].map(i => all.filter(q => q.answer === i).length).join('/'));
}
