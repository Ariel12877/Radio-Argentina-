/* Radios argentinas ” streams pÃºblicos (lista ampliada, noviembre 2026)
   Solo streams https directos (sin .m3u8 / HLS), para que funcionen con <audio>
   en Chrome, Edge y Firefox, y tambiÃ©n si la pÃ¡gina estÃ¡ en https.
   Las marcadas con âš  estÃ¡n armadas por analogÃ­a y hay que probarlas. */
const STATIONS = [
  {
    id: "radiotop",
    name: "Radio Top",
    freq: "FM 105.9",
    url: "https://live-ar1.cdnrad.com/hls/radio-2075/live.m3u8"
  },
   {
    id: "Pobre Johnny",
    name: "Radio Pobre Johnny",
    freq: "FM 88.9",
    url: "https://stream4.suenas.net/pobrejohnny"
  },
  /* ===== Chaco (agregadas) ===== */
  {
    id: "El mañanero",
    name: "El mañanero V.Beta",
    freq: "FM 97.5",
    // Stream detectado en la captura. Es HTTP; requiere proxy HTTPS para GitHub Pages.
    url: "https://streaming.radiosenlinea.com.ar/9464/stream"
  },
   {
    id: "FM libertad Machagai",
    name: "FM Libertad Machagai",
    freq: "FM 99.5",
    // Stream detectado en la captura. Es HTTP; requiere proxy HTTPS para GitHub Pages.
    url: "http://streaming01.shockmedia.com.ar/8428/stream"
  },
   {
    id: "VIP FM",
    name: "Vip Radio Machagai",
    freq: "FM 104.9",
    url: "https://s2.netradiofm.com:5416/stream/?type=http&nocache=1"
  },
  {
    id: "Master FM",
    name: "Master FM Machagai",
    freq: "102.5",
    url: "https://ssl2.veemesoft.com.ar/a5ded807684d25c964b2"
  },
  {
    id: "laradio1047",
    name: "La Radio 104.7",
    freq: "FM 104.7",
    url: "https://server.laradio.online/proxy/laradio1047?mp=/stream"
  },
  {
    id: "facundoquiroga",
    name: "Facundo Quiroga",
    freq: "FM 95.9",
    url: "https://01.solumedia.com.ar:9038/stream"
  },
  {
    id: "radiofan",
    name: "Radio Fan",
    freq: "FM 96.9",
    url: "https://streaming5.locucionar.com/proxy/radiofan969?mp=/stream"
  },
  {
   id: "WALTER FM",
    name: "Radio WALTER 80/90",
    freq: "Online",
    url: "https://stream.zeno.fm/qoxmfycvaftvv"
  },
  {
    id: "Ñande Reko Radio",
    name: "Ñande Reko Radio",
    freq: "Online",
    url: "https://devnec.com:8001/radio62"
  },
   {
   id: "Polca Paraguaya",
    name: "Polca Paraguaya",
    freq: "Online",
    url: "https://stream.zeno.fm/tvsx850x1f8uv"
  },
  {
    id: "Fortaleza FM 98.1",
    name: "Fortaleza FM 98.1",
    freq: "FM 98.1",
    url: "https://streaming01.shockmedia.com.ar:10252/stream"
  }, 
{
    id: "Radio Mocovl AM 800",
    name: "Radio Mocovl AM 800",
    freq: "AM 800",
    url: "https://live-ar1.cdnrad.com/hls/radio-1930/live.m3u8"
  },
  {
    id: "Futuro",
    name: "Radio Futuro",
    freq: "FM 99.9",
    url: "https://edge03.radiohdvivo.com/futuro989"
  },
  {
    id: "Radio Con Vos",
    name: "Radio Con Vos",
    freq: "FM 89.9",
    url: "https://server1.stweb.tv/rcvos/live/playlist.m3u8"
  },
  {
    id: "lra26",
    name: "Nacional Resistencia",
    freq: "AM 620",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad26"
  },
  {
    id: "fmgualamba",
    name: "FM Gualamba",
    freq: "FM 93.7",
    url: "https://ssl.radiosnethosting.com/index.php?port=9072"
  },
  /* ===== Tus radios de siempre (sin tocar) ===== */
  {
    id: "nacional",
    name: "Nacional",
    freq: "AM 870",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad1"
  },
   {
    id: "Lentos de Todos Los Tiempos",
    name: "Lentos de Todos Los Tiempos",
    freq: "Online",
    url: "https://s3.conectarmedia.com:8016/stream"
  },
  {
    id: "FM Milenium ",
    name: "FM Milenium ",
    freq: "106.7",
    url: "https://sonicpanel.hostradios.com/8002/stream"
  },
  {
    id: "Vale 97.5",
    name: "Vale 97.5",
    freq: "FM 95.5",
    url: "https://vale.stweb.tv/vale/live/playlist.m3u8"
  },
  {
    id: "mitre",
    name: "Mitre",
    freq: "AM 790",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/AM790_56AAC.aac"
  },
  {
    id: "rockpop",
    name: "Rock & Pop",
    freq: "FM 95.9",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/ROCKANDPOPAAC.aac"
  },
  {
    id: "aspen",
    name: "Aspen",
    freq: "FM 102.3",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/ASPEN.mp3"
  },
  {
    id: "metro",
    name: "Metro",
    freq: "FM 95.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/METRO.mp3"
  },
  {
    id: "lared",
    name: "La Red",
    freq: "AM 910",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/LA_RED_AM910AAC.aac"
  },
  {
    id: "urbana",
    name: "Urbana Play",
    freq: "FM 104.3",
    url: "https://cdn.instream.audio:9660/stream"
  },
  {
    id: "am750",
    name: "AM 750",
    freq: "AM 750",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/AM750AAC.aac"
  },

  /* ===== Nuevas ===== */
  {
    id: "doradofm",
    name: "Dorado FM",
    freq: "FM 98.3",
    url: "https://sslstream.online:7269/stream"
  },
   {
    id: "Radio Chamame",
    name: "Radio Chamame",
    freq: "Online",
    url: "https://stream.zenolive.com/84y7b87p4gruv"
  },
  {
    id: "Pasionfm",
    name: "Pasion Fm",
    freq: "FM 98.7",
    url: "https://live-ar1.cdnrad.com/hls/radio-2009/live.m3u8"
  },
   {
    id: "Esto es KchaK",
    name: "Esto es KchaK",
    freq: "Online",
    url: "https://stream.zeno.fm/kd0p50swchruv"
  },
   {
    id: "Radio Welo el 5to Bronco",
    name: "Radio Welo el 5to Bronco",
    freq: "Online",
    url: "https://server01.heplayer.com/8052/;"
  },
  {
    id: "Las Lomitas",
    name: "Nacional Las Lomitas Formosa",
    freq: "AM 1270",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad20"
  },
    {
    id: "Sentir FM",
    name: "Sentir FM",
    freq: "FM 98.3",
    url: "https://stream.zeno.fm/uwqe3chde78uv"
  },
   {
    id: "Cadena Heat",
    name: "Heat FM",
    freq: "FM 91.9",
    url: "https://24403.live.streamtheworld.com/CADENAHEAT_SC"
  },

  /* ===== AM de Buenos Aires ===== */
  {
    id: "madre",
    name: "Radio Madre",
    freq: "AM 530",
    url: "https://cdn.instream.audio:9288/stream" // âš  la lista original estaba en http; la pasÃ© a https
  },
  {
    id: "radioargentina",
    name: "Radio Argentina",
    freq: "AM 570",
    url: "https://server.laradio.online:15224/live.mp3"
  },
  {
    id: "continental",
    name: "Continental",
    freq: "AM 590",
    url: "https://edge03.radiohdvivo.com/continental"
    // alternativa si falla: https://edge01.radiohdvivo.com/continental
  },
  {
    id: "rivadavia",
    name: "Rivadavia",
    freq: "AM 630",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/RIVADAVIAAAC.aac"
  },
  {
    id: "cooperativa",
    name: "Cooperativa",
    freq: "AM 770",
    url: "https://cdn.instream.audio:9582/stream"
  },
  {
    id: "zonica",
    name: "Radio Zonica",
    freq: "AM 820",
    url: "https://streamlky.alsolnet.com/radiozonica"
  },
  {
    id: "delpueblo",
    name: "Del Pueblo",
    freq: "AM 830",
    url: "https://streaming6.locucionar.com:24248/stream"
  },
  {
    id: "cnnradio",
    name: "CNN Radio",
    freq: "AM 950",
    url: "https://unlimited2-ar.dps.live/cnn-ar/aac/icecast.audio"
  },
  {
    id: "genesis",
    name: "Genesis",
    freq: "AM 970",
    url: "https://01.solumedia.com.ar:8216/"
  },
  {
    id: "la990",
    name: "La 990",
    freq: "AM 990",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/AM990AAC.aac"
  },
  {
    id: "ondalatina",
    name: "Onda Latina",
    freq: "AM 1010",
    url: "https://streaming2.locucionar.com/proxy/ondalatina?mp=/stream"
  },
  {
    id: "delplata",
    name: "Del Plata",
    freq: "AM 1030",
    url: "https://streaming01.shockmedia.com.ar:10586/stream"
  },
  {
    id: "guemes",
    name: "Güemes",
    freq: "AM 1050",
    url: "https://server.radiostreaming.com.ar/8564/stream"
  },
  {
    id: "delaciudad",
    name: "De la Ciudad",
    freq: "AM 1110",
    url: "https://radio01.ferozo.com/proxy/ra01001160?mp=/stream"
  },
  {
    id: "federal",
    name: "Radio Federal",
    freq: "AM 1180",
    url: "https://sonic.host-live.com/8176/stream"
  },
  {
    id: "radiosur",
    name: "Radio Sur",
    freq: "AM 1200",
    url: "https://stream.xweb.ar:8008/"
  },
  {
    id: "ecomedios",
    name: "Eco Medios",
    freq: "AM 1220",
    url: "https://stream-159.zeno.fm/uv3vkhw2qvduv"
  },

  /* ===== FM de Buenos Aires (CABA) ===== */
  {
    id: "blackie",
    name: "Blackie",
    freq: "FM 89.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/BLACKIE_89_1.mp3"
  },
  {
    id: "arpeggio",
    name: "Arpeggio",
    freq: "FM 89.5",
    url: "https://cloudstream2032.conectarhosting.com/8074/stream"
  },
  {
    id: "laboca",
    name: "La Boca",
    freq: "FM 90.1",
    url: "https://s24.myradiostream.com/14984/listen.mp3"
  },
  {
    id: "delta",
    name: "Delta",
    freq: "FM 90.3",
    url: "https://cdn.instream.audio/:9069/stream"
  },
  {
    id: "vorterix",
    name: "Vorterix",
    freq: "FM 92.1",
    url: "https://ice2.edge-apps.net/radio1_high-20057.audio"
  },
  {
    id: "nacionalrock",
    name: "Nacional Rock",
    freq: "FM 93.7",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad39" // âš  mismo patrÃ³n que tu Nacional AM 870
  },
  {
    id: "disney",
    name: "Radio Disney",
    freq: "FM 94.3",
    url: "https://27353.live.streamtheworld.com/DISNEY_ARG_BA_ADP/HLS/playlist.m3u8?dist=web-radiodisney" // âš  link viejo, puede estar caÃ­do
  },
  {
    id: "concepto",
    name: "Concepto",
    freq: "FM 95.5",
    url: "https://radios.solumedia.com:6002/stream"
  },
  {
    id: "nacionalclasica",
    name: "Nacional Clasica",
    freq: "FM 96.7",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad37"
  },
  {
    id: "infobae",
    name: "Infobae",
    freq: "FM 97.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/INFOBAEAAC.aac"
  },
  {
    id: "La mega",
    name: "La Mega",
    freq: "FM 98.3",
    url: "https://mega.stweb.tv/mega983/live/playlist.m3u8"
  },
  {
    id: "nacionalfolklorica",
    name: "Nacional Folklorica",
    freq: "FM 98.7",
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad38"
  },
  {
    id: "la100",
    name: "La 100",
    freq: "FM 99.9",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/FM999_56.mp3"
  },
  {
    id: "blue",
    name: "Blue FM",
    freq: "FM 100.7",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/BLUE_FM_100_7AAC.aac"
  },
  {
    id: "dsports",
    name: "D Sports",
    freq: "FM 103.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/DSPORTSRADIOAAC_SC"
    // en dÃ­as de partido a veces la bloquean por derechos
  },
  {
    id: "sonido",
    name: "Sonido",
    freq: "FM 103.5",
    url: "https://streaming.radiosenlinea.com.ar/8780/stream/1/"
  },
  {
    id: "lnmusica",
    name: "LN+ Musica",
    freq: "FM 104.9",
    url: "https://stream.radio.co/s2ed3bec0a/listen"
  },
  {
    id: "los40",
    name: "Los 40",
    freq: "FM 105.5",
    url: "https://radios.solumedia.com:6158/stream?icy=http"
  },
  {
    id: "pasion",
    name: "Radio Pasion",
    freq: "FM 102.7",
    url: "https://live-ar1.cdnrad.com/hls/radio-1969/live.m3u8"
  },
  {
    id: "berlin",
    name: "Radio Berlin",
    freq: "FM 107.9",
    url: "https://unlimited5-us.dps.live/berlin/aac/icecast.audio"
  },

  /* ===== CÃ³rdoba ===== */
  {
    id: "cadena3am",
    name: "Cadena 3",
    freq: "AM 700",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/AM700.mp3"
  },
  {
    id: "cadena3fm",
    name: "Cadena 3 FM",
    freq: "FM 100.5",
    url: "https://liveradio.mediainbox.net/radio3.mp3"
  },
  {
    id: "fmcordoba",
    name: "FM Cordoba",
    freq: "FM 91.9",
    url: "https://liveradio.mediainbox.net/fmcordoba.mp3"
  },
  {
    id: "suquia",
    name: "Radio Suqui­a",
    freq: "FM 96.5",
    url: "https://streaming01.shockmedia.com.ar:10945/"
  },
  {
    id: "mia",
    name: "Radio Mi­a",
    freq: "FM 104.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/FM1041_56AAC.aac"
  },
  {
    id: "unicordoba",
    name: "Radio Universidad Cordoba",
    freq: "AM 580",
    url: "https://radios.solumedia.com:10976/stream"
  },

  /* ===== Santa Fe y Rosario ===== */
  {
    id: "lt3",
    name: "LT3 Rosario",
    freq: "AM 680",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/LT3AAC_SC"
  },
  {
    id: "lt10",
    name: "LT10 Radio UNL",
    freq: "FM 97.3",
    url: "https://radio.arcast.net:1060/stream"
  },

  /* ===== Mendoza ===== */
  {
    id: "estaciondelsol",
    name: "Estacion del Sol",
    freq: "FM 96.7",
    url: "https://estaciondelsolonline.com.ar:8000/radio.aac"
  },

  /* ===== Buenos Aires (interior) ===== */
  {
    id: "lu9",
    name: "LU9 Mar del Plata",
    freq: "AM 670",
    url: "https://servidor1.hostradios.com:8110/stream"
  },
  {
    id: "lu2",
    name: "LU2 Bahia Blanca",
    freq: "AM 840",
    url: "https://streaming6.locucionar.com:24228/stream?ver=22915"
  },

  /* ===== Patagonia ===== */
  {
    id: "lu19",
    name: "LU19 Cipolletti",
    freq: "AM 690",
    url: "https://sonic.host-live.com/8064/stream"
  },
  {
    id: "rionegroradio",
    name: "Ri­o Negro Radio",
    freq: "FM 90.9",
    url: "https://server6.hostradios.com/8440/stream"
  },
  {
    id: "laredneuquen",
    name: "La Red Neuquen",
    freq: "FM 93.7",
    url: "https://server.laradio.online/proxy/julian_liyo?mp=/stream"
  },
  {
    id: "radio3trelew",
    name: "Radio 3 Trelew",
    freq: "ONLINE",
    url: "https://radio01.ferozo.com/proxy/ra01000981?mp=/stream"
  },
  {
    id: "fmdelmar",
    name: "FM Del Mar",
    freq: "ONLINE",
    url: "https://icecast.gesatel.com.ar:8443/vivo"
  },

  /* ===== Misiones ===== */
  {
    id: "radiolight",
    name: "Radio Light",
    freq: "FM 88.9",
    url: "https://streamall.alsolnet.com/radiolightfm" // âš  el link original estaba en http; lo pasÃ© a https
  },

  /* ===== Solo online ===== */
  {
    id: "futurock",
    name: "Futurock",
    freq: "ONLINE",
    url: "https://mdstrm.com/audio/5d9d019112cbbb45d6a50960/live.m3u8"
  },
  {
    id: "FOLKLORE RADIO",
    name: "DEL PUEBLO MIO FOLKLORE RADIO",
    freq: "ONLINE",
    url: "https://centova.heplayer.com/proxy/dpmfolklore/stream"
  },
  {
    id: "Radio 10",
    name: "Radio 10",
    freq: "ONLINE",
    url: "https://stream.zeno.fm/4r530f2a9f0uv"
  },
   {
    id: "Radio Latina 101.1",
    name: "Radio Latina 101.1",
    freq: "ONLINE",
    url: "https://stream-gtlc.telecentro.net.ar/hls/radiolatinahls/0/playlist.m3u8?uid=c787e307dd6c302dc3e51a7d2b5df6f4"
  },
   {
    id: "FM Sentir",
    name: "FM sentir II",
    freq: "FM 104.3",
    // Stream detectado en la captura. Es HTTP; requiere proxy HTTPS para GitHub Pages.
    url: "https://fm-sentir-audio-proxy-production.up.railway.app/sentir"
  },
  {
    id: "eldesta",
    name: "El Destape Radio",
    freq: "ONLINE",
    url: "https://live-ar1.cdnrad.com/hls/radio-2123/live.m3u8"
  }
];

