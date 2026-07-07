const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function createElement(id) {
  return {
    id,
    value: '',
    textContent: '',
    innerHTML: '',
    style: {},
    className: '',
    dataset: {},
    listeners: {},
    addEventListener(type, handler) {
      this.listeners[type] = handler;
    },
    dispatchEvent(event) {
      if (this.listeners[event.type]) {
        this.listeners[event.type](event);
      }
    },
  };
}

function createDom() {
  const elements = {};
  const make = (id) => {
    if (!elements[id]) elements[id] = createElement(id);
    return elements[id];
  };

  const document = {
    getElementById(id) {
      return make(id);
    },
  };

  const storage = new Map();
  const localStorage = {
    getItem(key) {
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      storage.set(key, String(value));
    },
    removeItem(key) {
      storage.delete(key);
    },
  };

  return { document, localStorage, elements };
}

function loadPopupScript() {
  const { document, localStorage, elements } = createDom();
  const context = {
    console,
    document,
    localStorage,
    window: { open() {} },
    crypto: { randomUUID: () => 'test-id' },
  };

  const code = fs.readFileSync(path.join(__dirname, '..', 'popup.js'), 'utf8');
  vm.createContext(context);
  vm.runInContext(code, context, { filename: 'popup.js' });

  return { context, elements, localStorage };
}

const { context, elements, localStorage } = loadPopupScript();

assert.equal(localStorage.getItem('kainos-todo:todos'), null, 'no todos persisted before add');

context.addTodo('Write a test');
assert.equal(elements['todo-list'].innerHTML.includes('Write a test'), true, 'task appears in list after add');
assert.equal(localStorage.getItem('kainos-todo:todos').includes('Write a test'), true, 'task persisted to localStorage');

console.log('popup task-entry regression checks passed');
