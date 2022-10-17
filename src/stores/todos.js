import { defineStore } from "pinia";
import { todos } from "../data.js";

export const useTodosStore = defineStore("todosStore", {
  state: () => ({
    todos: [],
    todo: null,
    error: null,
    editMode: false,
  }),
  actions: {
    fetchTodos(listId) {
      this.todos = [];
      try {
        this.todos = [...todos].filter((todo) => todo.listId === listId);
      } catch (error) {
        this.error = error;
      }
    },
    fetchTodo(id) {
      this.todo = null;
      try {
        this.todo = this.todos.filter((todo) => todo.id === id).pop();
      } catch (error) {
        this.error = error;
      }
    },
    fetchTodosOfToday() {
      const currentDate = new Date().toJSON().slice(0, 10);
      this.todos = [...todos].filter((todo) => todo.dueDate === currentDate);
    },
    clearTodo() {
      this.todo = null;
    },
    addTodo(todo) {
      this.todos.push(todo);
    },
    toggleCompleted() {
      if (this.todo.completed === true) {
        this.todo.completed = false;
      } else {
        this.todo.completed = true;
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
