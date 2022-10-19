<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  count: {
    type: Number,
  },
});
// const count = ref(props.count);
</script>

<template>
  <div class="completed-count">
    {{ count }}
    <span v-if="count === 1"> completed to-do</span>
    <span v-else> completed to-dos</span>
  </div>
</template>

<style scoped>
.completed-count {
  display: inline-block;
  color: var(--color-text-inverted);
  text-transform: uppercase;
  font-size: 90%;
  background-color: var(--color-bg-dark);
  border: 1px solid transparent;
  border-radius: 4px;
  opacity: 0.6;
  padding: var(--gutter-xxs) var(--gutter-xs);
  margin-bottom: var(--gutter-sm);
}
</style>
