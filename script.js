const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));

}

function newTodo() {
  const todoName = prompt('Enter new TODO:');
  if (todoName) {
    const todo = {
      name: todoName,
      completed: false
    };

    todos.push(todo);
    saveTodos();
    render();
    updateCounter();
    
  }
}

function render() {
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-2';
    checkbox.id = index;
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => checkTodo(index));
    const label = document.createElement('label');
    label.htmlFor = index;
    label.textContent = todo.name;

    if (todo.completed) {
      label.classList.add('text-success', 'text-decoration-line-through');
    }
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-end';
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', () => deleteTodo(index));
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);
  });
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.completed).length;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  render();
  updateCounter();
}

function checkTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  render();
  updateCounter();
}

render();
updateCounter();
