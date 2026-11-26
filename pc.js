/* ============================================================
   Radio Argentina - version PC (radio de madera)
   Streams publicos de radios argentinas. Interfaz igual a la imagen
   de referencia: ver pc.html / pc.css (escenario de 1536 x 1024).
   ============================================================ */
'use strict';

// Si la página (HTML) quedó vieja en el navegador y no trajo stations.js / logos.js,
// se recarga una sola vez para pedir el HTML nuevo.
if (typeof STATIONS === "undefined" || typeof RadioLogos === "undefined") {
  try {
    if (!sessionStorage.getItem("ra-reload-once")) { sessionStorage.setItem("ra-reload-once", "1"); location.reload(); }
  } catch (_) {}
  throw new Error("Faltan stations.js o logos.js (HTML viejo en caché).");
}


/* ---- Orden de la lista: primero las de Chaco / Machagai, después por categoría ---- */
const CAT_ORDER = ["chaco", "religiosas", "musica", "noticias", "folklore", "deportes"];
(function sortStations() {
  const catOf = {};
  Object.keys(CAT_BY_ID).forEach(cat => CAT_BY_ID[cat].forEach(id => { catOf[id] = cat; }));
  STATIONS.forEach(st => {
    const top = TOP_IDS.indexOf(st.id);
    st.cat = top >= 0 ? "chaco" : (catOf[st.id] || "musica");   // lo que no está en una lista queda en Música
    st._top = top;
  });
  STATIONS.sort((a, b) => {
    if (a.cat !== b.cat) return CAT_ORDER.indexOf(a.cat) - CAT_ORDER.indexOf(b.cat);
    return a.cat === "chaco" ? a._top - b._top : 0;             // el resto mantiene su orden original
  });
})();



/* ---- Logos de las emisoras ----
   Los datos viven en logos.js (los comparte con la versión móvil).
   st.logo es el primer archivo posible; si no carga, se prueba el siguiente
   y, si no queda ninguno, se muestran las iniciales. */
STATIONS.forEach((st) => { st.logo = RadioLogos.first(st) || null; });

/* ============================================================
   Idiomas (botón "Idioma"): español, inglés y portugués
   ============================================================ */
