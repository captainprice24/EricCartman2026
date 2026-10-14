/*
 * AD5 Reasoning Trainer: single-page app, no build step, no dependencies.
 * Views: home → (lesson) → session → (between) → results → review.
 */
(function () {
  "use strict";

  var R = window.EPSO_RENDER;
  var esc = R.esc;
  var LETTERS = ["A", "B", "C", "D", "E", "F"];

  var SECTIONS = {
    verbal: { key: "verbal", name: "Verbal reasoning", examCount: 20, examMinutes: 35, perQ: 105 },
    numerical: { key: "numerical", name: "Numerical reasoning", examCount: 10, examMinutes: 20, perQ: 120 },
    abstract: { key: "abstract", name: "Abstract reasoning", examCount: 10, examMinutes: 10, perQ: 60 }
  };
  var ORDER = ["verbal", "numerical", "abstract"];

  /* ---------- storage (best effort) ---------- */
  var KEY_HIST = "ad5trainer.history.v1";
  var KEY_STATS = "ad5trainer.qstats.v1";
  var KEY_PREFS = "ad5trainer.prefs.v1";
  function load(k, d) {
    try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; }
  }
  function save(k, v) {
    try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ }
  }

  /* ---------- question bank ---------- */
  var bank = { all: [], byId: {}, bySection: { verbal: [], numerical: [], abstract: [] }, sets: [], errors: [] };

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
        bank.all.push(q);
        bank.byId[q.id] = q;
        bank.bySection[set.section].push(q);
        added++;
      });
      bank.sets.push({ id: set.id, title: set.title, section: set.section, description: set.description || "", count: added });
    });
  }

  /* ---------- state ---------- */
  var prefs = load(KEY_PREFS, { count: 10, timed: false, setId: "all", mistakesOnly: false, examScope: "full" });
  var state = { view: "home", session: null, ui: freshUI(), notice: null };
  function freshUI() {
    return { hl: false, scratch: false, calc: false, calcExpr: "", calcOut: "", confirm: null, showMethod: false };
  }

  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }

  function makeSection(key, questions, timeLimit) {
    return {
      key: key,
      items: questions.map(function (q) {
        return { q: q, order: q.shuffle ? shuffle(range(q.options.length)) : range(q.options.length) };
      }),
      answers: {}, flags: {}, elim: {}, hints: {}, checked: {}, passage: {},
      scratch: "", timeLimit: timeLimit, elapsed: 0, done: false, timedOut: false
    };
  }

  function pickQuestions(key, opts) {
    var pool = bank.bySection[key].slice();
    if (opts.setId && opts.setId !== "all") pool = pool.filter(function (q) { return q.setId === opts.setId; });
    if (opts.mistakesOnly) {
      var stats = load(KEY_STATS, {});
      var wrong = pool.filter(function (q) { return stats[q.id] && stats[q.id].last === false; });
      if (wrong.length) pool = wrong;
    }
    pool = shuffle(pool);
    return opts.count ? pool.slice(0, opts.count) : pool;
  }

  function startExam(scope) {
    var keys = scope === "full" ? ORDER : [scope];
    var notes = [];
    var sections = keys.map(function (k) {
      var S = SECTIONS[k];
      var qs = pickQuestions(k, { count: S.examCount });
      var limit = S.examMinutes * 60;
      if (qs.length < S.examCount) {
        limit = Math.round((S.examMinutes * 60 * qs.length) / S.examCount);
        notes.push(S.name + ": the bank has " + qs.length + " of " + S.examCount + " questions, so the time is scaled to " + fmtTime(limit) + ".");
      }
      return makeSection(k, qs, limit);
    }).filter(function (s) { return s.items.length > 0; });
    if (!sections.length) { flash("No questions are available for this test yet."); return; }
    state.session = { mode: "exam", sections: sections, si: 0, qi: 0, started: Date.now(), notes: notes, review: false };
    state.ui = freshUI();
    state.view = "brief";
    render();
  }

  function startTraining(mode, key) {
    var qs = pickQuestions(key, { count: prefs.count === "all" ? 0 : +prefs.count, setId: prefs.setId, mistakesOnly: prefs.mistakesOnly });
    if (!qs.length) { flash("No " + SECTIONS[key].name.toLowerCase() + " questions match these settings."); return; }
    var timed = mode === "practice" && prefs.timed;
    var sec = makeSection(key, qs, timed ? qs.length * SECTIONS[key].perQ : null);
    state.session = { mode: mode, sections: [sec], si: 0, qi: 0, started: Date.now(), notes: [], review: false };
    state.ui = freshUI();
    state.view = mode === "coach" ? "lesson" : "session";
    render();
  }

  function cur() {
    var s = state.session; if (!s) return null;
    var sec = s.sections[s.si];
    return { s: s, sec: sec, item: sec.items[s.qi], S: SECTIONS[sec.key] };
  }

  /* ---------- scoring & stats ---------- */
  function sectionScore(sec) {
    var c = 0;
    sec.items.forEach(function (it) { if (sec.answers[it.q.id] === it.q.answer) c++; });
    return { correct: c, total: sec.items.length, answered: Object.keys(sec.answers).length };
  }

  function recordQuestion(q, correct) {
    var st = load(KEY_STATS, {});
    var e = st[q.id] || { seen: 0, correct: 0 };
    e.seen++; if (correct) e.correct++; e.last = !!correct; e.at = Date.now();
    st[q.id] = e;
    save(KEY_STATS, st);
  }

  function examVerdict(s) {
    var by = {};
    s.sections.forEach(function (sec) { by[sec.key] = sectionScore(sec); });
    var out = [];
    if (by.verbal) {
      var need = Math.ceil(by.verbal.total / 2);
      out.push({ label: "Verbal reasoning", detail: by.verbal.correct + " / " + by.verbal.total, need: need + " needed", pass: by.verbal.correct >= need });
    }
    if (by.numerical || by.abstract) {
      var c = (by.numerical ? by.numerical.correct : 0) + (by.abstract ? by.abstract.correct : 0);
      var t = (by.numerical ? by.numerical.total : 0) + (by.abstract ? by.abstract.total : 0);
      var n2 = Math.ceil(t / 2);
      var lbl = by.numerical && by.abstract ? "Numerical + abstract (combined)" : by.numerical ? "Numerical reasoning" : "Abstract reasoning";
      out.push({ label: lbl, detail: c + " / " + t, need: n2 + " needed", pass: c >= n2 });
    }
    return out;
  }

  function finishSession() {
    var s = state.session;
    // Coach rounds that span several tests move on to the next test first.
    if (s.mode === "coach" && s.si < s.sections.length - 1) {
      s.sections[s.si].done = true; s.si++; s.qi = 0; go("session"); return;
    }
    s.finished = Date.now();
    if (s.mode === "exam") {
      s.sections.forEach(function (sec) {
        sec.items.forEach(function (it) { recordQuestion(it.q, sec.answers[it.q.id] === it.q.answer); });
      });
    }
    var hist = load(KEY_HIST, []);
    var verdict = s.mode === "exam" ? examVerdict(s) : null;
    hist.unshift({
      at: Date.now(), mode: s.mode,
      sections: s.sections.map(function (sec) {
        var sc = sectionScore(sec);
        return { key: sec.key, correct: sc.correct, total: sc.total, hints: countHints(sec) };
      }),
      pass: verdict ? verdict.every(function (v) { return v.pass; }) : null
    });
    save(KEY_HIST, hist.slice(0, 60));
    state.view = "results";
    state.ui = freshUI();
    render();
  }

  function countHints(sec) {
    var n = 0; Object.keys(sec.hints).forEach(function (k) { n += sec.hints[k]; }); return n;
  }

  function submitSection(timedOut) {
    var s = state.session, sec = s.sections[s.si];
    sec.done = true; sec.timedOut = !!timedOut;
    state.ui = freshUI();
    if (s.si < s.sections.length - 1) { state.view = "between"; render(); }
    else finishSession();
  }

  /* ---------- timer ---------- */
  setInterval(function () {
    if (state.view !== "session" || !state.session || state.session.review) return;
    if (state.ui.confirm && state.session.mode !== "exam") return;
    var c = cur(); if (!c || c.sec.done) return;
    c.sec.elapsed++;
    var el = document.getElementById("timer");
    if (el) {
      el.textContent = timerText(c.sec);
      el.className = "timer" + timerClass(c.sec);
    }
    if (c.sec.timeLimit && c.sec.elapsed >= c.sec.timeLimit) {
      state.ui.confirm = null;
      if (state.session.mode === "exam") submitSection(true);
      else { finishSession(); }
      flash("Time is up. Your answers so far have been submitted.");
    }
  }, 1000);

  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  function timerText(sec) {
    return sec.timeLimit ? fmtTime(sec.timeLimit - sec.elapsed) + " left" : fmtTime(sec.elapsed);
  }
  function timerClass(sec) {
    if (!sec.timeLimit) return "";
    var left = sec.timeLimit - sec.elapsed;
    return left <= 60 ? " crit" : left <= 300 ? " warn" : "";
  }

  /* ---------- calculator ---------- */
  function calcEval(expr) {
    var src = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
    var toks = src.match(/\d*\.?\d+|[-+*/()%]/g);
    if (!toks || toks.join("") !== src.replace(/\s+/g, "")) throw new Error("bad");
    var out = [], ops = [], prec = { "+": 1, "-": 1, "*": 2, "/": 2, "u": 3 };
    var prev = null;
    toks.forEach(function (t) {
      if (/^[\d.]/.test(t)) out.push(parseFloat(t));
      else if (t === "%") out.push("%");
      else if (t === "(") ops.push(t);
      else if (t === ")") {
        while (ops.length && ops[ops.length - 1] !== "(") out.push(ops.pop());
        if (!ops.length) throw new Error("paren");
        ops.pop();
      } else {
        var op = t === "-" && (prev === null || /[-+*/(]/.test(prev)) ? "u" : t;
        while (ops.length && ops[ops.length - 1] !== "(" && op !== "u" && prec[ops[ops.length - 1]] >= prec[op]) out.push(ops.pop());
        ops.push(op);
      }
      prev = t;
    });
    while (ops.length) { var o = ops.pop(); if (o === "(") throw new Error("paren"); out.push(o); }
    var st = [];
    out.forEach(function (t) {
      if (typeof t === "number") st.push(t);
      else if (t === "%") { if (!st.length) throw new Error("bad"); st.push(st.pop() / 100); }
      else if (t === "u") { if (!st.length) throw new Error("bad"); st.push(-st.pop()); }
      else {
        var b = st.pop(), a = st.pop();
        if (a === undefined || b === undefined) throw new Error("bad");
        st.push(t === "+" ? a + b : t === "-" ? a - b : t === "*" ? a * b : a / b);
      }
    });
    if (st.length !== 1 || !isFinite(st[0])) throw new Error("bad");
    return +st[0].toPrecision(12);
  }

  /* ---------- rendering helpers ---------- */
  var ICON = {
    flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H7v9z"/></svg>',
    calc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v4h10V5zm0 6v2h2v-2zm4 0v2h2v-2zm4 0v6h2v-6zm-8 4v2h2v-2zm4 0v2h2v-2z"/></svg>',
    note: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h10l4 4v14H5zm9 1v4h4M8 12h8M8 15h8M8 18h5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    mark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 3.5l6 6-9 9H5.5v-6zM4 21h16" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>'
  };

  function sectionChip(key) {
    return '<span class="chip chip-' + key + '">' + esc(SECTIONS[key].name) + "</span>";
  }
  function modeLabel(m) { return m === "exam" ? "Exam simulation" : m === "coach" ? "Coach" : "Practice"; }

  function stimulusHTML(item, sec) {
    var q = item.q;
    if (q.section === "verbal") {
      var html = sec.passage[q.id] || (q.passage || "").split(/\n\s*\n/).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
      return '<div class="stim-head"><span class="eyebrow">Reading passage</span>' +
        (state.session.review ? "" : '<button class="link-btn" data-act="clear-hl">Clear highlights</button>') + "</div>" +
        '<div class="passage' + (state.ui.hl ? " hl-on" : "") + '" id="passage">' + html + "</div>";
    }
    if (q.section === "numerical") {
      return '<div class="stim-head"><span class="eyebrow">Data</span></div>' + R.exhibitHTML(q.exhibit);
    }
    var seq = (q.sequence || []).map(function (f, i) {
      return '<div class="frame"><span class="frame-n">' + (i + 1) + "</span>" + R.figureSVG(f, "Series figure " + (i + 1)) + "</div>";
    }).join("");
    return '<div class="stim-head"><span class="eyebrow">Series</span></div><div class="series">' + seq +
      '<div class="frame frame-q"><span class="frame-n">?</span><span class="qmark">?</span></div></div>';
  }

  function optionsHTML(item, sec, mode) {
    var q = item.q, id = q.id;
    var chosen = sec.answers[id];
    var checked = !!sec.checked[id] || state.session.review;
    var elim = sec.elim[id] || {};
    var isFig = q.section === "abstract";
    var showAllNotes = mode === "coach" || state.session.review;
    var list = item.order.map(function (orig, pos) {
      var cls = ["opt"];
      if (chosen === orig) cls.push("chosen");
      if (elim[orig]) cls.push("struck");
      if (checked) {
        if (orig === q.answer) cls.push("right");
        else if (chosen === orig) cls.push("wrong");
      }
      var content = isFig ? R.figureSVG(q.options[orig], "Option " + LETTERS[pos]) : "<span>" + esc(q.options[orig]) + "</span>";
      var note = "";
      if (checked && q.optionNotes && q.optionNotes[orig] && (showAllNotes || orig === chosen || orig === q.answer)) {
        note = '<p class="opt-note">' + esc(q.optionNotes[orig]) + "</p>";
      }
      return '<li class="' + cls.join(" ") + '">' +
        '<button class="opt-main" data-act="choose" data-opt="' + orig + '"' + (checked ? " disabled" : "") + ' aria-pressed="' + (chosen === orig) + '">' +
        '<span class="letter">' + LETTERS[pos] + "</span>" + '<span class="opt-body">' + content + note + "</span></button>" +
        (checked ? "" : '<button class="strike" data-act="strike" data-opt="' + orig + '" title="Strike out this option" aria-label="Strike out option ' + LETTERS[pos] + '">✕</button>') +
        "</li>";
    }).join("");
    return '<ol class="opts' + (isFig ? " opts-fig" : "") + '">' + list + "</ol>";
  }

  function coachPanelHTML(item, sec) {
    var q = item.q, used = sec.hints[q.id] || 0, hints = q.hints || [];
    var lesson = (window.EPSO_LESSONS || {})[q.section];
    var method = lesson ? '<details class="method"' + (state.ui.showMethod ? " open" : "") + '><summary data-act="toggle-method">Method checklist</summary><ol>' +
      lesson.steps.map(function (st) { return "<li><b>" + esc(st.name) + ".</b> " + esc(st.text) + "</li>"; }).join("") + "</ol></details>" : "";
    var shown = hints.slice(0, used).map(function (h, i) {
      return '<li><span class="hint-n">Hint ' + (i + 1) + "</span> " + esc(h) + "</li>";
    }).join("");
    var btn = used < hints.length
      ? '<button class="btn btn-quiet" data-act="hint">' + (used ? "Show next hint" : "Show a hint") + " (" + (used + 1) + " of " + hints.length + ")</button>"
      : hints.length ? '<span class="muted small">All hints shown. Now choose your answer.</span>' : "";
    return '<div class="coach"><div class="coach-head"><span class="eyebrow">Coach</span><span class="muted small">Target pace: ' +
      fmtTime(SECTIONS[q.section].perQ) + " per question</span></div>" + method +
      (shown ? '<ol class="hints">' + shown + "</ol>" : "") + '<div class="coach-actions">' + btn + "</div></div>";
  }

  function feedbackHTML(item, sec) {
    var q = item.q, chosen = sec.answers[q.id];
    var ok = chosen === q.answer;
    var pos = item.order.indexOf(q.answer);
    var head = chosen === undefined
      ? '<p class="verdict verdict-skip">Not answered. The correct answer is <b>' + LETTERS[pos] + "</b>.</p>"
      : ok ? '<p class="verdict verdict-ok">Correct.</p>'
        : '<p class="verdict verdict-bad">Not quite. The correct answer is <b>' + LETTERS[pos] + "</b>.</p>";
    var sol = q.solution && q.solution.length
      ? '<div class="solution"><span class="eyebrow">Worked solution</span><ol>' + q.solution.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div>" : "";
    var exp = q.explanation ? '<div class="takeaway"><span class="eyebrow">Key takeaway</span><p>' + esc(q.explanation) + "</p></div>" : "";
    return '<div class="feedback">' + head + sol + exp + "</div>";
  }

  function navHTML(sec) {
    var s = state.session;
    return '<nav class="qnav" aria-label="Questions">' + sec.items.map(function (it, i) {
      var id = it.q.id, cls = ["qdot"];
      if (i === s.qi) cls.push("current");
      if (sec.answers[id] !== undefined) cls.push("answered");
      if (sec.flags[id]) cls.push("flagged");
      if (sec.checked[id] || s.review) cls.push(sec.answers[id] === it.q.answer ? "ok" : "bad");
      return '<button class="' + cls.join(" ") + '" data-act="goto" data-i="' + i + '" aria-label="Question ' + (i + 1) + '">' + (i + 1) + "</button>";
    }).join("") + '</nav><div class="legend-row small muted"><span><i class="lg lg-ans"></i>Answered</span><span><i class="lg"></i>Not answered</span><span><i class="lg lg-flag"></i>Flagged</span></div>';
  }

  function toolsHTML(sec) {
    var ui = state.ui, k = sec.key, out = "";
    if (state.session.review) return "";
    if (k === "verbal") out += '<button class="tool' + (ui.hl ? " on" : "") + '" data-act="tool-hl" aria-pressed="' + ui.hl + '">' + ICON.mark + "<span>Highlight</span></button>";
    out += '<button class="tool' + (ui.scratch ? " on" : "") + '" data-act="tool-scratch" aria-pressed="' + ui.scratch + '">' + ICON.note + "<span>Scratchpad</span></button>";
    if (k === "numerical") out += '<button class="tool' + (ui.calc ? " on" : "") + '" data-act="tool-calc" aria-pressed="' + ui.calc + '">' + ICON.calc + "<span>Calculator</span></button>";
    return '<div class="tools">' + out + "</div>";
  }

  function popoversHTML(sec) {
    var ui = state.ui, out = "";
    if (ui.scratch) {
      out += '<div class="pop pop-scratch" role="dialog" aria-label="Scratchpad"><div class="pop-head"><b>Scratchpad</b><button class="link-btn" data-act="tool-scratch">Close</button></div>' +
        '<textarea id="scratch" spellcheck="false" placeholder="Notes and working…">' + esc(sec.scratch) + "</textarea></div>";
    }
    if (ui.calc) {
      var keys = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ".", "%", "+", "(", ")", "⌫", "C"];
      out += '<div class="pop pop-calc" role="dialog" aria-label="Calculator"><div class="pop-head"><b>Calculator</b><button class="link-btn" data-act="tool-calc">Close</button></div>' +
        '<div class="calc-screen"><div class="calc-expr" id="calc-expr">' + esc(ui.calcExpr || "0") + '</div><div class="calc-out" id="calc-out">' + esc(ui.calcOut) + "</div></div>" +
        '<div class="calc-keys">' + keys.map(function (k) { return '<button data-act="calc" data-k="' + esc(k) + '">' + esc(k) + "</button>"; }).join("") +
        '<button class="calc-eq" data-act="calc" data-k="=">=</button></div></div>';
    }
    return out;
  }

  /* ---------- views ---------- */
  function viewHome() {
    var hist = load(KEY_HIST, []);
    var stats = load(KEY_STATS, {});
    var sectionRows = ORDER.map(function (k) {
      var qs = bank.bySection[k], seen = 0, correct = 0, wrongNow = 0;
      qs.forEach(function (q) { var e = stats[q.id]; if (e) { seen += e.seen; correct += e.correct; if (e.last === false) wrongNow++; } });
      var acc = seen ? Math.round((correct / seen) * 100) : null;
      var S = SECTIONS[k];
      return '<div class="trow">' +
        '<div class="tcell tname"><b>' + esc(S.name) + '</b><span class="muted small">Exam: ' + S.examCount + " questions · " + S.examMinutes + " min</span></div>" +
        '<div class="tcell tstat"><span class="big-num">' + qs.length + '</span><span class="muted small">in bank</span></div>' +
        '<div class="tcell tstat"><span class="big-num">' + (acc === null ? "–" : acc + "%") + '</span><span class="muted small">' + (seen ? "accuracy · " + wrongNow + " to revisit" : "not started") + "</span></div>" +
        '<div class="tcell tact"><button class="btn btn-primary" data-act="coach" data-k="' + k + '">Coach</button><button class="btn" data-act="practice" data-k="' + k + '">Practice</button></div>' +
        "</div>";
    }).join("");

    var setOpts = '<option value="all">All sets</option>' + bank.sets.map(function (s) {
      return '<option value="' + esc(s.id) + '"' + (prefs.setId === s.id ? " selected" : "") + ">" + esc(s.title) + " (" + s.count + ")</option>";
    }).join("");

    var histHTML = hist.length ? '<ul class="hist">' + hist.slice(0, 8).map(function (h) {
      var d = new Date(h.at);
      var parts = h.sections.map(function (s) { return SECTIONS[s.key] ? SECTIONS[s.key].name.split(" ")[0] + " " + s.correct + "/" + s.total : ""; }).join(" · ");
      var badge = h.pass === null ? "" : h.pass ? '<span class="pill pill-ok">Pass</span>' : '<span class="pill pill-bad">Below pass mark</span>';
      return "<li><span class=\"hist-date\">" + d.toLocaleDateString(undefined, { day: "numeric", month: "short" }) + " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) +
        '</span><span class="hist-mode">' + modeLabel(h.mode) + '</span><span class="hist-score">' + esc(parts) + "</span>" + badge + "</li>";
    }).join("") + "</ul>" : '<p class="muted">No attempts yet. Your coach rounds, practice sessions and exam simulations will be listed here.</p>';

    var warn = bank.errors.length ? '<div class="alert">' + bank.errors.map(esc).join("<br>") + "</div>" : "";

    return '<div class="home">' + warn +
      '<header class="masthead"><div class="mast-text"><p class="eyebrow">EPSO AD5 · Stage 1 reasoning tests</p><h1>AD5 Reasoning Trainer</h1>' +
      '<p class="lede">Learn the method with the coach, drill with instant feedback, then sit a full timed simulation in the EPSO format.</p></div>' +
      '<dl class="format">' +
      '<div><dt>Verbal</dt><dd><b>20</b> q · <b>35</b> min</dd><dd class="muted small">pass 10/20</dd></div>' +
      '<div><dt>Numerical</dt><dd><b>10</b> q · <b>20</b> min</dd><dd class="muted small">pass 10/20 combined</dd></div>' +
      '<div><dt>Abstract</dt><dd><b>10</b> q · <b>10</b> min</dd><dd class="muted small">with numerical</dd></div>' +
      "</dl></header>" +

      '<section class="exam-card"><div><h2>Exam simulation</h2><p class="muted">Timed and in the EPSO format: question navigator, flags, strike-out, highlighter, scratchpad and calculator. No feedback until the end, then a pass-mark check and a full review.</p></div>' +
      '<div class="exam-start"><label for="exam-scope" class="small muted">Tests</label><select id="exam-scope">' +
      [["full", "All three tests (65 min)"], ["verbal", "Verbal only (35 min)"], ["numerical", "Numerical only (20 min)"], ["abstract", "Abstract only (10 min)"]].map(function (o) {
        return '<option value="' + o[0] + '"' + (prefs.examScope === o[0] ? " selected" : "") + ">" + o[1] + "</option>";
      }).join("") + '</select><button class="btn btn-primary btn-lg" data-act="exam">Start simulation</button></div></section>' +

      '<section class="train"><div class="train-head"><div><h2>Train by test</h2><p class="muted"><b>Coach</b> teaches the method, gives step-by-step hints and explains every option. <b>Practice</b> checks each answer straight away.</p></div>' +
      '<div class="train-opts">' +
      '<label class="field"><span class="small muted">Questions</span><select id="opt-count">' + ["5", "10", "20", "all"].map(function (v) {
        return '<option value="' + v + '"' + (String(prefs.count) === v ? " selected" : "") + ">" + (v === "all" ? "All" : v) + "</option>";
      }).join("") + "</select></label>" +
      '<label class="field"><span class="small muted">Question set</span><select id="opt-set">' + setOpts + "</select></label>" +
      '<label class="check"><input type="checkbox" id="opt-timed"' + (prefs.timed ? " checked" : "") + '> Timed practice at exam pace</label>' +
      '<label class="check"><input type="checkbox" id="opt-mistakes"' + (prefs.mistakesOnly ? " checked" : "") + "> Only questions I got wrong</label>" +
      "</div></div>" +
      '<div class="ttable">' + sectionRows + "</div></section>" +

      '<section class="history"><h2>Recent attempts</h2>' + histHTML + "</section>" +

      '<footer class="foot"><p><b>Unofficial training tool.</b> The questions are original practice material written for this app, not EPSO items. Always check the format in your Notice of Competition.</p>' +
      '<p class="small muted">Format sources: <a href="https://eu-careers.europa.eu/" target="_blank" rel="noopener">EPSO / EU Careers</a> · ' +
      '<a href="https://eutraining.eu/content/your-complete-guide-2026-epso-ad5-graduates-exam" target="_blank" rel="noopener">EU Training AD5 2026 guide</a> · ' +
      '<a href="https://epsoready.eu/" target="_blank" rel="noopener">EPSOready</a> · ' +
      '<a href="https://www.euphorum.org/en/demo/testmodus" target="_blank" rel="noopener">European Careers Portal</a>. Question sets loaded: ' + bank.sets.length + ".</p></footer></div>";
  }

  function viewBrief() {
    var s = state.session;
    var rows = s.sections.map(function (sec, i) {
      return "<li><b>" + (i + 1) + ". " + esc(SECTIONS[sec.key].name) + "</b><span>" + sec.items.length + " questions · " + fmtTime(sec.timeLimit) + "</span></li>";
    }).join("");
    return '<div class="card narrow"><p class="eyebrow">Exam simulation</p><h1>Before you start</h1>' +
      '<ol class="brief-list">' + rows + "</ol>" +
      (s.notes.length ? '<div class="alert">' + s.notes.map(esc).join("<br>") + "</div>" : "") +
      '<ul class="rules"><li>Each test has its own timer. When it runs out, the test is submitted automatically.</li>' +
      "<li>You can move freely between questions in a test and flag them to come back to.</li>" +
      "<li>There is no negative marking, so answer every question.</li>" +
      "<li>Pass marks: verbal 50%; numerical and abstract 50% combined.</li>" +
      "<li>Shortcuts: <kbd>A</kbd>–<kbd>E</kbd> to answer, <kbd>←</kbd> <kbd>→</kbd> to move, <kbd>F</kbd> to flag.</li></ul>" +
      '<div class="row-actions"><button class="btn" data-act="home">Cancel</button><button class="btn btn-primary btn-lg" data-act="begin">Start ' +
      esc(SECTIONS[s.sections[0].key].name.toLowerCase()) + "</button></div></div>";
  }

  function viewLesson() {
    var key = state.session.sections[0].key, L = window.EPSO_LESSONS[key];
    return '<div class="card lesson"><p class="eyebrow">Coach · lesson</p><h1>' + esc(L.title) + "</h1>" +
      '<p class="lede">' + esc(L.format) + "</p>" +
      '<h2>The method</h2><ol class="steps">' + L.steps.map(function (st) {
        return "<li><b>" + esc(st.name) + "</b><span>" + esc(st.text) + "</span></li>";
      }).join("") + "</ol>" +
      '<h2>Common traps</h2><ul class="traps">' + L.traps.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<h2>Pacing</h2><p>' + esc(L.pacing) + "</p>" +
      '<div class="row-actions"><button class="btn" data-act="home">Back</button><button class="btn btn-primary btn-lg" data-act="begin-coach">Start training round (' +
      state.session.sections[0].items.length + " questions)</button></div></div>";
  }

  function viewSession() {
    var c = cur(), s = c.s, sec = c.sec, item = c.item, q = item.q;
    var mode = s.mode, review = s.review;
    var checked = !!sec.checked[q.id] || review;
    var last = s.qi === sec.items.length - 1;
    var answered = Object.keys(sec.answers).length;

    var head = '<header class="exam-bar"><div class="bar-left">' + sectionChip(sec.key) +
      '<span class="pill">' + (review ? "Review" : modeLabel(mode)) + "</span>" +
      (s.sections.length > 1 ? '<span class="muted small">Test ' + (s.si + 1) + " of " + s.sections.length + "</span>" : "") + "</div>" +
      '<div class="bar-right">' + toolsHTML(sec) +
      (review ? "" : '<span id="timer" class="timer' + timerClass(sec) + '">' + timerText(sec) + "</span>") +
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
      (q.topic ? '<span class="muted small">' + esc(q.topic) + (q.difficulty ? " · " + ["", "easier", "medium", "harder"][q.difficulty] : "") + "</span>" : "") + "</div>" +
      '<h2 class="stem">' + esc(q.stem || "Which of the following statements is correct?") + "</h2>" +
      optionsHTML(item, sec, mode) +
      (mode === "coach" && !checked ? coachPanelHTML(item, sec) : "") +
      (checked ? feedbackHTML(item, sec) : "") +
      '<div class="q-actions">' + actions.join("") + "</div>" +
      (mode === "exam" && !review ? '<p class="muted small">' + answered + " of " + sec.items.length + " answered</p>" : "");

    return head + '<div class="session">' + navHTML(sec) +
      '<div class="q-layout q-' + q.section + '"><section class="stimulus">' + stimulusHTML(item, sec) + '</section><section class="answer-pane">' + right + "</section></div></div>" +
      popoversHTML(sec);
  }

  function viewBetween() {
    var s = state.session, done = s.sections[s.si], next = s.sections[s.si + 1];
    var sc = sectionScore(done);
    return '<div class="card narrow"><p class="eyebrow">Test ' + (s.si + 1) + " of " + s.sections.length + " complete</p><h1>" + esc(SECTIONS[done.key].name) + " submitted</h1>" +
      "<p>" + (done.timedOut ? "Time ran out. " : "") + "You answered " + sc.answered + " of " + sc.total + " questions in " + fmtTime(Math.min(done.elapsed, done.timeLimit || done.elapsed)) + ". Scores are shown at the end, as in the real exam.</p>" +
      "<p>Next: <b>" + esc(SECTIONS[next.key].name) + "</b>, " + next.items.length + " questions in " + fmtTime(next.timeLimit) + ".</p>" +
      '<div class="row-actions"><button class="btn btn-primary btn-lg" data-act="next-section">Start ' + esc(SECTIONS[next.key].name.toLowerCase()) + "</button></div></div>";
  }

  function viewResults() {
    var s = state.session;
    var verdict = s.mode === "exam" ? examVerdict(s) : null;
    var overall = verdict ? verdict.every(function (v) { return v.pass; }) : null;
    var summary = s.sections.map(function (sec) {
      var sc = sectionScore(sec), pct = sc.total ? Math.round((sc.correct / sc.total) * 100) : 0;
      return '<div class="score-tile"><span class="small muted">' + esc(SECTIONS[sec.key].name) + '</span><span class="score-big">' + sc.correct + "<small>/" + sc.total + "</small></span>" +
        '<div class="meter" role="img" aria-label="' + pct + '% correct"><i style="width:' + pct + '%"></i><b style="left:50%"></b></div>' +
        '<span class="small muted">' + pct + "% · " + fmtTime(sec.elapsed) + (sec.timeLimit ? " of " + fmtTime(sec.timeLimit) : "") + (s.mode === "coach" ? " · " + countHints(sec) + " hints" : "") + "</span></div>";
    }).join("");

    var verdictHTML = verdict ? '<div class="verdict-box ' + (overall ? "ok" : "bad") + '"><h2>' + (overall ? "You would pass the reasoning stage" : "Below the pass mark") + "</h2><ul>" +
      verdict.map(function (v) { return "<li><span>" + esc(v.label) + "</span><b>" + v.detail + '</b><span class="muted small">' + v.need + "</span>" + (v.pass ? '<span class="pill pill-ok">Pass</span>' : '<span class="pill pill-bad">Fail</span>') + "</li>"; }).join("") +
      "</ul><p class=\"small muted\">Reaching the pass mark is necessary but may not be enough: EPSO can also rank candidates on their verbal reasoning score.</p></div>" : "";

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
      return '<h3>' + esc(SECTIONS[sec.key].name) + '</h3><ol class="review-list">' + sec.items.map(function (it, i) {
        var a = sec.answers[it.q.id], ok = a === it.q.answer;
        var yours = a === undefined ? "–" : LETTERS[it.order.indexOf(a)];
        return '<li class="' + (ok ? "ok" : "bad") + '"><span class="rv-n">' + (i + 1) + '</span><span class="rv-topic">' + esc(it.q.topic || "") + "</span>" +
          '<span class="rv-ans">You: <b>' + yours + "</b> · Correct: <b>" + LETTERS[it.order.indexOf(it.q.answer)] + "</b></span>" +
          '<button class="link-btn" data-act="review" data-si="' + si + '" data-i="' + i + '">Review</button></li>';
      }).join("") + "</ol>";
    }).join("");

    var wrongCount = 0;
    s.sections.forEach(function (sec) { sec.items.forEach(function (it) { if (sec.answers[it.q.id] !== it.q.answer) wrongCount++; }); });

    return '<div class="results"><p class="eyebrow">' + modeLabel(s.mode) + " · results</p><h1>" + (s.mode === "exam" ? "Your simulation result" : "Round complete") + "</h1>" +
      verdictHTML + '<div class="tiles">' + summary + "</div>" +
      (weak.length ? '<div class="weak"><h2>Topics to revisit</h2><ul>' + weak.slice(0, 8).map(function (t) { return "<li>" + esc(t) + " <span class=\"muted\">(" + topics[t].c + "/" + topics[t].n + ")</span></li>"; }).join("") +
        (weak.length > 8 ? '<li class="muted">and ' + (weak.length - 8) + " more. See the question review below.</li>" : "") + "</ul></div>" : "") +
      '<div class="row-actions">' +
      (wrongCount ? '<button class="btn btn-primary" data-act="retry-coach">Coach me on my ' + wrongCount + " mistake" + (wrongCount > 1 ? "s" : "") + "</button>" : "") +
      '<button class="btn" data-act="home">Back to start</button></div>' +
      '<section class="review"><h2>Question review</h2>' + rows + "</section></div>";
  }

  function confirmHTML() {
    var c = state.ui.confirm; if (!c) return "";
    return '<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="cf-title"><div class="dialog"><h2 id="cf-title">' + esc(c.title) + "</h2><p>" + esc(c.text) + "</p>" +
      '<div class="row-actions"><button class="btn" data-act="cf-no">' + esc(c.no || "Cancel") + '</button><button class="btn btn-primary" data-act="cf-yes">' + esc(c.yes) + "</button></div></div></div>";
  }

  var flashTimer = null;
  function flash(msg) {
    state.notice = msg;
    render();
    clearTimeout(flashTimer);
    flashTimer = setTimeout(function () { state.notice = null; var n = document.getElementById("toast"); if (n) n.remove(); }, 4000);
  }

  var root;
  function render() {
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
  }

  function go(view) { state.view = view; state.ui = freshUI(); render(); window.scrollTo(0, 0); }

  /* ---------- actions ---------- */
  function savePassage() {
    var c = cur(), el = document.getElementById("passage");
    if (c && el) c.sec.passage[c.item.q.id] = el.innerHTML;
  }

  function move(delta) {
    var s = state.session, sec = s.sections[s.si];
    var n = s.qi + delta;
    if (n < 0 || n >= sec.items.length) return;
    s.qi = n; state.ui.hl = false; state.ui.showMethod = false;
    render();
    var a = document.querySelector(".answer-pane");
    if (window.innerWidth < 900 && a) document.querySelector(".session").scrollIntoView({ block: "start" });
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
    render();
  }

  function calcPress(k) {
    var ui = state.ui;
    if (k === "C") { ui.calcExpr = ""; ui.calcOut = ""; }
    else if (k === "⌫") ui.calcExpr = ui.calcExpr.slice(0, -1);
    else if (k === "=") {
      try { var v = calcEval(ui.calcExpr); ui.calcOut = "= " + v; ui.calcExpr = String(v); }
      catch (e) { ui.calcOut = "Check the expression"; }
    } else {
      if (ui.calcExpr.length < 40) ui.calcExpr += k;
      ui.calcOut = "";
    }
    var e1 = document.getElementById("calc-expr"), e2 = document.getElementById("calc-out");
    if (e1) e1.textContent = ui.calcExpr || "0";
    if (e2) e2.textContent = ui.calcOut;
  }

  function onClick(e) {
    var t = e.target.closest("[data-act]"); if (!t || !root.contains(t)) return;
    var act = t.getAttribute("data-act");
    var s = state.session;
    switch (act) {
      case "home": state.session = null; go("home"); break;
      case "exam": startExam(prefs.examScope); break;
      case "coach": startTraining("coach", t.getAttribute("data-k")); break;
      case "practice": startTraining("practice", t.getAttribute("data-k")); break;
      case "begin": case "begin-coach": go("session"); break;
      case "next-section": s.si++; s.qi = 0; go("session"); break;
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
      case "goto": s.qi = +t.getAttribute("data-i"); state.ui.hl = false; render(); break;
      case "flag": { var cf = cur(); cf.sec.flags[cf.item.q.id] = !cf.sec.flags[cf.item.q.id]; render(); break; }
      case "check": check(); break;
      case "hint": { var ch = cur(); ch.sec.hints[ch.item.q.id] = (ch.sec.hints[ch.item.q.id] || 0) + 1; render(); break; }
      case "toggle-method": e.preventDefault(); state.ui.showMethod = !state.ui.showMethod; render(); break;
      case "tool-hl": state.ui.hl = !state.ui.hl; render(); break;
      case "tool-scratch": state.ui.scratch = !state.ui.scratch; render(); break;
      case "tool-calc": state.ui.calc = !state.ui.calc; render(); break;
      case "calc": calcPress(t.getAttribute("data-k")); break;
      case "clear-hl": { var cc = cur(); delete cc.sec.passage[cc.item.q.id]; render(); break; }
      case "submit": {
        var sec = cur().sec, sc = sectionScore(sec), un = sc.total - sc.answered, fl = Object.keys(sec.flags).filter(function (k) { return sec.flags[k]; }).length;
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
          state.ui.confirm = { title: "End this round?", text: open + " question" + (open > 1 ? "s have" : " has") + " not been checked yet. They will count as unanswered.", yes: "End round", act: "end" };
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
      case "retry-coach": {
        var wrong = [];
        s.sections.forEach(function (sec2) { sec2.items.forEach(function (it) { if (sec2.answers[it.q.id] !== it.q.answer) wrong.push(it.q); }); });
        var bySec = {};
        wrong.forEach(function (q) { (bySec[q.section] = bySec[q.section] || []).push(q); });
        var sections = ORDER.filter(function (k) { return bySec[k]; }).map(function (k) { return makeSection(k, bySec[k], null); });
        state.session = { mode: "coach", sections: sections, si: 0, qi: 0, started: Date.now(), notes: [], review: false };
        // Coach on several tests: run them back to back without a lesson.
        if (sections.length === 1) { state.ui = freshUI(); state.view = "lesson"; render(); }
        else go("session");
        break;
      }
    }
  }

  function onChange(e) {
    var id = e.target.id;
    if (id === "exam-scope") prefs.examScope = e.target.value;
    else if (id === "opt-count") prefs.count = e.target.value;
    else if (id === "opt-set") prefs.setId = e.target.value;
    else if (id === "opt-timed") prefs.timed = e.target.checked;
    else if (id === "opt-mistakes") prefs.mistakesOnly = e.target.checked;
    else return;
    save(KEY_PREFS, prefs);
  }

  function onInput(e) {
    if (e.target.id === "scratch") { var c = cur(); if (c) c.sec.scratch = e.target.value; }
  }

  function onPointerUp() {
    if (!state.ui.hl) return;
    var p = document.getElementById("passage"); if (!p) return;
    var sel = window.getSelection(); if (!sel || sel.isCollapsed || !sel.rangeCount) return;
    var r = sel.getRangeAt(0);
    if (!p.contains(r.commonAncestorContainer)) return;
    try {
      var mark = document.createElement("mark");
      mark.appendChild(r.extractContents());
      r.insertNode(mark);
      sel.removeAllRanges();
      savePassage();
    } catch (err) { /* selection spans structure that cannot be wrapped */ }
  }

  function onKey(e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "textarea" || tag === "input" || tag === "select" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (state.ui.confirm) { if (e.key === "Escape") { state.ui.confirm = null; render(); } return; }
    if (state.view !== "session") return;
    var c = cur(); if (!c) return;
    var k = e.key;
    var idx = "abcde".indexOf(k.toLowerCase());
    if (idx === -1 && /^[1-5]$/.test(k)) idx = +k - 1;
    if (idx > -1 && idx < c.item.order.length && k.length === 1) { choose(c.item.order[idx]); e.preventDefault(); return; }
    if (k === "ArrowRight") { move(1); e.preventDefault(); }
    else if (k === "ArrowLeft") { move(-1); e.preventDefault(); }
    else if ((k === "f" || k === "F") && c.s.mode === "exam") { c.sec.flags[c.item.q.id] = !c.sec.flags[c.item.q.id]; render(); }
    else if (k === "Enter" && c.s.mode !== "exam" && !c.s.review) {
      if (!c.sec.checked[c.item.q.id]) check(); else move(1);
      e.preventDefault();
    }
  }

  /* ---------- boot ---------- */
  function boot() {
    root = document.getElementById("app");
    buildBank();
    root.addEventListener("click", onClick);
    root.addEventListener("change", onChange);
    root.addEventListener("input", onInput);
    root.addEventListener("mouseup", onPointerUp);
    root.addEventListener("touchend", onPointerUp);
    document.addEventListener("keydown", onKey);
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

  window.EPSO_APP = { calcEval: calcEval, examVerdict: examVerdict };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { loadSets(boot); });
  else loadSets(boot);
})();
