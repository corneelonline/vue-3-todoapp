import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { todoLists } from "../data.js";

export const useListsStore = defineStore("list", {
  state: () => ({
    lists: [],
    list: {},
    error: "",
  }),
  getters: {
    getAll(state) {
      return state.lists;
    },
    getByListId(state) {
      return (id) => {
        state.lists.filter((list) => list.id === id).pop();
      };
    },
  },
  actions: {
    fetchLists() {
      this.lists = [];
      try {
        this.lists = [...todoLists];
      } catch (error) {
        this.error = error;
      }
    },
    fetchList(id) {
      this.list = null;
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
