<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import IconInbox from "./icons/IconInbox.vue";
import IconCalendar from "./icons/IconCalendar.vue";
import IconList from "./icons/IconList.vue";
import IconAdd from "./icons/IconAdd.vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  lists: {
    type: [Object],
  },
});

const input = ref("");

const emit = defineEmits(["newList"]);

const handleSubmit = () => {
  if (!input.value) return;
  emit("newList", input.value);
  input.value = "";
};
</script>

<template>
  <aside>
    <ul class="lists">
      <li class="inbox">
        <span class="icon"><IconInbox /></span>
        <RouterLink to="/app/list/inbox">Inbox</RouterLink>
      </li>
      <li class="today">
        <span class="icon"><IconCalendar /></span>
        <RouterLink to="/app/today">Today</RouterLink>
      </li>
      <li v-for="list in lists" :key="list.id" class="user-defined">
        <span class="icon"><IconList /></span>
        <RouterLink :to="`/app/list/${list.id}`">{{ list.title }}</RouterLink>
      </li>
    </ul>
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
  </aside>
</template>

<style scoped>
aside {
  display: block;
  width: 270px;
  background-color: var(--color-bg-sidebar);
  box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.15);
  padding: var(--gutter-md) var(--gutter-sm);
  visibility: visible;
  transform: translate3d(0, 0, 0);
  transition: width 0.3s ease, transform 0.3s ease;
}

.sidebar-open aside {
  width: 270px;
  padding: var(--gutter-md) var(--gutter-sm);
  visibility: visible;
  transform: translate3d(0, 0, 0);
  transition: width 0.3s ease, transform 0.3s ease;
}

.sidebar-closed aside {
  width: 0;
  padding: 0;
  visibility: hidden;
  transform: translate3d(-300px, 0, 0);
  transition: width 0.3s ease, transform 0.3s ease;
}

.lists {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  padding-top: var(--gutter-xxs);
  padding-bottom: var(--gutter-xxs);
  padding-left: var(--gutter-sm);
  padding-right: var(--gutter-sm);
  margin-bottom: var(--gutter-xxs);
  background-color: var(--color-bg-sidebar);
  border: 1px solid var(--color-bg-sidebar);
  display: flex;
  align-items: center;
  gap: var(--gutter-xxs);
}

li a {
  text-decoration: none;
  display: block;
}

li span.icon {
  display: inline-block;
  width: 30px;
  height: 24px;
}

li.inbox span.icon svg,
li.user-defined span.icon svg {
  width: 24px;
  height: 24px;
}
li.today span.icon {
  width: 28px;
  padding-left: 3px;
}
li.today span.icon svg {
  width: 18px;
  height: 21px;
}
li:has(.router-link-active) {
  background-color: var(--color-bg-list-active);
  border: 1px solid var(--color-bg-list-active);
  border-radius: 4px;
}

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