const LANGS = ["es", "en", "pt"];
const LANG_NAME = { es: "Español", en: "English", pt: "Português" };
const I18N = {
  es: {
    search: "Buscar", memories: "Memorias", language: "Idioma", play: "Reproducir", change: "Cambiar",
    update: "Actualizar", config: "Config", volume: "Volumen", prev: "Anterior", next: "Siguiente",
    playing: "Reproduciendo...", connecting: "Conectando…", paused: "Pausado", nosignal: "Sin señal",
    buffering: "Cargando…", ready: "Listo",
    pick: "Elegí una emisora", online: "Online",
    searchPh: "Buscar emisora o frecuencia…", count: "{n} de {t}",
    empty: "No hay emisoras con ese nombre. Probá con otra palabra o con la frecuencia, por ejemplo 95.9.",
    emptyMem: "Todavía no guardaste emisoras. Pasá el mouse sobre una y tocá la estrella.",
    emptyBand: "No hay emisoras en esta banda.",
    band: "Banda: {b}", bandAll: "Todas",
    memOn: "Memorias", memOff: "Todas las emisoras", memSaved: "Guardada en Memorias", memRemoved: "Quitada de Memorias",
    starAdd: "Guardar en Memorias", starDel: "Quitar de Memorias",
    langToast: "Idioma: {l}", vol: "Volumen {n}%", muted: "Silenciado",
    updNew: "¡Nueva!", updBusy: "Buscando…", updApply: "Instalando…", updOk: "Al día", updErr: "Sin red",
    updNewMsg: "Hay una actualización nueva", updOkMsg: "Estás al día", updErrMsg: "Sin conexión",
    updApplyMsg: "Instalando la actualización…", updBusyMsg: "Buscando actualización…",
    cfgTitle: "Configuración", cfgNote: "Sin publicidad. Solo buena música.", close: "Cerrar",
    cfgKeys: "Atajos de teclado", kPlay: "Reproducir o pausar", kTune: "Cambiar de emisora", kSearch: "Buscar", kMem: "Guardar en Memorias",
    cfgShortcut: "Acceso directo",
    cfgShortcutText: "Abrí Radio Argentina con un clic, sin buscar la página. Se guarda en Descargas: arrastralo al escritorio.",
    dlFor: "Descargar para {os}", installApp: "Instalar como app, con ícono propio", otherOs: "Otro sistema:",
    cfgPhone: "En el celular", cfgPhoneText: "Abrí esta dirección en el celular y elegí «Instalar app» (Android) o «Agregar a inicio» (iPhone).",
    cfgTv: "En Smart TV",
    cfgTvText: "Abrí el navegador de tu televisor y entrá a esta dirección. Si el navegador permite agregar páginas a la pantalla de inicio, guardá Radio Argentina como acceso directo.",
    cfgTvAddress: "Dirección de Radio Argentina",
    copyTvUrl: "Copiar dirección para el televisor",
    cfgTvHelp: "Samsung Tizen y LG webOS pueden permitir abrir la radio desde el navegador, pero no todos los modelos admiten instalar una aplicación web. Android TV / Google TV también puede variar según el navegador.",
    cfgTvTip: "Si no aparece «Instalar» o «Agregar a inicio», usá el navegador del televisor y guardá la página en Favoritos.",
    tvUrlCopied: "Dirección copiada. Pegala en el navegador del televisor.",
    tvUrlManual: "Seleccioná y copiá la dirección para escribirla en el televisor.",
    cfgSocial: "Mis redes", cfgSocialText: "Escribime o seguime, me encanta saber de vos.", socWa: "Escribime un mensaje", socFb: "Seguime en Facebook",
    shortcutDone: "Listo: se descargó «{n}». Arrastralo al escritorio.", shortcutInstalling: "Listo, la app se está instalando.",
    insecure: "Estás abriendo la app desde un archivo local o una dirección sin https. El acceso directo funciona, pero para instalarla tiene que estar publicada en una dirección https."
  },
  en: {
    search: "Search", memories: "Memories", language: "Language", play: "Play", change: "Change",
    update: "Update", config: "Settings", volume: "Volume", prev: "Previous", next: "Next",
    playing: "Playing", connecting: "Connecting…", paused: "Paused", nosignal: "No signal",
    buffering: "Loading…", ready: "Ready",
    pick: "Pick a station", online: "Online",
    searchPh: "Search station or frequency…", count: "{n} of {t}",
    empty: "No stations with that name. Try another word or the frequency, for example 95.9.",
    emptyMem: "You haven't saved any stations yet. Hover over one and tap the star.",
    emptyBand: "No stations on this band.",
    band: "Band: {b}", bandAll: "All",
    memOn: "Memories", memOff: "All stations", memSaved: "Saved to Memories", memRemoved: "Removed from Memories",
    starAdd: "Save to Memories", starDel: "Remove from Memories",
    langToast: "Language: {l}", vol: "Volume {n}%", muted: "Muted",
    updNew: "New!", updBusy: "Checking…", updApply: "Installing…", updOk: "Up to date", updErr: "Offline",
    updNewMsg: "A new update is available", updOkMsg: "You're up to date", updErrMsg: "No connection",
    updApplyMsg: "Installing the update…", updBusyMsg: "Checking for updates…",
    cfgTitle: "Settings", cfgNote: "No ads. Just good music.", close: "Close",
    cfgKeys: "Keyboard shortcuts", kPlay: "Play or pause", kTune: "Change station", kSearch: "Search", kMem: "Save to Memories",
    cfgShortcut: "Shortcut",
    cfgShortcutText: "Open Radio Argentina with one click, no need to look for the page. It is saved in Downloads: drag it to the desktop.",
    dlFor: "Download for {os}", installApp: "Install as an app, with its own icon", otherOs: "Other system:",
    cfgPhone: "On your phone", cfgPhoneText: "Open this address on your phone and choose “Install app” (Android) or “Add to Home Screen” (iPhone).",
    cfgTv: "On Smart TV",
    cfgTvText: "Open your TV's browser and visit this address. If the browser lets you add pages to the home screen, save Radio Argentina as a shortcut.",
    cfgTvAddress: "Radio Argentina address",
    copyTvUrl: "Copy address for TV",
    cfgTvHelp: "Samsung Tizen and LG webOS may open the radio in their browsers, but not every model supports installing web apps. Android TV / Google TV support also depends on the browser.",
    cfgTvTip: "If «Install» or «Add to Home Screen» is unavailable, open the page in the TV browser and save it to Favorites.",
    tvUrlCopied: "Address copied. Paste it into your TV's browser.",
    tvUrlManual: "Select and copy the address to enter it on your TV.",
    cfgSocial: "My social media", cfgSocialText: "Write to me or follow me, I would love to hear from you.", socWa: "Send me a message", socFb: "Follow me on Facebook",
    shortcutDone: "Done: “{n}” was downloaded. Drag it to the desktop.", shortcutInstalling: "Done, the app is installing.",
    insecure: "You are opening the app from a local file or an address without https. The shortcut works, but to install it the app has to be published at an https address."
  },
  pt: {
    search: "Buscar", memories: "Memórias", language: "Idioma", play: "Reproduzir", change: "Mudar",
    update: "Atualizar", config: "Config", volume: "Volume", prev: "Anterior", next: "Próxima",
    playing: "Reproduzindo", connecting: "Conectando…", paused: "Pausado", nosignal: "Sem sinal",
    buffering: "Carregando…", ready: "Pronto",
    pick: "Escolha uma rádio", online: "Online",
    searchPh: "Buscar rádio ou frequência…", count: "{n} de {t}",
    empty: "Nenhuma rádio com esse nome. Tente outra palavra ou a frequência, por exemplo 95.9.",
    emptyMem: "Você ainda não salvou rádios. Passe o mouse sobre uma e toque na estrela.",
    emptyBand: "Não há rádios nesta banda.",
    band: "Banda: {b}", bandAll: "Todas",
    memOn: "Memórias", memOff: "Todas as rádios", memSaved: "Salva nas Memórias", memRemoved: "Removida das Memórias",
    starAdd: "Salvar nas Memórias", starDel: "Remover das Memórias",
    langToast: "Idioma: {l}", vol: "Volume {n}%", muted: "Sem som",
    updNew: "Nova!", updBusy: "Buscando…", updApply: "Instalando…", updOk: "Em dia", updErr: "Sem rede",
    updNewMsg: "Há uma atualização nova", updOkMsg: "Você está em dia", updErrMsg: "Sem conexão",
    updApplyMsg: "Instalando a atualização…", updBusyMsg: "Buscando atualização…",
    cfgTitle: "Configurações", cfgNote: "Sem publicidade. Só boa música.", close: "Fechar",
    cfgKeys: "Atalhos do teclado", kPlay: "Reproduzir ou pausar", kTune: "Mudar de rádio", kSearch: "Buscar", kMem: "Salvar nas Memórias",
    cfgShortcut: "Atalho",
    cfgShortcutText: "Abra a Radio Argentina com um clique, sem procurar a página. Fica em Downloads: arraste para a área de trabalho.",
    dlFor: "Baixar para {os}", installApp: "Instalar como app, com ícone próprio", otherOs: "Outro sistema:",
    cfgPhone: "No celular", cfgPhoneText: "Abra este endereço no celular e escolha «Instalar app» (Android) ou «Adicionar à Tela de Início» (iPhone).",
    cfgTv: "Na Smart TV",
    cfgTvText: "Abra o navegador da sua TV e acesse este endereço. Se o navegador permitir adicionar páginas à tela inicial, salve a Radio Argentina como atalho.",
    cfgTvAddress: "Endereço da Radio Argentina",
    copyTvUrl: "Copiar endereço para a TV",
    cfgTvHelp: "Samsung Tizen e LG webOS podem abrir a rádio no navegador, mas nem todos os modelos permitem instalar aplicativos web. O suporte do Android TV / Google TV também depende do navegador.",
    cfgTvTip: "Se «Instalar» ou «Adicionar à tela inicial» não estiver disponível, abra a página no navegador da TV e salve-a nos Favoritos.",
    tvUrlCopied: "Endereço copiado. Cole-o no navegador da TV.",
    tvUrlManual: "Selecione e copie o endereço para digitá-lo na TV.",
    cfgSocial: "Minhas redes", cfgSocialText: "Escreva para mim ou me siga, vou adorar saber de você.", socWa: "Envie uma mensagem", socFb: "Siga-me no Facebook",
    shortcutDone: "Pronto: «{n}» foi baixado. Arraste para a área de trabalho.", shortcutInstalling: "Pronto, o app está sendo instalado.",
    insecure: "Você está abrindo o app a partir de um arquivo local ou de um endereço sem https. O atalho funciona, mas para instalar o app ele precisa estar publicado em um endereço https."
  }
};

function safeGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch (_) { return fallback; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch (_) {}
}

let lang = safeGet("radio-lang", "es");
if (!I18N[lang]) lang = "es";

function t(key, vars) {
  let s = (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split("{" + k + "}").join(vars[k]); });
  return s;
}

/* ============================================================
   Elementos
   ============================================================ */
const $ = (id) => document.getElementById(id);
const player = $("player");
const stage = $("stage");
const needle = $("needle");
const lcdName = $("lcdName");
const lcdNameText = $("lcdNameText");
const lcdFreq = $("lcdFreq");
const statusText = $("statusText");
const eqEl = $("eq");
const eqBars = Array.from(eqEl.children);
const btnPlay = $("btnPlay");
const btnPrev = $("btnPrev");
const btnNext = $("btnNext");
const btnStop = $("btnStop");
const btnSearch = $("btnSearch");
const btnMem = $("btnMem");
const btnLang = $("btnLang");
const btnPlaySel = $("btnPlaySel");
const btnBand = $("btnBand");
const btnConfig = $("btnConfig");
const updateBtn = $("updateBtn");
const knob = $("knob");
const tuneKnob = $("tuneKnob");
const volEl = $("vol");
const vFill = $("vFill");
const vThumb = $("vThumb");
const listEl = $("list");
const rowsEl = $("rows");
const searchBar = $("searchBar");
const stationSearch = $("stationSearch");
const stationCount = $("stationCount");
const searchClose = $("searchClose");
const emptyMsg = $("emptyMsg");
const sbUp = $("sbUp");
const sbDown = $("sbDown");
const sbTrack = $("sbTrack");
const sbThumb = $("sbThumb");
const configDialog = $("configDialog");

/* ============================================================
   Estado
   ============================================================ */
let currentStation = null;
let isPlaying = false;
let playToken = 0;
let statusKey = "ready";
let toastTimer = null;
let eqTimer = null;
let metaPollTimer = null;
let favorites = new Set();
try { favorites = new Set(JSON.parse(safeGet("radio-favs", "[]"))); } catch (_) {}
let memOnly = false;
let bandFilter = "all";           // all | fm | am | online
const BANDS = ["all", "fm", "am", "online"];
let searchOpen = false;
let scale = 1;
let volume = 1;
let muted = false;

/* ============================================================
   Frecuencias y dial
   ============================================================ */
function parseFreq(raw) {
  const s = String(raw || "").trim();
  let m = /^(AM|FM)\s*([\d.]+)/i.exec(s);
  if (m) return { band: m[1].toLowerCase(), value: parseFloat(m[2]) };
  m = /^([\d.]+)$/.exec(s);
  if (m) {
    const v = parseFloat(m[1]);
    if (v >= 87 && v <= 109) return { band: "fm", value: v };
    if (v >= 500 && v <= 1800) return { band: "am", value: v };
  }
  return null;                    // "Online" o sin frecuencia
}
STATIONS.forEach((st) => { st._f = parseFreq(st.freq); st._band = st._f ? st._f.band : "online"; });

function freqRow(st) {
  const f = st._f;
  if (!f) return t("online");
  return f.band === "fm" ? f.value.toFixed(1) + " MHz" : Math.round(f.value) + " AM";
}
function freqLcd(st) {
  const f = st._f;
  if (!f) return t("online");
  return f.band === "fm" ? "FM " + f.value.toFixed(1) + " MHz" : "AM " + Math.round(f.value) + " kHz";
}

/* Posición de cada número en la imagen del dial (en píxeles de la imagen).
   La escala de la imagen no es lineal, por eso se interpola entre estas marcas. */
const DIAL_FM = [[87, 321], [88, 436], [92, 579], [95, 707], [99, 840], [103, 974], [107, 1097], [108, 1194]];
const DIAL_AM = [[522, 321], [594, 436], [765, 579], [980, 707], [1198, 840], [1360, 974], [1558, 1097], [1620, 1194]];
function dialX(band, v) {
  const pts = band === "fm" ? DIAL_FM : DIAL_AM;
  let a = pts[0], b = pts[1];
  if (v >= pts[pts.length - 1][0]) { a = pts[pts.length - 2]; b = pts[pts.length - 1]; }
  else {
    for (let i = 0; i < pts.length - 1; i++) {
      if (v >= pts[i][0] && v <= pts[i + 1][0]) { a = pts[i]; b = pts[i + 1]; break; }
    }
  }
  const x = a[1] + ((v - a[0]) / (b[0] - a[0])) * (b[1] - a[1]);
  return Math.min(1194, Math.max(321, x));
}
function updateDial() {
  const f = currentStation && currentStation._f;
  if (!f) { needle.classList.remove("on"); return; }
  needle.style.left = (dialX(f.band, f.value) - 4.5) + "px";
  needle.classList.add("on");
}

/* ============================================================
   Display
   ============================================================ */
const STATUS_CLS = { ready: "ready", playing: "ok", connecting: "wait", paused: "ready", nosignal: "err", buffering: "wait" };

