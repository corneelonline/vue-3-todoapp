import { defineStore, acceptHMRUpdate } from "pinia";
import { v4 as uuid } from "uuid";

export const useListStore = defineStore("ListStore", {
  state: () => {
    return {
      lists: [],
      currentList: {},
    };
  },
  actions: {
    async fetchLists() {
      this.lists = (await import("@/data/lists.json")).default;
    },
    setCurrentList(id) {
      this.currentList = null;
      try {
        this.list = this.lists.filter((list) => list.id === id).pop();
      } catch (error) {
        this.error = error;
      }
    },
    addList(title) {
      this.lists.push({ title: title, id: uuid() });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useListStore, import.meta.hot));
}
