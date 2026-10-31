// End-to-end regression tests in real browsers (Playwright) plus an axe-core accessibility scan.
// Usage: node tests/e2e.mjs            (Chromium)
//        BROWSERS=chromium,webkit node tests/e2e.mjs
//        CHROMIUM_PATH=/path/to/chrome node tests/e2e.mjs   (use a preinstalled browser)
// Runs against the single-file build in dist/, so run `node scripts/build.mjs` first.
// E2E_BASE_URL=http://127.0.0.1:8000 optionally tests a local server when managed browsers block file://.
import { chromium, webkit, firefox } from "playwright";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import assert from "node:assert/strict";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseURL = (process.env.E2E_BASE_URL || "").replace(/\/$/, "");
const URL = baseURL ? baseURL + "/dist/ad5-reasoning-trainer.html" : pathToFileURL(path.join(root, "dist/ad5-reasoning-trainer.html")).href;
const SRC_URL = baseURL ? baseURL + "/index.html" : pathToFileURL(path.join(root, "index.html")).href;
const AXE = require.resolve("axe-core/axe.min.js");
const engines = { chromium, webkit, firefox };
const names = (process.env.BROWSERS || "chromium").split(",").map((s) => s.trim());

let failures = 0, currentEngine = "browser";
const results = [];
async function check(name, fn) {
  try { await fn(); results.push("  ✓ " + name); }
  catch (e) {
    if (process.env.GITHUB_ACTIONS) {
      const escape = v => String(v).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
      console.error("::error title=" + escape(currentEngine + ": " + name).replace(/,/g, "%2C") + "::" + escape(e.stack || e));
    }
    failures++; results.push("  ✗ " + name + "\n      " + String(e.message || e).split("\n").join("\n      ")); }
  console.log(results[results.length - 1]);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, "```text\n" + currentEngine + ": " + results[results.length - 1] + "\n```\n");
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

// The exam simulation is mouse-driven, as TAO is (ENV-04): answer and move by clicking.
async function finishCurrentSection(page) {
  const n = await page.locator(".qdots .qdot").count();
  for (let i = 0; i < n; i++) {
    await page.locator('[data-act="choose"]').first().click();
    if (i < n - 1) await page.locator('[data-act="next"]').click();
  }
  await page.locator('.exam-bar [data-act="submit"]').click();
  await page.locator("#cf-yes").click();
}

