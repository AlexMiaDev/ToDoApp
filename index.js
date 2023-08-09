// elements
const inputElement = document.getElementById('input');
const todosElement = document.getElementById('todos');
const counterElement = document.getElementById('counter');
const filterElement = document.getElementById('filter');
const clearElement = document.getElementById('clear');

// implementation

Vue.createApp({
  data() {
    return {
      inputValue: ''
    };
  },
  methods: {

  }
}).mount('app');

const saveTodos = () => {
  const list = [];
  for (const todo of todosElement.querySelectorAll('.todo')) {
    list.unshift({
      done: todo.children[0].checked,
      text: todo.children[1].textContent,
    });
  }
  localStorage.setItem('todos', JSON.stringify(list));
};

const loadTodos = () => {
  const list = JSON.parse(localStorage.getItem('todos') || '[]');
  for (const { done, text } of list) {
    createTodo(text, done);
  }
};

const deleteTodo = (removeElement) => {
  const todoElement = removeElement.parentNode;
  todosElement.removeChild(todoElement);
  updateCounter();
  saveTodos();
};

const createTodo = (text, done = false) => {
  todosElement.insertAdjacentHTML(
    'afterbegin',
    `<div class="todo">
      <input type="checkbox" ${done ? 'checked' : ''} />
      <div class="todo--title">${text}</div>
      <i class="todo--remove fa-solid fa-trash"></i>
    </div>`
  );
  updateCounter();
  saveTodos();
  return todosElement.children[0];
};

const updateCounter = () => {
  const count = todosElement.querySelectorAll('.todo:not(:has(input:checked))').length;
  counterElement.textContent = `${count} items left`;
};

updateCounter();

const clearCompleted = () => {
  const elementsToRemove = todosElement.querySelectorAll('.todo:has(input:checked)');
  for (const elementToRemove of elementsToRemove) {
    todosElement.removeChild(elementToRemove);
  }
  saveTodos();
};

//events
loadTodos();

todosElement.addEventListener('click', (event) => {
  if (event.target.classList.contains('todo--remove')) {
    deleteTodo(event.target);
  }
  updateCounter();
  saveTodos();
});

inputElement.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    if (event.target.value !== '') {
      createTodo(event.target.value);
      event.target.value = '';
    }
  }
});

filterElement.addEventListener('change', (event) => {
  todosElement.dataset.filter = event.target.value;
});

clearElement.addEventListener('click', clearCompleted);
