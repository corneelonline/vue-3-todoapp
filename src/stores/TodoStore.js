import { defineStore, acceptHMRUpdate } from "pinia";
import { v4 as uuid } from "uuid";

export const useTodoStore = defineStore("TodoStore", {
  state: () => {
    return {
      todos: [],
      currentTodo: {},
      editMode: false,
    };
  },
  getters: {
    todosOpen: (state) =>
      state.todos.filter((todo) => todo.completed === false),
    todosClosed: (state) =>
      state.todos.filter((todo) => todo.completed === true),
    currentDateLong: (state) => {
      const dateOptions = {
        timeZone: "UTC",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      if (state.currentTodo.dueDate) {
        const theDate = new Date(state.currentTodo.dueDate);
        return theDate.toLocaleDateString("nl-NL", dateOptions);
      } else {
        return null;
      }
    },
  },
  actions: {
    async fetchTodos(listId) {
      const todos = (await import("@/data/todos.json")).default;
      this.todos = todos.filter((todo) => todo.listId === listId);
    },
    async fetchTodosOfToday() {
      const currentDate = new Date().toJSON().slice(0, 10);
      const todos = (await import("@/data/todos.json")).default;
      this.todos = todos.filter((todo) => todo.dueDate === currentDate);
    },
    setCurrenTodo(id) {
      this.currentTodo = this.todos.filter((todo) => todo.id === id).pop();
    },
    clearTodo() {
      this.todo = null;
    },
    addTodo(title, listId, today) {
      this.todos.push({
        id: uuid(),
        title: title,
        completed: false,
        dueDate: today,
        notes: "",
        listId: listId,
      });
    },
    toggleCompleted() {
      if (this.currentTodo.completed === true) {
        this.currentTodo.completed = false;
      } else {
        this.currentTodo.completed = true;
      }
    },
    deleteTodo() {
      if (this.todo) {
        const index = this.todos.indexOf(this.todo);
        this.todos.splice(index, 1);
      }
    },
    setEditMode(value) {
      this.editMode = value;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}
