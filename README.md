# Kainos Task List — Workshop Template

Training template for an AI-Assisted Coding workshop. The project is a **browser-based Task List app** that grows across 5 tasks, each adding a new layer while practising AI-assisted coding with GitHub Copilot and Claude.

---

## Prerequisites

Install **before** the workshop:

1. **VS Code** — https://code.visualstudio.com/
2. **GitHub Copilot** — subscription or trial required
   (Ctrl+Shift+X → search "GitHub Copilot" → install both Copilot + Copilot Chat)
3. **A modern browser** — Chrome, Edge, Firefox, or Safari
4. **OpenRouter API key** — needed for Task 5 only:
   - Create a free account at https://openrouter.ai/
   - Generate an API key at https://openrouter.ai/keys
   - Free tier gives access to several models
5. **GitHub account** — for forking the repo

---

## Running the Project

No `npm install`, no bundler, and no build step. The app runs as static HTML, CSS, and JavaScript in a browser.

1. Clone the repo: `git clone <url>`
2. Open the project folder in VS Code
3. Open `index.html` in your browser
4. Done

**After every code change:** refresh the browser page.

**Debugging:** open browser developer tools → Console tab.

---

## Project Structure

| File / Folder | Purpose |
|---|---|
| `index.html` | Main task-list UI — structure + all CSS (Kainos theme) |
| `popup.js` | Application logic — all function stubs for Tasks 1–5 |
| `options.html` | Settings page — OpenRouter API key input |
| `options.js` | Settings logic — stubs for Task 5 |
| `icons/` | Legacy/reference icon assets |
| `AGENTS.md` | Quick-start guide for future coding agents |
| `.github/copilot-instructions.md` | Additional AI context for GitHub Copilot |
| `.github/agents/` | Backlog Assistant agent configuration and reference docs |
| `.backlog/` | Backlog template configuration |

---

## Workshop Plan

| Task | What you build |
|---|---|
| Task 1 | Add tasks & persist locally in the browser |
| Task 2 | Mark done & delete with event delegation |
| Task 3 | Filter bar (All / Active / Done) & task counter |
| Task 4 | Due dates, urgency badges & sorting |
| Task 5 | AI priority suggestions via OpenRouter API |

---

## Branches and Checkpoints

Each task branch is a starting point — it contains completed code from all previous tasks. If you get stuck or run out of time, simply switch to the next branch and continue from there.

| Branch | State |
|---|---|
| `task-1` | Starting point for Task 1 (template with stubs) |
| `task-2` | Task 1 complete — starting point for Task 2 |
| `task-3` | Tasks 1–2 complete — starting point for Task 3 |
| `task-4` | Tasks 1–3 complete — starting point for Task 4 |
| `task-5` | Tasks 1–4 complete — starting point for Task 5 |
| `final` | All 5 tasks complete |

> **Can't finish a task?** No problem — the next branch has it done for you. Just `git stash`, checkout the next branch, and keep going.

### Git Workflow

```bash
git checkout task-1        # start here

git checkout -b my-task-1  # your working branch
# … code with Copilot …
git add . && git commit -m "feat: add and display todos with browser storage"

# Stuck? Check the next branch for a working reference:
git stash                  # save your work
git checkout task-2        # has Task 1 already done
```

---

## Technical Requirements

- A modern browser
- VS Code with GitHub Copilot
- Internet connection (GitHub Copilot, OpenRouter API for Task 5)

---

## Support

Run into setup problems? Contact the instructor **before** the workshop day.
