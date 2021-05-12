import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",//登录
    name: "Login",
    component: () => import("../views/acount/login.vue")
  },
  {
    path: "/registered",//注册
    name: "registered",
    component: () => import("../views/acount/registered.vue")
  },
  {
    path: "/forgot",//忘记密码
    name: "forgot",
    component: () => import("../views/acount/forgot.vue")
  },
  {
    path: "/index",//登录后首页
    name: "index",
    component: () => import("../views/Layout/index.vue")
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
