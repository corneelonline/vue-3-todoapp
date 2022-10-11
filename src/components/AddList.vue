<script setup lang="ts">
import { ref } from "vue";
import IconAdd from "./icons/IconAdd.vue";

const input = ref("");

const emit = defineEmits(["newList"]);

const handleSubmit = () => {
  if (!input.value) return;
  emit("newList", input.value);
  input.value = "";
};
</script>

<template>
  <form class="add-list" @submit.prevent="handleSubmit">
    <div class="form-field">
      <label for="new-list" class="icon"><IconAdd /></label>
      <input
        type="text"
        name="new-list"
        id="new-list"
        placeholder="Add a list..."
        v-model="input"
      />
    </div>
  </form>
</template>

<style scoped>
form.add-list .form-field {
  display: flex;
  align-items: center;
  padding-left: var(--gutter-sm);
}
form.add-list label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 24px;
}
form.add-list label svg {
  width: 24px;
  height: 24px;
}
form.add-list input {
  width: 100%;
  padding-top: var(--gutter-xxs);
  padding-bottom: var(--gutter-xxs);
  padding-left: var(--gutter-xs);
  padding-right: var(--gutter-sm);
}

form.add-list input::placeholder {
  color: var(--color-text-lighter);
}

form.add-list input:focus {
  background-color: var(--color-bg-list-active);
  border: 1px solid var(--color-bg-list-active);
  border-radius: 4px;
  background-image: none;
  padding-left: var(--gutter-sm);
}

form.add-list input:focus ::placeholder {
  visibility: hidden;
}
</style>
