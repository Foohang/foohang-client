<script setup>
import MainHeader from "./components/header/MainHeader.vue";
import ChatBot from "@/components/chatbot/ChatBot.vue";
import { ref } from "vue";

const isChatOpen = ref(false);

// 외부 클릭 감지를 위한 함수
const handleClickOutside = (event) => {
  const chatbotElement = document.querySelector(".chatbot");
  const chatbotIcon = document.querySelector(".chatbot-icon");
  if (
    isChatOpen.value &&
    chatbotElement &&
    !chatbotElement.contains(event.target) &&
    !chatbotIcon.contains(event.target)
  ) {
    isChatOpen.value = false;
  }
};

// 페이지 전체에 클릭 이벤트 리스너 추가
document.addEventListener("click", handleClickOutside);
</script>

<template>
  <MainHeader></MainHeader>
  <ChatBot
    :isChatOpen="isChatOpen"
    @toggleChat="isChatOpen = !isChatOpen"
    @openChat="isChatOpen = true"
  />
  <RouterView />
</template>

<style scoped></style>
