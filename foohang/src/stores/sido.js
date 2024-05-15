import { ref } from "vue";
import { defineStore } from "pinia";
import sdioApi from "@/api/sidoApi";

export const useSidoStore = defineStore("sido", () => {
  const sidoList = ref([
    {
      "sidoCode": "31",
      "sidoName": "서울",
      "sidImage": "https://private-user-images.githubusercontent.com/72538151/330829497-6ef965a3-33a3-41bd-a93e-97f198caecc7.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTU3ODExMzEsIm5iZiI6MTcxNTc4MDgzMSwicGF0aCI6Ii83MjUzODE1MS8zMzA4Mjk0OTctNmVmOTY1YTMtMzNhMy00MWJkLWE5M2UtOTdmMTk4Y2FlY2M3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTE1VDEzNDcxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJiYjk4MmI3NjkwNWZjNDJhMzI2NGY0MWU1ODM4ODUxNmFiYjI2Yzk4MjJiZjg1ZTg5YWU4ZTkyZjVkZDE2MzYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.SP174vQCI7LUC24JSUzVI94ytaMcIE8zW9dvyl70nLI"
  },  
  {
      "sidoCode": "32",
      "sidoName": "대전",
      "sidImage": "https://private-user-images.githubusercontent.com/72538151/330829497-6ef965a3-33a3-41bd-a93e-97f198caecc7.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTU3ODExMzEsIm5iZiI6MTcxNTc4MDgzMSwicGF0aCI6Ii83MjUzODE1MS8zMzA4Mjk0OTctNmVmOTY1YTMtMzNhMy00MWJkLWE5M2UtOTdmMTk4Y2FlY2M3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTE1VDEzNDcxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJiYjk4MmI3NjkwNWZjNDJhMzI2NGY0MWU1ODM4ODUxNmFiYjI2Yzk4MjJiZjg1ZTg5YWU4ZTkyZjVkZDE2MzYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.SP174vQCI7LUC24JSUzVI94ytaMcIE8zW9dvyl70nLI"
  },         
 ]);

  const getSido = async () => {
    const response = await sdioApi.get("/");

    //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
    sidoList.value = response.data;
  };

  return {sidoList, getSido };
});
