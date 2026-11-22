// Si la página (HTML) quedó vieja en el navegador y no trajo stations.js / logos.js,
// se recarga una sola vez para pedir el HTML nuevo.
if (typeof STATIONS === "undefined" || typeof RadioLogos === "undefined") {
  try {
    if (!sessionStorage.getItem("ra-reload-once")) { sessionStorage.setItem("ra-reload-once", "1"); location.reload(); }
  } catch (_) {}
  throw new Error("Faltan stations.js o logos.js (HTML viejo en caché).");
}

/* ---- Orden de la lista: primero las de Chaco / Machagai, después por categoría ---- */
const CAT_ORDER = ["chaco", "religiosas", "noticias", "musica", "folklore", "deportes"];
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

/* ============================================================
   Radio Argentina — Nueva UI móvil + Ecualizador integrado
   ============================================================ */

const playerEQ = document.getElementById("player");   // con CORS: pasa por el ecualizador
const playerDirect = new Audio();                      // sin CORS: suena directo (sin ecualizador)
playerDirect.preload = "none";
let player = playerEQ;                                 // el que está sonando ahora
const btnPlay = document.getElementById("btnPlay");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnFav = document.getElementById("btnFav");
const btnEq = document.getElementById("btnEq");
const stationNameEl = document.getElementById("stationName");
const freqEl = document.getElementById("freq");
const stationList = document.getElementById("stationList");
const stationSearch = document.getElementById("stationSearch");
const visualizer = document.getElementById("visualizer");
const visorBars = document.getElementById("visorBars");   // las 5 barritas dentro del visor de la emisora
const connText = document.getElementById("connText");
const bitrateEl = document.getElementById("bitrate");
const liveTimerEl = document.getElementById("liveTimer");
const needleFm = document.getElementById("needleFm");
const needleAm = document.getElementById("needleAm");
const eqPanel = document.getElementById("eqPanel");
const eqClose = document.getElementById("eqClose");
const eqSliders = document.getElementById("eqSliders");
const eqReset = document.getElementById("eqReset");
const sidePanel = document.getElementById("sidePanel");
const sideTitle = document.getElementById("sideTitle");
const sideBody = document.getElementById("sideBody");
const sideClose = document.getElementById("sideClose");

let currentStation = null;
let isPlaying = false;
let favorites = new Set(JSON.parse(localStorage.getItem("radio-favs") || "[]"));
let liveSeconds = 0;
let liveTimerInterval = null;
let currentFilter = "all";
let sleepTimer = null;

/* ---- Web Audio EQ ---- */
const EQ_BANDS = [
  { freq: 60,    label: "60" },
  { freq: 150,   label: "150" },
  { freq: 400,   label: "400" },
  { freq: 1000,  label: "1k" },
  { freq: 2400,  label: "2.4k" },
  { freq: 6000,  label: "6k" },
  { freq: 15000, label: "15k" }
];

const EQ_PRESETS = {
  flat:   [0, 0, 0, 0, 0, 0, 0],
  bass:   [8, 6, 3, 0, -1, -2, -3],
  treble: [-3, -2, -1, 0, 3, 6, 8],
  voice:  [-2, -1, 2, 5, 4, 1, -1],
  rock:   [5, 3, -1, 1, 3, 4, 5]
};

let audioCtx = null;
let sourceNode = null;
let filters = [];
let analyser = null;
let eqGains = [0, 0, 0, 0, 0, 0, 0];
let eqPreset = "flat";
let eqAvailable = true;
let animId = null;

/* El ecualizador recuerda cómo lo dejaste */
try {
  const savedEq = JSON.parse(localStorage.getItem("radio-eq") || "null");
  if (savedEq && Array.isArray(savedEq.gains) && savedEq.gains.length === EQ_BANDS.length) {
    eqGains = savedEq.gains.map(g => Math.max(-12, Math.min(12, Number(g) || 0)));
    eqPreset = typeof savedEq.preset === "string" ? savedEq.preset : "";
  }
} catch (e) { /* si falla, queda plano */ }

function saveEq() {
  try { localStorage.setItem("radio-eq", JSON.stringify({ gains: eqGains, preset: eqPreset })); } catch (e) {}
}

/* ---- Volumen y estéreo (balance izquierda / derecha) ---- */
let mixVol = 100;          // 0 a 100, como lo marca el deslizador
let mixBal = 0;            // -100 (todo a la izquierda) a 100 (todo a la derecha)
let volBeforeMute = 100;   // a qué volumen vuelve al sacar el silencio
let masterGain = null, gainL = null, gainR = null;

const clampNum = (v, lo, hi, def) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : def;
};

try {
  const savedMix = JSON.parse(localStorage.getItem("radio-mix") || "null");
  if (savedMix) {
    mixVol = clampNum(savedMix.vol, 0, 100, 100);
    mixBal = clampNum(savedMix.bal, -100, 100, 0);
    volBeforeMute = clampNum(savedMix.last, 1, 100, 100);
    // si quedó en silencio, la radio arranca con el último volumen para que no parezca rota
    if (mixVol < 1) mixVol = volBeforeMute;
  }
} catch (e) { /* si falla, queda al máximo y centrado */ }

function saveMix() {
  try { localStorage.setItem("radio-mix", JSON.stringify({ vol: mixVol, bal: mixBal, last: volBeforeMute })); } catch (e) {}
}

// Curva al cuadrado: el deslizador se siente más parejo (el oído no es lineal)
const volLevel = (pct) => Math.pow(pct / 100, 2);

function setParam(param, value, instant) {
  if (instant) param.value = value;
  else param.setTargetAtTime(value, audioCtx.currentTime, 0.02);   // suave, sin "clicks"
}

