<script setup>
import IconChecked from "./icons/IconChecked.vue";
import IconClose from "./icons/IconClose.vue";
import IconRemove from "./icons/IconRemove.vue";
import ModalWindow from "./ModalWindow.vue";
import FormButton from "./form/FormButton.vue";

const submitForm = () => {
  console.log("SUBMIT!!");
};

const toggleTodo = () => {
  console.log("toggleTodo!!");
};

const closeModal = () => {
  console.log("closeModal!!");
};

const deleteTodo = () => {
  console.log("deleteTodo!!");
};

const clearDueDate = () => {
  console.log("clearDueDate!!");
};
</script>

<template>
  <ModalWindow>
    <form name="edit-todo" @submit.prevent="submitForm">
      <fieldset class="form__header">
        <div class="title-field">
          <span class="todo-item__check" @click="toggleTodo">
            <IconChecked />
          </span>
          <input
            type="text"
            name="title"
            class="todo-title"
            value="Lorem ipsum jalalaa"
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
            <select name="todo-list" id="todo-list">
              <option value="1" selected>Inbox</option>
              <option value="2">Boodschappen</option>
              <option value="3">Thuis</option>
              <option value="4">Persoonlijk</option>
              <option value="5">Werk</option>
              <option value="6">Nog lezen</option>
            </select>
          </div>
          <div class="field">
            <label for="todo-date">Due:</label>
            <input
              type="date"
              name="todo-date"
              id="todo-date"
              value="2022-10-19"
            />
            <FormButton class="icon" @click="clearDueDate">
              <IconRemove iconColor="#202020" />
            </FormButton>
          </div>
        </div>
        <div class="fieldgroup">
          <div class="field">
            <textarea
              name="todo-description"
              class="todo-description"
              placeholder="Add a note..."
            ></textarea>
          </div>
        </div>
      </fieldset>
      <fieldset class="form__footer">
        <div class="button-group">
          <FormButton class="submit" type="submit">Save</FormButton>
          <FormButton class="cancel" type="reset" @click="closeModal">
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
  padding: var(--gutter-md);
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
  gap: var(--gutter-sm);
}
.todo-item__check,
.todo-item__close {
  display: block;
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.todo-title {
  flex-grow: 1;
  text-align: left;
  border: 1px dotted red;
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
  border: 1px dotted blue;
  flex-grow: 1;
  /* width: calc(100% - 40px); */
}

input[type="date"] {
  border: 1px dotted blue;
  flex-grow: 1;
  /* width: calc(100% - 40px); */
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
