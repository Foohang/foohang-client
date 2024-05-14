<script setup></script>

<template>
  <div>
    <RouterLink :to="{name:'home'}"><img src="@/assets/logo.svg" height="20" alt="로고"></img></RouterLink>
    <RouterLink :to="{name:'login'}" >로그인</RouterLink>
    <RouterLink :to="{name:'regist'}">회원가입</RouterLink>
  </div>
</template>

<style scoped>
</style>
