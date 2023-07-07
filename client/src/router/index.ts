import cancelToken from "@/ajax/cancelToken";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "",
    redirect: "/home-page",
  },
  // 首页
  {
    path: "/home-page",
    name: "home-page",
    component: () => import("@/views/home-page/index.vue"),
  },
  {
    path: "/error-page",
    name: "error-page",
    component: () => import("@/views/error-page/index.vue"),
  },
  //   {
  //     path: "/edit/drafts/:aId?",
  //     name: "edit",
  //     component: () => import("@/views/edit/index.vue"),
  //   },
    // user
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/user/index.vue"),
      redirect: '/user/login',
      children: [
        {
          path: "/user/login",
          name: "login",
          component: () => import("@/views/user/child/login.vue"),
        },
        {
          path: "/user/register",
          name: "register",
          component: () => import("@/views/user/child/register.vue"),
        },
      ]
    },
  //   {
  //     path: "/article/:aId",
  //     name: "article",
  //     component: () => import("@/views/article/index.vue"),
  //   },
  //   {
  //     path: "/user/personal/:userId?",
  //     name: "personal",
  //     component: () => import("@/views/user/personal/index.vue"),
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// // 全局后置钩子
router.beforeResolve(() => {
  // 离开页面时
  cancelToken.cancelAll(); // 取消所有未返回的ajax请求
});

export default router;
