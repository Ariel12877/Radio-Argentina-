/* Radios argentinas — streams públicos actualizados 2026 */
const STATIONS = [
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

let currentStation = null;
let isPowerOn = false;
let isPlaying = false;
let vuInterval = null;
let deferredPrompt = null;

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
    const level = 30 + Math.random() * 55;
    vu.style.width = level + "%";
  }, 180);
}

function stopVu() {
  if (vuInterval) clearInterval(vuInterval);
  vuInterval = null;
  vu.style.width = "0%";
}

/* --- Player logic --- */
function selectStation(station) {
  if (!isPowerOn) {
    isPowerOn = true;
    btnPower.classList.add("active");
  }

  if (currentStation && currentStation.id === station.id && isPlaying) {
    // misma emisora → toggle pause
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
        nowPlayingEl.textContent = "Reproduciendo…";
      })
      .catch((err) => {
        console.warn("Play error:", err);
        setStatus("ERROR", "error");
        nowPlayingEl.textContent = "No se pudo reproducir";
        isPlaying = false;
        playIcon.textContent = "▶";
        stopVu();
      });
  }
}

function pause() {
  player.pause();
  isPlaying = false;
  playIcon.textContent = "▶";
  setStatus("PAUSA", "on");
  stopVu();
  nowPlayingEl.textContent = "Pausado";
}

function stop() {
  player.pause();
  player.removeAttribute("src");
  player.load();
  isPlaying = false;
  playIcon.textContent = "▶";
  stopVu();
  nowPlayingEl.textContent = "";
}

function powerToggle() {
  if (isPowerOn) {
    // apagar
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
  nowPlayingEl.textContent = "Stream no disponible";
  isPlaying = false;
  playIcon.textContent = "▶";
  stopVu();
});

player.addEventListener("waiting", () => {
  if (isPlaying) setStatus("BUFFER…", "on");
});

player.addEventListener("playing", () => {
  setStatus("EN VIVO", "on");
  startVu();
});

player.addEventListener("ended", () => {
  // streams en vivo no deberían terminar, pero por si acaso
  isPlaying = false;
  playIcon.textContent = "▶";
  stopVu();
});

/* --- Build preset buttons --- */
STATIONS.forEach((st) => {
  const btn = document.createElement("button");
  btn.className = "preset-btn";
  btn.dataset.id = st.id;
  btn.innerHTML = `<span class="p-name">${st.name}</span><span class="p-freq">${st.freq}</span>`;
  btn.addEventListener("click", () => selectStation(st));
  presetGrid.appendChild(btn);
});

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
