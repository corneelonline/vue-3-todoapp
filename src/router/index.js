import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodayView from "../views/TodayView.vue";
import ListView from "../views/ListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/today",
      name: "today",
      component: TodayView,
    },
    {
      path: "/list/:id",
      name: "list",
      component: ListView,
    },
  ],
});

export default router;
