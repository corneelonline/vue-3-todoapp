<script setup>
import { computed } from "vue";
import { toRefs } from "vue";
import IconChecked from "./icons/IconChecked.vue";
import IconUnchecked from "./icons/IconUnchecked.vue";

const props = defineProps({
  item: {
    type: Object,
  },
  listTitle: {
    type: String,
    default: "",
  },
});
const { item } = toRefs(props);

const dueDateLocale = computed(() =>
  new Date(item.value.dueDate).toLocaleDateString("nl-NL")
);

const emit = defineEmits(["toggleCompleted", "editTodo"]);

const toggleTodo = () => {
  emit("toggleCompleted", item.value.id);
};
const editPane = () => {
  emit("editTodo", item.value.id);
};
</script>

<template>
  <div class="todo-item" :class="item.completed ? 'completed ' : null">
    <span class="todo-item__check" @click="toggleTodo">
      <IconChecked v-if="item.completed" />
      <IconUnchecked v-else />
    </span>
    <span class="todo-item__title" @click="editPane">{{ item.title }}</span>
    <span v-if="listTitle" class="todo-item__list">{{ listTitle }}</span>
    <span v-if="item.dueDate" class="todo-item__date">{{ dueDateLocale }}</span>
  </div>
</template>

<style scoped>
.todo-item {
  background-color: var(--color-bg-todoitem);
  border: 1px solid var(--color-bg-todoitem);
  border-radius: 4px;
  padding: var(--gutter-xs) var(--gutter-sm);
  margin-bottom: var(--gutter-xxs);
  display: flex;
  align-items: center;
  gap: var(--gutter-xs);
}

.todo-item span {
  display: block;
}

.todo-item__check {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-item__title {
  flex: 1 0 auto;
  cursor: pointer;
}

.todo-item__date {
  font-size: 13px;
  color: var(--color-text-highlighted);
}

.todo-item__list {
  background-color: var(--color-bg-todo-label);
  color: var(--color-text-inverted);
  font-size: 75%;
  padding: 2px var(--gutter-xxs);
  border-radius: 2px;
}

.todo-item.completed {
  opacity: 0.7;
}

.todo-item.completed span {
  text-decoration: line-through;
}
</style>
