<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import MainHeader from "@/components/header/MainHeader.vue";
const authStore = useAuthStore();
const router = useRouter();

const loginForm = ref({
  email: "",
  password: "",
});

const login = async () => {
  try {
    await authStore.login(loginForm.value);
    router.push({name:"home"});
  } catch (error) {
    console.error("에러:", error);
    alert(" 실패");
  }
};
</script>

<template>
  <main>
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <label
        ><input type="text" v-model.trim="loginForm.email" required />아이디</label
      >
      <br />
      <label
        ><input
          type="password"
          v-model.trim="loginForm.password"
          required
        />비밀번호</label
      >
      <br />
      <input type="submit" value="로그인" />
    </form>
  </main>
</template>

<style scoped></style>
