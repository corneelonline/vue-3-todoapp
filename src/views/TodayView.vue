<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { v4 as uuid } from "uuid";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
import { useListsStore } from "../stores/lists";
import { useTodosStore } from "../stores/todos";
import EditPane from "../components/EditPane.vue";
import AppSidebar from "../components/AppSidebar.vue";
import AddTodo from "../components/AddTodo.vue";
import TodoItem from "../components/TodoItem.vue";
import CompletedCount from "../components/CompletedCount.vue";

const { globalState } = useSidebarOpen();

const editPaneKey = ref(0);

const listsStore = useListsStore();
const { lists } = storeToRefs(listsStore);
const { fetchLists, addList } = listsStore;
fetchLists();

const todosStore = useTodosStore();
const { todo, todosOpen, todosClosed } = storeToRefs(todosStore);
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
  const today = new Date().toLocaleDateString("en-CA");
  const newTodo = {
    id: uuid(),
    title: value,
    completed: false,
    dueDate: today,
    notes: "",
    listId: "inbox",
  };
  addTodo(newTodo);
  editPaneKey.value += 1;
};

const toggleItem = (itemId) => {
  fetchTodo(itemId);
  toggleCompleted();
  fetchTodosOfToday();
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

const getListTitle = (listId) => {
  const theList = lists.value.filter((list) => list.id === listId).pop();
  if (theList !== undefined) {
    return theList.title;
  } else {
    return "inbox";
  }
};
</script>

<template>
  <div class="wrapper" :class="globalState ? 'sidebar-open' : 'sidebar-closed'">
    <AppSidebar :lists="lists" @newList="addNewList" />
    <main id="main">
      <div class="main-content">
        <header>
          <h1>Today</h1>
        </header>
        <div class="todo-main">
          <div class="todo-items">
            <AddTodo @newTodo="addNewTodo" />
            <TodoItem
              v-for="item in todosOpen"
              :key="item.id"
              :item="item"
              :listTitle="getListTitle(item.listId)"
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
              :listTitle="getListTitle(item.listId)"
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
