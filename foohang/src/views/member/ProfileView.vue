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
            <p>{{ userProfile.statusMessage }}</p>
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
    width: 200px;
    height: 280px;
    padding: 20px;
    text-align: center;
    color: #333;
    font-family: "Poppins", sans-serif;
    background-color: #d3d3d3;
    border: 4px solid #b0b0b0;
    border-radius: 20px; /* 부드러운 모서리 */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;
}

.profile:hover {
    transform: translateY(-10px);
}

.profile::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -5px;
    margin: auto;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 20px; /* 부드러운 모서리 */
    background: linear-gradient(-45deg, #c0c0c0 0%, #d3d3d3 100%);
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.profile::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #ff7f50 0%, #ffd700 100%);
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
    border: 4px solid #b0b0b0;
    border-radius: 20px; /* 부드러운 모서리 */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    background-color: #fff; /* Added background color for visibility */
}

.name-client {
    margin: 0;
    margin-top: 20px;
    font-weight: 600;
    font-size: 24px; /* 글자 크기 키움 */
    color: #333;
}

.name-client span {
    display: block;
    font-weight: 200;
    font-size: 16px;
}

.show {
    width: 70%;
}
</style>
