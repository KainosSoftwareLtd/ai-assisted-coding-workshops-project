# AGENTS.md

This file defines how coding agents should work in this repository.

## Project Type
- Chrome Extension (Manifest V3)
- Plain HTML, CSS, and vanilla JavaScript (ES2020+)
- No framework, no bundler, no npm setup required

## Primary Goal
Build and iterate on a workshop-friendly todo extension while keeping code simple, readable, and easy for learners to follow.

## Source of Truth
Use these files as the canonical implementation boundaries:
- manifest.json: extension configuration
- index.html: popup UI structure and inline styles
- popup.js: popup state, business logic, rendering, and event handlers
- options.html: options/settings UI
- options.js: options/settings logic

## Hard Constraints
- Do not introduce React, TypeScript, build tools, or external frameworks.
- Do not add npm dependencies unless explicitly requested.
- Do not add backend services, databases, or proxies.
- Persist data with chrome.storage.local only.
- Do not use localStorage.
- Storage keys must be named constants and use the prefix kainos-todo:.

## Coding Standards
- Prefer const and let.
- Keep functions short and single-purpose (roughly up to 30 lines).
- Use descriptive names for variables and functions.
- Avoid magic strings; use named constants.
- Add comments only when logic is not obvious.
- Keep logic readable for workshop participants.

## Architecture Pattern
- Keep mutable app data in a single state object.
- Separate business logic from DOM updates.
- Render functions should read state and render only.
- Event handlers should update state and then call render.
- Use event delegation on #todo-list; do not attach per-item listeners inside render functions.

## Accessibility and UI
- Use semantic HTML and accessible labels/attributes.
- Preserve the current UI structure unless task requirements require changes.
- Keep popup interactions keyboard-friendly where practical.

## Task-Driven Development Guidance
When implementing workshop tasks, prioritize the following order:
1. Correct functionality
2. Readability for learners
3. Minimal, focused changes
4. Consistent style with existing files

## Validation Checklist
After changes:
1. Validate JSON syntax in manifest.json.
2. Reload unpacked extension in chrome://extensions.
3. Open popup and verify core flows manually.
4. Open popup DevTools console and check for runtime errors.
5. Verify data is persisted and restored via chrome.storage.local.

## Safe Edit Rules for Agents
- Do not perform broad refactors unless requested.
- Do not rename public-facing IDs/classes that UI logic depends on without updating all references.
- Do not remove workshop TODO markers unless implementing that task section.
- Keep diffs small and easy to review.

## Suggested Commit Style
Use clear conventional-style commit messages, for example:
- feat: implement todo persistence with chrome.storage.local
- feat: add toggle and delete with event delegation
- feat: add filter bar and task counter
- feat: add due date sorting and urgency badges
- feat: implement AI priority suggestion in options workflow
