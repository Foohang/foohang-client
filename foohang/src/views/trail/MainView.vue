<script setup lang="ts">
import { ref, watch } from "vue";
import { KakaoMap } from "vue3-kakao-maps";
import { useSidoStore } from "@/stores/sido";
import { useGugunStore } from "@/stores/gugun";
import { useAttractionStore } from "@/stores/attraction";

const { dataObj } = history.state;
const sidoName = ref(dataObj.sidoName);
const sidoCode = ref(dataObj.sidoCode);

const sidoStore = useSidoStore();
const sidoList = ref(sidoStore.sidoList);
const sidoNames = ref(sidoStore.sidoList.map((item) => item.sidoName));

const gugunName = ref(null);
const gugunCode = ref(null);

const gugunStore = useGugunStore();
const gugunList = ref(gugunStore.gugunList);
const gugunNames = ref(gugunStore.gugunList.map((item) => item.gugunName));

watch(sidoName, (newVal) => {
  const matchedSido = sidoList.value.find((item) => item.sidoName === newVal);
  if (matchedSido) {
    sidoCode.value = matchedSido.sidoCode;
  }
  // gugunStore.getGugun(sidoCode);
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
  // await attractionStore.getAttraction(sidoCode, gugunCode, type);
};
const routeName = ref("장소 불러오기");
const seen = ref(false);
const getRouteList = function () {
  seen = true;
};
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

        <v-btn variant="outlined" @clicked="search"> 검색 </v-btn>
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
        <p>{{ sidoCode }}</p>
        <p>{{ sidoName }}</p>
        <p>{{ gugunCode }}</p>
        <p>{{ gugunName }}</p>
        <p>{{ type }}</p>
        <v-card
          class="mx-auto"
          max-width="300"
          v-for="(item, index) in attractionList"
          :key="index"
        >
          <v-img
            class="align-end text-white"
            height="100"
            :src="item.firstImage"
            cover
          >
            <v-card-title>{{ item.contentName }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4">{{
            item.contentTypeId
          }}</v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange" text="등록"></v-btn>

            <v-btn color="gray" text="정보"></v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <v-btn variant="outlined" @clicked="getRouteList" color="orange">
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
.v-card + .v-card {
  margin-top: 20px; /* 원하는 간격으로 조절 */
}
/* 스크롤 영역을 가진 컨테이너 */
.cards {
  overflow-y: auto; /* 세로 스크롤을 추가합니다. */
  max-height: 40vh; /* 스크롤 영역의 최대 높이를 지정합니다. */
}
</style>
