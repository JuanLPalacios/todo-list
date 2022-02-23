import { add, remove } from './add-and-remove';

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
});