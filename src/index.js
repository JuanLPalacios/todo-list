import {
  add, editDescription, load, remove, save,
} from './add-and-remove.js';
import { clearAllCompleted, statusUpdate } from './status-updates.js';
import './style.css';

const todo = load() || [];
const form = document.forms[0];
const clearAll = document.getElementById('clear-all');

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
    const task = todo[i];
    const deleteBtn = li.querySelector('.delete');
    const descriptionInput = li.querySelector(`#txt-${i}`);
    const checkbox = li.querySelector(`#chk-${i}`);
    // add delete event
    deleteBtn.addEventListener('mousedown', () => {
      remove(task, todo);
      update();
    });
    // prevent submit when enter key pressed insed go to blur
    descriptionInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        e.target.blur();
      }
    });
    // if input is left or redirecte here by enter then edit and save
    descriptionInput.addEventListener('blur', (e) => {
      editDescription(task, e.target.value);
      save(todo);
      update();
    });
    // on checkbox cange updave value and save
    checkbox.addEventListener('change', (e) => {
      statusUpdate(task, e.target.checked);
      save(todo);
    });
  });
}

update();

form.addEventListener('submit', (e) => {
  const newTask = {};
  new FormData(form).forEach((value, key) => { newTask[key] = value; });
  add(newTask, todo);
  update();
  e.preventDefault();
  form.reset();
});
clearAll.addEventListener('click', () => {
  clearAllCompleted(todo);
  update();
});