function fitName() {
  const box = lcdName, span = lcdNameText;
  box.classList.remove("marquee");
  span.style.fontSize = "";
  span.style.removeProperty("--shift");
  const max = box.clientWidth || 280;
  if (span.offsetWidth > max) {
    span.style.setProperty("--shift", (max - span.offsetWidth - 4) + "px");
    box.classList.add("marquee");
  }
}

function fitStatus() {
  /* El texto vive dentro de la pastilla; el CSS ya recorta con ellipsis */
}
function renderStatus() {
  if (toastTimer) return;
  statusText.textContent = t(statusKey);
  statusText.className = STATUS_CLS[statusKey] || "";
  const playIco = document.querySelector(".lcd-play-ico");
  if (playIco) playIco.style.display = statusKey === "playing" ? "" : "none";
  fitStatus();
}
function setStatus(key) {
  statusKey = key;
  renderStatus();
  setEq(key === "playing" ? "live" : key === "connecting" || key === "buffering" ? "wait" : "idle");
}
function toast(msg, ms = 1800) {
  statusText.textContent = msg;
  statusText.className = "toast";
  fitStatus();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastTimer = null; renderStatus(); }, ms);
}

/* Barras de señal (4 segmentos, como en la imagen de referencia) */
const EQ_IDLE = [8, 14, 20, 26];
const EQ_WAIT = [10, 16, 12, 22];
function setEq(mode) {
  clearInterval(eqTimer); eqTimer = null;
  eqEl.classList.toggle("live", mode === "live");
  const paint = (hs) => eqBars.forEach((b, i) => { b.style.height = (hs[i] || 8) + "px"; });
  if (mode === "live" && window.radioEffectsEnabled !== false) {
    const tick = () => paint(eqBars.map((_, i) => {
      const base = [8, 14, 20, 26][i] || 12;
      return Math.max(6, base * (0.55 + Math.random() * 0.55));
    }));
    tick(); eqTimer = setInterval(tick, 220);
  } else paint(mode === "wait" && window.radioEffectsEnabled !== false ? EQ_WAIT : EQ_IDLE);
}

function updateDisplay() {
  const st = currentStation;
  lcdNameText.textContent = st ? st.name.trim() : "Radio Argentina";
  lcdFreq.textContent = st ? freqLcd(st) : t("pick");
  fitName();
  updateDial();
  document.title = st && isPlaying ? st.name.trim() + " · Radio Argentina" : "Radio Argentina";
}

/* ============================================================
   Lista de emisoras
   ============================================================ */
function initials(name) {
  return String(name).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase().slice(0, 3);
}
function logoHtml(st) {
  const ini = initials(st.name);
  if (st.logo) {
    return `<span class="r-logo"><img src="${st.logo}" alt="" width="44" height="44" loading="lazy" decoding="async" ${RadioLogos.attrs(st)}></span>`;
  }
  return `<span class="r-logo ph" aria-hidden="true">${ini}</span>`;
}
const STAR_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.9-4.7 4.5 1.2 6.4L12 17.4l-5.7 3.1 1.2-6.4-4.7-4.5 6.4-.9z"/></svg>';

function buildRows() {
  const frag = document.createDocumentFragment();
  STATIONS.forEach((st) => {
    const row = document.createElement("div");
    row.className = "row";
    row.dataset.id = st.id;
    row.setAttribute("role", "option");
    row.setAttribute("aria-selected", "false");
    row.innerHTML = logoHtml(st) + '<span class="r-name"></span><span class="r-freq"></span><button class="r-star" type="button" tabindex="-1">' + STAR_SVG + "</button>";
    row.querySelector(".r-name").textContent = st.name.trim();
    row.querySelector(".r-freq").textContent = freqRow(st);
    const img = row.querySelector("img");
    if (img) {
      img.addEventListener("error", function onLogoErr() {
        // Prueba el siguiente logo posible; si no queda ninguno, muestra las iniciales
        RadioLogos.fail(img, function () {
          const wrap = img.parentNode;
          if (wrap) wrap.outerHTML = `<span class="r-logo ph" aria-hidden="true">${initials(st.name)}</span>`;
        });
      });
    }
    row.addEventListener("click", (e) => {
      if (e.target.closest(".r-star")) { e.stopPropagation(); toggleFavorite(st); return; }
      selectStation(st);
    });
    st._el = row;
    frag.appendChild(row);
  });
  rowsEl.appendChild(frag);
  refreshStars();
}
function refreshStars() {
  STATIONS.forEach((st) => {
    const on = favorites.has(st.id);
    st._el.classList.toggle("fav", on);
    st._el.querySelector(".r-star").setAttribute("aria-label", t(on ? "starDel" : "starAdd"));
    st._el.querySelector(".r-star").title = t(on ? "starDel" : "starAdd");
  });
}
function refreshRowFreqs() {
  STATIONS.forEach((st) => { st._el.querySelector(".r-freq").textContent = freqRow(st); });
}
function highlightRow() {
  STATIONS.forEach((st) => {
    const on = !!currentStation && st.id === currentStation.id;
    st._el.classList.toggle("sel", on);
    st._el.setAttribute("aria-selected", on ? "true" : "false");
  });
}
function visibleStations() { return STATIONS.filter((st) => !st._el.hidden); }

function applyFilter() {
  const q = stationSearch.value.trim().toLowerCase();
  let shown = 0;
  STATIONS.forEach((st) => {
    const match =
      (!q || st.name.toLowerCase().includes(q) || String(st.freq || "").toLowerCase().includes(q) || freqRow(st).toLowerCase().includes(q)) &&
      (bandFilter === "all" || st._band === bandFilter) &&
      (!memOnly || favorites.has(st.id));
    st._el.hidden = !match;
    if (match) shown += 1;
  });
  stationCount.textContent = shown === STATIONS.length ? "" : t("count", { n: shown, t: STATIONS.length });
  emptyMsg.hidden = shown !== 0;
  if (shown === 0) emptyMsg.textContent = memOnly && !favorites.size ? t("emptyMem") : q ? t("empty") : t("emptyBand");
  btnMem.classList.toggle("on", memOnly);
  btnBand.classList.toggle("on", bandFilter !== "all");
  btnSearch.classList.toggle("on", searchOpen);
  updateScrollbar();
}

