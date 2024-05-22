import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const routeApi = axios.create({
  baseURL: "http://localhost/routes",
});

routeApi.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

routeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    // 권한 오류 발생 시
    console.error("요청 응답 오류", error);
    authStore.logout();
    alert("로그인이 만료되었습니다.");
    router.push({ name: "login" });

    // error.response가 정의되어 있는지 확인
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        const authStore = useAuthStore();
        if (error.response.data === "Unauthorized") {
          authStore.logout();
          alert("로그인이 만료되었습니다.");
          router.push({ name: "login" });
        } else {
          alert("권한이 없습니다.");
        }
      }
    } else {
      // error.response가 정의되지 않은 경우
      alert("네트워크 오류 또는 서버가 응답하지 않습니다.");
    }

    return Promise.reject(error); // 원래 반환해야하는 형식 크게 고려하지 않아도 됨
  }
);

export default routeApi;
