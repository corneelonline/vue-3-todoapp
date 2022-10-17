<script setup>
import { ref } from "vue";
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
const currListId = ref({});
const listNotFound = ref(false);

currListId.value = route.params.id;

const listsStore = useListsStore();
const { lists } = storeToRefs(listsStore);
const { fetchLists, addList } = listsStore;
fetchLists();

const todosStore = useTodosStore();
const { todos, todo } = storeToRefs(todosStore);
const { fetchTodosOfToday } = todosStore;
const { addTodo, fetchTodo, toggleCompleted, setEditMode, deleteTodo } =
  todosStore;
fetchTodosOfToday();

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

const deleteItem = () => {
  showEditPane.value = false;
  deleteTodo();
};

// open edit pane
const showEditPane = ref(false);
const editItem = (itemId) => {
  fetchTodo(itemId);
  showEditPane.value = true;
  setEditMode(true);
};
const closeEditPane = () => {
  showEditPane.value = false;
  fetchTodosOfToday();
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
          <h1>Today</h1>
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
      @close-modal="closeEditPane"
      @delete-todo="deleteItem"
      :lists="lists"
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