function scrollToStation(st, instant) {
  const el = st && st._el;
  if (!el || el.hidden) return;
  const top = el.offsetTop, bottom = top + el.offsetHeight;
  const vt = rowsEl.scrollTop, vb = vt + rowsEl.clientHeight;
  if (top < vt || bottom > vb) rowsEl.scrollTo({ top: Math.max(0, top - 1), behavior: instant ? "auto" : "smooth" });
}

/* ---- Barra de desplazamiento ---- */
function updateScrollbar() {
  const ch = rowsEl.clientHeight, sh = rowsEl.scrollHeight;
  const trackH = sbTrack.clientHeight;
  if (sh <= ch + 1) { sbTrack.classList.add("hidden"); return; }
  sbTrack.classList.remove("hidden");
  const thumbH = Math.max(38, Math.min(trackH, trackH * ch / sh));
  const maxScroll = sh - ch;
  const top = (rowsEl.scrollTop / maxScroll) * (trackH - thumbH);
  sbThumb.style.height = thumbH + "px";
  sbThumb.style.transform = "translateY(" + top + "px)";
}
rowsEl.addEventListener("scroll", updateScrollbar, { passive: true });
sbUp.addEventListener("click", () => rowsEl.scrollBy({ top: -108, behavior: "smooth" }));
sbDown.addEventListener("click", () => rowsEl.scrollBy({ top: 108, behavior: "smooth" }));

(function dragScrollThumb() {
  let startY = 0, startScroll = 0, dragging = false;
  sbThumb.addEventListener("pointerdown", (e) => {
    dragging = true; startY = e.clientY; startScroll = rowsEl.scrollTop;
    sbThumb.setPointerCapture(e.pointerId); e.preventDefault();
  });
  sbThumb.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const trackH = sbTrack.clientHeight;
    const thumbH = sbThumb.offsetHeight;
    const maxScroll = rowsEl.scrollHeight - rowsEl.clientHeight;
    const dy = (e.clientY - startY) / scale;
    rowsEl.scrollTop = startScroll + dy * (maxScroll / Math.max(1, trackH - thumbH));
  });
  const end = () => { dragging = false; };
  sbThumb.addEventListener("pointerup", end);
  sbThumb.addEventListener("pointercancel", end);
  // clic en la ranura: salta una página
  sbTrack.addEventListener("pointerdown", (e) => {
    if (e.target === sbThumb) return;
    const r = sbThumb.getBoundingClientRect();
    rowsEl.scrollBy({ top: (e.clientY < r.top ? -1 : 1) * rowsEl.clientHeight, behavior: "smooth" });
  });
})();

/* ============================================================
   Reproductor
   ============================================================ */
function setPlayIcon(playing) {
  btnPlay.classList.toggle("is-playing", playing);
  btnPlay.setAttribute("aria-label", playing ? "Pause" : "Play");
}

function mediaArtwork() {
  if (currentStation && currentStation.logo) {
    const ext = String(currentStation.logo).split(".").pop().toLowerCase();
    const mime = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : "image/jpeg";
    return [{ src: new URL(currentStation.logo, location.href).href, sizes: "128x128", type: mime }];
  }
  return [
    { src: "icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png" }
  ];
}
function updateMediaSession() {
  if (!("mediaSession" in navigator) || !currentStation) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentStation.name.trim(), artist: "Radio Argentina", album: currentStation.freq, artwork: mediaArtwork()
    });
    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
  } catch (_) {}
}

function startMetaPoll() {
  stopMetaPoll();
  metaPollTimer = setInterval(() => {
    // Algunos navegadores exponen el título del tema; en la mayoría llega bloqueado por CORS.
    if (!isPlaying || !currentStation || !player.mozGetMetadata) return;
    try {
      const meta = player.mozGetMetadata();
      if (meta && (meta.title || meta.artist) && "mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: meta.title || currentStation.name.trim(), artist: meta.artist || "Radio Argentina",
          album: currentStation.freq, artwork: mediaArtwork()
        });
      }
    } catch (_) {}
  }, 8000);
}
function stopMetaPoll() { clearInterval(metaPollTimer); metaPollTimer = null; }

function rememberStation() { if (currentStation) safeSet("radio-last", currentStation.id); }

function setCurrent(st) {
  currentStation = st;
  highlightRow();
  updateDisplay();
  scrollToStation(st);
  rememberStation();
}

function play() {
  if (!currentStation) return;
  const token = ++playToken;
  setStatus("connecting");
  player.src = currentStation.url;
  player.load();
  const p = player.play();
  if (p && p.then) {
    p.then(() => {
      if (token !== playToken) return;
      isPlaying = true;
      setPlayIcon(true);
      setStatus("playing");
      updateDisplay();
      updateMediaSession();
      startMetaPoll();
    }).catch((err) => {
      if (token !== playToken) return;                 // se cambió de emisora mientras conectaba
      console.warn("Play error:", err);
      isPlaying = false;
      setPlayIcon(false);
      setStatus("nosignal");
      updateDisplay();
      stopMetaPoll();
    });
  }
}

function pause() {
  playToken++;
  player.pause();
  isPlaying = false;
  setPlayIcon(false);
  setStatus("paused");
  updateDisplay();
  stopMetaPoll();
  updateMediaSession();
}

function selectStation(st) {
  if (currentStation && currentStation.id === st.id && isPlaying) { pause(); return; }
  setCurrent(st);
  play();
}

/* Pasar a la emisora anterior o siguiente (entre las que se ven en la lista) */
function stepStation(dir) {
  const list = visibleStations();
  if (!list.length) return;
  let i = currentStation ? list.findIndex((s) => s.id === currentStation.id) : -1;
  i = i === -1 ? (dir > 0 ? 0 : list.length - 1) : (i + dir + list.length) % list.length;
  setCurrent(list[i]);
  play();
}

function togglePlay() {
  if (!currentStation) {
    const first = visibleStations()[0];
    if (first) selectStation(first);
    return;
  }
  if (isPlaying) pause(); else play();
}

