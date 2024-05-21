<template>
  <div>
    <div class="chatbot-icon" @click="toggleChat">
      💬
    </div>
    <div v-if="isChatOpen" class="chatbot">
      <div class="messages">
        <div v-for="message in messages" :key="message.id" :class="['message', message.sender]">
          {{ message.text }}
        </div>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="메시지를 입력하세요..." />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const messages = ref([]);
const newMessage = ref('');
const isChatOpen = ref(false);
const chatStore = useChatStore();
const userStore = useAuthStore();
const sessionId = ref('123456'); // 각 사용자에 대해 고유한 세션 ID를 사용할 수 있습니다.



watch(chatStore,()=>{
  autoBotResponse(chatStore.findAttraciton);
})

watch(userStore,()=>{
  sessionId.value = userStore.user.memberId;
})

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    addMessage(newMessage.value, 'user');
    newMessage.value = '';
    generateBotResponse();
  }
};

const addMessage = (text, sender) => {
  messages.value.push({
    id: messages.value.length + 1,
    text,
    sender,
  });
};

const autoBotResponse = async (attractionName) => {
  const apiKey = 'c4c85246d5d44fa15d63a9b8d1404c35196de760'; // 여기에 Dialogflow API 키를 입력하세요.
  const apiUrl = `https://dialogflow.googleapis.com/v2/projects/sodium-castle-423917-k4/agent/sessions/${sessionId.value}:detectIntent`;

  const data = {
    queryInput: {
      text: {
        text: `선호지역이 서울이고 선호 음식이 오늘 점심뭐임이고 성별이 여성인 사람의 애인이라고 생각하고 대답해줘. 답변의 형태는 글형태가 아니라 채팅을한다고 생각하고 답변해줘. ${attractionName}으로 여행가는거 어때?`,
        languageCode: 'ko', // 원하는 언어 코드로 변경하세요.
      },
    },
  };
  isChatOpen.value = true;
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const botMessage = response.data.queryResult.fulfillmentText;
    addMessage(botMessage, 'bot');
  } catch (error) {
    console.error('Dialogflow API 호출 오류:', error);
    addMessage(`${attractionName}? 미안, 여기는 잘 모르겠어.ㅠㅠ`, 'bot');
  }
};

const generateBotResponse = async () => {
  const apiKey = 'c4c85246d5d44fa15d63a9b8d1404c35196de760'; // 여기에 Dialogflow API 키를 입력하세요.
  const apiUrl = `https://dialogflow.googleapis.com/v2/projects/sodium-castle-423917-k4/agent/sessions/${sessionId.value}:detectIntent`;

  const data = {
    queryInput: {
      text: {
        text: messages.value[messages.value.length - 1].text,
        languageCode: 'ko', // 원하는 언어 코드로 변경하세요.
      },
    },
  };

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const botMessage = response.data.queryResult.fulfillmentText;
    addMessage(botMessage, 'bot');
  } catch (error) {
    console.error('Dialogflow API 호출 오류:', error);
    addMessage('죄송합니다, 답변을 생성하는데 문제가 발생했습니다.', 'bot');
  }
};
</script>

<style scoped>
.chatbot-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 1000;
}

.chatbot {
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 300px;
  max-height: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}

.message.user {
  align-self: flex-end;
  background-color: #dcf8c6;
}

.message.bot {
  align-self: flex-start;
  background-color: #f1f0f0;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
}
</style>
