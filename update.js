/* ============================================================
   Actualizaciones de la app (celular + PC)

   Cómo funciona:
   1) El navegador baja sw.js y lo compara con el que ya tiene.
      Si cambió (por ejemplo, de radio-ar-v37 a radio-ar-v38),
      instala la versión nueva en segundo plano y la deja "esperando".
   2) Cuando hay una versión esperando, los botones con
      data-update-btn se ponen rojos y dicen "Nueva actualización".
   3) Al tocarlos, se activa la versión nueva y la página se recarga sola.

   Atributos que entiende esta página:
     data-update-btn      botón: si hay versión nueva la instala; si no, busca una
     data-update-text     texto del botón (lo cambia este script)
     data-update-normal   texto del botón cuando no hay novedades
     data-update-show     se ve solo cuando hay una versión nueva
     data-update-hide     se esconde cuando hay una versión nueva
     data-update-version  acá se escribe la versión instalada
   ============================================================ */
(function () {
  "use strict";
  if (!("serviceWorker" in navigator)) return;

  var TXT_NORMAL = "Actualización";
  var TXT_NUEVA = "Nueva actualización";
  var TXT_BUSCANDO = "Buscando…";
  var TXT_APLICANDO = "Actualizando…";
  var TXT_AL_DIA = "Estás al día";
  var TXT_ERROR = "Sin conexión";

  var reg = null;         // registro del service worker
  var waiting = null;     // versión nueva, lista y esperando
  var busy = false;       // buscando novedades
  var applying = false;   // aplicando la versión nueva
  var reloaded = false;
  var flash = "";         // mensaje corto ("Estás al día")
  var flashKind = "";     // tipo del mensaje corto: "uptodate" o "error"
  var lastState = "";     // último estado avisado a la página
  var flashTimer = 0;
  var version = "";
  var lastCheck = 0;

  /* ---------- Pintar los botones ---------- */
  function render() {
    var pending = !!waiting;
    var state = applying ? "applying" : pending ? "pending" : busy ? "busy" : (flash ? flashKind : "") || "idle";
    var all = document.querySelectorAll("[data-update-btn]");
    for (var i = 0; i < all.length; i++) {
      var b = all[i];
      var normal = b.getAttribute("data-update-normal") || TXT_NORMAL;
      var label = applying ? TXT_APLICANDO
        : pending ? TXT_NUEVA
        : busy ? TXT_BUSCANDO
        : flash || normal;
      // Los botones con data-update-manual escuchan el evento "radio-update" y se rotulan solos
      // (así pueden cambiar de idioma y usar textos cortos).
      var manual = b.hasAttribute("data-update-manual");
      if (!manual) {
        b.classList.toggle("has-update", pending);
        b.classList.toggle("is-busy", busy || applying);
        b.setAttribute("aria-label", pending ? "Nueva actualización disponible. Tocá para actualizar." : label);
        var t = b.querySelector("[data-update-text]");
        if (t && t.textContent !== label) t.textContent = label;
      }
    }
    each("[data-update-show]", function (el) { el.hidden = !pending; });
    each("[data-update-hide]", function (el) { el.hidden = pending; });
    each("[data-update-version]", function (el) {
      el.textContent = version ? "Versión instalada: " + version.replace(/^v/i, "") : "";
    });
    if (state !== lastState) {
      lastState = state;
      try { window.dispatchEvent(new CustomEvent("radio-update", { detail: { state: state } })); } catch (_) {}
    }
  }

  function each(sel, fn) {
    var list = document.querySelectorAll(sel);
    for (var i = 0; i < list.length; i++) fn(list[i]);
  }

  function say(msg, kind) {
    flash = msg;
    flashKind = kind || "";
    render();
    clearTimeout(flashTimer);
    flashTimer = setTimeout(function () { flash = ""; flashKind = ""; render(); }, 2800);
  }

  /* ---------- Versión nueva lista ---------- */
  function setWaiting(sw) {
    if (!sw || waiting === sw) return;
    waiting = sw;
    sw.addEventListener("statechange", function () {
      // Si llegó otra versión más nueva todavía, esta queda obsoleta
      if (sw.state === "redundant" && waiting === sw) { waiting = null; render(); }
    });
    render();
  }

  function hasController() { return !!navigator.serviceWorker.controller; }

  /* ---------- Aplicar la versión nueva ---------- */
  function apply() {
    if (!waiting || applying) return;
    applying = true;
    render();
    try { waiting.postMessage({ type: "SKIP_WAITING" }); } catch (_) {}
    // Por si el aviso de cambio no llega, se recarga igual
    setTimeout(reloadOnce, 4000);
  }

  function reloadOnce() {
    if (reloaded) return;
    reloaded = true;
    location.reload();
  }

  /* ---------- Buscar novedades ---------- */
  // Espera a que termine de instalarse la versión nueva, si es que hay una
  function settle() {
    return new Promise(function (resolve) {
      var sw = reg && reg.installing;
      if (!sw) return resolve();
      var timer = setTimeout(done, 20000);
      function done() {
        clearTimeout(timer);
        sw.removeEventListener("statechange", onState);
        resolve();
      }
      function onState() {
        if (sw.state === "installed" || sw.state === "activated" || sw.state === "redundant") done();
      }
      sw.addEventListener("statechange", onState);
      onState();
    });
  }

  function check(manual) {
    if (!reg || busy || applying) return Promise.resolve();
    lastCheck = Date.now();
    if (manual) { busy = true; flash = ""; render(); }
    return reg.update()
      .then(settle)
      .then(function () {
        if (reg.waiting && hasController()) setWaiting(reg.waiting);
        busy = false;
        if (manual && !waiting) say(TXT_AL_DIA, "uptodate"); else render();
      })
      .catch(function () {
        busy = false;
        if (manual) say(TXT_ERROR, "error"); else render();
      });
  }

  function quietCheck() {
    // Sin molestar: como mucho una vez por minuto
    if (Date.now() - lastCheck < 60000) return;
    check(false);
  }

  /* ---------- Toques ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("[data-update-btn]") : null;
    if (!b) return;
    e.preventDefault();
    if (waiting) apply(); else check(true);
  });

  /* ---------- Versión instalada ---------- */
  navigator.serviceWorker.addEventListener("message", function (e) {
    var d = e.data;
    if (d && d.type === "VERSION") {
      version = String(d.version || "").replace(/^radio-ar-/, "");
      render();
    }
  });

  function askVersion() {
    var c = navigator.serviceWorker.controller;
    if (c) c.postMessage({ type: "GET_VERSION" });
  }

  navigator.serviceWorker.addEventListener("controllerchange", function () {
    // Solo se recarga si la persona tocó el botón (la primera instalación no recarga)
    if (applying) reloadOnce(); else askVersion();
  });

  /* ---------- Registro ---------- */
  navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then(function (r) {
    reg = r;
    if (r.waiting && hasController()) setWaiting(r.waiting);
    r.addEventListener("updatefound", function () {
      var sw = r.installing;
      if (!sw) return;
      sw.addEventListener("statechange", function () {
        if (sw.state === "installed" && hasController()) setWaiting(sw);
      });
    });
    askVersion();
    quietCheck();
    // Revisar cada tanto y cada vez que se vuelve a la app
    setInterval(function () { if (!document.hidden) quietCheck(); }, 15 * 60 * 1000);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) quietCheck();
    });
  }).catch(function (err) {
    console.warn("SW registration failed:", err);
  });

  window.RadioUpdate = {
    render: render,
    check: function () { return check(true); },
    apply: apply,
    hasUpdate: function () { return !!waiting; }
  };

  render();
})();