const player = document.getElementById("player");
const btnPower = document.getElementById("btnPower");
const btnPlay = document.getElementById("btnPlay");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnFav = document.getElementById("btnFav");
const btnFavMini = document.getElementById("btnFavMini");
const volume = document.getElementById("volume");
const statusEl = document.getElementById("status");
const freqEl = document.getElementById("freq");
const stationNameEl = document.getElementById("stationName");
const nowPlayingEl = document.getElementById("nowPlaying");
const vu = document.getElementById("vu");
const presetGrid = document.getElementById("presetGrid");
const stationSearch = document.getElementById("stationSearch");
const stationCount = document.getElementById("stationCount");
const emptyMsg = document.getElementById("emptyMsg");
const dialGlass = document.getElementById("dialGlass");
const dialOnline = document.getElementById("dialOnline");
const waveform = document.getElementById("waveform");
const progressBar = document.getElementById("progressBar");

let currentStation = null;
let isPowerOn = false;
let isPlaying = false;
let vuInterval = null;
let deferredPrompt = null;
let metaPollTimer = null;
let favorites = new Set(JSON.parse(localStorage.getItem("radio-favs") || "[]"));
let liveTimer = null;
let liveSeconds = 0;

const WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function updateClock() {
  const dateEl = document.getElementById("mnDate");
  const timeEl = document.getElementById("mnTime");
  if (!dateEl && !timeEl) return;
  const now = new Date();
  if (dateEl) {
    const d = now.getDate();
    const w = WEEKDAYS[now.getDay()];
    const m = MONTHS[now.getMonth()];
    const y = now.getFullYear();
    dateEl.textContent = w.charAt(0).toUpperCase() + w.slice(1) + " " + d + " de " + m + " de " + y;
  }
  if (timeEl) {
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    timeEl.textContent = hh + ":" + mm + ":" + ss;
  }
}
// Arrancar el reloj cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    updateClock();
    setInterval(updateClock, 1000);
  });
} else {
  updateClock();
  setInterval(updateClock, 1000);
}

