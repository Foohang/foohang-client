<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
import MainHeader from "@/components/header/MainHeader.vue";
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const router = useRouter();

const logout = () => {
  if (!confirm("로그아웃 하시겠습니까?")) return;
  authStore.logout();

  router.push({name:"home"}); 
};
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink :to="{name:'home'}"><img src="@/assets/FoohangLogo.png" height="120" alt="로고" /></RouterLink></li>
      </ul>
      <ul v-if="user == null">
        <li><RouterLink :to="{name:'login'}" >로그인</RouterLink></li>
        <li><RouterLink :to="{name:'regist'}">회원가입</RouterLink></li>
      </ul>
      <ul v-else>
        <li>{{ user.nickName }}님 접속 중</li>
        <li><RouterLink :to="{name:'mypage'}">마이페이지</RouterLink></li>
        <li @click="logout">로그아웃</li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  border: 1px solid black;
}

header ul {
  display: flex;
  justify-content: space-around;
}
</style>

