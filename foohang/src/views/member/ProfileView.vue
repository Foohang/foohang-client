<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
const authStore = useAuthStore();

const userProfile = ref({
    nickName : authStore.user.nickName
})
</script>

<template>
    <h1>마이페이지</h1>
    <div class="out">
        <div class="profile">
            <RouterLink :to="{name: 'mypage'}"> 회원 정보</RouterLink>
    <br/>
    <RouterLink :to="{name: 'review'}"> 후기</RouterLink>
    <br/>
    <p> 닉네임 : {{ userProfile.nickName }}</p>
    </div>
    <div class="show"><RouterView /></div>
    </div>



    
</template>

<style scoped>
.out{
display: flex;
justify-content: space-around;
}

.show{
    width: 70%;
}
.profile{
    width: 20%;
}
</style>