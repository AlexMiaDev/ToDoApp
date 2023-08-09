const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const app = Vue.createApp({
      data() {
        return {
          input:"",
          todos,
          filter:""
        };
      },
      computed: {
        counter() {
          return this.todos.filter(todo => !todo.done).length
        },
        todosView() {
          if (this.filter === "active") {
            return this.todos.filter(todo => !todo.done);
          }
          if (this.filter === "done") {
            return this.todos.filter(todo => todo.done);
          }

          return this.todos;
        }
      },
      methods: {
        createTodo () {
          if (app.input) {
            app.todos.unshift({text: app.input, done: false}),
            app.input = "";
          }
        },
        removeTodo (index) {
          app.todos.splice(index, 1);
        },
        clearCompleted() {
          app.todos = this.todos.filter(todo => !todo.done);
        },
        saveTodos () {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
      },
      watch: {
        todos: {
          deep: true,
          handler() {
            this.saveTodos();
          },
        },
      },
    }).mount("#app");
