import { ref } from "vue";
import { defineStore } from "pinia";
import authApi from "@/api/authApi";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const user = ref(null);

  const join = async (joinInfo) => {
    const response = await authApi.post("/regist", joinInfo);

    //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
    token.value = response.data;
    user.value = jwtDecode(token.value);
  };

  const update = async (joinInfo) => {
    const response = await authApi.put("/", joinInfo);

    token.value = response.data;
    user.value = jwtDecode(token.value);
  };

  const login = async (loginInfo) => {
    const response = await authApi.post("/login", loginInfo);

    //토큰 정보 및 유저 정보 세팅
    token.value = response.data;
    user.value = jwtDecode(token.value);
    console.log(token.value);
    console.log(user.value);
  };

  const logout = () => {
    //토큰 정보 및 유저 정보 삭제
    token.value = null;
    user.value = null;
    console.log(token.value);
    console.log(user.value);
  };

  return { user, token, join, login, logout, update };
});