/* --- UI helpers --- */
function setStatus(text, type = "") {
  statusEl.textContent = text;
  statusEl.className = "status" + (type ? " " + type : "");
}

function setPlayIcon(playing) {
  btnPlay.classList.toggle("is-playing", playing);
  btnPlay.setAttribute("aria-label", playing ? "Pausar" : "Reproducir");
  if (waveform) waveform.classList.toggle("is-playing", playing);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function startLiveTimer() {
  stopLiveTimer();
  liveSeconds = 0;
  if (progressBar) {
    progressBar.style.setProperty("--prog", "0%");
    progressBar.value = 0;
  }
  const startEl = document.getElementById("progStart");
  if (startEl) startEl.textContent = "00:00";
  liveTimer = setInterval(() => {
    liveSeconds += 1;
    const startEl2 = document.getElementById("progStart");
    if (startEl2) startEl2.textContent = formatTime(liveSeconds);
    // Visual progress that slowly fills over ~3 min then resets look
    if (progressBar) {
      const pct = Math.min(95, (liveSeconds % 180) / 180 * 100);
      progressBar.value = pct;
      progressBar.style.setProperty("--prog", pct + "%");
    }
  }, 1000);
}

function stopLiveTimer() {
  if (liveTimer) clearInterval(liveTimer);
  liveTimer = null;
}

function updateFavButtons() {
  const on = currentStation && favorites.has(currentStation.id);
  [btnFav, btnFavMini].forEach((b) => {
    if (!b) return;
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function toggleFavorite() {
  if (!currentStation) return;
  if (favorites.has(currentStation.id)) favorites.delete(currentStation.id);
  else favorites.add(currentStation.id);
  localStorage.setItem("radio-favs", JSON.stringify([...favorites]));
  updateFavButtons();
}

function updateDisplay() {
  if (!currentStation) {
    freqEl.textContent = "—";
    stationNameEl.textContent = "Elegí una emisora";
    nowPlayingEl.textContent = "";
    nowPlayingEl.classList.remove("has-meta");
  } else {
    freqEl.textContent = currentStation.freq;
    stationNameEl.textContent = currentStation.name;
  }
  updateDial();
  updateFavButtons();
}

function highlightPreset(id) {
  document.querySelectorAll(".preset-btn").forEach((btn) => {
    const on = btn.dataset.id === id;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function scrollToActive() {
  const el = presetGrid.querySelector(".preset-btn.active");
  if (el) el.scrollIntoView({ block: "nearest" });
}

function startVu() {
  stopVu();
  vuInterval = setInterval(() => {
    if (!isPlaying) {
      vu.style.width = "0%";
      return;
    }
    const level = 28 + Math.random() * 58;
    vu.style.width = level + "%";
  }, 160);
}

function stopVu() {
  if (vuInterval) clearInterval(vuInterval);
  vuInterval = null;
  vu.style.width = "0%";
}

function setNowPlaying(text, isMeta = false) {
  nowPlayingEl.textContent = text || "";
  nowPlayingEl.classList.toggle("has-meta", !!isMeta && !!text);
}

/* --- Dial (se ve solo en pantallas grandes) --- */
const DIAL = {
  fm: { min: 88, max: 108 },
  am: { min: 530, max: 1710 }
};

function parseFreq(freq) {
  const m = /^(AM|FM)\s*([\d.]+)/i.exec(freq || "");
  if (!m) return null;
  return { band: m[1].toLowerCase(), value: parseFloat(m[2]) };
}

function dialPct(band, value) {
  const { min, max } = DIAL[band];
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

function buildDial() {
  const scales = {
    fm: document.getElementById("scaleFm"),
    am: document.getElementById("scaleAm")
  };
  if (!scales.fm || !scales.am) return;

  const add = (band, cls, pct, text) => {
    const el = document.createElement(text ? "span" : "i");
    el.className = cls;
    el.style.left = pct + "%";
    if (text) el.textContent = text;
    scales[band].appendChild(el);
  };

  // FM: una marca cada 0,5 MHz, nÃºmero cada 4
  for (let v = 88; v <= 108; v += 0.5) {
    const major = v % 4 === 0;
    add("fm", major ? "tick major" : "tick", dialPct("fm", v));
    if (major) add("fm", "lbl", dialPct("fm", v), String(v));
  }
  // AM: una marca cada 50 kHz, nÃºmero cada 200
  for (let v = 550; v <= 1700; v += 50) {
    const major = v % 200 === 0;
    add("am", major ? "tick major" : "tick", dialPct("am", v));
    if (major) add("am", "lbl", dialPct("am", v), String(v));
  }
  // Una marca mÃ¡s alta por cada emisora que tenÃ©s cargada
  STATIONS.forEach((st) => {
    const f = parseFreq(st.freq);
    if (f) add(f.band, "tick st", dialPct(f.band, f.value));
  });
}

function updateDial() {
  if (!dialGlass) return;
  const info = currentStation ? parseFreq(currentStation.freq) : null;
  dialGlass.classList.toggle("off", !currentStation);
  ["fm", "am"].forEach((band) => {
    const needle = document.getElementById("needle" + (band === "fm" ? "Fm" : "Am"));
    const row = dialGlass.querySelector('[data-band="' + band + '"]');
    const active = !!info && info.band === band;
    if (active) needle.style.left = dialPct(band, info.value) + "%";
    needle.classList.toggle("on", active);
    row.classList.toggle("dim", !!currentStation && !active);
  });
  dialOnline.classList.toggle("on", !!currentStation && !info);
}

/* Media Session + possible metadata */
function updateMediaSession() {
  if (!("mediaSession" in navigator) || !currentStation) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentStation.name,
      artist: "Radio Argentina",
      album: currentStation.freq,
      artwork: [
        { src: "icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "icon-512.png", sizes: "512x512", type: "image/png" }
      ]
    });
    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
  } catch (_) {}
}

function tryReadIcyTitle() {
  // Algunos streams exponen el tÃ­tulo vÃ­a el elemento audio o MediaSession.
  // En la mayorÃ­a de navegadores el ICY no llega al JS por CORS;
  // mostramos al menos el estado y actualizamos Media Session.
  if (!isPlaying || !currentStation) return;
  try {
    if (player.mozGetMetadata) {
      const meta = player.mozGetMetadata();
      if (meta && (meta.title || meta.artist)) {
        const t = [meta.artist, meta.title].filter(Boolean).join(" HOLA ");
        if (t) {
          setNowPlaying(t, true);
          if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: meta.title || currentStation.name,
              artist: meta.artist || "Radio Argentina",
              album: currentStation.freq
            });
          }
          return;
        }
      }
    }
  } catch (_) {}
}

function startMetaPoll() {
  stopMetaPoll();
  metaPollTimer = setInterval(tryReadIcyTitle, 8000);
}

function stopMetaPoll() {
  if (metaPollTimer) clearInterval(metaPollTimer);
  metaPollTimer = null;
}

/* --- Player logic --- */
function selectStation(station) {
  if (!isPowerOn) {
    isPowerOn = true;
    btnPower.classList.add("active");
  }

  if (currentStation && currentStation.id === station.id && isPlaying) {
    pause();
    return;
  }

  currentStation = station;
  highlightPreset(station.id);
  updateDisplay();
  play();
}

function play() {
  if (!currentStation) return;

  setStatus("CONECTANDO", "wait");
  setNowPlaying("Conectando");
  player.src = currentStation.url;
  player.load();

  const playPromise = player.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        isPlaying = true;
        setPlayIcon(true);
        setStatus("EN VIVO", "on");
        startVu();
        startLiveTimer();
        setNowPlaying("Reproduciendo");
        updateMediaSession();
        startMetaPoll();
        tryReadIcyTitle();
      })
      .catch((err) => {
        console.warn("Play error:", err);
        setStatus("ERROR", "error");
        setNowPlaying("No se pudo reproducir");
        isPlaying = false;
        setPlayIcon(false);
        stopVu();
        stopLiveTimer();
        stopMetaPoll();
      });
  }
}

