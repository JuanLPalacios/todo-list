import {
  add, editDescription, load, remove, save,
} from './add-and-remove.js';
import { statusUpdate } from './status-updates.js';
import './style.css';

const todo = load() || [];

function update() {
  const list = document.getElementById('list');
  list.innerHTML = todo.map((item, i) => `
  <li class="todo-li">
    <input type="checkbox" id="chk-${i}" ${item.completed ? 'checked' : ''}>
    <label for="chk-${i}"></label>
    <input type="text" id="txt-${i}" value="${item.description}" >
    <label for="txt-${i}">${item.description}</label>
    <span class="handle"></span>
    <button class="delete"></button>
  </li>`).join('');
  list.querySelectorAll('li').forEach((li, i) => {
    const element = todo[i];
    li.querySelector('.delete').addEventListener('mousedown', () => {
      remove(element, todo);
      update();
    });
    li.querySelector(`#txt-${i}`).addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        e.target.blur();
      }
    });
    li.querySelector(`#txt-${i}`).addEventListener('blur', (e) => {
      editDescription(element, e.target.value);
      save(todo);
      update();
    });
    li.querySelector(`#chk-${i}`).addEventListener('change', (e) => {
      statusUpdate(element, e.target.checked);
      save(todo);
    });
  });
}

update();

document.forms[0].addEventListener('submit', (e) => {
  const temp = {};
  new FormData(document.forms[0]).forEach((value, key) => { temp[key] = value; });
  add(temp, todo);
  update();
  e.preventDefault();
  document.forms[0].reset();
});