import { defineStore, acceptHMRUpdate } from "pinia";

export const useTodoStore = defineStore("TodoStore", {
  state: () => {
    return {
      todos: [],
    };
  },
  actions: {
    async fetchLists() {
      this.todos = (await import("@/data/todos.json")).default;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}
