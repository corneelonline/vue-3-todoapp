<script setup>
import IconChecked from "./icons/IconChecked.vue";
import IconClose from "./icons/IconClose.vue";

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
</script>

<template>
  <div class="modal-overlay">
    <form name="edit-todo" class="modal" @submit.prevent="submitForm">
      <fieldset class="modal__header">
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
          <span class="todo-item__close" @click="closeModal">
            <IconClose />
          </span>
        </div>
      </fieldset>
      <fieldset class="modal__body">
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
      <fieldset class="modal__footer">
        <div class="button-group">
          <button class="submit" type="submit">Save</button>
          <button class="cancel" type="reset" @click="closeModal">
            Cancel
          </button>
        </div>
        <button class="delete" @click.prevent="deleteTodo">Delete</button>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black-overlay);
  z-index: 20;
}

.modal {
  background-color: var(--color-bg-modal-card);
  height: 500px;
  width: 500px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

fieldset {
  padding: var(--gutter-md);
}

.modal__header {
  background-color: var(--color-bg-modal-header);
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

.modal__body {
  background-color: var(--color-bg-modal-body);
  border-top: 2px solid var(--color-border-fieldset);
  border-bottom: 2px solid var(--color-border-fieldset);
  flex-grow: 1;
}

.fieldgroup {
  border: 1px solid var(--color-border-fieldgroup);
  border-radius: 4px;
}

.fieldgroup:not(:last-child) {
  margin-bottom: var(--gutter-md);
}

.fieldgroup .field {
  padding: var(--gutter-sm);
}

.fieldgroup .field:not(:last-child) {
  border-bottom: 1px solid var(--color-border-fieldgroup);
}

label {
  display: inline-block;
  width: 40px;
}

input[type="date"],
select {
  border: 1px dotted blue;
  width: calc(100% - 40px);
}

.modal__footer {
  background-color: var(--color-bg-modal-header);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  justify-content: space-between;
}

.button-group {
  display: flex;
  gap: var(--gutter-xs);
}

button {
  display: inline-block;
  padding: var(--gutter-xxs) var(--gutter-sm);
  border-radius: 4px;
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
</style>
