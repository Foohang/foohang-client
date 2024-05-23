<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import { useSidoStore } from "@/stores/sido";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import SearchBar from "@/components/SearchBar.vue";

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
    currentIndex: 1,
    currentImage: `${item.sidoImage}-1.jpg`,
    timer: null,
    fading: false,
  }));
  sidoNames.value = sidoStore.sidoList.map((item) => item.sidoName);
};

// selectName이 변경될 때마다 selectList 업데이트
watch(selectName, (newVal) => {
  if (newVal === "") {
    selectList.value = sidoStore.sidoList.map((item) => ({
      ...item,
      currentIndex: 1,
      currentImage: `${item.sidoImage}-1.jpg`,
      timer: null,
      fading: false,
    }));
  } else {
    selectList.value = sidoStore.sidoList
      .filter((item) => item.sidoName.includes(newVal))
      .map((item) => ({
        ...item,
        currentIndex: 1,
        currentImage: `${item.sidoImage}-1.jpg`,
        timer: null,
        fading: false,
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
  stopHover(item); // 기존 타이머가 있을 경우 정지
  item.timer = setInterval(() => {
    item.currentIndex = (item.currentIndex % 3) + 1;
    const nextImage = `${item.sidoImage}-${item.currentIndex}.jpg`;

    item.fading = true; // 페이드 효과 활성화
    setTimeout(() => {
      item.currentImage = nextImage;
      item.fading = false; // 페이드 효과 비활성화
    }, 500); // 페이드 효과 지속 시간의 절반으로 설정하여 전환 중간에 이미지를 변경
  }, 1000); // 1초마다 변경
};

// hover 종료 함수
const stopHover = (item) => {
  if (item.timer) {
    clearInterval(item.timer);
    item.timer = null;
    item.currentIndex = 1;
    item.currentImage = `${item.sidoImage}-1.jpg`;
    item.fading = false; // 페이드 효과 비활성화
  }
};

// 컴포넌트 언마운트 시 모든 타이머 정지
onBeforeUnmount(() => {
  selectList.value.forEach((item) => stopHover(item));
});
</script>

<template>
  <div>
    <SearchBar @update:search="selectName = $event" />
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
            class="v-card-custom"
            @click="moveMain(item)"
            @mouseover="startHover(item)"
            @mouseleave="stopHover(item)"
          >
            <v-img
              :src="item.currentImage"
              height="200"
              class="v-img-fade v-img-cover"
              :class="{
                'v-img-hidden': item.fading,
                'v-img-visible': !item.fading,
              }"
            ></v-img>
            <v-card-title class="v-card-title-custom">
              {{ item.sidoName }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.v-card-custom {
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  border: 2px solid transparent;
}

.v-card-custom {
  height: auto;
}

.v-card-custom:hover {
  transform: scale(1.05);
  border-color: #ee703f80;
}

.image-container {
  position: relative;
  height: 200px;
}

.v-img-fade {
  transition: opacity 1s ease;
}

.v-img-hidden {
  opacity: 0;
}

.v-img-visible {
  opacity: 1;
}

.v-img-cover {
  object-fit: cover; /* 이미지를 비율을 유지하면서 크기 조정 */
}

.v-img-next {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.v-card-title-custom {
  color: #000000;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 2px solid #ffdab9;
}
</style>
