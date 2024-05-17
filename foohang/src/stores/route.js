import { ref } from "vue";
import { defineStore } from "pinia";
import routeApi from "@/api/routeApi";

export const useRouteStore = defineStore("route", () => {
  const routeList = ref([]);

  const getRoute = async () => {
    const response = await routeApi.get("");

    //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
    routeList.value = response.data;
  };

  return { routeList, getRoute };
});
