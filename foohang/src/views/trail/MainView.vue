<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { KakaoMap } from "vue3-kakao-maps";
import { useSidoStore } from "@/stores/sido";
import { useGugunStore } from "@/stores/gugun";
import { useAttractionStore } from "@/stores/attraction";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const token = computed(() => authStore.token);
const router = useRouter();

const { dataObj } = history.state;
const sidoName = ref(dataObj.sidoName);
const sidoCode = ref(dataObj.sidoCode);

const sidoStore = useSidoStore();
const sidoList = ref(null);
sidoList.value = sidoStore.sidoList;
const sidoNames = ref(sidoStore.sidoList.map((item) => item.sidoName));

const gugunName = ref(null);
const gugunCode = ref(null);

const gugunStore = useGugunStore();
const gugunList = ref(gugunStore.gugunList);
const gugunNames = ref(gugunStore.gugunList.map((item) => item.gugunName));
const initGugun = async()=>{
  await gugunStore.getGugun(sidoCode.value);
  gugunList.value = gugunStore.gugunList;
  gugunNames.value = gugunStore.gugunList.map((item) => item.gugunName);
}

watch(sidoName, async (newVal) => {
  const matchedSido = sidoList.value.find((item) => item.sidoName === newVal);
  if (matchedSido) {
    sidoCode.value = matchedSido.sidoCode;
  }
  await gugunStore.getGugun(sidoCode.value);
  gugunName.value = null;
  gugunCode.value = null;
  gugunList.value = gugunStore.gugunList;
  gugunNames.value = gugunStore.gugunList.map((item) => item.gugunName);
});

watch(gugunName, (newVal) => {
  const matchedGugun = gugunList.value.find(
    (item) => item.gugunName === newVal
  );
  if (matchedGugun) {
    gugunCode.value = matchedGugun.gugunCode;
  }
});

const type = ref("0");

const attractionStore = useAttractionStore();
const attractionList = ref(attractionStore.attractionList);

const search = async (sidoCode, gugunCode, type) => {
  await attractionStore.getAttraction(sidoCode, gugunCode, type);
  attractionList.value = attractionStore.attractionList;
  expandedCardIndex.value = null;
};

const routeName = ref("장소 불러오기");
const seen = ref(false);
const getRouteList = function () {
  if(user.value==null || token.value == null){
      alert("로그인이 필요합니다.");
  }else{
      console.log(seen.value)
  if(seen.value){
    seen.value =false;
    routeName.value = "장소 불러오기"
  }else{
    seen.value = true;
    routeName.value = "장소 불러오기 취소"
  }
  }

};


//카드 관련
const getContentTypeName = (contentTypeId) => {
  switch (contentTypeId) {
    case 12:
      return '관광지';
    case 14:
      return '문화시설';
    case 15:
      return '축제공연행사';
    case 25:
      return '여행코스';
    case 28:
      return '레포츠';
    case 32:
      return '숙박';
    case 38:
      return '쇼핑';
    case 39:
      return '음식점';
    default:
      return '';
  }
};

// 카드 상세 정보 관련
const attractionDetail = ref(null)
const expandedCardIndex = ref(null);

const expandCard = async (index, item) => {
  expandedCardIndex.value = index;
  await attractionStore.getAttractionDetail(item.contentId);
  attractionDetail.value = attractionStore.attractionDetail;
  console.log(attractionDetail.value)
};

const closeCard = () => {
  expandedCardIndex.value = null;
};

const register = (item) => {
  
};
initGugun();
</script>

