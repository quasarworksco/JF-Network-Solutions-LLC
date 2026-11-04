"""Generates the print pieces' HTML (3 flyers + business card) into marketing/src/.

Run:  python3 marketing/build.py && node marketing/render.js
"""
from pathlib import Path

SRC = Path(__file__).parent / "src"
IMG = "../../assets/img"

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,700;0,800;1,700;1,800;1,900'
         '&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">')

SPRITE = """<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></symbol>
<symbol id="i-wa" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-3.3-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.07 4.8 4.8 0 0 0 1 2.56 11 11 0 0 0 4.2 3.7c1.57.68 2.18.73 2.97.62.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.17-.48-.29z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>
<symbol id="i-web" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></symbol>
<symbol id="i-dc" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="5" rx="1"/><rect x="4" y="10" width="16" height="5" rx="1"/><rect x="4" y="17" width="16" height="4" rx="1"/><path d="M7 5.5h.01M7 12.5h.01M10 5.5h4M10 12.5h4"/></symbol>
<symbol id="i-fiber" viewBox="0 0 24 24"><path d="M3 20 12 11M12 11l4-8M12 11l7-4M12 11l9 1M12 11l6 6"/><circle cx="16" cy="3" r="1.3"/><circle cx="19" cy="7" r="1.3"/><circle cx="21" cy="12" r="1.3"/><circle cx="18" cy="17" r="1.3"/></symbol>
<symbol id="i-rj45" viewBox="0 0 24 24"><path d="M2 12h5"/><rect x="7" y="8" width="7" height="8" rx="1"/><path d="M14 9h6v6h-6M16 9v-1.5M18 9v-1.5M16 15v1.5M18 15v1.5"/></symbol>
<symbol id="i-copper" viewBox="0 0 24 24"><path d="M2 8c3 0 3 8 6 8s3-8 6-8 3 8 6 8h2"/><path d="M2 16c3 0 3-8 6-8s3 8 6 8 3-8 6-8h2"/></symbol>
<symbol id="i-cam" viewBox="0 0 24 24"><path d="M3 7l12-3 2 6-12 3z"/><path d="M17 8l4-1v4l-4 1"/><path d="M8 12.5 9 17H4v3"/><circle cx="9" cy="8.5" r="1"/></symbol>
<symbol id="i-ap" viewBox="0 0 24 24"><path d="M5 9a10 10 0 0 1 14 0M8 12a6 6 0 0 1 8 0"/><circle cx="12" cy="15" r="1"/><rect x="5" y="18" width="14" height="3" rx="1.5"/></symbol>
<symbol id="i-net" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="13" r="2"/><path d="M12 7v4M10.6 14.4 6.4 16.6M13.4 14.4l4.2 2.2"/></symbol>
<symbol id="i-tool" viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/></symbol>
<symbol id="i-phoneapp" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></symbol>
<symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></symbol>
</svg>"""

PHONE = "+1 (786) 858-1161"
EMAIL = "info@jfnetworksolutions.com"
WEB = "jfnetworksolutions.com"


def icon(name, fill=False):
    return f'<svg class="ic{" ic--fill" if fill else ""}"><use href="#i-{name}"/></svg>'


def lockup(ink=False):
    return (f'<div class="lockup{" lockup--ink" if ink else ""}"><img src="{IMG}/logo-mark.svg" alt="">'
            '<div class="lockup__text"><span class="lockup__name">NETWORK</span><span class="lockup__sub">SOLUTIONS LLC</span></div></div>')


def contact_bar(cta):
    return f"""<div class="contact">
  <div>
    <div class="contact__cta">{cta}</div>
    <div class="contact__list">
      <span>{icon('phone', True)}{PHONE}</span>
      <span class="wa">{icon('wa', True)}WhatsApp {PHONE}</span>
      <span>{icon('mail')}{EMAIL}</span>
      <span>{icon('web')}{WEB}</span>
    </div>
  </div>
  <div class="qr"><img src="qr-web.svg" alt=""><small>Escanéame</small></div>
</div>"""


def doc(title, body, size="letter"):
    page_size = "8.5in 11in" if size == "letter" else "3.5in 2in"
    return f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>{title}</title>{FONTS}
<link rel="stylesheet" href="print.css"><style>@page {{ size: {page_size}; margin: 0; }}</style></head>
<body>{SPRITE}
{body}
</body></html>
"""


SERVICES = [
    ("dc", "Data Center", "Racks, gabinetes y patching"),
    ("fiber", "Fibra Óptica", "Fusión, conectores y OTDR"),
    ("rj45", "Cableado Estructurado", "Cat6 / Cat6A certificado"),
    ("copper", "Cable de Cobre", "Multipar, voz y 110/66"),
    ("cam", "Cámaras CCTV", "IP, PoE, NVR y app"),
    ("ap", "Access Points", "Wi‑Fi 6/6E y site survey"),
    ("net", "Redes & Switching", "VLAN, firewall, routers"),
    ("tool", "Soporte 24/7", "Diagnóstico y reparación"),
]

flyer1 = f"""<section class="page page--letter f1">
  <div class="top">{lockup()}<span class="tag">FIBRA · DATA CENTER · CCTV · WI‑FI</span></div>
  <div class="hero">
    <span class="eyebrow">Infraestructura de red</span>
    <h1 class="h1">Conectamos tu negocio<br><span class="soft">a la velocidad de la luz.</span></h1>
    <p class="lead">Diseñamos, instalamos, probamos y documentamos tu red. Instalaciones limpias y certificadas para oficinas, comercios, data centers y residencias.</p>
  </div>
  <div class="photo"><img src="img/datacenter.jpg" alt=""></div>
  <div class="svc-grid">
    {''.join(f'<div class="svc">{icon(i)}<b>{t}</b><small>{d}</small></div>' for i, t, d in SERVICES)}
  </div>
  {contact_bar('Solicita tu cotización hoy.')}