function pause() {
  player.pause();
  isPlaying = false;
  setPlayIcon(false);
  setStatus("PAUSA", "wait");
  stopVu();
  stopLiveTimer();
  setNowPlaying("Pausado");
  stopMetaPoll();
  updateMediaSession();
}

function stop() {
  player.pause();
  player.removeAttribute("src");
  player.load();
  isPlaying = false;
  setPlayIcon(false);
  stopVu();
  stopLiveTimer();
  stopMetaPoll();
  setNowPlaying("");
}

function powerToggle() {
  if (isPowerOn) {
    isPowerOn = false;
    btnPower.classList.remove("active");
    stop();
    currentStation = null;
    highlightPreset(null);
    updateDisplay();
    setStatus("APAGADO");
  } else {
    isPowerOn = true;
    btnPower.classList.add("active");
    setStatus("LISTO", "on");
  }
}

/* Pasar a la emisora anterior o siguiente (entre las que se ven en la lista) */
function stepStation(dir) {
  const list = Array.from(document.querySelectorAll(".preset-btn:not(.hidden)"))
    .map((b) => STATIONS.find((s) => s.id === b.dataset.id))
    .filter(Boolean);
  if (!list.length) return;

  let i = currentStation ? list.findIndex((s) => s.id === currentStation.id) : -1;
  if (i === -1) i = dir > 0 ? 0 : list.length - 1;
  else i = (i + dir + list.length) % list.length;

  if (!isPowerOn) {
    isPowerOn = true;
    btnPower.classList.add("active");
  }
  currentStation = list[i];
  highlightPreset(currentStation.id);
  updateDisplay();
  play();
  scrollToActive();
}