function applyVolume(instant) {
  const level = volLevel(mixVol);
  if (masterGain) {
    setParam(masterGain.gain, level, instant);
    playerEQ.volume = 1;            // si no, se aplicaría dos veces
  } else {
    playerEQ.volume = level;        // todavía no se armó el ecualizador
  }
  playerDirect.volume = level;      // emisoras que suenan sin pasar por el ecualizador
}

function applyBalance(instant) {
  if (!gainL || !gainR) return;
  setParam(gainL.gain, mixBal > 0 ? 1 - mixBal / 100 : 1, instant);
  setParam(gainR.gain, mixBal < 0 ? 1 + mixBal / 100 : 1, instant);
}

function initAudioGraph() {
  if (audioCtx) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  audioCtx = new Ctx();
  sourceNode = audioCtx.createMediaElementSource(playerEQ);

  filters = EQ_BANDS.map((b, i) => {
    const f = audioCtx.createBiquadFilter();
    f.type = i === 0 ? "lowshelf" : (i === EQ_BANDS.length - 1 ? "highshelf" : "peaking");
    f.frequency.value = b.freq;
    f.Q.value = 1.2;
    f.gain.value = eqGains[i];
    return f;
  });

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.8;

  let prev = sourceNode;
  filters.forEach(f => {
    prev.connect(f);
    prev = f;
  });

  // Estéreo: se fuerza a 2 canales (una radio en mono suena igual por los dos lados),
  // se separa izquierda / derecha y cada lado tiene su propio volumen (balance)
  const upmix = audioCtx.createGain();
  upmix.channelCount = 2;
  upmix.channelCountMode = "explicit";
  upmix.channelInterpretation = "speakers";
  const splitter = audioCtx.createChannelSplitter(2);
  const merger = audioCtx.createChannelMerger(2);
  gainL = audioCtx.createGain();
  gainR = audioCtx.createGain();
  masterGain = audioCtx.createGain();

  prev.connect(upmix);
  upmix.connect(splitter);
  splitter.connect(gainL, 0);
  splitter.connect(gainR, 1);
  gainL.connect(merger, 0, 0);
  gainR.connect(merger, 0, 1);
  // el visualizador va antes del volumen: se mueve igual aunque bajes el volumen
  merger.connect(analyser);
  analyser.connect(masterGain);
  masterGain.connect(audioCtx.destination);

  applyVolume(true);
  applyBalance(true);
}

function applyEqGains() {
  if (!filters.length) return;
  filters.forEach((f, i) => { f.gain.value = eqGains[i]; });
}

const fmtGain = (g) => (g > 0 ? "+" : "") + g;

function markPreset() {
  document.querySelectorAll(".eq-preset").forEach(p => {
    p.classList.toggle("active", p.dataset.preset === eqPreset);
  });
}

/* Curva de respuesta: se dibuja con los filtros reales, así se ve lo que está haciendo el ecualizador */
const CURVE_FREQS = (() => {
  const n = 64, a = new Float32Array(n);
  for (let i = 0; i < n; i++) a[i] = 20 * Math.pow(1000, i / (n - 1)); // 20 Hz a 20 kHz
  return a;
})();

function updateEqCurve() {
  const line = document.getElementById("eqCurveLine");
  const fill = document.getElementById("eqCurveFill");
  if (!line || !fill) return;
  const n = CURVE_FREQS.length;
  const total = new Float32Array(n);
  if (filters.length) {
    const mag = new Float32Array(n), ph = new Float32Array(n);
    filters.forEach(f => {
      f.getFrequencyResponse(CURVE_FREQS, mag, ph);
      for (let i = 0; i < n; i++) total[i] += 20 * Math.log10(mag[i] || 1e-6);
    });
  }
  const W = 300, H = 84, mid = H / 2, range = 16;
  let d = "";
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * W;
    const y = Math.max(3, Math.min(H - 3, mid - (total[i] / range) * mid));
    d += (i ? " L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
  }
  line.setAttribute("d", d);
  fill.setAttribute("d", d + " L" + W + " " + mid + " L0 " + mid + " Z");
}

function buildEqUI() {
  eqSliders.innerHTML = "";
  EQ_BANDS.forEach((b, i) => {
    const div = document.createElement("div");
    div.className = "eq-band";
    div.innerHTML = `
      <span class="gain-val" id="gainVal${i}">${fmtGain(eqGains[i])}</span>
      <input type="range" min="-12" max="12" step="0.5" value="${eqGains[i]}" data-idx="${i}" aria-label="Banda ${b.label} Hz" />
      <label>${b.label}</label>
    `;
    const input = div.querySelector("input");
    input.addEventListener("input", () => {
      eqGains[i] = parseFloat(input.value);
      document.getElementById("gainVal" + i).textContent = fmtGain(eqGains[i]);
      applyEqGains();
      eqPreset = "";
      markPreset();
      saveEq();
      updateEqCurve();
    });
    eqSliders.appendChild(div);
  });
  markPreset();
}

/* Volumen y estéreo: deslizadores del panel */
const volSlider = document.getElementById("volSlider");
const volVal = document.getElementById("volVal");
const volMute = document.getElementById("volMute");
const eqVol = document.getElementById("eqVol");
const balSlider = document.getElementById("balSlider");
const balVal = document.getElementById("balVal");