/* "Reproducir": toca la emisora elegida; si ya suena, vuelve a conectarla (sirve cuando se corta) */
function playSelected() {
  if (!currentStation) { togglePlay(); return; }
  play();
}

player.addEventListener("error", () => {
  if (!player.getAttribute("src")) return;
  isPlaying = false;
  setPlayIcon(false);
  setStatus("nosignal");
  stopMetaPoll();
  updateDisplay();
});
player.addEventListener("waiting", () => { if (isPlaying) setStatus("buffering"); });
player.addEventListener("playing", () => {
  if (!currentStation) return;
  isPlaying = true;
  setPlayIcon(true);
  setStatus("playing");
  updateMediaSession();
});
player.addEventListener("ended", () => {
  isPlaying = false; setPlayIcon(false); setStatus("paused"); stopMetaPoll(); updateDisplay();
});

if ("mediaSession" in navigator) {
  try {
    navigator.mediaSession.setActionHandler("play", () => { if (currentStation) play(); });
    navigator.mediaSession.setActionHandler("pause", () => pause());
    navigator.mediaSession.setActionHandler("stop", () => pause());
    navigator.mediaSession.setActionHandler("previoustrack", () => stepStation(-1));
    navigator.mediaSession.setActionHandler("nexttrack", () => stepStation(1));
  } catch (_) {}
}

/* ============================================================
   Volumen: perilla y slider
   ============================================================ */
const VOL_X0 = 814, VOL_RANGE = 140;           // centro de la perilla del slider: 814 (0%) → 954 (100%)
function paintVolume() {
  const cx = VOL_X0 + volume * VOL_RANGE;                      // en coordenadas de la imagen
  vThumb.style.left = (cx - 22 - 786) + "px";
  vFill.style.width = (cx - 794) + "px";
  const pct = Math.round(volume * 100);
  volEl.setAttribute("aria-valuenow", pct);
  knob.setAttribute("aria-valuenow", pct);
}
function setVolume(v, announce) {
  volume = Math.min(1, Math.max(0, v));
  if (muted && volume > 0) muted = false;
  player.muted = muted;
  player.volume = volume;
  paintVolume();
  safeSet("radio-vol", String(volume));
  if (announce) toast(t("vol", { n: Math.round(volume * 100) }), 1100);
}
function toggleMute() {
  muted = !muted;
  player.muted = muted;
  toast(muted ? t("muted") : t("vol", { n: Math.round(volume * 100) }), 1100);
}

(function sliderControls() {
  let dragging = false;
  const fromPointer = (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / scale;
    setVolume((x - VOL_X0) / VOL_RANGE, true);
  };
  volEl.addEventListener("pointerdown", (e) => { dragging = true; volEl.setPointerCapture(e.pointerId); fromPointer(e); e.preventDefault(); });
  volEl.addEventListener("pointermove", (e) => { if (dragging) fromPointer(e); });
  const end = () => { dragging = false; };
  volEl.addEventListener("pointerup", end);
  volEl.addEventListener("pointercancel", end);
})();

(function knobControls() {
  let startY = 0, startV = 0, moved = false, down = false;
  knob.addEventListener("pointerdown", (e) => {
    down = true; moved = false; startY = e.clientY; startV = volume;
    knob.setPointerCapture(e.pointerId); e.preventDefault();
  });
  knob.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dy = (startY - e.clientY) / scale;
    if (Math.abs(dy) > 3) moved = true;
    if (moved) setVolume(startV + dy / 170, true);
  });
  const end = () => { if (down && !moved) toggleMute(); down = false; };
  knob.addEventListener("pointerup", end);
  knob.addEventListener("pointercancel", () => { down = false; });
})();

// La perilla derecha funciona como sintonizador: arrastrar o usar la rueda cambia de emisora.
(function tuningKnobControls() {
  if (!tuneKnob) return;
  let down = false, lastY = 0, carry = 0;
  tuneKnob.addEventListener("pointerdown", (e) => { down = true; lastY = e.clientY; carry = 0; tuneKnob.setPointerCapture(e.pointerId); e.preventDefault(); });
  tuneKnob.addEventListener("pointermove", (e) => {
    if (!down) return;
    carry += (lastY - e.clientY) / scale; lastY = e.clientY;
    while (Math.abs(carry) >= 18) { const dir = carry > 0 ? 1 : -1; stepStation(dir); carry -= dir * 18; }
  });
  const stop = () => { down = false; };
  tuneKnob.addEventListener("pointerup", stop); tuneKnob.addEventListener("pointercancel", stop);
  tuneKnob.addEventListener("wheel", (e) => { e.preventDefault(); stepStation(e.deltaY < 0 ? 1 : -1); }, { passive: false });
  tuneKnob.addEventListener("keydown", (e) => { if (e.key === "ArrowUp" || e.key === "ArrowRight") { e.preventDefault(); stepStation(1); } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") { e.preventDefault(); stepStation(-1); } });
})();

function wheelVolume(e) {
  e.preventDefault();
  setVolume(volume + (e.deltaY < 0 ? 0.05 : -0.05), true);
}
knob.addEventListener("wheel", wheelVolume, { passive: false });
volEl.addEventListener("wheel", wheelVolume, { passive: false });
function keyVolume(e) {
  const step = e.key === "ArrowUp" || e.key === "ArrowRight" ? 0.05 : e.key === "ArrowDown" || e.key === "ArrowLeft" ? -0.05 : 0;
  if (!step) return;
  e.preventDefault(); e.stopPropagation();
  setVolume(volume + step, true);
}
knob.addEventListener("keydown", keyVolume);
volEl.addEventListener("keydown", keyVolume);

/* ============================================================
   Botonera
   ============================================================ */
function openSearch() {
  searchOpen = true;
  listEl.classList.add("searching", "open");
  stage.classList.add("list-open");
  btnSearch.classList.add("on");
  stationSearch.focus();
  stationSearch.select();
  updateScrollbar();
}
function closeSearch() {
  searchOpen = false;
  listEl.classList.remove("searching", "open");
  stage.classList.remove("list-open");
  stationSearch.value = "";
  stationSearch.blur();
  applyFilter();
  if (currentStation) scrollToStation(currentStation, true);
}
btnSearch.addEventListener("click", () => { if (searchOpen) closeSearch(); else openSearch(); });
searchClose.addEventListener("click", closeSearch);
stationSearch.addEventListener("input", () => { applyFilter(); rowsEl.scrollTop = 0; });
stationSearch.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { e.preventDefault(); closeSearch(); }
  else if (e.key === "Enter") {
    e.preventDefault();
    const first = visibleStations()[0];
    if (first) selectStation(first);
  }
});

