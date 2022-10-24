<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
import { useListStore } from "../stores/ListStore";
import { useTodoStore } from "../stores/TodoStore";
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

const listStore = useListStore();
listStore.fetchLists().then(() => {
  listStore.setCurrentList(currListId.value);
});

const todoStore = useTodoStore();
todoStore.fetchTodos(currListId.value);

// reload list and todos data on route change
watch(
  () => route.params.id,
  async (newId) => {
    currListId.value = newId;
    listStore.setCurrentList(currListId.value);
    todoStore.fetchTodos(currListId.value);
  }
);

const addNewList = (value) => {
  listStore.addList(value);
};

const addNewTodo = (value) => {
  todoStore.addTodo(value, currListId.value);
  editPaneKey.value += 1;
};

const toggleItem = (itemId) => {
  // console.log("itemId: " + itemId);
  todoStore.setCurrenTodo(itemId);
  todoStore.toggleCompleted();
  todoStore.fetchTodos(currListId.value);
};

const deleteItem = () => {
  todoStore.setEditMode(false);
  todoStore.deleteTodo();
};

const editItem = (itemId) => {
  todoStore.setCurrenTodo(itemId);
  todoStore.setEditMode(true);
};

const closeEditPane = () => {
  todoStore.setEditMode(false);
  todoStore.fetchTodos(currListId.value);
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
              v-for="item in todoStore.todosOpen"
              :key="item.id"
              :item="item"
              @toggleCompleted="toggleItem"
              @editTodo="editItem"
            />
          </div>
          <div v-if="todoStore.todosClosed.length" class="todo-items">
            <CompletedCount :count="todoStore.todosClosed.length" />
            <TodoItem
              v-for="item in todoStore.todosClosed"
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
      v-if="todoStore.currentTodo"
      v-show="todoStore.editMode"
      @close-modal="closeEditPane"
      @delete-todo="deleteItem"
      :lists="listStore.lists"
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
