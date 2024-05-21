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
  <div class="app-container">
    <MainHeader></MainHeader>
    <div class="content-container">
      <RouterView />
    </div>
    <ChatBot
      :isChatOpen="isChatOpen"
      @toggleChat="isChatOpen = !isChatOpen"
      @openChat="isChatOpen = true"
    />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 뷰포트 전체 높이를 차지하도록 설정 */
}

.content-container {
  flex: 1; /* 나머지 공간을 모두 차지하도록 설정 */
  background: #fff; /* 하얀 배경 설정 */
}
</style>