btnMem.addEventListener("click", () => {
  memOnly = !memOnly;
  applyFilter();
  rowsEl.scrollTop = 0;
  toast(memOnly ? t("memOn") : t("memOff"));
});

function toggleFavorite(st) {
  st = st || currentStation;
  if (!st) return;
  const on = favorites.has(st.id);
  if (on) favorites.delete(st.id); else favorites.add(st.id);
  safeSet("radio-favs", JSON.stringify([...favorites]));
  refreshStars();
  if (memOnly) applyFilter();
  toast(on ? t("memRemoved") : t("memSaved"));
}

btnBand.addEventListener("click", () => {
  bandFilter = BANDS[(BANDS.indexOf(bandFilter) + 1) % BANDS.length];
  applyFilter();
  rowsEl.scrollTop = 0;
  const label = bandFilter === "all" ? t("bandAll") : bandFilter === "online" ? t("online") : bandFilter.toUpperCase();
  toast(t("band", { b: label }));
});

btnLang.addEventListener("click", () => {
  lang = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
  safeSet("radio-lang", lang);
  applyLang();
  toast(t("langToast", { l: LANG_NAME[lang] }));
});

btnPlay.addEventListener("click", togglePlay);
btnPlaySel.addEventListener("click", playSelected);
btnPrev.addEventListener("click", () => stepStation(-1));
btnNext.addEventListener("click", () => stepStation(1));
if (btnStop) btnStop.addEventListener("click", pause);

/* ---- Textos según el idioma ---- */
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (el.hasAttribute("data-update-text")) return;      // el texto de Actualizar lo maneja renderUpdate()
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const s = t(el.getAttribute("data-i18n-title")); el.title = s; el.setAttribute("aria-label", s);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))));
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
  btnPlay.title = btnPlaySel.title = "";
  btnConfig.title = t("config");
  btnMem.title = "Favoritos / emisoras guardadas";
  btnLang.title = LANG_NAME[lang];
  searchClose.setAttribute("aria-label", t("close"));
  $("configClose").setAttribute("aria-label", t("close"));
  refreshRowFreqs();
  refreshStars();
  applyFilter();
  renderStatus();
  updateDisplay();
  renderUpdate();
  refreshShortcutUi();
}

/* ============================================================
   Botón Actualizar (lo mueve update.js)
   ============================================================ */
let updState = "idle";
function renderUpdate() {
  const label = $("updateBtn").querySelector("[data-update-text]");
  const map = { idle: "update", busy: "updBusy", applying: "updApply", pending: "updNew", uptodate: "updOk", error: "updErr" };
  label.textContent = t(map[updState] || "update");
  updateBtn.classList.toggle("has-update", updState === "pending");
  updateBtn.classList.toggle("is-busy", updState === "busy" || updState === "applying");
  const msg = { pending: "updNewMsg", busy: "updBusyMsg", applying: "updApplyMsg", uptodate: "updOkMsg", error: "updErrMsg" }[updState];
  updateBtn.title = msg ? t(msg) : t("update");
}
window.addEventListener("radio-update", (e) => {
  const prev = updState;
  updState = (e.detail && e.detail.state) || "idle";
  renderUpdate();
  if (updState === prev) return;
  const msg = { pending: "updNewMsg", busy: "updBusyMsg", applying: "updApplyMsg", uptodate: "updOkMsg", error: "updErrMsg" }[updState];
  if (msg) toast(t(msg), updState === "pending" ? 4500 : 2200);
});

/* ============================================================
   Config + acceso directo
   ============================================================ */
const shortcutNote = $("shortcutNote");
const shortcutMsg = $("shortcutMsg");
const dlShortcut = $("dlShortcut");
const installPc = $("installPc");
let deferredPrompt = null;

const ua = navigator.userAgent || "";
const isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /android/i.test(ua);
const isMobile = isIOS || isAndroid;
const isMac = !isIOS && /mac/i.test(navigator.platform || "");
const isLinux = !isMobile && /linux|x11/i.test(ua);
const pcOS = isMac ? "mac" : isLinux ? "linux" : "windows";
const OS_LABEL = { windows: "Windows", mac: "Mac", linux: "Linux" };
const isStandalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;

const SHORTCUTS = {
  windows: { ext: "url", mime: "application/internet-shortcut", build: (u) => "[InternetShortcut]\r\nURL=" + u + "\r\nIconFile=" + new URL("favicon.ico?v=93", u).href + "\r\nIconIndex=0\r\n" },
  mac: {
    ext: "webloc", mime: "application/xml",
    build: (u) => '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n' +
      '<plist version="1.0"><dict><key>URL</key><string>' + u.replace(/&/g, "&amp;") + "</string></dict></plist>\n"
  },
  linux: {
    ext: "desktop", mime: "application/x-desktop",
    build: (u) => "[Desktop Entry]\nVersion=1.0\nType=Link\nName=Radio Argentina\nComment=Radios de Argentina en vivo\nURL=" + u + "\n"
  }
};

function appUrl() {
  const u = new URL("./", location.href);
  u.hash = ""; u.search = "";
  return u.href;
}
function showMsg(text) { shortcutMsg.textContent = text || ""; }

