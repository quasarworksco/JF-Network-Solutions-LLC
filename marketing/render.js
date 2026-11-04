// Renders marketing/src/*.html into print-ready PDF + 300 dpi PNG in entrega/descargas/.
// Run: python3 marketing/build.py && node marketing/render.js
const { chromium } = require("playwright");
const path = require("path");

const SRC = path.join(__dirname, "src");
const OUT = path.join(__dirname, "..", "entrega", "descargas");
const DPR = 300 / 96; // 300 dpi

const flyers = ["flyer-1-servicios", "flyer-2-fibra-datacenter", "flyer-3-cctv-wifi"];

(async () => {
  const browser = await chromium.launch();

  async function open(name, w, h) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DPR });
    await page.goto("file://" + path.join(SRC, name + ".html"));
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    return page;
  }

  for (const f of flyers) {
    const page = await open(f, 816, 1056);
    await page.locator(".page").screenshot({ path: path.join(OUT, f + ".png") });
    await page.pdf({ path: path.join(OUT, f + ".pdf"), width: "8.5in", height: "11in", printBackground: true, preferCSSPageSize: true });
    await page.close();
    console.log("rendered", f);
  }

  const card = await open("tarjeta-presentacion", 336, 192);
  await card.locator("#front").screenshot({ path: path.join(OUT, "tarjeta-frente.png") });
  await card.locator("#back").screenshot({ path: path.join(OUT, "tarjeta-reverso.png") });
  await card.pdf({ path: path.join(OUT, "tarjeta-presentacion.pdf"), width: "3.5in", height: "2in", printBackground: true, preferCSSPageSize: true });
  await card.close();
  console.log("rendered tarjeta");

  await browser.close();
})();
