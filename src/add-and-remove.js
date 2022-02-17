const TODO = 'todo';

export function save(list) {
  localStorage.setItem(TODO, JSON.stringify(list));
}

export function load() {
  return JSON.parse(localStorage.getItem(TODO));
}

export function add({ description }, list) {
  list.push({ description, completed: false, index: list.length + 1 });
  save(list);
}

export function remove(element, list) {
  list.splice(list.indexOf(element), 1);
  list.forEach((element, index) => { element.index = index + 1; });
  save(list);
}

export function editDescription(element, description) {
  Object.assign(element, { description });
}
