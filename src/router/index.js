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
      {
        path: "/d_order",
        name: "d_order",
        component: () => import("../views/dispatch/order.vue"),
      },
      {
        path: "/d_detail",
        name: "d_detail",
        component: ()=>import("../views/dispatch/detail.vue")
      }
      ,{
        path: "/d_modify_state",
        name: "d_modify_state",
        component: ()=>import("../views/dispatch/modifyState.vue")

      }
      ,{
        path: "/d_research_ticket",
        name: "d_research_ticket",
        component: ()=>import("../views/dispatch/researchTicket.vue")
      }
      ,{
        path: "/d_product_allocation",
        name: "d_product_allocation",
        component: ()=>import("../views/dispatch/productAllocation.vue")
      }
      ,{
        path: "/d_ticket_allocation",
        name: "d_ticket_allocation",
        component: ()=>import("../views/dispatch/ticketAllocation.vue")
      },
      {
        path:'/d_print_deliver_info',
        name: 'd_print_deliver_info',
        component: ()=>import("../views/dispatch/printDeliverInfo.vue")

      },
      {
        path:'/d_show_deliver_info',
        name: 'd_show_deliver_info',
        component: ()=>import("../views/dispatch/showDeliverInfo.vue")

      },
      {
        path:'/d_receipt_entry',
        name: 'd_receipt_entry',
        component: ()=>import("../views/dispatch/receiptEntry.vue")

      },
      {
        path:'/d_show_receipt_detail',
        name: 'd_show_receipt_detail',
        component: ()=>import("../views/dispatch/showReceiptDetail.vue")

      },
      {
        path:'/d_payment_inquiry',
        name: 'd_payment_inquiry',
        component: ()=>import("../views/dispatch/paymentInquiry.vue")

      }
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
