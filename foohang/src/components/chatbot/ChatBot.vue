<template>
  <div>
    <div class="chatbot-icon" @click="toggleChat">💬</div>
    <div v-if="isChatOpen" class="chatbot">
      <div class="messages">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', message.sender]"
        >
          {{ message.text }}
        </div>
      </div>
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="메시지를 입력하세요..."
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      isChatOpen: false,
    };
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.addMessage(this.newMessage, "user");
        this.newMessage = "";
        this.generateBotResponse();
      }
    },
    addMessage(text, sender) {
      this.messages.push({
        id: this.messages.length + 1,
        text,
        sender,
      });
    },
    async generateBotResponse() {
      const apiKey = "YOUR_OPENAI_API_KEY"; // 여기에 OpenAI API 키를 입력하세요.
      const apiUrl = "https://api.openai.com/v1/chat/completions";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };
      const data = {
        model: "gpt-3.5-turbo",
        messages: this.messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      };

      try {
        const response = await axios.post(apiUrl, data, { headers });
        const botMessage = response.data.choices[0].message.content;
        this.addMessage(botMessage, "bot");
      } catch (error) {
        console.error("ChatGPT API 호출 오류:", error);
        this.addMessage(
          "죄송합니다, 답변을 생성하는데 문제가 발생했습니다.",
          "bot"
        );
      }
    },
  },
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
