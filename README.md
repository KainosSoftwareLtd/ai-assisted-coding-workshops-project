# Kainos Task List — Workshop Template

Training template for an AI-Assisted Coding workshop. The project is a **browser-based Task List app** that grows across 5 tasks, each adding a new layer while practising AI-assisted coding with GitHub Copilot and Claude.

---

## Prerequisites

Install **before** the workshop:

1. **VS Code** — https://code.visualstudio.com/
2. **GitHub Copilot** — subscription or trial required
   (Ctrl+Shift+X → search "GitHub Copilot" → install both Copilot + Copilot Chat)
3. **OpenRouter API key** — needed for Task 5 only:
   - Create a free account at https://openrouter.ai/
   - Generate an API key at https://openrouter.ai/keys
4. **GitHub account** — for forking the repo

---

## Running the Project

No `npm install`, no bundler, no build step needed.

1. Clone the repo: `git clone <url>`
2. Open the project folder in **VS Code**
3. Right-click `index.html` → **Open with Live Server** (or double-click to open directly in your browser)
4. The Kainos Task List page is ready to use

**After every code change:** save the file and refresh the browser tab.

**Debugging:** open browser DevTools (F12) → Console tab.

---

## Project Structure

| File | Purpose |
|---|---|
| `index.html` | Main page — full-page task list UI (Kainos theme baked in) |
| `popup.js` | Application logic — all function stubs for Tasks 1–5 |
| `options.html` | Settings page — OpenRouter API key input |
| `options.js` | Settings logic — stubs for Task 5 |
| `icons/` | Kainos icon assets |

---

## Workshop Plan

| Task | What you build |
|---|---|
| Task 1 | Add tasks & persist with `localStorage` |
| Task 2 | Mark done & delete with event delegation |
| Task 3 | Filter bar (All / Active / Done) & task counter |
| Task 4 | Due dates, urgency badges & sorting |
| Task 5 | AI priority suggestions via OpenRouter API |

---

## Technical Requirements

- Any modern browser (Chrome, Firefox, Edge, Safari)
- VS Code with GitHub Copilot
- Internet connection (GitHub Copilot, OpenRouter API for Task 5)

---

## Support

Run into setup problems? Contact the instructor **before** the workshop day.
