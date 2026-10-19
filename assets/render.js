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
      case "wedge": {
        // A sector of a divided circle; angles in degrees, clockwise from 12 o'clock.
        var a0 = ((num(s.a0, 0) - 90) * Math.PI) / 180, a1 = ((num(s.a1, 90) - 90) * Math.PI) / 180;
        var large = num(s.a1, 90) - num(s.a0, 0) > 180 ? 1 : 0;
        return '<path class="' + cls + '" d="M' + x + "," + y + " L" + (x + r * Math.cos(a0)).toFixed(2) + "," + (y + r * Math.sin(a0)).toFixed(2) +
          " A" + r + "," + r + " 0 " + large + " 1 " + (x + r * Math.cos(a1)).toFixed(2) + "," + (y + r * Math.sin(a1)).toFixed(2) + ' Z"/>';
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
    var hint = ex.columns.length > 4 ? '<p class="table-scroll-hint small muted">Scroll sideways to see all columns.</p>' : '';
    return hint + '<div class="table-wrap" tabindex="0" role="region" aria-label="' + esc(ex.title || 'Data table') + '"><table class="exhibit-table"><thead>' + head + "</thead><tbody>" + rows + "</tbody></table></div>";
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
        out += '<rect class="bar s' + (si % 4) + '" x="' + (bx + 1).toFixed(1) + '" y="' + y(v).toFixed(1) + '" width="' + (barW - 2).toFixed(1) + '" height="' + (T + plotH - y(v)).toFixed(1) + '"/>';
        out += '<text class="val" x="' + (bx + barW / 2).toFixed(1) + '" y="' + (y(v) - 4).toFixed(1) + '" text-anchor="middle">' + fmtVal(v) + "</text>";
      });
      out += '<text class="cat" x="' + (L + ci * groupW + groupW / 2).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle">' + esc(c) + "</text>";
    });
    out += '<line class="axis" x1="' + L + '" x2="' + (W - R) + '" y1="' + (T + plotH) + '" y2="' + (T + plotH) + '"/>';
    out += "</svg>";
    return '<div class="chart-wrap">' + legendHTML(series) + out + chartTables(ex) + (ex.unit ? '<div class="unit">Unit: ' + esc(ex.unit) + "</div>" : "") + "</div>";
  }

  // N7: chart values are also available as a table (screen readers, keyboard), behind a toggle so the
  // visual task is unchanged. N9: on narrow phones the table replaces the chart (see styles.css).
  function chartTables(ex, totals) {
    var t = dataTableHTML(ex, totals);
    return '<details class="data-details"><summary>Show the values as a table</summary>' + t + "</details>" +
      '<div class="chart-table-sm">' + t + "</div>";
  }

  function fmtVal(v) {
    return typeof v === "number" ? String(+v.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : esc(v);
  }

  function legendHTML(series) {
    return series.length > 1 ? '<div class="legend">' + series.map(function (s, si) {
      return '<span><i class="sw s' + (si % 4) + '"></i>' + esc(s.name) + "</span>";
    }).join("") + "</div>" : "";
  }

  function axisHTML(scale, y, L, Rr, W) {
    var out = "";
    for (var g = 0; g <= scale.max + 1e-9; g += scale.step) {
      out += '<line class="grid" x1="' + L + '" x2="' + (W - Rr) + '" y1="' + y(g).toFixed(1) + '" y2="' + y(g).toFixed(1) + '"/>';
      out += '<text class="tick" x="' + (L - 6) + '" y="' + (y(g) + 4).toFixed(1) + '" text-anchor="end">' + fmtVal(+g.toFixed(2)) + "</text>";
    }
    return out;
  }

  function stackedHTML(ex) {
    var cats = ex.categories, series = ex.series;
    var totals = cats.map(function (c, ci) { return series.reduce(function (t, s) { return t + s.values[ci]; }, 0); });
    var scale = niceMax(Math.max.apply(null, totals) * 1.1);
    var W = 560, H = 290, L = 48, Rr = 12, T = 18, B = 34;
    var plotW = W - L - Rr, plotH = H - T - B;
    var groupW = plotW / cats.length, barW = Math.min(54, groupW * 0.6);
    var y = function (v) { return T + plotH - (v / scale.max) * plotH; };
    var out = '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(ex.title || "Stacked bar chart") + '">' + axisHTML(scale, y, L, Rr, W);
    cats.forEach(function (c, ci) {
      var x = L + ci * groupW + (groupW - barW) / 2, acc = 0;
      series.forEach(function (s, si) {
        var v = s.values[ci], y0 = y(acc), y1 = y(acc + v);
        out += '<rect class="bar s' + (si % 4) + '" x="' + x.toFixed(1) + '" y="' + y1.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + (y0 - y1).toFixed(1) + '"/>';
        if (y0 - y1 >= 13) out += '<text class="seg" x="' + (x + barW / 2).toFixed(1) + '" y="' + ((y0 + y1) / 2 + 4).toFixed(1) + '" text-anchor="middle">' + fmtVal(v) + "</text>";
        acc += v;
      });
      out += '<text class="val" x="' + (x + barW / 2).toFixed(1) + '" y="' + (y(acc) - 4).toFixed(1) + '" text-anchor="middle">' + fmtVal(+acc.toFixed(2)) + "</text>";
      out += '<text class="cat" x="' + (x + barW / 2).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle">' + esc(c) + "</text>";
    });
    out += '<line class="axis" x1="' + L + '" x2="' + (W - Rr) + '" y1="' + (T + plotH) + '" y2="' + (T + plotH) + '"/></svg>';
    // Segments too small to label are listed in a visible table, as before; every chart also gets the toggle.
    var hidden = series.some(function (s) { return s.values.some(function (v) { return (v / scale.max) * plotH < 13; }); });
    return '<div class="chart-wrap">' + legendHTML(series) + out + (hidden ? '<div class="small-values">' + dataTableHTML(ex, totals) + "</div>" : "") + chartTables(ex, totals) + (ex.unit ? '<div class="unit">Unit: ' + esc(ex.unit) + " · totals shown above bars</div>" : "") + "</div>";
  }

  function lineHTML(ex) {
    var cats = ex.categories, series = ex.series, all = [];
    series.forEach(function (s) { all = all.concat(s.values); });
    var scale = niceMax(Math.max.apply(null, all) * 1.12);
    var W = 560, H = 290, L = 48, Rr = 24, T = 18, B = 34;
    var plotW = W - L - Rr, plotH = H - T - B;
    var x = function (i) { return L + 16 + (i * (plotW - 32)) / (cats.length - 1); };
    var y = function (v) { return T + plotH - (v / scale.max) * plotH; };
    var out = '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(ex.title || "Line chart") + '">' + axisHTML(scale, y, L, Rr, W);
    series.forEach(function (s, si) {
      out += '<path class="ln s' + (si % 4) + '" d="' + s.values.map(function (v, i) { return (i ? "L" : "M") + x(i).toFixed(1) + "," + y(v).toFixed(1); }).join(" ") + '"/>';
      s.values.forEach(function (v, i) {
        out += '<circle class="pt s' + (si % 4) + '" cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="3.5"/>';
      });
    });
    // Value labels above each point, pushed apart vertically where series run close together.
    cats.forEach(function (c, i) {
      var pts = series.map(function (s, si) { return { si: si, v: s.values[i], ly: y(s.values[i]) - 7 }; }).sort(function (a, b) { return b.ly - a.ly; });
      for (var k = 1; k < pts.length; k++) if (pts[k - 1].ly - pts[k].ly < 12) pts[k].ly = pts[k - 1].ly - 12;
      pts.forEach(function (pt) {
        out += '<text class="val lv s' + (pt.si % 4) + '" x="' + x(i).toFixed(1) + '" y="' + Math.max(10, pt.ly).toFixed(1) + '" text-anchor="middle">' + fmtVal(pt.v) + "</text>";
      });
    });
    cats.forEach(function (c, i) { out += '<text class="cat" x="' + x(i).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle">' + esc(c) + "</text>"; });
    out += '<line class="axis" x1="' + L + '" x2="' + (W - Rr) + '" y1="' + (T + plotH) + '" y2="' + (T + plotH) + '"/></svg>';
    return '<div class="chart-wrap">' + legendHTML(series) + out + chartTables(ex) + (ex.unit ? '<div class="unit">Unit: ' + esc(ex.unit) + "</div>" : "") + "</div>";
  }

  function dataTableHTML(ex, totals) {
    var rows = ex.series.map(function (s) { return { name: s.name, values: s.values }; });
    if (totals) rows.push({ name: "Total", values: totals });
    return '<div class="table-wrap"><table class="exhibit-table compact"><thead><tr><th scope="col"><span class="sr-only">Series</span></th>' + ex.categories.map(function (c) { return '<th scope="col" class="num">' + esc(c) + "</th>"; }).join("") +
      "</tr></thead><tbody>" + rows.map(function (s) {
        return '<tr><th scope="row">' + esc(s.name) + "</th>" + s.values.map(function (v) { return '<td class="num">' + fmtVal(+(+v).toFixed(2)) + "</td>"; }).join("") + "</tr>";
      }).join("") + "</tbody></table></div>";
  }

  function pieHTML(ex) {
    var total = ex.slices.reduce(function (t, s) { return t + s.value; }, 0);
    var cx = 110, cy = 110, r = 96, a0 = -Math.PI / 2, out = "";
    ex.slices.forEach(function (s, i) {
      var a1 = a0 + (s.value / total) * Math.PI * 2;
      var large = a1 - a0 > Math.PI ? 1 : 0;
      var p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
      out += '<path class="slice p' + (i % 6) + '" d="M' + cx + "," + cy + " L" + p0[0].toFixed(1) + "," + p0[1].toFixed(1) + " A" + r + "," + r + " 0 " + large + " 1 " + p1[0].toFixed(1) + "," + p1[1].toFixed(1) + ' Z"/>';
      a0 = a1;
    });
    var legend = '<ul class="pie-legend">' + ex.slices.map(function (s, i) {
      return '<li><i class="sw p' + (i % 6) + '"></i><span>' + esc(s.label) + "</span><b>" + fmtVal(s.value) + (ex.unit === "%" ? "%" : "") + "</b></li>";
    }).join("") + "</ul>";
    return '<div class="pie-wrap"><svg class="pie" viewBox="0 0 220 220" role="img" aria-label="' + esc(ex.title || "Pie chart") + '">' + out + "</svg>" + legend + "</div>" +
      (ex.unit && ex.unit !== "%" ? '<div class="unit">Unit: ' + esc(ex.unit) + "</div>" : "");
  }

  function exhibitHTML(ex) {
    if (!ex) return "";
    var inner = ex.type === "bar" ? barHTML(ex) : ex.type === "stacked" ? stackedHTML(ex) : ex.type === "line" ? lineHTML(ex) : ex.type === "pie" ? pieHTML(ex) : tableHTML(ex);
    return '<figure class="exhibit">' +
      (ex.title ? "<figcaption>" + esc(ex.title) + "</figcaption>" : "") + inner +
      (ex.note ? '<p class="exhibit-note">' + esc(ex.note) + "</p>" : "") + "</figure>";
  }

  window.EPSO_RENDER = { esc: esc, figureSVG: figureSVG, exhibitHTML: exhibitHTML };
})();
