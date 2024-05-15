import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/member/LoginView.vue";
import RegistView from "@/views/member/RegistView.vue";
import MypageView from "@/views/member/MypageView.vue";
import MainView from "@/views/trail/MainView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/regist",
      name: "regist",
      component: RegistView,
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MypageView,
    },
    {
      path: "/mainPage",
      name: "mainPage",
      component: MainView,
      // props : true,
    }
  ],
});

export default router;
