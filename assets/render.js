/*
 * Drawing helpers: abstract-reasoning figures and numerical exhibits (tables, bar charts).
 * Colours come from CSS classes so both themes work.
 */
(function () {
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fillClass(fill) {
    var f = fill || "none";
    if (["black", "grey", "white", "none"].indexOf(f) === -1) f = "none";
    return "f-" + f;
  }

  function num(v, d) {
    return typeof v === "number" && isFinite(v) ? v : d;
  }

  function polyPoints(cx, cy, r, n, rot) {
    var pts = [];
    for (var i = 0; i < n; i++) {
      var a = ((-90 + rot + (i * 360) / n) * Math.PI) / 180;
      pts.push((cx + r * Math.cos(a)).toFixed(2) + "," + (cy + r * Math.sin(a)).toFixed(2));
    }
    return pts.join(" ");
  }

  function starPoints(cx, cy, r, rot) {
    var pts = [];
    for (var i = 0; i < 10; i++) {
      var rr = i % 2 === 0 ? r : r * 0.45;
      var a = ((-90 + rot + i * 36) * Math.PI) / 180;
      pts.push((cx + rr * Math.cos(a)).toFixed(2) + "," + (cy + rr * Math.sin(a)).toFixed(2));
    }
    return pts.join(" ");
  }

  function shapeSVG(s) {
    var cls = fillClass(s.fill);
    var x = num(s.x, 50), y = num(s.y, 50), r = num(s.r, 20), rot = num(s.rot, 0);
    switch (s.t) {
      case "circle":
        return '<circle class="' + cls + '" cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
      case "rect":
        return '<rect class="' + cls + '" x="' + x + '" y="' + y + '" width="' + num(s.w, 20) + '" height="' + num(s.h, 20) + '"' +
          (rot ? ' transform="rotate(' + rot + " " + (x + num(s.w, 20) / 2) + " " + (y + num(s.h, 20) / 2) + ')"' : "") + "/>";
      case "poly":
        return '<polygon class="' + cls + '" points="' + polyPoints(x, y, r, Math.max(3, Math.round(num(s.n, 3))), rot) + '"/>';
      case "star":
        return '<polygon class="' + cls + '" points="' + starPoints(x, y, r, rot) + '"/>';
      case "arrow": {
        var p = [
          [0, -r], [0.55 * r, -0.1 * r], [0.2 * r, -0.1 * r], [0.2 * r, r],
          [-0.2 * r, r], [-0.2 * r, -0.1 * r], [-0.55 * r, -0.1 * r]
        ].map(function (q) { return (x + q[0]).toFixed(2) + "," + (y + q[1]).toFixed(2); }).join(" ");
        return '<polygon class="' + cls + '" points="' + p + '" transform="rotate(' + rot + " " + x + " " + y + ')"/>';
      }
      case "line":
        return '<line class="f-line" x1="' + num(s.x1, 10) + '" y1="' + num(s.y1, 10) + '" x2="' + num(s.x2, 90) + '" y2="' + num(s.y2, 90) + '"/>';
      default:
        return "";
    }
  }

  function figureSVG(items, label) {
    var body = (items || []).map(shapeSVG).join("");
    return '<svg class="fig" viewBox="0 0 100 100" role="img" aria-label="' + esc(label || "Figure") + '">' + body + "</svg>";
  }

  function tableHTML(ex) {
    var head = "<tr>" + ex.columns.map(function (c, i) {
      return '<th scope="col"' + (i > 0 ? ' class="num"' : "") + ">" + esc(c) + "</th>";
    }).join("") + "</tr>";
    var rows = ex.rows.map(function (r) {
      return "<tr>" + r.map(function (c, i) {
        return i === 0 ? '<th scope="row">' + esc(c) + "</th>" : '<td class="num">' + esc(c) + "</td>";
      }).join("") + "</tr>";
    }).join("");
    return '<div class="table-wrap"><table class="exhibit-table"><thead>' + head + "</thead><tbody>" + rows + "</tbody></table></div>";
  }

  function niceMax(v) {
    if (v <= 0) return { max: 10, step: 2 };
    var pow = Math.pow(10, Math.floor(Math.log10(v)));
    var steps = [1, 2, 2.5, 5, 10];
    for (var i = 0; i < steps.length; i++) {
      var step = (steps[i] * pow) / 2;
      var m = Math.ceil(v / step) * step;
      if (m / step <= 6) return { max: m, step: step };
    }
    return { max: Math.ceil(v / pow) * pow, step: pow };
  }

  function barHTML(ex) {
    var cats = ex.categories, series = ex.series;
    var all = [];
    series.forEach(function (s) { all = all.concat(s.values); });
    var scale = niceMax(Math.max.apply(null, all) * 1.08);
    var W = 560, H = 280, L = 44, R = 12, T = 16, B = 34;
    var plotW = W - L - R, plotH = H - T - B;
    var groupW = plotW / cats.length;
    var barW = Math.min(36, (groupW * 0.72) / series.length);
    var y = function (v) { return T + plotH - (v / scale.max) * plotH; };
    var out = '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(ex.title || "Bar chart") + '">';
    for (var g = 0; g <= scale.max + 1e-9; g += scale.step) {
      out += '<line class="grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(g).toFixed(1) + '" y2="' + y(g).toFixed(1) + '"/>';
      out += '<text class="tick" x="' + (L - 6) + '" y="' + (y(g) + 4).toFixed(1) + '" text-anchor="end">' + +g.toFixed(2) + "</text>";
    }
    cats.forEach(function (c, ci) {
      var gx = L + ci * groupW + (groupW - barW * series.length) / 2;
      series.forEach(function (s, si) {
        var v = s.values[ci];
        var bx = gx + si * barW;
        out += '<rect class="bar s' + (si % 3) + '" x="' + (bx + 1).toFixed(1) + '" y="' + y(v).toFixed(1) + '" width="' + (barW - 2).toFixed(1) + '" height="' + (T + plotH - y(v)).toFixed(1) + '"/>';
        out += '<text class="val" x="' + (bx + barW / 2).toFixed(1) + '" y="' + (y(v) - 4).toFixed(1) + '" text-anchor="middle">' + esc(v) + "</text>";
      });
      out += '<text class="cat" x="' + (L + ci * groupW + groupW / 2).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle">' + esc(c) + "</text>";
    });
    out += '<line class="axis" x1="' + L + '" x2="' + (W - R) + '" y1="' + (T + plotH) + '" y2="' + (T + plotH) + '"/>';
    out += "</svg>";
    var legend = series.length > 1 ? '<div class="legend">' + series.map(function (s, si) {
      return '<span><i class="sw s' + (si % 3) + '"></i>' + esc(s.name) + "</span>";
    }).join("") + "</div>" : "";
    return '<div class="chart-wrap">' + legend + out + (ex.unit ? '<div class="unit">Unit: ' + esc(ex.unit) + "</div>" : "") + "</div>";
  }

  function exhibitHTML(ex) {
    if (!ex) return "";
    var inner = ex.type === "bar" ? barHTML(ex) : tableHTML(ex);
    return '<figure class="exhibit">' +
      (ex.title ? "<figcaption>" + esc(ex.title) + "</figcaption>" : "") + inner +
      (ex.note ? '<p class="exhibit-note">' + esc(ex.note) + "</p>" : "") + "</figure>";
  }

  window.EPSO_RENDER = { esc: esc, figureSVG: figureSVG, exhibitHTML: exhibitHTML };
})();
