/* Radios argentinas — streams públicos (lista ampliada, noviembre 2026)
   Solo streams https directos (sin .m3u8 / HLS), para que funcionen con <audio>
   en Chrome, Edge y Firefox, y también si la página está en https.
   Las marcadas con ⚠ están armadas por analogía y hay que probarlas. */
const STATIONS = [
  {
    id: "radiotop",
    name: "Radio Top",
    freq: "ONLINE",
    url: "https://cdn.instream.audio:9818/stream"
  },
  /* ===== Chaco (agregadas) ===== */
  {
    id: "laradio1047",
    name: "La Radio 104.7",
    freq: "FM 104.7",
    url: "http://server.laradio.online:9262/stream"
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
    url: "http://streaming5.locucionar.com:23184/stream"
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

  /* ===== AM de Buenos Aires ===== */
  {
    id: "madre",
    name: "Radio Madre",
    freq: "AM 530",
    url: "https://cdn.instream.audio:9288/stream" // ⚠ la lista original estaba en http; la pasé a https
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
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/CONTINENTAL_SC"
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
    name: "Radio Zónica",
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
    name: "Génesis",
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
    url: "https://sa.mp3.icecast.magma.edge-access.net/sc_rad39" // ⚠ mismo patrón que tu Nacional AM 870
  },
  {
    id: "disney",
    name: "Radio Disney",
    freq: "FM 94.3",
    url: "https://edge-np.cdn.mdstrm.com/5a9ee26311c043ae48e40bcd.mp3" // ⚠ link viejo, puede estar caído
  },
  {
    id: "concepto",
    name: "Concepto",
    freq: "FM 95.5",
    url: "https://radios.solumedia.com:6002/stream"
  },
  {
    id: "nacionalclasica",
    name: "Nacional Clásica",
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
    id: "now",
    name: "NOW",
    freq: "FM 97.9",
    url: "https://cdn.instream.audio:9604/stream"
  },
  {
    id: "nacionalfolklorica",
    name: "Nacional Folklórica",
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
    // en días de partido a veces la bloquean por derechos
  },
  {
    id: "sonido",
    name: "Sonido",
    freq: "FM 103.5",
    url: "https://streaming.radiosenlinea.com.ar/8780/stream/1/"
  },
  {
    id: "lnmusica",
    name: "LN+ Música",
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
    name: "Radio Pasión",
    freq: "FM 102.7",
    url: "https://cdn.instream.audio/stream/9790"
  },
  {
    id: "berlin",
    name: "Radio Berlín",
    freq: "FM 107.9",
    url: "https://unlimited5-us.dps.live/berlin/aac/icecast.audio"
  },

  /* ===== Córdoba ===== */
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
    name: "FM Córdoba",
    freq: "FM 91.9",
    url: "https://liveradio.mediainbox.net/fmcordoba.mp3"
  },
  {
    id: "suquia",
    name: "Radio Suquía",
    freq: "FM 96.5",
    url: "https://streaming01.shockmedia.com.ar:10945/"
  },
  {
    id: "mia",
    name: "Radio Mía",
    freq: "FM 104.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/FM1041_56AAC.aac"
  },
  {
    id: "unicordoba",
    name: "Radio Universidad Córdoba",
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
    name: "Estación del Sol",
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
    name: "LU2 Bahía Blanca",
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
    name: "Río Negro Radio",
    freq: "FM 90.9",
    url: "https://server6.hostradios.com/8440/stream"
  },
  {
    id: "laredneuquen",
    name: "La Red Neuquén",
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
    url: "https://streamall.alsolnet.com/radiolightfm" // ⚠ el link original estaba en http; lo pasé a https
  },

  /* ===== Solo online ===== */
  {
    id: "futurock",
    name: "Futurock",
    freq: "ONLINE",
    url: "https://nowplaying.mdstrm.com/5b7dcf666253b80766f27858/576b06096457cff453000015/live/icecast.audio"
  },
  {
    id: "ledfm",
    name: "Led FM",
    freq: "ONLINE",
    url: "https://cdn.instream.audio/:9068/stream"
  },
  {
    id: "relatores",
    name: "Relatores",
    freq: "ONLINE",
    url: "https://radio.relatores.com.ar/relatores.mp3"
  },
  {
    id: "eldesta",
    name: "El Desta Radio",
    freq: "ONLINE",
    url: "https://cdn2.instream.audio/:8000/stream"
  }
];

const player = document.getElementById("player");
const btnPower = document.getElementById("btnPower");
const btnPlay = document.getElementById("btnPlay");
const playIcon = document.getElementById("playIcon");
const volume = document.getElementById("volume");
const statusEl = document.getElementById("status");
const freqEl = document.getElementById("freq");
const stationNameEl = document.getElementById("stationName");
const nowPlayingEl = document.getElementById("nowPlaying");
const vu = document.getElementById("vu");
const presetGrid = document.getElementById("presetGrid");
const installBtn = document.getElementById("installBtn");
const stationSearch = document.getElementById("stationSearch");

