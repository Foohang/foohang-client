<template>
  <!-- gd-->
  <div class="center-container">
    <form class="form">
      <p class="title">회원가입</p>
      <p class="message">회원가입을 통해 더욱 쾌적한 여행을 즐기세요</p>

      <div class="img" @click="triggerFileInput">
        <input type="file" ref="fileInput" @change="onFileChange" />
        <img
          v-if="joinForm.profile_img"
          :src="joinForm.profile_img"
          alt="프로필 이미지"
        />
      </div>
      <button class="photo-button" @click="triggerFileInput">사진 추가</button>

      <div class="flex">
        <label class="icon-label">
          <font-awesome-icon :icon="['fas', 'envelope']" class="input-icon" />
        </label>
        <label>
          <input
            required
            type="text"
            class="input"
            v-model.trim="joinForm.email"
          />
          <span>이메일</span>
        </label>
      </div>

      <div class="flex">
        <label class="icon-label">
          <font-awesome-icon :icon="['fas', 'lock']" class="input-icon" />
        </label>
        <label>
          <input
            required
            type="password"
            class="input"
            v-model.trim="joinForm.password"
          />
          <span>비밀번호</span>
        </label>
      </div>

      <div class="flex">
        <label class="icon-label">
          <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
        </label>
        <label>
          <input
            required
            type="text"
            class="input"
            v-model.trim="joinForm.nickName"
          />
          <span>닉네임</span>
        </label>
      </div>

      <div class="flex">
        <label class="icon-label">
          <font-awesome-icon
            :icon="['fas', 'map-marker-alt']"
            class="input-icon"
          />
        </label>
        <label>
          <input
            required
            type="text"
            class="input"
            v-model.trim="joinForm.region"
          />
          <span>선호 지역</span>
        </label>
      </div>

      <div class="flex">
        <label class="icon-label">
          <font-awesome-icon :icon="['fas', 'utensils']" class="input-icon" />
        </label>
        <label>
          <input
            required
            type="text"
            class="input"
            v-model.trim="joinForm.food"
          />
          <span>선호 음식</span>
        </label>
      </div>

      <div class="flex">
        <label class="icon-label">
          <font-awesome-icon
            :icon="['fas', 'comment-dots']"
            class="input-icon"
          />
        </label>
        <label>
          <input
            required
            type="text"
            class="input"
            v-model="joinForm.statusMessage"
          />
          <span>상태 메시지</span>
        </label>
      </div>

      <div class="flex">
        <label class="icon-label">
          <font-awesome-icon
            :icon="['fas', 'calendar-alt']"
            class="input-icon"
          />
        </label>
        <label>
          <input
            type="text"
            class="input"
            placeholder="생년월일"
            @focus="showDatePicker"
            v-if="!datePicked"
          />
          <input
            type="date"
            class="input"
            v-model="joinForm.birth"
            v-show="datePicked"
            @blur="checkDate"
            ref="dateInput"
          />
          <!-- <span v-show="!datePicked"></span> -->
        </label>
      </div>

      <!-- <div class="form-group gender-group"> -->
      <!-- <label class="input-label"></label> -->
      <div class="gender-container">
        <input
          id="men"
          name="gender"
          type="radio"
          value="1"
          v-model="joinForm.gender"
        />
        <label for="men">남성</label>
        <input
          id="women"
          name="gender"
          type="radio"
          value="0"
          v-model="joinForm.gender"
        />
        <label for="women">여성</label>
      </div>
      <!-- </div> -->

      <button class="submit">가입</button>
      <p class="signin">이미 계정이 있으신가요? <a href="#">로그인</a></p>
    </form>
  </div>

  <!-- gg-->

  <main>
    <div class="card">
      <div class="card-border-top"></div>
      <span>회원가입</span>
      <div class="img" @click="triggerFileInput">
        <input
          type="file"
          ref="fileInput"
          @change="onFileChange"
          style="display: none"
        />
        <img
          v-if="joinForm.profile_img"
          :src="joinForm.profile_img"
          alt="Profile Image"
        />
        <img v-else src="/src/assets/addImage.png" alt="Default Image" />
      </div>
      <button class="photo-button" @click="triggerFileInput">사진 추가</button>
      <form @submit.prevent="join">
        <div class="form-group">
          <div class="input-container">
            <font-awesome-icon :icon="['fas', 'envelope']" class="input-icon" />
            <div class="input-divider"></div>
            <input
              type="text"
              class="input-field"
              v-model.trim="joinForm.email"
              placeholder="이메일"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-container">
            <font-awesome-icon :icon="['fas', 'lock']" class="input-icon" />
            <div class="input-divider"></div>
            <input
              type="password"
              class="input-field"
              v-model.trim="joinForm.password"
              placeholder="비밀번호"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-container">
            <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
            <div class="input-divider"></div>
            <input
              type="text"
              class="input-field"
              v-model.trim="joinForm.nickName"
              placeholder="닉네임"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-container">
            <font-awesome-icon
              :icon="['fas', 'map-marker-alt']"
              class="input-icon"
            />
            <div class="input-divider"></div>
            <input
              type="text"
              class="input-field"
              v-model.trim="joinForm.region"
              placeholder="선호 지역"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-container">
            <font-awesome-icon :icon="['fas', 'utensils']" class="input-icon" />
            <div class="input-divider"></div>
            <input
              type="text"
              class="input-field"
              v-model.trim="joinForm.food"
              placeholder="선호 음식"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-container">
            <font-awesome-icon
              :icon="['fas', 'comment-dots']"
              class="input-icon"
            />
            <div class="input-divider"></div>
            <input
              type="text"
              class="input-field"
              v-model="joinForm.statusMessage"
              placeholder="상태 메시지"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-container">
            <font-awesome-icon
              :icon="['fas', 'calendar-alt']"
              class="input-icon"
            />
            <div class="input-divider"></div>
            <input
              type="date"
              class="input-field"
              v-model="joinForm.birth"
              placeholder="생년월일"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label class="input-label"></label>
          <div class="gender-container">
            <input
              id="men"
              name="gender"
              type="radio"
              value="1"
              v-model="joinForm.gender"
            />
            <label for="men">남성</label>
            <input
              id="women"
              name="gender"
              type="radio"
              value="0"
              v-model="joinForm.gender"
            />
            <label for="women">여성</label>
          </div>
        </div>
        <button type="submit">가입</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faMapMarkerAlt,
  faUtensils,
  faCommentDots,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faEnvelope,
  faLock,
  faUser,
  faMapMarkerAlt,
  faUtensils,
  faCommentDots,
  faCalendarAlt
);

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
  profile_img: null,
});

