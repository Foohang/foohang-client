<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const authStore = useAuthStore();
const userProfile = ref({
  nickName: authStore.user.nickName,
  profileName: `http://localhost/files/profile/${authStore.user.profileName}`,
  statusMessage: authStore.user.statusMessage,
});
</script>

<template>
  <div class="out">
    <div class="profile card">
      <img :src="userProfile.profileName" class="img user-picture" />
      <h1 class="name-client">{{ userProfile.nickName }} 님</h1>
      <p class="status-message">{{ userProfile.statusMessage }}</p>
    </div>
    <div class="show"><RouterView /></div>
  </div>
</template>

<style scoped>
.out {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #f5f5f5;
}

.profile {
  margin-top: 50px;
  width: 160px;
  height: 200px;
  padding: 20px;
  text-align: center;
  color: #333;
  font-family: "Poppins", sans-serif;
  background-color: #f8f9fb20;
  border: 0.5px solid #cccccc;
  border-radius: 20px; /* 부드러운 모서리 */
  box-shadow: 1px 5px 20px 0px #ffdab9;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.profile:hover {
  transform: translateY(-10px);
}

.profile::before {
  content: "";
  position: absolute;
  inset: 0;
  left: -5px;
  margin: auto;
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  border-radius: 20px; /* 부드러운 모서리 */
  background: linear-gradient(-45deg, #c0c0c0 0%, #ffdab9 100%);
  z-index: -10;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.profile::after {
  content: "";
  z-index: -1;
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, #ee703f 0%, #ffdab9 100%);

  transform: translate3d(0, 0, 0) scale(0.95);
  filter: blur(20px);
}

.profile:hover::after {
  filter: blur(30px);
}

.profile:hover::before {
  transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
}

.user-picture {
  overflow: hidden;
  object-fit: cover;
  width: 5rem;
  height: 5rem;
  border: 1px solid #ffdab9;
  box-shadow: 0.5px 0.5px 20px 1px #cccccc;
  border-radius: 20px; /* 부드러운 모서리 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #fff; /* Added background color for visibility */
}

.name-client {
  margin: 0;
  margin-top: 10px;
  border-top: solid 1.5px #cccccc;
  font-size: 12px; /* 글자 크기 키움 */
  color: #333;
  text-shadow: 0.4px 0.4px 1px #00000080;
}

.name-client span {
  display: block;
  font-weight: normal;
  font-size: 16px;
}

.status-message {
  margin-top: 3px;
  font-size: 10px;
  font-weight: normal;
  color: #bbbbbb;
  text-shadow: 0.4px 0.4px 1px #00000080;
}

.profile:hover .status-message {
  color: #f8f9fb;
  text-shadow: 1px 1px 1px #00000080;
}

.show {
  width: 70%;
}
</style>
