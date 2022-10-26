<script setup>
import { ref } from "vue";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
import { useListStore } from "../stores/ListStore";
import { useTodoStore } from "../stores/TodoStore";
import EditPane from "../components/EditPane.vue";
import AppSidebar from "../components/AppSidebar.vue";
import AddTodo from "../components/AddTodo.vue";
import TodoItem from "../components/TodoItem.vue";
import CompletedCount from "../components/CompletedCount.vue";

const { globalState } = useSidebarOpen();

const editPaneKey = ref(0);

const listStore = useListStore();
listStore.fetchLists();

const todoStore = useTodoStore();
todoStore.fetchTodos();

const addNewList = (value) => {
  listStore.addList(value);
};

const addNewTodo = (value) => {
  const today = new Date().toLocaleDateString("en-CA");
  todoStore.addTodo(value, "inbox", today);
  editPaneKey.value += 1;
};

const toggleItem = (itemId) => {
  todoStore.setCurrentTodo(itemId);
  todoStore.toggleCompleted();
  todoStore.fetchTodos();
};

const deleteItem = () => {
  todoStore.setEditMode(false);
  todoStore.deleteTodo();
};

const editItem = (itemId) => {
  todoStore.setCurrentTodo(itemId);
  todoStore.setEditMode(true);
};

const closeEditPane = () => {
  todoStore.setEditMode(false);
  todoStore.fetchTodos();
};

const getListTitle = (listId) => {
  const theList = listStore.lists.filter((list) => list.id === listId).pop();
  if (theList !== undefined) {
    return theList.title;
  } else {
    return "inbox";
  }
};
</script>

<template>
  <div class="wrapper" :class="globalState ? 'sidebar-open' : 'sidebar-closed'">
    <AppSidebar :lists="listStore.lists" @newList="addNewList" />
    <main id="main">
      <div class="main-content">
        <header>
          <h1>Today</h1>
        </header>
        <div class="todo-main">
          <div class="todo-items">
            <AddTodo @newTodo="addNewTodo" />
            <TodoItem
              v-for="item in todoStore.todosOpenToday()"
              :key="item.id"
              :item="item"
              :listTitle="getListTitle(item.listId)"
              @toggleCompleted="toggleItem"
              @editTodo="editItem"
            />
          </div>
          <div v-if="todoStore.todosClosedToday().length" class="todo-items">
            <CompletedCount :count="todoStore.todosClosedToday().length" />
            <TodoItem
              v-for="item in todoStore.todosClosedToday()"
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
