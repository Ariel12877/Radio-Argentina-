/* ============================================================
   Clima y fecha de Machagai (versión PC)
   - Izquierda: temperatura, estado del cielo, sensación térmica y humedad.
   - Derecha: fecha de hoy y la ciudad.
   - El clima viene de Open-Meteo (gratis, sin clave), se actualiza cada 15 minutos.
   - Si no hay internet, queda el último dato (apagado si es viejo) o "Sin conexión".
   No toca pc.js ni pc-pro.js: solo lee y escribe en las cajas de pc.html.
   Para cambiar de ciudad: editá LAT, LON, CIUDAD y PROVINCIA.
   ============================================================ */
(function () {
  "use strict";

  var CIUDAD = "Machagai";
  var PROVINCIA = "Chaco";
  var LAT = -26.92;              // aproximado, centro de la ciudad
  var LON = -60.04;
  var TZ = "America/Argentina/Buenos_Aires"; // Chaco usa la misma hora (UTC-3)

  var CADA_OK = 15 * 60 * 1000;   // cada cuánto pide el clima
  var CADA_ERROR = 2 * 60 * 1000; // si falló, reintenta antes
  var DATO_VIEJO = 60 * 60 * 1000; // pasada 1 hora sin datos nuevos, la caja se apaga un poco

  function $(id) { return document.getElementById(id); }
  var cajaClima = $("climaBox"), cajaFecha = $("fechaBox");
  if (!cajaClima && !cajaFecha) return;

  /* ---------- Fecha y ciudad ---------- */
  var fmt = null;
  try {
    fmt = new Intl.DateTimeFormat("es-AR", { timeZone: TZ, weekday: "long", day: "numeric", month: "long", year: "numeric" });
  } catch (e) { fmt = null; }

  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  function partesFecha() {
    var p = {};
    if (fmt) {
      fmt.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      if (p.weekday && p.day && p.month && p.year) return p;
    }
    var d = new Date(); // respaldo: la hora de la computadora
    return { weekday: DIAS[d.getDay()], day: String(d.getDate()), month: MESES[d.getMonth()], year: String(d.getFullYear()) };
  }

  var ultimaFecha = "";
  function pintarFecha() {
    var p = partesFecha();
    var clave = p.day + p.month + p.year;
    if (clave === ultimaFecha) return; // no vuelve a escribir si el día no cambió
    ultimaFecha = clave;
    var dia = p.weekday.charAt(0).toUpperCase() + p.weekday.slice(1);
    var el = $("fechaDia"), ciudad = $("fechaCiudad");
    if (el) el.textContent = dia + " " + p.day + " de " + p.month;
    if (ciudad) ciudad.textContent = CIUDAD + ", " + PROVINCIA + " · " + p.year;
    if (cajaFecha) cajaFecha.classList.add("ready");
  }

  /* ---------- Íconos (trazo ámbar, igual que las notas musicales) ---------- */
  var NUBE = "M7 19h10.5a3.8 3.8 0 0 0 .4-7.6A5.6 5.6 0 0 0 7.2 10.3 4.4 4.4 0 0 0 7 19z";
  var ICONOS = {
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/>',
    luna: '<path d="M20 14.6A8 8 0 1 1 9.4 4a6.5 6.5 0 0 0 10.6 10.6z"/>',
    parcial: '<circle cx="8" cy="8" r="2.8"/><path d="M8 2.2v1.2M2.2 8h1.2M3.9 3.9l.9.9M12.1 3.9l-.9.9"/><path d="M9.5 20h8a3.3 3.3 0 0 0 .3-6.6 4.6 4.6 0 0 0-8.7 1.2A3.1 3.1 0 0 0 9.5 20z"/>',
    nube: '<path d="' + NUBE + '"/>',
    niebla: '<path d="M4 9h16M6 13h12M4 17h16"/>',
    lluvia: '<path d="M7 15h10.5a3.8 3.8 0 0 0 .4-7.6A5.6 5.6 0 0 0 7.2 6.3 4.4 4.4 0 0 0 7 15z"/><path d="M8 18.5l-1 2.2M12 18.5l-1 2.2M16 18.5l-1 2.2"/>',
    tormenta: '<path d="M7 14.5h10.5a3.8 3.8 0 0 0 .4-7.6A5.6 5.6 0 0 0 7.2 5.8 4.4 4.4 0 0 0 7 14.5z"/><path d="M12.5 14l-2.6 4.2h3.4l-2.2 3.6"/>',
    nieve: '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/>'
  };

  /* Códigos WMO que usa Open-Meteo: [texto, ícono] */
  var CIELO = {
    0: ["Despejado", "sol"], 1: ["Mayormente despejado", "sol"], 2: ["Parcialmente nublado", "parcial"], 3: ["Nublado", "nube"],
    45: ["Niebla", "niebla"], 48: ["Niebla helada", "niebla"],
    51: ["Llovizna leve", "lluvia"], 53: ["Llovizna", "lluvia"], 55: ["Llovizna intensa", "lluvia"],
    56: ["Llovizna helada", "lluvia"], 57: ["Llovizna helada", "lluvia"],
    61: ["Lluvia leve", "lluvia"], 63: ["Lluvia", "lluvia"], 65: ["Lluvia fuerte", "lluvia"],
    66: ["Lluvia helada", "lluvia"], 67: ["Lluvia helada", "lluvia"],
    71: ["Nevada leve", "nieve"], 73: ["Nevada", "nieve"], 75: ["Nevada fuerte", "nieve"], 77: ["Granizo fino", "nieve"],
    80: ["Chubascos leves", "lluvia"], 81: ["Chubascos", "lluvia"], 82: ["Chubascos fuertes", "lluvia"],
    85: ["Chubascos de nieve", "nieve"], 86: ["Chubascos de nieve", "nieve"],
    95: ["Tormenta", "tormenta"], 96: ["Tormenta con granizo", "tormenta"], 99: ["Tormenta con granizo", "tormenta"]
  };

  /* ---------- Clima ---------- */
  var dato = null;      // último dato bueno: { temp, sens, hum, codigo, dia, cuando }
  var timer = 0;

  function pintarClima() {
    if (!cajaClima) return;
    var temp = $("climaTemp"), desc = $("climaDesc"), sub = $("climaSub"), ico = $("climaIco");
    if (!dato) {
      if (temp) temp.innerHTML = "--<small>°C</small>";
      if (desc) desc.textContent = timer ? "Sin conexión" : "Cargando…";
      if (sub) sub.textContent = "Clima de " + CIUDAD;
      if (ico) ico.innerHTML = ICONOS.nube;
      cajaClima.classList.add("ready");
      return;
    }
    var info = CIELO[dato.codigo] || ["Sin datos del cielo", "nube"];
    var icono = info[1];
    if (dato.dia === 0 && (icono === "sol")) icono = "luna"; // de noche, un cielo despejado muestra la luna
    if (temp) temp.innerHTML = Math.round(dato.temp) + "<small>°C</small>";
    if (desc) desc.textContent = info[0];
    if (sub) sub.textContent = "Sensación " + Math.round(dato.sens) + "° · Humedad " + Math.round(dato.hum) + "%";
    if (ico) ico.innerHTML = ICONOS[icono] || ICONOS.nube;
    cajaClima.classList.add("ready");
    cajaClima.classList.toggle("stale", Date.now() - dato.cuando > DATO_VIEJO);
  }

  function programar(ms) {
    clearTimeout(timer);
    timer = setTimeout(pedirClima, ms);
  }

  function pedirClima() {
    var url = "https://api.open-meteo.com/v1/forecast?latitude=" + LAT + "&longitude=" + LON +
      "&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,is_day&timezone=auto";
    fetch(url, { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (d) {
        var c = d && d.current;
        if (!c || typeof c.temperature_2m !== "number") throw new Error("sin datos");
        dato = {
          temp: c.temperature_2m,
          sens: typeof c.apparent_temperature === "number" ? c.apparent_temperature : c.temperature_2m,
          hum: typeof c.relative_humidity_2m === "number" ? c.relative_humidity_2m : 0,
          codigo: c.weather_code,
          dia: c.is_day === 0 ? 0 : 1,
          cuando: Date.now()
        };
        pintarClima();
        programar(CADA_OK);
      })
      .catch(function () {
        programar(CADA_ERROR);
        pintarClima();
      });
  }

  /* ---------- Arranque ---------- */
  pintarFecha();
  pintarClima();
  pedirClima();
  setInterval(pintarFecha, 30 * 1000); // para que cambie solo a medianoche

  // Al volver a la pestaña, se pone al día (la computadora pudo dormirse)
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) return;
    pintarFecha();
    if (!dato || Date.now() - dato.cuando > CADA_OK) pedirClima();
  });
})();
