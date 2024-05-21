<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
const authStore = useAuthStore();
console.log(authStore.user)
const userProfile = ref({
    nickName : authStore.user.nickName,
    profileName: `http://localhost/files/profile/${authStore.user.profileName}`,
    statusMessage: authStore.user.statusMessage,
})
</script>

<template>
    <div class="out">
        <div class="profile">
            <img :src="userProfile.profileName" class="img" />
            <h1> {{ userProfile.nickName }} 님</h1>
            <p>{{ userProfile.statusMessage }}</p>
        </div>
    <div class="show"><RouterView /></div>
    </div>



    
</template>

<style scoped>
.out{
display: flex;
justify-content: space-around;
}
.img{
    width: 100%;
}

.show{
    width: 70%;
}
.profile{
    width: 20%;
}
</style>