function paintMix() {
  volSlider.value = mixVol;
  volSlider.style.setProperty("--p1", "-1");               // el relleno arranca desde el borde izquierdo
  volSlider.style.setProperty("--p2", String(mixVol / 100));
  volVal.textContent = Math.round(mixVol) + "%";
  eqVol.classList.toggle("is-muted", mixVol < 1);
  volMute.setAttribute("aria-label", mixVol < 1 ? "Activar el sonido" : "Silenciar");

  balSlider.value = mixBal;
  const pos = 0.5 + mixBal / 200;                      // 0 a 1; 0,5 es el centro
  balSlider.style.setProperty("--p1", String(Math.min(0.5, pos)));
  balSlider.style.setProperty("--p2", String(Math.max(0.5, pos)));
  const b = Math.round(Math.abs(mixBal));
  balVal.textContent = mixBal === 0 ? "Centro" : (mixBal < 0 ? "L " : "R ") + b;
}

function setVolume(v) {
  mixVol = clampNum(v, 0, 100, 100);
  if (mixVol >= 1) volBeforeMute = mixVol;
  applyVolume();
  paintMix();
  saveMix();
}

function setBalance(v) {
  let n = clampNum(v, -100, 100, 0);
  if (Math.abs(n) <= 4) n = 0;                         // se "pega" al centro
  mixBal = n;
  applyBalance();
  paintMix();
  saveMix();
}

volSlider.addEventListener("input", () => setVolume(volSlider.value));
volMute.addEventListener("click", () => setVolume(mixVol >= 1 ? 0 : volBeforeMute));
balSlider.addEventListener("input", () => setBalance(balSlider.value));
balVal.addEventListener("click", () => setBalance(0));

function setEqPreset(name) {
  const vals = EQ_PRESETS[name] || EQ_PRESETS.flat;
  eqPreset = EQ_PRESETS[name] ? name : "flat";
  eqGains = vals.slice();
  applyEqGains();
  document.querySelectorAll(".eq-band input").forEach((inp, i) => {
    inp.value = vals[i];
    document.getElementById("gainVal" + i).textContent = fmtGain(vals[i]);
  });
  markPreset();
  saveEq();
  updateEqCurve();
}

/* Algunas emisoras no mandan permiso CORS: esas suenan, pero no se pueden ecualizar */
function setEqAvailable(on) {
  eqAvailable = on;
  const note = document.getElementById("eqNote");
  if (note) note.hidden = on;
  eqPanel.classList.toggle("eq-off", !on);
}

function openEq() {
  initAudioGraph();
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  eqPanel.hidden = false;
  updateEqCurve();
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  const nav = document.getElementById("navEq");
  if (nav) nav.classList.add("active");
}

function closeEq() {
  eqPanel.hidden = true;
}

/* ---- Visualizer ---- */
const VIS_BANDS = 12;
function startVisualizer() {
  cancelAnimationFrame(animId);
  visualizer.classList.add("playing");
  const real = player === playerEQ && !!analyser;
  visualizer.classList.toggle("real", real);
  if (visorBars) { visorBars.classList.add("playing"); visorBars.classList.toggle("real", real); }
  if (!real) return; // sin acceso al audio, queda la animación simulada

  const bars = visualizer.querySelectorAll(".bar");
  const data = new Uint8Array(analyser.frequencyBinCount);
  const binHz = audioCtx.sampleRate / analyser.fftSize;
  const fMin = 70, fMax = 9000;
  const ranges = [];
  for (let k = 0; k < VIS_BANDS; k++) {
    const a = fMin * Math.pow(fMax / fMin, k / VIS_BANDS);
    const b = fMin * Math.pow(fMax / fMin, (k + 1) / VIS_BANDS);
    const lo = Math.max(0, Math.floor(a / binHz));
    ranges.push([lo, Math.max(lo + 1, Math.ceil(b / binHz))]);
  }

  // Barritas del visor: 5 bandas de graves (izquierda) a agudos (derecha)
  const vBars = visorBars ? Array.from(visorBars.children) : [];
  const VB = vBars.length;
  const vRanges = [];
  for (let k = 0; k < VB; k++) {
    const a = fMin * Math.pow(fMax / fMin, k / VB);
    const b = fMin * Math.pow(fMax / fMin, (k + 1) / VB);
    const lo = Math.max(0, Math.floor(a / binHz));
    vRanges.push([lo, Math.max(lo + 1, Math.ceil(b / binHz))]);
  }
  const vCur = new Array(VB).fill(0);
  const reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function frame() {
    if (!isPlaying || player !== playerEQ) return;
    analyser.getByteFrequencyData(data);
    if (VB && !reduceMotion) {
      const VH = visorBars.clientHeight || 36;
      vRanges.forEach(([lo, hi], k) => {
        let m = 0;
        for (let b = lo; b < hi; b++) if (data[b] > m) m = data[b];
        const t = Math.min(1, Math.pow(m / 255, 1.25) * (1 + k * 0.12));
        vCur[k] = Math.max(t, vCur[k] * 0.82);           // sube rápido y baja suave, para que no tiemble
        vBars[k].style.height = Math.max(5, vCur[k] * VH) + "px";
      });
    }
    const H = visualizer.clientHeight || 48;
    const vals = ranges.map(([lo, hi], k) => {
      let m = 0;
      for (let b = lo; b < hi; b++) if (data[b] > m) m = data[b];
      const v = Math.pow(m / 255, 1.25) * (1 + k * 0.09);
      return Math.min(1, v);
    });
    const half = bars.length / 2;
    bars.forEach((bar, i) => {
      // espejo: graves en los bordes, agudos hacia el centro
      const edge = i < half ? i : bars.length - 1 - i;
      const k = Math.min(VIS_BANDS - 1, Math.floor((edge / half) * VIS_BANDS));
      bar.style.height = Math.max(4, vals[k] * H) + "px";
    });
    animId = requestAnimationFrame(frame);
  }
  frame();
}