let currentStation = null;
let isPowerOn = false;
let isPlaying = false;
let vuInterval = null;
let deferredPrompt = null;
let metaPollTimer = null;

/* --- UI helpers --- */
function setStatus(text, type = "") {
  statusEl.textContent = text;
  statusEl.className = "status" + (type ? " " + type : "");
}

function updateDisplay() {
  if (!currentStation) {
    freqEl.textContent = "—";
    stationNameEl.textContent = "Seleccioná una emisora";
    nowPlayingEl.textContent = "";
    nowPlayingEl.classList.remove("has-meta");
    return;
  }
  freqEl.textContent = currentStation.freq;
  stationNameEl.textContent = currentStation.name;
}

function highlightPreset(id) {
  document.querySelectorAll(".preset-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.id === id);
  });
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
  // Algunos streams exponen el título vía el elemento audio o MediaSession.
  // En la mayoría de navegadores el ICY no llega al JS por CORS;
  // mostramos al menos el estado y actualizamos Media Session.
  if (!isPlaying || !currentStation) return;
  try {
    if (player.mozGetMetadata) {
      const meta = player.mozGetMetadata();
      if (meta && (meta.title || meta.artist)) {
        const t = [meta.artist, meta.title].filter(Boolean).join(" — ");
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

  setStatus("CONECTANDO…", "on");
  setNowPlaying("Conectando…");
  player.src = currentStation.url;
  player.load();

  const playPromise = player.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        isPlaying = true;
        playIcon.textContent = "❚❚";
        setStatus("EN VIVO", "on");
        startVu();
        setNowPlaying("Reproduciendo…");
        updateMediaSession();
        startMetaPoll();
        tryReadIcyTitle();
      })
      .catch((err) => {
        console.warn("Play error:", err);
        setStatus("ERROR", "error");
        setNowPlaying("No se pudo reproducir");
        isPlaying = false;
        playIcon.textContent = "▶";
        stopVu();
        stopMetaPoll();
      });
  }
}

function pause() {
  player.pause();
  isPlaying = false;
  playIcon.textContent = "▶";
  setStatus("PAUSA", "on");
  stopVu();
  setNowPlaying("Pausado");
  stopMetaPoll();
  updateMediaSession();
}

function stop() {
  player.pause();
  player.removeAttribute("src");
  player.load();
  isPlaying = false;
  playIcon.textContent = "▶";
  stopVu();
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

/* --- Events --- */
btnPower.addEventListener("click", powerToggle);

btnPlay.addEventListener("click", () => {
  if (!isPowerOn || !currentStation) return;
  if (isPlaying) pause();
  else play();
});

volume.addEventListener("input", () => {
  player.volume = volume.value / 100;
});

player.addEventListener("error", () => {
  setStatus("SIN SEÑAL", "error");
  setNowPlaying("Stream no disponible");
  isPlaying = false;
  playIcon.textContent = "▶";
  stopVu();
  stopMetaPoll();
});

player.addEventListener("waiting", () => {
  if (isPlaying) setStatus("BUFFER…", "on");
});

player.addEventListener("playing", () => {
  setStatus("EN VIVO", "on");
  startVu();
  updateMediaSession();
});

player.addEventListener("ended", () => {
  isPlaying = false;
  playIcon.textContent = "▶";
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
  } catch (_) {}
}

/* --- Build preset buttons --- */
STATIONS.forEach((st) => {
  const btn = document.createElement("button");
  btn.className = "preset-btn";
  btn.dataset.id = st.id;
  btn.dataset.name = st.name.toLowerCase();
  btn.dataset.freq = (st.freq || "").toLowerCase();
  btn.innerHTML = `<span class="p-name">${st.name}</span><span class="p-freq">${st.freq}</span>`;
  btn.addEventListener("click", () => selectStation(st));
  presetGrid.appendChild(btn);
});

/* Search filter */
if (stationSearch) {
  stationSearch.addEventListener("input", () => {
    const q = stationSearch.value.trim().toLowerCase();
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      const match = !q || btn.dataset.name.includes(q) || btn.dataset.freq.includes(q);
      btn.classList.toggle("hidden", !match);
    });
  });
}

/* volume inicial */
player.volume = volume.value / 100;

/* --- PWA install --- */
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === "accepted") {
    installBtn.hidden = true;
  }
  deferredPrompt = null;
});

window.addEventListener("appinstalled", () => {
  installBtn.hidden = true;
  deferredPrompt = null;
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
