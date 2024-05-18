<template>
  <main>
    <div class="card">
      <div class="card-border-top"></div>
      <div class="img">
        <input type="file" @change="onFileChange" />
        <img v-if="joinForm.profile_img" :src="joinForm.profile_img" alt="프로필 이미지" />
      </div>
      <span>회원가입</span>
      <form @submit.prevent="join">
        <div class="form-group">
          <label class="input-label">이메일</label>
          <input type="text" class="input-field" v-model.trim="joinForm.email" required />
        </div>
        <div class="form-group">
          <label class="input-label">비밀번호</label>
          <input type="password" class="input-field" v-model.trim="joinForm.password" required />
        </div>
        <div class="form-group">
          <label class="input-label">닉네임</label>
          <input type="text" class="input-field" v-model.trim="joinForm.nickName" required />
        </div>
        <div class="form-group">
          <label class="input-label">선호 지역</label>
          <input type="text" class="input-field" v-model.trim="joinForm.region" required />
        </div>
        <div class="form-group">
          <label class="input-label">선호 음식</label>
          <input type="text" class="input-field" v-model.trim="joinForm.food" required />
        </div>
        <div class="form-group">
          <label class="input-label">상태 메시지</label>
          <input type="text" class="input-field" v-model="joinForm.statusMessage" required />
        </div>
        <div class="form-group">
          <label class="input-label">생년월일</label>
          <input type="date" class="input-field" v-model="joinForm.birth" required />
        </div>
        <div class="form-group">
          <label class="input-label">성별</label>
          <div>
            <input id="men" name="gender" type="radio" value="1" v-model="joinForm.gender" />
            <label for="men">남성</label>
            <input id="women" name="gender" type="radio" value="0" v-model="joinForm.gender" />
            <label for="women">여성</label>
          </div>
        </div>
        <button type="submit">가입</button>
      </form>
    </div>
  </main>
</template>

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
  statusMessage: "",
  profile: null,
  profile_img: null
});

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log(file)
    joinForm.value.profile = file;
    joinForm.value.profile_img = URL.createObjectURL(file);
  }
};

const join = async () => {
  if (!confirm("이대로 가입하시겠습니까?")) return;
  try {
    await authStore.join(joinForm.value);
    router.push({name:"home"});
  } catch (error) {
    console.error("에러:", error);
    alert("가입 실패");
  }
};
</script>

<style scoped>
.card {
  width: 400px; /* 입력 폼의 가로를 넓혀줍니다 */
  height: auto;
  background: #f57c00; /* 주황색 배경 */
  border-radius: 15px;
  box-shadow: 1px 5px 60px 0px #ffcc80; /* 주황색 그림자 */
  padding: 20px;
  margin: auto;
  margin-top: 50px;
}

.card .card-border-top {
  width: 60%;
  height: 5px;
  background: #ffb74d; /* 연한 주황색 */
  margin: auto;
  border-radius: 0px 0px 15px 15px;
}

.card .img {
  width: 100px;
  height: 100px;
  background: #ffb74d; /* 연한 주황색 */
  border-radius: 50%;
  margin: auto;
  margin-top: 20px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.card .img input {
  width: 100
  <input;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

.card .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.card span {
  font-weight: 600;
  color: white;
  text-align: center;
  display: block;
  padding-top: 10px;
  font-size: 24px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px; /* 폼과 이전 요소 사이의 간격 조절 */
}

form label {
  width: 100%;
  color: white;
  margin-bottom: 10px;
}

.input-label {
  width: 100px; /* 입력 라벨의 너비 조절 */
  display: inline-block; /* 인라인 요소로 변경하여 텍스트와 입력란이 같은 줄에 위치하도록 함 */
  color: white; /* 입력 라벨의 텍스트 색상을 설정 */
}

.input-field {
  width: calc(100% - 120px); /* 입력 필드의 너비 조절 */
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #000;
  margin-top: 5px;
  background-color: #fff;
}

form button {
  width: 100%;
  padding: 10px 20px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
}

form button:hover {
  background: #fb8c00;
}

form div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

form div input[type="radio"] {
  margin: 0 5px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 각 입력 요소 사이의 간격 조절 */
}
</style>
