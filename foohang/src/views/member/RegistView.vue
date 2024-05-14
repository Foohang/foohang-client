<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

const joinForm = ref({
  email: "",
  password: "",
  nickName: "",
  region: "",
  food: "",
  birth: "",
  gender: "",
});

const join = async () => {
  if (!confirm("이대로 가입하시겠습니까?")) return;
  try {
    await authStore.join(joinForm.value);
    router.push("/");
  } catch (error) {
    console.error("에러:", error);
    alert("가입 실패");
  }
};
</script>

<template>
  <main>
    <h1>회원가입</h1>
    <form @submit.prevent="join">
      <label
        ><input
          type="text"
          v-model.trim="joinForm.email"
          required
        />이메일</label
      >
      <br />
      <label
        ><input
          type="password"
          v-model.trim="joinForm.password"
          required
        />비밀번호</label
      >
      <br />
      <label
        ><input
          type="text"
          v-model.trim="joinForm.nickName"
          required
        />닉네임</label
      >
      <br />
      <label
        ><input type="text" v-model.trim="joinForm.region" required />선호
        지역</label
      >
      <br />
      <label
        ><input type="text" v-model.trim="joinForm.food" required />섬호
        음식</label
      >
      <br />
      <input
        type="date"
        class="form-control"
        v-model="joinForm.birth"
        required
      />
      <br />
      <div>
        <input
          id="men"
          name="gender"
          type="radio"
          value="1"
          v-model="joinForm.gender"
        />
        <label for="men">남성</label>
      </div>
      <div>
        <input
          id="women"
          name="gender"
          type="radio"
          value="0"
          v-model="joinForm.gender"
        />
        <label for="women">여성</label>
      </div>
      <br />
      <input type="submit" value="가입" />
    </form>
  </main>
</template>

<style scoped></style>
