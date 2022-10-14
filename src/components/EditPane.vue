<script setup>
// TODO: https://softauthor.com/vue-js-3-composition-api-reusable-scalable-form-validation/
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import IconClose from "./icons/IconClose.vue";
import ModalWindow from "./ModalWindow.vue";
import FormButton from "./form/FormButton.vue";
import TodoToggle from "./form/TodoToggle.vue";
import { useTodosStore } from "../stores/todos";
import { storeToRefs } from "pinia";

const todosStore = useTodosStore();
const { todo } = storeToRefs(todosStore);

const route = useRoute();

const props = defineProps({
  lists: {
    type: [Object],
  },
  currListId: {
    type: String,
  },
});
const lists = ref(props.lists);
const currListId = ref(props.currListId);
watch(
  () => route.params.id,
  async (newId) => {
    currListId.value = newId;
  }
);

const dueDateLocale = ref(todo.dueDate);

const onChangeDate = (event) => {
  console.log(event.target.value);
  const theDate = new Date(event.target.value);
  const options = {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  dueDateLocale.value = theDate.toLocaleDateString("nl-NL", options);
};

const emit = defineEmits(["closeModal"]);

const submitForm = () => {
  console.log("SUBMIT!!");
};

const closeModal = () => {
  emit("closeModal");
};

const deleteTodo = () => {
  console.log("deleteTodo!!");
};
</script>

<template>
  <ModalWindow>
    <form name="edit-todo" @submit.prevent="submitForm">
      <fieldset class="form__header">
        <div class="title-field" :class="todo.completed ? 'done' : ''">
          <TodoToggle v-model:checked="todo.completed" />
          <input
            type="text"
            name="title"
            class="todo-title"
            :value="todo.title"
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
            <select name="todo-list" id="todo-list" v-model="currListId">
              <option value="inbox">Inbox</option>
              <option v-for="list in lists" :value="list.id" :key="list.id">
                {{ list.title }}
              </option>
            </select>
          </div>
          <div class="field">
            <label for="todo-date">Due:</label>
            <div class="date-field">
              <span class="date-locale">{{ dueDateLocale }}</span>
              <input
                type="date"
                name="todo-date"
                id="todo-date"
                @change="onChangeDate($event)"
                :value="todo.dueDate"
              />
            </div>
          </div>
        </div>
        <div class="fieldgroup">
          <div class="field">
            <textarea
              name="todo-notes"
              class="todo-notes"
              placeholder="Add a note..."
              :value="todo.notes"
            ></textarea>
          </div>
        </div>
      </fieldset>
      <fieldset class="form__footer">
        <div class="button-group">
          <FormButton class="submit" type="submit">Save</FormButton>
          <FormButton class="cancel" type="button" @click="closeModal">
            Cancel
          </FormButton>
        </div>
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
  /* border: 1px dotted blue; */
  flex-grow: 1;
  display: flex;
}

.date-locale {
  border: 1px dotted transparent;
  padding: var(--gutter-xxs) var(--gutter-sm);
  display: block;
  flex-grow: 1;
}

input[type="date"] {
  /* border: 1px dotted red; */
  padding: var(--gutter-xxs) var(--gutter-sm);
  color: var(--color-text-inverted);
  width: 60px;
  overflow: hidden;
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
