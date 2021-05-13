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
    hidden: true,
    component: () => import("../views/Layout/index.vue")
  },
  {
    path: "/managementDesk",//登录后首页
    name: "managementDesk",
    hidden: false,
    meta: {
      title: '管理总台',
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
        children:[
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
    path: "/managementDesk2",//登录后首页
    name: "managementDesk2",
    hidden: false,
    meta: {
      title: '管理总台2'
    },
    component: () => import("../views/Layout/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
