/*
 * AD5 Reasoning Trainer: single-page app, no build step, no dependencies.
 * Views: home → (brief | lesson) → session → (between) → results → review.
 * Pure logic lives in core.js (unit-tested); this file owns state, rendering and events.
 */
(function () {
  "use strict";

  var R = window.EPSO_RENDER;
  var C = window.EPSO_CORE;
  var esc = R.esc;
  var LETTERS = ["A", "B", "C", "D", "E", "F"];
  var SECTIONS = C.SECTIONS;
  var ORDER = C.ORDER;
  var EPSO_ASSESSMENT_URL = "https://selection.eu-careers.europa.eu/en/ad5-graduates-selection-process-how-you-are-assessed";

  /* ---------- storage (best effort) ---------- */
  var KEY_HIST = "ad5trainer.history.v1";
  var KEY_STATS = "ad5trainer.qstats.v1";
  var KEY_PREFS = "ad5trainer.prefs.v1";
  var KEY_SESSION = "ad5trainer.session.v1";
  var storageMemory = {}, storageUnavailable = false, storageRecovered = false;
  function remove(k) {
    storageMemory[k] = null;
    try { window.localStorage.removeItem(k); } catch (e) { storageUnavailable = true; syncStorageWarning(); }
  }
  function save(k, v) {
    storageMemory[k] = v;
    try { window.localStorage.setItem(k, JSON.stringify(v)); delete storageMemory[k]; }
    catch (e) { storageUnavailable = true; syncStorageWarning(); }
  }
  function syncStorageWarning() {
    if (!root || !storageUnavailable || document.getElementById("storage-warning")) return;
    var box = document.createElement("div"); box.id = "storage-warning"; box.className = "alert"; box.setAttribute("role", "status");
    box.textContent = "Saving is unavailable. Your progress is kept only in this tab and will be lost when you reload or close it.";
    (document.getElementById("view-content") || root).insertBefore(box, (document.getElementById("view-content") || root).firstChild);
  }
  function load(k, d) {
    var v;
    if (Object.prototype.hasOwnProperty.call(storageMemory, k)) v = storageMemory[k];
    else {
      try { var raw = window.localStorage.getItem(k); if (raw === null) return d; v = JSON.parse(raw); }
      catch (e) {
        if (e instanceof SyntaxError) { storageRecovered = true; remove(k); }
        else storageUnavailable = true;
        return d;
      }
    }
    if (v === null && k === KEY_SESSION) return d;
    var kind = k === KEY_PREFS ? "prefs" : k === KEY_HIST ? "history" : k === KEY_STATS ? "stats" : null;
    if (kind) {
      var clean = C.cleanStored(kind, v);
      if (clean.changed) { storageRecovered = true; save(k, clean.value); }
      return clean.value;
    }
    return v;
  }
  try { window.localStorage.setItem("ad5trainer.storage-probe", "1"); window.localStorage.removeItem("ad5trainer.storage-probe"); }
  catch (e) { storageUnavailable = true; syncStorageWarning(); }

  /* ---------- question bank ---------- */
  var bank = { all: [], byId: {}, bySection: { verbal: [], numerical: [], abstract: [] }, sets: [], errors: [], langs: { en: true } };

  function buildBank() {
    var sets = (window.EPSO_BANK && window.EPSO_BANK.sets) || [];
    sets.forEach(function (set) {
      if (!SECTIONS[set.section]) { bank.errors.push("Set " + set.id + " has unknown section '" + set.section + "'."); return; }
      var added = 0;
      (set.questions || []).forEach(function (q) {
        if (!q || !q.id || bank.byId[q.id]) { bank.errors.push("Skipped a question in " + set.id + " (missing or duplicate id " + (q && q.id) + ")."); return; }
        if (!Array.isArray(q.options) || typeof q.answer !== "number" || q.answer < 0 || q.answer >= q.options.length) {
          bank.errors.push("Skipped " + q.id + ": options/answer invalid."); return;
        }
        q.section = set.section;
        q.setId = set.id;
        q.setTitle = set.title;
        if (q.passage && typeof q.passage === "object") Object.keys(q.passage).forEach(function (l) { bank.langs[l] = true; });
        bank.all.push(q);
        bank.byId[q.id] = q;
        bank.bySection[set.section].push(q);
        added++;
      });
      bank.sets.push({ id: set.id, title: set.title, section: set.section, description: set.description || "", count: added });
    });
  }

  /* ---------- preferences ---------- */
  var COUNTS = ["5", "10", "20", "all"];
  var prefs = load(KEY_PREFS, {});
  prefs = {
    count: COUNTS.indexOf(String(prefs.count)) > -1 ? String(prefs.count) : "10",
    timed: !!prefs.timed,
    setId: prefs.setId || "all",
    mistakesOnly: !!prefs.mistakesOnly,
    abstractLevel: ["all", "1", "2", "3"].indexOf(String(prefs.abstractLevel)) > -1 ? String(prefs.abstractLevel) : "all",
    verbalLevel: ["all", "1", "2", "3"].indexOf(String(prefs.verbalLevel)) > -1 ? String(prefs.verbalLevel) : "all",
    numericalLevel: ["all", "1", "2", "3"].indexOf(String(prefs.numericalLevel)) > -1 ? String(prefs.numericalLevel) : "all",
    examForm: /^mock-\d{2}$/.test(prefs.examForm) ? prefs.examForm : "random",
    examScope: ["full", "verbal", "numerical", "abstract"].indexOf(prefs.examScope) > -1 ? prefs.examScope : "full",
    showTopics: prefs.showTopics === true, // N3: off by default; labels can hint at the rule
    theme: ["system", "light", "dark", "contrast"].indexOf(prefs.theme) > -1 ? prefs.theme : "system",
    lang: prefs.lang || "en",
    // ENV-04: TAO has no keyboard answer shortcuts, so the simulation is mouse-driven unless asked otherwise.
    examShortcuts: prefs.examShortcuts === true,
    // ENV-03: parentheses, √ and ^ are not confirmed on the TAO calculator; off by default.
    calcExtras: prefs.calcExtras === true,
    // ENV-06: answer elimination and masking are off until enabled in Settings, as on TAO (exam mode).
    elimExam: prefs.elimExam === true, maskExam: prefs.maskExam === true,
    elimTrain: prefs.elimTrain !== false, maskTrain: prefs.maskTrain === true,
    zoom: typeof prefs.zoom === "number" ? prefs.zoom : 100,
    hlColor: typeof prefs.hlColor === "number" ? prefs.hlColor : 0,
    a11y: mergeA11y(prefs.a11y),
    win: prefs.win && typeof prefs.win === "object" ? prefs.win : {}
  };
  function mergeA11y(v) {
    var a = { font: 0, line: 0, word: 0, letter: 0, announce: false };
    if (v && typeof v === "object") Object.keys(a).forEach(function (k) { if (v[k] !== undefined) a[k] = v[k]; });
    return a;
  }
  function T(v) { return C.tr(v, prefs.lang); }
  function applyTheme() {
    var el = document.documentElement;
    if (prefs.theme === "system") el.removeAttribute("data-theme");
    else el.setAttribute("data-theme", prefs.theme);
    applyA11y();
  }
  // ENV-06: TAO's accessibility tools (text size, line height, word and letter spacing) and zoom are CSS variables.
  function applyA11y() {
    var st = document.documentElement.style, a = prefs.a11y;
    st.setProperty("--a11y-font", String(1 + a.font * 0.1));
    st.setProperty("--a11y-lhf", String(1 + a.line * 0.1));
    st.setProperty("--a11y-ws", a.word ? (a.word * 0.1).toFixed(1) + "em" : "normal");
    st.setProperty("--a11y-ls", a.letter ? (a.letter * 0.02).toFixed(2) + "em" : "normal");
    st.setProperty("--q-zoom", String(prefs.zoom / 100));
  }
  // Answer elimination / masking availability follows the Settings menu of the current mode.
  function toolOn(name) {
    var s = state.session, exam = s && s.mode === "exam";
    return name === "elim" ? (exam ? prefs.elimExam : prefs.elimTrain) : (exam ? prefs.maskExam : prefs.maskTrain);
  }
  var INSTRUCTION_SEC = 60; // ENV-05: each part opens on an instruction page with its own countdown, then starts by itself.

  /* ---------- state ---------- */
  var state = { view: "home", session: null, ui: freshUI(), notice: null, focus: null };
  var lastView = null;
  function freshUI() {
    return { hl: false, hlMode: "mark", scratch: false, calc: false, calcExpr: "", calcOut: "", calcLive: "", calcPos: -1, confirm: null, showMethod: false, optPos: null, tip: null,
      overview: false, overviewFilter: "all", instructions: false, calcHistory: [], tool: "text", reader: null, settings: false, a11y: false, padAutoText: false };
  }

  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }

  function makeSection(key, questions, limitSec) {
    return {
      key: key,
      items: questions.map(function (q) {
        return { q: q, order: q.shuffle ? C.shuffle(range(q.options.length)) : range(q.options.length) };
      }),
      answers: {}, flags: {}, visited: {}, elim: {}, mask: {}, hints: {}, checked: {}, hl: {},
      scratch: C.scratchNormalise(""), scratchUndo: [], scratchRedo: [], limitMs: limitSec ? limitSec * 1000 : null, startedAt: null, deadline: null, usedMs: null,
      done: false, timedOut: false, repeats: 0, warned: {}
    };
  }

  function startClock(sec) {
    if (sec.startedAt) return;
    sec.startedAt = Date.now();
    if (sec.limitMs) sec.deadline = sec.startedAt + sec.limitMs;
  }
  function stopClock(sec) {
    if (sec.usedMs == null) sec.usedMs = C.elapsedMs(sec, Date.now());
  }

  function pickPractice(key) {
    var pool = bank.bySection[key].slice();
    if (prefs.setId !== "all") pool = pool.filter(function (q) { return q.setId === prefs.setId; });
    if (prefs[key + "Level"] !== "all") pool = pool.filter(function (q) { return q.difficulty === +prefs[key + "Level"]; });
    if (prefs.mistakesOnly) {
      var stats = load(KEY_STATS, {});
      var wrong = pool.filter(function (q) { return stats[q.id] && stats[q.id].last === false; });
      if (wrong.length) pool = wrong;
    }
    pool = C.shuffle(pool);
    return prefs.count === "all" ? pool : pool.slice(0, +prefs.count);
  }

  function startExam(scope) {
    var keys = scope === "full" ? ORDER : [scope];
    var stats = load(KEY_STATS, {});
    var notes = [];
    var form = scope === "full" ? (window.EPSO_EXAMS || []).filter(function (f) { return f.id === prefs.examForm; })[0] : null;
    if (scope === "full" && prefs.examForm !== "random" && !form) { flash("This full test is unavailable. Choose another test or Fresh random simulation."); return; }
    if (form) notes.push(form.title + " · " + form.band + ". The fifteen fixed tests share no questions. Training or random simulations may have shown some of them before.");
    var sections = keys.map(function (k) {
      var S = SECTIONS[k];
      var drawn = form ? { items: form.sections[k].map(function (id) { return bank.byId[id]; }), repeats: 0 } : C.drawExam(bank.bySection[k], S.examCount, stats);
      if (form) drawn.repeats = drawn.items.filter(function (q) { return q && stats[q.id] && (stats[q.id].shown || stats[q.id].seen); }).length;
      var limit = S.examMinutes * 60;
      if (drawn.items.length < S.examCount) {
        limit = Math.round((S.examMinutes * 60 * drawn.items.length) / S.examCount);
        notes.push(S.name + ": the bank has " + drawn.items.length + " of " + S.examCount + " questions, so the time is scaled to " + fmtTime(limit) + ".");
      }
      if (drawn.repeats) notes.push(S.name + ": " + drawn.repeats + " of " + drawn.items.length + " questions are ones you have seen before" + (form ? " in this fixed test. Its question list stays fixed; choose another full test for different questions." : ", because the unseen ones have run out.") + " Your score may overstate your level.");
      var sec = makeSection(k, drawn.items, limit);
      sec.repeats = drawn.repeats;
      return sec;
    }).filter(function (s) { return s.items.length > 0; });
    if (!sections.length) { flash("No questions are available for this test yet."); return; }
    state.session = { mode: "exam", sections: sections, si: 0, qi: 0, started: Date.now(), notes: notes, formId: form ? form.id : null, review: false, instrDeadline: Date.now() + INSTRUCTION_SEC * 1000 };
    go("brief");
  }
  // The instruction page of a part closes by itself when its countdown ends (ENV-05).
  function beginSection() {
    var s = state.session;
    s.instrDeadline = null;
    startClock(s.sections[s.si]); go("session");
  }
  function nextSection() {
    var s = state.session;
    s.si++; s.qi = 0; beginSection();
  }

  function startTraining(mode, key) {
    var qs = pickPractice(key);
    if (!qs.length) {
      var chosen = bank.sets.filter(function (st) { return st.id === prefs.setId; })[0];
      flash(chosen && chosen.section !== key
        ? "The question set you chose (" + chosen.title + ") is for " + SECTIONS[chosen.section].name.toLowerCase() + ". Choose All sets or a " + SECTIONS[key].name.toLowerCase() + " set."
        : "No " + SECTIONS[key].name.toLowerCase() + " questions match these settings.");
      return;
    }
    var timed = mode === "practice" && prefs.timed;
    var sec = makeSection(key, qs, timed ? qs.length * SECTIONS[key].perQ : null);
    state.session = { mode: mode, sections: [sec], si: 0, qi: 0, started: Date.now(), notes: [], review: false };
    if (mode === "coach") go("lesson");
    else { startClock(sec); go("session"); }
  }

  function cur() {
    var s = state.session; if (!s) return null;
    var sec = s.sections[s.si];
    return { s: s, sec: sec, item: sec.items[s.qi], S: SECTIONS[sec.key] };
  }

  /* ---------- session persistence (W3) ---------- */
  var TAB_ID = String(Date.now()) + Math.random().toString(36).slice(2, 8);
  function serialize(s) {
    return {
      v: 1, tab: TAB_ID, mode: s.mode, formId: s.formId || null, si: s.si, qi: s.qi, started: s.started, notes: s.notes, view: state.view, instrDeadline: s.instrDeadline || null,
      sections: s.sections.map(function (sec) {
        return {
          key: sec.key, ids: sec.items.map(function (it) { return it.q.id; }), orders: sec.items.map(function (it) { return it.order; }),
          answers: sec.answers, flags: sec.flags, visited: sec.visited, elim: sec.elim, mask: sec.mask, hints: sec.hints, checked: sec.checked, hl: sec.hl,
          scratch: sec.scratch, limitMs: sec.limitMs, startedAt: sec.startedAt, deadline: sec.deadline, usedMs: sec.usedMs,
          done: sec.done, timedOut: sec.timedOut, repeats: sec.repeats, warned: sec.warned
        };
      })
    };
  }
  function deserialize(d) {
    if (!C.validSession(d, bank.byId)) return null;
    var ok = true;
    var sections = d.sections.map(function (x) {
      var items = x.ids.map(function (id, i) { var q = bank.byId[id]; if (!q) ok = false; return { q: q, order: x.orders[i] }; });
      return {
        key: x.key, items: items, answers: x.answers || {}, flags: x.flags || {}, visited: x.visited || {}, elim: x.elim || {}, mask: x.mask || {}, hints: x.hints || {},
        checked: x.checked || {}, hl: x.hl || {}, scratch: C.scratchNormalise(x.scratch), scratchUndo: [], scratchRedo: [], limitMs: x.limitMs, startedAt: x.startedAt,
        deadline: x.deadline, usedMs: x.usedMs, done: !!x.done, timedOut: !!x.timedOut, repeats: x.repeats || 0, warned: x.warned || {}
      };
    });
    if (!ok) return null;
    return { mode: d.mode, sections: sections, si: d.si, qi: d.qi, started: d.started, notes: d.notes || [], review: false, savedView: d.view, formId: d.formId || null, instrDeadline: d.instrDeadline || null };
  }
  function persist() {
    var s = state.session;
    if (s && !s.finished && !s.review && ["brief", "lesson", "session", "between"].indexOf(state.view) > -1) save(KEY_SESSION, serialize(s));
  }
  function savedSession() {
    var raw = load(KEY_SESSION, null), restored = deserialize(raw);
    if (raw !== null && !restored) { storageRecovered = true; remove(KEY_SESSION); }
    return restored;
  }
  function clearSaved() { remove(KEY_SESSION); }

  function resume() {
    var s = savedSession();
    if (!s) { clearSaved(); flash("That session can no longer be restored."); return; }
    state.session = s;
    var view = s.savedView === "lesson" || s.savedView === "brief" || s.savedView === "between" ? s.savedView : "session";
    go(view);
    tick();
  }

  /* ---------- scoring & stats ---------- */
  function score(sec) { return C.sectionScore(sec, state.session ? state.session.mode : "exam"); }

  function recordQuestion(q, correct) {
    var st = load(KEY_STATS, {});
    var e = st[q.id] || { seen: 0, correct: 0 };
    e.seen++; if (correct) e.correct++; e.last = !!correct; e.at = Date.now();
    st[q.id] = e;
    save(KEY_STATS, st);
  }

  // N6: an item counts as seen once it has been on screen, even if the session is later discarded.
  function markShown(q) {
    var st = load(KEY_STATS, {});
    var e = st[q.id] || { seen: 0, correct: 0 };
    if (e.shown) return;
    e.shown = Date.now(); if (!e.at) e.at = e.shown;
    st[q.id] = e;
    save(KEY_STATS, st);
  }

  function verdictFor(s) {
    var scores = {};
    s.sections.forEach(function (sec) { var sc = C.sectionScore(sec, "exam"); scores[sec.key] = { correct: sc.correct, total: sc.total }; });
    return C.examVerdict(scores);
  }

  function finishSession() {
    var s = state.session;
    stopClock(s.sections[s.si]);
    // Coach rounds that span several tests move on to the next test first.
    if (s.mode === "coach" && s.si < s.sections.length - 1) {
      s.sections[s.si].done = true; s.si++; s.qi = 0; startClock(s.sections[s.si]); go("session"); return;
    }
    s.finished = Date.now();
    if (s.mode === "exam") {
      s.sections.forEach(function (sec) {
        sec.items.forEach(function (it) { recordQuestion(it.q, sec.answers[it.q.id] === it.q.answer); });
      });
    }
    var hist = load(KEY_HIST, []);
    var verdict = s.mode === "exam" ? verdictFor(s) : null;
    hist.unshift({
      at: Date.now(), mode: s.mode, formId: s.formId || null,
      sections: s.sections.map(function (sec) {
        var sc = score(sec);
        return { key: sec.key, correct: sc.correct, total: sc.total, counted: sc.counted, hints: countHints(sec), usedSec: Math.round((sec.usedMs || 0) / 1000), limitSec: sec.limitMs ? sec.limitMs / 1000 : null, repeats: sec.repeats || 0 };
      }),
      pass: verdict ? verdict.every(function (v) { return v.pass; }) : null
    });
    save(KEY_HIST, hist.slice(0, 100));
    clearSaved();
    go("results");
  }

  function countHints(sec) {
    var n = 0; Object.keys(sec.hints).forEach(function (k) { n += sec.hints[k]; }); return n;
  }

  function submitSection(timedOut) {
    var s = state.session, sec = s.sections[s.si];
    stopClock(sec);
    sec.done = true; sec.timedOut = !!timedOut;
    if (s.si < s.sections.length - 1) { s.instrDeadline = Date.now() + INSTRUCTION_SEC * 1000; go("between"); }
    else finishSession();
  }

  /* ---------- timer (W2: deadline based) ---------- */
  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  // ENV-07: the exam clock reads like TAO's ("34min 42s") and gives no colour warning; practice keeps "m:ss left".
  function examClock() { var s = state.session; return s && s.mode === "exam" && !s.review; }
  function timerText(sec) {
    var now = Date.now();
    var rem = C.remainingMs(sec, now);
    if (rem == null) return fmtTime(C.elapsedMs(sec, now) / 1000);
    return examClock() ? C.clockText(rem, "tao") : fmtTime(Math.ceil(rem / 1000)) + " left";
  }
  function timerClass(sec) {
    var rem = C.remainingMs(sec, Date.now());
    if (rem == null || examClock()) return "";
    return rem <= 60000 ? " crit" : rem <= 300000 ? " warn" : "";
  }
  function instructionText(s) {
    return s.instrDeadline ? C.clockText(Math.max(0, s.instrDeadline - Date.now())) : "";
  }

  function tick() {
    var s = state.session;
    if (!s || s.review || s.finished) return;
    // Instruction pages (before the first part and between parts) start the part when their countdown ends.
    if ((state.view === "brief" || state.view === "between") && s.mode === "exam" && s.instrDeadline) {
      var it = document.getElementById("instr-timer");
      if (it) it.textContent = instructionText(s);
      if (Date.now() >= s.instrDeadline) { if (state.view === "brief") beginSection(); else nextSection(); }
      return;
    }
    if (state.view !== "session") return;
    var c = cur(); if (!c || c.sec.done) return;
    var rem = C.remainingMs(c.sec, Date.now());
    var el = document.getElementById("timer");
    if (el) { el.textContent = timerText(c.sec); el.className = "timer" + timerClass(c.sec); }
    if (rem != null) {
      // Spoken time warnings are not a TAO feature: in the exam they are an opt-in accessibility setting.
      var live = (s.mode !== "exam" || prefs.a11y.announce) ? document.getElementById("timer-live") : null;
      if (rem <= 300000 && !c.sec.warned.five && rem > 60000) { c.sec.warned.five = true; if (live) live.textContent = "5 minutes left."; persist(); }
      if (rem <= 60000 && !c.sec.warned.one && rem > 0) { c.sec.warned.one = true; if (live) live.textContent = "1 minute left."; persist(); }
      if (rem <= 0) {
        state.ui.confirm = null;
        if (s.mode === "exam") submitSection(true); else finishSession();
        flash("Time is up. Your answers so far have been submitted.");
      }
    }
  }
  setInterval(tick, 1000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) tick(); });
  window.addEventListener("beforeunload", function (e) {
    var s = state.session;
    if (s && s.mode === "exam" && !s.finished && !s.review && (state.view === "session" || state.view === "between")) {
      persist();
      e.preventDefault();
      e.returnValue = "";
    }
  });

  /* ---------- rendering helpers ---------- */
  var ICON = {
    flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H7v9z"/></svg>',
    calc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v4h10V5zm0 6v2h2v-2zm4 0v2h2v-2zm4 0v6h2v-6zm-8 4v2h2v-2zm4 0v2h2v-2z"/></svg>',
    note: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h10l4 4v14H5zm9 1v4h4M8 12h8M8 15h8M8 18h5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    mark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 3.5l6 6-9 9H5.5v-6zM4 21h16" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    reader: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 18h16" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.45"/><rect x="3" y="9.5" width="18" height="5" rx="1" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm8 3.5l-2.2-.6a6 6 0 0 0-.6-1.5l1.1-2-1.7-1.7-2 1.1a6 6 0 0 0-1.5-.6L12.6 4h-1.2l-.6 2.2a6 6 0 0 0-1.5.6l-2-1.1L5.6 7.4l1.1 2a6 6 0 0 0-.6 1.5L4 11.4v1.2l2.2.6a6 6 0 0 0 .6 1.5l-1.1 2 1.7 1.7 2-1.1a6 6 0 0 0 1.5.6l.6 2.2h1.2l.6-2.2a6 6 0 0 0 1.5-.6l2 1.1 1.7-1.7-1.1-2a6 6 0 0 0 .6-1.5l2.2-.6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    a11y: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4.5" r="2"/><path d="M4 8.5l6 1v4l-2.5 7h2.3l2.2-5.5 2.2 5.5h2.3L14 13.5v-4l6-1v-2l-8 1-8-1z"/></svg>'
  };
  function modeLabel(m) { return m === "exam" ? "Exam simulation" : m === "coach" ? "Coach" : "Practice"; }
  function sr(text) { return '<span class="sr-only">' + esc(text) + "</span>"; }

  function paragraphs(q) { return String(T(q.passage) || "").split(/\n\s*\n/); }

  function passageHTML(q, sec) {
    var ranges = sec.hl[q.id] || [];
    return paragraphs(q).map(function (text, p) {
      return '<p data-p="' + p + '">' + C.segments(text, ranges, p).map(function (sg) {
        return sg.mark ? '<mark data-p="' + p + '" class="mark-' + (sg.c || 0) + '">' + esc(sg.text) + "</mark>" : esc(sg.text);
      }).join("") + "</p>";
    }).join("");
  }

  // ENV-10: TAO's highlighter offers a choice of colours, an eraser and "clear all".
  var HL_COLOURS = ["yellow", "green", "pink"];
  function highlighterBarHTML(q, sec) {
    var ui = state.ui, any = (sec.hl[q.id] || []).length > 0;
    return '<div class="hl-bar" role="group" aria-label="Highlighter"><span class="small muted">Highlighter:</span>' + HL_COLOURS.map(function (name, i) {
      return '<button class="hl-swatch swatch-' + i + '" data-act="hl-color" data-k="' + i + '" aria-pressed="' + (ui.hlMode === "mark" && prefs.hlColor === i) + '" aria-label="Highlight in ' + name + '"></button>';
    }).join("") + '<button class="btn hl-tool" data-act="hl-erase" aria-pressed="' + (ui.hlMode === "erase") + '">Eraser</button>' +
      '<button class="btn hl-tool" data-act="clear-hl"' + (any ? "" : " disabled") + '>Clear all</button>' +
      '<span class="hl-hint">' + (ui.hlMode === "erase" ? "Select text or click a highlight to remove it." : "Select text to highlight it.") + "</span></div>";
  }

  function stimulusHTML(item, sec) {
    var q = item.q, review = state.session.review;
    var main;
    if (q.section === "verbal") {
      main = '<div class="stim-head"><span class="eyebrow">Reading passage</span></div>' +
        (state.ui.hl && !review ? highlighterBarHTML(q, sec) : "") +
        '<div class="passage' + (state.ui.hl ? " hl-on hl-" + state.ui.hlMode : "") + '" id="passage">' + passageHTML(q, sec) + "</div>";
    } else if (q.section === "numerical") {
      var exhibits = q.exhibits || [q.exhibit];
      main = '<div class="stim-head"><span class="eyebrow">Data</span></div>' + exhibits.map(R.exhibitHTML).join("");
    } else {
      var seq = (q.sequence || []).map(function (f, i) {
        return '<div class="frame"><span class="frame-n">' + (i + 1) + "</span>" + R.figureSVG(f, "Series figure " + (i + 1)) + "</div>";
      }).join("");
      main = '<div class="stim-head"><span class="eyebrow">Series</span></div><div class="series">' + seq +
        '<div class="frame frame-q"><span class="frame-n">?</span><span class="qmark" aria-hidden="true">?</span>' + sr("Missing figure") + "</div></div>";
    }
    return main;
  }

  /* ---------- floating tool windows (ENV-01, ENV-02): calculator and scratchpad ----------
     As on TAO, each tool is a window over the question: drag it by its header, resize it from the corner,
     and it keeps its place, size and content from one question to the next. */
  var WIN_DEFAULTS = { calc: { w: 340, h: null }, scratch: { w: 460, h: 400 } };
  function winGeom(name) {
    var d = WIN_DEFAULTS[name], saved = prefs.win[name], vw = window.innerWidth, vh = window.innerHeight;
    var g = saved ? { x: saved.x, y: saved.y, w: saved.w, h: saved.h == null ? d.h : saved.h } : { x: vw - d.w - 16 - (name === "scratch" ? 0 : 0), y: name === "calc" ? 72 : 90, w: d.w, h: d.h };
    g.w = Math.max(240, Math.min(g.w, vw - 16));
    if (g.h != null) g.h = Math.max(160, Math.min(g.h, vh - 16));
    g.x = Math.max(0, Math.min(g.x, vw - Math.min(g.w, vw)));
    g.y = Math.max(0, Math.min(g.y, vh - 56));
    return g;
  }
  function winStyle(name) {
    var g = winGeom(name);
    return 'style="left:' + Math.round(g.x) + "px;top:" + Math.round(g.y) + "px;width:" + Math.round(g.w) + "px" + (g.h != null ? ";height:" + Math.round(g.h) + "px" : "") + '"';
  }
  function saveWin(name, g) { prefs.win[name] = { x: Math.round(g.x), y: Math.round(g.y), w: Math.round(g.w), h: g.h == null ? null : Math.round(g.h) }; save(KEY_PREFS, prefs); }

  var CALC_BASIC = ["AC", "CE", "⌫", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "▲", "▼"];
  var CALC_EXTRA = ["(", ")", "√", "^"];
  var CALC_LABELS = { "÷": "divide", "×": "multiply", "−": "minus", "+": "plus", "⌫": "delete last character", AC: "clear all", CE: "clear entry", "√": "square root", "^": "to the power of", "▲": "previous operation", "▼": "next operation" };
  function calcWindowHTML() {
    var ui = state.ui, keys = prefs.calcExtras ? CALC_BASIC.concat(CALC_EXTRA) : CALC_BASIC;
    return '<section class="tool-win tool-panel calc" id="win-calc" aria-label="Calculator" ' + winStyle("calc") + '>' +
      '<div class="pop-head win-head" data-win="calc" tabindex="0" aria-label="Calculator window: drag to move, or use the arrow keys"><h2>Calculator</h2><button class="link-btn" data-act="tool-calc" aria-label="Close the calculator">✕</button></div>' +
      '<div class="calc-screen" aria-live="polite"><div class="calc-expr" id="calc-expr">' + esc(ui.calcExpr || "0") + '</div><div class="calc-out" id="calc-out">' + esc(ui.calcOut) + "</div></div>" +
      '<div class="calc-keys' + (prefs.calcExtras ? " with-extra" : "") + '">' + keys.map(function (k) {
        return '<button data-act="calc" data-k="' + esc(k) + '"' + (CALC_LABELS[k] ? ' aria-label="' + CALC_LABELS[k] + '"' : "") + ">" + esc(k) + "</button>";
      }).join("") + '<button class="calc-eq" id="calc-eq" data-act="calc" data-k="=" aria-label="equals">=</button></div>' +
      '<p class="small muted">Type on the keyboard or press the keys; = or Enter gives the result. Use a dot for decimals (a comma is not accepted). ▲ ▼ review previous operations.' + (prefs.calcExtras ? " Parentheses, √ and ^ are trainer extras, not confirmed on TAO." : "") + "</p></section>";
  }

  var PAD_TOOLS = [["select", "Select"], ["text", "Text"], ["brush", "Brush"], ["line", "Line"], ["rect", "Rectangle"], ["ellipse", "Ellipse"], ["erase", "Erase"]];
  function padItems(sec) { return C.scratchNormalise(sec.scratch).items; }
  function padSVG(items) {
    return items.map(function (it, i) {
      var a = ' data-i="' + i + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
      switch (it.t) {
        case "path":
          if (it.pts.length === 1) return '<circle data-i="' + i + '" cx="' + it.pts[0][0] + '" cy="' + it.pts[0][1] + '" r="1.5" fill="currentColor"/>';
          return "<polyline" + a + ' points="' + it.pts.map(function (p) { return p[0] + "," + p[1]; }).join(" ") + '"/>';
        case "line": return "<line" + a + ' x1="' + it.x1 + '" y1="' + it.y1 + '" x2="' + it.x2 + '" y2="' + it.y2 + '"/>';
        case "rect": return "<rect" + a + ' x="' + it.x + '" y="' + it.y + '" width="' + it.w + '" height="' + it.h + '"/>';
        case "ellipse": return "<ellipse" + a + ' cx="' + it.cx + '" cy="' + it.cy + '" rx="' + it.rx + '" ry="' + it.ry + '"/>';
        default: return '<text data-i="' + i + '" x="' + it.x + '" y="' + it.y + '" class="pad-text-item">' + it.text.split("\n").map(function (line, n) {
          return '<tspan x="' + it.x + '"' + (n ? ' dy="18"' : "") + ">" + (line ? esc(line) : " ") + "</tspan>";
        }).join("") + "</text>";
      }
    }).join("");
  }
  function padWindowHTML(sec) {
    var ui = state.ui, items = padItems(sec);
    return '<section class="tool-win tool-panel pad" id="win-scratch" aria-label="Scratchpad" ' + winStyle("scratch") + '>' +
      '<div class="pop-head win-head" data-win="scratch" tabindex="0" aria-label="Scratchpad window: drag to move, or use the arrow keys"><h2>Scratchpad</h2><span class="pad-actions">' +
      '<button class="link-btn" data-act="pad-undo" aria-label="Undo"' + (sec.scratchUndo.length ? "" : " disabled") + '>↶ Undo</button><button class="link-btn" data-act="pad-redo" aria-label="Redo"' + (sec.scratchRedo.length ? "" : " disabled") + '>↷ Redo</button>' +
      '<button class="link-btn" data-act="pad-clear"' + (items.length ? "" : " disabled") + '>Clear</button><button class="link-btn" data-act="tool-scratch" aria-label="Close the scratchpad">✕</button></span></div>' +
      '<div class="pad-body"><div class="pad-tools" role="toolbar" aria-label="Scratchpad tools">' + PAD_TOOLS.map(function (t) {
        return '<button class="pad-tool" data-act="pad-tool" data-k="' + t[0] + '" aria-pressed="' + (ui.tool === t[0]) + '">' + t[1] + "</button>";
      }).join("") + '</div><div class="pad-area" id="pad-area" data-tool="' + ui.tool + '" role="group" aria-label="Scratchpad drawing area"><svg class="pad-svg" id="pad-svg" aria-hidden="true" focusable="false">' + padSVG(items) + "</svg></div></div>" +
      '<p class="small muted pad-help">Text: click to place a text box; Enter starts a new line. Brush, line, rectangle, ellipse: drag. Select: drag an item to move it. Erase: click an item. Your pad is kept for the whole part.</p></section>';
  }
  function toolWindowsHTML(sec) {
    var ui = state.ui, out = "";
    if (state.session.review) return "";
    if (ui.calc) out += calcWindowHTML();
    if (ui.scratch) out += padWindowHTML(sec);
    return out ? '<div class="tool-layer">' + out + "</div>" : "";
  }
  // ENV-06: TAO's line reader is a strip that keeps one line readable and greys out the rest of the screen.
  function lineReaderHTML() {
    var r = state.ui.reader;
    if (!r || state.session.review) return "";
    return '<div class="line-reader" id="line-reader" style="top:' + Math.round(r.top) + "px;height:" + Math.round(r.height) + 'px" role="group" aria-label="Line reader">' +
      '<button class="lr-size" data-win="lr-size" aria-label="Line reader height: drag, or use the up and down arrow keys">⇕</button>' +
      '<button class="lr-move" data-win="lr-move" aria-label="Move the line reader: drag, or use the up and down arrow keys">≡</button></div>';
  }
  function settingsPopHTML() {
    if (!state.ui.settings) return "";
    var exam = state.session.mode === "exam";
    return '<div class="tool-pop" id="settings-pop" role="dialog" aria-label="My settings"><h2>My settings</h2>' +
      '<label class="check"><input type="checkbox" id="set-elim"' + (toolOn("elim") ? " checked" : "") + "> Answer elimination</label><p class=\"small muted\">Strike through options you have ruled out.</p>" +
      '<label class="check"><input type="checkbox" id="set-mask"' + (toolOn("mask") ? " checked" : "") + "> Answer masking</label><p class=\"small muted\">Hide distracting options until you reveal them again.</p>" +
      '<p class="small muted">' + (exam ? "As on TAO, both are off until you switch them on here." : "Settings for Coach and Practice.") + '</p><button class="btn" data-act="settings">Close</button></div>';
  }
  var A11Y_ROWS = [["font", "Text size", 10, "%"], ["line", "Line height", 10, "%"], ["word", "Word spacing", 1, ""], ["letter", "Letter spacing", 1, ""]];
  function a11yPopHTML() {
    if (!state.ui.a11y) return "";
    var a = prefs.a11y;
    return '<div class="tool-pop" id="a11y-pop" role="dialog" aria-label="Accessibility tools"><h2>Accessibility tools</h2>' +
      '<fieldset class="a11y-theme"><legend class="small muted">Contrast theme</legend>' + [["system", "System"], ["light", "Light"], ["dark", "Dark"], ["contrast", "High contrast"]].map(function (t) {
        return '<label class="check"><input type="radio" name="a11y-theme" value="' + t[0] + '"' + (prefs.theme === t[0] ? " checked" : "") + "> " + t[1] + "</label>";
      }).join("") + "</fieldset>" +
      A11Y_ROWS.map(function (r) {
        var v = a[r[0]], shown = r[3] === "%" ? (100 + v * r[2]) + "%" : (v ? "+" + v : "0");
        return '<div class="a11y-row"><span>' + r[1] + '</span><button class="btn" data-act="a11y" data-k="' + r[0] + '" data-d="-1" aria-label="Decrease ' + r[1].toLowerCase() + '"' + (v <= 0 ? " disabled" : "") + '>−</button><b>' + shown + '</b><button class="btn" data-act="a11y" data-k="' + r[0] + '" data-d="1" aria-label="Increase ' + r[1].toLowerCase() + '"' + (v >= 6 ? " disabled" : "") + ">+</button></div>";
      }).join("") +
      '<label class="check"><input type="checkbox" id="set-announce"' + (a.announce ? " checked" : "") + "> Announce 5-minute and 1-minute warnings (screen readers; not a TAO feature)</label>" +
      '<div class="row-actions"><button class="btn" data-act="a11y-reset">Reset</button><button class="btn" data-act="a11y-toggle">Close</button></div></div>';
  }

  function optionsHTML(item, sec, mode) {
    var q = item.q, id = q.id;
    var chosen = sec.answers[id];
    var checked = !!sec.checked[id] || state.session.review;
    var elim = sec.elim[id] || {}, mask = sec.mask[id] || {};
    var elimOn = !checked && toolOn("elim"), maskOn = !checked && toolOn("mask");
    var isFig = q.section === "abstract";
    var showAllNotes = mode === "coach" || state.session.review;
    // N4: one tab stop for the group (roving tabindex): the focused, else the chosen, else the first option.
    var rove = state.ui.optPos != null ? state.ui.optPos : chosen !== undefined && item.order.indexOf(chosen) > -1 ? item.order.indexOf(chosen) : 0;
    var list = item.order.map(function (orig, pos) {
      var cls = ["opt"], status = "";
      var masked = maskOn && !!mask[orig];
      if (chosen === orig) cls.push("chosen");
      if (elimOn && elim[orig]) cls.push("struck");
      if (masked) cls.push("masked");
      if (checked) {
        if (orig === q.answer) { cls.push("right"); status = '<span class="mark-icon" aria-hidden="true">✓</span>' + sr(chosen === orig ? "Your answer, correct." : "Correct answer."); }
        else if (chosen === orig) { cls.push("wrong"); status = '<span class="mark-icon" aria-hidden="true">✗</span>' + sr("Your answer, incorrect."); }
      }
      var content = isFig ? R.figureSVG(q.options[orig], "Option " + LETTERS[pos]) : "<span>" + esc(T(q.options[orig])) + "</span>";
      var note = "";
      var notes = q.optionNotes;
      if (checked && notes && notes[orig] && (showAllNotes || orig === chosen || orig === q.answer)) {
        note = '<p class="opt-note">' + esc(T(notes[orig])) + "</p>";
      }
      var body = masked ? '<span class="opt-body opt-masked" aria-hidden="true"></span>' + sr("Option hidden by answer masking.") : '<span class="opt-body">' + content + note + "</span>";
      return '<li class="' + cls.join(" ") + '" role="none">' +
        '<button class="opt-main" id="opt-' + pos + '" role="radio" tabindex="' + (pos === rove ? 0 : -1) + '" data-act="choose" data-opt="' + orig + '"' + (checked || masked ? ' aria-disabled="true"' : "") + ' aria-checked="' + (chosen === orig) + '">' +
        '<span class="letter">' + LETTERS[pos] + "</span>" + body + status + "</button>" +
        (elimOn ? '<button class="strike" tabindex="-1" data-act="strike" data-opt="' + orig + '" aria-pressed="' + !!elim[orig] + '" aria-label="Strike out option ' + LETTERS[pos] + '">✕</button>' : "") +
        (maskOn ? '<button class="mask" tabindex="-1" data-act="mask" data-opt="' + orig + '" aria-pressed="' + !!mask[orig] + '" aria-label="' + (mask[orig] ? "Reveal" : "Hide") + " option " + LETTERS[pos] + '">' + (mask[orig] ? "◻" : "◼") + "</button>" : "") +
        "</li>";
    }).join("");
    var shortcuts = state.session.mode !== "exam" || prefs.examShortcuts;
    return '<ol class="opts' + (isFig ? " opts-fig" : "") + '" role="radiogroup" aria-labelledby="q-stem" aria-describedby="opts-help">' + list + "</ol>" +
      '<p id="opts-help" class="sr-only">Use the arrow keys to move between options' + (elimOn && shortcuts ? " and X to strike out the focused option." : ".") + "</p>";
  }

  function coachPanelHTML(item, sec) {
    var q = item.q, used = sec.hints[q.id] || 0, hints = q.hints || [];
    var lesson = (window.EPSO_LESSONS || {})[q.section];
    var method = lesson ? '<details class="method"' + (state.ui.showMethod ? " open" : "") + '><summary data-act="toggle-method">Method checklist</summary><ol>' +
      lesson.steps.map(function (st) { return "<li><b>" + esc(st.name) + ".</b> " + esc(st.text) + "</li>"; }).join("") + "</ol></details>" : "";
    var shown = hints.slice(0, used).map(function (h, i) {
      return '<li><span class="hint-n">Hint ' + (i + 1) + "</span> " + esc(T(h)) + "</li>";
    }).join("");
    var btn = used < hints.length
      ? '<button class="btn btn-quiet" data-act="hint">' + (used ? "Show next hint" : "Show a hint") + " (" + (used + 1) + " of " + hints.length + ")</button>"
      : hints.length ? '<span class="muted small">All hints shown. Now choose your answer.</span>' : "";
    return '<div class="coach"><div class="coach-head"><span class="eyebrow">Coach</span><span class="muted small">Target pace: ' +
      fmtTime(SECTIONS[q.section].perQ) + " per question</span></div>" + method +
      (shown ? '<ol class="hints" aria-live="polite">' + shown + "</ol>" : "") + '<div class="coach-actions">' + btn + "</div></div>";
  }

  function feedbackHTML(item, sec) {
    var q = item.q, chosen = sec.answers[q.id];
    var ok = chosen === q.answer;
    var pos = item.order.indexOf(q.answer);
    var head = state.session.mode !== "exam" && !sec.checked[q.id]
      ? '<p class="verdict verdict-skip">Not checked. The correct answer is <b>' + LETTERS[pos] + "</b>.</p>"
      : chosen === undefined
      ? '<p class="verdict verdict-skip">✗ Not answered. The correct answer is <b>' + LETTERS[pos] + "</b>.</p>"
      : ok ? '<p class="verdict verdict-ok">✓ Correct.</p>'
        : '<p class="verdict verdict-bad">✗ Not quite. The correct answer is <b>' + LETTERS[pos] + "</b>.</p>";
    var steps = T(q.solution);
    var sol = steps && steps.length
      ? '<div class="solution"><span class="eyebrow">Worked solution</span><ol>' + steps.map(function (s) { return "<li>" + esc(T(s)) + "</li>"; }).join("") + "</ol></div>" : "";
    var exp = q.explanation ? '<div class="takeaway"><span class="eyebrow">Key takeaway</span><p>' + esc(T(q.explanation)) + "</p></div>" : "";
    return '<div class="feedback" id="feedback" tabindex="-1">' + head + sol + exp + "</div>";
  }

  // ENV-08: TAO's navigation bar: back arrow, numbered circles (grey = not opened, outlined = opened but
  // unanswered, filled = answered, arrow under the current one), an Overview button and a forward arrow.
  function navHTML(sec) {
    var s = state.session, flagged = 0;
    var dots = sec.items.map(function (it, i) {
      var id = it.q.id, cls = ["qdot"], states = [];
      if (sec.answers[id] !== undefined) { cls.push("answered"); states.push("answered"); } else if (sec.visited[id]) { cls.push("opened"); states.push("opened, not answered"); } else { cls.push("unopened"); states.push("not opened"); }
      if (sec.flags[id]) { cls.push("flagged"); states.push("bookmarked"); flagged++; }
      if (sec.checked[id] || (s.review && s.mode === "exam")) {
        var right = sec.answers[id] === it.q.answer;
        cls.push(right ? "ok" : "bad"); states.push(right ? "correct" : "incorrect");
      }
      if (i === s.qi) cls.push("current");
      return '<button class="' + cls.join(" ") + '" data-act="goto" data-i="' + i + '"' + (i === s.qi ? ' aria-current="step"' : "") +
        ' aria-label="Question ' + (i + 1) + ": " + states.join(", ") + '">' + (i + 1) + "</button>";
    }).join("");
    return '<nav class="qnav" aria-label="Questions"><button class="nav-arrow" data-act="nav-prev" aria-label="Previous question"' + (s.qi === 0 ? " disabled" : "") + '>←</button><div class="qdots">' + dots + "</div>" +
      (s.review ? "" : '<button class="btn nav-overview" data-act="overview" aria-expanded="' + state.ui.overview + '" aria-controls="test-overview">Overview' + (flagged ? " · " + flagged + " bookmarked" : "") + "</button>") +
      '<button class="nav-arrow" data-act="nav-next" aria-label="Next question"' + (s.qi === sec.items.length - 1 ? " disabled" : "") + '>→</button></nav>' +
      '<div class="legend-row small muted" aria-hidden="true"><span><i class="lg lg-unopened"></i>Not opened</span><span><i class="lg lg-opened"></i>Opened, not answered</span><span><i class="lg lg-ans"></i>Answered</span><span><i class="lg lg-flag"></i>Bookmarked</span>' +
      (s.review || s.mode !== "exam" ? '<span><i class="lg lg-ok">✓</i>Correct</span><span><i class="lg lg-bad">✗</i>Incorrect</span>' : "") + "</div>";
  }
  function overviewHTML(sec) {
    if (!state.ui.overview || state.session.review) return '<div id="test-overview" hidden></div>';
    var unanswered = sec.items.filter(function (it) { return sec.answers[it.q.id] === undefined; }).length;
    var flagged = sec.items.filter(function (it) { return sec.flags[it.q.id]; }).length;
    return '<section id="test-overview" class="tool-panel" aria-label="Current test overview"><h2>Current test overview</h2><div class="overview-filters" role="group" aria-label="Filter questions">' + [["all", "All (" + sec.items.length + ")"], ["unanswered", "Unanswered (" + unanswered + ")"], ["flagged", "Bookmarked (" + flagged + ")"]].map(function (f) { return '<button class="btn" data-act="overview-filter" data-k="' + f[0] + '" aria-pressed="' + (state.ui.overviewFilter === f[0]) + '">' + f[1] + '</button>'; }).join("") + '</div><div class="overview-grid">' + sec.items.map(function (it, i) {
      var id = it.q.id, answered = sec.answers[id] !== undefined;
      if (state.ui.overviewFilter === "unanswered" && answered || state.ui.overviewFilter === "flagged" && !sec.flags[id]) return "";
      return '<button class="btn" data-act="goto" data-i="' + i + '"' + (state.session.qi === i ? ' aria-current="step"' : "") + '>Question ' + (i + 1) + '<span class="small">' + (answered ? "Answered" : sec.visited[id] ? "Opened · unanswered" : "Not opened") + (sec.flags[id] ? " · Bookmarked" : "") + '</span></button>';
    }).join("") + '</div><p class="small muted">You can return to any question in this test until you submit it. A bookmark does not count as an answer.</p></section>';
  }
  function instructionsHTML() {
    if (!state.ui.instructions || state.session.review) return '<div id="test-instructions" hidden></div>';
    return '<section id="test-instructions" class="tool-panel" aria-label="Test instructions"><h2>Test instructions</h2><p>Choose one answer per question. Move freely within the current part, bookmark any question with the flag, and use Overview to jump to bookmarked or unanswered questions. After submitting a part you cannot return to it.</p><p>The clock at the top shows the minutes and seconds left in the current part and keeps running while tools or these instructions are open. At zero the part is submitted.</p><p>Tools, as on TAO: highlighter and line reader for the passage; scratchpad (text and drawing) and calculator (numerical) as windows you can drag by their header and resize; answer elimination and masking, switched on in Settings; accessibility tools and zoom. The calculator takes a dot as decimal separator and Enter as equals.</p><p class="small muted">Rehearse the real tools in EPSO\'s mandatory technical prerequisite check on the TAO platform before test day. These are original trainer instructions; follow your competition notice and the official candidate instructions.</p></section>';
  }

  // ENV-06: the fixed toolbar of TAO: instructions, highlighter, line reader, scratchpad, calculator, settings
  // (answer elimination and masking), accessibility tools, plus the zoom of the movable toolbar.
  function toolsHTML(sec) {
    var ui = state.ui, k = sec.key, out = '<button class="tool" data-act="instructions" aria-expanded="' + ui.instructions + '" aria-controls="test-instructions">Instructions</button>';
    if (state.session.review) return "";
    if (k === "verbal") out += '<button class="tool' + (ui.hl ? " on" : "") + '" data-act="tool-hl" aria-pressed="' + ui.hl + '" title="Select text in the passage to highlight it">' + ICON.mark + "<span>Highlight</span></button>";
    out += '<button class="tool' + (ui.reader ? " on" : "") + '" data-act="tool-reader" aria-pressed="' + !!ui.reader + '" title="A strip that keeps one line readable and greys out the rest">' + ICON.reader + "<span>Line reader</span></button>";
    out += '<button class="tool' + (ui.scratch ? " on" : "") + '" data-act="tool-scratch" aria-pressed="' + ui.scratch + '" title="Write and draw; kept for the whole part">' + ICON.note + "<span>Scratchpad</span></button>";
    if (k === "numerical") out += '<button class="tool' + (ui.calc ? " on" : "") + '" data-act="tool-calc" aria-pressed="' + ui.calc + '" title="On-screen calculator; you can also type on the keyboard">' + ICON.calc + "<span>Calculator</span></button>";
    out += '<button class="tool' + (ui.settings ? " on" : "") + '" data-act="settings" aria-expanded="' + ui.settings + '" aria-controls="settings-pop" title="Answer elimination and answer masking">' + ICON.gear + "<span>Settings</span></button>";
    out += '<button class="tool' + (ui.a11y ? " on" : "") + '" data-act="a11y-toggle" aria-expanded="' + ui.a11y + '" aria-controls="a11y-pop" title="Contrast theme, text size and spacing">' + ICON.a11y + "<span>Accessibility</span></button>";
    out += '<span class="zoom" role="group" aria-label="Zoom"><button class="tool" data-act="zoom" data-d="-1" aria-label="Zoom out"' + (prefs.zoom <= 50 ? " disabled" : "") + '>−</button><button class="tool zoom-level" data-act="zoom-reset" aria-label="Zoom level ' + prefs.zoom + ' percent; reset">' + prefs.zoom + '%</button><button class="tool" data-act="zoom" data-d="1" aria-label="Zoom in"' + (prefs.zoom >= 200 ? " disabled" : "") + '>+</button></span>';
    return '<div class="tools" role="group" aria-label="Tools">' + out + settingsPopHTML() + a11yPopHTML() + "</div>";
  }

  // Small "i" button with a tip: shown on hover, on keyboard focus, and on tap (phones). Never inside a <label>,
  // because a click there would also toggle the labelled control.
  function info(id, about, text, align) {
    var open = state.ui.tip === id;
    return '<span class="info-wrap' + (align === "right" ? " tip-r" : "") + '"><button type="button" class="info-btn" data-act="tip" data-k="' + id + '" aria-label="More about ' + esc(about) +
      '" aria-describedby="tip-' + id + '" aria-expanded="' + open + '"><span aria-hidden="true">i</span></button>' +
      '<span role="tooltip" id="tip-' + id + '" class="tip' + (open ? " open" : "") + '">' + text + "</span></span>";
  }

  var THEME_NEXT = { system: "light", light: "dark", dark: "contrast", contrast: "system" };
  function themeButton() {
    var next = THEME_NEXT[prefs.theme];
    var label = { system: "Theme: system", light: "Theme: light", dark: "Theme: dark", contrast: "Theme: high contrast" }[prefs.theme];
    return '<button class="link-btn theme-btn" data-act="theme" aria-label="' + label + ". Switch to " + next + '">' + label + "</button>";
  }

  /* ---------- verbal trend (E3) ---------- */
  function verbalTrend(hist) {
    var pts = hist.filter(function (h) { return h.mode === "exam"; }).map(function (h) {
      var v = h.sections.filter(function (s) { return s.key === "verbal"; })[0];
      return v ? Math.round((v.correct / v.total) * 100) : null;
    }).filter(function (v) { return v !== null; }).slice(0, 12).reverse();
    if (pts.length < 2) return "";
    var W = 260, H = 70, L = 4, Rr = 4, Tt = 6, B = 6;
    var x = function (i) { return L + (i * (W - L - Rr)) / (pts.length - 1); };
    var y = function (v) { return Tt + (1 - v / 100) * (H - Tt - B); };
    var path = pts.map(function (v, i) { return (i ? "L" : "M") + x(i).toFixed(1) + "," + y(v).toFixed(1); }).join(" ");
    var last = pts[pts.length - 1];
    return '<figure class="trend"><figcaption class="small muted">Verbal score in your last ' + pts.length + " simulations (dashed line: pass mark)</figcaption>" +
      '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Verbal scores: ' + pts.join("%, ") + '%">' +
      '<line class="pass" x1="' + L + '" x2="' + (W - Rr) + '" y1="' + y(50) + '" y2="' + y(50) + '"/>' +
      '<path class="line" d="' + path + '"/>' +
      '<circle class="end" cx="' + x(pts.length - 1) + '" cy="' + y(last) + '" r="3.5"/></svg></figure>';
  }

  /* ---------- views ---------- */
  function viewHome() {
    var hist = load(KEY_HIST, []);
    var stats = load(KEY_STATS, {});
    var saved = savedSession();
    var sectionRows = ORDER.map(function (k) {
      var qs = bank.bySection[k], seen = 0, correct = 0, wrongNow = 0, unseen = 0;
      qs.forEach(function (q) { var e = stats[q.id]; if (e) { seen += e.seen; correct += e.correct; if (e.last === false) wrongNow++; } else unseen++; });
      var acc = seen ? Math.round((correct / seen) * 100) : null;
      var S = SECTIONS[k];
      var levelCounts = '<span class="muted small">' + [1, 2, 3].map(function (d) {
        return qs.filter(function (q) { return q.difficulty === d; }).length + " " + ["", "easy", "medium", "hard"][d];
      }).join(" · ") + "</span>";
      return '<div class="trow">' +
        '<div class="tcell tname"><h3>' + esc(S.name) + '</h3><span class="muted small">Exam: ' + S.examCount + " questions · " + S.examMinutes + " min</span></div>" +
        '<div class="tcell tstat"><span class="stat-label">Questions</span><span class="big-num">' + qs.length + '</span><span class="muted small">' + unseen + " not seen yet</span>" + levelCounts + "</div>" +
        '<div class="tcell tstat"><span class="stat-label">Your accuracy</span><span class="big-num">' + (acc === null ? "–" : acc + "%") + '</span><span class="muted small">' + (seen ? wrongNow + " to revisit" : "Not started yet") + "</span></div>" +
        '<div class="tcell tact"><button class="btn btn-primary" data-act="coach" data-k="' + k + '" aria-label="Coach: ' + esc(S.name) + '">Coach</button><button class="btn" data-act="practice" data-k="' + k + '" aria-label="Practice: ' + esc(S.name) + '">Practice</button></div>' +
        "</div>";
    }).join("");

    var setOpts = '<option value="all">All sets</option>' + ORDER.map(function (k) {
      return '<optgroup label="' + esc(SECTIONS[k].name) + '">' + bank.sets.filter(function (s) { return s.section === k; }).map(function (s) {
        var short = s.title.indexOf("·") > -1 ? s.title.split("·").pop().trim() : s.title;
        return '<option value="' + esc(s.id) + '"' + (prefs.setId === s.id ? " selected" : "") + ">" + esc(short) + " (" + s.count + " questions)</option>";
      }).join("") + "</optgroup>";
    }).join("");

    var histHTML = hist.length ? '<ul class="hist">' + hist.slice(0, 8).map(function (h) {
      var d = new Date(h.at);
      var parts = h.sections.map(function (s) {
        if (!SECTIONS[s.key]) return "";
        return SECTIONS[s.key].name.split(" ")[0] + " " + s.correct + "/" + (h.mode === "exam" || s.counted === undefined ? s.total : s.counted) + (h.mode !== "exam" && s.counted !== undefined ? " checked (" + s.total + " in round)" : "") + (s.usedSec ? " in " + fmtTime(s.usedSec) : "");
      }).join(" · ");
      var badge = h.pass === null ? "" : h.pass ? '<span class="pill pill-ok">✓ Passed gates</span>' : '<span class="pill pill-bad">✗ Below a pass mark</span>';
      return "<li><span class=\"hist-date\">" + d.toLocaleDateString(undefined, { day: "numeric", month: "short" }) + " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) +
        '</span><span class="hist-mode">' + (h.formId ? "Full test " + h.formId.slice(-2) : modeLabel(h.mode)) + '</span><span class="hist-score">' + esc(parts) + "</span>" + badge + "</li>";
    }).join("") + "</ul>" : '<p class="muted">No attempts yet. Your coach rounds, practice sessions and exam simulations will be listed here.</p>';

    var warn = bank.errors.length ? '<div class="alert">' + bank.errors.map(esc).join("<br>") + "</div>" : "";
    var fresh = C.freshSimulationsLeft(bank.bySection, stats);

    var resumeHTML = "";
    if (saved) {
      var ssec = saved.sections[saved.si];
      var rem = C.remainingMs(ssec, Date.now());
      resumeHTML = '<div class="resume" role="region" aria-label="Unfinished session"><div><h2>Resume your ' + esc(modeLabel(saved.mode).toLowerCase()) + "</h2>" +
        '<p class="muted">' + esc(SECTIONS[ssec.key].name) + ", question " + (saved.qi + 1) + " of " + ssec.items.length +
        (rem != null && ssec.startedAt ? (rem > 0 ? ", " + fmtTime(Math.ceil(rem / 1000)) + " left on the clock" : ". The time ran out while you were away; the test will be submitted") : "") + ".</p></div>" +
        '<div class="row-actions"><button class="btn" data-act="discard">Discard</button><button class="btn btn-primary" data-act="resume">Resume</button></div></div>';
    }

    return '<div class="home">' + warn + resumeHTML +
      '<header class="masthead"><div class="mast-text"><p class="eyebrow">EPSO AD5 · Stage 1 reasoning tests</p><h1 id="main-heading" tabindex="-1">AD5 Reasoning Trainer</h1>' +
      '<p class="lede">Learn the method with the coach, drill with instant feedback, then sit a full timed simulation in the EPSO format.</p></div>' +
      '<dl class="format">' +
      '<div><dt>Verbal</dt><dd><b>20</b> questions · <b>35</b> min</dd><dd class="muted small">Pass mark: 10 of 20. Also counts for your ranking ' + info("rank", "the verbal ranking", "Verbal reasoning is the only reasoning test that counts towards your place in the ranking: 40% of the preliminary score and 35% of the final score. Numerical and abstract only need to be passed.") + "</dd></div>" +
      '<div><dt>Numerical</dt><dd><b>10</b> questions · <b>20</b> min</dd><dd class="muted small">Pass mark: 10 of 20, shared with abstract ' + info("combined", "the combined pass mark", "Numerical and abstract share one pass mark: at least 10 correct out of the 20 questions of both tests together. A strong abstract score can make up for a weaker numerical one.") + "</dd></div>" +
      '<div><dt>Abstract</dt><dd><b>10</b> questions · <b>10</b> min</dd><dd class="muted small">Pass mark: shared with numerical ' + info("combined2", "the combined pass mark", "Abstract and numerical share one pass mark: at least 10 correct out of the 20 questions of both tests together.", "right") + "</dd></div>" +
      "</dl></header>" +

      '<section class="howto" aria-labelledby="howto-h"><h2 id="howto-h">How to use this trainer</h2><ol>' +
      "<li><b>Learn with Coach.</b> Under <b>Train one test at a time</b>, press <b>Coach</b> next to a test: a short lesson, then questions with hints and an explanation of every option.</li>" +
      "<li><b>Drill with Practice.</b> Press <b>Practice</b> next to the same test to answer questions and check each one straight away.</li>" +
      "<li><b>Test yourself.</b> In <b>Exam simulation</b>, choose a test type and start it. It is timed like the real exam, with your results at the end.</li>" +
      "</ol><p class=\"small muted\">Your progress is saved in this browser only. " + info("saved", "saved progress", "Results, mistakes and an unfinished exam are stored on this device, in this browser. Another browser or device starts fresh, and private browsing may not keep them.") + "</p></section>" +

      '<section class="exam-card"><div><div class="h-row"><h2>Exam simulation</h2>' + info("exam", "the exam simulation", "Like the real test: each part opens on a timed instruction page and starts by itself, has its own clock, offers no hints, and you see your score and the explanations only at the end. Trainer only: if you close the page, reopen it and choose Resume; the clock keeps running.") + "</div>" + '<p class="muted">Timed and in the TAO layout: navigation bar with bookmarks and Overview, highlighter, line reader, movable scratchpad and calculator, answer elimination and masking (Settings), accessibility tools and zoom. No hints or feedback until the end. Choose a fixed full test, or use Fresh random simulation for unseen-first questions in a mix of difficulty levels.</p>' +
      '<p class="fresh">' + (fresh > 0 ? fresh + " full simulation" + (fresh > 1 ? "s" : "") + " left with unseen questions" : "No full simulation left with only unseen questions: new ones will include repeats") + " " +
      info("fresh", "unseen questions", "This count applies to Fresh random simulation, using questions you have not seen in Coach, Practice or earlier simulations. Repeats are used when unseen questions run out. Fixed tests keep their own question lists and warn about prior exposure.") + "</p></div>" +
      '<div class="exam-start"><span class="field-label"><label for="exam-scope">Choose test type</label>' +
      info("scope", "test types", "<b>All three tests</b> runs verbal, numerical and abstract one after the other, as on exam day (65 min). Choose a single test to practise its timing on its own.", "right") + "</span>" +
      '<select id="exam-scope">' +
      [["full", "All three tests (65 min)"], ["verbal", "Verbal only (35 min)"], ["numerical", "Numerical only (20 min)"], ["abstract", "Abstract only (10 min)"]].map(function (o) {
        return '<option value="' + o[0] + '"' + (prefs.examScope === o[0] ? " selected" : "") + ">" + o[1] + "</option>";
      }).join("") + '</select><label for="exam-form">Full test library</label><select id="exam-form" aria-describedby="exam-form-note"' + (prefs.examScope !== "full" ? " disabled" : "") + '><option value="random">Fresh random simulation</option>' + (window.EPSO_EXAMS || []).map(function (f) {
        return '<option value="' + f.id + '"' + (prefs.examForm === f.id ? " selected" : "") + '>' + esc(f.title + " · " + f.band + (f.newContent ? " · New" : "")) + '</option>';
      }).join("") + '</select><p class="small muted" id="exam-form-note">' + (prefs.examScope === "full"
        ? "15 complete tests · 40 questions each · no repeats between fixed tests. Tests 13–15 contain the new challenge questions."
        : "The full tests cover all three tests, so they can only be chosen with <b>All three tests</b>. A single test always uses a fresh random simulation.") + "</p>" +
      '<label class="check small"><input type="checkbox" id="opt-shortcuts"' + (prefs.examShortcuts ? " checked" : "") + "> Trainer keyboard shortcuts (TAO has none)</label>" +
      '<label class="check small"><input type="checkbox" id="opt-calc-extras"' + (prefs.calcExtras ? " checked" : "") + "> Extra calculator keys ( ) √ ^ (not confirmed on TAO)</label>" +
      '<button class="btn btn-primary btn-lg" data-act="exam">Start simulation</button></div></section>' +

      '<section class="train"><div class="train-head"><div><div class="h-row"><h2>Train one test at a time</h2>' + info("coach", "Coach and Practice", "<b>Coach</b>: a short lesson on the method, then questions with a method checklist, hints you can open one by one, and an explanation of why each option is right or wrong. <b>Practice</b>: answer, then press Check answer to see whether you were right; only checked questions count towards your score.") + "</div>" +
      '<p class="muted">Set the options, then press <b>Coach</b> next to a test. When the method feels familiar, press <b>Practice</b>.</p></div>' +
      '<div class="train-opts">' +
      '<div class="field"><span class="field-label small muted"><label for="opt-count">Questions per round</label>' + info("count", "questions per round", "How many questions each Coach or Practice round has. Choose All to work through every question that matches your settings.", "right") + "</span>" +
      '<select id="opt-count">' + COUNTS.map(function (v) {
        return '<option value="' + v + '"' + (prefs.count === v ? " selected" : "") + ">" + (v === "all" ? "All" : v) + "</option>";
      }).join("") + "</select></div>" +
      '<div class="field"><span class="field-label small muted"><label for="opt-set">Question set</label>' + info("set", "question sets", "Leave All sets to mix every set, or pick one set. A set belongs to one test type, so pick it before pressing Coach or Practice next to that test.", "right") + "</span>" +
      '<select id="opt-set">' + setOpts + "</select></div>" +
      ORDER.map(function (k) {
        var label = SECTIONS[k].name.split(" ")[0];
        var rounds = k === "verbal" ? "Sets 10–19; 10 questions in 17 min 30 sec" : k === "numerical" ? "Sets 5–11; 10 questions in 20 min" : "Sets 5–11; 10 questions in 10 min";
        return '<div class="field"><span class="field-label small muted"><label for="opt-' + k + '-level">' + label + ' difficulty</label>' +
          info(k + "-level", label.toLowerCase() + " difficulty", "Applies to " + label.toLowerCase() + " Coach and Practice only. Choose Easy, Medium or Hard. Very hard challenge rounds are included in Hard: " + rounds + ". Select a set, 10 questions and timed practice.", "right") + "</span>" +
          '<select id="opt-' + k + '-level">' + [["all", "All levels"], ["1", "Easy"], ["2", "Medium"], ["3", "Hard"]].map(function (o) {
            return '<option value="' + o[0] + '"' + (prefs[k + "Level"] === o[0] ? " selected" : "") + ">" + o[1] + "</option>";
          }).join("") + "</select></div>";
      }).join("") +
      '<div class="check-row"><label class="check"><input type="checkbox" id="opt-timed"' + (prefs.timed ? " checked" : "") + "> Timed practice at exam pace</label>" +
      info("timed", "timed practice", "Adds a timer set to exam pace: 1 min 45 s per verbal question, 2 min per numerical question, 1 min per abstract question.", "right") + "</div>" +
      '<div class="check-row"><label class="check"><input type="checkbox" id="opt-mistakes"' + (prefs.mistakesOnly ? " checked" : "") + "> Only questions I got wrong</label>" +
      info("mistakes", "practising mistakes", "Uses only questions you answered wrongly the last time you saw them. If there are none, all questions are used.", "right") + "</div>" +
      '<div class="check-row"><label class="check"><input type="checkbox" id="opt-topics"' + (prefs.showTopics ? " checked" : "") + "> Show topic labels</label>" +
      info("topics", "topic labels", "Shows each question's topic and difficulty during Coach and Practice. Off by default because a label can hint at the answer; never shown in the exam.", "right") + "</div>" +
      "</div></div>" +
      '<div class="ttable">' + sectionRows + "</div></section>" +

      '<section class="history"><h2>Recent attempts</h2>' + histHTML + verbalTrend(hist) + "</section>" +

      '<footer class="foot"><p><b>Unofficial training tool.</b> The questions are original practice material written for this app, not EPSO items. Always check the format in your Notice of Competition.</p>' +
      '<p class="small"><b>Language.</b> EPSO tests are taken in the languages you chose in your application, and the reasoning tests are usually in your first language. This trainer is currently in English only, so practise reading in your test language too.</p>' +
      '<p class="small muted">Sources: <a href="' + EPSO_ASSESSMENT_URL + '" target="_blank" rel="noopener">EPSO: how AD5 graduates are assessed</a> · ' +
      '<a href="https://eu-careers.europa.eu/" target="_blank" rel="noopener">EU Careers</a>. Question sets loaded: ' + bank.sets.length + ". " + themeButton() + "</p></footer></div>";
  }

  function viewBrief() {
    var s = state.session;
    var rows = s.sections.map(function (sec, i) {
      return "<li><b>" + (i + 1) + ". " + esc(SECTIONS[sec.key].name) + "</b><span>" + sec.items.length + " questions · " + fmtTime(sec.limitMs / 1000) + "</span></li>";
    }).join("");
    return '<div class="card narrow"><p class="eyebrow">Exam simulation · instructions</p><h1 id="main-heading" tabindex="-1">Before you start</h1>' +
      '<ol class="brief-list">' + rows + "</ol>" +
      (s.notes.length ? '<div class="alert">' + s.notes.map(esc).join("<br>") + "</div>" : "") +
      '<ul class="rules"><li>This instruction page closes when its countdown ends and the first part starts by itself, as on TAO. Between parts there is no break: the next instruction page follows straight away.</li>' +
      "<li>Each part has its own clock, shown at the top as the minutes and seconds left. The clock keeps running if you switch tabs. When it reaches zero, the part is submitted.</li>" +
      "<li>You can move freely between the questions of the current part, bookmark any question and jump from the Overview. After submitting a part you cannot return to it.</li>" +
      "<li>Tools: highlighter, line reader, scratchpad (text and drawing) and, in numerical reasoning, the calculator. The scratchpad and calculator are windows: drag them by their header and resize them from the corner. Answer elimination and masking are switched on in Settings.</li>" +
      "<li>There is no negative marking, so answer every question.</li>" +
      "<li>Pass marks: verbal 10/20; numerical and abstract 10/20 combined. Your verbal score also counts towards the EPSO ranking, so aim well above the pass mark.</li>" +
      (prefs.examShortcuts ? "<li>Trainer shortcuts are on: <kbd>A</kbd>–<kbd>E</kbd> or <kbd>1</kbd>–<kbd>5</kbd> answer, <kbd>←</kbd> <kbd>→</kbd> change question, <kbd>F</kbd> bookmarks, <kbd>X</kbd> strikes out. TAO has no keyboard shortcuts; switch them off on the start page to rehearse mouse-only answering.</li>" : "") +
      "<li>Trainer only: if this page is closed by accident, reopen it and choose Resume; the clock keeps running meanwhile. On test day, closing or reloading the test tab or leaving full screen terminates the test.</li></ul>" +
      '<p class="instr-count">The test starts automatically in <b id="instr-timer">' + esc(instructionText(s)) + "</b>.</p>" +
      '<div class="row-actions"><button class="btn" data-act="home">Cancel</button><button class="btn btn-primary btn-lg" data-act="begin">Start ' +
      esc(SECTIONS[s.sections[0].key].name.toLowerCase()) + " now</button></div></div>";
  }

  function viewLesson() {
    var key = state.session.sections[state.session.si].key, L = window.EPSO_LESSONS[key];
    return '<div class="card lesson"><p class="eyebrow">Coach · lesson</p><h1 id="main-heading" tabindex="-1">' + esc(L.title) + "</h1>" +
      '<p class="lede">' + esc(L.format) + "</p>" +
      '<h2>The method</h2><ol class="steps">' + L.steps.map(function (st) {
        return "<li><b>" + esc(st.name) + "</b><span>" + esc(st.text) + "</span></li>";
      }).join("") + "</ol>" +
      '<h2>Common traps</h2><ul class="traps">' + L.traps.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<h2>Pacing</h2><p>' + esc(L.pacing) + "</p>" +
      '<div class="row-actions"><button class="btn" data-act="home">Back</button><button class="btn btn-primary btn-lg" data-act="begin-coach">Start training round (' +
      state.session.sections[state.session.si].items.length + " questions)</button></div></div>";
  }

  function viewSession() {
    var c = cur(), s = c.s, sec = c.sec, item = c.item, q = item.q;
    var mode = s.mode, review = s.review;
    var checked = !!sec.checked[q.id] || review;
    var last = s.qi === sec.items.length - 1;
    var answered = Object.keys(sec.answers).length;
    // E4: topic and difficulty would give away the rule, so they are hidden in the exam and optional elsewhere.
    var showTopic = review || (mode !== "exam" && prefs.showTopics);
    // N3: for abstract items the topic and difficulty would name the rules, so they wait until the answer is checked.
    var topicText = q.topic + (q.difficulty ? " · " + ["", "easy", "medium", "hard"][q.difficulty] : "");
    if (q.section === "abstract" && !checked) topicText = "Figure series";
    if (!review) { markShown(q); sec.visited[q.id] = true; }

    var head = '<header class="exam-bar"><div class="bar-left"><h1 class="chip" id="main-heading" tabindex="-1">' + esc(SECTIONS[sec.key].name) + "</h1>" +
      '<span class="pill">' + (review ? "Review" : modeLabel(mode)) + "</span>" +
      (s.sections.length > 1 ? '<span class="muted small">Test ' + (s.si + 1) + " of " + s.sections.length + "</span>" : "") + "</div>" +
      '<div class="bar-right">' + toolsHTML(sec) +
      (review ? "" : '<span id="timer" class="timer' + timerClass(sec) + '" role="timer">' + timerText(sec) + '</span><span id="timer-live" class="sr-only" aria-live="polite"></span>') +
      (review ? '<button class="btn btn-primary" data-act="results">Back to results</button>'
        : mode === "exam" ? '<button class="btn btn-primary" data-act="submit">Submit test</button>'
          : '<button class="btn" data-act="end">End round</button>') +
      "</div></header>";

    var actions = [];
    actions.push('<button class="btn" data-act="prev"' + (s.qi === 0 ? " disabled" : "") + ">← Previous</button>");
    if (!review && mode === "exam") actions.push('<button class="btn btn-flag' + (sec.flags[q.id] ? " on" : "") + '" data-act="flag" aria-pressed="' + !!sec.flags[q.id] + '">' + ICON.flag + (sec.flags[q.id] ? "Bookmarked" : "Bookmark") + "</button>");
    if (!review && mode !== "exam" && !checked) actions.push('<button class="btn btn-primary" data-act="check"' + (sec.answers[q.id] === undefined ? " disabled" : "") + ">Check answer</button>");
    if (last) {
      if (!review && mode === "exam") actions.push('<button class="btn btn-primary" data-act="submit">Submit test</button>');
      if (!review && mode !== "exam" && checked) actions.push('<button class="btn btn-primary" data-act="end">See results</button>');
    } else {
      actions.push('<button class="btn' + ((checked && !review && mode !== "exam") || mode === "exam" ? " btn-primary" : "") + '" data-act="next">Next →</button>');
    }

    var right = '<div class="qhead"><span class="qnum">Question ' + (s.qi + 1) + " of " + sec.items.length + "</span>" +
      (showTopic && q.topic ? '<span class="muted small" id="q-topic">' + esc(topicText) + "</span>" : "") + "</div>" +
      '<h2 class="stem" id="q-stem" tabindex="-1">' + esc(T(q.stem) || "Which of the following statements is correct?") + "</h2>" +
      optionsHTML(item, sec, mode) +
      (mode === "coach" && !checked ? coachPanelHTML(item, sec) : "") +
      (checked ? feedbackHTML(item, sec) : "") +
      '<div class="q-actions">' + actions.join("") + "</div>" +
      (mode === "exam" && !review ? '<p class="muted small">' + answered + " of " + sec.items.length + " answered</p>" : "");

    // Overview and instructions open beside the question (side panel), so the question stays in view.
    var panels = overviewHTML(sec) + instructionsHTML();
    var panelOpen = !review && (state.ui.overview || state.ui.instructions);
    return head + '<div class="session' + (panelOpen ? " with-panel" : "") + '">' + navHTML(sec) +
      (panelOpen ? '<aside class="side-panels" aria-label="Test overview and instructions">' + panels + "</aside>" : panels) +
      '<div class="q-layout q-' + q.section + '"><section class="stimulus" aria-label="Question material">' + stimulusHTML(item, sec) + '</section><section class="answer-pane" aria-label="Answer">' + right + "</section></div></div>" +
      toolWindowsHTML(sec) + lineReaderHTML();
  }

  function viewBetween() {
    var s = state.session, done = s.sections[s.si], next = s.sections[s.si + 1];
    // ENV-05: no answered count and no open-ended pause: TAO shows the next part's instructions with a countdown.
    return '<div class="card narrow"><p class="eyebrow">Part ' + (s.si + 2) + " of " + s.sections.length + ' · instructions</p><h1 id="main-heading" tabindex="-1">' + esc(SECTIONS[next.key].name) + "</h1>" +
      "<p>" + esc(SECTIONS[done.key].name) + " has been submitted" + (done.timedOut ? " because its time ran out" : "") + ". Scores are shown at the end, as in the real exam.</p>" +
      "<p>Next: <b>" + next.items.length + " questions in " + fmtTime(next.limitMs / 1000) + "</b>. Move freely within the part, bookmark questions and submit before the clock reaches zero.</p>" +
      '<p class="instr-count">This part starts automatically in <b id="instr-timer">' + esc(instructionText(s)) + "</b>.</p>" +
      '<div class="row-actions"><button class="btn btn-primary btn-lg" data-act="next-section">Start ' + esc(SECTIONS[next.key].name.toLowerCase()) + " now</button></div></div>";
  }

  function viewResults() {
    var s = state.session;
    var exam = s.mode === "exam";
    var verdict = exam ? verdictFor(s) : null;
    var overall = verdict ? verdict.every(function (v) { return v.pass; }) : null;
    var repeats = s.sections.reduce(function (n, sec) { return n + (sec.repeats || 0); }, 0);
    var summary = s.sections.map(function (sec) {
      var sc = score(sec), denominator = exam ? sc.total : sc.counted, pct = denominator ? Math.round((sc.correct / denominator) * 100) : 0;
      return '<div class="score-tile"><h3 class="small muted">' + esc(SECTIONS[sec.key].name) + '</h3><span class="score-big">' + sc.correct + "<small>/" + denominator + "</small></span>" +
        '<div class="meter" role="img" aria-label="' + pct + '% correct; the marker shows 50%"><i style="width:' + pct + '%"></i><b style="left:50%"></b></div>' +
        '<span class="small muted">' + pct + "% · " + fmtTime((sec.usedMs || 0) / 1000) + (sec.limitMs ? " of " + fmtTime(sec.limitMs / 1000) : "") + (s.mode === "coach" ? " · " + countHints(sec) + " hints" : "") +
        (!exam && sc.counted < sc.total ? " · " + (sc.total - sc.counted) + " not checked" : "") + "</span></div>";
    }).join("");

    // E3: gates (pass/fail) and ranking are two different messages.
    var gateHTML = verdict ? '<div class="verdict-box ' + (overall ? "ok" : "bad") + '"><h2>' + (overall ? "✓ Pass marks reached" : "✗ Below a pass mark") + "</h2><ul>" +
      verdict.map(function (v) {
        return "<li><span>" + esc(v.label) + "</span><b>" + v.correct + " / " + v.total + '</b><span class="muted small">' + v.need + " needed</span>" +
          (v.pass ? '<span class="pill pill-ok">✓ Pass</span>' : '<span class="pill pill-bad">✗ Fail</span>') + "</li>";
      }).join("") + "</ul></div>" : "";
    var verbalSec = s.sections.filter(function (x) { return x.key === "verbal"; })[0];
    var rankHTML = exam && verbalSec ? '<div class="rank-box"><h2>Your verbal score counts in the ranking</h2>' +
      "<p>Numerical and abstract reasoning are pass/fail only. Verbal reasoning is different: EPSO uses it for <b>40% of the preliminary score</b> and <b>35% of the final score</b>, so every extra point matters. EPSO does not publish cut-off scores, so aim well above the pass mark.</p>" +
      verbalTrend(load(KEY_HIST, [])) +
      '<p class="small muted">Source: <a href="' + EPSO_ASSESSMENT_URL + '" target="_blank" rel="noopener">EPSO, AD5 graduates: how you are assessed</a>.</p></div>' : "";
    var repeatHTML = exam && repeats ? '<div class="alert">' + repeats + " question" + (repeats > 1 ? "s" : "") + " in this simulation " + (repeats > 1 ? "were" : "was") + " already seen before, so the score may overstate your level.</div>" : "";

    var topics = {};
    s.sections.forEach(function (sec) {
      sec.items.forEach(function (it) {
        if (C.answerState(sec, it, s.mode) === "unchecked") return;
        var t = (SECTIONS[sec.key].name.split(" ")[0]) + " · " + (it.q.topic || "General");
        topics[t] = topics[t] || { c: 0, n: 0 };
        topics[t].n++; if (sec.answers[it.q.id] === it.q.answer) topics[t].c++;
      });
    });
    var weak = Object.keys(topics).filter(function (t) { return topics[t].c < topics[t].n; });

    var rows = s.sections.map(function (sec, si) {
      return "<h3>" + esc(SECTIONS[sec.key].name) + '</h3><ol class="review-list">' + sec.items.map(function (it, i) {
        var a = sec.answers[it.q.id], status = C.answerState(sec, it, s.mode), ok = status === "correct", unchecked = status === "unchecked";
        var yours = a === undefined ? "–" : LETTERS[it.order.indexOf(a)];
        return '<li class="' + (unchecked ? "unchecked" : ok ? "ok" : "bad") + '"><span class="rv-n" aria-hidden="true">' + (unchecked ? "–" : ok ? "✓" : "✗") + "</span>" + (unchecked ? "" : sr(ok ? "Correct." : "Incorrect.")) +
          '<span class="rv-topic">' + (i + 1) + ". " + esc(it.q.topic || "") + "</span>" +
          '<span class="rv-ans">' + (unchecked ? '<span class="small">Not checked.</span><br>' : '') + 'You: <b>' + yours + "</b> · Correct: <b>" + LETTERS[it.order.indexOf(it.q.answer)] + "</b></span>" +
          '<button class="link-btn" data-act="review" data-si="' + si + '" data-i="' + i + '" aria-label="Review question ' + (i + 1) + '">Review</button></li>';
      }).join("") + "</ol>";
    }).join("");

    var wrongCount = 0;
    s.sections.forEach(function (sec) { sec.items.forEach(function (it) { if (C.answerState(sec, it, s.mode) === "incorrect") wrongCount++; }); });

    return '<div class="results"><p class="eyebrow">' + modeLabel(s.mode) + ' · results</p><h1 id="main-heading" tabindex="-1">' + (exam ? "Your simulation result" : "Round complete") + "</h1>" +
      repeatHTML + gateHTML + rankHTML + '<div class="tiles">' + summary + "</div>" +
      (weak.length ? '<div class="weak"><h2>Topics to revisit</h2><ul>' + weak.slice(0, 8).map(function (t) { return "<li>" + esc(t) + ' <span class="muted">(' + topics[t].c + "/" + topics[t].n + ")</span></li>"; }).join("") +
        (weak.length > 8 ? '<li class="muted">and ' + (weak.length - 8) + " more. See the question review below.</li>" : "") + "</ul></div>" : "") +
      '<div class="row-actions">' +
      (wrongCount ? '<button class="btn btn-primary" data-act="retry-coach">Coach me on my ' + wrongCount + " mistake" + (wrongCount > 1 ? "s" : "") + "</button>" : "") +
      '<button class="btn" data-act="home">Back to start</button></div>' +
      '<section class="review"><h2>Question review</h2>' + rows + "</section></div>";
  }

  function confirmHTML() {
    var c = state.ui.confirm; if (!c) return "";
    return '<div class="overlay"><div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="cf-title" aria-describedby="cf-text"><h2 id="cf-title">' + esc(c.title) + '</h2><p id="cf-text">' + esc(c.text) + "</p>" +
      '<div class="row-actions"><button class="btn" data-act="cf-no">' + esc(c.no || "Cancel") + '</button><button class="btn btn-primary" data-act="cf-yes" id="cf-yes">' + esc(c.yes) + "</button></div></div></div>";
  }

  var flashTimer = null;
  function flash(msg) {
    state.notice = msg;
    render();
    clearTimeout(flashTimer);
    flashTimer = setTimeout(function () { state.notice = null; var n = document.getElementById("toast"); if (n) n.remove(); }, 4000);
  }

  /* ---------- render with focus management (W4) ---------- */
  var root;
  function focusKey(el) {
    if (!el || !root.contains(el) || el === root) return null;
    var t = el.closest("[data-act]");
    if (t) {
      var sel = '[data-act="' + t.getAttribute("data-act") + '"]';
      ["data-opt", "data-i", "data-k", "data-si"].forEach(function (a) { if (t.hasAttribute(a)) sel += "[" + a + '="' + t.getAttribute(a) + '"]'; });
      return sel;
    }
    return el.id ? "#" + el.id : null;
  }

  function render() {
    commitPadText();
    var key = focusKey(document.activeElement);
    var html;
    switch (state.view) {
      case "brief": html = viewBrief(); break;
      case "lesson": html = viewLesson(); break;
      case "session": html = viewSession(); break;
      case "between": html = viewBetween(); break;
      case "results": html = viewResults(); break;
      default: html = viewHome();
    }
    root.className = "app view-" + state.view;
    persist();
    var storageNotice = (storageUnavailable ? '<div id="storage-warning" class="alert" role="status">Saving is unavailable. Your progress is kept only in this tab and will be lost when you reload or close it.</div>' : "") +
      (storageRecovered ? '<div class="alert" role="status">Some saved data could not be restored and was reset. Your other saved progress has been kept.</div>' : "");
    root.innerHTML = '<div id="view-content"' + (state.ui.confirm ? ' inert aria-hidden="true"' : "") + '>' + storageNotice + html + '</div>' + confirmHTML() + (state.notice ? '<div id="toast" class="toast" role="status">' + esc(state.notice) + "</div>" : "");

    var target = null;
    if (state.ui.confirm) target = document.getElementById("cf-yes");
    else if (state.focus) target = document.getElementById(state.focus);
    else if (lastView !== state.view) target = document.getElementById("main-heading");
    else if (key) target = root.querySelector(key);
    if (!target && key && !state.ui.confirm) target = document.getElementById("feedback") || document.getElementById("q-stem");
    state.focus = null;
    lastView = state.view;
    if (target && target.focus) { try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); } }
    positionTips();
    mountTools();
  }

  function go(view) { state.view = view; state.ui = freshUI(); render(); window.scrollTo(0, 0); }

  /* ---------- actions ---------- */
  function move(delta) {
    var s = state.session, sec = s.sections[s.si];
    var n = s.qi + delta;
    if (n < 0 || n >= sec.items.length) return;
    gotoQ(n);
  }
  function gotoQ(n) {
    var s = state.session;
    s.qi = n; state.ui.hl = false; state.ui.showMethod = false; state.ui.optPos = null;
    state.focus = "q-stem";
    render();
    if (window.innerWidth < 900) { var el = document.querySelector(".session"); if (el) el.scrollIntoView({ block: "start" }); }
  }

  function choose(orig) {
    var c = cur(); if (!c || c.sec.checked[c.item.q.id] || c.s.review) return;
    if (toolOn("mask") && c.sec.mask[c.item.q.id] && c.sec.mask[c.item.q.id][orig]) return; // a masked option cannot be chosen
    c.sec.answers[c.item.q.id] = orig;
    if (c.sec.elim[c.item.q.id]) delete c.sec.elim[c.item.q.id][orig];
    render();
  }

  function check() {
    var c = cur(), id = c.item.q.id;
    if (c.sec.answers[id] === undefined || c.sec.checked[id]) return;
    c.sec.checked[id] = true;
    recordQuestion(c.item.q, c.sec.answers[id] === c.item.q.answer);
    state.focus = "feedback";
    render();
  }

  function toggleFlag() {
    var c = cur(); c.sec.flags[c.item.q.id] = !c.sec.flags[c.item.q.id]; render();
  }

  // ENV-03: the TAO calculator: AC clears all, CE the current entry; ▲ ▼ step through previous operations.
  function calcPress(k) {
    var ui = state.ui;
    if (CALC_EXTRA.indexOf(k) > -1 && !prefs.calcExtras) return;
    if (k === "AC" || k === "C") { ui.calcExpr = ""; ui.calcOut = ""; ui.calcPos = -1; }
    else if (k === "CE") { ui.calcExpr = C.calcClearEntry(ui.calcExpr); ui.calcOut = ""; ui.calcPos = -1; }
    else if (k === "⌫") { ui.calcExpr = ui.calcExpr.slice(0, -1); ui.calcPos = -1; }
    else if (k === "▲" || k === "▼") {
      var n = ui.calcHistory.length, pos = ui.calcPos + (k === "▲" ? 1 : -1);
      if (pos >= n || pos < -1) return;
      if (ui.calcPos === -1) ui.calcLive = ui.calcExpr;
      ui.calcPos = pos;
      if (pos === -1) { ui.calcExpr = ui.calcLive; ui.calcOut = ""; }
      else { ui.calcExpr = ui.calcHistory[pos].expression; ui.calcOut = "= " + ui.calcHistory[pos].result; }
    } else if (k === "=") {
      try { var v = C.calcEval(ui.calcExpr); ui.calcHistory.unshift({ expression: ui.calcExpr, result: String(v) }); ui.calcHistory = ui.calcHistory.slice(0, 20); ui.calcOut = "= " + v; ui.calcExpr = String(v); }
      catch (e) { ui.calcOut = "Check the expression"; }
      ui.calcPos = -1;
    } else {
      if (ui.calcExpr.length < 40) ui.calcExpr += k;
      ui.calcOut = ""; ui.calcPos = -1;
    }
    var e1 = document.getElementById("calc-expr"), e2 = document.getElementById("calc-out");
    if (e1) e1.textContent = ui.calcExpr || "0";
    if (e2) e2.textContent = ui.calcOut;
  }

  /* ---------- scratchpad drawing (ENV-02) ---------- */
  function drawPad() {
    var c = cur(), svg = document.getElementById("pad-svg");
    if (svg && c) svg.innerHTML = padSVG(padItems(c.sec));
    var win = document.getElementById("win-scratch");
    if (win && c) {
      var u = win.querySelector('[data-act="pad-undo"]'), r = win.querySelector('[data-act="pad-redo"]'), cl = win.querySelector('[data-act="pad-clear"]');
      if (u) u.disabled = !c.sec.scratchUndo.length;
      if (r) r.disabled = !c.sec.scratchRedo.length;
      if (cl) cl.disabled = !padItems(c.sec).length;
    }
  }
  function commitPad(items) {
    var c = cur(); if (!c) return;
    c.sec.scratchUndo = c.sec.scratchUndo.concat([padItems(c.sec)]).slice(-50);
    c.sec.scratchRedo = [];
    c.sec.scratch = { v: 2, items: items };
    persist(); drawPad();
  }
  function padUndo(redo) {
    var c = cur(); if (!c) return;
    var from = redo ? c.sec.scratchRedo : c.sec.scratchUndo, to = redo ? c.sec.scratchUndo : c.sec.scratchRedo;
    if (!from.length) return;
    to.push(padItems(c.sec));
    c.sec.scratch = { v: 2, items: from.pop() };
    persist(); drawPad();
  }
  function openPadText(x, y, text, editIndex) {
    var area = document.getElementById("pad-area"); if (!area) return;
    commitPadText();
    var ta = document.createElement("textarea");
    ta.id = "pad-text-input"; ta.className = "pad-text"; ta.spellcheck = false; ta.rows = 1;
    ta.setAttribute("aria-label", "Scratchpad text; Enter starts a new line, Escape cancels");
    ta.value = text || "";
    ta.style.left = Math.round(x) + "px"; ta.style.top = Math.round(y - 15) + "px";
    ta.setAttribute("data-x", x); ta.setAttribute("data-y", y);
    if (editIndex != null) {
      ta.setAttribute("data-edit", editIndex);
      var el = area.querySelector('[data-i="' + editIndex + '"]'); if (el) el.style.visibility = "hidden";
    }
    var fit = function () { ta.rows = Math.max(1, ta.value.split("\n").length); ta.style.width = Math.max(8, ta.value.split("\n").reduce(function (m, l) { return Math.max(m, l.length); }, 0) + 2) + "ch"; };
    ta.addEventListener("input", fit); fit();
    ta.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); ta.setAttribute("data-cancel", "1"); commitPadText(); }
    });
    ta.addEventListener("blur", function () { commitPadText(); });
    area.appendChild(ta);
    ta.focus();
  }
  function commitPadText() {
    var ta = document.getElementById("pad-text-input"); if (!ta) return;
    var text = ta.value.replace(/\s+$/, ""), x = +ta.getAttribute("data-x"), y = +ta.getAttribute("data-y");
    var edit = ta.hasAttribute("data-edit") ? +ta.getAttribute("data-edit") : -1, cancel = ta.hasAttribute("data-cancel");
    ta.remove();
    var c = cur(); if (!c) return;
    if (cancel) { drawPad(); return; }
    var items = padItems(c.sec).slice();
    if (edit > -1) { if (text) items[edit] = { t: "text", x: x, y: y, text: text }; else items.splice(edit, 1); }
    else if (text) items.push({ t: "text", x: x, y: y, text: text });
    else { drawPad(); return; }
    commitPad(items);
  }
  var padDrag = null;
  function padPoint(area, e) { var r = area.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function padTemp(area, tag) {
    var svg = area.querySelector("svg"), old = svg.querySelector("#pad-temp"); if (old) old.remove();
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    el.setAttribute("id", "pad-temp"); el.setAttribute("fill", "none"); el.setAttribute("stroke", "currentColor"); el.setAttribute("stroke-width", "2"); el.setAttribute("stroke-linecap", "round"); el.setAttribute("stroke-linejoin", "round");
    svg.appendChild(el); return el;
  }
  function padDown(e, area) {
    if (e.target.id === "pad-text-input") return;
    commitPadText();
    var c = cur(); if (!c) return;
    var p = padPoint(area, e), items = padItems(c.sec), tool = state.ui.tool, hit;
    if (tool === "text") {
      hit = C.scratchHit(items, p.x, p.y);
      if (hit > -1 && items[hit].t === "text") openPadText(items[hit].x, items[hit].y, items[hit].text, hit);
      else openPadText(p.x, p.y, "", null);
      e.preventDefault(); return;
    }
    if (tool === "erase") {
      hit = C.scratchHit(items, p.x, p.y);
      if (hit > -1) commitPad(items.slice(0, hit).concat(items.slice(hit + 1)));
      e.preventDefault(); return;
    }
    if (tool === "select") {
      hit = C.scratchHit(items, p.x, p.y);
      if (hit < 0) return;
      padDrag = { kind: "move", i: hit, x0: p.x, y0: p.y, el: area.querySelector('[data-i="' + hit + '"]'), moved: false };
    } else if (tool === "brush") {
      padDrag = { kind: "path", pts: [[Math.round(p.x), Math.round(p.y)]], el: padTemp(area, "polyline") };
      padDrag.el.setAttribute("points", p.x + "," + p.y);
    } else {
      padDrag = { kind: tool, x0: p.x, y0: p.y, x1: p.x, y1: p.y, el: padTemp(area, tool) };
    }
    padDrag.area = area;
    try { area.setPointerCapture(e.pointerId); } catch (x) { /* older browsers */ }
    e.preventDefault();
  }
  function padMove(e) {
    var d = padDrag, p = padPoint(d.area, e);
    if (d.kind === "move") {
      d.moved = true;
      if (d.el) d.el.setAttribute("transform", "translate(" + (p.x - d.x0) + " " + (p.y - d.y0) + ")");
    } else if (d.kind === "path") {
      var last = d.pts[d.pts.length - 1];
      if (Math.abs(last[0] - p.x) + Math.abs(last[1] - p.y) < 1.5 || d.pts.length >= 2000) return;
      d.pts.push([Math.round(p.x), Math.round(p.y)]);
      d.el.setAttribute("points", d.pts.map(function (q) { return q[0] + "," + q[1]; }).join(" "));
    } else {
      d.x1 = p.x; d.y1 = p.y;
      var sh = padShape(d);
      Object.keys(sh).forEach(function (k) { if (k !== "t") d.el.setAttribute(k === "w" ? "width" : k === "h" ? "height" : k, sh[k]); });
    }
  }
  function padShape(d) {
    var x = Math.round(Math.min(d.x0, d.x1)), y = Math.round(Math.min(d.y0, d.y1)), w = Math.round(Math.abs(d.x1 - d.x0)), h = Math.round(Math.abs(d.y1 - d.y0));
    if (d.kind === "line") return { t: "line", x1: Math.round(d.x0), y1: Math.round(d.y0), x2: Math.round(d.x1), y2: Math.round(d.y1) };
    if (d.kind === "rect") return { t: "rect", x: x, y: y, w: w, h: h };
    return { t: "ellipse", cx: x + Math.round(w / 2), cy: y + Math.round(h / 2), rx: Math.round(w / 2), ry: Math.round(h / 2) };
  }
  function padUp() {
    var d = padDrag; padDrag = null; if (!d) return;
    var c = cur(); if (!c) return;
    var items = padItems(c.sec).slice();
    if (d.kind === "move") {
      if (!d.moved) return;
      var tr = d.el && d.el.getAttribute("transform"), m = tr && tr.match(/translate\(([-\d.]+) ([-\d.]+)\)/);
      if (!m) return;
      items[d.i] = C.scratchMove(items[d.i], Math.round(+m[1]), Math.round(+m[2]));
      commitPad(items); return;
    }
    if (d.el && d.el.id === "pad-temp") d.el.remove();
    if (d.kind === "path") { items.push({ t: "path", pts: d.pts }); commitPad(items); return; }
    var sh = padShape(d), b = C.scratchBBox(sh);
    if (b.w < 3 && b.h < 3) { drawPad(); return; }
    items.push(sh); commitPad(items);
  }

  /* ---------- movable windows and the line reader ---------- */
  var winDrag = null;
  function windowDown(e, h) {
    var kind = h.getAttribute("data-win"), win, r;
    if (kind === "calc" || kind === "scratch") {
      win = document.getElementById("win-" + kind); if (!win) return;
      r = win.getBoundingClientRect();
      winDrag = { kind: "win", name: kind, el: win, dx: e.clientX - r.left, dy: e.clientY - r.top };
    } else if (kind === "lr-move") winDrag = { kind: "lr-move", y0: e.clientY, top0: state.ui.reader.top };
    else if (kind === "lr-size") winDrag = { kind: "lr-size", y0: e.clientY, h0: state.ui.reader.height };
    else return;
    try { h.setPointerCapture(e.pointerId); } catch (x) { /* older browsers */ }
    e.preventDefault();
  }
  function placeWindow(el, x, y) {
    var vw = window.innerWidth, vh = window.innerHeight;
    x = Math.max(0, Math.min(x, vw - Math.min(el.offsetWidth, vw))); y = Math.max(0, Math.min(y, vh - 48));
    el.style.left = Math.round(x) + "px"; el.style.top = Math.round(y) + "px";
  }
  function placeReader() {
    var el = document.getElementById("line-reader"), r = state.ui.reader; if (!el || !r) return;
    r.height = Math.max(24, Math.min(r.height, window.innerHeight - 24));
    r.top = Math.max(0, Math.min(r.top, window.innerHeight - r.height));
    el.style.top = Math.round(r.top) + "px"; el.style.height = Math.round(r.height) + "px";
  }
  function windowMove(e) {
    var d = winDrag;
    if (d.kind === "win") placeWindow(d.el, e.clientX - d.dx, e.clientY - d.dy);
    else if (d.kind === "lr-move") { state.ui.reader.top = d.top0 + (e.clientY - d.y0); placeReader(); }
    else { state.ui.reader.height = d.h0 + (e.clientY - d.y0); placeReader(); }
  }
  function windowUp() {
    var d = winDrag; winDrag = null; if (!d) return;
    if (d.kind === "win") saveWinFromElement(d.name, d.el);
  }
  // A window's height is stored only once the candidate has resized it (the browser then sets an inline height).
  function saveWinFromElement(name, el) {
    var prev = prefs.win[name] || WIN_DEFAULTS[name];
    saveWin(name, { x: parseFloat(el.style.left) || 0, y: parseFloat(el.style.top) || 0, w: el.offsetWidth || prev.w, h: prev.h == null && el.style.height === "" ? null : el.offsetHeight });
  }
  function nudge(h, key) {
    var kind = h.getAttribute("data-win"), dx = key === "ArrowLeft" ? -20 : key === "ArrowRight" ? 20 : 0, dy = key === "ArrowUp" ? -20 : key === "ArrowDown" ? 20 : 0;
    if (!dx && !dy) return false;
    if (kind === "calc" || kind === "scratch") {
      var el = document.getElementById("win-" + kind);
      placeWindow(el, (parseFloat(el.style.left) || 0) + dx, (parseFloat(el.style.top) || 0) + dy); saveWinFromElement(kind, el);
    } else if (kind === "lr-move") { state.ui.reader.top += dy; placeReader(); }
    else if (kind === "lr-size") { state.ui.reader.height += dy; placeReader(); }
    return true;
  }
  var resizeWatch = null;
  function mountTools() {
    var c = state.view === "session" ? cur() : null;
    if (resizeWatch) { resizeWatch.disconnect(); resizeWatch = null; }
    if (!c) return;
    ["calc", "scratch"].forEach(function (name) {
      var el = document.getElementById("win-" + name); if (!el) return;
      placeWindow(el, parseFloat(el.style.left) || 0, parseFloat(el.style.top) || 0);
      if (typeof ResizeObserver === "function") {
        resizeWatch = resizeWatch || new ResizeObserver(function (entries) {
          if (winDrag) return;
          entries.forEach(function (en) {
            var w = en.target, nm = w.id.slice(4), g = winGeom(nm), userHeight = g.h != null || w.style.height !== "";
            if (Math.abs(w.offsetWidth - g.w) > 1 || (userHeight && Math.abs(w.offsetHeight - (g.h || 0)) > 1)) saveWinFromElement(nm, w);
          });
        });
        resizeWatch.observe(el);
      }
    });
    placeReader();
    if (state.ui.padAutoText && document.getElementById("pad-area")) {
      state.ui.padAutoText = false;
      var pos = C.scratchNextTextPos(padItems(c.sec));
      openPadText(pos.x, pos.y, "", null);
    }
  }

  function startRetryCoach(s) {
    var bySec = {};
    s.sections.forEach(function (sec) { sec.items.forEach(function (it) { if (C.answerState(sec, it, s.mode) === "incorrect") (bySec[it.q.section] = bySec[it.q.section] || []).push(it.q); }); });
    var sections = ORDER.filter(function (k) { return bySec[k]; }).map(function (k) { return makeSection(k, bySec[k], null); });
    if (!sections.length) { flash("There are no checked mistakes to retry."); return; }
    state.session = { mode: "coach", sections: sections, si: 0, qi: 0, started: Date.now(), notes: [], review: false };
    if (sections.length === 1) go("lesson");
    else { startClock(sections[0]); go("session"); }
  }

  function onClick(e) {
    var t = e.target.closest("[data-act]");
    if (state.ui.confirm && (!t || ["cf-no", "cf-yes"].indexOf(t.getAttribute("data-act")) < 0)) { e.preventDefault(); return; }
    if (t && t.getAttribute("data-act") === "tip") {
      var tipId = t.getAttribute("data-k"); dismissedTip = null;
      state.ui.tip = state.ui.tip === tipId ? null : tipId;
      render(); return;
    }
    if (state.ui.tip) { state.ui.tip = null; if (!t) { render(); return; } }
    if (!t || !root.contains(t)) {
      // The eraser removes the highlight that is clicked.
      var m = e.target.closest("mark");
      if (m && state.ui.hl && state.ui.hlMode === "erase") removeHighlight(m);
      return;
    }
    if (t.getAttribute("aria-disabled") === "true") return;
    var act = t.getAttribute("data-act");
    var s = state.session;
    switch (act) {
      case "home": state.session = null; clearSaved(); go("home"); break;
      case "theme": prefs.theme = THEME_NEXT[prefs.theme]; save(KEY_PREFS, prefs); applyTheme(); state.focus = null; render(); var tb = root.querySelector('[data-act="theme"]'); if (tb) tb.focus(); break;
      case "resume": resume(); break;
      case "discard": clearSaved(); render(); break;
      case "exam": startExam(prefs.examScope); break;
      case "coach": startTraining("coach", t.getAttribute("data-k")); break;
      case "practice": startTraining("practice", t.getAttribute("data-k")); break;
      case "begin": beginSection(); break;
      case "begin-coach": startClock(s.sections[s.si]); go("session"); break;
      case "next-section": nextSection(); break;
      case "choose": state.ui.optPos = +t.id.slice(4); state.focus = t.id; choose(+t.getAttribute("data-opt")); break;
      case "strike": {
        var c = cur(), id = c.item.q.id, o = +t.getAttribute("data-opt");
        c.sec.elim[id] = c.sec.elim[id] || {};
        c.sec.elim[id][o] = !c.sec.elim[id][o];
        if (c.sec.elim[id][o] && c.sec.answers[id] === o) delete c.sec.answers[id];
        render(); break;
      }
      case "mask": {
        var cm = cur(), idm = cm.item.q.id, om = +t.getAttribute("data-opt");
        cm.sec.mask[idm] = cm.sec.mask[idm] || {};
        cm.sec.mask[idm][om] = !cm.sec.mask[idm][om];
        if (cm.sec.mask[idm][om] && cm.sec.answers[idm] === om) delete cm.sec.answers[idm];
        render(); break;
      }
      case "prev": case "nav-prev": move(-1); break;
      case "next": case "nav-next": move(1); break;
      case "goto": gotoQ(+t.getAttribute("data-i")); break;
      case "flag": toggleFlag(); break;
      case "check": check(); break;
      case "hint": { var ch = cur(); ch.sec.hints[ch.item.q.id] = (ch.sec.hints[ch.item.q.id] || 0) + 1; render(); break; }
      case "toggle-method": e.preventDefault(); state.ui.showMethod = !state.ui.showMethod; render(); break;
      case "overview": state.ui.overview = !state.ui.overview; render(); break;
      case "overview-filter": state.ui.overviewFilter = t.getAttribute("data-k"); render(); break;
      case "instructions": state.ui.instructions = !state.ui.instructions; render(); break;
      case "tool-hl": state.ui.hl = !state.ui.hl; state.ui.hlMode = "mark"; render(); break;
      case "hl-color": prefs.hlColor = +t.getAttribute("data-k"); save(KEY_PREFS, prefs); state.ui.hlMode = "mark"; render(); break;
      case "hl-erase": state.ui.hlMode = state.ui.hlMode === "erase" ? "mark" : "erase"; render(); break;
      case "tool-reader": state.ui.reader = state.ui.reader ? null : { top: Math.round(window.innerHeight * 0.4), height: 110 }; render(); break;
      // The scratchpad opens with the text tool ready: typed working starts straight away.
      case "tool-scratch": state.ui.scratch = !state.ui.scratch; if (state.ui.scratch) { state.ui.tool = "text"; state.ui.padAutoText = true; } render(); break;
      case "pad-tool": commitPadText(); state.ui.tool = t.getAttribute("data-k"); state.focus = null; render(); t = root.querySelector('[data-act="pad-tool"][data-k="' + state.ui.tool + '"]'); if (t) t.focus(); break;
      case "pad-undo": commitPadText(); padUndo(false); break;
      case "pad-redo": padUndo(true); break;
      case "pad-clear": commitPadText(); if (padItems(cur().sec).length) commitPad([]); break;
      // Opening moves focus into the calculator, so Enter evaluates instead of pressing the toolbar button again.
      case "tool-calc": state.ui.calc = !state.ui.calc; if (state.ui.calc) state.focus = "calc-eq"; render(); break;
      case "calc": calcPress(t.getAttribute("data-k")); break;
      case "settings": state.ui.settings = !state.ui.settings; state.ui.a11y = false; render(); break;
      case "a11y-toggle": state.ui.a11y = !state.ui.a11y; state.ui.settings = false; render(); break;
      case "a11y": { var ak = t.getAttribute("data-k"); prefs.a11y[ak] = Math.max(0, Math.min(6, prefs.a11y[ak] + (+t.getAttribute("data-d")))); save(KEY_PREFS, prefs); applyA11y(); render(); break; }
      case "a11y-reset": prefs.a11y = mergeA11y(null); prefs.theme = "system"; prefs.zoom = 100; save(KEY_PREFS, prefs); applyTheme(); render(); break;
      case "zoom": prefs.zoom = Math.max(50, Math.min(200, prefs.zoom + 10 * (+t.getAttribute("data-d")))); save(KEY_PREFS, prefs); applyA11y(); render(); break;
      case "zoom-reset": prefs.zoom = 100; save(KEY_PREFS, prefs); applyA11y(); render(); break;
      case "clear-hl": { var cc = cur(); delete cc.sec.hl[cc.item.q.id]; state.focus = "passage"; render(); break; }
      case "submit": {
        // ENV-09: the two TAO dialogs: with unanswered questions "Keep answering", otherwise "Review my answers".
        var sec = cur().sec, sc = C.sectionScore(sec, "exam"), un = sc.total - sc.answered, lastPart = s.si === s.sections.length - 1;
        state.ui.confirm = {
          returnFocus: focusKey(t),
          title: lastPart ? "You have reached the end of the test. Are you sure you want to submit it for scoring?" : "Are you sure you want to submit this part and proceed to the next one?",
          text: un ? "You still have " + un + " incomplete question" + (un > 1 ? "s" : "") + ". If you submit this part you won't be able to go back to complete unanswered questions or change your answers."
            : "You won't be able to go back to review or change your answers after submission.",
          no: un ? "Keep answering" : "Review my answers", yes: lastPart ? "Submit the test" : "Submit and proceed", act: "submit"
        };
        render(); break;
      }
      case "end": {
        var secE = cur().sec, open = secE.items.filter(function (it) { return !secE.checked[it.q.id]; }).length;
        if (open && s.mode !== "exam") {
          state.ui.confirm = { returnFocus: focusKey(t), title: "End this round?", text: open + " question" + (open > 1 ? "s have" : " has") + " not been checked. Unchecked questions do not count towards your score.", yes: "End round", act: "end" };
          render();
        } else finishSession();
        break;
      }
      case "cf-no": closeConfirm(); break;
      case "cf-yes": {
        var a = state.ui.confirm && state.ui.confirm.act; state.ui.confirm = null;
        if (a === "submit") submitSection(false); else if (a === "end") finishSession();
        break;
      }
      case "review": s.review = true; s.si = +t.getAttribute("data-si"); s.qi = +t.getAttribute("data-i"); go("session"); break;
      case "results": s.review = false; go("results"); break;
      case "retry-coach": startRetryCoach(s); break;
    }
  }

  function onChange(e) {
    var id = e.target.id;
    if (id === "exam-scope") { prefs.examScope = e.target.value; save(KEY_PREFS, prefs); render(); return; }
    else if (id === "exam-form") prefs.examForm = e.target.value;
    else if (id === "opt-count") prefs.count = e.target.value;
    else if (id === "opt-set") prefs.setId = e.target.value;
    else if (/^opt-(verbal|numerical|abstract)-level$/.test(id)) prefs[id.split("-")[1] + "Level"] = e.target.value;
    else if (id === "opt-timed") prefs.timed = e.target.checked;
    else if (id === "opt-mistakes") prefs.mistakesOnly = e.target.checked;
    else if (id === "opt-topics") prefs.showTopics = e.target.checked;
    else if (id === "opt-shortcuts") prefs.examShortcuts = e.target.checked;
    else if (id === "opt-calc-extras") prefs.calcExtras = e.target.checked;
    else if (id === "set-elim" || id === "set-mask") {
      var exam = state.session && state.session.mode === "exam";
      prefs[(id === "set-elim" ? "elim" : "mask") + (exam ? "Exam" : "Train")] = e.target.checked;
      save(KEY_PREFS, prefs); render(); return;
    }
    else if (id === "set-announce") prefs.a11y.announce = e.target.checked;
    else if (e.target.name === "a11y-theme") { prefs.theme = e.target.value; save(KEY_PREFS, prefs); applyTheme(); render(); return; }
    else return;
    save(KEY_PREFS, prefs);
  }

  function onInput() { /* the scratchpad commits its text boxes itself (commitPadText) */ }

  /* ---------- highlighter (W6: offsets per paragraph, never raw HTML) ---------- */
  function textOffset(pEl, node, offset) {
    var r = document.createRange();
    r.selectNodeContents(pEl);
    try { r.setEnd(node, offset); } catch (e) { return 0; }
    return r.toString().length;
  }
  function onSelectionEnd() {
    if (!state.ui.hl) return;
    var passage = document.getElementById("passage"); if (!passage) return;
    var sel = window.getSelection(); if (!sel || sel.isCollapsed || !sel.rangeCount) return;
    var r = sel.getRangeAt(0);
    if (!passage.contains(r.commonAncestorContainer) && r.commonAncestorContainer !== passage) return;
    var c = cur(), list = c.sec.hl[c.item.q.id] || [];
    var ps = passage.querySelectorAll("p[data-p]");
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i];
      if (!r.intersectsNode(p)) continue;
      var len = p.textContent.length;
      var s = p.contains(r.startContainer) ? textOffset(p, r.startContainer, r.startOffset) : 0;
      var e = p.contains(r.endContainer) ? textOffset(p, r.endContainer, r.endOffset) : len;
      list = state.ui.hlMode === "erase" ? C.removeRange(list, +p.getAttribute("data-p"), Math.min(s, len), Math.min(e, len))
        : C.addRange(list, +p.getAttribute("data-p"), Math.min(s, len), Math.min(e, len), prefs.hlColor);
    }
    c.sec.hl[c.item.q.id] = list;
    sel.removeAllRanges();
    render();
  }
  function removeHighlight(m) {
    var p = m.closest("p[data-p]"); if (!p) return;
    var pi = +p.getAttribute("data-p");
    var start = textOffset(p, m, 0), end = start + m.textContent.length;
    var c = cur();
    c.sec.hl[c.item.q.id] = (c.sec.hl[c.item.q.id] || []).filter(function (r) { return !(r.p === pi && r.s < end && r.e > start); });
    render();
  }

  /* ---------- keyboard (W1, W7) ---------- */
  var CALC_KEYS = { "*": "×", x: "×", X: "×", "/": "÷", "-": "−", "+": "+", "(": "(", ")": ")", "^": "^", ".": ".", Enter: "=", "=": "=", Backspace: "⌫", Delete: "AC", c: "AC", C: "AC", ArrowUp: "▲", ArrowDown: "▼" };
  function closeConfirm() {
    var selector = state.ui.confirm && state.ui.confirm.returnFocus;
    state.ui.confirm = null; render();
    var target = selector && root.querySelector(selector); if (target) target.focus();
  }
  var dismissedTip = null;
  function dismissTips() {
    root.querySelectorAll(".tip.open").forEach(function (tip) {
      tip.classList.remove("open"); var btn = tip.parentNode.querySelector("button");
      btn.setAttribute("aria-expanded", "false"); dismissedTip = btn.getAttribute("data-k");
    });
    state.ui.tip = null;
  }
  function positionTip(tip) {
    // Phone/touch help uses the bottom card defined in CSS. Desktop help follows its trigger.
    if (window.matchMedia("(max-width: 560px), (hover: none)").matches) { tip.removeAttribute("style"); return; }
    var anchor = tip.parentNode.querySelector("button").getBoundingClientRect();
    tip.style.position = "fixed"; tip.style.left = "0px"; tip.style.top = "0px"; tip.style.right = "auto"; tip.style.bottom = "auto";
    var box = tip.getBoundingClientRect();
    var left = tip.parentNode.classList.contains("tip-r") ? anchor.right - box.width : anchor.left - 6;
    var top = anchor.bottom + 6;
    if (top + box.height > window.innerHeight - 8) top = anchor.top - box.height - 6;
    tip.style.left = Math.max(8, Math.min(left, window.innerWidth - box.width - 8)) + "px";
    tip.style.top = Math.max(8, Math.min(top, window.innerHeight - box.height - 8)) + "px";
  }
  function positionTips() {
    if (root) root.querySelectorAll(".tip.open").forEach(positionTip);
  }
  function tipEnter(e) {
    var wrap = e.target.closest && e.target.closest(".info-wrap");
    if (!wrap || (e.relatedTarget && wrap.contains(e.relatedTarget))) return;
    var btn = wrap.querySelector("button"), id = btn.getAttribute("data-k");
    if (dismissedTip === id) return;
    root.querySelectorAll(".tip.open").forEach(function (tip) {
      if (tip.parentNode !== wrap) { tip.classList.remove("open"); tip.parentNode.querySelector("button").setAttribute("aria-expanded", "false"); }
    });
    if (state.ui.tip && state.ui.tip !== id) state.ui.tip = null;
    var tip = wrap.querySelector(".tip"); tip.classList.add("open"); btn.setAttribute("aria-expanded", "true"); positionTip(tip);
  }
  function tipLeave(e) {
    var wrap = e.target.closest && e.target.closest(".info-wrap");
    if (!wrap || (e.relatedTarget && wrap.contains(e.relatedTarget))) return;
    var btn = wrap.querySelector("button"), id = btn.getAttribute("data-k");
    dismissedTip = null;
    if (state.ui.tip !== id) { wrap.querySelector(".tip").classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  }
  function onKey(e) {
    if (state.ui.confirm) {
      if (e.key === "Escape") { e.preventDefault(); closeConfirm(); }
      if (e.key === "Tab") {
        var buttons = root.querySelectorAll(".dialog button"), index = Array.prototype.indexOf.call(buttons, document.activeElement);
        buttons[(index + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus(); e.preventDefault();
      }
      return;
    }
    if (e.key === "Escape" && root.querySelector(".tip.open")) { dismissTips(); e.preventDefault(); return; }
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "textarea" || tag === "input" || tag === "select" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest && e.target.closest(".table-wrap, .chart-wrap") && /^(Arrow|Home|End|Page)/.test(e.key)) return;
    if (state.view !== "session") return;
    var c = cur(); if (!c) return;
    var k = e.key;
    // Window headers and the line reader handles move with the arrow keys (keyboard equivalent of dragging).
    var handle = e.target.closest && e.target.closest("[data-win]");
    if (handle && nudge(handle, k)) { e.preventDefault(); return; }
    // Escape closes the overview, instructions, settings and accessibility panels (the calculator handles its own Escape first).
    if (k === "Escape" && !state.ui.calc && (state.ui.overview || state.ui.instructions || state.ui.settings || state.ui.a11y)) {
      state.ui.overview = false; state.ui.instructions = false; state.ui.settings = false; state.ui.a11y = false; state.focus = "q-stem"; render(); e.preventDefault(); return;
    }

    var onControl = e.target.closest && e.target.closest("button, a, summary");
    var inCalc = e.target === document.body || (e.target.closest && e.target.closest(".tool-panel.calc"));

    // W1: while the calculator is open, the keyboard drives the calculator, never the answers.
    // N5: Enter goes to the calculator only from the calculator itself (or nowhere in particular);
    // on any other focused button it keeps its normal meaning.
    if (state.ui.calc && !(k === "Enter" && onControl && !inCalc) && !(e.target.closest && e.target.closest(".tool-win.pad"))) {
      if (/^[0-9]$/.test(k)) { calcPress(k); e.preventDefault(); return; }
      if (CALC_KEYS[k]) { calcPress(CALC_KEYS[k]); e.preventDefault(); return; }
      if (k === "Escape") { state.ui.calc = false; render(); e.preventDefault(); return; }
      if (k.length === 1) return;
    }
    if (e.target.closest && e.target.closest(".tool-panel")) return;

    // W7: Enter and Space keep their normal meaning on focused controls.
    if ((k === "Enter" || k === " ") && onControl) return;

    // ENV-04: TAO has no keyboard answer shortcuts. In the exam simulation they are off unless enabled on the start page;
    // the radio-group arrow keys below remain, as they are standard behaviour of a focused option list.
    var strict = c.s.mode === "exam" && !c.s.review && !prefs.examShortcuts;

    // N4: WAI-ARIA radio group. Arrows move (and select) within the options; X strikes out the focused option.
    var group = e.target.closest && e.target.closest(".opts");
    if (group) {
      var lis = Array.prototype.slice.call(group.children), p = lis.indexOf(e.target.closest("li")), n = lis.length;
      var locked = !!c.sec.checked[c.item.q.id] || c.s.review;
      var np = k === "Home" ? 0 : k === "End" ? n - 1 : k === "ArrowDown" || k === "ArrowRight" ? (p + 1) % n : k === "ArrowUp" || k === "ArrowLeft" ? (p - 1 + n) % n : -1;
      if (np > -1 && p > -1) {
        state.ui.optPos = np; state.focus = "opt-" + np;
        if (locked) render(); else choose(c.item.order[np]);
        e.preventDefault(); return;
      }
      if ((k === "x" || k === "X") && p > -1 && !locked && !strict && toolOn("elim")) {
        var orig = c.item.order[p], el = c.sec.elim[c.item.q.id] = c.sec.elim[c.item.q.id] || {};
        el[orig] = !el[orig];
        if (el[orig] && c.sec.answers[c.item.q.id] === orig) delete c.sec.answers[c.item.q.id];
        state.focus = "opt-" + p; render(); e.preventDefault(); return;
      }
    }
    if (strict) return;

    var idx = "abcde".indexOf(k.toLowerCase());
    if (idx === -1 && /^[1-5]$/.test(k)) idx = +k - 1;
    if (idx > -1 && idx < c.item.order.length && k.length === 1) {
      if (group) { state.ui.optPos = idx; state.focus = "opt-" + idx; }
      choose(c.item.order[idx]); e.preventDefault(); return;
    }
    if (k === "ArrowRight") { move(1); e.preventDefault(); }
    else if (k === "ArrowLeft") { move(-1); e.preventDefault(); }
    else if ((k === "f" || k === "F") && c.s.mode === "exam" && !c.s.review) toggleFlag();
    else if (k === "Enter" && c.s.mode !== "exam" && !c.s.review) {
      if (!c.sec.checked[c.item.q.id]) check(); else move(1);
      e.preventDefault();
    }
  }

  /* ---------- boot ---------- */
  function boot() {
    root = document.getElementById("app");
    applyTheme();
    buildBank();
    root.addEventListener("click", onClick);
    root.addEventListener("mouseover", tipEnter);
    root.addEventListener("mouseout", tipLeave);
    root.addEventListener("focusin", tipEnter);
    root.addEventListener("focusout", tipLeave);
    root.addEventListener("change", onChange);
    root.addEventListener("input", onInput);
    root.addEventListener("mouseup", onSelectionEnd);
    root.addEventListener("touchend", onSelectionEnd);
    root.addEventListener("keyup", function (e) { if (e.key && e.key.indexOf("Arrow") === 0 && e.shiftKey) onSelectionEnd(); });
    document.addEventListener("keydown", onKey);
    // Pointer handling for the movable tool windows, the line reader and the scratchpad drawing area.
    root.addEventListener("pointerdown", function (e) {
      if (e.button) return;
      var pad = e.target.closest && e.target.closest("#pad-area");
      if (pad) { padDown(e, pad); return; }
      var h = e.target.closest && e.target.closest("[data-win]");
      if (!h || (h.tagName !== "BUTTON" && e.target.closest("button, input, textarea"))) return;
      windowDown(e, h);
    });
    document.addEventListener("pointermove", function (e) { if (winDrag) windowMove(e); else if (padDrag) padMove(e); });
    document.addEventListener("pointerup", function () { if (winDrag) windowUp(); else if (padDrag) padUp(); });
    document.addEventListener("pointercancel", function () { if (winDrag) windowUp(); else if (padDrag) padUp(); });
    window.addEventListener("resize", function () { positionTips(); mountTools(); });
    window.addEventListener("scroll", positionTips, true);
    // N13: the same saved session written from another tab would overwrite this one's progress.
    window.addEventListener("storage", function (e) {
      if (e.key !== KEY_SESSION || !e.newValue || !state.session || state.session.finished || state.session.review) return;
      var other = null; try { other = JSON.parse(e.newValue); } catch (err) { return; }
      if (other && other.tab && other.tab !== TAB_ID && !state.otherTab) {
        state.otherTab = true;
        flash("This trainer is also open in another tab. Continue in one tab only: each tab saves over the other's unfinished session.");
      }
    });
    render();
  }

  function loadSets(done) {
    var files = window.EPSO_BUNDLED ? [] : (window.EPSO_SET_FILES || []);
    var i = 0;
    (function next() {
      if (i >= files.length) return done();
      var f = files[i++];
      var el = document.createElement("script");
      el.src = "questions/" + f + (window.EPSO_VERSION ? "?v=" + encodeURIComponent(window.EPSO_VERSION) : "");
      el.onload = next;
      el.onerror = function () { bank.errors.push("Could not load questions/" + f + "."); next(); };
      document.body.appendChild(el);
    })();
  }

  window.EPSO_APP = { state: state, bank: bank };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { loadSets(boot); });
  else loadSets(boot);
})();
