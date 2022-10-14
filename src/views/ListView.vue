<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { v4 as uuid } from "uuid";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
import { useListsStore } from "../stores/lists";
import { useTodosStore } from "../stores/todos";
import EditPane from "../components/EditPane.vue";
import AppSidebar from "../components/AppSidebar.vue";
import AddTodo from "../components/AddTodo.vue";
import TodoItem from "../components/TodoItem.vue";

const { globalState } = useSidebarOpen();

const route = useRoute();
const pageTitle = ref();
const currListId = ref({});
const listNotFound = ref(false);

currListId.value = route.params.id;
// console.log("init currListId: " + currListId.value);

const listsStore = useListsStore();
const { lists, list } = storeToRefs(listsStore);
const { fetchLists, fetchList, addList } = listsStore;
fetchLists();

const todosStore = useTodosStore();
const { todos, todo } = storeToRefs(todosStore);
const { addTodo, fetchTodos, fetchTodo, toggleCompleted, setEditMode } =
  todosStore;
fetchTodos(currListId.value);

// get the title of this list
function getPageTitle() {
  if (currListId.value === "inbox") {
    pageTitle.value = "Inbox";
  } else {
    fetchList(currListId.value);
    if (list.value) {
      pageTitle.value = list.value.title;
    } else {
      listNotFound.value = true;
      pageTitle.value = "List not found";
    }
  }
}
getPageTitle();

// reload list and todos data on route change
watch(
  () => route.params.id,
  async (newId) => {
    currListId.value = newId;
    getPageTitle();
    fetchList(currListId.value);
    fetchTodos(currListId.value);
  }
);

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
    list_id: currListId,
  };
  addTodo(newTodo);
};

const toggleItem = (itemId) => {
  fetchTodo(itemId);
  toggleCompleted();
};

// open edit pane
const showEditPane = ref(false);
const editItem = (itemId) => {
  console.log("edit itemId: " + itemId);
  fetchTodo(itemId);
  showEditPane.value = true;
  setEditMode(true);
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
    <EditPane
      v-if="todo"
      v-show="showEditPane"
      @close-modal="showEditPane = false"
      :lists="lists"
      :currListId="currListId"
    />
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
