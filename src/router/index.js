import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodayView from "../views/TodayView.vue";
import ListView from "../views/ListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-view",
      component: HomeView,
    },
    {
      path: "/app/today",
      name: "today-view",
      component: TodayView,
    },
    {
      path: "/app/list/:id",
      name: "list-view",
      component: ListView,
    },
  ],
});

export default router;