/* --- Events --- */
btnPower.addEventListener("click", powerToggle);

btnPlay.addEventListener("click", () => {
  // En móvil: si no hay emisora, encender y elegir la primera
  if (!currentStation) {
    const first = STATIONS[0];
    if (first) selectStation(first);
    return;
  }
  if (!isPowerOn) {
    isPowerOn = true;
    btnPower.classList.add("active");
  }
  if (isPlaying) pause();
  else play();
});

if (btnPrev) btnPrev.addEventListener("click", () => stepStation(-1));
if (btnNext) btnNext.addEventListener("click", () => stepStation(1));
if (btnFav) btnFav.addEventListener("click", toggleFavorite);
if (btnFavMini) btnFavMini.addEventListener("click", toggleFavorite);

function paintVolume() {
  volume.style.setProperty("--vol", volume.value + "%");
}

volume.addEventListener("input", () => {
  player.volume = volume.value / 100;
  paintVolume();
});

player.addEventListener("error", () => {
  // al apagar quitamos el src: ese "error" no cuenta
  if (!player.getAttribute("src")) return;
  setStatus("SIN SEÑAL", "error");
  setNowPlaying("Stream no disponible");
  isPlaying = false;
  setPlayIcon(false);
  stopVu();
  stopMetaPoll();
});

