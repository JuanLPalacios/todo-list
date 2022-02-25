/**
 * @jest-environment jsdom
 */
import {
  add, remove, editDescription, save, load,
} from './add-and-remove.js';
import { clearAllCompleted, statusUpdate } from './status-updates.js';

function triggerMouseEvent(node, eventType) {
  const clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}

global.localStorage = {
  state: {
    'access-token': 'superHashedString',
  },
  setItem(key, item) {
    this.state[key] = item;
  },
  getItem(key) {
    return this.state[key];
  },
};

describe('add({ description }, list)', () => {
  it('should add an item', () => {
    const list = [];
    add({ description: 'hello world' }, list);
    expect(list).toStrictEqual([{ description: 'hello world', completed: false, index: 1 }]);
  });
  it('if there are previous items the new one should have an index of the array length', () => {
    const list = [{}, {}, {}];
    add({ description: 'hello world' }, list);
    expect(list[list.length - 1].index).toBe(list.length);
  });
});

describe('remove({ description }, list)', () => {
  it('should remove an element', () => {
    const list = [];
    add({ description: 'hello world' }, list);
    remove({ description: 'hello world' }, list);
    expect(list).toStrictEqual([]);
  });
  it('If remove function exists', () => {
    expect(remove).toBeDefined();
  });

  it('re-assign the index when removed', () => {
    const list = [];
    add({ description: 'hello world' }, list);
    add({ description: 'hello mars' }, list);
    add({ description: 'hello Jupiter' }, list);

    remove({ description: 'hello world' }, list);

    expect(list[0].index).toBe(1);
    expect(list[1].index).toBe(2);
  });
});

describe('editDescription(task, description)', () => {
  it('should edit the description of a task ', () => {
    const task = { description: 'hello world', index: 1, completed: false };
    editDescription(task, 'test value');
    expect(task).toStrictEqual({ description: 'test value', completed: false, index: 1 });
  });
});

describe('statusUpdate(element, completed)', () => {
  it('should update the status of a task ', () => {
    const task = { description: 'hello world', index: 1, completed: false };
    statusUpdate(task, true);
    expect(task).toStrictEqual({ description: 'hello world', completed: true, index: 1 });
  });
});

describe('clearAllCompleted(list)', () => {
  it('should remove all completed tasks', () => {
    const list = [];
    add({ description: 'hello world' }, list);
    add({ description: 'hello mars' }, list);
    add({ description: 'hello Jupiter' }, list);

    statusUpdate(list[0], true);
    statusUpdate(list[2], true);

    clearAllCompleted(list);

    expect(list).toStrictEqual([{ description: 'hello mars', index: 1, completed: false }]);
  });
});

describe('save(list)', () => {
  it('should store the list value', () => {
    const list = [];
    add({ description: 'hello world' }, list);
    add({ description: 'hello mars' }, list);
    add({ description: 'hello Jupiter' }, list);
    save(list);
    expect(localStorage.getItem('todo')).toBe(JSON.stringify(list));
  });
});

describe('load()', () => {
  it('should retrive the list value', () => {
    const list = [];
    add({ description: 'hello mars' }, list);
    save(list);
    expect(load()).toStrictEqual([{ description: 'hello mars', index: 1, completed: false }]);
  });
});

describe('DOM manipulation', () => {
  document.body.innerHTML = `<main>
        <h1>To Do List</h1>
        <div class="todo">
            <header>Today's To-Do List</header>
            <form>
                <input type="text" name="description">
                <button>add item</button>
            </form>
            <ul id="list">
            </ul>
            <button id="clear-all">Clear all completed</button>
        </div>
    </main>`;
  save([{ description: 'hello mars', index: 1, completed: true },
    { description: 'hello uranus', index: 2, completed: true },
    { description: 'hello jupiter', index: 3, completed: true },
  ]);
  // eslint-disable-next-line global-require
  require('./index.js');
  it('clearAll element', () => {
    document.querySelector('#clear-all').click();
    expect(document.getElementById('list').querySelectorAll('li').length).toBe(0);
  });

  it('add new element', () => {
    document.forms[0].submit();
    expect(document.getElementById('list').querySelectorAll('li').length).toBe(1);
  });
  it('remove element', () => {
    triggerMouseEvent(document.querySelector('li .delete'), 'mousedown');
    expect(document.getElementById('list').querySelectorAll('li').length).toBe(0);
  });
});
