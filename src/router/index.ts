import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import LoginView from "../views/Login/LoginView.vue";
import MainLayout from "../layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "users",
    meta: {
      requiresAuth: true,
    },
    component: MainLayout,
    children: [
      {
        path: "",
        name: "users",
        component: HomeView,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    children: [
      {
        path: "",
        name: "login-index",
        component: LoginView,
      },
    ],
  },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("user")) {
      next({ name: "login-index" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
