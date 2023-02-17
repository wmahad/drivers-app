// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        name: "stop",
        component: () =>
          import(/* webpackChunkName: "stop" */ "@/views/StopsView.vue"),
      },
      {
        path: "/:id",
        name: "orders",
        component: () =>
          import(/* webpackChunkName: "orders" */ "@/views/ReviewOrders.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
