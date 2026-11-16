/* ============================================================
   Logos de las radios: lo comparten la versión móvil y la de PC.

   Cómo funciona: cada radio (por su id de stations.js) tiene hasta
   tres lugares donde buscar su logo, y se prueban en este orden:
     w  logos/<w>.webp                       (el más liviano)
     r  radio_logos/<r>_list_100 / play_300 / play_512
     f  un archivo puntual (las radios de Chaco)
   Si ninguno carga, se muestran las iniciales de la radio.

   Para sumar un logo: copiá la imagen a radio_logos/ y agregá UNA
   línea acá abajo, con el id exacto de la radio en stations.js.
   ============================================================ */
(function (global) {
  "use strict";

  var SIZES = ["list_100", "play_300", "play_512"];

  var MAP = {
  "radiotop": { f: "radio_logos/local/radio-top.jpg" },
  "Pobre Johnny": { f: "radio_logos/local/pobre-johnny.jpg" },
  "El mañanero": { f: "radio_logos/local/el-mananero.jpg" },
  "FM libertad Machagai": { f: "radio_logos/local/fm-libertad-machagai.jpg" },
  "VIP FM": { f: "radio_logos/local/vip-fm-machagai.jpg" },
  "Master FM": { f: "radio_logos/local/master-fm-machagai.jpg" },
  "Cristalfm": { f: "radio_logos/local/fm-cristal-machagai.jpg" },
  "laradio1047": { f: "radio_logos/local/la-radio-1047.jpg" },
  "facundoquiroga": { w: "facundoquiroga" },
  "radiofan": { f: "radio_logos/local/radio-fan.jpg" },
  "WALTER FM": { f: "radio_logos/local/walter-fm.jpg" },
  "Retro FM": { f: "radio_logos/local/retro-fm.jpg" },
  "Radio Mocovl AM 800": { f: "radio_logos/local/radio-mocovi.jpg" },
  "radiomaria": { r: "radio-maria-argentina" },
  "Futuro": { f: "radio_logos/local/radio-futuro.jpg" },
  "Radio Con Vos": { w: "convos", r: "radio-con-vos" },
  "lra26": { r: "radio-nacional" },
  "fmgualamba": { f: "radio_logos/local/fm-gualamba.jpg" },
  "nacional": { w: "nacional", r: "radio-nacional" },
  "FM Milenium ": { r: "milenium-106-7-fm" },
  "Vale 97.5": { w: "vale", r: "radio-vale" },
  "mitre": { w: "mitre", r: "radio-mitre" },
  "rockpop": { w: "rockpop", r: "fm-rock-pop-95-9" },
  "aspen": { w: "aspen", r: "aspen-102-3" },
  "metro": { r: "metro-95-1", e: "png" },
  "lared": { w: "lared", r: "radio-la-red" },
  "urbana": { w: "urbana", r: "urbana-play-104-3" },
  "am750": { w: "am750", r: "am-750" },
  "Las Lomitas": { r: "radio-nacional" },
  "Cadena Heat": { w: "heat", r: "fm-cordoba-cadena-heat" },
  "madre": { r: "am-530-somos-radio" },  // PROBABLE: confirmar el logo
  "continental": { w: "continental", r: "radio-continental" },
  "rivadavia": { w: "rivadavia", r: "radio-rivadavia" },
  "cnnradio": { r: "origen-am-950" },
  "la990": { w: "la990", r: "la-990" },
  "delplata": { w: "delplata", r: "radio-del-plata-am-1030", e: "png" },
  "guemes": { r: "radio-guemes" },
  "radiosur": { r: "radio-del-sur" },
  "delta": { w: "delta", r: "delta-90-3" },
  "nacionalrock": { w: "nacional", r: "radio-nacional" },
  "disney": { w: "disney", r: "radio-disney" },
  "nacionalclasica": { w: "nacional", r: "radio-nacional" },
  "La mega": { w: "mega", r: "mega-98-3" },
  "nacionalfolklorica": { w: "nacionalfolklorica", r: "radio-nacional-folklorica-98-7" },
  "la100": { w: "la100", r: "la-100" },
  "blue": { w: "blue", r: "blue-fm-100-7" },
  "dsports": { r: "d-sports-radio" },
  "lnmusica": { r: "la-nacion-104-9" },  // PROBABLE: confirmar el logo
  "los40": { w: "los40", r: "los40-argentina" },
  "berlin": { w: "berlin", r: "107-9-radio-berlin" },
  "cadena3am": { w: "cadena3", r: "cadena-3" },
  "cadena3fm": { w: "cadena3", r: "cadena-3" },
  "fmcordoba": { w: "heat", r: "fm-cordoba-cadena-heat" },
  "suquia": { w: "suquia", r: "radio-suquia-96-5" },
  "mia": { w: "mia", r: "mia-fm" },
  "lt3": { r: "lt3-am680" },
  "lt10": { w: "lt10", r: "lt10" },
  "estaciondelsol": { w: "estaciondelsol", r: "100-9-estacion-del-sol" },
  "lu19": { w: "lu19", r: "lu19" },
  "radio3trelew": { r: "radio-3-cadena-patagonia" },  // PROBABLE: confirmar el logo
  "fmdelmar": { r: "radio-del-mar" },
  "Radio 10": { w: "radio10", r: "radio-10" },
  "Radio Latina 101.1": { w: "latina", r: "radio-latina-101-1" },
  "eldesta": { w: "eldesta", r: "el-destape-radio" },
  "delsur": { r: "radio-del-sur" },
  "fmvida": { r: "fm-vida" },
  "miafm": { r: "mia-fm" },
  "mucha": { r: "mucha-radio" },
  "am530": { r: "am-530-somos-radio" },
  "colonia": { r: "radio-colonia" },
  "laplata965": { r: "fm-96-5-la-plata" },
  "valleviejo": { r: "radio-valle-viejo" },
  "nihuil": { r: "radio-nihuil" },
  "lt9": { r: "lt9" },
  "mujerfm": { r: "mujer-fm" },
  "laestacion": { r: "la-estacion-fm" },
  "radioboing": { r: "radio-boing" },
  "belgrano": { r: "belgrano-radio" },
  "elobservador": { r: "el-observador", e: "png" },
  "futurock": { r: "futurock-fm" },
  "la2x4": { r: "la-2x4" },
  "impacto947": { r: "impacto-94-7-fm" },
  "classique": { r: "classique" },
  "fmtrance": { r: "fm-trance-103-3" },
  "fisherton": { r: "fisherton-classic" },
  "lu5": { r: "lu5" },
  "orfeofm": { r: "orfeo-fm" },
  "moodradio": { r: "mood-radio" },
  "estacion1009": { r: "100-9-estacion-del-sol" },
  "lanacion1049": { r: "la-nacion-104-9" },
  "radioone": { r: "radio-one-103-7" },
  "popular": { r: "radio-popular" }
  };

  // Búsqueda tolerante: sin importar mayúsculas ni espacios
  function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/\s+/g, ""); }
  var NORM = {};
  Object.keys(MAP).forEach(function (k) { NORM[norm(k)] = MAP[k]; });

  function entryFor(x) {
    var id = (x && typeof x === "object") ? x.id : x;
    return MAP[id] || NORM[norm(id)] || null;
  }

  // Lista de archivos posibles para una radio, en orden de preferencia
  function candidates(x) {
    var e = entryFor(x), out = [];
    if (!e) return out;
    if (e.w) out.push("logos/" + e.w + ".webp");
    if (e.r) {
      var ext = e.e || "jpg";
      SIZES.forEach(function (s) { out.push("radio_logos/" + e.r + "_" + s + "." + ext); });
    }
    if (e.f) out.push(e.f);
    return out;
  }

  function first(x) { var c = candidates(x); return c.length ? c[0] : ""; }

  // Atributos para poner en el <img>: dicen de qué radio es y cuál archivo se está probando
  function attrs(st) { return 'data-lid="' + encodeURIComponent(st.id) + '" data-li="0"'; }

  // Para el evento onerror de un <img>: prueba el siguiente archivo posible.
  // Si no queda ninguno, llama a giveUp(img); si no hay giveUp, saca la imagen.
  function fail(img, giveUp) {
    var c = candidates(decodeURIComponent(img.getAttribute("data-lid") || ""));
    var i = (parseInt(img.getAttribute("data-li"), 10) || 0) + 1;
    if (i < c.length) { img.setAttribute("data-li", String(i)); img.src = c[i]; return; }
    if (typeof giveUp === "function") giveUp(img);
    else if (img.parentNode) img.parentNode.removeChild(img);
  }

  global.RadioLogos = { candidates: candidates, first: first, attrs: attrs, fail: fail };
})(window);
