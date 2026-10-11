/**
 * Verdamt-Snipe — Visual FX & Animations
 * Terminal Simulation Engine, Scroll Reveal Observer, Stat Counters, Confetti Generator, Lightbox Modal
 */

(function () {
  "use strict";

  var $ = (window.VS && window.VS.$) || function (q) { return document.querySelector(q); };
  var $$ = (window.VS && window.VS.$$) || function (q) { return Array.prototype.slice.call(document.querySelectorAll(q)); };

  /* ---------- Scroll Reveal & Stagger ---------- */
  if ("IntersectionObserver" in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    $$(".reveal, .stagger").forEach(function (el) {
      revealIO.observe(el);
    });
  }

  /* ---------- Animated Stat Counters ---------- */
  if ("IntersectionObserver" in window) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseInt(el.getAttribute("data-count"), 10);
        if (isNaN(target)) return;
        var duration = 1200;
        var start = null;

        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          el.textContent = Math.round(progress * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);
        counterIO.unobserve(el);
      });
    }, { threshold: 0.4 });

    $$("[data-count]").forEach(function (el) {
      counterIO.observe(el);
    });
  }

  /* ---------- Terminal Stream Engine (Full Pipeline + Cache Poisoning) ---------- */
  var termPre = $("#terminal-pre");
  var replayBtn = $("#replay");
  var pauseBtn = $("#term-pause");

  var fullStreamLines = [
    '<span class="dim">Verdamt-Snipe v1.4.5 — NEXUS Architecture</span>',
    '<span class="dim">target: example.com | engine: AsyncIO + Go bridge | TLS: Chrome 120 (JA3)</span>',
    '',
    '<span class="good">[recon]</span>      passive intel ............ 14 subdomains discovered',
    '<span class="good">[waf]</span>        origin hunter ............ <span class="warn">Cloudflare bypassed -> 93.184.216.34</span>',
    '<span class="good">[app]</span>        playwright crawl ......... 247 endpoints · 89 parameters mapped',
    '<span class="warn">[assault]</span>    differential latency ..... <span class="err">SQLi confirmed on /api/v1/search</span>',
    '<span class="good">[browser]</span>    headless chromium ........ <span class="err">DOM XSS sink execution confirmed</span>',
    '<span class="warn">[poison]</span>     unkeyed headers test ..... <span class="warn">\'X-Forwarded-Host\' reflected on /static/app.js</span>',
    '<span class="err">[poison]</span>     cache vulnerability ...... <span class="err">POISONED! Cached for 300s (HIT)</span>',
    '<span class="warn">[deception]</span>  path delimiter probe ..... Web Cache Deception on /user/settings.php.css',
    '',
    '<span class="dim">audit summary: 2 Critical · 5 High · 1 Informational</span>',
    '<span class="dim">deliverables: outputs/example.com/audit.jsonl & report.html</span>',
    '',
    '<span class="prompt">$</span> <span class="dim blink">_</span>'
  ];

  var cmdHeader = '<span class="prompt">$</span> python3 verd.py example.com --full\n\n';
  var allTerminalLines = (cmdHeader + fullStreamLines.join("\n")).split("\n");

  var streamTimer = null;
  var currentLineIdx = 0;
  var isPaused = false;
  var isRunning = false;
  var userScrolledUp = false;

  // Track user manual scroll inside terminal to avoid disrupting reading
  if (termPre) {
    termPre.addEventListener("scroll", function () {
      var distanceToBottom = termPre.scrollHeight - termPre.scrollTop - termPre.clientHeight;
      userScrolledUp = distanceToBottom > 24;
    });
  }

  function updatePauseBtnUI() {
    if (!pauseBtn) return;
    if (isPaused) {
      pauseBtn.textContent = "▶";
      pauseBtn.setAttribute("aria-label", "Resume terminal simulation");
      pauseBtn.title = "Resume simulation";
    } else {
      pauseBtn.textContent = "⏸";
      pauseBtn.setAttribute("aria-label", "Pause terminal simulation");
      pauseBtn.title = "Pause simulation";
    }
  }

  function renderTerminalStep() {
    if (!termPre || isPaused) return;

    currentLineIdx++;
    termPre.innerHTML = allTerminalLines.slice(0, currentLineIdx).join("\n");

    // Scroll internally downward without ever scrolling the outer page
    if (!userScrolledUp) {
      termPre.scrollTop = termPre.scrollHeight;
    }

    if (currentLineIdx < allTerminalLines.length) {
      var delay = currentLineIdx === 1 ? 240 : (currentLineIdx === 2 ? 140 : 45);
      streamTimer = setTimeout(renderTerminalStep, delay);
    } else {
      isRunning = false;
      if (pauseBtn) {
        pauseBtn.textContent = "▶";
        pauseBtn.setAttribute("aria-label", "Restart terminal simulation");
        pauseBtn.title = "Restart simulation";
      }
    }
  }

  function startTerminalStream(fromBeginning) {
    if (!termPre) return;

    // Clear any existing timer to avoid overlapping streams
    if (streamTimer) {
      clearTimeout(streamTimer);
      streamTimer = null;
    }

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      termPre.innerHTML = allTerminalLines.join("\n");
      termPre.scrollTop = termPre.scrollHeight;
      isRunning = false;
      isPaused = false;
      updatePauseBtnUI();
      return;
    }

    if (fromBeginning) {
      currentLineIdx = 0;
      userScrolledUp = false;
      termPre.scrollTop = 0;
      termPre.innerHTML = "";
    }

    isRunning = true;
    isPaused = false;
    updatePauseBtnUI();
    renderTerminalStep();
  }

  function togglePauseTerminal() {
    if (!isRunning && currentLineIdx >= allTerminalLines.length) {
      startTerminalStream(true);
      return;
    }
    if (isPaused) {
      isPaused = false;
      updatePauseBtnUI();
      renderTerminalStep();
    } else {
      isPaused = true;
      if (streamTimer) {
        clearTimeout(streamTimer);
        streamTimer = null;
      }
      updatePauseBtnUI();
    }
  }

  if (replayBtn) {
    replayBtn.addEventListener("click", function () {
      startTerminalStream(true);
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", function () {
      togglePauseTerminal();
    });
  }

  var played = false;
  if ("IntersectionObserver" in window) {
    var tio = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting && !played) {
        played = true;
        startTerminalStream(true);
        tio.disconnect();
      }
    }, { threshold: 0.25 });

    var tCont = $("#terminal-container") || $(".terminal");
    if (tCont) tio.observe(tCont);
  } else {
    startTerminalStream(false);
  }

  /* ---------- Screenshot Lightbox Modal ---------- */
  var lbModal = $("#lightbox-modal");
  var lbImg = $("#lightbox-img");
  var lbCaption = $("#lightbox-caption");
  var lbClose = $("#lightbox-close");

  function openLightbox(src, caption) {
    if (!lbModal || !lbImg) return;
    lbImg.src = src;
    if (lbCaption) lbCaption.textContent = caption || "";
    lbModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lbModal) return;
    lbModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  $$(".screenshot-box").forEach(function (box) {
    box.addEventListener("click", function () {
      var zoomSrc = box.getAttribute("data-zoom") || (box.querySelector("img") ? box.querySelector("img").src : "");
      var cap = box.getAttribute("data-caption") || "";
      openLightbox(zoomSrc, cap);
    });
  });

  if (lbClose) {
    lbClose.addEventListener("click", closeLightbox);
  }

  if (lbModal) {
    lbModal.addEventListener("click", function (e) {
      if (e.target === lbModal) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lbModal && lbModal.classList.contains("active")) {
      closeLightbox();
    }
  });

  /* ---------- Emerald & Metallic Gold Confetti Generator ---------- */
  function fireConfetti() {
    var container = document.createElement("div");
    container.className = "confetti-container";
    document.body.appendChild(container);

    // Dark Emerald Neon, Metallic Gold, Champagne Gold, Borders, Muted
    var colors = ["#00D68F", "#D4AF37", "#FFF1A8", "#304137", "#A5ACA8"];

    for (var i = 0; i < 55; i++) {
      var piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 1.8 + "s";
      piece.style.animationDuration = (2 + Math.random() * 2) + "s";
      container.appendChild(piece);
    }

    setTimeout(function () {
      container.remove();
    }, 5200);
  }

  window.VS = window.VS || {};
  window.VS.fireConfetti = fireConfetti;
  window.VS.startTerminalStream = startTerminalStream;
  window.VS.runTerminalSimulation = startTerminalStream;
  window.VS.togglePauseTerminal = togglePauseTerminal;
  window.VS.openLightbox = openLightbox;
  window.VS.closeLightbox = closeLightbox;
})();
