// End-to-end regression tests in real browsers (Playwright) plus an axe-core accessibility scan.
// Usage: node tests/e2e.mjs            (Chromium)
//        BROWSERS=chromium,webkit node tests/e2e.mjs
//        CHROMIUM_PATH=/path/to/chrome node tests/e2e.mjs   (use a preinstalled browser)
// Runs against the single-file build in dist/, so run `node scripts/build.mjs` first.
import { chromium, webkit, firefox } from "playwright";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import assert from "node:assert/strict";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const URL = pathToFileURL(path.join(root, "dist/ad5-reasoning-trainer.html")).href;
const SRC_URL = pathToFileURL(path.join(root, "index.html")).href;
const AXE = require.resolve("axe-core/axe.min.js");
const engines = { chromium, webkit, firefox };
const names = (process.env.BROWSERS || "chromium").split(",").map((s) => s.trim());

let failures = 0;
const results = [];
async function check(name, fn) {
  try { await fn(); results.push("  ✓ " + name); }
  catch (e) { failures++; results.push("  ✗ " + name + "\n      " + String(e.message || e).split("\n").join("\n      ")); }
  console.log(results[results.length - 1]);
}

async function axe(page, label) {
  await page.addScriptTag({ path: AXE });
  const r = await page.evaluate(async () => {
    const out = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] });
    return out.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.length} node(s) – ${v.help}`);
  });
  assert.deepEqual(r, [], `axe violations on ${label}:\n${r.join("\n")}`);
}

const answerKey = (page) => page.evaluate(() => {
  const s = window.EPSO_APP.state.session, sec = s.sections[s.si], it = sec.items[s.qi];
  return { correct: it.q.answer, pos: it.order.indexOf(it.q.answer), n: it.order.length };
});

async function finishCurrentSectionByKeyboard(page) {
  const n = await page.locator(".qdot").count();
  for (let i = 0; i < n; i++) {
    await page.locator("#q-stem").focus();
    await page.keyboard.press("a");
    if (i < n - 1) await page.keyboard.press("ArrowRight");
  }
  await page.locator('.exam-bar [data-act="submit"]').click();
  await page.locator("#cf-yes").click();
}

async function run(engineName) {
  const engine = engines[engineName];
  const launchOpts = engineName === "chromium" && process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  const browser = await engine.launch(launchOpts);
  const newPage = async (viewport, opts = {}) => {
    const ctx = await browser.newContext({ viewport, colorScheme: opts.dark ? "dark" : "light" });
    ctx.setDefaultTimeout(8000);
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => { if (!r.url().startsWith("file:") && !r.url().startsWith("data:")) errors.push("external request: " + r.url()); });
    if (opts.clock) await page.clock.install();
    await page.goto(opts.url || URL);
    await page.waitForSelector(".home");
    page.errors = errors;
    return page;
  };
  const desktop = { width: 1366, height: 860 }, phone = { width: 390, height: 844 };
  results.push(`${engineName}:`);

  await check("source index.html loads every question set from file://", async () => {
    const p = await newPage(desktop, { url: SRC_URL });
    const n = await p.evaluate(() => window.EPSO_APP.bank.sets.length);
    assert.ok(n >= 3, "sets loaded: " + n);
    assert.deepEqual(p.errors, []);
    await p.context().close();
  });

  await check("home page: no external requests, no errors, axe clean", async () => {
    const p = await newPage(desktop);
    await axe(p, "home");
    assert.deepEqual(p.errors, []);
    await p.context().close();
  });

  await check("W1: number keys go to the open calculator, not to the answers", async () => {
    const p = await newPage(desktop);
    await p.locator('[data-act="practice"][data-k="numerical"]').click();
    await p.locator('[data-act="tool-calc"]').click();
    await p.locator('.calc-keys [data-k="4"]').click();
    await p.keyboard.press("2");
    await p.keyboard.press("*");
    await p.keyboard.press("2");
    await p.keyboard.press("Enter");
    assert.equal(await p.locator("#calc-expr").textContent(), "84");
    assert.equal(await p.locator('[role="radio"][aria-checked="true"]').count(), 0, "no option may be selected");
    await axe(p, "numerical practice with calculator");
    await p.context().close();
  });

  await check("W2: the exam deadline holds even if timers are throttled (clock jump)", async () => {
    const p = await newPage(desktop, { clock: true });
    await p.selectOption("#exam-scope", "abstract");
    await p.locator('[data-act="exam"]').click();
    await p.locator('[data-act="begin"]').click();
    await p.clock.fastForward("11:00");
    await p.waitForSelector(".results", { timeout: 5000 });
    await p.context().close();
  });

  await check("W3: an exam survives a reload and can be resumed with answers and clock", async () => {
    const p = await newPage(desktop);
    await p.selectOption("#exam-scope", "verbal");
    await p.locator('[data-act="exam"]').click();
    await p.locator('[data-act="begin"]').click();
    await p.locator('[data-act="choose"]').nth(1).click();
    await p.locator('[data-act="next"]').click();
    p.on("dialog", (d) => d.accept());
    await p.reload();
    await p.waitForSelector(".resume");
    await p.locator('[data-act="resume"]').click();
    await p.waitForSelector(".exam-bar");
    assert.match(await p.locator(".qnum").textContent(), /Question 2 of 20/);
    await p.locator('.qdot[data-i="0"]').click();
    assert.equal(await p.locator('[role="radio"]').nth(1).getAttribute("aria-checked"), "true");
    assert.match(await p.locator("#timer").textContent(), /^3[45]:\d\d left$/);
    await p.context().close();
  });

  await check("W4/W7: focus stays on the clicked option; Enter on a focused button activates that button", async () => {
    const p = await newPage(desktop);
    await p.locator('[data-act="practice"][data-k="verbal"]').click();
    await p.locator('[data-act="choose"]').first().click();
    assert.equal(await p.evaluate(() => document.activeElement.getAttribute("data-act")), "choose");
    await p.locator('[data-act="next"]').focus();
    await p.keyboard.press("Enter");
    assert.match(await p.locator(".qnum").textContent(), /Question 2 of/);
    assert.equal(await p.evaluate(() => window.EPSO_APP.state.session.sections[0].checked[window.EPSO_APP.state.session.sections[0].items[0].q.id] || false), false, "question 1 must not have been checked");
    await p.context().close();
  });

  await check("W5: in practice, an unchecked correct answer does not count", async () => {
    const p = await newPage(desktop);
    await p.selectOption("#opt-count", "5");
    await p.locator('[data-act="practice"][data-k="verbal"]').click();
    const k = await answerKey(p);
    await p.locator('[data-act="choose"]').nth(k.pos).click();
    await p.locator('.exam-bar [data-act="end"]').click();
    await p.locator("#cf-yes").click();
    await p.waitForSelector(".results");
    assert.match(await p.locator(".score-big").first().textContent(), /^0\/5/);
    await p.context().close();
  });

  await check("W6: a highlight across two paragraphs stays valid and survives navigation", async () => {
    const p = await newPage(desktop);
    await p.locator('[data-act="coach"][data-k="verbal"]').click();
    await p.locator('[data-act="begin-coach"]').click();
    await p.locator('[data-act="tool-hl"]').click();
    await p.evaluate(() => {
      const ps = document.querySelectorAll("#passage p");
      const r = document.createRange();
      r.setStart(ps[0].firstChild, 10);
      r.setEnd(ps[1].firstChild, 20);
      const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      document.getElementById("passage").dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    });
    assert.equal(await p.locator("#passage mark p, #passage mark mark").count(), 0, "no block or nested elements inside a highlight");
    assert.equal(await p.locator("#passage mark").count(), 2);
    await p.locator('[data-act="next"]').click();
    await p.locator('[data-act="prev"]').click();
    assert.equal(await p.locator("#passage mark").count(), 2);
    await p.context().close();
  });

  await check("E4: exam mode never shows topic or difficulty labels", async () => {
    const p = await newPage(desktop);
    await p.locator('[data-act="exam"]').click();
    await p.locator('[data-act="begin"]').click();
    assert.equal(await p.locator(".qhead .muted").count(), 0);
    await axe(p, "exam view");
    await p.context().close();
  });

  for (const [label, vp] of [["desktop", desktop], ["phone", phone]]) {
    await check(`full simulation (all three tests) completes at ${label} width; results and review are axe clean`, async () => {
      const p = await newPage(vp, { dark: label === "phone" });
      await p.locator('[data-act="exam"]').click();
      await p.locator('[data-act="begin"]').click();
      await finishCurrentSectionByKeyboard(p);
      await p.locator('[data-act="next-section"]').click();
      await finishCurrentSectionByKeyboard(p);
      await p.locator('[data-act="next-section"]').click();
      await finishCurrentSectionByKeyboard(p);
      await p.waitForSelector(".results");
      assert.ok(await p.locator(".rank-box").count(), "verbal ranking message shown");
      assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, "no horizontal scroll");
      await axe(p, "results");
      await p.locator('[data-act="review"]').first().click();
      await axe(p, "review");
      assert.deepEqual(p.errors, []);
      await p.context().close();
    });
  }

  for (const scope of ["verbal", "numerical", "abstract"]) {
    await check(`single-test simulation: ${scope}`, async () => {
      const p = await newPage(desktop);
      await p.selectOption("#exam-scope", scope);
      await p.locator('[data-act="exam"]').click();
      await p.locator('[data-act="begin"]').click();
      await finishCurrentSectionByKeyboard(p);
      await p.waitForSelector(".results");
      await p.context().close();
    });
  }

  await check("E7: a second simulation draws only unseen questions", async () => {
    const p = await newPage(desktop);
    await p.selectOption("#exam-scope", "abstract");
    for (let round = 0; round < 2; round++) {
      await p.locator('[data-act="exam"]').click();
      await p.locator('[data-act="begin"]').click();
      if (round === 1) {
        const repeats = await p.evaluate(() => window.EPSO_APP.state.session.sections[0].repeats);
        assert.equal(repeats, 0);
      }
      await finishCurrentSectionByKeyboard(p);
      await p.waitForSelector(".results");
      await p.locator('[data-act="home"]').click();
    }
    await p.context().close();
  });

  await browser.close();
}

for (const n of names) await run(n);
if (failures) { console.error(`\n${failures} check(s) failed.`); process.exit(1); }
console.log("\nAll end-to-end checks passed.");
