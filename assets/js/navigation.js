/**
 * Verdamt-Snipe — Navigation Logic
 * Dynamic Island, Fallback Mobile Navigation, Scroll Progress, Back to Top, Scroll Spy
 */

(function () {
  "use strict";

  var $ = (window.VS && window.VS.$) || function (q) { return document.querySelector(q); };
  var $$ = (window.VS && window.VS.$$) || function (q) { return Array.prototype.slice.call(document.querySelectorAll(q)); };
  var root = document.documentElement;

  /* ---------- Dynamic Island (Mobile & Tablet) ---------- */
  var island = $("#dynamic-island");
  var islandBackdrop = $("#island-backdrop");
  var islandCompact = $("#island-compact");
  var islandClose = $("#island-close-btn");

  function openIsland() {
    if (!island) return;
    island.classList.add("expanded");
    if (islandBackdrop) islandBackdrop.classList.add("active");
  }

  function closeIsland() {
    if (!island) return;
    island.classList.remove("expanded");
    if (islandBackdrop) islandBackdrop.classList.remove("active");
  }

  if (islandCompact) {
    islandCompact.addEventListener("click", openIsland);
  }

  if (islandClose) {
    islandClose.addEventListener("click", function (e) {
      e.stopPropagation();
      closeIsland();
    });
  }

  if (islandBackdrop) {
    islandBackdrop.addEventListener("click", closeIsland);
  }

  $$(".island-nav-item").forEach(function (a) {
    a.addEventListener("click", closeIsland);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && island && island.classList.contains("expanded")) {
      closeIsland();
    }
  });

  window.VS = window.VS || {};
  window.VS.openIsland = openIsland;
  window.VS.closeIsland = closeIsland;

  /* ---------- Desktop Mobile Menu Fallback ---------- */
  var menuBtn = $("#menu-btn");
  var navl = $("#nav-links");

  function setMenu(open) {
    if (!navl) return;
    navl.classList.toggle("open", open);
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "✕" : "☰";
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      if (navl) setMenu(!navl.classList.contains("open"));
    });
  }

  if (navl) {
    navl.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }

  /* ---------- Scroll Progress & Back-to-Top ---------- */
  var bar = $("#progress");
  var toTop = $("#to-top");

  function onScroll() {
    var max = root.scrollHeight - window.innerHeight;
    if (bar) {
      bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    }
    if (toTop) {
      toTop.classList.toggle("show", window.scrollY > 600);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Scroll-Spy (Sections <-> Nav Links) ---------- */
  if ("IntersectionObserver" in window) {
    var navLinks = $$(".navlinks a, .island-nav-item");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var sectionId = entry.target.id;
        navLinks.forEach(function (a) {
          var href = a.getAttribute("href");
          if (href === "#" + sectionId) {
            a.classList.add("active");
          } else if (href && href.startsWith("#")) {
            a.classList.remove("active");
          }
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    $$("main section[id]").forEach(function (sec) {
      spy.observe(sec);
    });
  }
})();
