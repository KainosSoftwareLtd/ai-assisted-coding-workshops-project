# AGENTS.MD — Project Context & Scope

## Project Overview

**Kainos Task List** is a browser-based task management application and **AI-Assisted Coding workshop training template**. The project is designed to teach developers how to use GitHub Copilot and Claude for coding tasks, progressing from basic functionality through advanced AI integration.

- **Project Type**: Web Application (Browser-based)
- **Target Environment**: Modern browsers (Chrome, Firefox, Edge, Safari)
- **Build Process**: None — vanilla HTML/CSS/JavaScript, no bundler or build step required
- **Deployment**: Open `index.html` directly in browser or use Live Server (VS Code extension)

---

## Technology Stack

| Technology | Purpose | Version/Notes |
|---|---|---|
| **HTML5** | Document structure & markup | Standard |
| **CSS3** | Styling & layout | Custom Kainos theme (navy, green palette) |
| **JavaScript (Vanilla)** | Application logic & DOM manipulation | ES6+, no frameworks |
| **localStorage API** | Persistent data storage | Browser native |
| **Google Fonts** | Typography (Inter font) | CDN-loaded |
| **OpenRouter API** | AI-powered task priority suggestions (Task 5 only) | Optional, requires API key |
| **Browser DevTools** | Debugging & development | F12 to open Console |

**No external build tools, no npm, no bundler.** Changes reflect immediately on file save and browser refresh.

---

## Project Structure

```
.
├── index.html          # Main task list page UI
├── popup.js            # Core application logic, state management, render functions
├── options.html        # Settings page for API key configuration
├── options.js          # Settings logic (API key storage & retrieval)
├── README.md           # User-facing workshop instructions
├── AGENTS.md           # This file — agent scope & technical context
|── tests               # Contains test feature files defining test scenarios
```

### File Responsibilities

- **index.html**: Renders the complete task list UI with Kainos branding (navy/green). Contains:
  - Page structure, form inputs, task list container
  - Inline styles (CSS-in-head) with theme variables (navy, green, danger colors)
  - DOM elements with consistent IDs for JavaScript targeting

- **popup.js**: Heart of the application. Contains:
  - `state` object: centralized app state (todos array, filter mode, AI loading flag)
  - Persistence functions: `loadState()`, `saveState()` (uses `localStorage`)
  - Business logic: `addTodo()`, `toggleTodo()`, `deleteTodo()`, `setFilter()`, `setPriority()`
  - Rendering: `renderList()` and related UI update functions
  - Event listeners: delegated event handling for list interactions

- **options.html**: Settings UI for OpenRouter API key input
  - Form with input field for API key storage
  - Minimal styling, consistent with main theme

- **options.js**: Settings logic
  - `loadApiKey()`: retrieve saved API key from localStorage
  - `saveApiKey()`: persist API key to localStorage
  - Form submission handler

- **add-task.feature**: BDD test scenarios for adding feature (Gherkin syntax)
  - Test scenarios covering core functionality, input validation, persistence, UI/UX, edge cases, and browser compatibility
  - Uses Given/When/Then structure for testability

---

## Key Architectural Concepts

### State Management
- **Centralized state** in `state` object (popup.js):
  ```javascript
  state = {
    todos: [],        // array of { id, text, done, createdAt, priority }
    filter: 'all',    // filter mode: 'all', 'active', 'done'
    aiLoading: false  // AI request in progress flag
  }
  ```
- **Initial load**: `loadState()` is called on page load to restore todos from localStorage
- **No hardcoded data**: All default tasks are loaded from persistent storage only

### Persistence
- **localStorage Key**: `'kainos-todo:todos'` (for tasks), `'kainos-todo:apiKey'` (for API key)
- **Data Format**: JSON serialization of `state.todos` array
- **Load on Start**: `loadState()` called on page load to restore previous session
- **Add task**:
  - `loadState()`: Retrieves todos from localStorage, handles corrupted data gracefully
  - `saveState()`: Persists todos array after every state mutation
  - `addTodo(text)`: Creates task with unique ID (Date.now()), ISO timestamp, validates input (no blanks)

### Rendering Pipeline
1. State changes via business logic functions (`addTodo`, `toggleTodo`, etc.)
2. `saveState()` persists to localStorage with error handling
3. `render()` orchestrates all render functions: `renderList()`, `renderEmptyState()`, `renderStats()`, `renderFilterBar()`
4. `renderEmptyState()` shows friendly "All clear!" message when no tasks exist (Task 1)
5. Browser displays updated UI immediately

