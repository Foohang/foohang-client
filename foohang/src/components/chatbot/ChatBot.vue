<template>
  <div class="chatbot-container">
    <div class="chatbot-icon" @click.stop="toggleChat">💬</div>
    <div v-if="isChatOpen" class="chatbot" @click.stop>
      <div class="header">
        <span class="title">youme</span>
        <button class="close-button" @click="toggleChat">x</button>
      </div>
      <div class="messages" ref="messagesContainer">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', message.sender]"
        >
          {{ message.text }}
        </div>
        <div v-if="isLoading" class="loading">
          <span>생각중..</span>
        </div>
      </div>
      <div class="input-container">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="메시지를 입력하세요..."
        />
        <button @click="sendMessage">전송</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useChatStore } from "@/stores/chat";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { toRefs, defineProps, defineEmits } from "vue";

const props = defineProps({
  isChatOpen: Boolean,
});

const emit = defineEmits(["toggleChat", "openChat"]);
const { isChatOpen } = toRefs(props);

const messages = ref([]);
const newMessage = ref("");
const isLoading = ref(false);
const chatStore = useChatStore();
const userStore = useAuthStore();
const messagesContainer = ref(null);

// Add initial message
messages.value.push({
  id: messages.value.length + 1,
  text: `안녕 ${userStore.user.nickName}! 내 이름은 youme야! 나랑 같이 여행 계획 짜자!`,
  sender: "bot",
});

watch(chatStore, () => {
  autoBotResponse(chatStore.findAttraciton);
});

watch(props, () => {
  nextTick(() => {
    scrollToBottom();
  });
});

const toggleChat = () => {
  emit("toggleChat");
};

const sendMessage = () => {
  if (newMessage.value.trim() !== "") {
    addMessage(newMessage.value, "user");
    newMessage.value = "";
    generateBotResponse();
  }
};

const addMessage = (text, sender) => {
  messages.value.push({
    id: messages.value.length + 1,
    text,
    sender,
  });
  nextTick(() => {
    scrollToBottom();
  });
};

const scrollToBottom = () => {
  const container = messagesContainer.value;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

const autoBotResponse = async (attractionName) => {
  if (attractionName.trim() === "") return;
  emit("openChat");
  const apiKey = "sk-proj-u0bdxdOSRNFFqcQ0duBMT3BlbkFJV1ZCncvOWZzbwUsJCHTb"; // 여기에 OpenAI API 키를 입력하세요.
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  isLoading.value = true; // 로딩 상태 시작
  const contextMessage = {
    role: "system",
    content: `너가 내 애인인 것처럼 이야기해줘. 그리고 대답은 40글자 이내로 반말로 해줘. 시작한다. 안녕 youme야, 내 이름은 ${userStore.user.nickName}이야! 나랑 같이 여행 계획 짜자! 내가 좋아하는 지역은 ${userStore.user.region}이고, 먹고 싶은 음식은 ${userStore.user.food}야. 근데 매번 똑같은 음식이나 장소만 추천하는 건 재미없으니까, 다양한 제안을 해줄게. 우리 함께 멋진 여행 만들어보자!`,
  };
  const questionMessage = {
    role: "system",
    content: `이번 여행에 ${attractionName}으로 여행가는거 어때?`,
  };
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      contextMessage,
      ...messages.value.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      questionMessage,
    ],
  };
  try {
    const response = await axios.post(apiUrl, data, { headers });
    const botMessage = response.data.choices[0].message.content;
    addMessage(botMessage, "bot");
  } catch (error) {
    console.error("Dialogflow API 호출 오류:", error);
    addMessage(`${attractionName}? 미안, 여기는 잘 모르겠어.ㅠㅠ`, "bot");
  } finally {
    isLoading.value = false; // 로딩 상태 종료
    nextTick(() => {
      scrollToBottom();
    });
  }
};

const generateBotResponse = async () => {
  const apiKey = "sk-proj-u0bdxdOSRNFFqcQ0duBMT3BlbkFJV1ZCncvOWZzbwUsJCHTb"; // 여기에 OpenAI API 키를 입력하세요.
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  isLoading.value = true; // 로딩 상태 시작
  const contextMessage = {
    role: "system",
    content: `너가 내 애인인 것처럼 이야기해줘. 그리고 대답은 30글자 이내로 해줘. 시작한다. 안녕 youme야, 내 이름은 ${userStore.user.nickName}이야! 나랑 같이 여행 계획 짜자! 내가 좋아하는 지역은 ${userStore.user.region}이고, 먹고 싶은 음식은 ${userStore.user.food}야. 근데 매번 똑같은 음식이나 장소만 추천하는 건 재미없으니까, 다양한 제안을 해줄게. 우리 함께 멋진 여행 만들어보자!`,
  };
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      contextMessage,
      ...messages.value.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
    ],
  };

  try {
    const response = await axios.post(apiUrl, data, { headers });
    const botMessage = response.data.choices[0].message.content;
    addMessage(botMessage, "bot");
  } catch (error) {
    console.error("Dialogflow API 호출 오류:", error);
    addMessage("뭐라고?.", "bot");
  } finally {
    isLoading.value = false; // 로딩 상태 종료
    nextTick(() => {
      scrollToBottom();
    });
  }
};
</script>

<style scoped>
.chatbot-container {
  position: relative;
}

.chatbot-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ee703f;
  color: white;
  border-radius: 50%;
  padding: 15px;
  cursor: pointer;
  z-index: 1000;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chatbot {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  max-height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  /* padding-right: 10px; */
  background-color: #ee703f;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.title {
  font-weight: bold;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.message {
  display: flex;
  padding: 10px;
  margin: 10px 0;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
}

.message.user {
  align-self: flex-end;
  background-color: #f1f0f0;
  margin-left: auto;
}

.message.bot {
  align-self: flex-start;
  background-color: #ed5a00;
  color: #f8f9fb;
  margin-right: auto;
}

.input-container {
  display: flex;
  align-items: center;
  padding: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  background-color: #ee703f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:out(.close-button):hover {
  background-color: #ffdab9;
}

.loading {
  text-align: center;
  margin: 10px 0;
  color: #007bff;
}
</style>
