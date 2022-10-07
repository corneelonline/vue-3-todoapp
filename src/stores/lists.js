import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { todoLists } from "../data.js";

export const useListsStore = defineStore("list", () => {
  const lists = ref([]);
  const list = ref({});
  const error = ref({});
  const getAll = computed(() => lists);
  async function fetchLists() {
    lists.value = [];
    try {
      lists.value = [...todoLists];
    } catch (error) {
      error.value = error;
    }
  }
  async function fetchList(id) {
    list.value = null;
    try {
      list.value = lists.value.filter((list) => list.id === id).pop();
    } catch (error) {
      error.value = error;
    }
  }
  function addList(title) {
    lists.value.push({ title: title, id: uuid() });
  }

  return { lists, list, error, getAll, fetchLists, fetchList, addList };
});
