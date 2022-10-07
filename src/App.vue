<script setup>
import { RouterLink, RouterView } from "vue-router";
import AppSidebar from "./components/AppSidebar.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <AppSidebar />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/today">Today</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
