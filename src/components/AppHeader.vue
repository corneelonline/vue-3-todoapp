<script setup>
import { RouterLink } from "vue-router";
import IconHamburger from "./icons/IconHamburger.vue";
import IconHome from "./icons/IconHome.vue";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
const { globalState, toggleSidebarOpen } = useSidebarOpen();
</script>

<template>
  <header class="app-header">
    <div class="top-menu">
      <label class="toggle">
        <input
          type="checkbox"
          v-model="globalState"
          @click="toggleSidebarOpen"
        />
        <span class="hamburger">
          <IconHamburger />
        </span>
      </label>
      <RouterLink class="top-menu__home" to="/app/today">
        <IconHome />
      </RouterLink>
    </div>
    <div class="profile">MV</div>
  </header>
</template>

<style scoped>
.app-header {
  height: 50px;
  padding-left: var(--gutter-md);
  padding-right: var(--gutter-md);
  background: #ffffff;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.23);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.top-menu {
  display: flex;
  align-items: center;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: var(--gutter-sm);
}

/* Hide default HTML checkbox */
.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}
.hamburger {
  position: absolute;
  cursor: pointer;
  top: 2px;
  left: 0;
  right: 0;
  bottom: 0;
}

.top-menu__home {
  display: inline-block;
  width: 20px;
  height: 21px;
}

.top-menu__home span {
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