player.addEventListener("waiting", () => {
  if (isPlaying) setStatus("BUFFER", "wait");
});

player.addEventListener("playing", () => {
  setStatus("EN VIVO", "on");
  startVu();
  updateMediaSession();
});

player.addEventListener("ended", () => {
  isPlaying = false;
  setPlayIcon(false);
  stopVu();
  stopMetaPoll();
});

/* Media Session actions */
if ("mediaSession" in navigator) {
  try {
    navigator.mediaSession.setActionHandler("play", () => {
      if (currentStation && isPowerOn) play();
    });
    navigator.mediaSession.setActionHandler("pause", () => pause());
    navigator.mediaSession.setActionHandler("stop", () => {
      if (isPowerOn) powerToggle();
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => stepStation(-1));
    navigator.mediaSession.setActionHandler("nexttrack", () => stepStation(1));
  } catch (_) {}
}

/* Progress bar is visual only for live streams */
if (progressBar) {
  progressBar.addEventListener("input", (e) => e.preventDefault());
  progressBar.addEventListener("mousedown", (e) => e.preventDefault());
  progressBar.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
}

/* --- Build preset buttons --- */
STATIONS.forEach((st) => {
  const btn = document.createElement("button");
  btn.className = "preset-btn";
  btn.dataset.id = st.id;
  btn.dataset.name = st.name.toLowerCase();
  btn.dataset.freq = (st.freq || "").toLowerCase();
  btn.setAttribute("aria-pressed", "false");
  btn.innerHTML = `<span class="p-name">${st.name}</span><span class="p-freq">${st.freq}</span>`;
  btn.addEventListener("click", () => selectStation(st));
  presetGrid.appendChild(btn);
});

/* Contador y mensaje cuando la bÃºsqueda no encuentra nada */
function updateCount() {
  const total = STATIONS.length;
  const shown = document.querySelectorAll(".preset-btn:not(.hidden)").length;
  stationCount.textContent = shown === total ? total + " emisoras" : shown + " de " + total;
  emptyMsg.hidden = shown !== 0;
}

/* Search filter */
if (stationSearch) {
  stationSearch.addEventListener("input", () => {
    const q = stationSearch.value.trim().toLowerCase();
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      const match = !q || btn.dataset.name.includes(q) || btn.dataset.freq.includes(q);
      btn.classList.toggle("hidden", !match);
    });
    updateCount();
  });
}

