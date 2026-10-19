/*
 * Pure logic shared by the app and the unit tests (no DOM access).
 * Browser: window.EPSO_CORE. Node: module.exports.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.EPSO_CORE = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var SECTIONS = {
    verbal: { key: "verbal", name: "Verbal reasoning", examCount: 20, examMinutes: 35, perQ: 105 },
    numerical: { key: "numerical", name: "Numerical reasoning", examCount: 10, examMinutes: 20, perQ: 120 },
    abstract: { key: "abstract", name: "Abstract reasoning", examCount: 10, examMinutes: 10, perQ: 60 }
  };
  var ORDER = ["verbal", "numerical", "abstract"];
  // Difficulty mix for exam draws: 25% easier, 50% medium, 25% harder.
  var DIFFICULTY_MIX = { 1: 0.25, 2: 0.5, 3: 0.25 };

  /* ---------- calculator ---------- */
  // Supports + − × ÷ ( ) and %, where % divides the number before it by 100 (so 200×15% = 30).
  // Mirrors the basic calculator of TAO, the platform EPSO uses (oat-sa/tao-core-ui-fe): digits, + − × ÷,
  // parentheses, power (^) and square root (√). It has no percent key, so percentages are typed as ÷100.
  function calcEval(expr) {
    var src = String(expr).replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/\s+/g, "");
    if (!src || src.length > 256) throw new Error("empty or too long");
    var toks = src.match(/(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?|[-+*/()^√]/g);
    if (!toks || toks.join("") !== src) throw new Error("bad");
    // Precedence: unary minus below power (−2^2 = −4), square root binds tightest; power is right-associative.
    var out = [], ops = [], prec = { "+": 1, "-": 1, "*": 2, "/": 2, "u": 3, "^": 4, "r": 5 };
    var prev = null;
    toks.forEach(function (t) {
      if (/^[\d.]/.test(t)) out.push(parseFloat(t));
      else if (t === "(") ops.push(t);
      else if (t === ")") {
        while (ops.length && ops[ops.length - 1] !== "(") out.push(ops.pop());
        if (!ops.length) throw new Error("paren");
        ops.pop();
      } else {
        var op = t === "√" ? "r" : t === "-" && (prev === null || /^[-+*/(^√]$/.test(prev)) ? "u" : t;
        var prefix = op === "u" || op === "r";
        while (!prefix && ops.length && ops[ops.length - 1] !== "(" &&
          (op === "^" ? prec[ops[ops.length - 1]] > prec[op] : prec[ops[ops.length - 1]] >= prec[op])) out.push(ops.pop());
        ops.push(op);
      }
      prev = t;
    });
    while (ops.length) { var o = ops.pop(); if (o === "(") throw new Error("paren"); out.push(o); }
    var st = [];
    out.forEach(function (t) {
      if (typeof t === "number") st.push(t);
      else if (t === "u" || t === "r") {
        if (!st.length) throw new Error("bad");
        var x = st.pop();
        if (t === "r" && x < 0) throw new Error("bad");
        st.push(t === "u" ? -x : Math.sqrt(x));
      } else {
        var b = st.pop(), a = st.pop();
        if (a === undefined || b === undefined) throw new Error("bad");
        st.push(t === "+" ? a + b : t === "-" ? a - b : t === "*" ? a * b : t === "/" ? a / b : Math.pow(a, b));
      }
    });
    if (st.length !== 1 || !isFinite(st[0])) throw new Error("bad");
    return +st[0].toPrecision(12);
  }

  /* ---------- scoring ---------- */
  // Exam: every answer counts. Practice/coach: only answers the user checked count.
  function sectionScore(sec, mode) {
    var correct = 0, answered = 0, counted = 0;
    sec.items.forEach(function (it) {
      var id = it.q.id, a = sec.answers[id];
      if (a !== undefined) answered++;
      var counts = mode === "exam" || sec.checked[id];
      if (counts) counted++;
      if (counts && a === it.q.answer) correct++;
    });
    return { correct: correct, total: sec.items.length, answered: answered, counted: counted };
  }

  // scores: { verbal: {correct,total}, numerical: {...}, abstract: {...} } (any subset)
  function examVerdict(scores) {
    var out = [];
    if (scores.verbal) {
      var need = Math.ceil(scores.verbal.total / 2);
      out.push({ key: "verbal", label: "Verbal reasoning", correct: scores.verbal.correct, total: scores.verbal.total, need: need, pass: scores.verbal.correct >= need });
    }
    if (scores.numerical || scores.abstract) {
      var c = (scores.numerical ? scores.numerical.correct : 0) + (scores.abstract ? scores.abstract.correct : 0);
      var t = (scores.numerical ? scores.numerical.total : 0) + (scores.abstract ? scores.abstract.total : 0);
      var n2 = Math.ceil(t / 2);
      var lbl = scores.numerical && scores.abstract ? "Numerical + abstract (combined)" : scores.numerical ? "Numerical reasoning" : "Abstract reasoning";
      out.push({ key: "na", label: lbl, correct: c, total: t, need: n2, pass: c >= n2 });
    }
    return out;
  }

  /* ---------- exposure-controlled, difficulty-stratified draw ---------- */
  function shuffle(a, rng) {
    var arr = a.slice(), r = rng || Math.random;
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(r() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  // Returns { items, repeats }: unseen items first, then a difficulty mix as close to DIFFICULTY_MIX as the pool allows.
  // An item is seen once it was answered or merely displayed (N6: a discarded exam still exposes its items).
  function isSeen(e) { return !!(e && (e.seen || e.shown)); }

  function drawExam(pool, count, stats, rng) {
    stats = stats || {};
    var seen = function (q) { return isSeen(stats[q.id]); };
    var byD = { 1: [], 2: [], 3: [] };
    pool.forEach(function (q) { (byD[q.difficulty] || byD[2]).push(q); });
    // Within each difficulty: unseen (shuffled) before seen (least recently seen first).
    Object.keys(byD).forEach(function (d) {
      var un = shuffle(byD[d].filter(function (q) { return !seen(q); }), rng);
      var se = byD[d].filter(seen).sort(function (a, b) { return (stats[a.id].at || 0) - (stats[b.id].at || 0); });
      byD[d] = un.concat(se);
    });
    var want = { 1: Math.round(count * DIFFICULTY_MIX[1]), 3: Math.round(count * DIFFICULTY_MIX[3]) };
    want[2] = count - want[1] - want[3];
    var picked = [];
    [1, 2, 3].forEach(function (d) {
      var take = byD[d].filter(function (q) { return !seen(q); }).slice(0, want[d]);
      picked = picked.concat(take);
      byD[d] = byD[d].filter(function (q) { return take.indexOf(q) === -1; });
    });
    // Fill any gap with remaining unseen items of any difficulty, then with the least recently seen.
    var rest = [1, 2, 3].reduce(function (acc, d) { return acc.concat(byD[d]); }, []);
    var restUnseen = shuffle(rest.filter(function (q) { return !seen(q); }), rng);
    var restSeen = rest.filter(seen).sort(function (a, b) { return (stats[a.id].at || 0) - (stats[b.id].at || 0); });
    var fill = restUnseen.concat(restSeen);
    while (picked.length < count && fill.length) picked.push(fill.shift());
    var repeats = picked.filter(seen).length;
    return { items: shuffle(picked, rng), repeats: repeats };
  }

  function freshSimulationsLeft(bySection, stats, keys) {
    stats = stats || {};
    var left = Infinity;
    (keys || ORDER).forEach(function (k) {
      var unseen = (bySection[k] || []).filter(function (q) { return !isSeen(stats[q.id]); }).length;
      left = Math.min(left, Math.floor(unseen / SECTIONS[k].examCount));
    });
    return left === Infinity ? 0 : left;
  }

  /* ---------- timing (wall-clock based, survives background tabs and sleep) ---------- */
  function remainingMs(sec, now) {
    if (!sec.deadline) return null;
    return Math.max(0, sec.deadline - now);
  }
  function elapsedMs(sec, now) {
    if (sec.usedMs != null) return sec.usedMs;
    if (!sec.startedAt) return 0;
    var e = now - sec.startedAt;
    return sec.limitMs ? Math.min(e, sec.limitMs) : e;
  }

  /* ---------- highlighter: ranges stored as { p, s, e } character offsets per paragraph ---------- */
  function addRange(list, p, s, e) {
    if (e <= s) return list.slice();
    var all = list.concat([{ p: p, s: s, e: e }]).sort(function (a, b) { return a.p - b.p || a.s - b.s; });
    var out = [];
    all.forEach(function (r) {
      var last = out[out.length - 1];
      if (last && last.p === r.p && r.s <= last.e) last.e = Math.max(last.e, r.e);
      else out.push({ p: r.p, s: r.s, e: r.e });
    });
    return out;
  }
  // Split a paragraph's text into [{ text, mark }] segments.
  function segments(text, ranges, p) {
    var rs = ranges.filter(function (r) { return r.p === p; });
    var out = [], pos = 0;
    rs.forEach(function (r) {
      var s = Math.max(pos, Math.min(r.s, text.length)), e = Math.min(r.e, text.length);
      if (s > pos) out.push({ text: text.slice(pos, s), mark: false });
      if (e > s) out.push({ text: text.slice(s, e), mark: true });
      pos = Math.max(pos, e);
    });
    if (pos < text.length) out.push({ text: text.slice(pos), mark: false });
    return out;
  }

  /* Validate saved data before it can reach a view. Keep unaffected records. */
  function record(v) { return !!v && typeof v === "object" && !Array.isArray(v); }
  function natural(v) { return typeof v === "number" && isFinite(v) && v >= 0; }
  function integer(v) { return natural(v) && Math.floor(v) === v; }
  function cleanStored(kind, value) {
    var changed = false, out;
    if (kind === "prefs") {
      if (!record(value)) return { value: {}, changed: true };
      out = {};
      Object.keys(value).forEach(function (k) {
        var v = value[k], valid = false;
        if (["timed", "mistakesOnly", "showTopics"].indexOf(k) >= 0) valid = typeof v === "boolean";
        else if (["setId", "lang"].indexOf(k) >= 0) valid = typeof v === "string";
        else if (k === "count") valid = ["5", "10", "20", "all"].indexOf(String(v)) >= 0 && (typeof v === "string" || typeof v === "number");
        else if (/^(abstract|verbal|numerical)Level$/.test(k)) valid = ["all", "1", "2", "3"].indexOf(String(v)) >= 0 && (typeof v === "string" || typeof v === "number");
        else if (k === "examScope") valid = ["full", "verbal", "numerical", "abstract"].indexOf(v) >= 0;
        else if (k === "theme") valid = ["system", "light", "dark"].indexOf(v) >= 0;
        if (valid) out[k] = v; else changed = true;
      });
      return { value: out, changed: changed };
    }
    if (kind === "history") {
      if (!Array.isArray(value)) return { value: [], changed: true };
      out = value.filter(function (h) {
        var ok = record(h) && natural(h.at) && ["exam", "practice", "coach"].indexOf(h.mode) >= 0 &&
          Array.isArray(h.sections) && h.sections.length > 0 && h.sections.length <= 3 &&
          (h.pass === null || typeof h.pass === "boolean") && h.sections.every(function (x) {
            return record(x) && ORDER.indexOf(x.key) >= 0 && integer(x.correct) && integer(x.total) && x.total > 0 && x.correct <= x.total &&
              (x.counted === undefined || (integer(x.counted) && x.counted >= x.correct && x.counted <= x.total)) && integer(x.hints) && natural(x.usedSec) && (x.limitSec === null || natural(x.limitSec)) && integer(x.repeats);
          });
        if (!ok) changed = true;
        return ok;
      }).slice(0, 100);
    } else {
      out = {};
      if (!record(value)) return { value: out, changed: true };
      Object.keys(value).forEach(function (id) {
        var x = value[id];
        if (record(x) && integer(x.seen) && integer(x.correct) && x.correct <= x.seen &&
            (x.last === undefined || typeof x.last === "boolean") &&
            (x.at === undefined || natural(x.at)) && (x.shown === undefined || natural(x.shown))) {
          Object.defineProperty(out, id, { value: x, enumerable: true, writable: true, configurable: true });
        } else changed = true;
      });
    }
    return { value: out, changed: changed };
  }
  function validSession(d, byId) {
    if (!record(d) || d.v !== 1 || ["exam", "practice", "coach"].indexOf(d.mode) < 0 ||
        !Array.isArray(d.sections) || !d.sections.length || d.sections.length > 3 ||
        !integer(d.si) || d.si >= d.sections.length || !integer(d.qi) || !natural(d.started) ||
        ["brief", "lesson", "session", "between"].indexOf(d.view) < 0 ||
        !Array.isArray(d.notes) || !d.notes.every(function (x) { return typeof x === "string"; })) return false;
    var keys = Object.create(null);
    var ok = d.sections.every(function (x) {
      if (!record(x) || ORDER.indexOf(x.key) < 0 || keys[x.key] || !Array.isArray(x.ids) || !x.ids.length ||
          !Array.isArray(x.orders) || x.orders.length !== x.ids.length) return false;
      keys[x.key] = true;
      var ids = Object.create(null);
      if (!x.ids.every(function (id, i) {
        var q = byId[id], order = x.orders[i];
        if (typeof id !== "string" || ids[id] || !q || q.section !== x.key || !Array.isArray(order) || order.length !== q.options.length) return false;
        ids[id] = true;
        return order.slice().sort(function (a, b) { return a - b; }).every(function (v, j) { return v === j; });
      })) return false;
      if (!["answers", "flags", "elim", "hints", "checked", "hl", "warned"].every(function (k) { return record(x[k]); })) return false;
      if (!Object.keys(x.answers).every(function (id) { return ids[id] && integer(x.answers[id]) && x.answers[id] < byId[id].options.length; })) return false;
      if (!["flags", "checked"].every(function (k) { return Object.keys(x[k]).every(function (id) { return ids[id] && typeof x[k][id] === "boolean" && (k !== "checked" || !x[k][id] || x.answers[id] !== undefined); }); })) return false;
      if (!Object.keys(x.hints).every(function (id) { return ids[id] && integer(x.hints[id]) && x.hints[id] <= (byId[id].hints || []).length; })) return false;
      if (!Object.keys(x.elim).every(function (id) { return ids[id] && record(x.elim[id]) && Object.keys(x.elim[id]).every(function (v) { return /^\d+$/.test(v) && +v < byId[id].options.length && typeof x.elim[id][v] === "boolean"; }); })) return false;
      if (!Object.keys(x.hl).every(function (id) { return ids[id] && Array.isArray(x.hl[id]) && x.hl[id].every(function (r) { return record(r) && integer(r.p) && integer(r.s) && integer(r.e) && r.e > r.s; }); })) return false;
      return typeof x.scratch === "string" && ["limitMs", "startedAt", "deadline", "usedMs"].every(function (k) { return x[k] === null || natural(x[k]); }) &&
        (x.limitMs === null || x.limitMs > 0) && (x.deadline === null || (x.startedAt !== null && x.limitMs !== null && x.deadline === x.startedAt + x.limitMs)) &&
        typeof x.done === "boolean" && typeof x.timedOut === "boolean" && integer(x.repeats) && x.repeats <= x.ids.length &&
        Object.keys(x.warned).every(function (k) { return typeof x.warned[k] === "boolean"; });
    });
    return ok && d.qi < d.sections[d.si].ids.length && (d.view !== "between" || d.si < d.sections.length - 1);
  }
  function answerState(sec, item, mode) {
    if (mode !== "exam" && !sec.checked[item.q.id]) return "unchecked";
    return sec.answers[item.q.id] === item.q.answer ? "correct" : "incorrect";
  }

  /* ---------- localisation of item text: string or { en, fr, de, … } ---------- */
  function tr(value, lang) {
    if (value == null || typeof value === "string" || Array.isArray(value)) return value;
    if (typeof value === "object" && !value.t) return value[lang] != null ? value[lang] : value.en;
    return value;
  }

  return {
    SECTIONS: SECTIONS, ORDER: ORDER, DIFFICULTY_MIX: DIFFICULTY_MIX,
    cleanStored: cleanStored, validSession: validSession, answerState: answerState,
    calcEval: calcEval, sectionScore: sectionScore, examVerdict: examVerdict,
    shuffle: shuffle, isSeen: isSeen, drawExam: drawExam, freshSimulationsLeft: freshSimulationsLeft,
    remainingMs: remainingMs, elapsedMs: elapsedMs,
    addRange: addRange, segments: segments, tr: tr
  };
});
