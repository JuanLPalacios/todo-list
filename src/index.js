import './style.css';

const todo = [
  {
    description: 'List structure.',
    completed: false,
    index: 0,
  },
  {
    description: 'Interactive list.',
    completed: false,
    index: 1,
  },
  {
    description: 'Add and remove items.',
    completed: false,
    index: 2,
  },
];

function update() {
  document.getElementById('list').innerHTML = todo.sort((a, b) => a.index - b.index).map((item, i) => `
  <li class="todo-li">
    <input type="checkbox" id="chk-${i}" ${item.completed ? 'checked' : ''}>
    <label for="chk-${i}"></label>
    <input type="text" id="txt-${i}" value="${item.description}" >
    <label for="txt-${i}">${item.description}</label>
    <span class="handle"></span>
  </li>`).join('');
}

update();