/* Atajos de teclado (pensados para la PC) */
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (document.querySelector("dialog[open]")) return;
  const tag = e.target && e.target.tagName;
  const typing = tag === "INPUT" || tag === "TEXTAREA";

  if (e.key === "Escape" && e.target === stationSearch) {
    stationSearch.value = "";
    stationSearch.dispatchEvent(new Event("input"));
    stationSearch.blur();
    return;
  }
  if (typing) return;

  if (e.key === "/") {
    e.preventDefault();
    stationSearch.focus();
  } else if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
    if (isPowerOn && currentStation) {
      if (isPlaying) pause();
      else play();
    }
  } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    if (e.target === document.body) {
      e.preventDefault();
      stepStation(1);
    }
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    if (e.target === document.body) {
      e.preventDefault();
      stepStation(-1);
    }
  }
});

/* estado inicial */
buildDial();
updateDial();
updateCount();
if (volume) {
  player.volume = volume.value / 100;
  paintVolume();
}

/* --- Acceso directo: PC (archivo) y celular (instalar app) --- */
const shortcutBtn = document.getElementById("shortcutBtn");
const shortcutDialog = document.getElementById("shortcutDialog");
const shortcutNote = document.getElementById("shortcutNote");
const shortcutMsg = document.getElementById("shortcutMsg");
const wayPc = document.getElementById("wayPc");
const wayPhone = document.getElementById("wayPhone");
const dlShortcut = document.getElementById("dlShortcut");
const installPc = document.getElementById("installPc");
const installPhone = document.getElementById("installPhone");

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
  windows: {
    ext: "url",
    mime: "application/internet-shortcut",
    build: (u) => "[InternetShortcut]\r\nURL=" + u + "\r\nIconIndex=0\r\n"
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

function showMsg(text) {
  shortcutMsg.textContent = text || "";
}

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
  showMsg("Listo: se descargÃ³ Â«" + name + "Â». Arrastralo al escritorio.");
}

