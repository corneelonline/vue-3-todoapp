import { defineStore, acceptHMRUpdate } from "pinia";
import { v4 as uuid } from "uuid";

const currentDate = new Date().toJSON().slice(0, 10);

export const useTodoStore = defineStore("TodoStore", {
  state: () => {
    return {
      todos: [],
      currentTodo: {},
      editMode: false,
    };
  },
  getters: {
    todosOpenToday: (state) => {
      return () =>
        state.todos.filter(
          (todo) => todo.dueDate === currentDate && todo.completed === false
        );
    },
    todosClosedToday: (state) => {
      return () =>
        state.todos.filter(
          (todo) => todo.dueDate === currentDate && todo.completed === true
        );
    },
    todosOpen: (state) => {
      return (listId) =>
        state.todos.filter(
          (todo) => todo.listId === listId && todo.completed === false
        );
    },
    todosClosed: (state) => {
      return (listId) =>
        state.todos.filter(
          (todo) => todo.listId === listId && todo.completed === true
        );
    },
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
    async fetchTodos() {
      this.todos = (await import("@/data/todos.json")).default;
    },
    setCurrentTodo(id) {
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
