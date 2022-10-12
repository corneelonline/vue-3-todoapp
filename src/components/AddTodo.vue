<script setup>
import { ref } from "vue";

const input = ref("");

const emit = defineEmits(["newTodo"]);

const handleSubmit = () => {
  if (!input.value) return;
  emit("newTodo", input.value);
  input.value = "";
};
</script>

<template>
  <form class="add-todo" @submit.prevent="handleSubmit">
    <input type="text" placeholder="Add a new todo..." v-model="input" />
  </form>
</template>

<style scoped>
form.add-todo {
  margin-bottom: var(--gutter-md);
}

form.add-todo input {
  width: 100%;
  display: block;
  color: var(--color-text-inverted);
  background-color: var(--color-bg-dark);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: var(--gutter-xs) var(--gutter-sm);
}

form.add-todo input::placeholder {
  color: var(--color-text-inverted);
  opacity: 0.6;
}
</style>
