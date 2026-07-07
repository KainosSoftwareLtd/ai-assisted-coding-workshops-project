# Agent Guide

## Agent Maintenance
- Update this file when making major structural, technology, workflow, or convention changes.
- Keep updates concise and useful for the next agent who needs to understand the codebase quickly.

## Project Snapshot
- Browser-based task-list workshop template.
- Plain HTML5, vanilla JavaScript, and inline CSS. No npm, bundler, framework, backend, extension manifest, or build step.
- The app runs directly from `index.html` in a browser.
- This repo is designed around staged workshop tasks, so some files intentionally contain TODO stubs.

## Key Files
- `index.html` contains the main task-list UI structure and inline styling.
- `popup.js` contains task state, rendering, event handlers, persistence stubs, and the Task 5 AI priority feature stub.
- `options.html` contains the settings UI for the OpenRouter API key.
- `options.js` contains settings-page storage logic stubs.
- `README.md` explains workshop setup, task branches, and how to run the browser app.
- `.github/copilot-instructions.md` contains additional project guidance; prefer this file and `README.md` if older extension wording conflicts.

## Core Conventions
- Use browser-local persistence for workshop tasks; do not add a backend or database unless explicitly requested.
- Keep storage keys as named constants prefixed with `kainos-todo:`.
- Keep state in a single `state` object in `popup.js`.
- Keep render functions focused on DOM updates; event handlers should update state and call `render()`.
- Use event delegation on `#todo-list` instead of attaching item listeners inside render functions.
- Keep functions short, readable, and focused. Prefer simple vanilla JS over new abstractions.
- Do not add dependencies, TypeScript, React, CDNs, or tooling unless explicitly requested.

## Running And Checking Changes
- There is no install or build command.
- Open `index.html` in a browser to run the app.
- Refresh the browser page after code changes.
- Check browser-console errors when touching DOM, storage, or API code.