function stopVisualizer() {
  cancelAnimationFrame(animId);
  visualizer.classList.remove("playing", "real");
  visualizer.querySelectorAll(".bar").forEach(b => { b.style.height = "8px"; });
  if (visorBars) {
    visorBars.classList.remove("playing", "real");
    Array.from(visorBars.children).forEach(b => { b.style.height = ""; });   // vuelven a su altura de reposo
  }
}

/* ---- Dial needle ---- */
/* Las marcas del dial no están a la misma distancia, por eso la aguja se ubica entre marcas */
const DIAL_MAP = {
  fm: { v: [88, 92, 96, 100, 104, 108],       p: [4, 22, 40, 58, 76, 94] },
  am: { v: [530, 700, 900, 1100, 1300, 1600], p: [4, 22, 40, 58, 76, 94] }
};

function dialPct(f, band) {
  const { v, p } = DIAL_MAP[band];
  if (f <= v[0]) return p[0];
  if (f >= v[v.length - 1]) return p[p.length - 1];
  for (let i = 1; i < v.length; i++) {
    if (f <= v[i]) return p[i - 1] + ((f - v[i - 1]) / (v[i] - v[i - 1])) * (p[i] - p[i - 1]);
  }
  return 50;
}

function setNeedle(el, leftPct, mobilePct, on) {
  if (!el) return;
  el.style.left = leftPct + "%";                       // PC: igual que antes
  el.style.setProperty("--pm", mobilePct + "%");       // celular: posición entre marcas
  el.classList.toggle("on", on);
}

function updateDial(station) {
  if (!station) {
    setNeedle(needleFm, 50, 50, true);
    setNeedle(needleAm, 50, 50, false);
    return;
  }
  const f = station.freq || "";
  const num = parseFloat(String(f).replace(/[^\d.]/g, "")) || 0;
  const hasNum = num > 0;
  if (String(f).toUpperCase().includes("AM") || (num > 200 && num < 2000)) {
    const pct = Math.min(100, Math.max(0, ((num - 530) / (1600 - 530)) * 100));
    setNeedle(needleAm, pct, dialPct(num, "am"), hasNum);
    setNeedle(needleFm, 50, 50, false);
  } else {
    const pct = Math.min(100, Math.max(0, ((num - 88) / (108 - 88)) * 100));
    setNeedle(needleFm, pct, dialPct(num, "fm"), hasNum);
    setNeedle(needleAm, 50, 50, false);
  }
}

/* ---- Player controls ---- */
const directOnly = new Set((() => {
  try { return JSON.parse(localStorage.getItem("radio-direct") || "[]"); } catch (e) { return []; }
})());
let playToken = 0;
let starting = false;

function setPlayingUI(playing) {
  isPlaying = playing;
  btnPlay.classList.toggle("playing", playing);
  if (playing) {
    connText.textContent = "Conectado";
    bitrateEl.textContent = "• 128 kbps";
    if (!liveTimerInterval) startLiveTimer();
    startVisualizer();
  } else {
    connText.textContent = currentStation ? "Pausado" : "Desconectado";
    bitrateEl.textContent = "—";
    stopLiveTimer();
    stopVisualizer();
  }
  highlightActive();
}

