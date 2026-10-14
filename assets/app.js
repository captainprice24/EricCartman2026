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
  function load(k, d) {
    try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; }
  }
  function save(k, v) {
    try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ }
  }
  function remove(k) {
    try { window.localStorage.removeItem(k); } catch (e) { /* storage unavailable */ }
  }

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
    examScope: ["full", "verbal", "numerical", "abstract"].indexOf(prefs.examScope) > -1 ? prefs.examScope : "full",
    showTopics: prefs.showTopics === true, // N3: off by default; labels can hint at the rule
    theme: ["system", "light", "dark"].indexOf(prefs.theme) > -1 ? prefs.theme : "system",
    lang: prefs.lang || "en"
  };
  function T(v) { return C.tr(v, prefs.lang); }
  function applyTheme() {
    var el = document.documentElement;
    if (prefs.theme === "system") el.removeAttribute("data-theme");
    else el.setAttribute("data-theme", prefs.theme);
  }

  /* ---------- state ---------- */
  var state = { view: "home", session: null, ui: freshUI(), notice: null, focus: null };
  var lastView = null;
  function freshUI() {
    return { hl: false, scratch: false, calc: false, calcExpr: "", calcOut: "", confirm: null, showMethod: false, optPos: null, tip: null };
  }

  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }

  function makeSection(key, questions, limitSec) {
    return {
      key: key,
      items: questions.map(function (q) {
        return { q: q, order: q.shuffle ? C.shuffle(range(q.options.length)) : range(q.options.length) };
      }),
      answers: {}, flags: {}, elim: {}, hints: {}, checked: {}, hl: {},
      scratch: "", limitMs: limitSec ? limitSec * 1000 : null, startedAt: null, deadline: null, usedMs: null,
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
    var sections = keys.map(function (k) {
      var S = SECTIONS[k];
      var drawn = C.drawExam(bank.bySection[k], S.examCount, stats);
      var limit = S.examMinutes * 60;
      if (drawn.items.length < S.examCount) {
        limit = Math.round((S.examMinutes * 60 * drawn.items.length) / S.examCount);
        notes.push(S.name + ": the bank has " + drawn.items.length + " of " + S.examCount + " questions, so the time is scaled to " + fmtTime(limit) + ".");
      }
      if (drawn.repeats) notes.push(S.name + ": " + drawn.repeats + " of " + drawn.items.length + " questions are ones you have seen before, because the unseen ones have run out. Your score may overstate your level.");
      var sec = makeSection(k, drawn.items, limit);
      sec.repeats = drawn.repeats;
      return sec;
    }).filter(function (s) { return s.items.length > 0; });
    if (!sections.length) { flash("No questions are available for this test yet."); return; }
    state.session = { mode: "exam", sections: sections, si: 0, qi: 0, started: Date.now(), notes: notes, review: false };
    go("brief");
  }

  function startTraining(mode, key) {
    var qs = pickPractice(key);
    if (!qs.length) { flash("No " + SECTIONS[key].name.toLowerCase() + " questions match these settings."); return; }
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
      v: 1, tab: TAB_ID, mode: s.mode, si: s.si, qi: s.qi, started: s.started, notes: s.notes, view: state.view,
      sections: s.sections.map(function (sec) {
        return {
          key: sec.key, ids: sec.items.map(function (it) { return it.q.id; }), orders: sec.items.map(function (it) { return it.order; }),
          answers: sec.answers, flags: sec.flags, elim: sec.elim, hints: sec.hints, checked: sec.checked, hl: sec.hl,
          scratch: sec.scratch, limitMs: sec.limitMs, startedAt: sec.startedAt, deadline: sec.deadline, usedMs: sec.usedMs,
          done: sec.done, timedOut: sec.timedOut, repeats: sec.repeats, warned: sec.warned
        };
      })
    };
  }
  function deserialize(d) {
    if (!d || d.v !== 1 || !d.sections) return null;
    var ok = true;
    var sections = d.sections.map(function (x) {
      var items = x.ids.map(function (id, i) { var q = bank.byId[id]; if (!q) ok = false; return { q: q, order: x.orders[i] }; });
      return {
        key: x.key, items: items, answers: x.answers || {}, flags: x.flags || {}, elim: x.elim || {}, hints: x.hints || {},
        checked: x.checked || {}, hl: x.hl || {}, scratch: x.scratch || "", limitMs: x.limitMs, startedAt: x.startedAt,
        deadline: x.deadline, usedMs: x.usedMs, done: !!x.done, timedOut: !!x.timedOut, repeats: x.repeats || 0, warned: x.warned || {}
      };
    });
    if (!ok) return null;
    return { mode: d.mode, sections: sections, si: d.si, qi: d.qi, started: d.started, notes: d.notes || [], review: false, savedView: d.view };
  }
  function persist() {
    var s = state.session;
    if (s && !s.finished && !s.review && ["brief", "lesson", "session", "between"].indexOf(state.view) > -1) save(KEY_SESSION, serialize(s));
  }
  function savedSession() { return deserialize(load(KEY_SESSION, null)); }
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
      at: Date.now(), mode: s.mode,
      sections: s.sections.map(function (sec) {
        var sc = score(sec);
        return { key: sec.key, correct: sc.correct, total: sc.total, hints: countHints(sec), usedSec: Math.round((sec.usedMs || 0) / 1000), limitSec: sec.limitMs ? sec.limitMs / 1000 : null, repeats: sec.repeats || 0 };
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
    if (s.si < s.sections.length - 1) go("between");
    else finishSession();
  }

  /* ---------- timer (W2: deadline based) ---------- */
  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  function timerText(sec) {
    var now = Date.now();
    var rem = C.remainingMs(sec, now);
    return rem != null ? fmtTime(Math.ceil(rem / 1000)) + " left" : fmtTime(C.elapsedMs(sec, now) / 1000);
  }
  function timerClass(sec) {
    var rem = C.remainingMs(sec, Date.now());
    if (rem == null) return "";
    return rem <= 60000 ? " crit" : rem <= 300000 ? " warn" : "";
  }

  function tick() {
    var s = state.session;
    if (!s || s.review || s.finished) return;
    // An exam whose deadline passed while the page was closed or asleep is submitted on return.
    if (state.view === "between" || state.view === "brief" || state.view === "lesson") return;
    if (state.view !== "session") return;
    var c = cur(); if (!c || c.sec.done) return;
    var rem = C.remainingMs(c.sec, Date.now());
    var el = document.getElementById("timer");
    if (el) { el.textContent = timerText(c.sec); el.className = "timer" + timerClass(c.sec); }
    if (rem != null) {
      var live = document.getElementById("timer-live");
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
    mark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 3.5l6 6-9 9H5.5v-6zM4 21h16" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>'
  };
  function modeLabel(m) { return m === "exam" ? "Exam simulation" : m === "coach" ? "Coach" : "Practice"; }
  function sr(text) { return '<span class="sr-only">' + esc(text) + "</span>"; }

  function paragraphs(q) { return String(T(q.passage) || "").split(/\n\s*\n/); }

  function passageHTML(q, sec) {
    var ranges = sec.hl[q.id] || [];
    return paragraphs(q).map(function (text, p) {
      return '<p data-p="' + p + '">' + C.segments(text, ranges, p).map(function (sg) {
        return sg.mark ? '<mark data-p="' + p + '">' + esc(sg.text) + "</mark>" : esc(sg.text);
      }).join("") + "</p>";
    }).join("");
  }

  function stimulusHTML(item, sec) {
    var q = item.q, review = state.session.review;
    var main;
    if (q.section === "verbal") {
      main = '<div class="stim-head"><span class="eyebrow">Reading passage</span>' +
        (review || !(sec.hl[q.id] || []).length ? "" : '<button class="link-btn" data-act="clear-hl">Clear highlights</button>') + "</div>" +
        (state.ui.hl ? '<p class="hl-hint">Highlighter on: select text to highlight it, click a highlight to remove it.</p>' : "") +
        '<div class="passage' + (state.ui.hl ? " hl-on" : "") + '" id="passage">' + passageHTML(q, sec) + "</div>";
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
    return main + toolTrayHTML(sec);
  }

  // W9: tools are docked in the stimulus column so they never cover the answers.
  function toolTrayHTML(sec) {
    var ui = state.ui, out = "";
    if (state.session.review || (!ui.scratch && !ui.calc)) return "";
    if (ui.calc) {
      var keys = ["C", "(", ")", "⌫", "7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ".", "√", "+", "^"];
      out += '<section class="tool-panel calc" aria-label="Calculator"><div class="pop-head"><h2>Calculator</h2><button class="link-btn" data-act="tool-calc">Close</button></div>' +
        '<div class="calc-screen" aria-live="polite"><div class="calc-expr" id="calc-expr">' + esc(ui.calcExpr || "0") + '</div><div class="calc-out" id="calc-out">' + esc(ui.calcOut) + "</div></div>" +
        '<div class="calc-keys">' + keys.map(function (k) {
          var label = { "÷": "divide", "×": "multiply", "−": "minus", "+": "plus", "⌫": "delete last character", C: "clear", "√": "square root", "^": "to the power of" }[k];
          return '<button data-act="calc" data-k="' + esc(k) + '"' + (label ? ' aria-label="' + label + '"' : "") + ">" + esc(k) + "</button>";
        }).join("") +
        '<button class="calc-eq" data-act="calc" data-k="=" aria-label="equals">=</button></div>' +
        '<p class="small muted">The keys follow the basic calculator of TAO, the platform EPSO uses. It has no % key: type 15% as ÷100 (200×15÷100 = 30). The keyboard works while the calculator is open.</p></section>';
    }
    if (ui.scratch) {
      out += '<section class="tool-panel" aria-label="Scratchpad"><div class="pop-head"><h2><label for="scratch">Scratchpad</label></h2><button class="link-btn" data-act="tool-scratch">Close</button></div>' +
        '<textarea id="scratch" spellcheck="false" placeholder="Notes and working…">' + esc(sec.scratch) + "</textarea></section>";
    }
    return '<div class="tool-tray">' + out + "</div>";
  }

  function optionsHTML(item, sec, mode) {
    var q = item.q, id = q.id;
    var chosen = sec.answers[id];
    var checked = !!sec.checked[id] || state.session.review;
    var elim = sec.elim[id] || {};
    var isFig = q.section === "abstract";
    var showAllNotes = mode === "coach" || state.session.review;
    // N4: one tab stop for the group (roving tabindex): the focused, else the chosen, else the first option.
    var rove = state.ui.optPos != null ? state.ui.optPos : chosen !== undefined && item.order.indexOf(chosen) > -1 ? item.order.indexOf(chosen) : 0;
    var list = item.order.map(function (orig, pos) {
      var cls = ["opt"], status = "";
      if (chosen === orig) cls.push("chosen");
      if (elim[orig]) cls.push("struck");
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
      return '<li class="' + cls.join(" ") + '" role="none">' +
        '<button class="opt-main" id="opt-' + pos + '" role="radio" tabindex="' + (pos === rove ? 0 : -1) + '" data-act="choose" data-opt="' + orig + '"' + (checked ? ' aria-disabled="true"' : ' aria-keyshortcuts="X"') + ' aria-checked="' + (chosen === orig) + '">' +
        '<span class="letter">' + LETTERS[pos] + "</span>" + '<span class="opt-body">' + content + note + "</span>" + status + "</button>" +
        (checked ? "" : '<button class="strike" tabindex="-1" data-act="strike" data-opt="' + orig + '" aria-pressed="' + !!elim[orig] + '" aria-label="Strike out option ' + LETTERS[pos] + ' (key X)">✕</button>') +
        "</li>";
    }).join("");
    return '<ol class="opts' + (isFig ? " opts-fig" : "") + '" role="radiogroup" aria-labelledby="q-stem" aria-describedby="opts-help">' + list + "</ol>" +
      '<p id="opts-help" class="sr-only">Use the arrow keys to move between options' + (checked ? "." : " and X to strike out the focused option.") + "</p>";
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
    var head = chosen === undefined
      ? '<p class="verdict verdict-skip">✗ Not answered. The correct answer is <b>' + LETTERS[pos] + "</b>.</p>"
      : ok ? '<p class="verdict verdict-ok">✓ Correct.</p>'
        : '<p class="verdict verdict-bad">✗ Not quite. The correct answer is <b>' + LETTERS[pos] + "</b>.</p>";
    var steps = T(q.solution);
    var sol = steps && steps.length
      ? '<div class="solution"><span class="eyebrow">Worked solution</span><ol>' + steps.map(function (s) { return "<li>" + esc(T(s)) + "</li>"; }).join("") + "</ol></div>" : "";
    var exp = q.explanation ? '<div class="takeaway"><span class="eyebrow">Key takeaway</span><p>' + esc(T(q.explanation)) + "</p></div>" : "";
    return '<div class="feedback" id="feedback" tabindex="-1">' + head + sol + exp + "</div>";
  }

  function navHTML(sec) {
    var s = state.session;
    return '<nav class="qnav" aria-label="Questions">' + sec.items.map(function (it, i) {
      var id = it.q.id, cls = ["qdot"], states = [];
      if (sec.answers[id] !== undefined) { cls.push("answered"); states.push("answered"); } else states.push("not answered");
      if (sec.flags[id]) { cls.push("flagged"); states.push("flagged"); }
      if (sec.checked[id] || s.review) {
        var right = sec.answers[id] === it.q.answer;
        cls.push(right ? "ok" : "bad"); states.push(right ? "correct" : "incorrect");
      }
      if (i === s.qi) cls.push("current");
      return '<button class="' + cls.join(" ") + '" data-act="goto" data-i="' + i + '"' + (i === s.qi ? ' aria-current="step"' : "") +
        ' aria-label="Question ' + (i + 1) + ": " + states.join(", ") + '">' + (i + 1) + "</button>";
    }).join("") + '</nav><div class="legend-row small muted" aria-hidden="true"><span><i class="lg lg-ans"></i>Answered</span><span><i class="lg"></i>Not answered</span><span><i class="lg lg-flag"></i>Flagged</span>' +
      (s.review || s.mode !== "exam" ? '<span><i class="lg lg-ok">✓</i>Correct</span><span><i class="lg lg-bad">✗</i>Incorrect</span>' : "") + "</div>";
  }

  function toolsHTML(sec) {
    var ui = state.ui, k = sec.key, out = "";
    if (state.session.review) return "";
    if (k === "verbal") out += '<button class="tool' + (ui.hl ? " on" : "") + '" data-act="tool-hl" aria-pressed="' + ui.hl + '" title="Select words in the text to highlight them; click a highlight to remove it">' + ICON.mark + "<span>Highlight</span></button>";
    out += '<button class="tool' + (ui.scratch ? " on" : "") + '" data-act="tool-scratch" aria-pressed="' + ui.scratch + '" title="Notes for this test, kept while you move between questions">' + ICON.note + "<span>Scratchpad</span></button>";
    if (k === "numerical") out += '<button class="tool' + (ui.calc ? " on" : "") + '" data-act="tool-calc" aria-pressed="' + ui.calc + '" title="On-screen calculator; you can also type on the keyboard">' + ICON.calc + "<span>Calculator</span></button>";
    return '<div class="tools" role="group" aria-label="Tools">' + out + "</div>";
  }

  // Small "i" button with a tip: shown on hover, on keyboard focus, and on tap (phones). Never inside a <label>,
  // because a click there would also toggle the labelled control.
  function info(id, about, text, align) {
    var open = state.ui.tip === id;
    return '<span class="info-wrap' + (align === "right" ? " tip-r" : "") + '"><button type="button" class="info-btn" data-act="tip" data-k="' + id + '" aria-label="More about ' + esc(about) +
      '" aria-describedby="tip-' + id + '" aria-expanded="' + open + '"><span aria-hidden="true">i</span></button>' +
      '<span role="tooltip" id="tip-' + id + '" class="tip' + (open ? " open" : "") + '">' + text + "</span></span>";
  }

  function themeButton() {
    var next = { system: "light", light: "dark", dark: "system" }[prefs.theme];
    var label = { system: "Theme: system", light: "Theme: light", dark: "Theme: dark" }[prefs.theme];
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
      return '<div class="trow">' +
        '<div class="tcell tname"><h3>' + esc(S.name) + '</h3><span class="muted small">Exam: ' + S.examCount + " questions · " + S.examMinutes + " min</span></div>" +
        '<div class="tcell tstat"><span class="big-num">' + qs.length + '</span><span class="muted small">in bank · ' + unseen + " unseen</span></div>" +
        '<div class="tcell tstat"><span class="big-num">' + (acc === null ? "–" : acc + "%") + '</span><span class="muted small">' + (seen ? "accuracy · " + wrongNow + " to revisit" : "not started") + "</span></div>" +
        '<div class="tcell tact"><button class="btn btn-primary" data-act="coach" data-k="' + k + '">Coach</button><button class="btn" data-act="practice" data-k="' + k + '">Practice</button></div>' +
        "</div>";
    }).join("");

    var setOpts = '<option value="all">All sets</option>' + bank.sets.map(function (s) {
      return '<option value="' + esc(s.id) + '"' + (prefs.setId === s.id ? " selected" : "") + ">" + esc(s.title) + " (" + s.count + ")</option>";
    }).join("");

    var histHTML = hist.length ? '<ul class="hist">' + hist.slice(0, 8).map(function (h) {
      var d = new Date(h.at);
      var parts = h.sections.map(function (s) {
        if (!SECTIONS[s.key]) return "";
        return SECTIONS[s.key].name.split(" ")[0] + " " + s.correct + "/" + s.total + (s.usedSec ? " in " + fmtTime(s.usedSec) : "");
      }).join(" · ");
      var badge = h.pass === null ? "" : h.pass ? '<span class="pill pill-ok">✓ Passed gates</span>' : '<span class="pill pill-bad">✗ Below a pass mark</span>';
      return "<li><span class=\"hist-date\">" + d.toLocaleDateString(undefined, { day: "numeric", month: "short" }) + " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) +
        '</span><span class="hist-mode">' + modeLabel(h.mode) + '</span><span class="hist-score">' + esc(parts) + "</span>" + badge + "</li>";
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
      '<div><dt>Verbal</dt><dd><b>20</b> q · <b>35</b> min</dd><dd class="muted small">pass 10/20 · counts in ranking ' + info("rank", "the verbal ranking", "Verbal reasoning is the only reasoning test that counts towards your place in the ranking: 40% of the preliminary score and 35% of the final score. Numerical and abstract only need to be passed.") + "</dd></div>" +
      '<div><dt>Numerical</dt><dd><b>10</b> q · <b>20</b> min</dd><dd class="muted small">pass 10/20 combined ' + info("combined", "the combined pass mark", "Numerical and abstract share one pass mark: at least 10 correct out of the 20 questions of both tests together. A strong abstract score can make up for a weaker numerical one.") + "</dd></div>" +
      '<div><dt>Abstract</dt><dd><b>10</b> q · <b>10</b> min</dd><dd class="muted small">with numerical</dd></div>' +
      "</dl></header>" +

      '<section class="howto" aria-labelledby="howto-h"><h2 id="howto-h">How to use this trainer</h2><ol>' +
      "<li><b>Learn with Coach.</b> Pick a test below and press <b>Coach</b>: a short lesson, then questions with hints and an explanation of every option.</li>" +
      "<li><b>Drill with Practice.</b> Press <b>Practice</b> to answer questions and check each one straight away.</li>" +
      "<li><b>Test yourself.</b> Choose a test type in <b>Exam simulation</b> and start it. It is timed like the real exam, with results at the end.</li>" +
      "</ol><p class=\"small muted\">Your progress is saved in this browser only. " + info("saved", "saved progress", "Results, mistakes and an unfinished exam are stored on this device, in this browser. Another browser or device starts fresh, and private browsing may not keep them.") + "</p></section>" +

      '<section class="exam-card"><div><h2>Exam simulation ' + info("exam", "the exam simulation", "Like the real test: each test has its own timer, there are no hints, and you see your score and the explanations only at the end. If you close the page, reopen it and choose Resume; the clock keeps running.") + "</h2>" + '<p class="muted">Timed and in the EPSO format: question navigator, flags, strike-out, highlighter, scratchpad and calculator. No hints or feedback until the end. You get questions you have not seen before first, in a mix of difficulty levels.</p>' +
      '<p class="fresh">' + (fresh > 0 ? fresh + " full simulation" + (fresh > 1 ? "s" : "") + " left with unseen questions" : "No full simulation left with only unseen questions: new ones will include repeats") + " " +
      info("fresh", "unseen questions", "Each simulation uses questions you have not seen yet, in Coach, Practice or an earlier simulation. When they run out, repeats are used and your score may look better than it would on the day.") + "</p></div>" +
      '<div class="exam-start"><span class="field-label"><label for="exam-scope">Choose test type</label>' +
      info("scope", "test types", "<b>All three tests</b> runs verbal, numerical and abstract one after the other, as on exam day (65 min). Choose a single test to practise its timing on its own.", "right") + "</span>" +
      '<select id="exam-scope">' +
      [["full", "All three tests (65 min)"], ["verbal", "Verbal only (35 min)"], ["numerical", "Numerical only (20 min)"], ["abstract", "Abstract only (10 min)"]].map(function (o) {
        return '<option value="' + o[0] + '"' + (prefs.examScope === o[0] ? " selected" : "") + ">" + o[1] + "</option>";
      }).join("") + '</select><button class="btn btn-primary btn-lg" data-act="exam">Start simulation</button><span class="small muted">Step 3: when you feel ready</span></div></section>' +

      '<section class="train"><div class="train-head"><div><h2>Train by test</h2><p class="muted"><b>Coach</b> ' +
      info("coach", "Coach mode", "Start here for each test type. A short lesson on the method, then questions with a method checklist, hints you can open one by one, and an explanation of why each option is right or wrong.") +
      " teaches the method, gives step-by-step hints and explains every option. <b>Practice</b> " +
      info("practice", "Practice mode", "Answer, then press Check answer to see whether you were right. Only questions you check count towards your score. Turn on Timed practice to work at exam pace.") +
      " checks each answer straight away. Set the options here, then press <b>Coach</b> or <b>Practice</b> next to a test.</p></div>" +
      '<div class="train-opts">' +
      '<div class="field"><span class="field-label small muted"><label for="opt-count">Questions per round</label>' + info("count", "questions per round", "How many questions each Coach or Practice round has. Choose All to work through every question that matches your settings.", "right") + "</span>" +
      '<select id="opt-count">' + COUNTS.map(function (v) {
        return '<option value="' + v + '"' + (prefs.count === v ? " selected" : "") + ">" + (v === "all" ? "All" : v) + "</option>";
      }).join("") + "</select></div>" +
      '<div class="field"><span class="field-label small muted"><label for="opt-set">Question set</label>' + info("set", "question sets", "Practise one set or mix all of them. Each set covers one test type; the number of questions is in brackets.", "right") + "</span>" +
      '<select id="opt-set">' + setOpts + "</select></div>" +
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
    return '<div class="card narrow"><p class="eyebrow">Exam simulation</p><h1 id="main-heading" tabindex="-1">Before you start</h1>' +
      '<ol class="brief-list">' + rows + "</ol>" +
      (s.notes.length ? '<div class="alert">' + s.notes.map(esc).join("<br>") + "</div>" : "") +
      '<ul class="rules"><li>Each test has its own timer, which keeps running if you switch tabs or close the page. When it runs out, the test is submitted automatically.</li>' +
      "<li>If the page is closed by accident, reopen it and choose Resume.</li>" +
      "<li>You can move freely between questions in a test and flag them to come back to.</li>" +
      "<li>Keyboard: A–E or 1–5 to answer, the arrow keys to move between options, X to strike out the focused option, F to flag. Outside the options, ← and → change question.</li>" +
      "<li>There is no negative marking, so answer every question.</li>" +
      "<li>Pass marks: verbal 10/20; numerical and abstract 10/20 combined. Your verbal score also counts towards the EPSO ranking, so aim well above the pass mark.</li>" +
      "<li>Shortcuts: <kbd>A</kbd>–<kbd>E</kbd> to answer, <kbd>←</kbd> <kbd>→</kbd> to move, <kbd>F</kbd> to flag.</li></ul>" +
      '<div class="row-actions"><button class="btn" data-act="home">Cancel</button><button class="btn btn-primary btn-lg" data-act="begin">Start ' +
      esc(SECTIONS[s.sections[0].key].name.toLowerCase()) + "</button></div></div>";
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
    // N3: for abstract items the topic and difficulty (rules − 1) would name the rules, so they wait until the answer is checked.
    var topicText = q.topic + (q.difficulty ? " · " + ["", "easier", "medium", "harder"][q.difficulty] : "");
    if (q.section === "abstract" && !checked) topicText = "Figure series";
    if (!review) markShown(q);

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
    if (!review && mode === "exam") actions.push('<button class="btn btn-flag' + (sec.flags[q.id] ? " on" : "") + '" data-act="flag" aria-pressed="' + !!sec.flags[q.id] + '">' + ICON.flag + (sec.flags[q.id] ? "Flagged" : "Flag") + "</button>");
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

    return head + '<div class="session">' + navHTML(sec) +
      '<div class="q-layout q-' + q.section + '"><section class="stimulus" aria-label="Question material">' + stimulusHTML(item, sec) + '</section><section class="answer-pane" aria-label="Answer">' + right + "</section></div></div>";
  }

  function viewBetween() {
    var s = state.session, done = s.sections[s.si], next = s.sections[s.si + 1];
    var sc = score(done);
    return '<div class="card narrow"><p class="eyebrow">Test ' + (s.si + 1) + " of " + s.sections.length + ' complete</p><h1 id="main-heading" tabindex="-1">' + esc(SECTIONS[done.key].name) + " submitted</h1>" +
      "<p>" + (done.timedOut ? "Time ran out. " : "") + "You answered " + sc.answered + " of " + sc.total + " questions in " + fmtTime((done.usedMs || 0) / 1000) + ". Scores are shown at the end, as in the real exam.</p>" +
      "<p>Next: <b>" + esc(SECTIONS[next.key].name) + "</b>, " + next.items.length + " questions in " + fmtTime(next.limitMs / 1000) + ". Its timer starts when you press Start.</p>" +
      '<div class="row-actions"><button class="btn btn-primary btn-lg" data-act="next-section">Start ' + esc(SECTIONS[next.key].name.toLowerCase()) + "</button></div></div>";
  }

  function viewResults() {
    var s = state.session;
    var exam = s.mode === "exam";
    var verdict = exam ? verdictFor(s) : null;
    var overall = verdict ? verdict.every(function (v) { return v.pass; }) : null;
    var repeats = s.sections.reduce(function (n, sec) { return n + (sec.repeats || 0); }, 0);
    var summary = s.sections.map(function (sec) {
      var sc = score(sec), pct = sc.total ? Math.round((sc.correct / sc.total) * 100) : 0;
      return '<div class="score-tile"><h3 class="small muted">' + esc(SECTIONS[sec.key].name) + '</h3><span class="score-big">' + sc.correct + "<small>/" + sc.total + "</small></span>" +
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
        var t = (SECTIONS[sec.key].name.split(" ")[0]) + " · " + (it.q.topic || "General");
        topics[t] = topics[t] || { c: 0, n: 0 };
        topics[t].n++; if (sec.answers[it.q.id] === it.q.answer) topics[t].c++;
      });
    });
    var weak = Object.keys(topics).filter(function (t) { return topics[t].c < topics[t].n; });

    var rows = s.sections.map(function (sec, si) {
      return "<h3>" + esc(SECTIONS[sec.key].name) + '</h3><ol class="review-list">' + sec.items.map(function (it, i) {
        var a = sec.answers[it.q.id], ok = a === it.q.answer;
        var yours = a === undefined ? "–" : LETTERS[it.order.indexOf(a)];
        return '<li class="' + (ok ? "ok" : "bad") + '"><span class="rv-n" aria-hidden="true">' + (ok ? "✓" : "✗") + "</span>" + sr(ok ? "Correct." : "Incorrect.") +
          '<span class="rv-topic">' + (i + 1) + ". " + esc(it.q.topic || "") + "</span>" +
          '<span class="rv-ans">You: <b>' + yours + "</b> · Correct: <b>" + LETTERS[it.order.indexOf(it.q.answer)] + "</b></span>" +
          '<button class="link-btn" data-act="review" data-si="' + si + '" data-i="' + i + '" aria-label="Review question ' + (i + 1) + '">Review</button></li>';
      }).join("") + "</ol>";
    }).join("");

    var wrongCount = 0;
    s.sections.forEach(function (sec) { sec.items.forEach(function (it) { if (sec.answers[it.q.id] !== it.q.answer) wrongCount++; }); });

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
    root.innerHTML = html + confirmHTML() + (state.notice ? '<div id="toast" class="toast" role="status">' + esc(state.notice) + "</div>" : "");
    persist();

    var target = null;
    if (state.ui.confirm) target = document.getElementById("cf-yes");
    else if (state.focus) target = document.getElementById(state.focus);
    else if (lastView !== state.view) target = document.getElementById("main-heading");
    else if (key) target = root.querySelector(key);
    if (!target && key && !state.ui.confirm) target = document.getElementById("feedback") || document.getElementById("q-stem");
    state.focus = null;
    lastView = state.view;
    if (target && target.focus) { try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); } }
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

  function calcPress(k) {
    var ui = state.ui;
    if (k === "C") { ui.calcExpr = ""; ui.calcOut = ""; }
    else if (k === "⌫") ui.calcExpr = ui.calcExpr.slice(0, -1);
    else if (k === "=") {
      try { var v = C.calcEval(ui.calcExpr); ui.calcOut = "= " + v; ui.calcExpr = String(v); }
      catch (e) { ui.calcOut = "Check the expression"; }
    } else {
      if (ui.calcExpr.length < 40) ui.calcExpr += k;
      ui.calcOut = "";
    }
    var e1 = document.getElementById("calc-expr"), e2 = document.getElementById("calc-out");
    if (e1) e1.textContent = ui.calcExpr || "0";
    if (e2) e2.textContent = ui.calcOut;
  }

  function startRetryCoach(s) {
    var bySec = {};
    s.sections.forEach(function (sec) { sec.items.forEach(function (it) { if (sec.answers[it.q.id] !== it.q.answer) (bySec[it.q.section] = bySec[it.q.section] || []).push(it.q); }); });
    var sections = ORDER.filter(function (k) { return bySec[k]; }).map(function (k) { return makeSection(k, bySec[k], null); });
    state.session = { mode: "coach", sections: sections, si: 0, qi: 0, started: Date.now(), notes: [], review: false };
    if (sections.length === 1) go("lesson");
    else { startClock(sections[0]); go("session"); }
  }

  function onClick(e) {
    var t = e.target.closest("[data-act]");
    if (t && t.getAttribute("data-act") === "tip") {
      var tipId = t.getAttribute("data-k");
      state.ui.tip = state.ui.tip === tipId ? null : tipId;
      render(); return;
    }
    if (state.ui.tip) { state.ui.tip = null; if (!t) { render(); return; } }
    if (!t || !root.contains(t)) {
      // Click on a highlight while the highlighter is on removes it.
      var m = e.target.closest("mark");
      if (m && state.ui.hl) removeHighlight(m);
      return;
    }
    if (t.getAttribute("aria-disabled") === "true") return;
    var act = t.getAttribute("data-act");
    var s = state.session;
    switch (act) {
      case "home": state.session = null; clearSaved(); go("home"); break;
      case "theme": prefs.theme = { system: "light", light: "dark", dark: "system" }[prefs.theme]; save(KEY_PREFS, prefs); applyTheme(); state.focus = null; render(); var tb = root.querySelector('[data-act="theme"]'); if (tb) tb.focus(); break;
      case "resume": resume(); break;
      case "discard": clearSaved(); render(); break;
      case "exam": startExam(prefs.examScope); break;
      case "coach": startTraining("coach", t.getAttribute("data-k")); break;
      case "practice": startTraining("practice", t.getAttribute("data-k")); break;
      case "begin": case "begin-coach": startClock(s.sections[s.si]); go("session"); break;
      case "next-section": s.si++; s.qi = 0; startClock(s.sections[s.si]); go("session"); break;
      case "choose": choose(+t.getAttribute("data-opt")); break;
      case "strike": {
        var c = cur(), id = c.item.q.id, o = +t.getAttribute("data-opt");
        c.sec.elim[id] = c.sec.elim[id] || {};
        c.sec.elim[id][o] = !c.sec.elim[id][o];
        if (c.sec.elim[id][o] && c.sec.answers[id] === o) delete c.sec.answers[id];
        render(); break;
      }
      case "prev": move(-1); break;
      case "next": move(1); break;
      case "goto": gotoQ(+t.getAttribute("data-i")); break;
      case "flag": toggleFlag(); break;
      case "check": check(); break;
      case "hint": { var ch = cur(); ch.sec.hints[ch.item.q.id] = (ch.sec.hints[ch.item.q.id] || 0) + 1; render(); break; }
      case "toggle-method": e.preventDefault(); state.ui.showMethod = !state.ui.showMethod; render(); break;
      case "tool-hl": state.ui.hl = !state.ui.hl; render(); break;
      case "tool-scratch": state.ui.scratch = !state.ui.scratch; if (state.ui.scratch) state.focus = "scratch"; render(); break;
      case "tool-calc": state.ui.calc = !state.ui.calc; render(); break;
      case "calc": calcPress(t.getAttribute("data-k")); break;
      case "clear-hl": { var cc = cur(); delete cc.sec.hl[cc.item.q.id]; state.focus = "passage"; render(); break; }
      case "submit": {
        var sec = cur().sec, sc = C.sectionScore(sec, "exam"), un = sc.total - sc.answered, fl = Object.keys(sec.flags).filter(function (k) { return sec.flags[k]; }).length;
        state.ui.confirm = {
          title: "Submit " + SECTIONS[sec.key].name.toLowerCase() + "?",
          text: (un ? un + " question" + (un > 1 ? "s are" : " is") + " unanswered. " : "All questions are answered. ") + (fl ? fl + " flagged. " : "") + "You cannot return to this test after submitting.",
          yes: "Submit test", act: "submit"
        };
        render(); break;
      }
      case "end": {
        var secE = cur().sec, open = secE.items.filter(function (it) { return !secE.checked[it.q.id]; }).length;
        if (open && s.mode !== "exam") {
          state.ui.confirm = { title: "End this round?", text: open + " question" + (open > 1 ? "s have" : " has") + " not been checked. Unchecked questions do not count towards your score.", yes: "End round", act: "end" };
          render();
        } else finishSession();
        break;
      }
      case "cf-no": state.ui.confirm = null; render(); break;
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
    if (id === "exam-scope") prefs.examScope = e.target.value;
    else if (id === "opt-count") prefs.count = e.target.value;
    else if (id === "opt-set") prefs.setId = e.target.value;
    else if (id === "opt-timed") prefs.timed = e.target.checked;
    else if (id === "opt-mistakes") prefs.mistakesOnly = e.target.checked;
    else if (id === "opt-topics") prefs.showTopics = e.target.checked;
    else return;
    save(KEY_PREFS, prefs);
  }

  function onInput(e) {
    if (e.target.id === "scratch") { var c = cur(); if (c) { c.sec.scratch = e.target.value; persist(); } }
  }

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
      list = C.addRange(list, +p.getAttribute("data-p"), Math.min(s, len), Math.min(e, len));
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
  var CALC_KEYS = { "*": "×", x: "×", X: "×", "/": "÷", "-": "−", "+": "+", "(": "(", ")": ")", "^": "^", ".": ".", ",": ".", Enter: "=", "=": "=", Backspace: "⌫", Delete: "C", c: "C", C: "C" };
  function onKey(e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "textarea" || tag === "input" || tag === "select" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (state.ui.confirm) {
      if (e.key === "Escape") { state.ui.confirm = null; render(); }
      return;
    }
    if (state.ui.tip && e.key === "Escape") { state.ui.tip = null; render(); return; }
    if (state.view !== "session") return;
    var c = cur(); if (!c) return;
    var k = e.key;

    var onControl = e.target.closest && e.target.closest("button, a, summary");
    var inCalc = e.target === document.body || (e.target.closest && e.target.closest(".tool-panel.calc"));

    // W1: while the calculator is open, the keyboard drives the calculator, never the answers.
    // N5: Enter goes to the calculator only from the calculator itself (or nowhere in particular);
    // on any other focused button it keeps its normal meaning.
    if (state.ui.calc && !(k === "Enter" && onControl && !inCalc)) {
      if (/^[0-9]$/.test(k)) { calcPress(k); e.preventDefault(); return; }
      if (CALC_KEYS[k]) { calcPress(CALC_KEYS[k]); e.preventDefault(); return; }
      if (k === "Escape") { state.ui.calc = false; render(); e.preventDefault(); return; }
      if (k.length === 1) return;
    }
    if (e.target.closest && e.target.closest(".tool-panel")) return;

    // W7: Enter and Space keep their normal meaning on focused controls.
    if ((k === "Enter" || k === " ") && onControl) return;

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
      if ((k === "x" || k === "X") && p > -1 && !locked) {
        var orig = c.item.order[p], el = c.sec.elim[c.item.q.id] = c.sec.elim[c.item.q.id] || {};
        el[orig] = !el[orig];
        if (el[orig] && c.sec.answers[c.item.q.id] === orig) delete c.sec.answers[c.item.q.id];
        state.focus = "opt-" + p; render(); e.preventDefault(); return;
      }
    }

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
    root.addEventListener("change", onChange);
    root.addEventListener("input", onInput);
    root.addEventListener("mouseup", onSelectionEnd);
    root.addEventListener("touchend", onSelectionEnd);
    root.addEventListener("keyup", function (e) { if (e.key && e.key.indexOf("Arrow") === 0 && e.shiftKey) onSelectionEnd(); });
    document.addEventListener("keydown", onKey);
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
      el.src = "questions/" + f;
      el.onload = next;
      el.onerror = function () { bank.errors.push("Could not load questions/" + f + "."); next(); };
      document.body.appendChild(el);
    })();
  }

  window.EPSO_APP = { state: state, bank: bank };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { loadSets(boot); });
  else loadSets(boot);
})();