function downloadShortcut(os) {
  const def = SHORTCUTS[os];
  const name = "Radio Argentina." + def.ext;
  const blob = new Blob([def.build(appUrl())], { type: def.mime + ";charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  showMsg(t("shortcutDone", { n: name }));
}

function refreshShortcutUi() {
  // Mostrar siempre el botón de instalar si el navegador puede; se habilita cuando llega beforeinstallprompt
  const canPrompt = !!deferredPrompt;
  installPc.hidden = false;
  installPc.disabled = !canPrompt;
  installPc.style.opacity = canPrompt ? "1" : "0.55";
  installPc.title = canPrompt ? "" : (location.protocol === "file:" || !window.isSecureContext
    ? "Para instalar como app hace falta publicar la radio en una dirección https"
    : "El navegador aún no ofreció la instalación (probá recargar o usar Chrome/Edge)");
  dlShortcut.textContent = t("dlFor", { os: OS_LABEL[pcOS] });
  dlShortcut.dataset.os = pcOS;
  configDialog.querySelectorAll(".alt-links [data-os]").forEach((b) => { b.hidden = b.dataset.os === pcOS; });
  const insecure = location.protocol === "file:" || !window.isSecureContext;
  shortcutNote.hidden = !insecure;
  shortcutNote.textContent = insecure ? t("insecure") : "";
  $("wayShortcut").hidden = isStandalone;
}

async function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  showMsg(outcome === "accepted" ? t("shortcutInstalling") : "");
  refreshShortcutUi();
}

function openConfig() {
  showMsg("");
  refreshTvUrl();
  refreshShortcutUi();
  if (configDialog.showModal) configDialog.showModal(); else configDialog.setAttribute("open", "");
}
function closeConfig() {
  if (configDialog.close) configDialog.close(); else configDialog.removeAttribute("open");
}
btnConfig.addEventListener("click", openConfig);
$("configClose").addEventListener("click", closeConfig);
configDialog.addEventListener("click", (e) => { if (e.target === configDialog) closeConfig(); });
const tvUrlInput = $("tvUrl");
const copyTvUrlBtn = $("copyTvUrl");
function refreshTvUrl() {
  if (tvUrlInput) tvUrlInput.value = appUrl();
}
async function copyTvAddress() {
  refreshTvUrl();
  const address = tvUrlInput.value;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(address);
      showMsg(t("tvUrlCopied"));
      return;
    }
  } catch (_) {}
  // Fallback for browsers that do not expose Clipboard API.
  try {
    tvUrlInput.focus();
    tvUrlInput.select();
    const copied = document.execCommand && document.execCommand("copy");
    showMsg(copied ? t("tvUrlCopied") : t("tvUrlManual"));
  } catch (_) {
    showMsg(t("tvUrlManual"));
  }
}
if (copyTvUrlBtn) copyTvUrlBtn.addEventListener("click", copyTvAddress);

dlShortcut.addEventListener("click", () => downloadShortcut(dlShortcut.dataset.os || pcOS));
configDialog.querySelectorAll(".alt-links [data-os]").forEach((b) => b.addEventListener("click", () => downloadShortcut(b.dataset.os)));
installPc.addEventListener("click", installApp);
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  refreshShortcutUi();
  // Primera vez que el navegador ofrece instalar: avisar al usuario
  if (!safeGet("radio-saw-install", "")) {
    safeSet("radio-saw-install", "1");
    setTimeout(() => toast(t("installApp") + " → Config", 4500), 1200);
  }
});
window.addEventListener("appinstalled", () => { deferredPrompt = null; refreshShortcutUi(); });

/* ============================================================
   Teclado
   ============================================================ */
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (document.querySelector("dialog[open]")) return;
  const tag = e.target && e.target.tagName;
  const typing = tag === "INPUT" || tag === "TEXTAREA";
  if (typing) return;
  const onBody = e.target === document.body;
  const key = e.key;

  if (key === "/") { e.preventDefault(); openSearch(); }
  else if (key === "m" || key === "M") { if (onBody) toggleFavorite(); }
  else if (e.code === "Space" && onBody) { e.preventDefault(); togglePlay(); }
  else if ((key === "ArrowRight" || key === "ArrowDown") && onBody) { e.preventDefault(); stepStation(1); }
  else if ((key === "ArrowLeft" || key === "ArrowUp") && onBody) { e.preventDefault(); stepStation(-1); }
  else if (key === "Escape" && searchOpen) closeSearch();
});

/* Los botones tocados con el mouse sueltan el foco, así Espacio sigue siendo play/pausa */
stage.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b && e.detail > 0) b.blur();
});

/* ============================================================
   Escala: el escenario de 1536 × 1120 se ajusta a la ventana
   (antes era 1536 × 1024; los 96px de más son para el visor de
   frases, que va debajo de la radio — ver .phrase-box en pc-pro.css)
   ============================================================ */
function fit() {
  const vw = window.innerWidth, vh = window.innerHeight;
  scale = Math.min(vw / 1536, vh / 1120);
  const x = (vw - 1536 * scale) / 2, y = (vh - 1120 * scale) / 2;
  stage.style.transform = "translate(" + x + "px," + y + "px) scale(" + scale + ")";
}
window.addEventListener("resize", fit);

/* ============================================================
   Inicio
   ============================================================ */
buildRows();
(function restoreVolume() {
  const v = parseFloat(safeGet("radio-vol", "1"));
  volume = isNaN(v) ? 1 : Math.min(1, Math.max(0, v));
  player.volume = volume;
  paintVolume();
})();
(function restoreStation() {
  const last = safeGet("radio-last", "");
  currentStation = STATIONS.find((s) => s.id === last) || STATIONS[0] || null;
  highlightRow();
})();
fit();
applyLang();
setStatus("ready");
setPlayIcon(false);
stage.classList.add("ready");
if (currentStation) scrollToStation(currentStation, true);
updateScrollbar();
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => { fitName(); updateScrollbar(); });
}

// Primera visita: avisar dónde está el acceso directo (solo una vez)
(function firstVisitTip() {
  if (isStandalone) return;
  if (safeGet("radio-first-pc", "")) return;
  safeSet("radio-first-pc", "1");
  setTimeout(() => {
    toast("Acceso directo → botón Config", 5000);
  }, 1800);
})();
