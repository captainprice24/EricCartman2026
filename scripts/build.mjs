#!/usr/bin/env node
// Bundles the app and every question set into single HTML files:
//   dist/ad5-reasoning-trainer.html  standalone page (double-click to open, works offline except fonts)
//   dist/artifact.html               same page without the <html>/<head> wrapper, for publishing as a claude.ai Artifact
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const safe = (js) => js.replace(/<\/script/gi, "<\\/script");

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(read("questions/manifest.js"), ctx);
const setFiles = ctx.window.EPSO_SET_FILES || [];

const scripts = [
  read("questions/registry.js"),
  "window.EPSO_BUNDLED = true;",
  ...setFiles.map((f) => read("questions/" + f)),
  read("assets/lessons.js"),
  read("assets/render.js"),
  read("assets/app.js")
].map((js) => "<script>\n" + safe(js) + "\n</script>").join("\n");

const index = read("index.html");
const css = read("assets/styles.css");
let page = index
  .replace('<link rel="stylesheet" href="assets/styles.css">', () => "<style>\n" + css + "\n</style>")
  .replace(/<!-- build:inline -->[\s\S]*<!-- \/build:inline -->/, () => scripts);

fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist/ad5-reasoning-trainer.html"), page);

const head = page.slice(page.indexOf("<head>") + 6, page.indexOf("</head>"))
  .replace(/<meta charset[^>]*>\s*/, "")
  .replace(/<meta name="viewport"[^>]*>\s*/, "");
const body = page.slice(page.indexOf("<body>") + 6, page.indexOf("</body>"));
fs.writeFileSync(path.join(root, "dist/artifact.html"), head.trim() + "\n" + body.trim() + "\n");
console.log(`Built dist/ad5-reasoning-trainer.html and dist/artifact.html with ${setFiles.length} question sets.`);
