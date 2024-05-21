<template>
  <header @click="handleOutsideClick">
    <nav>
      <ul class="nav-left">
        <li class="logo">
          <RouterLink :to="{ name: 'home' }">
            <img src="@/assets/FoohangLogo.png" height="80" alt="로고" />
            <!-- 높이를 줄임 -->
          </RouterLink>
        </li>
      </ul>
      <ul class="nav-right">
        <li v-if="user === null">
          <RouterLink :to="{ name: 'login' }" class="nav-link button"
            >로그인</RouterLink
          >
        </li>
        <li v-else class="user-info">
          <img
            :src="`http://localhost/files/profile/${user.profileName}`"
            alt="프로필 사진"
            class="profile-img"
          />
          <span class="user-nickname">{{ user.nickName }}님 접속 중</span>
        </li>
        <li class="menu-container" @click.stop>
          <input id="toggleChecker" type="checkbox" v-model="checked" />
          <label id="togglerLabel" for="toggleChecker">
            <div class="checkboxtoggler">
              <div class="line-1"></div>
              <div class="line-2"></div>
              <div class="line-3"></div>
            </div>
          </label>
          <ul v-if="checked" class="dropdown-menu">
            <li v-if="user !== null">
              <RouterLink :to="{ name: 'mypage' }" class="dropdown-link"
                >· 마이페이지</RouterLink
              >
            </li>
            <li v-if="user !== null">
              <RouterLink :to="{ name: 'review' }" class="dropdown-link"
                >· 후기</RouterLink
              >
            </li>
            <li v-if="user !== null" @click="logout" class="dropdown-link">
              · 로그아웃
            </li>
            <li v-if="user === null">
              <RouterLink :to="{ name: 'regist' }" class="dropdown-link"
                >· 회원가입</RouterLink
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const user = ref(authStore.user);
const router = useRouter();
const checked = ref(false);

watch(authStore, () => {
  user.value = authStore.user;
});

const logout = () => {
  if (!confirm("로그아웃 하시겠습니까?")) return;
  authStore.logout();
  router.push({ name: "home" });
  checked.value = false; // Close the dropdown menu after logout
};

const handleOutsideClick = (event) => {
  if (!event.target.closest(".menu-container")) {
    checked.value = false;
  }
};

// Ensure the dropdown menu closes when clicking outside
onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>

<style scoped>
header {
  background-color: white; /* 배경색 흰색으로 변경 */
  border-bottom: 1px solid #f7931e; /* 주황색 테두리를 아래쪽에만 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  height: 100px; /* 헤더 높이 줄임 */
  position: relative;
  box-shadow: 1px 1px 5px 0px #ee703f;
  margin-bottom: 3px;
}

nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
}

.nav-left {
  flex: 1;
}

.nav-right {
  flex: 1;
  justify-content: flex-end;
}

.nav-right li {
  list-style: none;
  margin-left: 1em;
}

.logo {
  list-style: none;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.nav-link.button {
  background-color: #ee703f; /* 주황색 배경 */
  color: #e0ffff;
  padding: 0.75em 1.5em; /* Increased padding for larger button */
  border-radius: 40px;
  transition: background-color 0.3s;
  font-size: 1.2em; /* Increased font size */
}

.nav-link.button:hover {
  background-color: #cc6d17; /* 어두운 주황색 호버 효과 */
}

.menu-container {
  position: relative;
}

.checkboxtoggler {
  width: 3em;
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  cursor: pointer;
}

.line-1,
.line-2,
.line-3 {
  background: #ee703f; /* 주황색으로 변경 */
  height: 0.3em;
  border-radius: 10em;
  transition-duration: 500ms;
}

#toggleChecker {
  display: none;
}

#toggleChecker:checked + #togglerLabel .checkboxtoggler .line-1 {
  transform: rotate(45deg) translateY(0.7em) translateX(0.7em);
}

#toggleChecker:checked + #togglerLabel .checkboxtoggler .line-2 {
  transform: rotate(-45deg) translateY(0em) translateX(0.1em);
}

#toggleChecker:checked + #togglerLabel .checkboxtoggler .line-3 {
  transform: scaleX(0);
  transform-origin: left;
}

.dropdown-menu {
  position: absolute;
  top: 3em;
  right: 0;
  background: white;
  border: 1px solid #cccccc; /* 주황색으로 테두리 변경 */
  border-radius: 0.5em;
  box-shadow: 1px 1px 3px 0px #cccccc;
  padding: 1em;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  z-index: 10;
  min-width: 8em; /* Ensures menu items are horizontally aligned */
}

.dropdown-link {
  width: 6em;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5em;
  background-color: #ee703f; /* 진한 주황색으로 변경 */
  padding: 0.5em 1em;
  border-radius: 40px;
  color: white; /* 글자색 흰색으로 변경 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 약간의 그림자 효과 */
}

.profile-img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 0.5px solid #ffdab9; /* 진한 주황색 테두리 */
}

.user-nickname {
  font-weight: bold;
  font-size: 1.1em;
  text-align: center; /* 닉네임 가운데 정렬 */
}
</style>
