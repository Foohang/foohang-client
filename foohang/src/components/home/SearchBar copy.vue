<script setup>
import { ref, watch, computed } from "vue";
import { useSidoStore } from "@/stores/sido";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const token = computed(() => authStore.token);
const router = useRouter();
const sidoStore = useSidoStore();

// 데이터 초기화
const sidoNames = ref([]);
const selectName = ref("");
const selectList = ref([]);

// 데이터 셋팅 함수
const setInfo = async () => {
  await sidoStore.getSido();
  selectList.value = sidoStore.sidoList.map((item) => ({
    ...item,
    currentIndex: 1, // 각 항목에 currentIndex를 추가
    timer: null, // 각 항목에 timer를 추가
  }));
  sidoNames.value = sidoStore.sidoList.map((item) => item.sidoName);
};

// selectName이 변경될 때마다 selectList 업데이트
watch(selectName, (newVal) => {
  if (newVal === "") {
    selectList.value = sidoStore.sidoList.map((item) => ({
      ...item,
      currentIndex: 1, // 각 항목에 currentIndex를 추가
      timer: null, // 각 항목에 timer를 추가
    }));
  } else {
    selectList.value = sidoStore.sidoList
      .filter((item) => item.sidoName.includes(newVal))
      .map((item) => ({
        ...item,
        currentIndex: 1, // 각 항목에 currentIndex를 추가
        timer: null, // 각 항목에 timer를 추가
      }));
  }
});

// 초기 데이터 셋팅
setInfo();

// 메인 페이지로 이동 함수
const moveMain = (item) => {
  console.log(token.value);
  // if(user.value==null || token.value == null){
  //     alert("로그인이 필요합니다.");
  //     router.push({name: 'login'});
  // }
  // else {
  console.log(item.sidoName);
  console.log(item.sidoCode);
  router.push({
    name: "mainPage",
    state: {
      dataObj: {
        sidoName: item.sidoName,
        sidoCode: item.sidoCode,
      },
    },
  });
  // }
};

// hover 시작 함수
const startHover = (item) => {
  stopHover(item); // 기존 타이머가 있으면 정지
  item.timer = setInterval(() => {
    item.currentIndex = (item.currentIndex % 5) + 1; // 1부터 5까지 순환
    item.gugunName = `${item.sidoImage}-${item.currentIndex}.jpg`; // 이미지 경로 갱신
  }, 1000); // 1초마다 변경
};

// hover 종료 함수
const stopHover = (item) => {
  if (item.timer) {
    clearInterval(item.timer); // 해당 카드의 hover 타이머 해제
    item.timer = null;
    item.currentIndex = 1; // 호버 종료 시 첫 번째 이미지로 리셋
    item.gugunName = `${item.sidoImage}-1.jpg`; // 기본 이미지로 리셋
  }
};
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
        <v-col
          cols="12"
          md="6"
          lg="4"
          v-for="(item, index) in selectList"
          :key="index"
        >
          <v-card
            elevation="2"
            @click="moveMain(item)"
            @mouseover="startHover(item)"
            @mouseleave="stopHover(item)"
          >
            <v-img :src="item.gugunName || `${item.sidoImage}-1.jpg`" height="200"></v-img>
            <v-card-title>{{ item.sidoName }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
