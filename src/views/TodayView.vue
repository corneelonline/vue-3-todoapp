<script setup>
import AppSidebar from "../components/AppSidebar.vue";
import { useSidebarOpen } from "../composables/useSidebarOpen.js";
const { isSidebarOpen } = useSidebarOpen();
</script>

<template>
  <div
    class="wrapper"
    :class="isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'"
  >
    <AppSidebar />
    <main id="main">
      <h1>TodayView</h1>
    </main>
  </div>
</template>

<style scoped>
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
