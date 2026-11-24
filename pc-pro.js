/* ============================================================
   Visor de frases (versión PC)
   - Lee frases.json (un array de strings; se puede editar sin tocar código).
   - Al cargar la página, muestra una frase apenas están listas.
   - Cada vez que se elige una emisora nueva, cambia a otra frase al azar
     y se queda fija hasta el próximo cambio.
   No toca pc.js: solo envuelve la función setCurrent() que ya existía.
   ============================================================ */
(function () {
  "use strict";

  var ORIGINAL_SET_CURRENT = window.setCurrent;
  if (typeof ORIGINAL_SET_CURRENT !== "function") return; // si pc.js cambia de nombre, no rompe nada

  var box = document.getElementById("phraseBox");
  var textEl = document.getElementById("phraseText");
  var phrases = [];
  var lastIndex = -1;
  var ready = false;

  function pick() {
    if (!textEl || !phrases.length) return;
    var i = phrases.length === 1 ? 0 : Math.floor(Math.random() * phrases.length);
    if (i === lastIndex && phrases.length > 1) i = (i + 1) % phrases.length;
    lastIndex = i;
    textEl.textContent = phrases[i];
    if (box) {
      box.classList.add("ready");
      box.classList.remove("phrase-in");
      void box.offsetWidth; // fuerza el reflow para poder repetir la animación
      box.classList.add("phrase-in");
    }
  }

  fetch("frases.json", { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (list) {
      if (Array.isArray(list) && list.length) phrases = list.filter(function (s) { return typeof s === "string" && s.trim(); });
      ready = true;
      pick(); // una frase ya al entrar, aunque todavía no se eligió emisora
    })
    .catch(function () { /* sin conexión al archivo: el visor queda vacío, no corta nada más */ });

  window.setCurrent = function (st) {
    ORIGINAL_SET_CURRENT(st);
    if (ready) pick();
  };
})();