</section>"""

flyer2 = f"""<section class="page page--letter f2">
  <div class="photo">
    <img src="img/team.jpg" alt="">
    {lockup()}
    <div class="badge"><span class="mono">OTDR · Cat6A</span><b>100% probado</b><small>antes de entregar</small></div>
  </div>
  <div class="body">
    <div>
      <span class="eyebrow">Fibra óptica & data center</span>
      <h1 class="h1">Orden, velocidad y <span class="blue">cero caos</span> en tu red.</h1>
      <p class="lead">Un cuarto de red bien hecho es más fácil de mantener, más seguro y más rápido de diagnosticar. Así dejamos el tuyo.</p>
    </div>
    <ul class="checks">
      <li><i></i><div>Fibra monomodo y multimodo<small>Empalmes por fusión y pruebas OTDR con reporte</small></div></li>
      <li><i></i><div>Racks, gabinetes y bandejas<small>Rutas limpias, escalables y bien ventiladas</small></div></li>
      <li><i></i><div>Cableado Cat6 / Cat6A certificado<small>Cada punto probado, listo para 10 Gbps</small></div></li>
      <li><i></i><div>Etiquetado y planos as‑built<small>Identifica cualquier puerto en segundos</small></div></li>
      <li><i></i><div>Soporte y emergencias 24/7<small>Diagnóstico y reparación cuando lo necesites</small></div></li>
    </ul>
  </div>
  {contact_bar('Agenda tu visita técnica.')}
</section>"""

flyer3 = f"""<section class="page page--letter f3">
  <div class="top">{lockup()}</div>
  <div class="hero">
    <span class="eyebrow">Cámaras de seguridad & Wi‑Fi</span>
    <h1 class="h1">Seguridad y Wi‑Fi<br>para tu negocio, <span class="blue">sin puntos ciegos.</span></h1>
  </div>
  <div class="pics">
    <div class="pic"><img src="img/cctv.jpg" alt=""><span>CCTV IP</span></div>
    <div class="pic"><img src="img/wifi.jpg" alt=""><span>Wi‑Fi empresarial</span></div>
  </div>
  <div class="feats">
    <div class="feat"><div class="box">{icon('cam')}</div><div><b>Cámaras IP con PoE y NVR</b><small>Cobertura planificada, grabación continua y alta resolución.</small></div></div>
    <div class="feat"><div class="box">{icon('phoneapp')}</div><div><b>Míralas desde tu celular</b><small>Acceso remoto seguro, estés donde estés.</small></div></div>
    <div class="feat"><div class="box">{icon('ap')}</div><div><b>Access Points Wi‑Fi 6 / 6E</b><small>Site survey, instalación en techo y roaming sin cortes.</small></div></div>
    <div class="feat"><div class="box">{icon('lock')}</div><div><b>Redes seguras y separadas</b><small>Red de invitados, VLANs y firewall configurados.</small></div></div>
  </div>
  {contact_bar('Protege y conecta tu espacio.')}
</section>"""

card = f"""<section class="page page--card card-front" id="front">
  <div>
    <img class="mark" src="{IMG}/logo-mark.svg" alt="">
    <div class="word"><b>NETWORK</b><span>SOLUTIONS LLC</span></div>
  </div>
  <div class="tag">FIBRA · CABLEADO · DATA CENTER · CCTV · WI‑FI</div>
  <div class="rule"></div>
</section>
<section class="page page--card card-back" id="back">
  <div class="rule"></div>
  <div>
    {lockup(ink=True)}
    <ul>
      <li>{icon('phone', True)}{PHONE}</li>
      <li class="wa">{icon('wa', True)}WhatsApp</li>
      <li>{icon('mail')}{EMAIL}</li>
      <li>{icon('web')}{WEB}</li>
    </ul>
  </div>
  <div class="qr"><img src="qr-web.svg" alt=""><small>Escanéame</small></div>
</section>"""

pieces = {
    "flyer-1-servicios.html": doc("Flyer 1 · Servicios — JF Network Solutions", flyer1),
    "flyer-2-fibra-datacenter.html": doc("Flyer 2 · Fibra y Data Center — JF Network Solutions", flyer2),
    "flyer-3-cctv-wifi.html": doc("Flyer 3 · CCTV y Wi‑Fi — JF Network Solutions", flyer3),
    "tarjeta-presentacion.html": doc("Tarjeta de presentación — JF Network Solutions", card, size="card"),
}
for name, html in pieces.items():
    (SRC / name).write_text(html, encoding="utf-8")
    print("wrote", name)