async function run(engineName) {
  currentEngine = engineName;
  const engine = engines[engineName];
  const launchOpts = engineName === "chromium" && process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  const browser = await engine.launch(launchOpts);
  const newPage = async (viewport, opts = {}) => {
    const ctx = await browser.newContext({ viewport, colorScheme: opts.dark ? "dark" : "light" });
    ctx.setDefaultTimeout(8000);
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => { if (!r.url().startsWith("file:") && !r.url().startsWith("data:") && !(baseURL && r.url().startsWith(baseURL + "/"))) errors.push("external request: " + r.url()); });
    if (opts.clock) await page.clock.install();
    await page.goto(opts.url || URL);
    await page.waitForSelector(".home");
    page.errors = errors;
    return page;
  };
  const desktop = { width: 1366, height: 860 }, phone = { width: 390, height: 844 };
  results.push(`${engineName}:`);

  await check("source index.html loads every question set from " + (baseURL || "file://"), async () => {
    const p = await newPage(desktop, { url: SRC_URL });
    const n = await p.evaluate(() => window.EPSO_APP.bank.sets.length);
    assert.ok(n >= 3, "sets loaded: " + n);
    // Cache busting: every file carries the current version code, and version.js itself a fresh URL.
    const urls = await p.evaluate(() => ({ v: window.EPSO_VERSION, files: [...document.scripts].map((x) => x.src).filter(Boolean).concat([...document.querySelectorAll('link[rel="stylesheet"]')].map((x) => x.href)) }));
    assert.match(urls.v, /^[0-9a-f]{12}$/);
    const stale = urls.files.filter((u) => !/version\.js\?t=\d+$/.test(u) && !u.endsWith("?v=" + urls.v));
    assert.deepEqual(stale, [], "files loaded without the version code");
    assert.deepEqual(p.errors, []);
    await p.context().close();
  });

  await check("home page: no external requests, no errors, axe clean", async () => {
    const p = await newPage(desktop);
    await axe(p, "home");
    assert.deepEqual(p.errors, []);
    await p.context().close();
  });

  await check("numerical difficulty filters persist, combine with sets, and leave other sections available", async () => {
    const p = await newPage(desktop);
    await p.selectOption('#opt-numerical-level', '1');
    await p.selectOption('#opt-count', 'all');
    await p.reload(); await p.waitForSelector('.home');
    assert.equal(await p.inputValue('#opt-numerical-level'), '1');
    await p.locator('[data-act="practice"][data-k="numerical"]').click();
    const easy = await p.evaluate(() => window.EPSO_APP.state.session.sections[0].items.map(it => it.q.difficulty));
    assert.equal(easy.length, 56); assert.ok(easy.every(d => d === 1));
    await p.goto(URL); await p.waitForSelector('.home');
    await p.selectOption('#opt-set', 'numerical-05');
    await p.locator('[data-act="practice"][data-k="numerical"]').click();
    assert.match(await p.locator('#toast').textContent(), /No numerical reasoning questions match/);
    await p.selectOption('#opt-numerical-level', '3');
    await p.locator('[data-act="coach"][data-k="numerical"]').click();
    const hard = await p.evaluate(() => window.EPSO_APP.state.session.sections[0].items.map(it => it.q));
    assert.equal(hard.length, 10); assert.ok(hard.every(q => q.difficulty === 3 && q.setId === 'numerical-05'));
    await p.goto(URL); await p.waitForSelector('.home');
    await p.selectOption('#opt-set', 'all');
    for (const section of ['verbal', 'abstract']) {
      await p.locator('[data-act="practice"][data-k="' + section + '"]').click();
      const n = await p.evaluate(() => window.EPSO_APP.state.session.sections[0].items.length);
      assert.equal(n, section === 'verbal' ? 300 : 220);
      await p.goto(URL); await p.waitForSelector('.home');
    }
    assert.deepEqual(p.errors, []);
    await p.context().close();
  });

  for (const [label, vp, dark] of [['desktop', desktop, false], ['phone dark', phone, true]]) {
    await check(`all four numerical challenge sets render every item and solution at ${label} width`, async () => {
      const p = await newPage(vp, { dark });
      for (const id of ['05', '06', '07', '08']) {
        await p.selectOption('#opt-set', 'numerical-' + id);
        await p.selectOption('#opt-count', '10');
        await p.selectOption('#opt-numerical-level', '3');
        await p.check('#opt-timed');
        await p.locator('[data-act="practice"][data-k="numerical"]').click();
        assert.equal(await p.evaluate(() => window.EPSO_APP.state.session.sections[0].limitMs), 20 * 60 * 1000);
        for (let i = 0; i < 10; i++) {
          assert.equal(await p.locator('.exhibit-table').count(), 2);
          assert.equal(await p.locator('[role="radio"]').count(), 5);
          assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'no page overflow');
          const key = await answerKey(p);
          await p.locator('[data-act="choose"]').nth(key.pos).click();
          await p.locator('[data-act="check"]').click();
          assert.ok(await p.locator('#feedback').isVisible());
          if (i === 0 && id === '05') await axe(p, label + ' challenge solution');
          if (i < 9) await p.locator('[data-act="next"]').click();
        }
        await p.goto(URL); await p.waitForSelector('.home');
      }
      assert.deepEqual(p.errors, []);
      await p.context().close();
    });
  }

  await check("verbal difficulty persists and all four challenge rounds render with correct timing", async () => {
    const p = await newPage(phone, { dark: true });
    await p.selectOption('#opt-verbal-level', '1');
    await p.selectOption('#opt-count', 'all');
    await p.reload(); await p.waitForSelector('.home');
    assert.equal(await p.inputValue('#opt-verbal-level'), '1');
    await p.locator('[data-act="practice"][data-k="verbal"]').click();
    const easy = await p.evaluate(() => window.EPSO_APP.state.session.sections[0].items.map(it => it.q.difficulty));
    assert.equal(easy.length, 38); assert.ok(easy.every(d => d === 1));
    await p.goto(URL); await p.waitForSelector('.home');
    for (const id of ['10', '11', '12', '13']) {
      await p.selectOption('#opt-set', 'verbal-' + id);
      await p.selectOption('#opt-verbal-level', '3');
      await p.selectOption('#opt-count', '10');
      await p.check('#opt-timed');
      await p.locator('[data-act="practice"][data-k="verbal"]').click();
      const round = await p.evaluate(() => {
        const s = window.EPSO_APP.state.session.sections[0];
        return { n: s.items.length, limit: s.limitMs, hard: s.items.every(it => it.q.difficulty === 3) };
      });
      assert.deepEqual(round, { n: 10, limit: 1050000, hard: true });
      for (let i = 0; i < 10; i++) {
        assert.equal(await p.locator('[role="radio"]').count(), 4);
        assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        const key = await answerKey(p);
        await p.locator('[data-act="choose"]').nth(key.pos).click();
        await p.locator('[data-act="check"]').click();
        assert.ok(await p.locator('#feedback').isVisible());
        if (i === 0 && id === '10') await axe(p, 'verbal challenge phone dark');
        if (i < 9) await p.locator('[data-act="next"]').click();
      }
      await p.goto(URL); await p.waitForSelector('.home');
    }
    assert.deepEqual(p.errors, []);
    await p.context().close();
  });

  for (const [label, vp, dark] of [['desktop', desktop, false], ['phone dark', phone, true]]) {
    await check(`abstract difficulty and all four challenge rounds work at ${label} width`, async () => {
      const p = await newPage(vp, { dark });
      await p.selectOption('#opt-abstract-level', '1');
      await p.selectOption('#opt-count', 'all');
      await p.reload(); await p.waitForSelector('.home');
      assert.equal(await p.inputValue('#opt-abstract-level'), '1');
      await p.locator('[data-act="practice"][data-k="abstract"]').click();
      const easy = await p.evaluate(() => window.EPSO_APP.state.session.sections[0].items.map(it => it.q.difficulty));
      assert.ok(easy.length > 0); assert.ok(easy.every(d => d === 1));
      await p.goto(URL); await p.waitForSelector('.home');
      await p.selectOption('#opt-set', 'abstract-05');
      await p.locator('[data-act="practice"][data-k="abstract"]').click();
      assert.match(await p.locator('#toast').textContent(), /No abstract reasoning questions match/);
      for (const id of ['05', '06', '07', '08']) {
        await p.selectOption('#opt-set', 'abstract-' + id);
        await p.selectOption('#opt-abstract-level', '3');
        await p.selectOption('#opt-count', '10');
        await p.check('#opt-timed');
        await p.locator('[data-act="practice"][data-k="abstract"]').click();
        const round = await p.evaluate(() => {
          const s = window.EPSO_APP.state.session.sections[0];
          return { n: s.items.length, limit: s.limitMs, hard: s.items.every(it => it.q.difficulty === 3 && it.q.challenge) };
        });
        assert.deepEqual(round, { n: 10, limit: 600000, hard: true });
        for (let i = 0; i < 10; i++) {
          assert.equal(await p.locator('.series .fig').count(), 6);
          assert.equal(await p.locator('[role="radio"]').count(), 5);
          assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'no horizontal page overflow');
          const key = await answerKey(p);
          await p.locator('[data-act="choose"]').nth(key.pos).click();
          await p.locator('[data-act="check"]').click();
          assert.ok(await p.locator('#feedback').isVisible());
          if (i === 0 && id === '05') await axe(p, label + ' abstract challenge feedback');
          if (i < 9) await p.locator('[data-act="next"]').click();
        }
        await p.goto(URL); await p.waitForSelector('.home');
      }
      assert.deepEqual(p.errors, []);
      await p.context().close();
    });
  }

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
    assert.match(await p.locator("#timer").textContent(), /^3[45]min \d\ds$/, "TAO clock format");
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
    assert.match(await p.locator(".score-big").first().textContent(), /^0\/0/);
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
      await finishCurrentSection(p);
      await p.locator('[data-act="next-section"]').click();
      await finishCurrentSection(p);
      await p.locator('[data-act="next-section"]').click();
      await finishCurrentSection(p);
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
      await finishCurrentSection(p);
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
      await finishCurrentSection(p);
      await p.waitForSelector(".results");
      await p.locator('[data-act="home"]').click();
    }
    await p.context().close();
  });

  await check("guidance: labelled controls and info tips work by hover, keyboard and tap; axe clean", async () => {
    const p = await newPage(desktop);
    assert.equal(await p.locator('label[for="exam-scope"]').textContent(), "Choose test type");
    assert.ok(await p.locator(".howto li").count() === 3, "three-step how-to");
    const tip = p.locator("#tip-scope");
    assert.equal(await tip.isVisible(), false);
    await p.locator('[data-act="tip"][data-k="scope"]').hover();
    assert.equal(await tip.isVisible(), true, "hover shows the tip");
    await p.mouse.move(5, 5);
    await p.locator('[data-act="tip"][data-k="timed"]').focus();
    await p.keyboard.press("Tab"); await p.keyboard.press("Shift+Tab");
    assert.equal(await p.locator("#tip-timed").isVisible(), true, "keyboard focus shows the tip");
    await p.locator('[data-act="tip"][data-k="timed"]').click();
    assert.equal(await p.locator('[data-k="timed"]').getAttribute("aria-expanded"), "true");
    await axe(p, "home with a tip open");
    // Close the pinned tip before checking hover: its panel can cover adjacent buttons.
    await p.mouse.move(5, 5);
    await p.keyboard.press("Escape");
    assert.equal(await p.locator('[data-k="timed"]').getAttribute("aria-expanded"), "false", "Escape closes the pinned tip");
    await p.locator("#opt-count").focus(); // End the preceding keyboard-focus tooltip check.
    // Every tip must be visible when its button is hovered, not clipped by its container.
    for (const id of await p.$$eval('[data-act="tip"]', (els) => els.map((e) => e.getAttribute("data-k")))) {
      await p.mouse.move(5, 5);
      await p.locator(`[data-act="tip"][data-k="${id}"]`).hover();
      const onTop = await p.evaluate((id) => {
        const t = document.getElementById("tip-" + id), r = t.getBoundingClientRect();
        if (!r.width) return "hidden";
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + Math.min(10, r.height / 2));
        return t.contains(hit) ? "ok" : "covered or clipped";
      }, id);
      assert.equal(onTop, "ok", `tip "${id}" on hover`);
    }
    await p.mouse.move(5, 5);
    await p.keyboard.press("Escape");
    assert.equal(await p.locator('[data-k="timed"]').getAttribute("aria-expanded"), "false", "Escape closes");
    assert.equal(await p.locator("#opt-timed").isChecked(), false, "the info button does not toggle the checkbox");
    await p.context().close();
    const m = await newPage(phone);
    await m.locator('[data-act="tip"][data-k="scope"]').click();
    const box = await m.locator("#tip-scope").boundingBox();
    assert.ok(box && box.x >= 0 && box.x + box.width <= phone.width, "tip fits on a phone screen");
    await m.locator("h1").click();
    assert.equal(await m.locator("#tip-scope").isVisible(), false, "tapping elsewhere closes");
    assert.equal(await m.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, "no horizontal scroll");
    await m.context().close();
  });

  await check("N3: abstract practice shows no rule names before the answer is checked", async () => {
    const p = await newPage(desktop);
    await p.locator('[data-act="practice"][data-k="abstract"]').click();
    assert.equal(await p.locator("#q-topic").count(), 0, "topic labels are off by default");
    await p.locator('[data-act="home"]').first().click().catch(() => {});
    await p.goto(URL); await p.waitForSelector(".home");
    await p.locator("#opt-topics").check();
    await p.locator('[data-act="practice"][data-k="abstract"]').click();
    assert.equal(await p.locator("#q-topic").textContent(), "Figure series");
    const k = await answerKey(p);
    await p.locator('[data-act="choose"]').nth(k.pos).click();
    await p.locator('[data-act="check"]').click();
    assert.notEqual(await p.locator("#q-topic").textContent(), "Figure series", "the real topic appears after checking");
    await p.context().close();
  });

  await check("N4: options follow the radio-group keyboard pattern (practice; the exam has no shortcuts)", async () => {
    const p = await newPage(desktop);
    await p.locator('[data-act="practice"][data-k="verbal"]').click();
    assert.equal(await p.locator('.opts [tabindex="0"]').count(), 1, "one tab stop in the option group");
    await p.locator("#opt-0").focus();
    await p.keyboard.press("ArrowDown");
    assert.equal(await p.evaluate(() => document.activeElement.id), "opt-1");
    assert.equal(await p.locator("#opt-1").getAttribute("aria-checked"), "true");
    assert.match(await p.locator(".qnum").textContent(), /Question 1 of/, "the question did not change");
    await p.keyboard.press("ArrowUp");
    await p.keyboard.press("ArrowUp");
    assert.equal(await p.evaluate(() => document.activeElement.id), "opt-3", "wraps around");
    await p.keyboard.press("x");
    assert.equal(await p.locator(".opts li").nth(3).evaluate((li) => li.classList.contains("struck")), true, "X strikes out the focused option");
    await p.locator("#q-stem").focus();
    await p.keyboard.press("ArrowRight");
    assert.match(await p.locator(".qnum").textContent(), /Question 2 of/, "outside the group, arrows change question");
    await p.context().close();
  });

  await check("overview opens beside the question (question stays in view) and Escape closes it", async () => {
    const p = await newPage(desktop);
    await p.locator('[data-act="exam"]').click();
    await p.locator('[data-act="begin"]').click();
    const before = (await p.locator("#q-stem").boundingBox()).y;
    await p.locator('[data-act="overview"]').click();
    assert.ok(await p.locator("#test-overview").isVisible(), "overview shown");
    const after = (await p.locator("#q-stem").boundingBox()).y;
    assert.ok(Math.abs(after - before) < 5, `question moved from ${before} to ${after}`);
    await p.keyboard.press("Escape");
    assert.equal(await p.locator("#test-overview").isVisible(), false, "Escape closes the overview");
    await p.context().close();
  });

  await check("full-test library explains why it is unavailable for a single test", async () => {
    const p = await newPage(desktop);
    await p.selectOption("#exam-scope", "verbal");
    assert.equal(await p.locator("#exam-form").isDisabled(), true);
    assert.match(await p.locator("#exam-form-note").textContent(), /only be chosen with All three tests/);
    await p.selectOption("#exam-scope", "full");
    assert.equal(await p.locator("#exam-form").isDisabled(), false);
    assert.match(await p.locator("#exam-form-note").textContent(), /15 complete tests/);
    await p.context().close();
  });

  await check("calculator opened from the toolbar: typing then Enter evaluates (and keeps it open)", async () => {
    const p = await newPage(desktop);
    await p.locator('[data-act="practice"][data-k="numerical"]').click();
    await p.locator('[data-act="tool-calc"]').click();
    for (const k of "2+3") await p.keyboard.press(k);
    await p.keyboard.press("Enter");
    assert.equal(await p.locator(".tool-panel.calc").count(), 1, "calculator still open");
    assert.match(await p.locator("#calc-out").textContent(), /= 5/);
    await p.context().close();
  });

  await check("N5: with the calculator open, Enter on a focused button activates that button", async () => {
    const p = await newPage(desktop);
    await p.locator('[data-act="practice"][data-k="numerical"]').click();
    await p.locator('[data-act="tool-calc"]').click();
    await p.locator('.calc-keys [data-k="7"]').click();
    await p.keyboard.press("Enter");
    assert.equal(await p.locator("#calc-out").textContent(), "= 7", "Enter inside the calculator evaluates");
    await p.locator('[data-act="choose"]').first().click();
    await p.locator('[data-act="check"]').focus();
    await p.keyboard.press("Enter");
    await p.waitForSelector("#feedback");
    await p.context().close();
  });

  await check("N6: discarding an exam still records its displayed questions as seen", async () => {
    const p = await newPage(desktop);
    const freshAbstract = () => p.evaluate(() => window.EPSO_CORE.freshSimulationsLeft(window.EPSO_APP.bank.bySection, JSON.parse(localStorage.getItem("ad5trainer.qstats.v1") || "{}"), ["abstract"]));
    const fresh0 = await freshAbstract();
    await p.selectOption("#exam-scope", "abstract");
    await p.locator('[data-act="exam"]').click();
    await p.locator('[data-act="begin"]').click();
    const ids = await p.evaluate(() => window.EPSO_APP.state.session.sections[0].items.map((it) => it.q.id));
    for (let i = 1; i < ids.length; i++) await p.locator('[data-act="next"]').click();
    p.on("dialog", (d) => d.accept());
    await p.reload();
    await p.waitForSelector(".resume");
    await p.locator('[data-act="discard"]').click();
    const shown = await p.evaluate((ids) => { const st = JSON.parse(localStorage.getItem("ad5trainer.qstats.v1") || "{}"); return ids.filter((id) => st[id] && st[id].shown).length; }, ids);
    assert.equal(shown, ids.length);
    assert.equal(await freshAbstract(), fresh0 - 1, "fresh abstract simulations drop by one");
    await p.locator('[data-act="exam"]').click();
    const next = await p.evaluate(() => window.EPSO_APP.state.session.sections[0].items.map((it) => it.q.id));
    assert.equal(next.filter((id) => ids.includes(id)).length, 0, "the next draw excludes them");
    await p.context().close();
  });

  await check("N7/N9: chart values are available as a table; on phones the table replaces the chart", async () => {
    const ex = { type: "bar", title: "Test chart", unit: "EUR m", categories: ["2021", "2022", "2023"], series: [{ name: "North", values: [12, 15, 18] }, { name: "South", values: [9, 11, 14] }] };
    for (const [vp, chartShown] of [[desktop, true], [{ width: 360, height: 760 }, false]]) {
      const p = await newPage(vp);
      const r = await p.evaluate((ex) => {
        const box = document.createElement("div"); box.innerHTML = window.EPSO_RENDER.exhibitHTML(ex); document.body.appendChild(box);
        const vis = (sel) => { const el = box.querySelector(sel); return !!el && getComputedStyle(el).display !== "none"; };
        return { table: box.querySelector("details table") !== null, values: box.querySelector("details table").textContent, chart: vis(".chart"), small: vis(".chart-table-sm") };
      }, ex);
      assert.ok(r.table && /18/.test(r.values) && /South/.test(r.values));
      assert.equal(r.chart, chartShown);
      assert.equal(r.small, !chartShown);
      await p.context().close();
    }
  });

  await check("N13: a second tab writing the same session triggers a warning", async () => {
    const ctx = await browser.newContext({ viewport: desktop });
    const a = await ctx.newPage(), b = await ctx.newPage();
    for (const p of [a, b]) { await p.goto(URL); await p.waitForSelector(".home"); }
    await a.locator('[data-act="exam"]').click();
    await a.locator('[data-act="begin"]').click();
    await b.locator('[data-act="exam"]').click();
    await a.waitForSelector("#toast", { timeout: 4000 });
    assert.match(await a.locator("#toast").textContent(), /another tab/);
    await ctx.close();
  });

  await check("ENV-01: the calculator is a window: dragging its header moves it, the data stays in view, ▲ recalls operations", async () => {
    const p = await newPage({ width: 1366, height: 768 });
    await p.selectOption("#exam-scope", "numerical");
    await p.locator('[data-act="exam"]').click();
    await p.locator('[data-act="begin"]').click();
    await p.locator('[data-act="tool-calc"]').click();
    const win = p.locator("#win-calc");
    assert.equal(await win.evaluate((el) => getComputedStyle(el).position), "fixed");
    const before = await win.boundingBox();
    const head = await p.locator("#win-calc .win-head h2").boundingBox();
    await p.mouse.move(head.x + 4, head.y + 4); await p.mouse.down(); await p.mouse.move(head.x - 300, head.y + 200, { steps: 6 }); await p.mouse.up();
    const after = await win.boundingBox();
    assert.ok(Math.abs(after.x - (before.x - 304)) < 3 && Math.abs(after.y - (before.y + 196)) < 3, `moved from ${before.x},${before.y} to ${after.x},${after.y}`);
    assert.ok(await p.locator(".exhibit").first().evaluate((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.top < innerHeight; }), "the data exhibit stays in view");
    await p.locator('[data-act="next"]').click();
    const kept = await win.boundingBox();
    assert.ok(Math.abs(kept.x - after.x) < 2 && Math.abs(kept.y - after.y) < 2, "position kept on the next question");
    await p.keyboard.type("2+3"); await p.keyboard.press("Enter"); await p.keyboard.type("*2"); await p.keyboard.press("Enter");
    await p.keyboard.press("ArrowUp");
    assert.equal(await p.locator("#calc-expr").textContent(), "5×2");
    await p.keyboard.press("ArrowUp");
    assert.equal(await p.locator("#calc-out").textContent(), "= 5", "▲ reviews previous operations");
    assert.equal(await p.locator('.calc-keys [data-k="√"]').count(), 0, "extra keys are off by default");
    await axe(p, "numerical exam with the calculator window");
    await p.context().close();
  });

  await check("ENV-02: the scratchpad draws, keeps its items across questions and a reload, erases and undoes", async () => {
    const p = await newPage(desktop);
    await p.selectOption("#exam-scope", "abstract");
    await p.locator('[data-act="exam"]').click();
    await p.locator('[data-act="begin"]').click();
    await p.locator('[data-act="tool-scratch"]').click();
    assert.equal(await p.evaluate(() => document.activeElement.id), "pad-text-input", "the text tool is ready to type");
    await p.keyboard.type("3 dots"); await p.keyboard.press("Enter"); await p.keyboard.type("turns 90");
    await p.locator('[data-act="pad-tool"][data-k="brush"]').click();
    const area = await p.locator("#pad-area").boundingBox();
    await p.mouse.move(area.x + 60, area.y + 90); await p.mouse.down(); await p.mouse.move(area.x + 160, area.y + 140, { steps: 5 }); await p.mouse.up();
    await p.locator('[data-act="pad-tool"][data-k="ellipse"]').click();
    await p.mouse.move(area.x + 200, area.y + 60); await p.mouse.down(); await p.mouse.move(area.x + 260, area.y + 110, { steps: 3 }); await p.mouse.up();
    const types = () => p.evaluate(() => window.EPSO_APP.state.session.sections[0].scratch.items.map((i) => i.t));
    assert.deepEqual(await types(), ["text", "path", "ellipse"]);
    assert.equal(await p.locator("#pad-svg text").textContent(), "3 dotsturns 90");
    await p.locator('[data-act="next"]').click();
    assert.equal(await p.locator("#pad-svg > *").count(), 3, "items are kept on the next question");
    p.on("dialog", (d) => d.accept());
    await p.reload();
    await p.waitForSelector(".resume");
    await p.locator('[data-act="resume"]').click();
    await p.waitForSelector(".exam-bar");
    assert.deepEqual(await types(), ["text", "path", "ellipse"], "items survive a reload");
    await p.locator('[data-act="tool-scratch"]').click();
    await p.locator('[data-act="pad-tool"][data-k="erase"]').click();
    const area2 = await p.locator("#pad-area").boundingBox();
    await p.mouse.click(area2.x + 230, area2.y + 85);
    assert.deepEqual(await types(), ["text", "path"], "erase removes the clicked item");
    await p.locator('[data-act="pad-undo"]').click();
    assert.deepEqual(await types(), ["text", "path", "ellipse"], "undo restores it");
    await axe(p, "abstract exam with the scratchpad window");
    await p.context().close();
  });

  await check("ENV-04/06/07/09: mouse-driven exam, Settings gate elimination and masking, TAO clock and submit dialog", async () => {
    const p = await newPage(desktop);
    await p.selectOption("#exam-scope", "numerical");
    await p.locator('[data-act="exam"]').click();
    await p.locator('[data-act="begin"]').click();
    await p.locator("#q-stem").focus();
    for (const k of ["3", "a", "ArrowRight", "f"]) await p.keyboard.press(k);
    assert.equal(await p.locator('[role="radio"][aria-checked="true"]').count(), 0, "letters and digits do not answer");
    assert.match(await p.locator(".qnum").textContent(), /Question 1 of/, "arrows do not change question");
    assert.equal(await p.locator('[data-act="flag"][aria-pressed="true"]').count(), 0, "F does not bookmark");
    assert.equal(await p.locator(".strike").count(), 0, "answer elimination is off until enabled in Settings");
    await p.locator('[data-act="settings"]').click();
    await p.locator("#set-elim").check();
    await p.locator("#set-mask").check();
    assert.equal(await p.locator(".strike").count(), 5);
    assert.equal(await p.locator(".mask").count(), 5);
    await p.locator(".mask").nth(1).click();
    assert.equal(await p.locator(".opt.masked").count(), 1);
    await p.locator("#opt-1").evaluate((el) => el.click()); // Playwright itself refuses aria-disabled targets
    assert.equal(await p.locator("#opt-1").getAttribute("aria-checked"), "false", "a masked option cannot be chosen");
    assert.match(await p.locator("#timer").textContent(), /^\d+min \d\ds$/, "TAO clock format");
    assert.equal(await p.locator("#timer").evaluate((el) => el.className), "timer", "no colour warning in the exam");
    await p.locator('.exam-bar [data-act="submit"]').click();
    assert.match(await p.locator("#cf-text").textContent(), /incomplete question/);
    assert.equal(await p.locator('[data-act="cf-no"]').textContent(), "Keep answering");
    assert.equal(await p.locator("#cf-yes").textContent(), "Submit the test");
    await p.context().close();
  });

  await check("ENV-05: instruction pages count down and start the part by themselves; no answered count between parts", async () => {
    const p = await newPage(desktop, { clock: true });
    await p.locator('[data-act="exam"]').click();
    await p.waitForSelector("#instr-timer");
    await p.clock.fastForward("01:01");
    await p.waitForSelector(".exam-bar");
    assert.match(await p.locator("#main-heading").textContent(), /Verbal/);
    await p.locator('.exam-bar [data-act="submit"]').click();
    await p.locator("#cf-yes").click();
    await p.waitForSelector("#instr-timer");
    assert.doesNotMatch(await p.locator(".card").textContent(), /You answered/);
    await p.clock.fastForward("01:01");
    await p.waitForSelector(".exam-bar");
    assert.match(await p.locator("#main-heading").textContent(), /Numerical/);
    await p.context().close();
  });

  await check("ENV-06/10: line reader, highlighter colours and eraser, accessibility text settings and high contrast", async () => {
    const p = await newPage(desktop);
    await p.selectOption("#exam-scope", "verbal");
    await p.locator('[data-act="exam"]').click();
    await p.locator('[data-act="begin"]').click();
    await p.locator('[data-act="tool-reader"]').click();
    const reader = p.locator("#line-reader");
    const top0 = parseFloat(await reader.evaluate((el) => el.style.top));
    const h = await p.locator(".lr-move").boundingBox();
    await p.mouse.move(h.x + 8, h.y + 8); await p.mouse.down(); await p.mouse.move(h.x + 8, h.y + 108, { steps: 4 }); await p.mouse.up();
    assert.ok(Math.abs(parseFloat(await reader.evaluate((el) => el.style.top)) - (top0 + 100)) < 3, "the strip moved down 100 px");
    await p.locator(".lr-size").focus();
    await p.keyboard.press("ArrowDown");
    assert.equal(await reader.evaluate((el) => el.style.height), "130px", "arrow keys resize the strip");
    await p.locator('[data-act="tool-hl"]').click();
    await p.locator('[data-act="hl-color"][data-k="2"]').click();
    await p.evaluate(() => {
      const ps = document.querySelectorAll("#passage p");
      const r = document.createRange(); r.setStart(ps[0].firstChild, 5); r.setEnd(ps[0].firstChild, 25);
      const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      document.getElementById("passage").dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    });
    assert.equal(await p.locator("#passage mark.mark-2").count(), 1, "the chosen colour is used");
    await p.locator('[data-act="hl-erase"]').click();
    await p.locator("#passage mark").click();
    assert.equal(await p.locator("#passage mark").count(), 0, "the eraser removes a highlight");
    await p.locator('[data-act="a11y-toggle"]').click();
    await p.locator('[data-act="a11y"][data-k="font"][data-d="1"]').click();
    await p.locator('input[name="a11y-theme"][value="contrast"]').check();
    assert.equal(await p.evaluate(() => document.documentElement.getAttribute("data-theme")), "contrast");
    assert.equal(await p.evaluate(() => document.documentElement.style.getPropertyValue("--a11y-font")), "1.1");
    await p.locator('[data-act="zoom"][data-d="1"]').click();
    assert.equal(await p.locator(".zoom-level").textContent(), "110%");
    await axe(p, "verbal exam in high contrast with the tools open");
    await p.locator('[data-act="a11y-reset"]').click();
    assert.equal(await p.evaluate(() => document.documentElement.getAttribute("data-theme")), null);
    await p.context().close();
  });

  await browser.close();
}

for (const n of names) await run(n);
if (failures) { console.error(`\n${failures} check(s) failed.`); process.exit(1); }
console.log("\nAll end-to-end checks passed.");
