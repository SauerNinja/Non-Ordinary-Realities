// =========================================================
// Non-Ordinary Realities — site behavior
// - GA4 tag + Consent Mode v2 defaults live in <head> (index.html).
//   This file only sends the consent UPDATE once the visitor
//   makes a choice in the cookie banner.
// - Minimal nav reveal on scroll
// - Consent banner logic (localStorage persisted choice)
// =========================================================

(function () {
  "use strict";

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  /* ---------------------------------------------------------
     Consent banner
     --------------------------------------------------------- */
  var STORAGE_KEY = "nor-consent";

  function applyConsent(choice) {
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: choice === "granted" ? "granted" : "denied",
    });
  }

  function initConsentBanner() {
    var banner = document.getElementById("consent-banner");
    if (!banner) return;

    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* storage unavailable — fall through, banner stays visible */
    }

    if (saved === "granted" || saved === "denied") {
      applyConsent(saved);
      banner.hidden = true;
      return;
    }

    banner.hidden = false;

    var acceptBtn = document.getElementById("consent-accept");
    var declineBtn = document.getElementById("consent-decline");

    function choose(choice) {
      try {
        localStorage.setItem(STORAGE_KEY, choice);
      } catch (e) {
        /* ignore */
      }
      applyConsent(choice);
      banner.hidden = true;
    }

    if (acceptBtn) acceptBtn.addEventListener("click", function () { choose("granted"); });
    if (declineBtn) declineBtn.addEventListener("click", function () { choose("denied"); });
  }

  /* ---------------------------------------------------------
     Nav reveal on scroll
     --------------------------------------------------------- */
  function initNav() {
    var nav = document.querySelector(".topnav");
    if (!nav) return;
    var lastY = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      if (y > window.innerHeight * 0.6) {
        nav.classList.add("is-visible");
      } else {
        nav.classList.remove("is-visible");
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    });
    update();
  }

  /* ---------------------------------------------------------
     Starfield — fixed canvas of twinkling stars behind the
     whole page. Density scales with viewport area. Falls back
     to a static (non-animated) field if the visitor prefers
     reduced motion.
     --------------------------------------------------------- */
  function initStarfield() {
    var canvas = document.getElementById("starfield");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var stars = [];
    var w, h, dpr;

    var STAR_COLORS = ["236,230,247", "244,203,126", "201,104,224"]; // lavender, gold, magenta

    function buildStars() {
      var area = w * h;
      var count = Math.min(320, Math.max(90, Math.round(area / 9000)));
      stars = [];
      for (var i = 0; i < count; i++) {
        var colorSet = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.3 + 0.25,
          baseAlpha: Math.random() * 0.5 + 0.35,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.006,
          color: colorSet,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    }

    function drawStatic() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + s.color + "," + s.baseAlpha + ")";
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    var t = 0;
    function tick() {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var twinkle = (Math.sin(t * s.speed + s.phase) + 1) / 2; // 0..1
        var alpha = s.baseAlpha * (0.5 + 0.5 * twinkle);
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + s.color + "," + alpha.toFixed(3) + ")";
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      window.requestAnimationFrame(tick);
    }

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        if (reduceMotion) drawStatic();
      }, 150);
    });

    resize();
    if (reduceMotion) {
      drawStatic();
    } else {
      window.requestAnimationFrame(tick);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initConsentBanner();
    initNav();
    initStarfield();
  });
})();
