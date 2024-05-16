import { ref } from "vue";
import { defineStore } from "pinia";
import sdioApi from "@/api/sidoApi";

export const useSidoStore = defineStore("sido", () => {
  const sidoList = ref([
    {
      sidoCode: "31",
      sidoName: "서울",
      sidImage:
        "https://github.com/Foohang/Image/assets/72538151/b9184172-a274-4a93-b9e5-770e30d23884",
    },
    {
      sidoCode: "32",
      sidoName: "대전",
      sidImage:
        "https://github.com/Foohang/Image/assets/72538151/b1c6ca36-330d-4f58-972a-70a5d8b40b55",
    },
  ]);

  const getSido = async () => {
    const response = await sdioApi.get("/");

    //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
    sidoList.value = response.data;
  };

  return { sidoList, getSido };
});
