const STORAGE_KEY = 'kainos-todo:todos';

const state = {
  todos: [],
  filter: 'all',
  aiLoading: false,
};

// ── Persistence ────────────────────────────────────────────────

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    render();
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    state.todos = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse todos from localStorage:', error);
    state.todos = [];
  }

  render();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
}

// ── Business logic ─────────────────────────────────────────────

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  state.todos.push({
    id: Date.now(),
    text: trimmed,
    done: false,
    createdAt: new Date().toISOString(),
    priority: null,
  });

  saveState();
  render();
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
  const form = document.getElementById('add-form');
  const input = document.getElementById('todo-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(input.value);
    input.value = '';
  });

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