<template>
  <main class="main">
    <div class="spot">
      <h1>장소 선택</h1>
      <div class="selected">
        <v-select
          width="80%"
          :items="sidoNames"
          v-model="sidoName"
          density="comfortable"
          label="시·도"
        ></v-select>
        <v-select
          width="80%"
          :items="gugunNames"
          v-model="gugunName"
          density="comfortable"
          label="구·군"
        ></v-select>

        <v-btn variant="outlined" @click="search(sidoCode,gugunCode,type)"> 검색 </v-btn>
      </div>
      <!-- 버튼 -->
      <v-card flat>
        <v-card-text>
          <v-container fluid>
            <v-radio-group v-model="type" column>
              <v-row>
                <v-col cols="12" md="4">
                  <v-radio
                    color="orange-darken-3"
                    label="전체"
                    value="0"
                  ></v-radio>
                  <v-radio
                    color="orange-darken-3"
                    label="관광지"
                    value="12"
                  ></v-radio>
                  <v-radio
                    color="orange-darken-3"
                    label="문화시설"
                    value="14"
                  ></v-radio>
                </v-col>
                <v-col cols="12" md="4">
                  <v-radio
                    color="orange-darken-3"
                    label="축제공연행사"
                    value="15"
                  ></v-radio>
                  <v-radio
                    color="orange-darken-3"
                    label="여행코스"
                    value="25"
                  ></v-radio>
                  <v-radio
                    color="orange-darken-3"
                    label="레포츠"
                    value="28"
                  ></v-radio>
                </v-col>
                <v-col cols="12" md="4">
                  <v-radio
                    color="orange-darken-3"
                    label="숙박"
                    value="32"
                  ></v-radio>
                  <v-radio
                    color="orange-darken-3"
                    label="쇼핑"
                    value="38"
                  ></v-radio>
                  <v-radio
                    color="orange-darken-3"
                    label="음식점"
                    value="39"
                  ></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-container>
        </v-card-text>
      </v-card>
      <hr />
      <div class="cards">
        <v-card
          class="mx-auto"
          max-width="300"
          height="200"
          v-for="(item, index) in attractionList"
          :key="index"
        >
        <div  v-if="expandedCardIndex !== index">
          <v-img
            class="align-end text-white"
            height="100"
            :src="item.firstImage"
            cover
          >
            <v-card-title>{{ item.title }}</v-card-title>
          </v-img>
          
          <v-card-subtitle class="pt-4">{{
            getContentTypeName(item.contentTypeId)
          }}</v-card-subtitle>
    <v-card-actions>
      <v-btn color="orange" @click.stop="register(index)">등록</v-btn>
      <v-btn color="gray" @click.stop="expandCard(index,item)">정보</v-btn>
    </v-card-actions>
</div>
<div v-else class="card-text">
    <v-card-text v-if="attractionDetail">
      <p>관광지명: {{ attractionDetail.title }}</p>
      <p>주소: {{ attractionDetail.addr1 }}</p>
      <p>상세 정보: {{ attractionDetail.overview }}</p>
    </v-card-text>
          <v-card-actions>
      <v-btn color="orange" @click.stop="register(index)">등록</v-btn>
      <v-btn color="gray" @click.stop="closeCard">간단히</v-btn>
    </v-card-actions>
  </div>
        </v-card>
      </div>
      <v-btn variant="outlined" @click="getRouteList" color="orange">
        {{ routeName }}
      </v-btn>
    </div>
    <KakaoMap :lat="33.450701" :lng="126.570667" width="100%" height="50rem" />
    <div v-if="seen">
      <h1>test2</h1>
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-around;
}
.spot {
  width: 600px;
}
.selected {
  display: flex;
  justify-content: space-around;
}
/* 버튼 */
.v-radio,
.v-label {
  font-size: 5px; /* 원하는 크기로 조정하세요 */
}

/* 카드 */
.v-card {
  margin-top: 20px; /* 원하는 간격으로 조절 */
}
/* 스크롤 영역을 가진 컨테이너 */
.cards {
  overflow-y: auto; /* 세로 스크롤을 추가합니다. */
  max-height: 45vh; /* 스크롤 영역의 최대 높이를 지정합니다. */
}
.card-text{
  overflow-y: auto;
  max-height: 200px;
}
</style>
