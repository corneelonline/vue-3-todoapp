<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppSidebar from "./components/AppSidebar.vue";
import { useSidebarOpen } from "./composables/useSidebarOpen.js";
const { isSidebarOpen } = useSidebarOpen();
</script>

<template>
  <div class="page">
    <AppHeader />
    <div
      class="wrapper"
      :class="isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'"
    >
      <AppSidebar />
      <main id="main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.wrapper {
  display: flex;
  min-height: calc(100vh - 50px);
}
#main {
  background-color: var(--color-bg-body);
  padding: var(--gutter-md);
}
.sidebar-open #main {
  width: calc(100% - 270px);
}
.sidebar-closed #main {
  width: 100%;
}
</style>
