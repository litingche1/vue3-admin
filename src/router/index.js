import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",//登录
    name: "Login",
    hidden: true,
    component: () => import("../views/acount/login.vue")
  },
  {
    path: "/registered",//注册
    name: "registered",
    hidden: true,
    component: () => import("../views/acount/registered.vue")
  },
  {
    path: "/forgot",//忘记密码
    name: "forgot",
    hidden: true,
    component: () => import("../views/acount/forgot.vue")
  },
  {
    path: "/index",//登录后首页
    name: "index",
    meta: {
      title: '首页',
      icon:'home',
    },
    hidden: false,
    component: () => import("../views/Layout/index.vue")
  },
  {
    path: "/managementDesk",//登录后首页
    name: "managementDesk",
    hidden: false,
    meta: {
      title: '管理总台',
      icon:'console'
    },
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/role",//登录后首页
        name: "role",
        meta: {
          title: '用户角色222',
        },
        component: () => import("../views/managementDesk/userRole.vue"),
        children: [
          {
            path: "/role2",//登录后首页
            name: "role2",
            meta: {
              title: '用户角色1-1',
            },
            component: () => import("../views/managementDesk/userRole.vue"),
          }
        ]
      }
    ]
  },
  {
    path: "/informtion",//登录后首页
    name: "informtion",
    hidden: false,
    meta: {
      title: '信息管理',
      icon:'informtion'
    },
    component: () => import("../views/Layout/index.vue"),
  },
  {
    path: "/user",//登录后首页
    name: "user",
    hidden: false,
    meta: {
      title: '用户管理',
      icon:'user1'
    },
    component: () => import("../views/Layout/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
