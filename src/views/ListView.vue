<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
import { useListStore } from "../stores/ListStore";
import { useTodosStore } from "../stores/todos";
import EditPane from "../components/EditPane.vue";
import AppSidebar from "../components/AppSidebar.vue";
import AddTodo from "../components/AddTodo.vue";
import TodoItem from "../components/TodoItem.vue";
import CompletedCount from "../components/CompletedCount.vue";

const { globalState } = useSidebarOpen();

const route = useRoute();
const currListId = ref({});
const listNotFound = ref(false);
const editPaneKey = ref(0);

currListId.value = route.params.id;
// console.log(currListId.value);

const listStore = useListStore();
listStore.fetchLists();
listStore.setCurrentList(currListId.value);

const todosStore = useTodosStore();
const { todo, todosOpen, todosClosed } = storeToRefs(todosStore);
const {
  addTodo,
  fetchTodos,
  fetchTodo,
  toggleCompleted,
  setEditMode,
  deleteTodo,
} = todosStore;
fetchTodos(currListId.value);

// reload list and todos data on route change
watch(
  () => route.params.id,
  async (newId) => {
    currListId.value = newId;
    // console.log(currListId.value);
    listStore.setCurrentList(currListId.value);
    fetchTodos(currListId.value);
  }
);

// add a new list
const addNewList = (value) => {
  listStore.addList(value);
};

// add a new todo
const addNewTodo = (value) => {
  addTodo(value, currListId.value);
  editPaneKey.value += 1;
};

const toggleItem = (itemId) => {
  fetchTodo(itemId);
  toggleCompleted();
  fetchTodos(currListId.value);
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
  fetchTodos(currListId.value);
};
</script>

<template>
  <div class="wrapper" :class="globalState ? 'sidebar-open' : 'sidebar-closed'">
    <AppSidebar :lists="listStore.lists" @newList="addNewList" />
    <main id="main">
      <div v-if="listNotFound" class="warning">
        <header>
          <h1>List not found</h1>
        </header>
        <p>
          The list you are looking for cannot be found. Please check if the URL
          is correct and try again.
        </p>
      </div>
      <div v-else class="main-content">
        <header>
          <h1>{{ listStore.currentListTitle }}</h1>
        </header>
        <div class="todo-main">
          <div class="todo-items">
            <AddTodo @newTodo="addNewTodo" />
            <TodoItem
              v-for="item in todosOpen"
              :key="item.id"
              :item="item"
              @toggleCompleted="toggleItem"
              @editTodo="editItem"
            />
          </div>
          <div class="todo-items">
            <CompletedCount :count="todosClosed.length" />
            <TodoItem
              v-for="item in todosClosed"
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
      :currListId="currListId"
      :key="editPaneKey"
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

.todo-items {
  margin-bottom: var(--gutter-md);
}
</style>
