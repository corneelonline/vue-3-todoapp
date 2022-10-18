import { defineStore } from "pinia";
import { todos } from "../data.js";

export const useTodosStore = defineStore("todosStore", {
  state: () => ({
    todos: [],
    todosOpen: [],
    todosClosed: [],
    todo: null,
    error: null,
    editMode: false,
  }),
  getter: {
    todosCompleted(state) {
      return (completed) => {
        state.todos.filter((todo) => todo.completed === completed);
      };
    },
  },
  actions: {
    fetchTodos(listId) {
      this.todos = [];
      try {
        this.todos = [...todos].filter((todo) => todo.listId === listId);
        this.todosOpen = this.todos.filter((todo) => todo.completed === false);
        this.todosClosed = this.todos.filter((todo) => todo.completed === true);
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
      this.todosOpen = this.todos.filter((todo) => todo.completed === false);
      this.todosClosed = this.todos.filter((todo) => todo.completed === true);
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
