import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/member/LoginView.vue";
import RegistView from "@/views/member/RegistView.vue";
import MypageView from "@/views/member/MypageView.vue";
import MainView from "@/views/trail/MainView.vue";
import ProfileView from "@/views/member/ProfileView.vue";
import ReviewView from "@/views/member/ReviewView.vue";
import ReviewReadView from "@/views/member/review/ReviewReadView.vue";
import ReviewWriteView from "@/views/member/review/ReviewWriteView.vue";
import ReviewUpdateView from "@/views/member/review/ReviewUpdateView.vue";
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
      path: "/mypage",
      component: ProfileView,
      children: [
        {
          path: "/review",
          component: ReviewView,
          children: [
            {
              path: "",
              name: "review",
              component: ReviewReadView,
            },
            {
              path: "/write",
              name: "reviewWrite",
              component: ReviewWriteView,
            },
            {
              path: "/update/:reviewId",
              name: "reviewUpdate",
              component: ReviewUpdateView,
            },
          ],
        },
      ],
    },
    {
      path: "/mainPage",
      name: "mainPage",
      component: MainView,
      // props : true,
    },
  ],
});

export default router;
