import { add, editDescription, remove } from './add-and-remove';
import './style.css';

const todo = [];

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
    li.querySelector(`#txt-${i}`).addEventListener('blur', (e) => {
      editDescription(element, e.target.value);
      update();
    });
  });
}

update();

document.forms[0].addEventListener('submit', () => {
  const temp = {};
  new FormData(document.forms[0]).forEach((value, key) => { temp[key] = value; });
  add(temp, todo);
  update();
});