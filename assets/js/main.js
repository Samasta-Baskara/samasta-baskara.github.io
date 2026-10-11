/**
 * Verdamt-Snipe — Main Application Logic
 * Modular Core: Helpers, i18n Dictionary, Theme Switcher, Copy Handlers, Checklist
 */

(function () {
  "use strict";

  // Establish global namespace
  window.VS = window.VS || {};

  var $ = function (q) { return document.querySelector(q); };
  var $$ = function (q) { return Array.prototype.slice.call(document.querySelectorAll(q)); };

  window.VS.$ = $;
  window.VS.$$ = $$;

  var yearEl = $("#year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- i18n Dictionary ---------- */
  var DICT = {
    en: {
      "ui.skip": "Skip to content",
      "nav.features": "Features", "nav.architecture": "Architecture", "nav.workflow": "Workflow",
      "nav.attack": "Attack Surface", "nav.showcase": "Showcase", "nav.benchmarks": "Benchmarks",
      "nav.installation": "Installation", "nav.faq": "FAQ", "nav.about": "About", "nav.cta": "View on GitHub",
      "island.subtitle": "Interactive Security Suite",
      "hero.eyebrow": "Open source · Python AsyncIO + Go",
      "hero.title": "A clearer way to explore web security.",
      "hero.lead": "Verdamt-Snipe is an async-first reconnaissance and vulnerability assessment framework: a Python AsyncIO engine paired with a Go native bridge, TLS fingerprint impersonation, and a Playwright suite that verifies findings in a real browser.",
      "hero.cta1": "Explore repository", "hero.cta2": "Read documentation",
      "hero.byline1": "A personal project by", "hero.byline2": ", built and maintained in the open.",
      "terminal.label": "terminal preview",
      "terminal.note": "Live terminal simulation: Full Pipeline + Web Cache Poisoning & Deception against example.com.",
      "stats.modes": "Scan Modes",
      "stats.playwright": "Playwright Modules",
      "stats.layers": "Arch Layers",
      "stats.checks": "Vuln Checks",
      "stats.gotools": "Go Binaries",
      "features.eyebrow": "Under the hood", "features.title": "Six pieces, one pipeline.",
      "features.intro": "What actually powers a scan, from the network layer to browser-based verification.",
      "features.f1.title": "Async network engine",
      "features.f1.desc": "Python AsyncIO plus HTTP/2 via httpx, with host rate-limiting and a circuit breaker for thousands of concurrent requests.",
      "features.f2.title": "TLS impersonation",
      "features.f2.desc": "JA3/JA4 fingerprint spoofing via curl_cffi, so traffic presents as a real browser to anti-bot defenses and WAFs.",
      "features.f3.title": "Go native bridge",
      "features.f3.desc": "Hands fuzzing straight to Go binaries — subfinder, httpx, katana, nuclei, dalfox, gau — for native throughput.",
      "features.f4.title": "Playwright verification",
      "features.f4.desc": "Ten browser-based modules confirm findings live: DOM XSS, CSRF, postMessage leaks, clickjacking, and more.",
      "features.f5.title": "Tactical TUI dashboard",
      "features.f5.desc": "A three-column terminal view refreshed at 15 FPS: pipeline stage, request-rate sparkline, and finding severity.",
      "features.f6.title": "Policy & audit engine",
      "features.f6.desc": "Scope locks, request budgets, and a replayable .jsonl audit log that reconstructs every request as curl.",
      "features.f7.title": "State management",
      "features.f7.desc": "Multi-token session handling (Bearer/Cookie jar) and save/resume scan checkpoints via .state files.",
      "arch.eyebrow": "System design",
      "arch.title": "Four-layer modular architecture.",
      "arch.intro": "A deterministic pipeline from CLI entry to verified findings, with cross-cutting policy enforcement.",
      "arch.l1.title": "Entry Points & CLI",
      "arch.l1.desc": "Fast argument parsing, interactive terminal menu, and scope guard enforcement.",
      "arch.l2.title": "Core Engine & Runtime",
      "arch.l2.desc": "High-concurrency AsyncIO event loop coordinated with native compiled Go binaries and headless Chromium pools.",
      "arch.l3.title": "Security Modules Suite",
      "arch.l3.desc": "Cross-layer vulnerability checks verifying injection vectors, cache poisoning, and client-side flaws.",
      "arch.l4.title": "Output & State",
      "arch.l4.desc": "Immutable JSONL audit trail, executive deliverables, and pause-and-resume scan state.",
      "workflow.eyebrow": "A practical pipeline",
      "workflow.title": "Recon, then app analysis, then assault.",
      "workflow.p": "Verdamt-Snipe runs seven scan modes on top of one pipeline, from passive intelligence gathering to a full vulnerability assault. The repository README is the source of truth for current flags and behavior.",
      "workflow.l1": "Start with --dry-run to validate payloads without sending traffic.",
      "workflow.l2": "Use --passive to restrict requests to GET, HEAD, and OPTIONS.",
      "workflow.l3": "Review the .jsonl audit log, replayable as curl for reporting.",
      "workflow.codeTitle": "Usage examples",
      "attack.eyebrow": "Coverage",
      "attack.title": "What it finds.",
      "attack.intro": "Vulnerability categories tested across client-side, server-side, and infrastructure layers.",
      "attack.c1.title": "Injections & Server-Side",
      "attack.c1.desc": "Automated differential latency testing, out-of-band callback listeners, and server-side request forgery verification.",
      "attack.c2.title": "Web Cache & HTTP Desync",
      "attack.c2.desc": "Unkeyed header reflection probes, Web Cache Deception path delimiters, and CL-TE request smuggling desynchronization.",
      "attack.c3.title": "Client-Side & DOM Sinks",
      "attack.c3.desc": "Live browser verification inside headless Chromium sandbox targeting execution sinks like eval(), innerHTML, and postMessage.",
      "attack.c4.title": "Infra & WAF Origin Hunter",
      "attack.c4.desc": "Uncovers actual origin server IP behind Cloudflare/Akamai CDNs, TLS fingerprint impersonation, and comprehensive subdomain intelligence.",
      "bench.eyebrow": "Performance",
      "bench.title": "Built for speed and stability.",
      "bench.b1.title": "Dual-Engine Throughput",
      "bench.b1.desc": "AsyncIO Python + Go native binaries working in parallel for maximum scan speed.",
      "bench.b2.title": "15 FPS Live Dashboard",
      "bench.b2.desc": "Real-time tactical TUI with sparkline RPS, pipeline status, and hardware metrics.",
      "bench.b3.title": "Zero Memory Leak",
      "bench.b3.desc": "SharedBrowserPool singleton with isolated contexts prevents Playwright memory bloat.",
      "bench.b4.title": "HTTP/2 Multiplexing",
      "bench.b4.desc": "Concurrent streams over a single TCP connection via httpx for efficient network usage.",
      "showcase.eyebrow": "Visual proof & live demos",
      "showcase.title": "Tactical TUI & interactive audit reports.",
      "showcase.intro": "Authentic captures from Verdamt-Snipe v1.4.5 NEXUS: real-time terminal surveillance and executive vulnerability deliverables.",
      "showcase.tuiBadge": "Terminal UI",
      "showcase.htmlBadge": "Deliverable",
      "showcase.zoomPrompt": "Tap / Click to view full resolution",
      "showcase.c1.title": "Tactical Rich TUI Live Console",
      "showcase.c1.desc": "Three-column surveillance console rendered at 15 FPS. Tracks pipeline phase progression, active socket pools, CPU/RAM utilization, and real-time finding telemetry without terminal flickering.",
      "showcase.c2.title": "Executive HTML Vulnerability Report",
      "showcase.c2.desc": "Single-file zero-dependency HTML & PDF deliverable. Includes interactive severity filters (Critical, High, Medium, Low), automated CVSS v3.1 scoring, and replayable curl commands for instant triage.",
      "chart.title": "Vulnerability Assessment Severity Distribution",
      "chart.subtitle": "Aggregated findings verified via AsyncVulnEngine & Playwright Chromium Singleton Pool",
      "chart.crit": "Critical (9.0 - 10.0)",
      "chart.high": "High (7.0 - 8.9)",
      "chart.med": "Medium (4.0 - 6.9)",
      "chart.low": "Low (0.1 - 3.9)",
      "chart.info": "Info / Recon",
      "install.eyebrow": "Getting started", "install.title": "Three steps to a working install.",
      "install.intro": "Requires Linux or macOS, Python 3.12+, and 2 GB+ of memory. Commands below match the current README.",
      "install.s1.title": "Clone the project", "install.s1.desc": "Get the source from GitHub using one of the methods above.",
      "install.s2.title": "Set up a virtual environment", "install.s2.lead": "Install dependencies inside an isolated environment:",
      "install.s3.title": "Install the Playwright driver", "install.s3.lead": "Required for the browser-based verification modules:",
      "install.notice": "Use Verdamt-Snipe only on systems you own or have explicit authorization to test — a bug bounty program or a signed penetration-testing agreement. Always stay within scope.",
      "faq.eyebrow": "Questions", "faq.title": "Quick answers.",
      "faq.q1": "Who builds Verdamt-Snipe?", "faq.a1": "It's a personal project by Samasta Baskara, developed and shared openly on GitHub.",
      "faq.q2": "What does a scan actually do?", "faq.a2": "It runs one of seven modes — from passive recon to a full vulnerability assault — combining an async Python engine, a Go native bridge, and Playwright-based verification in a real browser.",
      "faq.q3": "Which systems may I scan?", "faq.a3": "Only systems you own or are explicitly authorized to test. Validate every finding manually before treating it as confirmed.",
      "faq.q4": "Where are the current flags and options?", "faq.a4": "In the project README — the terminal preview on this page is illustrative only.",
      "about.eyebrow": "Explore the project", "about.title": "Built in the open.",
      "about.p1": "Verdamt-Snipe is a personal project by",
      "about.p2": ", developed as an async-first security framework and shared as open source. Visit the repository for source, releases, and updates.",
      "about.cta": "View Verdamt-Snipe",
      "footer.byline": "a personal project by", "footer.docs": "Documentation", "footer.license": "License",
      "ui.copy": "Copy command", "ui.copyAll": "Copy all", "ui.copied": "Copied", "ui.copyFailed": "Copy failed",
      "ui.meterStart": "Tap a step to mark it done · 0 of 3", "ui.meterDone": "All steps done. Open the README to continue."
    },
    id: {
      "ui.skip": "Lewati ke konten",
      "nav.features": "Fitur", "nav.architecture": "Arsitektur", "nav.workflow": "Alur Kerja",
      "nav.attack": "Cakupan Serangan", "nav.showcase": "Hasil & Dasbor", "nav.benchmarks": "Benchmark",
      "nav.installation": "Instalasi", "nav.faq": "FAQ", "nav.about": "Tentang", "nav.cta": "Lihat di GitHub",
      "island.subtitle": "Suite Keamanan Taktis",
      "hero.eyebrow": "Sumber terbuka · Python AsyncIO + Go",
      "hero.title": "Cara yang lebih jernih untuk menjelajahi keamanan web.",
      "hero.lead": "Verdamt-Snipe adalah framework rekognisi dan asesmen kerentanan berbasis async: mesin Python AsyncIO yang dipadukan dengan Go native bridge, TLS fingerprint impersonation, dan Playwright suite yang memverifikasi temuan langsung di browser.",
      "hero.cta1": "Jelajahi repository", "hero.cta2": "Baca dokumentasi",
      "hero.byline1": "Proyek pribadi oleh", "hero.byline2": ", dibangun dan dirawat secara terbuka.",
      "terminal.label": "pratinjau terminal",
      "terminal.note": "Simulasi terminal langsung: Full Pipeline + Web Cache Poisoning & Deception terhadap example.com.",
      "stats.modes": "Mode Scan",
      "stats.playwright": "Modul Playwright",
      "stats.layers": "Lapisan Arsitektur",
      "stats.checks": "Cek Kerentanan",
      "stats.gotools": "Binary Go",
      "features.eyebrow": "Di balik layar", "features.title": "Enam komponen, satu alur kerja.",
      "features.intro": "Yang benar-benar menjalankan sebuah scan, dari lapisan jaringan hingga verifikasi berbasis browser.",
      "features.f1.title": "Mesin jaringan async",
      "features.f1.desc": "Python AsyncIO ditambah HTTP/2 lewat httpx, dengan rate-limiting per host dan circuit breaker untuk ribuan request bersamaan.",
      "features.f2.title": "TLS impersonation",
      "features.f2.desc": "Spoofing fingerprint JA3/JA4 lewat curl_cffi, sehingga traffic tampil seperti browser asli di hadapan WAF dan proteksi anti-bot.",
      "features.f3.title": "Go native bridge",
      "features.f3.desc": "Meneruskan fuzzing langsung ke binary Go — subfinder, httpx, katana, nuclei, dalfox, gau — untuk throughput native.",
      "features.f4.title": "Verifikasi Playwright",
      "features.f4.desc": "Sepuluh modul berbasis browser memverifikasi temuan secara langsung: DOM XSS, CSRF, kebocoran postMessage, clickjacking, dan lainnya.",
      "features.f5.title": "Dasbor TUI taktis",
      "features.f5.desc": "Tampilan terminal tiga kolom yang diperbarui 15 FPS: tahap pipeline, grafik kecepatan request, dan tingkat keparahan temuan.",
      "features.f6.title": "Mesin policy & audit",
      "features.f6.desc": "Penguncian scope, budget request, dan log audit .jsonl yang bisa direplay ulang menjadi perintah curl.",
      "features.f7.title": "Manajemen state",
      "features.f7.desc": "Pengelolaan multi-token sesi (Bearer/Cookie jar) dan mekanisme save/resume checkpoint pemindaian via file .state.",
      "arch.eyebrow": "Desain sistem",
      "arch.title": "Arsitektur modular empat lapisan.",
      "arch.intro": "Pipeline deterministik dari entri CLI hingga temuan terverifikasi, dengan penegakan kebijakan lintas-lapisan.",
      "arch.l1.title": "Titik Masuk & CLI",
      "arch.l1.desc": "Parsing argumen cepat, menu terminal interaktif, dan penegakan scope guard.",
      "arch.l2.title": "Core Engine & Runtime",
      "arch.l2.desc": "Event loop AsyncIO konkurensi tinggi dikoordinasikan dengan binary Go native terkompilasi dan pool headless Chromium.",
      "arch.l3.title": "Suite Modul Keamanan",
      "arch.l3.desc": "Pemeriksaan kerentanan lintas-lapisan yang memverifikasi vektor injeksi, cache poisoning, dan celah sisi klien.",
      "arch.l4.title": "Output & State",
      "arch.l4.desc": "Jejak audit JSONL tidak dapat diubah, laporan eksekutif, dan checkpoint state yang dapat dijeda/dilanjutkan.",
      "workflow.eyebrow": "Alur kerja praktis",
      "workflow.title": "Recon, lalu analisis app, lalu assault.",
      "workflow.p": "Verdamt-Snipe menjalankan tujuh mode pemindaian di atas satu pipeline, dari pengumpulan intelijen pasif hingga vulnerability assault penuh. README repository adalah sumber kebenaran untuk flag dan perilaku terkini.",
      "workflow.l1": "Mulai dengan --dry-run untuk memvalidasi payload tanpa mengirim traffic.",
      "workflow.l2": "Gunakan --passive untuk membatasi request hanya pada GET, HEAD, dan OPTIONS.",
      "workflow.l3": "Tinjau log audit .jsonl, yang bisa direplay sebagai curl untuk pelaporan.",
      "workflow.codeTitle": "Contoh pemakaian",
      "attack.eyebrow": "Cakupan",
      "attack.title": "Apa yang ditemukan.",
      "attack.intro": "Kategori kerentanan yang diuji di sisi klien, server, dan infrastruktur.",
      "attack.c1.title": "Injeksi & Sisi Server",
      "attack.c1.desc": "Pengujian latensi diferensial otomatis, pendengar panggilan balik out-of-band, dan verifikasi server-side request forgery.",
      "attack.c2.title": "Web Cache & HTTP Desync",
      "attack.c2.desc": "Pemeriksaan refleksi header unkeyed, pembatas path Web Cache Deception, dan desinkronisasi penyelundupan request CL-TE.",
      "attack.c3.title": "Sisi Klien & Sink DOM",
      "attack.c3.desc": "Verifikasi browser langsung di sandbox Chromium headless untuk sink eksekusi seperti eval(), innerHTML, dan postMessage.",
      "attack.c4.title": "Infra & WAF Origin Hunter",
      "attack.c4.desc": "Mengungkap IP server origin sebenarnya di balik CDN Cloudflare/Akamai, peniruan fingerprint TLS, dan intelijen subdomain komprehensif.",
      "bench.eyebrow": "Performa",
      "bench.title": "Dibangun untuk kecepatan dan stabilitas.",
      "bench.b1.title": "Throughput Dual-Engine",
      "bench.b1.desc": "AsyncIO Python + binary Go native bekerja paralel untuk kecepatan scan maksimum.",
      "bench.b2.title": "Dasbor Live 15 FPS",
      "bench.b2.desc": "TUI taktis real-time dengan sparkline RPS, status pipeline, dan metrik hardware.",
      "bench.b3.title": "Zero Memory Leak",
      "bench.b3.desc": "SharedBrowserPool singleton dengan konteks terisolasi mencegah bloat memori Playwright.",
      "bench.b4.title": "HTTP/2 Multiplexing",
      "bench.b4.desc": "Stream bersamaan melalui satu koneksi TCP via httpx untuk efisiensi jaringan.",
      "showcase.eyebrow": "Bukti visual & demo langsung",
      "showcase.title": "Dasbor TUI taktis & laporan audit interaktif.",
      "showcase.intro": "Tangkapan layar otentik dari Verdamt-Snipe v1.4.5 NEXUS: pemantauan terminal real-time dan deliverable asesmen kerentanan.",
      "showcase.tuiBadge": "Konsol TUI",
      "showcase.htmlBadge": "Deliverable",
      "showcase.zoomPrompt": "Ketuk / Klik untuk memperbesar resolusi",
      "showcase.c1.title": "Konsol Live TUI Taktis (15 FPS)",
      "showcase.c1.desc": "Konsol dasbor 3-kolom 15 FPS: status fase pipeline, metrik CPU/RAM, sparkline RPS, dan pemantauan temuan secara real-time tanpa flickering.",
      "showcase.c2.title": "Laporan Keamanan HTML Interaktif",
      "showcase.c2.desc": "Laporan mandiri HTML & PDF tanpa dependensi eksternal. Dilengkapi tab filter keparahan OWASP, kalkulasi CVSS v3.1, dan snippet cURL untuk reproduksi temuan seketika.",
      "chart.title": "Distribusi Tingkat Keparahan Temuan",
      "chart.subtitle": "Ringkasan temuan terverifikasi via AsyncVulnEngine & Singleton Browser Pool Playwright",
      "chart.crit": "Kritis (9.0 - 10.0)",
      "chart.high": "Tinggi (7.0 - 8.9)",
      "chart.med": "Sedang (4.0 - 6.9)",
      "chart.low": "Rendah (0.1 - 3.9)",
      "chart.info": "Info / Pengintaian",
      "install.eyebrow": "Mulai di sini", "install.title": "Tiga langkah untuk instalasi yang siap pakai.",
      "install.intro": "Membutuhkan Linux atau macOS, Python 3.12+, dan memori 2 GB+. Perintah di bawah mengikuti README terkini.",
      "install.s1.title": "Clone proyek", "install.s1.desc": "Ambil source code dari GitHub lewat salah satu cara di atas.",
      "install.s2.title": "Siapkan virtual environment", "install.s2.lead": "Install dependensi di dalam environment terisolasi:",
      "install.s3.title": "Install driver Playwright", "install.s3.lead": "Diperlukan untuk modul verifikasi berbasis browser:",
      "install.notice": "Gunakan Verdamt-Snipe hanya pada sistem yang Anda miliki atau telah mendapat izin resmi untuk diuji — program bug bounty atau perjanjian pentest tertulis. Selalu patuhi batas scope.",
      "faq.eyebrow": "Pertanyaan", "faq.title": "Jawaban singkat.",
      "faq.q1": "Siapa yang membuat Verdamt-Snipe?", "faq.a1": "Ini adalah proyek pribadi Samasta Baskara, dikembangkan dan dibagikan secara terbuka di GitHub.",
      "faq.q2": "Apa yang sebenarnya dilakukan saat scan?", "faq.a2": "Menjalankan salah satu dari tujuh mode — dari recon pasif hingga vulnerability assault penuh — menggabungkan mesin Python async, Go native bridge, dan verifikasi berbasis Playwright di browser sungguhan.",
      "faq.q3": "Sistem mana saja yang boleh saya scan?", "faq.a3": "Hanya sistem yang Anda miliki atau yang secara eksplisit mengizinkan pengujian. Validasi setiap temuan secara manual sebelum dianggap terkonfirmasi.",
      "faq.q4": "Di mana flag dan opsi terkini?", "faq.a4": "Di README proyek — pratinjau terminal di halaman ini hanya ilustrasi.",
      "about.eyebrow": "Jelajahi proyek", "about.title": "Dibangun secara terbuka.",
      "about.p1": "Verdamt-Snipe adalah proyek pribadi",
      "about.p2": ", dikembangkan sebagai framework keamanan berbasis async dan dibagikan sebagai open source. Kunjungi repository untuk source code, rilis, dan pembaruan.",
      "about.cta": "Lihat Verdamt-Snipe",
      "footer.byline": "proyek pribadi", "footer.docs": "Dokumentasi", "footer.license": "Lisensi",
      "ui.copy": "Salin perintah", "ui.copyAll": "Salin semua", "ui.copied": "Tersalin", "ui.copyFailed": "Gagal menyalin",
      "ui.meterStart": "Ketuk langkah untuk menandainya selesai · 0 dari 3", "ui.meterDone": "Semua langkah selesai. Buka README untuk melanjutkan."
    }
  };

  window.VS.DICT = DICT;

  /* ---------- Language Management ---------- */
  var lang = (function () {
    try {
      return localStorage.getItem("vs-lang") || "en";
    } catch (e) {
      return "en";
    }
  })();
  window.VS.lang = lang;

  var langBtn = $("#lang-toggle"),
      islandLangBtn = $("#island-lang-btn");

  function translate(l) {
    lang = l;
    window.VS.lang = l;
    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var v = DICT[l] && DICT[l][key];
      if (v != null) {
        el.textContent = v;
      }
    });

    if (langBtn) {
      langBtn.textContent = l === "en" ? "ID" : "EN";
      langBtn.setAttribute("aria-label", "Switch language to " + (l === "en" ? "Indonesian" : "English"));
    }

    if (islandLangBtn) {
      islandLangBtn.textContent = l === "en" ? "ID (Bahasa)" : "EN (English)";
    }

    document.documentElement.lang = l;
    refreshMeter();
  }

  function toggleLang() {
    var next = lang === "en" ? "id" : "en";
    translate(next);
    try {
      localStorage.setItem("vs-lang", next);
    } catch (e) {}
  }

  if (langBtn) langBtn.addEventListener("click", toggleLang);
  if (islandLangBtn) islandLangBtn.addEventListener("click", toggleLang);

  window.VS.translate = translate;
  window.VS.toggleLang = toggleLang;

  /* ---------- Theme Management ---------- */
  var root = document.documentElement;
  var tbtn = $("#theme-toggle");
  var islandThemeBtn = $("#island-theme-btn");
  var meta = $('meta[name="theme-color"]');

  function applyTheme(t) {
    root.dataset.theme = t;
    window.VS.theme = t;
    if (tbtn) {
      tbtn.textContent = t === "dark" ? "☀" : "☾";
      tbtn.setAttribute("aria-label", "Switch to " + (t === "dark" ? "light" : "dark") + " theme");
    }
    if (islandThemeBtn) {
      islandThemeBtn.textContent = t === "dark" ? "☀ Light" : "☾ Dark";
    }
    if (meta) {
      meta.content = t === "dark" ? "#080B0A" : "#F4F6F4";
    }
  }

  applyTheme(root.dataset.theme || "dark");

  function toggleTheme() {
    var n = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(n);
    try {
      localStorage.setItem("vs-theme", n);
    } catch (e) {}
  }

  if (tbtn) tbtn.addEventListener("click", toggleTheme);
  if (islandThemeBtn) islandThemeBtn.addEventListener("click", toggleTheme);

  window.VS.applyTheme = applyTheme;
  window.VS.toggleTheme = toggleTheme;

  /* ---------- Copy to Clipboard ---------- */
  function copyText(v) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(v).then(function () {
        return true;
      }).catch(function () {
        return fallbackCopy(v);
      });
    }
    return Promise.resolve(fallbackCopy(v));
  }

  function fallbackCopy(v) {
    var t = document.createElement("textarea");
    t.value = v;
    t.style.cssText = "position:fixed;opacity:0;pointer-events:none;";
    document.body.appendChild(t);
    t.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {}
    t.remove();
    return ok;
  }

  window.VS.copyText = copyText;

  $$("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var idle = b.textContent;
      copyText(b.getAttribute("data-copy")).then(function (ok) {
        b.textContent = ok ? DICT[lang]["ui.copied"] : DICT[lang]["ui.copyFailed"];
        setTimeout(function () {
          b.textContent = idle;
        }, 1500);
      });
    });
  });

  /* ---------- Clone Method Tabs ---------- */
  var cloneCmd = $("#clone-cmd");
  var cloneCopy = $("#copy-clone");
  $$(".tabs button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".tabs button").forEach(function (x) {
        x.setAttribute("aria-pressed", String(x === b));
      });
      if (cloneCmd) cloneCmd.textContent = b.dataset.cmd;
      if (cloneCopy) cloneCopy.setAttribute("data-copy", b.dataset.cmd);
    });
  });

  /* ---------- Setup Checklist Meter ---------- */
  var steps = $$(".step");
  var mbar = $("#meter-bar");
  var mtext = $("#meter-text");

  function refreshMeter() {
    if (!steps.length) return;
    var d = steps.filter(function (x) { return x.classList.contains("done"); }).length;
    if (mbar) {
      mbar.style.width = (d / steps.length * 100) + "%";
    }
    if (mtext && DICT[lang]) {
      mtext.textContent = d === steps.length
        ? DICT[lang]["ui.meterDone"]
        : DICT[lang]["ui.meterStart"].replace(/[\d]+ (of|dari) \d/, d + (lang === "en" ? " of " : " dari ") + steps.length);
    }
    if (d === steps.length) {
      if (typeof window.VS.fireConfetti === "function") {
        window.VS.fireConfetti();
      }
    }
  }

  window.VS.refreshMeter = refreshMeter;

  steps.forEach(function (st, idx) {
    var num = st.querySelector(".step-num");
    st.tabIndex = 0;
    st.setAttribute("role", "checkbox");
    st.setAttribute("aria-checked", "false");

    function toggle() {
      var on = st.classList.toggle("done");
      st.setAttribute("aria-checked", String(on));
      if (num) num.textContent = on ? "✓" : String(idx + 1);
      refreshMeter();
    }

    st.addEventListener("click", toggle);
    st.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Initial translation call
  translate(lang);
})();