function startLiveTimer() {
  stopLiveTimer();
  liveSeconds = 0;
  liveTimerEl.textContent = "00:00:00";
  liveTimerInterval = setInterval(() => {
    liveSeconds++;
    const h = String(Math.floor(liveSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((liveSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(liveSeconds % 60).padStart(2, "0");
    liveTimerEl.textContent = h + ":" + m + ":" + s;
  }, 1000);
}

function stopLiveTimer() {
  clearInterval(liveTimerInterval);
  liveTimerInterval = null;
}

function releaseEl(el) {
  try { el.pause(); } catch (e) {}
  el.removeAttribute("src");
  el.load();
}

async function startOn(el, st, withEq) {
  const other = el === playerEQ ? playerDirect : playerEQ;
  player = el;                 // primero marco cuál es el activo, así los eventos del otro se ignoran
  releaseEl(other);
  if (withEq) {
    initAudioGraph();
    if (audioCtx && audioCtx.state === "suspended") await audioCtx.resume();
  }
  el.src = st.url;
  el.load();
  await el.play();
}

/* ---- Frases luminosas: una al azar cada vez que se cambia de emisora (queda hasta el próximo cambio) ---- */
const STATION_QUOTES = [
  { e: "❤️", t: "Las mejores canciones nunca pasan de moda" },
  { e: "📻", t: "Donde hay música, hay vida" },
  { e: "🎶", t: "Una canción puede cambiarte el día" },
  { e: "✨", t: "La música nos une, sin importar las distancias" },
  { e: "🇦🇷", t: "Argentina tiene música para todos los corazones" }
];
const quoteBox = document.getElementById("stationQuote");
let lastQuote = -1;

function showStationQuote() {
  if (!quoteBox) return;
  let i;
  do { i = Math.floor(Math.random() * STATION_QUOTES.length); }
  while (i === lastQuote && STATION_QUOTES.length > 1);   // nunca repite la misma dos veces seguidas
  lastQuote = i;
  const q = STATION_QUOTES[i];

  // El emoji se renueva (nodo nuevo) para que entre con su animación cada vez
  const emo = document.createElement("span");
  emo.className = "quote-emoji";
  emo.textContent = q.e;
  quoteBox.querySelector(".quote-emoji").replaceWith(emo);
  const txt = quoteBox.querySelector(".quote-text");
  txt.textContent = "";
  const words = ("«" + q.t + "»").split(" ");
  words.forEach((w, n) => {
    const s = document.createElement("span");
    s.className = "qw";
    s.textContent = w;
    s.style.animationDelay = (0.25 + n * 0.09) + "s";      // las palabras se encienden de a una
    txt.appendChild(s);
    if (n < words.length - 1) txt.appendChild(document.createTextNode(" "));
  });

  // La frase queda fija hasta el próximo cambio de emisora. Solo la primera vez se enciende el cuadro;
  // después se renuevan las palabras y el emoji, y entran con su animación suave.
  quoteBox.classList.add("show");
  if (quoteBox.parentElement) quoteBox.parentElement.classList.add("has-quote");
}

async function playStation(st) {
  if (!st) return;
  const token = ++playToken;
  const changedStation = !currentStation || currentStation.id !== st.id;
  currentStation = st;
  if (changedStation) showStationQuote();
  stationNameEl.textContent = st.name;
  freqEl.innerHTML = dual(st.freq || "Online", freqMobileHtml(st.freq));
  updateDial(st);
  updateFavUI();
  stopLiveTimer();
  highlightActive();
  connText.textContent = "Conectando…";
  bitrateEl.textContent = "—";
  starting = true;

  try {
    if (!directOnly.has(st.id)) {
      try {
        await startOn(playerEQ, st, true);
        if (token !== playToken) return;
        setEqAvailable(true);
        setPlayingUI(true);
        return;
      } catch (err) {
        if (token !== playToken || (err && err.name === "AbortError")) return;
        console.warn("Sin CORS o error, pruebo directo:", st.name, err);
      }
    }
    // Respaldo: la emisora no deja pasar el audio por el ecualizador, pero igual suena
    await startOn(playerDirect, st, false);
    if (token !== playToken) return;
    if (!directOnly.has(st.id)) {
      directOnly.add(st.id);
      try { localStorage.setItem("radio-direct", JSON.stringify(Array.from(directOnly))); } catch (e) {}
    }
    setEqAvailable(false);
    setPlayingUI(true);
  } catch (err) {
    if (token !== playToken || (err && err.name === "AbortError")) return;
    console.warn("Play error:", err);
    connText.textContent = "Error de stream";
    bitrateEl.textContent = "—";
    setPlayingUI(false);
    connText.textContent = "Error de stream";
  } finally {
    if (token === playToken) starting = false;
  }
}

function togglePlay() {
  if (!currentStation) {
    const first = getVisibleStations()[0];
    if (first) playStation(first);
    return;
  }
  if (isPlaying) {
    player.pause();
    setPlayingUI(false);
  } else {
    player.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
  }
}

function stepStation(dir) {
  const list = getVisibleStations();
  if (!list.length) return;
  let idx = list.findIndex(s => s.id === (currentStation && currentStation.id));
  if (idx < 0) idx = 0;
  else idx = (idx + dir + list.length) % list.length;
  playStation(list[idx]);
}

/* ---- Favorites ---- */
function toggleFav() {
  if (!currentStation) return;
  if (favorites.has(currentStation.id)) favorites.delete(currentStation.id);
  else favorites.add(currentStation.id);
  localStorage.setItem("radio-favs", JSON.stringify(Array.from(favorites)));
  updateFavUI();
  if (currentFilter === "fav") renderList();
}

function updateFavUI() {
  const on = currentStation && favorites.has(currentStation.id);
  btnFav.setAttribute("aria-pressed", on ? "true" : "false");
}

/* ---- Filters & list ---- */
function getVisibleStations() {
  let list = STATIONS.slice();
  if (currentFilter === "fav") {
    list = list.filter(s => favorites.has(s.id));
  } else if (currentFilter === "chaco") {
    list = list.filter(s => {
      const n = (s.name + " " + (s.freq || "")).toLowerCase();
      return n.includes("machagai") || n.includes("chaco") || n.includes("resistencia") ||
             ["El mañanero", "FM libertad Machagai", "VIP FM", "Master FM", "radiotop", "Pobre Johnny"].includes(s.id) ||
             s.name.toLowerCase().includes("machagai");
    });
  }
  const q = (stationSearch.value || "").trim().toLowerCase();
  if (q) {
    list = list.filter(s =>
      s.name.toLowerCase().includes(q) ||
      (s.freq || "").toLowerCase().includes(q) ||
      (s.id || "").toLowerCase().includes(q)
    );
  }
  return list;
}


function getStationLogo(st) {
  const id = String(st.id || "");
  const name = String(st.name || "");
  const initials = name.split(" ").slice(0, 2).map(w => (w[0] || "")).join("").toUpperCase().slice(0, 3);
  return {
    cls: "logo-default",
    html: initials || "FM",
    src: RadioLogos.first(st)
  };
}

function getStationLoc(st) {
  const n = (st.name || "").toLowerCase();
  if (n.includes("machagai")) return "Machagai";
  if (n.includes("resistencia")) return "Resistencia";
  if (n.includes("chaco")) return "Chaco";
  return "Argentina";
}

/* ---- Versión celular de los textos (en la PC se sigue viendo exactamente lo de antes) ---- */
function dual(pcHtml, mobHtml) {
  return '<span class="v-pc">' + pcHtml + '</span><span class="v-mob">' + mobHtml + '</span>';
}

/* "FM 105.9" -> "105.9 MHz" · "AM 750" -> "750 kHz" · "Online" -> "Online" */
function freqMobileHtml(f) {
  const raw = String(f || "").trim();
  const num = parseFloat(raw.replace(/[^\d.]/g, ""));
  if (!num) return "Online";
  const isAm = /am/i.test(raw) || (num >= 500 && num <= 1700);
  return isAm ? Math.round(num) + " <small>kHz</small>" : num.toFixed(1) + " <small>MHz</small>";
}

const LOC_BY_ID = { radiotop: "Resistencia", "El mañanero": "Machagai" };
const LOC_WORDS = [
  ["machagai", "Machagai"], ["resistencia", "Resistencia"], ["chaco", "Chaco"],
  ["formosa", "Formosa"], ["trelew", "Trelew"], ["neuquen", "Neuquén"],
  ["cipolletti", "Cipolletti"], ["mar del plata", "Mar del Plata"],
  ["bahia blanca", "Bahía Blanca"], ["rosario", "Rosario"], ["cordoba", "Córdoba"]
];

function getStationLocMobile(st) {
  if (LOC_BY_ID[st.id]) return LOC_BY_ID[st.id];
  const n = (st.name || "").toLowerCase();
  for (const [word, label] of LOC_WORDS) if (n.includes(word)) return label;
  return "Argentina";
}

/* Cada emisora sin logo propio tiene su color, siempre el mismo */
const LOGO_HUES = [212, 196, 262, 336, 14, 152, 176, 232];
function stationHue(st) {
  let h = 0;
  const key = String(st.id || st.name);
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return LOGO_HUES[h % LOGO_HUES.length];
}

function renderList() {
  const list = getVisibleStations();
  stationList.innerHTML = "";
  if (!list.length) {
    stationList.innerHTML = '<p class="empty-msg">No se encontraron emisoras.</p>';
    return;
  }
  const grouped = currentFilter === "all" && !(stationSearch.value || "").trim();
  let lastCat = null;
  list.forEach(st => {
    if (grouped && st.cat !== lastCat) {
      lastCat = st.cat;
      const sep = document.createElement("div");
      sep.className = "list-sep";
      sep.textContent = CAT_LABEL[st.cat] || "";
      stationList.appendChild(sep);
    }
    const item = document.createElement("div");
    const isActive = currentStation && currentStation.id === st.id;
    item.className = "station-item" + (isActive ? " active" : "") + (isActive && isPlaying ? " is-playing" : "");
    item.dataset.id = st.id;

    const logo = getStationLogo(st);
    const loc = getStationLoc(st);
    const playIcon = isActive && isPlaying ? "⏸" : "▶";

    item.innerHTML = `
      <div class="station-logo ${logo.cls}${logo.src ? " has-station-image" : ""}" style="--h:${stationHue(st)};position:relative;overflow:hidden">
        <span class="station-logo-fallback">${logo.html}</span>
        ${logo.src ? `<img src="${logo.src}" ${RadioLogos.attrs(st)} alt="Logo de ${st.name}" loading="lazy" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;border-radius:inherit;background:#fff;padding:2px" onerror="RadioLogos.fail(this)">` : ""}
      </div>
      <div class="station-meta">
        <div class="s-name">${st.name}</div>
        <div class="s-loc">${dual(loc, getStationLocMobile(st))}</div>
      </div>
      <div class="station-freq-right">${dual(st.freq || "Online", freqMobileHtml(st.freq))}</div>
      <div class="station-play">${playIcon}</div>
    `;
    item.addEventListener("click", () => {
      if (currentStation && currentStation.id === st.id) togglePlay();
      else playStation(st);
    });
    stationList.appendChild(item);
  });
}

function highlightActive() {
  document.querySelectorAll(".station-item").forEach(el => {
    const active = currentStation && el.dataset.id === currentStation.id;
    el.classList.toggle("active", active);
    el.classList.toggle("is-playing", !!(active && isPlaying));
    const playBtn = el.querySelector(".station-play");
    if (playBtn) playBtn.textContent = active && isPlaying ? "⏸" : "▶";
  });
}

/* ---- Side panels ---- */
function openSide(title, html) {
  sideTitle.textContent = title;
  sideBody.innerHTML = html;
  sidePanel.hidden = false;
}

function closeSide() {
  sidePanel.hidden = true;
}

function showOpciones() {
  openSide("Opciones", `
    <h3>Instalar / Acceso directo</h3>
    <p>Agregá Radio Argentina a la pantalla de inicio del celular o al escritorio de la PC.</p>
    <button class="timer-btn" id="btnOpenInstall" style="margin-top:8px;width:100%;background:linear-gradient(135deg,#1e90ff,#0a6ad4);border:none;color:#fff">⬇ Instalar / Acceso directo</button>
    <h3>Volumen del sistema</h3>
    <p>Usá los botones de volumen de tu teléfono o PC para el volumen general. El volumen de la radio y el estéreo (izquierda / derecha) se ajustan en el Ecualizador.</p>
    <h3>Calidad</h3>
    <p>La mayoría de los streams se reproducen en la mejor calidad disponible (128–192 kbps).</p>
    <h3>Datos móviles</h3>
    <p>El streaming consume aproximadamente 60–90 MB por hora.</p>
    <h3>Mis redes</h3>
    <p>Escribime o seguime, me encanta saber de vos.</p>
    <div class="social-links">
      <a class="social-btn" href="https://w.app/akmjao" target="_blank" rel="noopener noreferrer">
        <span class="social-ico wa"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/><path fill="#25d366" d="M16.6 14.3c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.5.1-.6.7-.7.9-.3.2-.5.1a6 6 0 0 1-3-2.6c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.5 2.5 0 0 0-.8 1.9c0 1.1.8 2.2.9 2.3s1.6 2.5 4 3.5c1.5.6 2 .7 2.8.6.5-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.4-.3z"/></svg></span>
        <span class="social-txt">WhatsApp<small>Escribime un mensaje</small></span>
        <span class="social-go" aria-hidden="true">›</span>
      </a>
      <a class="social-btn" href="https://www.instagram.com/walter7938/" target="_blank" rel="noopener noreferrer">
        <span class="social-ico ig"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg></span>
        <span class="social-txt">Instagram<small>@Walter7938</small></span>
        <span class="social-go" aria-hidden="true">›</span>
      </a>
      <a class="social-btn" href="https://www.facebook.com/share/1Da8brMtB8/" target="_blank" rel="noopener noreferrer">
        <span class="social-ico fb"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6V13h2.7v8h3.2z"/></svg></span>
        <span class="social-txt">Facebook<small>Seguime en Facebook</small></span>
        <span class="social-go" aria-hidden="true">›</span>
      </a>
    </div>
  `);
  const btn = document.getElementById("btnOpenInstall");
  if (btn) btn.addEventListener("click", () => {
    closeSide();
    if (window.openShortcutDialog) window.openShortcutDialog();
  });
}

function showTemporizador() {
  openSide("Temporizador", `
    <p>Apaga la radio automáticamente después del tiempo elegido.</p>
    <div class="timer-options">
      <button class="timer-btn" data-min="15">15 min</button>
      <button class="timer-btn" data-min="30">30 min</button>
      <button class="timer-btn" data-min="45">45 min</button>
      <button class="timer-btn" data-min="60">60 min</button>
      <button class="timer-btn" data-min="0">Cancelar</button>
    </div>
    <p id="timerStatus" style="margin-top:16px;color:var(--cyan)"></p>
  `);
  sideBody.querySelectorAll(".timer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      clearTimeout(sleepTimer);
      const min = parseInt(btn.dataset.min, 10);
      const status = document.getElementById("timerStatus");
      if (min === 0) {
        status.textContent = "Temporizador cancelado.";
        return;
      }
      status.textContent = "Se apagará en " + min + " minutos.";
      sleepTimer = setTimeout(() => {
        player.pause();
        setPlayingUI(false);
        status.textContent = "Radio apagada por temporizador.";
      }, min * 60 * 1000);
    });
  });
}

function showMisRadios() {
  const favs = STATIONS.filter(s => favorites.has(s.id));
  let html = "<p>Tus emisoras favoritas (" + favs.length + ").</p>";
  if (!favs.length) {
    html += '<p style="margin-top:12px">Marcá con ★ las emisoras que más escuchás.</p>';
  } else {
    html += '<div style="margin-top:12px">';
    favs.forEach(s => {
      html += '<div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08)"><strong style="color:#fff">' + s.name + '</strong> · ' + (s.freq || "Online") + '</div>';
    });
    html += '</div>';
  }
  openSide("Mis Radios", html);
}

function showAcerca() {
  openSide("Acerca de", `
    <h3>Radio Argentina</h3>
    <p>Reproductor de radios argentinas en vivo. Sin publicidad.</p>
    <p>Diseño inspirado en una interfaz clásica de radio con dial y ecualizador integrado.</p>
    <h3>Actualizaciones</h3>
    <button class="upd-check" type="button" data-update-btn data-update-normal="Buscar actualización">
      <span class="upd-ico" aria-hidden="true">↻</span>
      <span data-update-text>Buscar actualización</span>
    </button>
    <p class="upd-version" data-update-version></p>
    <p style="margin-top:16px;font-size:0.85rem;opacity:0.7">v2.0 · 2026</p>
  `);
  if (window.RadioUpdate) window.RadioUpdate.render();
}

/* ---- Event listeners ---- */
btnPlay.addEventListener("click", togglePlay);
btnPrev.addEventListener("click", () => stepStation(-1));
btnNext.addEventListener("click", () => stepStation(1));
btnFav.addEventListener("click", toggleFav);
btnEq.addEventListener("click", openEq);
eqClose.addEventListener("click", closeEq);
eqReset.addEventListener("click", () => { setEqPreset("flat"); setBalance(0); });

document.querySelectorAll(".eq-preset").forEach(btn => {
  btn.addEventListener("click", () => setEqPreset(btn.dataset.preset));
});

stationSearch.addEventListener("input", () => renderList());

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderList();
  });
});

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // "Nueva actualización" no abre ningún panel: lo maneja update.js
    if (btn.dataset.panel === "actualizacion") return;
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const panel = btn.dataset.panel;
    if (panel === "ecualizador") {
      openEq();
    } else {
      closeEq();
      if (panel === "opciones") showOpciones();
      else if (panel === "temporizador") showTemporizador();
      else if (panel === "misradios") showMisRadios();
      else if (panel === "acerca") showAcerca();
    }
  });
});

sideClose.addEventListener("click", closeSide);

[playerEQ, playerDirect].forEach(el => {
  el.addEventListener("playing", () => { if (el === player) setPlayingUI(true); });
  el.addEventListener("pause", () => { if (el === player && !starting) setPlayingUI(false); });
  el.addEventListener("error", () => {
    // mientras se está conectando, playStation decide si prueba el respaldo
    if (el !== player || starting) return;
    setPlayingUI(false);
    connText.textContent = "Error de conexión";
    bitrateEl.textContent = "—";
  });
});

/* Keyboard */
document.addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT") return;
  if (e.code === "Space") { e.preventDefault(); togglePlay(); }
  if (e.key === "ArrowRight") stepStation(1);
  if (e.key === "ArrowLeft") stepStation(-1);
});

/* Init */
if (window.matchMedia("(max-width: 899px)").matches) {
  // en el celular el visualizador es más ancho: más barritas a los costados del botón de play
  for (let i = visualizer.children.length; i < 40; i++) {
    const b = document.createElement("div");
    b.className = "bar";
    visualizer.appendChild(b);
  }
}
buildEqUI();
applyVolume(true);
paintMix();
renderList();
updateDial(null);
console.log("Radio Argentina ready, stations:", STATIONS.length);


/* ============================================================
   Acceso directo / Instalar (PC + celular)
   ============================================================ */
const shortcutBtn = document.getElementById("shortcutBtn");
const shortcutDialog = document.getElementById("shortcutDialog");
const shortcutNote = document.getElementById("shortcutNote");
const shortcutMsg = document.getElementById("shortcutMsg");
const wayPc = document.getElementById("wayPc");
const wayPhone = document.getElementById("wayPhone");
const dlShortcut = document.getElementById("dlShortcut");
const installPc = document.getElementById("installPc");
const installPhone = document.getElementById("installPhone");

let deferredPrompt = null;

const ua = navigator.userAgent || "";
const isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /android/i.test(ua);
const isMobileUA = isIOS || isAndroid;
const isMac = !isIOS && /mac/i.test(navigator.platform || "");
const isLinux = !isMobileUA && /linux|x11/i.test(ua);
const pcOS = isMac ? "mac" : isLinux ? "linux" : "windows";
const isStandalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;

const SHORTCUTS = {
  windows: {
    ext: "url",
    mime: "application/internet-shortcut",
    build: (u) => "[InternetShortcut]\r\nURL=" + u + "\r\nIconFile=" + new URL("favicon.ico?v=93", u).href + "\r\nIconIndex=0\r\n"
  },
  mac: {
    ext: "webloc",
    mime: "application/xml",
    build: (u) => '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n' +
      '<plist version="1.0"><dict><key>URL</key><string>' + u.replace(/&/g, "&amp;") + "</string></dict></plist>\n"
  },
  linux: {
    ext: "desktop",
    mime: "application/x-desktop",
    build: (u) => "[Desktop Entry]\nVersion=1.0\nType=Link\nName=Radio Argentina\nComment=Radios de Argentina en vivo\nURL=" + u + "\n"
  }
};

function appUrl() {
  const u = new URL("./", location.href);
  u.hash = "";
  u.search = "";
  return u.href;
}

function showShortcutMsg(text) {
  if (shortcutMsg) shortcutMsg.textContent = text || "";
}

function downloadShortcut(os) {
  const def = SHORTCUTS[os];
  if (!def) return;
  const name = "Radio Argentina." + def.ext;
  const blob = new Blob([def.build(appUrl())], { type: def.mime + ";charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  showShortcutMsg("Archivo descargado. Buscalo en Descargas y arrastralo al escritorio.");
}

function refreshShortcutUi() {
  if (!shortcutDialog) return;
  // show/hide install buttons when beforeinstallprompt available
  const canInstall = !!deferredPrompt;
  if (installPc) installPc.hidden = !canInstall || isMobileUA;
  if (installPhone) installPhone.hidden = !canInstall || !isMobileUA;

  // highlight current platform
  if (wayPc && wayPhone) {
    wayPc.querySelector(".tag") && (wayPc.querySelector(".tag").hidden = isMobileUA);
    wayPhone.querySelector(".tag") && (wayPhone.querySelector(".tag").hidden = !isMobileUA);
  }
  if (dlShortcut) dlShortcut.dataset.os = pcOS;

  const insecure = location.protocol === "file:" || !window.isSecureContext;
  if (shortcutNote) {
    shortcutNote.hidden = !insecure;
    shortcutNote.textContent = insecure
      ? "Estás abriendo la app desde un archivo local o sin https. El acceso directo de la PC funciona, pero para instalarla en el celular tiene que estar publicada en una dirección https."
      : "";
  }
}

async function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  showShortcutMsg(outcome === "accepted" ? "Listo, la app se está instalando." : "");
  refreshShortcutUi();
}

function openShortcutDialog() {
  showShortcutMsg("");
  refreshShortcutUi();
  if (shortcutDialog.showModal) shortcutDialog.showModal();
  else shortcutDialog.setAttribute("open", "");
}

function closeShortcutDialog() {
  if (shortcutDialog.close) shortcutDialog.close();
  else shortcutDialog.removeAttribute("open");
}

if (shortcutBtn) {
  shortcutBtn.hidden = isStandalone;
  shortcutBtn.addEventListener("click", () => {
    // Celular con instalación disponible: se abre directo el cuadro nativo. Si no, se muestran los pasos.
    if (isMobileUA && deferredPrompt) installApp();
    else openShortcutDialog();
  });
}
if (document.getElementById("shortcutClose")) {
  document.getElementById("shortcutClose").addEventListener("click", closeShortcutDialog);
}
if (shortcutDialog) {
  shortcutDialog.addEventListener("click", (e) => {
    if (e.target === shortcutDialog) closeShortcutDialog();
  });
}
if (dlShortcut) {
  dlShortcut.addEventListener("click", () => downloadShortcut(dlShortcut.dataset.os || pcOS));
}
if (shortcutDialog) {
  shortcutDialog.querySelectorAll(".alt-links [data-os]").forEach((b) => {
    b.addEventListener("click", () => downloadShortcut(b.dataset.os));
  });
}
if (installPc) installPc.addEventListener("click", installApp);
if (installPhone) installPhone.addEventListener("click", installApp);

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  refreshShortcutUi();
  if (shortcutBtn) shortcutBtn.hidden = false;
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  if (shortcutBtn) shortcutBtn.hidden = true;
  refreshShortcutUi();
});

/* Service Worker: el registro y el botón de "Nueva actualización" están en update.js */

/* Also expose openShortcutDialog for Opciones panel */
window.openShortcutDialog = openShortcutDialog;
