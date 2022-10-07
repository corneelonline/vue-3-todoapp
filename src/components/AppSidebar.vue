<script setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
import { useListsStore } from "../stores/lists";
import IconInbox from "./icons/IconInbox.vue";
import IconCalendar from "./icons/IconCalendar.vue";
import IconList from "./icons/IconList.vue";

// the sidebar toggle menu
const { globalState } = useSidebarOpen();

// get the lists
const listsStore = useListsStore();
const { lists, error } = storeToRefs(listsStore);
const { fetchLists, addList } = listsStore;

fetchLists();

// add a new todo
const addNewList = (value) => {
  addList(value);
};
</script>

<template>
  <aside :class="globalState ? 'expanded' : 'collapsed'">
    <div v-if="error">{{ error.message }}</div>
    <ul v-if="lists" class="lists">
      <li class="inbox">
        <span class="icon"><IconInbox /></span>
        <RouterLink to="/app/list/inbox">Inbox</RouterLink>
      </li>
      <li class="today">
        <span class="icon"><IconCalendar /></span>
        <RouterLink to="/app/today">Today</RouterLink>
      </li>
      <li v-for="list in lists" :key="list.id" class="user-defined">
        <span class="icon"><IconList /></span>
        <RouterLink :to="`/app/list/${list.id}`">{{ list.title }}</RouterLink>
      </li>
    </ul>
    <AddList @newList="addNewList" />
  </aside>
</template>

<style scoped>
aside {
  display: block;
  width: 270px;
  background-color: var(--color-bg-sidebar);
  box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.15);
  padding: var(--gutter-md) var(--gutter-sm);
  visibility: visible;
  transform: translate3d(0, 0, 0);
  transition: width 0.3s ease, transform 0.3s ease;
}
aside.collapsed {
  width: 0;
  padding: 0;
  visibility: hidden;
  transform: translate3d(-300px, 0, 0);
  transition: width 0.3s ease, transform 0.3s ease;
}
.lists {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  padding-top: var(--gutter-xxs);
  padding-bottom: var(--gutter-xxs);
  padding-left: var(--gutter-sm);
  padding-right: var(--gutter-sm);
  margin-bottom: var(--gutter-xxs);
  background-color: var(--color-bg-sidebar);
  border: 1px solid var(--color-bg-sidebar);
  display: flex;
  align-items: center;
  gap: var(--gutter-xxs);
}

li a {
  text-decoration: none;
  display: block;
}

li span.icon {
  display: inline-block;
  width: 30px;
  height: 24px;
}

li.inbox span.icon svg,
li.user-defined span.icon svg {
  width: 24px;
  height: 24px;
}
li.today span.icon {
  width: 28px;
  padding-left: 3px;
}
li.today span.icon svg {
  width: 18px;
  height: 21px;
}
li:has(.router-link-active) {
  background-color: var(--color-bg-list-active);
  border: 1px solid var(--color-bg-list-active);
  border-radius: 4px;
}
</style>
