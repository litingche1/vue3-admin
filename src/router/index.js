import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/acount/login.vue")
  },
  {
    path: "/registered",
    name: "registered",
    component: () => import("../views/acount/registered.vue")
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