function refreshShortcutUi() {
  wayPc.classList.toggle("is-here", !isMobile);
  wayPhone.classList.toggle("is-here", isMobile);
  wayPc.querySelector(".tag").hidden = isMobile;
  wayPhone.querySelector(".tag").hidden = !isMobile;
  installPc.hidden = isMobile || !deferredPrompt;
  installPhone.hidden = !isMobile || !deferredPrompt;
  dlShortcut.textContent = "Descargar para " + OS_LABEL[pcOS];
  dlShortcut.dataset.os = pcOS;
  shortcutDialog.querySelectorAll(".alt-links [data-os]").forEach((b) => { b.hidden = b.dataset.os === pcOS; });
  wayPhone.querySelector('[data-for="android"]').hidden = isIOS;
  wayPhone.querySelector('[data-for="ios"]').hidden = isAndroid;
  const insecure = location.protocol === "file:" || !window.isSecureContext;
  shortcutNote.hidden = !insecure;
  shortcutNote.textContent = insecure
    ? "EstÃ¡s abriendo la app desde un archivo local o una direcciÃ³n sin https. El acceso directo de la PC funciona, pero para instalarla en el celular tiene que estar publicada en una direcciÃ³n https."
    : "";
}

async function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  showMsg(outcome === "accepted" ? "Listo, la app se estÃ¡ instalando." : "");
  refreshShortcutUi();
}

function openShortcutDialog() {
  showMsg("");
  refreshShortcutUi();
  if (shortcutDialog.showModal) shortcutDialog.showModal();
  else shortcutDialog.setAttribute("open", "");
}

function closeShortcutDialog() {
  if (shortcutDialog.close) shortcutDialog.close();
  else shortcutDialog.removeAttribute("open");
}

shortcutBtn.hidden = isStandalone;
shortcutBtn.addEventListener("click", openShortcutDialog);
document.getElementById("shortcutClose").addEventListener("click", closeShortcutDialog);
shortcutDialog.addEventListener("click", (e) => {
  if (e.target === shortcutDialog) closeShortcutDialog();
});
dlShortcut.addEventListener("click", () => downloadShortcut(dlShortcut.dataset.os || pcOS));
shortcutDialog.querySelectorAll(".alt-links [data-os]").forEach((b) => {
  b.addEventListener("click", () => downloadShortcut(b.dataset.os));
});
installPc.addEventListener("click", installApp);
installPhone.addEventListener("click", installApp);

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  refreshShortcutUi();
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  shortcutBtn.hidden = true;
  refreshShortcutUi();
});

/* Service Worker */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch((err) => {
    console.warn("SW registration failed:", err);
  });
}

/* Wake Lock opcional (mantener pantalla en mobile mientras suena) */
let wakeLock = null;
async function requestWakeLock() {
  if ("wakeLock" in navigator && isPlaying) {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
    } catch (_) {}
  }
}
player.addEventListener("playing", requestWakeLock);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && isPlaying) requestWakeLock();
});
