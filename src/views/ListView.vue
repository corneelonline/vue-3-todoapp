<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { v4 as uuid } from "uuid";
import AppSidebar from "../components/AppSidebar.vue";
import AddTodo from "../components/AddTodo.vue";
import TodoItem from "../components/TodoItem.vue";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
import { useListsStore } from "../stores/lists";
import { useTodosStore } from "../stores/todos";

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

// get the todos of this list
const todosStore = useTodosStore();
const { todos } = storeToRefs(todosStore);
const { fetchTodos, addTodo, fetchTodo, toggleCompleted, setEditMode } =
  todosStore;
fetchTodos(route.params.id);

// add a new list
const addNewList = (value) => {
  addList(value);
};

// add a new todo
const addNewTodo = (value) => {
  const newTodo = {
    id: uuid(),
    title: value,
    completed: false,
    due_date: "",
    notes: "",
    parent_id: "",
    list_id: route.params.id,
  };
  addTodo(newTodo);
};

const toggleItem = (itemId) => {
  fetchTodo(itemId);
  toggleCompleted();
};

// open edit pane
const editItem = (itemId) => {
  setEditMode(true);
  fetchTodo(itemId);
};
</script>

<template>
  <div class="wrapper" :class="globalState ? 'sidebar-open' : 'sidebar-closed'">
    <AppSidebar :lists="lists" @newList="addNewList" />
    <main id="main">
      <div v-if="listNotFound" class="warning">
        The list you are looking for cannot be found.
      </div>
      <div v-else class="main-content">
        <header>
          <h1>{{ pageTitle }}</h1>
        </header>
        <div class="todo-main">
          <div class="todo-items">
            <AddTodo @newTodo="addNewTodo" />
            <TodoItem
              v-for="item in todos"
              :key="item.id"
              :item="item"
              @toggleCompleted="toggleItem"
              @editTodo="editItem"
            />
          </div>
        </div>
      </div>
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

h1 {
  font-size: 1.5rem;
}
</style>
