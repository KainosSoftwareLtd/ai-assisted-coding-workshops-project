const STORAGE_KEY = 'kainos-todo:todos';

const state = {
  todos: [
    // TODO Task 1: remove these hardcoded todos and load from localStorage instead
    { id: 1, text: 'Listen carefully to the trainer 🎧', done: true, createdAt: '2026-01-01T09:00:00.000Z', priority: null },
    { id: 2, text: 'Stop asking ChatGPT, use Copilot instead', done: false, createdAt: '2026-01-01T10:00:00.000Z', priority: null },
    { id: 3, text: 'Actually read the prompt before hitting Enter', done: false, createdAt: '2026-01-01T11:00:00.000Z', priority: null },
    { id: 4, text: 'Work hard on tasks (yes, all 5 of them)', done: false, createdAt: '2026-01-01T12:00:00.000Z', priority: null },
  ],
  filter: 'all',
  aiLoading: false,
};

// ── Persistence ────────────────────────────────────────────────

function loadState() {
  render();
}

function saveState() {
}

// ── Business logic ─────────────────────────────────────────────

function addTodo(text) {
}

function toggleTodo(id) {
}

function deleteTodo(id) {
}

function setFilter(filter) {
}

function getVisibleTodos() {
  return state.todos;
}

function setPriority(id, priority) {
}

// ── Render ─────────────────────────────────────────────────────

function renderList() {
  const list = document.getElementById('todo-list');
  const visible = getVisibleTodos();
  list.innerHTML = visible.map(todo => `
    <li class="todo-item${todo.done ? ' done' : ''}" data-id="${todo.id}">
      <input class="todo-checkbox" type="checkbox" ${todo.done ? 'checked' : ''} />
      <span class="todo-text">${todo.text}</span>
      ${todo.priority ? `<span class="priority-badge priority-${todo.priority}">${todo.priority}</span>` : ''}
      <button class="btn-delete" title="Delete">✕</button>
    </li>
  `).join('');
  // TODO Task 2: wire checkbox and delete button via event delegation in initHandlers()
}

function renderEmptyState() {
  const empty = document.getElementById('empty-state');
  empty.style.display = getVisibleTodos().length === 0 ? 'block' : 'none';
}

function renderFilterBar() {
}

function renderStats() {
  const total  = state.todos.length;
  const done   = state.todos.filter(t => t.done).length;
  const active = total - done;

  document.getElementById('stats').textContent = `${active} task${active !== 1 ? 's' : ''} left`;

  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = (total === 0 ? 0 : Math.round((done / total) * 100)) + '%';

  const countEl = document.getElementById('task-count');
  if (countEl) countEl.textContent = total === 0 ? '' : `${done} / ${total} done`;
}

function render() {
  renderList();
  renderEmptyState();
  renderFilterBar();
  renderStats();
}

// ── Event wiring ───────────────────────────────────────────────

function initHandlers() {

  // Options link
  document.getElementById('options-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.open('options.html');
  });
}

// ── AI Feature (Task 5) ────────────────────────────────────────

async function suggestPriority(id) {
}

// ── Boot ───────────────────────────────────────────────────────

loadState();
initHandlers();