### Event Handling
- **Form Submission (Add task)**: `#add-form` submit handler wired to call `addTodo()`, clears input, re-focuses
- **Event Delegation**: Planned for Task 2 (checkbox and delete button via parent container)
- **DOM IDs**: Consistent naming for element targeting (e.g., `#todo-list`, `#add-form`, `#todo-input`, `#btn-add`)

---

## Code Patterns & Conventions

### Naming
- **State properties**: camelCase (`createdAt`, `dueDate`, `urgency`)
- **Storage keys**: kebab-case prefix (`'kainos-todo:todos'`)
- **Functions**: camelCase, verb-prefix for actions (`addTodo`, `toggleTodo`)
- **CSS classes**: kebab-case (e.g., `.task-item`, `.urgency-high`)

### ID Naming
- Primary containers: `id="todo-list"`, `id="add-todo-form"`, `id="settings-form"`
- Input fields: `id="api-key-input"`, `id="task-input"`
- Buttons: descriptive, e.g., `id="add-btn"`, `id="filter-active"`

### Color Scheme (CSS Variables)
```css
--navy:        #1C2340    /* Primary brand color */
--green:       #00B140    /* CTA, success, active */
--text:        #1C2340    /* Body text */
--high:        #ef4444    /* Urgent badge */
--medium:      #f59e0b    /* Medium priority */
--low:         #10b981    /* Low priority */
```

### localStorage Pattern
```javascript
// Load
const data = JSON.parse(localStorage.getItem('kainos-todo:todos')) || [];

// Save
localStorage.setItem('kainos-todo:todos', JSON.stringify(state.todos));
```

---

## Task Data Structure

Each todo in `state.todos`:
```javascript
{
  id: number,                    // Unique identifier
  text: string,                  // Task description
  done: boolean,                 // Completion status
  createdAt: string,             // ISO 8601 timestamp
  priority: string | null,       // 'high', 'medium', 'low', or null (Task 5)
  dueDate: string | null,        // ISO date string (Task 4)
  urgency: string | null,        // Badge text for display (Task 4)
}
```

---

## Development Workflow

### Running the Project
1. Open `index.html` in browser (drag-drop, or right-click → Open with Live Server)
2. Make changes to `.js` or `.html` files
3. Save file (Ctrl+S / Cmd+S)
4. Refresh browser tab (F5 / Cmd+R)
5. Check Console (F12) for errors

---

## Key Assumptions & Constraints

1. **No Build Step**: All code runs directly in the browser; no transpilation or bundling
2. **Single Page**: `index.html` is the main view; options flow to `options.html` if needed
3. **Vanilla JS Only**: No jQuery, React, or other frameworks
4. **localStorage Only**: For Task 1–4; Task 5 adds remote API persistence potential
5. **Synchronous Rendering**: `render()` updates DOM immediately; no virtual DOM
6. **Workshop Context**: Code includes stub functions and `// TODO` comments for learner guidance

---

## Common Mistakes & Fixes

| Issue | Root Cause | Fix |
|---|---|---|
| Changes not visible after save | Browser cache or not refreshed | Press F5 / Cmd+R to hard-refresh |
| Task not persisting | `saveState()` not called after mutation | Ensure all state-changing functions call `saveState()` after mutating `state.todos` |
| Event listeners not working (Task 2+) | Delegated listeners attach to wrong element or wrong event | Verify parent selector and event type in HTML |
| localStorage data lost | localStorage cleared or quota exceeded | Check browser storage (DevTools → Application → localStorage) |
| Empty input creates blank task | `addTodo()` not validating input | Verify `text.trim()` check in `addTodo()` |
| AI Task 5 fails | Missing/invalid API key | Verify API key in options page and localStorage key name |

---

## Agent Instructions

When working on this project, keep the following in mind:

- **Maintain vanilla JS**: Do not introduce frameworks, build tools, or npm dependencies unless explicitly requested
- **No file bloat**: Keep code comments concise and focused on learner guidance
- **Test in browser**: All changes must be testable by opening `index.html` and refreshing (no build step)
- **Follow naming conventions**: Stick to camelCase for JS, kebab-case for CSS classes, consistent storage key prefixes

---

## Useful References

- **localStorage API**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- **Event Delegation**: https://javascript.info/event-delegation
- **Kainos Brand**: Navy (#1C2340), Green (#00B140) — color palette in CSS variables
- **OpenRouter Docs**: https://openrouter.ai/docs (Task 5 reference)

---

**Last Updated**: 2026-09-16  
**Project Context Version**: 1.0
