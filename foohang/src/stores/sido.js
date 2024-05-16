import { ref } from "vue";
import { defineStore } from "pinia";
import sdioApi from "@/api/sidoApi";

export const useSidoStore = defineStore("sido", () => {
  const sidoList = ref([
    {
      sidoCode: "31",
      sidoName: "서울",
      sidoImage: `/src/assets/city/31.jpeg`,
    },
    {
      sidoCode: "32",
      sidoName: "대전",
      sidoImage: `/src/assets/city/32.jpeg`,
    },
  ]);

  const getSido = async () => {
    const response = await sdioApi.get("/");

    //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
    sidoList.value = response.data;
  };

  return { sidoList, getSido };
});