const fileInputRef = ref(null);

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    joinForm.value.profile = file;
    joinForm.value.profile_img = URL.createObjectURL(file);
  }
};

const triggerFileInput = () => {
  fileInputRef.value.click();
};

onMounted(() => {
  fileInputRef.value = document.querySelector('input[type="file"]');
});

// const join = async () => {
//   if (!confirm('이대로 가입하시겠습니까?')) return;
//   try {
//     await authStore.join(joinForm.value);
//     router.push({ name: 'home' });
//   } catch (error) {
//     console.error('에러:', error);
//     alert('가입 실패');
//   }
// };

const join = async () => {
  if (!confirm("이대로 가입하시겠습니까?")) return;

  const formData = new FormData();

  formData.append("file", joinForm.value.profile);
  for (const key in joinForm.value) {
    formData.append(key, joinForm.value[key]);
  }

  try {
    await authStore.join(formData);
    router.push({ name: "home" });
  } catch (error) {
    console.error("에러:", error);
    alert("가입 실패");
  }
};

const datePicked = ref(false);

const showDatePicker = (event) => {
  datePicked.value = true;
  nextTick(() => {
    this.$refs.dateInput.focus();
  });
};

const checkDate = () => {
  if (!joinForm.value.birth) {
    datePicked.value = false;
  }
};
</script>

/* 스타일 */

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-color: #f3f4f6;
}

.icon-label {
  width: 10px;
  margin-right: 25px;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 450px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
}

.title {
  font-size: 28px;
  color: #ee703f;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.title::before,
.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #ee703f;
}

.title::after {
  animation: pulse 1s linear infinite;
}

.message,
.signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: #007bff;
  text-decoration: underline;
}

.form label {
  position: relative;
}

.form label .input {
  width: 100%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:focus + span,
.form label .input:valid + span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
  color: #ee703f;
}

.submit {
  border: none;
  outline: none;
  background-color: #ee703f;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
}

.submit:hover {
  background-color: #ee703f90;
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }
  to {
    transform: scale(1.8);
    opacity: 0;
  }
}

/* 스타일 끝*/

.card {
  width: 500px; /* 입력 폼의 가로를 유지 */
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
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.card .img input {
  width: 100%;
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
  font-size: 36px; /* 회원가입 글자 크기 증가 */
  margin-bottom: 20px; /* 회원가입과 이미지 사이 여백 */
}

.photo-button {
  display: block;
  width: 120px;
  margin: 6px auto;
  padding: 5px;
  background-color: #ee703f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.photo-button:hover {
  background-color: #ee703f90;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px; /* 폼과 이전 요소 사이의 간격 조절 */
}

form label {
  width: 100%;
  color: #000000;
  margin-bottom: 10px;
}

.input-label {
  width: 100px; /* 입력 라벨의 너비 조절 */
  display: inline-block; /* 인라인 요소로 변경하여 텍스트와 입력란이 같은 줄에 위치하도록 함 */
  color: #000000; /* 입력 라벨의 텍스트 색상을 설정 */
}

.input-container {
  position: relative;
  width: 100%;
  margin-bottom: 15px; /* 입력 필드와 카드 사이의 여백 추가 */
}

.input-icon {
  /* position: absolute; */
  top: -10px;
  /* transform: translateY(-50%); */
  pointer-events: none;
  font-size: 1.8em; /* 아이콘 크기 조절 */
  color: #ee703f;
}

.input-divider {
  position: absolute;
  left: 100px; /* 위치 조정 */
  top: 50%;
  transform: translateY(-50%);
  height: 60%;
  width: 1px;
  background-color: #ccc;
}

.input-field {
  width: calc(100% - 80px); /* 입력 필드의 너비 조절 */
  padding: 8px 8px 8px 90px; /* 입력 필드 내부 패딩 조절 */
  border-radius: 5px;
  border: 1px solid #000;
  margin-top: 5px;
  background-color: #fff;
}

.gender-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 성별 그룹 사이의 간격 조절 */
  justify-content: center; /* 가운데 정렬 */
  margin-left: 60px;
}

.gender-container {
  display: flex;
  align-items: center;
  margin-left: 70px;
  color: #000;
}

form div input[type="radio"] {
  margin: -10px 15px 0 -10px; /* 라디오 버튼 사이의 간격 조절 */
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

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 각 입력 요소 사이의 간격 조절 */
}
</style>
