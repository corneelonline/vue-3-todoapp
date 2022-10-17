<script setup>
import IconChecked from "../icons/IconChecked.vue";
import IconUnchecked from "../icons/IconUnchecked.vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  checked: {
    type: Boolean,
  },
});
</script>

<template>
  <label for="todo-completed" class="todo-toggle">
    <input
      @input="(event) => $emit('update:checked', event.target.checked)"
      type="checkbox"
      :checked="checked"
      name="todo-completed"
      id="todo-completed"
    />
    <IconChecked v-if="checked" />
    <IconUnchecked v-else />
  </label>
</template>

<style scoped>
.todo-toggle {
  width: 16px;
  height: 16px;
}
</style>
