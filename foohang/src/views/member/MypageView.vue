<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import MainHeader from "@/components/header/MainHeader.vue";
const authStore = useAuthStore();
const router = useRouter();

const joinForm = ref({
  memberId: authStore.user.memberId,
  email: authStore.user.email,
  password: "",
  nickName: authStore.user.nickName,
  region: authStore.user.region,
  food: authStore.user.food,
  birth: authStore.user.birth,
  gender: authStore.user.gender,
});

console.log(authStore.user);

const update = async () => {
  if (!confirm("이대로 변경하시겠습니까?")) return;
  try {
    await authStore.update(joinForm.value);
    router.push({ name: "mypage" });
    alert("변경 완료");
  } catch (error) {
    console.error("에러:", error);
    alert("변경 실패");
  }
};
</script>

<template>
  <main>
    <h1>마이페이지</h1>
    <form @submit.prevent="update">
      <input type="hidden" v-model="joinForm.memberId" />
      <label
        ><input
          type="text"
          v-model.trim="joinForm.email"
          required
          disabled
        />이메일</label
      >
      <br />
      <label
        ><input
          type="password"
          v-model.trim="joinForm.password"
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
      <input type="submit" value="변경" />
    </form>
  </main>
</template>
<style scoped></style>
