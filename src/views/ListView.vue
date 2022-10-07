<script setup>
import AppSidebar from "../components/AppSidebar.vue";
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
        <slot />
      </main>
    </div>
  </div>
</template>
