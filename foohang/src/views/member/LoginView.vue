<template>
  <div class="login-container">
    <form class="form" @submit.prevent="login">
      <div class="image-container">
        <img src="@/assets/FoohangLogo.png" alt="Logo" class="logo" />
      </div>
      <!-- <div class="form-title">로그인</div> -->
      <div class="input-container">
        <label>
          Email
          <input
            type="text"
            placeholder="이메일"
            v-model.trim="loginForm.email"
            required
          />
        </label>
      </div>
      <div class="input-container">
        <label>
          Password
          <input
            type="password"
            placeholder="비밀번호"
            v-model.trim="loginForm.password"
            required
          />
        </label>
      </div>
      <button type="submit" class="submit">로그인</button>
      <button type="button" class="not-submit">
        <img
          src="/src/assets/kakao.png"
          class="kakao"
          @click="redirectToKakao"
        />
      </button>
      <div class="signup-link">
        <span>
          계정이 없으신가요?
          <RouterLink :to="{ name: 'regist' }">회원가입</RouterLink>
        </span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useKakaoStore } from "@/stores/kakao";
const authStore = useAuthStore();
const kakaoStore = useKakaoStore();
const router = useRouter();

const loginForm = ref({
  email: "",
  password: "",
});

const login = async () => {
  try {
    await authStore.login(loginForm.value);
    router.push({ name: "home" });
  } catch (error) {
    console.error("에러:", error);
    alert(" 실패");
  }
};
const redirectToKakao = function () {
  window.location.href = kakaoStore.KAKAO_AUTH_URI;
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f3f4f6;
}

.form {
  background-color: #fff;
  display: block;
  padding: 1rem;
  max-width: 350px;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.image-container img {
  max-width: 100px;
  height: auto;
}

.form-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #000;
}

.input-container {
  position: relative;
}

.input-container label {
  display: block;
  margin-bottom: 1rem;
}

.input-container input,
.form button:not(.not-submit) {
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.input-container span {
  display: grid;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  place-content: center;
}

.input-container span svg {
  color: #9ca3af;
  width: 1rem;
  height: 1rem;
}

.submit:not(.not-submit) {
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #ee703f; /* 로그인 버튼 색상 변경 */
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
}

.not-submit {
  border: none; /* 테두리 제거 */
  background-color: transparent; /* 배경 투명 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0; /* 기본 패딩 제거 */
  margin-top: 10px; /* 위쪽에 약간의 여백 추가 */
  width: 100%; /* 전체 너비 사용 */
}

.kakao {
  margin-bottom: 10px;
}

.signup-link {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}
</style>
