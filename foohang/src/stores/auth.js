import { ref } from "vue";
import { defineStore } from "pinia";
import authApi from "@/api/authApi";
import mypageApi from "@/api/mypageApi";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref(null);
    const user = ref(null);

    // const join = async (joinInfo) => {
    //   const response = await authApi.post("/regist", joinInfo);

    //   //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
    //   token.value = response.data;
    //   user.value = jwtDecode(token.value);
    // };

    const join = async (formData) => {
      const response = await authApi.post("/regist", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
      token.value = response.data;
      user.value = jwtDecode(token.value);
    };

    const kakaoLogin = function(Ktoken){
      token.value = Ktoken;
      user.value = jwtDecode(token.value);
    }

    const update = async (formData) => {
      const response = await mypageApi.put("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

    return { user, token, join, login,kakaoLogin, logout, update };
  },
  {
    persist: true,
  }
);
