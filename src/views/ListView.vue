<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import AppSidebar from "../components/AppSidebar.vue";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
import { useListsStore } from "../stores/lists";

const { globalState } = useSidebarOpen();

const route = useRoute();

// get the lists
const listsStore = useListsStore();
const { list, lists } = storeToRefs(listsStore);
const { fetchLists, fetchList, addList } = listsStore;
fetchLists();

// get the title of this list
let listNotFound = false;
const pageTitle = computed(() => {
  if (route.params.id === "inbox") {
    return "Inbox";
  } else {
    fetchList(route.params.id);
    if (list.value) {
      return list.value.title;
    } else {
      listNotFound = true;
      return "List not found";
    }
  }
});

// add a new list
const addNewList = (value) => {
  addList(value);
};
</script>

<template>
  <div class="wrapper" :class="globalState ? 'sidebar-open' : 'sidebar-closed'">
    <AppSidebar :lists="lists" @newList="addNewList" />
    <main id="main">
      <div v-if="listNotFound" class="warning">
        The list you are looking for cannot be found.
      </div>
      <template v-else>
        <h1>{{ pageTitle }}</h1>
        <p>Hier komen de todos...</p>
      </template>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  min-height: calc(100vh - 50px);
}
#main {
  background-color: var(--color-bg-body);
  padding: var(--gutter-md);
}
.sidebar-open #main {
  width: calc(100% - 270px);
}
.sidebar-closed #main {
  width: 100%;
}
</style>
