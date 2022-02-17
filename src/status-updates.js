import { remove, save } from './add-and-remove.js';

export function statusUpdate(element, completed) {
  Object.assign(element, { completed });
}

export function clearAllCompleted(list) {
  list.filter((task) => task.completed).forEach((task) => {
    remove(task, list);
  });
  save(list);
}