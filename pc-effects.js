/* Radio Argentina PC — control de efectos visuales */
(function () {
  "use strict";
  var button = document.getElementById("pcEffectsToggle");
  if (!button) return;

  var KEY = "radio-pc-effects";
  var enabled = true;
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "off") enabled = false;
  } catch (_) {}

  function paint() {
    document.body.classList.toggle("pc-effects-off", !enabled);
    button.setAttribute("aria-pressed", enabled ? "true" : "false");
    button.setAttribute("aria-label", enabled ? "Efectos visuales activados" : "Efectos visuales desactivados");
    button.title = enabled ? "Efectos visuales: activados" : "Efectos visuales: desactivados";
    var state = button.querySelector(".pc-effects-state");
    if (state) state.textContent = enabled ? "ON" : "OFF";
  }

  function syncEq() {
    /* Las barras son decorativas; apagar FX detiene también su intervalo. */
    if (typeof setEq === "function") {
      if (!enabled) setEq("idle");
      else if (typeof isPlaying !== "undefined" && isPlaying) setEq("live");
    }
  }

  button.addEventListener("click", function () {
    enabled = !enabled;
    try { localStorage.setItem(KEY, enabled ? "on" : "off"); } catch (_) {}
    paint();
    syncEq();
  });

  paint();
  syncEq();
  window.radioEffectsEnabled = enabled;
  /* setEq consulta esta bandera para no iniciar el ecualizador si FX está apagado. */
  Object.defineProperty(window, "radioEffectsEnabled", {
    configurable: true,
    get: function () { return enabled; },
    set: function (value) { enabled = value !== false; paint(); }
  });
})();
