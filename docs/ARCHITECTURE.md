# Verdamt-Snipe — Architecture & Technical Specifications

> High-performance reconnaissance and vulnerability assessment framework pairing Python AsyncIO, a compiled Go native bridge, JA3/JA4 TLS fingerprint impersonation, and Playwright Chromium headless verification.

---

## 1. System Overview

Verdamt-Snipe is engineered to eliminate the trade-off between discovery speed and signal reliability. It combines high-throughput asynchronous network probing with authentic browser-based sink confirmation.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           1. ENTRY POINTS & CLI                         │
│   Fast CLI parser · Interactive Terminal Menu · Strict Scope Guard      │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                        2. CORE ENGINE & RUNTIME                         │
│  Python AsyncIO Loop  │  Native Go Binary Bridge  │  Playwright Pool   │
│  (HTTP/2, rate limit) │  (subfinder, nuclei, gau) │  (DOM execution)   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                       3. SECURITY MODULES SUITE                         │
│  Differential Latency │  Web Cache Poisoning & Deception │  DOM Sinks   │
│  SSRF Out-of-band     │  WAF Origin Hunter (JA3/JA4)     │  CL-TE Desync│
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                          4. OUTPUT & STATE                              │
│  Replayable JSONL Audit Trail  │  Executive HTML Report  │  .state Save │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Four-Layer Modular Pipeline

### Layer 1: Entry Points & CLI
- **Argument Parsing & Validation**: Instant parameter validation with `--dry-run` and `--passive` modes.
- **Scope Guard**: Hard enforcement of target domain whitelist with regex IP boundaries to prevent out-of-scope requests.
- **Session Checkpoints**: State serialization (`.state` files) enabling seamless pause and resume for multi-hour assessments.

### Layer 2: Core Engine & Runtime
- **Python AsyncIO Engine**: Manages non-blocking concurrent coroutines with adaptive rate limiting and circuit breakers across targets.
- **Go Native Bridge**: Subprocesses out heavy-duty fuzzing tasks to compiled Go binaries (`subfinder`, `httpx`, `katana`, `nuclei`, `dalfox`, `gau`) for maximum throughput.
- **TLS Fingerprint Impersonation**: Uses `curl_cffi` to mimic Chrome 120 / Safari JA3 and JA4 TLS signatures, bypassing bot detection and WAF fingerprinting.
- **Playwright Headless Pool**: Singleton browser context pool preventing memory leaks during browser-driven DOM evaluation.

### Layer 3: Security Modules Suite
- **Injections & Server-Side**: Differential latency SQLi verification, command injection checks, and SSRF out-of-band callback listeners.
- **Web Cache & HTTP Desynchronization**: Tests unkeyed headers (`X-Forwarded-Host`, `X-Original-URL`), Web Cache Deception path delimiters, and CL-TE request smuggling desync.
- **Client-Side & DOM Sinks**: Validates live execution inside Chromium for sinks including `eval()`, `innerHTML`, `document.write`, and vulnerable `postMessage` listeners.
- **Infra & WAF Origin Hunter**: Bypasses Cloudflare and Akamai proxies to discover true backend IP addresses via SSL certificate history and DNS reconnaissance.

### Layer 4: Output & State
- **Audit Logs**: Immutable `.jsonl` records of every outbound request, reconstructible into standalone `curl` commands.
- **Executive Deliverables**: Zero-dependency interactive HTML & PDF reports with CVSS v3.1 calculation and severity filters.

---

## 3. Frontend Landing Page Architecture

The web interface is modularized for zero-build deployment (GitHub Pages compatible) while delivering a top-tier visual experience:

```
Verdamt-Snipe/
├── index.html                  # Semantic, accessible HTML structure (700 lines)
├── assets/
│   ├── css/
│   │   ├── theme.css           # Palette tokens, glassmorphism vars, dark/light definitions
│   │   ├── style.css           # Reset, typography, layout containers, header, footer
│   │   └── components.css      # Bento cards, Dynamic Island, terminal, lightbox, buttons
│   ├── js/
│   │   ├── main.js             # Global VS namespace, 135 i18n keys, theme, copy, checklist
│   │   ├── navigation.js       # Dynamic Island modal, scroll-spy, progress bar, back-to-top
│   │   └── animations.js       # Terminal simulation, counters, reveal observer, confetti
│   └── images/
│       └── favicon.svg         # Emerald Neon × Metallic Gold vector icon
├── docs/
│   └── ARCHITECTURE.md         # This technical document
├── README.md                   # Project documentation and quick start
└── LICENSE                     # MIT License
```

### 3.1 Design System: Dark Emerald × Metallic Gold × Obsidian Black

- **Dominant Base (`#080B0A`)**: Obsidian Black provides deep contrast and reduced eye fatigue.
- **Cards & Surfaces (`#151D19`)**: Dark Forest green-tinted charcoal for structured Bento cards.
- **Primary Accent (`#00D68F`)**: Emerald Neon for cybersecurity identity, active indicators, and success states.
- **Secondary Accent (`#D4AF37`)**: Metallic Gold for premium accents, badges, and reticle highlights.
- **Gold Highlights & Gradient**:
  - Champagne Gold (`#FFF1A8`) for high-contrast micro-accents.
  - Dark Gold base (`#8C6818`).
  - Quad-stop Metallic Gold Gradient:
    `linear-gradient(135deg, #8C6818 0%, #D4AF37 38%, #FFF1A8 62%, #D4AF37 100%)`.
- **Text & Borders**:
  - Primary Text: `#F0F3F0` (ultra-crisp off-white)
  - Secondary Text: `#A5ACA8` (soft sage gray)
  - Subtle Borders: `#304137` (rich moss hairline borders)

### 3.2 Key Interactive Features

1. **Dynamic Island**: Apple-inspired compact pill that morphs into a frosted glass control center on mobile and tablet devices.
2. **Terminal Stream Engine**: Simulates a live assessment run against `example.com` displaying full pipeline reconnaissance, origin IP discovery, DOM XSS confirmation, and Web Cache Poisoning exploitation.
3. **Bento Grid Architecture**: Asymmetric responsive cards highlighting core system modules with subtle hover glows.
4. **Interactive Screenshot Lightbox**: Full-resolution viewer for terminal captures and report deliverables with backdrop dismiss and Escape key binding.
5. **Dual-Language i18n Engine**: Zero-reload translation between English and Indonesian across all 135 UI keys.
