import { ref } from "vue";
import { defineStore } from "pinia";
import gugunApi from "@/api/gugunApi";

export const useGugunStore = defineStore("gugun", () => {
  const gugunList = ref([
    {
      gugunCode: "31",
      gugunName: "유성구",
    },
    {
      gugunCode: "32",
      gugunName: "중구",
    },
  ]);

  const getGugun = async (sidoCode) => {
    const response = await gugunApi.get(`/${sidoCode}`);

    //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
    gugunList.value = response.data;
  };

  return { gugunList, getGugun };
});
