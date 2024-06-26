import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
const mypageApi = axios.create({
  baseURL: "http://localhost/members",
});

mypageApi.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

mypageApi.interceptors.response.use(
  (response) => response,
  (error) => {
    //권한 오류 발생 시
    console.error("요청 응답 오류", error);
    const status = error.response.status;
    if (status == 401 && error.response.data == "Unauthorized") {
      const authStore = useAuthStore();
      authStore.logout();
      alert("로그인이 만료되었습니다.");
      router.push({ name: "login" });
    } else if (status == 401) {
      alert("권한이 없습니다.");
    }
    return Promise.reject(error); //원래 반환해야하는 형식 크게 고려하지 않아도 됨
  }
);

export default mypageApi;
