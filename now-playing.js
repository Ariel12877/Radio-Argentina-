/* Radio Argentina — Now Playing
 * No modifica la reproducción. Observa los dos reproductores existentes.
 * Lee metadatos JSON configurados por emisora o ICY cuando el servidor permite CORS.
 * La búsqueda de portada usa iTunes Search API después de conocer título/artista.
 * El reconocimiento de audio tipo Shazam requiere un backend/API externo y NO se simula aquí.
 */
(() => {
  "use strict";
  const byId = id => document.getElementById(id);
  const panel = byId("trackDisplay");
  if (!panel) return;

  const titleNode = byId("trackTitle");
  const artistNode = byId("trackArtist");
  const coverNode = byId("trackCover");
  const fallbackNode = byId("trackCoverFallback");
  const stateNode = byId("trackState");
  const audioNodes = new Set([byId("player"), ...Array.from(document.querySelectorAll("audio"))].filter(Boolean));
  const boundAudio = new WeakSet();
  const memory = new Map();
  let station = null;
  let generation = 0;
  let pollId = 0;
  let coverRequest = 0;
  let activeTitleKey = "";

  const clean = value => String(value || "").replace(/\0/g, "").trim();

  function state(label, mode) {
    stateNode.textContent = label;
    panel.dataset.state = mode || "idle";
  }

  function setCover(url) {
    if (!url) {
      coverNode.removeAttribute("src");
      coverNode.hidden = true;
      fallbackNode.hidden = false;
      panel.classList.remove("has-track");
      if (danceStage) danceStage.hidden = false;
      return;
    }
    coverNode.onload = () => {
      coverNode.hidden = false;
      fallbackNode.hidden = true;
      panel.classList.add("has-track");
      if (danceStage) danceStage.hidden = true;
    };
    coverNode.onerror = () => {
      coverNode.hidden = true;
      fallbackNode.hidden = false;
      panel.classList.remove("has-track");
      if (danceStage) danceStage.hidden = false;
    };
    coverNode.src = url;
  }

  function parseStreamTitle(raw) {
    const value = clean(raw);
    if (!value) return null;
    const match = value.match(/StreamTitle\s*=\s*['"]([^'"]*)['"]/i);
    const text = clean(match ? match[1] : value).replace(/\\'/g, "'");
    if (!text) return null;
    const parts = text.split(/\s+-\s+|\s+–\s+/);
    if (parts.length > 1) return { artist: parts.shift().trim(), title: parts.join(" - ").trim() };
    return { title: text, artist: "" };
  }

  async function findCover(title, artist, token) {
    const request = ++coverRequest;
    try {
      const term = encodeURIComponent([artist, title].filter(Boolean).join(" "));
      const response = await fetch("https://itunes.apple.com/search?media=music&entity=song&limit=5&term=" + term);
      if (!response.ok) return;
      const data = await response.json();
      if (request !== coverRequest || token !== generation || !data.results?.length) return;
      const exact = data.results.find(item =>
        clean(item.trackName).toLocaleLowerCase() === title.toLocaleLowerCase()
      );
      const chosen = exact || data.results[0];
      const artwork = chosen.artworkUrl100 || chosen.artworkUrl60;
      if (artwork && titleNode.textContent === title) {
        setCover(artwork.replace(/100x100bb/, "300x300bb"));
        const known = memory.get(station?.id);
        if (known) { known.cover = artwork.replace(/100x100bb/, "300x300bb"); memory.set(station.id, known); }
      }
    } catch (_) {
      // Si la búsqueda no responde, se mantiene el visor sin portada.
    }
  }

  function publishTrack(title, artist, artwork, token) {
    title = clean(title);
    artist = clean(artist);
    if (!title || token !== generation) return false;
    titleNode.textContent = title;
    artistNode.textContent = artist || "Artista no informado";
    setCover(artwork);
    state("TEMA IDENTIFICADO", "found");
    const key = title + "|" + artist;
    const record = { title, artist, cover: artwork || "" };
    if (station) memory.set(station.id, record);
    if (key !== activeTitleKey) {
      activeTitleKey = key;
      if (!artwork) findCover(title, artist, token);
    }
    return true;
  }

  async function readJsonMetadata(current, token) {
    if (!current?.metadataUrl) return false;
    try {
      const response = await fetch(current.metadataUrl, { cache: "no-store" });
      if (!response.ok || token !== generation) return false;
      const data = await response.json();
      const nested = data.now_playing || data.song || data.track || data;
      const title = nested.title || nested.track || nested.name || nested.StreamTitle || nested.streamtitle;
      const artist = nested.artist || nested.performer || nested.author || "";
      const artwork = nested.artwork || nested.cover || nested.image || nested.album_art || "";
      return publishTrack(title, artist, artwork, token);
    } catch (_) { return false; }
  }

  async function readIcyMetadata(current, token) {
    if (!current?.url || !("AbortController" in window)) return false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5500);
    let reader;
    try {
      const response = await fetch(current.url, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        headers: { "Icy-MetaData": "1", "Range": "bytes=0-131071" },
        signal: controller.signal
      });
      const interval = Number(response.headers.get("icy-metaint") || 0);
      if (!response.ok || !interval || !response.body) return false;
      reader = response.body.getReader();
      let buffer = new Uint8Array(0);
      const needed = interval + 1;
      while (buffer.length < needed && token === generation) {
        const part = await reader.read();
        if (part.done) return false;
        const next = new Uint8Array(buffer.length + part.value.length);
        next.set(buffer);
        next.set(part.value, buffer.length);
        buffer = next;
        if (buffer.length > 180000) return false;
      }
      if (token !== generation || buffer.length < needed) return false;
      const metadataLength = buffer[interval] * 16;
      if (!metadataLength) return false;
      const end = interval + 1 + metadataLength;
      while (buffer.length < end && token === generation) {
        const part = await reader.read();
        if (part.done) return false;
        const next = new Uint8Array(buffer.length + part.value.length);
        next.set(buffer);
        next.set(part.value, buffer.length);
        buffer = next;
      }
      if (token !== generation || buffer.length < end) return false;
      const metadata = new TextDecoder("utf-8").decode(buffer.slice(interval + 1, end));
      const parsed = parseStreamTitle(metadata);
      return parsed ? publishTrack(parsed.title, parsed.artist, "", token) : false;
    } catch (_) {
      // La mayoría de emisoras no habilitan CORS para leer ICY desde otra web.
      // Este intento fallido no afecta al audio que ya reproduce el navegador.
      return false;
    } finally {
      clearTimeout(timeout);
      try { await reader?.cancel(); } catch (_) {}
      try { controller.abort(); } catch (_) {}
    }
  }

  function restoreLast(current) {
    const old = memory.get(current?.id);
    if (old) {
      titleNode.textContent = old.title;
      artistNode.textContent = old.artist || "Último tema identificado";
      setCover(old.cover);
      state("ÚLTIMO TEMA CONOCIDO", "stale");
    } else {
      titleNode.textContent = "Información no disponible";
      artistNode.textContent = "Esta emisora no entrega tags accesibles";
      setCover("");
      state("EN VIVO", "idle");
    }
  }

  async function refresh() {
    if (!station || !Array.from(audioNodes).some(audio => !audio.paused && !audio.ended)) return;
    const token = generation;
    state("BUSCANDO INFORMACIÓN…", "searching");
    const found = await readJsonMetadata(station, token) || await readIcyMetadata(station, token);
    if (!found && token === generation) restoreLast(station);
  }

  function setStation(nextStation) {
    if (!nextStation) return;
    station = nextStation;
    generation++;
    activeTitleKey = "";
    clearInterval(pollId);
    const previous = memory.get(station.id);
    if (previous) {
      titleNode.textContent = previous.title;
      artistNode.textContent = previous.artist || "Último tema identificado";
      setCover(previous.cover);
      state("ÚLTIMO TEMA CONOCIDO", "stale");
    } else {
      titleNode.textContent = "Esperando información musical…";
      artistNode.textContent = station.name || "Radio Argentina";
      setCover("");
      state("CONECTANDO CON LA EMISORA", "searching");
    }
    pollId = setInterval(refresh, 30000);
    refresh();
  }

  // El personaje se desplaza al compás usando el analizador que ya emplea el ecualizador.
  let dogMotionId = 0;
  function startDogMotion() {
    if (!danceDog || dogMotionId) return;
    const analyser = window.RadioArgentinaGetAnalyser?.();
    let samples = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    let phase = 0;
    const animateDog = () => {
      dogMotionId = requestAnimationFrame(animateDog);
      let energy = 0.32;
      const activeAnalyser = window.RadioArgentinaGetAnalyser?.();
      if (activeAnalyser) {
        if (!samples || samples.length !== activeAnalyser.frequencyBinCount) samples = new Uint8Array(activeAnalyser.frequencyBinCount);
        activeAnalyser.getByteFrequencyData(samples);
        let sum = 0;
        for (let i = 0; i < Math.min(24, samples.length); i++) sum += samples[i];
        energy = Math.max(0.12, Math.min(1, (sum / Math.min(24, samples.length)) / 170));
      }
      phase += 0.018 + energy * 0.04;
      const sway = Math.sin(phase) * (4 + energy * 8);
      const bounce = Math.abs(Math.sin(phase * 2)) * (2 + energy * 5);
      danceDog.style.setProperty("--dog-sway", sway.toFixed(2) + "px");
      danceDog.style.setProperty("--dog-bounce", (-bounce).toFixed(2) + "px");
    };
    animateDog();
  }
  startDogMotion();

  function bindAudio(audio) {
    if (!audio || boundAudio.has(audio)) return;
    boundAudio.add(audio);
    audioNodes.add(audio);
    audio.addEventListener("playing", refresh);
    audio.addEventListener("pause", () => {
      if (Array.from(audioNodes).every(item => item.paused)) state("PAUSADO", "idle");
    });
    audio.addEventListener("error", () => {
      if (Array.from(audioNodes).every(item => item.paused)) state("STREAM NO DISPONIBLE", "idle");
    });
  }

  Array.from(audioNodes).forEach(bindAudio);
  window.RadioNowPlaying = { setStation, setPlayer: bindAudio, refresh };
})();
