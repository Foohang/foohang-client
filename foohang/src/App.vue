<script setup>
import MainHeader from "./components/header/MainHeader.vue";
import ChatBot from "@/components/chatbot/ChatBot.vue";
</script>

<template>
  <MainHeader></MainHeader>
  <ChatBot />
  <RouterView />
</template>

<style scoped></style>
