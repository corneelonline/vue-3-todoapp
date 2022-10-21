import { defineStore, acceptHMRUpdate } from "pinia";
import { v4 as uuid } from "uuid";

export const useListStore = defineStore("ListStore", {
  state: () => {
    return {
      lists: [],
      currentList: {},
    };
  },
  getters: {
    currentListTitle: (state) => state.currentList.title,
  },
  actions: {
    async fetchLists() {
      this.lists = [...(await import("@/data/lists.json")).default];
    },
    setCurrentList(id) {
      console.log("setCurrentList: " + id);
      if (id === "inbox") {
        this.currentList = { id: id, title: "Inbox" };
      } else {
        this.currentList = this.lists.filter((list) => list.id === id).pop();
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
