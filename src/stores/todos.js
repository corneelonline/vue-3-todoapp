import { defineStore } from "pinia";
import { todos } from "@/data";

export const useTodosStore = defineStore({
  id: "todo",
  state: () => ({
    todos: [],
    todo: null,
    error: null,
    editMode: false,
  }),
  getters: {
    getTodosPerList: (state) => {
      const listsStore = useListsStore();
      return state.todos.filter((todo) => todo.listId === listsStore.list.id);
    },
  },
  actions: {
    async fetchTodos(listId) {
      this.todos = [];
      try {
        this.todos = [...todos].filter((todo) => todo.listId === listId);
      } catch (error) {
        this.error = error;
      }
    },
    async fetchTodo(id) {
      this.todo = null;
      try {
        this.todo = this.todos.filter((todo) => todo.id === id).pop();
      } catch (error) {
        this.error = error;
      }
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
