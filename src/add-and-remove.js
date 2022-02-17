export function add({ description }, list) {
  list.push({ description, completed: false, index: list.length });
}

export function remove(element, list) {
  list.splice([].indexOf(element), 1);
}

export function editDescription(element, description) {
  Object.assign(element, { description });
}
