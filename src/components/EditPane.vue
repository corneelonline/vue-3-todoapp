<script setup>
// TODO: https://softauthor.com/vue-js-3-composition-api-reusable-scalable-form-validation/
// TODO: move form fields to their own components
// https://dev.to/codeclown/styling-a-native-date-input-into-a-custom-no-library-datepicker-2in
import IconClose from "./icons/IconClose.vue";
import ModalWindow from "./ModalWindow.vue";
import FormButton from "./form/FormButton.vue";
import TodoToggle from "./form/TodoToggle.vue";
import { useTodoStore } from "../stores/TodoStore";
import { storeToRefs } from "pinia";
import IconCalendar from "./icons/IconCalendar.vue";
import IconRemove from "./icons/IconRemove.vue";

const todoStore = useTodoStore();
const { currentTodo, currentDateLong } = storeToRefs(todoStore);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  lists: [Object],
});

const emit = defineEmits(["closeModal", "deleteTodo"]);

const clearDueDate = () => {
  currentTodo.value.dueDate = "";
};

const closeModal = () => {
  emit("closeModal");
};

const deleteTodo = () => {
  emit("deleteTodo");
};
</script>

<template>
  <ModalWindow @close="closeModal">
    <form name="edit-todo">
      <fieldset class="form__header">
        <div class="title-field" :class="currentTodo.completed ? 'done' : ''">
          <TodoToggle v-model:checked="currentTodo.completed" />
          <input
            type="text"
            name="title"
            class="todo-title"
            v-model="currentTodo.title"
            required
          />
          <FormButton class="icon" type="button" @click="closeModal">
            <IconClose />
          </FormButton>
        </div>
      </fieldset>
      <fieldset class="form__body">
        <div class="fieldgroup">
          <div class="field">
            <label for="todo-list">List:</label>
            <select
              name="todo-list"
              id="todo-list"
              v-model="currentTodo.listId"
            >
              <option value="inbox">Inbox</option>
              <option v-for="list in lists" :value="list.id" :key="list.id">
                {{ list.title }}
              </option>
            </select>
          </div>
          <div class="field">
            <label for="todo-duedate">Due:</label>
            <div class="date-field">
              <span class="date-locale">{{ currentDateLong }}</span>
              <span class="datepicker-toggle">
                <span class="datepicker-toggle-button"><IconCalendar /></span>
                <input
                  type="date"
                  name="todo-date"
                  id="todo-date"
                  class="datepicker-input"
                  v-model="currentTodo.dueDate"
                />
              </span>
            </div>
            <span class="clear-date" @click="clearDueDate">
              <IconRemove />
            </span>
          </div>
        </div>
        <div class="fieldgroup">
          <div class="field">
            <textarea
              name="todo-notes"
              class="todo-notes"
              placeholder="Add a note..."
              v-model="currentTodo.notes"
            ></textarea>
          </div>
        </div>
      </fieldset>
      <fieldset class="form__footer">
        <FormButton class="close" type="button" @click="closeModal">
          Close
        </FormButton>
        <FormButton class="delete" type="button" @click.prevent="deleteTodo">
          Delete
        </FormButton>
      </fieldset>
    </form>
  </ModalWindow>
</template>

<style scoped>
fieldset {
  padding: var(--gutter-sm);
}

.form__header {
  background-color: var(--color-bg-form-header);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.title-field {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--gutter-xs);
}

.todo-title {
  flex-grow: 1;
  text-align: left;
  padding: var(--gutter-xxs);
  font-weight: var(--fw-bold);
  font-size: 1.25rem;
}

.title-field.done .todo-title {
  text-decoration: line-through;
  color: var(--color-text-lighter);
}

.form__body {
  background-color: var(--color-bg-form-body);
  border-top: 2px solid var(--color-border-fieldset);
  border-bottom: 2px solid var(--color-border-fieldset);
  flex-grow: 1;
}

.fieldgroup {
  border: 1px solid var(--color-border-fieldgroup);
  background-color: var(--color-bg-form-card);
  border-radius: 4px;
}

.fieldgroup:not(:last-child) {
  margin-bottom: var(--gutter-md);
}

.fieldgroup .field {
  padding: var(--gutter-sm);
  display: flex;
  align-items: center;
}

.fieldgroup .field:not(:last-child) {
  border-bottom: 1px solid var(--color-border-fieldgroup);
}

label {
  display: inline-block;
  width: 40px;
}
select {
  flex-grow: 1;
  background-color: var(--color-bg-form-select);
  background-image: url("@/assets/images/icon-select.svg");
  background-position: 95% center;
  background-repeat: no-repeat;
  border: 1px dotted var(--color-bg-form-select);
  border-radius: 4px;
  padding: var(--gutter-xxs) var(--gutter-sm);
}

.date-field {
  flex-grow: 1;
  display: flex;
  padding: var(--gutter-xxs) var(--gutter-sm);
}
.datepicker-toggle {
  display: inline-block;
  position: relative;
  width: 18px;
  height: 24px;
}
.datepicker-toggle-button {
  position: absolute;
  left: 0;
  top: 2px;
  width: 100%;
  height: 100%;
}

.date-locale {
  border: 1px dotted transparent;
  display: block;
  flex-grow: 1;
  height: 1.5rem;
}

.datepicker-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  box-sizing: border-box;
}
.datepicker-input::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.clear-date {
  display: inline-flex;
}

textarea {
  width: 100%;
}

textarea::placeholder {
  color: var(--color-text-lighter);
}
.form__footer {
  background-color: var(--color-bg-form-header);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  justify-content: space-between;
}

.button-group {
  display: flex;
  gap: var(--gutter-xs);
}
</style>
