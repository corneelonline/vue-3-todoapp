<script setup>
import { storeToRefs } from "pinia";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
import { useListsStore } from "../stores/lists";

// the sidebar toggle menu
const { isSidebarOpen } = useSidebarOpen();

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
  <aside :class="isSidebarOpen ? 'expanded' : 'collapsed'">
    <div v-if="error">{{ error.message }}</div>
    <ul v-if="lists" class="lists">
      <li class="inbox">
        <nuxt-link to="/app/list/inbox">Inbox</nuxt-link>
      </li>
      <li class="today">
        <nuxt-link to="/app/today">Today</nuxt-link>
      </li>
      <li v-for="list in lists" :key="list.id" class="user-defined">
        <nuxt-link :to="`/app/list/${list.id}`">{{ list.title }}</nuxt-link>
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
  padding-left: var(--gutter-md-plus);
  padding-right: var(--gutter-sm);
  margin-bottom: var(--gutter-xxs);
  background-color: var(--color-bg-sidebar);
  border: 1px solid var(--color-bg-sidebar);
  position: relative;
}

li::before {
  content: "";
  display: block;
  width: 24px;
  height: 24px;
  position: absolute;
  left: var(--gutter-xs);
  top: 6px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

li a {
  text-decoration: none;
  display: block;
}

li.inbox::before {
  background-image: url("~/assets/icons/inbox.svg");
}
li.today::before {
  background-image: url("~/assets/icons/calendar.svg");
}
li.user-defined::before {
  background-image: url("~/assets/icons/list.svg");
}
li:has(.router-link-active) {
  background-color: var(--color-bg-list-active);
  border: 1px solid var(--color-bg-list-active);
  border-radius: 4px;
}
</style>
