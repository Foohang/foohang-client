<script setup>
import { ref, watch, computed } from "vue";
import { useSidoStore } from "@/stores/sido";
import {useAuthStore} from "@/stores/auth";
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const token = computed(()=>authStore.token);
const router = useRouter();
const moveMain = (item)=>{
    console.log(token)
    if(user.value==null || token.value == null){
        alert("로그인이 필요합니다.");
        router.push({name: 'login'});
    }
    else {
        console.log(item.sidoName)
    console.log(item.sidoCode)
    router.push({
	name: 'mainPage',
    state: {dataObj:{
        sidoName: item.sidoName,
        sidoCode: item.sidoCode
    },
}
})
    }
}
const sidoStore = useSidoStore();
// await sidoStore.getSido();
const sidoList = sidoStore.sidoList; 
const sidoNames = ref(sidoList.map(item => item.sidoName));
const selectName = ref("");
const selectList = ref(null);
watch(selectName, (newVal)=> {
    if (newVal === "") {
    selectList.value = sidoList;
} else {
    selectList.value = sidoList.filter((item) => item.sidoName.includes(newVal));
}
})
selectList.value = sidoList;
</script>

<template>
    <div>
        <v-combobox
            label="Combobox"
            :items="sidoNames" 
            v-model="selectName"
            variant="outlined"
        ></v-combobox>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="6" lg="4" v-for="(item, index) in selectList" :key="index">
              <v-card elevation="2" @click="moveMain(item)">
                <v-img :src="item.sidImage" height="200"></v-img>
                <v-card-title>{{ item.sidoName }}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
    </div>
</template>

<style scoped>

</style>
