<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  btnClass: {
    type: String,
  },
  btnType: {
    type: String,
  },
});
</script>

<template>
  <button :class="btnClass" :type="btnType"><slot /></button>
</template>

<style scoped>
button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: var(--gutter-xxs) var(--gutter-sm);
  border-radius: 4px;
  cursor: pointer;
}

button.submit {
  background-color: var(--color-bg-button-primary);
  color: var(--color-text-inverted);
}
button.cancel {
  background-color: var(--color-bg-button-secondary);
}
button.delete {
  background-color: var(--color-bg-button-warning);
  color: var(--color-text-inverted);
}
button.icon {
  background-color: transparent;
  width: 30px;
  padding: var(--gutter-xxs);
  border-radius: 0;
}
</style>
