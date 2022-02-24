import { add, remove, editDescription } from './add-and-remove.js';
import { clearAllCompleted, statusUpdate } from './status-updates.js';

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