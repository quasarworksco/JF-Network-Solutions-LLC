/* JF Network Solutions — interactions & motion */
(() => {
  "use strict";

  /* ------------------------------------------------------------------
     CONFIG — edit here
     ------------------------------------------------------------------ */
  const CONFIG = {
    phone: "17868581161",      // WhatsApp / calls (digits only, with country code)
    email: "info@jfnetworksolutions.com"
  };

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const dict = window.I18N;

  /* ------------------------------------------------------------------
     i18n
     ------------------------------------------------------------------ */
  let lang = "es";
  const t = (k) => (dict[lang] && dict[lang][k]) ?? dict.es[k] ?? k;

  function initialLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && dict[q]) return q;
    try { const s = localStorage.getItem("jf-lang"); if (s && dict[s]) return s; } catch (_) {}
    return (navigator.language || "es").toLowerCase().startsWith("en") ? "en" : "es";
  }

  function buildMarquee() {
    const track = $(".marquee__track");
    if (!track) return;
    const items = t("marquee");
    const html = items.map((w) => `<span>${w}</span><i></i>`).join("");
    track.innerHTML = html + html;
  }

  function applyLang(next, animate) {
    lang = next;
    const run = () => {
      document.documentElement.lang = lang;
      document.title = t("meta.title");
      $('meta[name="description"]').setAttribute("content", t("meta.desc"));
      $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
      $$("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
      $$("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
      $(".lang").dataset.active = lang;
      buildMarquee();
      updateWaLinks();
      if (CONFIG.email) $(".form__note").textContent = t("f.noteEmail");
      document.body.classList.remove("is-switching");
    };
    try { localStorage.setItem("jf-lang", lang); } catch (_) {}
    if (animate && !reduced) { document.body.classList.add("is-switching"); setTimeout(run, 220); }
    else run();
  }

  $$("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.lang !== lang) applyLang(b.dataset.lang, true);
  }));

  function waURL(text) { return `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(text)}`; }
  function updateWaLinks() { $$(".wa-link").forEach((a) => { a.href = waURL(t("wa.default")); }); }

  /* email (enabled once CONFIG.email is set) */
  if (CONFIG.email) {
    $$(".email-card, .email-li").forEach((el) => { el.hidden = false; });
    $$(".email-card, .email-link").forEach((a) => { a.href = `mailto:${CONFIG.email}`; });
    $$(".email-text, .email-link").forEach((el) => { el.textContent = CONFIG.email; });
  }

  applyLang(initialLang(), false);
  $("#year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     NAV: scrolled state, burger, active section
     ------------------------------------------------------------------ */
  const nav = $("#nav");
  const burger = $("#burger");
  const links = $("#navLinks");
  const progress = $(".scroll-progress span");
  const waFloat = $(".wa-float");

  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", String(open));
    links.classList.toggle("is-open", open);
  });
  $$("a", links).forEach((a) => a.addEventListener("click", () => {
    burger.setAttribute("aria-expanded", "false");
    links.classList.remove("is-open");
  }));

  const sections = $$("main section[id]");
  const navMap = new Map($$("a", links).map((a) => [a.getAttribute("href").slice(1), a]));
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navMap.forEach((a) => a.classList.remove("is-active"));
      const a = navMap.get(e.target.id);
      if (a) a.classList.add("is-active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => secObs.observe(s));

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); revObs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal").forEach((el) => revObs.observe(el));

  /* ------------------------------------------------------------------
     Scroll-linked: progress fiber, timeline fill, parallax
     ------------------------------------------------------------------ */
  const timeline = $("#timeline");
  const fill = $(".timeline__fill");
  const steps = $$(".step");
  const bandImg = $(".brandband__img");
  const lightSecs = $$(".section--light");
  if (!reduced) document.documentElement.classList.add("js-clip");
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("is-scrolled", y > 20);
    waFloat.classList.toggle("is-visible", y > innerHeight * 0.6);

    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const start = innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (start - r.top) / r.height));
      fill.style.transform = `scaleY(${p})`;
      steps.forEach((s) => {
        const sr = s.getBoundingClientRect();
        s.classList.toggle("is-lit", sr.top + 32 < start);
      });
    }
    if (!reduced) {
      lightSecs.forEach((sec) => {
        const r = sec.getBoundingClientRect();
        if (r.top > innerHeight || r.bottom < 0) return;
        const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.75)));
        sec.style.setProperty("--ci", `${((1 - p) * 5).toFixed(2)}%`);
        sec.style.setProperty("--cr", `${((1 - p) * 40).toFixed(1)}px`);
      });
    }
    if (bandImg && !reduced) {
      const r = bandImg.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        bandImg.style.transform = `translate3d(0, ${p * -60}px, 0) scale(1.05)`;
      }
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ------------------------------------------------------------------
     Card spotlight + magnetic buttons (desktop only)
     ------------------------------------------------------------------ */
  if (finePointer && !reduced) {
    $$(".card").forEach((c) => c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    }));
    $$(".magnetic").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        b.style.transform = `translate(${x}px, ${y}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  /* ------------------------------------------------------------------
     Rack builder (data center visual)
     ------------------------------------------------------------------ */
  const rack = $("#rack");
  if (rack) {
    const colors = ["#2bb0ff", "#2bb0ff", "#39e58c", "#2bb0ff", "#ffb648"];
    const cableColors = ["#0a74f0", "#2bb0ff", "#e9eef6", "#ffb648", "#39e58c"];
    const rows = [
      ["panel", "PATCH 01"], ["cable"], ["switch", "SW‑CORE"], ["panel", "PATCH 02"], ["cable"],
      ["switch", "SW‑POE"], ["fiber", "FIBER LIU"], ["switch", "NVR"], ["panel", "PATCH 03"]
    ];
    let html = "";
    rows.forEach(([type, label], i) => {
      const delay = `style="transition-delay:${(i * 0.08).toFixed(2)}s"`;
      if (type === "cable") {
        html += `<div class="ru ru--cable" ${delay}>` +
          Array.from({ length: 12 }, (_, k) => `<span style="--c:${cableColors[k % cableColors.length]};--y:${Math.sin(k) * 2}px"></span>`).join("") + `</div>`;
        return;
      }
      const n = type === "fiber" ? 12 : 16;
      const ports = Array.from({ length: n }, () => {
        const on = Math.random() > (type === "panel" ? 0.55 : 0.2);
        const c = type === "fiber" ? "#9fe0ff" : colors[Math.floor(Math.random() * colors.length)];
        return `<span class="ru__port${on ? " on" : ""}" style="--c:${c};--d:${(0.6 + Math.random() * 1.6).toFixed(2)}s;--dl:${(-Math.random() * 2).toFixed(2)}s"></span>`;
      }).join("");
      html += `<div class="ru${type === "panel" ? " ru--panel" : ""}" ${delay}>${ports}<span class="ru__label">${label}</span></div>`;
    });
    rack.insertAdjacentHTML("beforeend", html);
    const rObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { rack.classList.add("is-in"); rObs.disconnect(); }
    }, { threshold: 0.25 });
    rObs.observe(rack);
  }

  /* ------------------------------------------------------------------
     Counters
     ------------------------------------------------------------------ */
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target; const to = +el.dataset.to; const dur = 1600; const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      reduced ? (el.textContent = to) : requestAnimationFrame(tick);
      cObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$(".count").forEach((el) => cObs.observe(el));

  /* ------------------------------------------------------------------
     Hero network canvas — nodes, links and light pulses
     ------------------------------------------------------------------ */
  const canvas = $("#netCanvas");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, nodes = [], pulses = [], running = true, mouse = { x: -999, y: -999 };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6
      }));
      pulses = [];
    }
    const LINK = 150;

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
        if (d < 180) { n.x -= dx * 0.004; n.y -= dy * 0.004; }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const o = 1 - d / LINK;
            ctx.strokeStyle = `rgba(140,170,220,${o * 0.14})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            if (pulses.length < 12 && Math.random() < 0.0009) pulses.push({ a, b, t: 0, s: 0.008 + Math.random() * 0.014 });
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(170,190,220,.45)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      pulses = pulses.filter((p) => {
        p.t += p.s;
        if (p.t >= 1) return false;
        const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.fillStyle = "#2b8cff"; ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
        return true;
      });
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize", resize);
    canvas.parentElement.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
    new IntersectionObserver(([e]) => {
      const was = running; running = e.isIntersecting && !document.hidden;
      if (running && !was) requestAnimationFrame(frame);
    }).observe(canvas);
    document.addEventListener("visibilitychange", () => {
      const was = running; running = !document.hidden;
      if (running && !was) requestAnimationFrame(frame);
    });
    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------------
     Contact form → WhatsApp (and email when configured)
     ------------------------------------------------------------------ */
  const form = $("#contactForm");
  const success = $(".form__success", form);
  const F = form.elements;

  function setErr(el, on) { el.classList.toggle("has-error", on); }
  function validate() {
    let ok = true;
    const name = F.name.value.trim();
    const phone = F.phone.value.replace(/[^\d+]/g, "");
    const email = F.email.value.trim();
    const svc = $$('input[name="services"]:checked', form);
    setErr(F.name.closest(".field"), !name); if (!name) ok = false;
    const pOk = phone.replace(/\D/g, "").length >= 7;
    setErr(F.phone.closest(".field"), !pOk); if (!pOk) ok = false;
    const eOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErr(F.email.closest(".field"), !eOk); if (!eOk) ok = false;
    setErr($(".chips", form), svc.length === 0); if (!svc.length) ok = false;
    return ok;
  }
  $$("input, textarea", form).forEach((el) => el.addEventListener("input", () => {
    const f = el.closest(".field, .chips"); if (f && f.classList.contains("has-error")) validate();
  }));

  function buildMessage() {
    const label = (sel) => sel.options[sel.selectedIndex].textContent;
    const svc = $$('input[name="services"]:checked', form).map((c) => c.nextElementSibling.textContent);
    const pref = $('input[name="pref"]:checked', form);
    const lines = [
      t("wa.greet"), "",
      `• ${t("msg.name")}: ${F.name.value.trim()}`,
      F.company.value.trim() && `• ${t("msg.company")}: ${F.company.value.trim()}`,
      `• ${t("msg.phone")}: ${F.phone.value.trim()}`,
      F.email.value.trim() && `• ${t("msg.email")}: ${F.email.value.trim()}`,
      `• ${t("msg.services")}: ${svc.join(", ")}`,
      `• ${t("msg.property")}: ${label(F.property)}`,
      `• ${t("msg.timeline")}: ${label(F.timeline)}`,
      `• ${t("msg.pref")}: ${pref.nextElementSibling.textContent}`,
      F.message.value.trim() && `\n${t("msg.details")}:\n${F.message.value.trim()}`
    ];
    return lines.filter(Boolean).join("\n");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      const first = $(".has-error input, .has-error", form);
      first && first.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      return;
    }
    const msg = buildMessage();
    const pref = $('input[name="pref"]:checked', form).value;
    let url = waURL(msg);
    if (pref === "email" && CONFIG.email) {
      url = `mailto:${CONFIG.email}?subject=${encodeURIComponent(t("msg.subject") + F.name.value.trim())}&body=${encodeURIComponent(msg)}`;
    }
    $("#waFallback").href = url;
    success.hidden = false;
    window.open(url, "_blank", "noopener");
  });

  $("#formReset").addEventListener("click", () => {
    form.reset(); success.hidden = true;
    $$(".has-error", form).forEach((el) => el.classList.remove("has-error"));
  });
})();
