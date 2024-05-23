import { ref } from "vue";
import { defineStore } from "pinia";

export const useKakaoStore = defineStore(
  "kakao",
  () => {
    const token = ref(null);

    const API_KEY = "ebf2da93e7122fee5947e193d7330814";
    const REDIRECT_URI = "http://localhost/oauth";
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return { token, KAKAO_AUTH_URI };
  },
  {
    persist: true,
  }
);
