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
    id: "Retro FM",
    name: "Retro FM",
    freq: "Online",
    url: "https://argentina.shockmedia.com.ar:8018/stream"
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
    id: "Sentimientos latinos"",
    name: "Sentimientos latinos"",
    freq: "online",
    url: "https://streaming.radiosenlinea.com.ar/8174/;"
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
    // en dias de partido a veces la bloquean por derechos
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

  /* ===== Cordoba ===== */
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
    id: "fmlaredonda",
    name: "Fm la redonda Solo Futbol",
    freq: "FM 100.3",
    url: "https://01.solumedia.com.ar:8290/stream"
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
    id: "purorocknaciona",
    name: "Puro rock naciona",
    freq: "103.5",
    url: "https://srv591.grupomultimedios.com.ar:9902/radio/8110/radio.mp3?t=1794530808506"
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
    url: "https://ssl.veemesoft.com.ar/d03cdf788d245e8e4a35"
  },
  {
    id: "eldesta",
    name: "El Destape Radio",
    freq: "ONLINE",
    url: "https://live-ar1.cdnrad.com/hls/radio-2123/live.m3u8"
  }
];


/* ---- Orden de la lista: primero las de Chaco / Machagai, después por categoría ---- */
const TOP_IDS = ["radiotop", "Pobre Johnny", "El mañanero", "FM libertad Machagai",
                 "VIP FM", "Master FM", "laradio1047", "facundoquiroga"];
const CAT_ORDER = ["chaco", "musica", "noticias", "folklore", "deportes"];
const CAT_LABEL = { chaco: "Chaco y Machagai", musica: "Música", noticias: "Noticias", folklore: "Folklore", deportes: "Deportes" };
const CAT_BY_ID = {
  noticias: ["nacional", "lra26", "Las Lomitas", "mitre", "lared", "continental", "rivadavia", "cnnradio",
             "Radio 10", "Radio Con Vos", "infobae", "cadena3am", "madre", "eldesta", "lu9", "lu2", "lu19", "lt3",
             "unicordoba", "cooperativa", "zonica", "delpueblo", "genesis", "la990", "delplata", "guemes",
             "delaciudad", "federal", "radiosur", "ecomedios", "ondalatina", "Radio Mocovl AM 800"],
  folklore:  ["Radio Chamame", "Polca Paraguaya", "Ñande Reko Radio", "FOLKLORE RADIO", "nacionalfolklorica"],
  deportes:  ["dsports", "fmlaredonda"]
};
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
  prev.connect(analyser);
  analyser.connect(audioCtx.destination);
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

  function frame() {
    if (!isPlaying || player !== playerEQ) return;
    analyser.getByteFrequencyData(data);
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

async function playStation(st) {
  if (!st) return;
  const token = ++playToken;
  currentStation = st;
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
  const id = (st.id || "").toLowerCase();
  const name = (st.name || "").toLowerCase();
  if (id.includes("radiotop") || name.includes("radio top")) {
    return { cls: "logo-radiotop", html: "Radio<br><span>Top</span>" };
  }
  if (id.includes("pobre") || name.includes("pobre johnny")) {
    return { cls: "logo-pobre", html: "Pobre<br>Johnny" };
  }
  if (id.includes("mañanero") || id.includes("mananero") || name.includes("mañanero")) {
    return { cls: "logo-mananero", html: "📊" };
  }
  if (id.includes("libertad") || name.includes("libertad")) {
    return { cls: "logo-libertad", html: "FM<br>Libertad" };
  }
  if (id.includes("vip") || name.includes("vip radio")) {
    return { cls: "logo-vip", html: "Vip<br>Radio" };
  }
  const initials = st.name.split(" ").slice(0, 2).map(w => (w[0] || "")).join("").toUpperCase().slice(0, 3);
  return { cls: "logo-default", html: initials };
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
      <div class="station-logo ${logo.cls}" style="--h:${stationHue(st)}">${logo.html}</div>
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
    <p>Usa los botones de volumen de tu teléfono o PC para ajustar el volumen general.</p>
    <h3>Calidad</h3>
    <p>La mayoría de los streams se reproducen en la mejor calidad disponible (128–192 kbps).</p>
    <h3>Datos móviles</h3>
    <p>El streaming consume aproximadamente 60–90 MB por hora.</p>
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
    <p style="margin-top:16px;font-size:0.85rem;opacity:0.7">v2.0 · 2026</p>
  `);
}

/* ---- Event listeners ---- */
btnPlay.addEventListener("click", togglePlay);
btnPrev.addEventListener("click", () => stepStation(-1));
btnNext.addEventListener("click", () => stepStation(1));
btnFav.addEventListener("click", toggleFav);
btnEq.addEventListener("click", openEq);
eqClose.addEventListener("click", closeEq);
eqReset.addEventListener("click", () => setEqPreset("flat"));

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

/* Service Worker */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch((err) => {
    console.warn("SW registration failed:", err);
  });
}

/* Also expose openShortcutDialog for Opciones panel */
window.openShortcutDialog = openShortcutDialog;
