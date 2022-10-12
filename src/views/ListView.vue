<script setup>
import AppSidebar from "../components/AppSidebar.vue";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
import { useListsStore } from "../stores/lists";

const { globalState } = useSidebarOpen();

// get the lists
const listsStore = useListsStore();
const { fetchLists, addList } = listsStore;
fetchLists();

// add a new list
const addNewList = (value) => {
  addList(value);
};
</script>

<template>
  <div class="wrapper" :class="globalState ? 'sidebar-open' : 'sidebar-closed'">
    <AppSidebar :lists="listsStore.lists" @newList="addNewList" />
    <main id="main">
      <h1>ListView</h1>
      <pre>{{ listsStore.lists }}</pre>
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
