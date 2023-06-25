import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/user"),
      },
      {
        path: "/mall",
        name: "mall",
        component: () => import("../views/mall"),
      },
      {
        path: "/addCustomer",
        name: "addCustomer",
        component: () => import("../views/customer/addCustomer.vue"),
      },
      {
        path: "/research",
        name: "research",
        component: () => import("../views/customer/research.vue"),
      },
      {
        path: "/page1",
        name: "page1",
        component: () => import("../views/other/pageOne.vue"),
      },
      {
        path: "/page2",
        name: "page2",
        component: () => import("../views/other/pageTwo.vue"),
      },

    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
