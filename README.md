# Verdamt-Snipe

<p align="center">
  <img src="assets/images/favicon.svg" alt="Verdamt-Snipe Logo" width="96" height="96" />
</p>

<p align="center">
  <strong>Async Web Security Reconnaissance & Vulnerability Assessment Framework</strong>
</p>

<p align="center">
  <a href="https://github.com/Samasta-Baskara/Verdamt-Snipe/releases"><img src="https://img.shields.io/badge/version-v1.4.5--NEXUS-00D68F.svg?style=flat-square" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-D4AF37.svg?style=flat-square" alt="License"></a>
  <a href="https://python.org"><img src="https://img.shields.io/badge/python-3.12%2B-blue.svg?style=flat-square" alt="Python"></a>
  <a href="https://golang.org"><img src="https://img.shields.io/badge/go-1.22%2B-00ADD8.svg?style=flat-square" alt="Go"></a>
</p>

---

## ⚡ Overview

**Verdamt-Snipe** is an async-first reconnaissance and vulnerability assessment framework engineered to bridge the gap between rapid intelligence discovery and authentic client-side sink confirmation.

Pairing a Python AsyncIO event loop with a Go native binary bridge, JA3/JA4 TLS impersonation, and a Playwright Chromium headless pool, Verdamt-Snipe scans targets at native throughput while confirming critical injection vulnerabilities in real browser contexts.

### Highlights

- 🎯 **Dual-Engine Architecture**: Python AsyncIO core coupled with compiled Go binaries (`subfinder`, `httpx`, `katana`, `nuclei`, `dalfox`, `gau`).
- 🛡️ **TLS Impersonation**: Spoofs Chrome 120 / Safari JA3 and JA4 TLS fingerprints via `curl_cffi` to evade anti-bot defenses and WAF profiling.
- 🌐 **Browser Sink Verification**: Ten automated Playwright modules confirm live DOM XSS, CORS leaks, CSRF, and postMessage vulnerabilities in isolated browser contexts.
- ⚡ **Web Cache Exploitation**: Automated testing for unkeyed header cache poisoning and Web Cache Deception path delimiters.
- 📊 **Tactical TUI Dashboard**: Real-time terminal interface refreshed at 15 FPS with live RPS sparklines and hardware telemetry.
- 📋 **Replayable Audit Trail**: Immutable JSONL audit log enabling one-click replay of any finding directly into `curl`.

---

## 🚀 Quick Start

### Prerequisites

- **OS**: Linux or macOS
- **Python**: 3.12 or newer
- **Go**: 1.22+ (for native binary bridges)
- **Memory**: 2 GB+ RAM recommended

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Samasta-Baskara/Verdamt-Snipe.git
cd Verdamt-Snipe

# 2. Set up virtual environment & install dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 3. Install Playwright browser drivers
playwright install chromium
```

---

## 🛠️ Usage

### Basic Scans

```bash
# Dry run to validate scope and network settings without sending traffic
python3 verd.py example.com --dry-run

# Passive reconnaissance (GET, HEAD, OPTIONS requests only)
python3 verd.py example.com --passive

# Full pipeline assessment with browser verification & cache analysis
python3 verd.py example.com --full
```

### Scan Modes

| Mode | Flag | Description |
|---|---|---|
| **Reconnaissance** | `--recon` | Passive intelligence gathering and subdomain mapping |
| **WAF Hunter** | `--origin` | Uncovers backend origin IP behind Cloudflare / Akamai CDNs |
| **Crawl & Discovery** | `--crawl` | Deep endpoint crawling via Katana and Gau |
| **Injection Assault** | `--assault` | Differential latency SQLi and SSRF callbacks |
| **Cache Poisoning** | `--poison` | Unkeyed header reflection and cache desynchronization probes |
| **Browser Verify** | `--browser` | Headless Chromium DOM execution and sink verification |
| **Full Pipeline** | `--full` | Complete end-to-end multi-stage security assessment |

---

## 📂 Project Structure

```
Verdamt-Snipe/
├── index.html                  # Responsive showcase landing page
├── assets/
│   ├── css/
│   │   ├── theme.css           # Dark Emerald × Metallic Gold design tokens
│   │   ├── style.css           # Base styles, typography, header, layout, footer
│   │   └── components.css      # Bento cards, Dynamic Island, terminal, lightbox
│   ├── js/
│   │   ├── main.js             # i18n dictionary, theme switch, copy, checklist
│   │   ├── navigation.js       # Dynamic Island, scroll-spy, progress bar
│   │   └── animations.js       # Terminal simulation, counters, reveal, confetti
│   └── images/
│       └── favicon.svg         # Emerald and gold vector icon
├── docs/
│   └── ARCHITECTURE.md         # Full architecture specification
├── README.md                   # Documentation and quick start guide
└── LICENSE                     # MIT License
```

---

## ⚖️ Legal & Ethical Notice

Verdamt-Snipe is designed exclusively for authorized security research, educational purposes, and defensive assessments. **Only test systems you own or have explicit, documented authorization to assess** (such as an approved bug bounty program or signed penetration testing agreement). Unauthorized scanning of computer systems is illegal in most jurisdictions.

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE). Built and maintained by [Samasta Baskara](https://github.com/Samasta-Baskara).
