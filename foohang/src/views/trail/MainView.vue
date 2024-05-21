<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useSidoStore } from "@/stores/sido";
import { useGugunStore } from "@/stores/gugun";
import { useAttractionStore } from "@/stores/attraction";
import { useAuthStore } from "@/stores/auth";
import { useRouteStore } from "@/stores/route";
import { useRouter } from "vue-router";
import MapView from "@/components/trail/MapView.vue";
import SearchBar from "@/components/trail/SearchBar.vue";
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const token = computed(() => authStore.token);
const router = useRouter();
const routeStore = useRouteStore();

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
const initGugun = async () => {
  await gugunStore.getGugun(sidoCode.value);
  gugunList.value = gugunStore.gugunList;
  gugunNames.value = gugunStore.gugunList.map((item) => item.gugunName);
};

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

const routeName = ref("여행 경로 리스트 열기");
const seen = ref(false);
const getRouteList = async () => {
  if (user.value == null || token.value == null) {
    alert("로그인이 필요합니다.");
  } else {
    if (seen.value) {
      seen.value = false;
      routeName.value = "여행 경로 리스트 열기";
    } else {
      seen.value = true;
      routeName.value = "여행 경로 리스트 접기";
    }
    await routeStore.getRoute();
    routeList.value = routeStore.routeList;
  }
};

//검색 관련
const searchAttraction = function (){

}

//카드 관련
const getContentTypeName = (contentTypeId) => {
  switch (contentTypeId) {
    case 12:
      return "관광지";
    case 14:
      return "문화시설";
    case 15:
      return "축제공연행사";
    case 25:
      return "여행코스";
    case 28:
      return "레포츠";
    case 32:
      return "숙박";
    case 38:
      return "쇼핑";
    case 39:
      return "음식점";
    default:
      return "";
  }
};

// 카드 상세 정보 관련
const attractionDetail = ref(null);
const expandedCardIndex = ref(null);

const expandCard = async (index, item) => {
  expandedCardIndex.value = index;
  await attractionStore.getAttractionDetail(item.contentId);
  attractionDetail.value = attractionStore.attractionDetail;
};


const closeCard = () => {
  expandedCardIndex.value = null;
};

// 카드 상세 정보 관련
const attractionDetail2 = ref(null);
const expandedCardIndex2 = ref(null);

const expandCard2 = async (index, item) => {
  expandedCardIndex2.value = index;
  await attractionStore.getAttractionDetail(item.contentId);
  attractionDetail2.value = attractionStore.attractionDetail;
};


const closeCard2 = () => {
  expandedCardIndex2.value = null;
};

// attraction 선택 시 주변 관광지 보여주기
const centerLat = ref(37.0);
const centerLong = ref(127.0);
const centerSrc = ref("/src/assets/FoohangLogo.png");
const ceterContent = ref(0);
const register = (item) => {
  centerLat.value = item.latitude;
  centerLong.value = item.longitude;
  centerSrc.value = item.firstImage;
  ceterContent.value = item.contentId;
  attractionStore.clearSelectedAttractions();
};

// attraction 추가시 변경

const attractionSeen = ref(false);
const selectList = ref([]);
const attractionAdd = function () {
  selectList.value = attractionStore.selectedAttractions;
  attractionSeen.value = selectList.value.length > 0;
};

const removeList = async (contentId) => {
  await attractionStore.deleteSelectedAttractions(contentId);
  selectList.value = attractionStore.selectedAttractions;
  attractionSeen.value = selectList.value.length > 0;
};

//선택 경로 초기화
const clearList = async () => {
  await attractionStore.clearSelected();
  selectList.value = attractionStore.selectedAttractions;
  attractionSeen.value = selectList.value.length > 0;
}

watch(selectList, (newList) => {
  console.log(newList.length);
  attractionSeen.value = newList.length > 0;
}, { immediate: true });


//최적 경로 생성
const getBestRoute = async () => {
  await attractionStore.makeBestRoute();
  selectList.value = attractionStore.selectedAttractions;
  ceterContent.value = 0;
};

//최적 경로 리스트
const routeList = ref(routeStore.routeList);

//최적 경로 저장
const startDate = ref("2024-05-24");
const endDate = ref("2024-05-24")

const saveRoute = async () => {
  if (user.value == null || token.value == null) {
    alert("로그인이 필요합니다.");
  } else {
    await routeStore.saveRoute(startDate.value,endDate.value,selectList.value);
      seen.value = true;
      routeName.value = "여행 경로 리스트 접기";
    await routeStore.getRoute();
    routeList.value = routeStore.routeList;
  }
};

//최적 경로 불러오기
const showRoute = async (travelId) => {
  await routeStore.getTravel(travelId);
  selectList.value = await attractionStore.selectedAttractions;
  ceterContent.value = -1;
  centerLat.value = selectList.value[0].latitude;
  centerLong.value = selectList.value[0].longitude;
  centerSrc.value = selectList.value[0].firstImage;
}


//최적 경로 삭제
const removeItem = async (travelId) => {
  if(confirm("삭제하시겠습니까?")){
    await routeStore.deleteRoute(travelId);
  routeList.value = routeStore.routeList;
  alert("삭제 완료")
  }
}

const updateMealType = (item: any, mealType: number) => {
  item.mealType = mealType;
  // 스토어의 상태도 업데이트
  const index = attractionStore.selectedAttractions.findIndex(
    (attraction) => attraction.contentId === item.contentId
  );
  if (index !== -1) {
    attractionStore.selectedAttractions[index].mealType = mealType;
  }
};

const updateAccommodationsType = (item: any) => {
  attractionStore.selectedAttractions.forEach(attraction => {
    attraction.mainAccommodations = (attraction.contentId === item.contentId) ? item.mainAccommodations : 0;
  });
};

initGugun();
</script>

<template>
  <main class="main">
    <div class="spot">
      <h1>장소 선택</h1>
      <div class="search-tool">
        <SearchBar @update:search="searchAttraction = $event" class="searchBar"/>
        <v-btn variant="outlined" @click="search(sidoCode, gugunCode, type)">
          검색
        </v-btn>
      </div>
      <div class="spot-another">
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
      </div>
      <!-- 버튼 -->
      <v-card flat>
        <v-card-text class="radio-group-container">
          <v-container fluid>
            <v-radio-group v-model="type" class="custom-radio-group" row>
              <v-radio
                class="custom-radio"
                color="orange-darken-3"
                label="전체"
                value="0"
              ></v-radio>
              <v-radio
                class="custom-radio"
                color="orange-darken-3"
                label="관광지"
                value="12"
              ></v-radio>
              <v-radio
                class="custom-radio"
                color="orange-darken-3"
                label="문화시설"
                value="14"
              ></v-radio>
              <v-radio
                class="custom-radio"
                color="orange-darken-3"
                label="축제공연행사"
                value="15"
              ></v-radio>
              <v-radio
                class="custom-radio"
                color="orange-darken-3"
                label="여행코스"
                value="25"
              ></v-radio>
              <v-radio
                class="custom-radio"
                color="orange-darken-3"
                label="레포츠"
                value="28"
              ></v-radio>
              <v-radio
                class="custom-radio"
                color="orange-darken-3"
                label="숙박"
                value="32"
              ></v-radio>
              <v-radio
                class="custom-radio"
                color="orange-darken-3"
                label="쇼핑"
                value="38"
              ></v-radio>
              <v-radio
                class="custom-radio"
                color="orange-darken-3"
                label="음식점"
                value="39"
              ></v-radio>
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
          <div v-if="expandedCardIndex !== index">
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
              <v-btn color="orange" @click.stop="register(item)">이동</v-btn>
              <v-btn color="gray" @click.stop="expandCard(index, item)"
                >정보</v-btn
              >
            </v-card-actions>
          </div>
          <div v-else class="card-text">
            <v-card-text v-if="attractionDetail">
              <p>관광지명: {{ attractionDetail.title }}</p>
              <p>주소: {{ attractionDetail.addr1 }}</p>
              <p>상세 정보: {{ attractionDetail.overview }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange" @click.stop="register(item)">이동</v-btn>
              <v-btn color="gray" @click.stop="closeCard">간단히</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </div>
    </div>
      <v-btn variant="outlined" @click="getRouteList" color="orange">
        {{ routeName }}
      </v-btn>
      <v-btn variant="outlined" @click="clearList" color="orange">
        경로 초기화
      </v-btn>

    </div>
    <!-- 선택한 리스트 -->
    <div v-if="attractionSeen" class="attractionList">
      <h1>test2</h1>
      <div class="cards2">
        <v-card
          class="mx-auto"
          max-width="300"
          height="200"
          v-for="(item, index) in selectList"
          :key="index"
        >
          <div v-if="expandedCardIndex2 !== index">
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
            <div v-if="item.contentTypeId === 39" class="radio-buttons">
              <label>
                <input
                  type="radio"
                  :name="'mealType-' + item.contentId"
                  :value="1"
                  v-model="item.mealType"
                  @change="updateMealType(item, 1)"
                />
                아침
              </label>
              <label>
                <input
                  type="radio"
                  :name="'mealType-' + item.contentId"
                  :value="2"
                  v-model="item.mealType"
                  @change="updateMealType(item, 2)"
                />
                점심
              </label>
              <label>
                <input
                  type="radio"
                  :name="'mealType-' + item.contentId"
                  :value="3"
                  v-model="item.mealType"
                  @change="updateMealType(item, 3)"
                />
                저녁
              </label>
            </div>
            <div v-if="item.contentTypeId === 32" class="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="firstHome"
                  :value="1"
                  v-model="item.mainAccommodations"
                  @change="updateAccommodationsType(item)"
                />
                첫 숙소
              </label>
            </div>
            <v-card-actions>
              <v-btn color="orange" @click.stop="removeList(item.contentId)"
                >삭제</v-btn
              >
              <v-btn color="gray" @click.stop="expandCard2(index, item)"
                >정보</v-btn
              >
            </v-card-actions>
          </div>
          <div v-else class="card-text">
            <v-card-text v-if="attractionDetail2">
              <p>관광지명: {{ attractionDetail2.title }}</p>
              <p>주소: {{ attractionDetail2.addr1 }}</p>
              <p>상세 정보: {{ attractionDetail2.overview }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange" @click.stop="removeList(item.contentId)">삭제</v-btn>
              <v-btn color="gray" @click.stop="closeCard2">간단히</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </div>
      여행 출발일<input
        type="date"
        v-model="startDate"
        required
      />
      <br/>
      여행 종료일<input
        type="date"
        v-model="endDate"
        required
      />
      <v-btn variant="outlined" @click="getBestRoute" color="orange">
        최적 루트 요청
      </v-btn>
      <v-btn variant="outlined" @click="saveRoute" color="orange">
        루트 저장
      </v-btn>
    </div>
    <MapView
      :center-lat="centerLat"
      :center-long="centerLong"
      :center-src="centerSrc"
      :center-content="ceterContent"
      :select-list="selectList"
      @attraction-event="attractionAdd"
    ></MapView>
    <div v-if="seen" class="cards3">
      <h1>내가 다녀간 곳</h1>
      <div class="cards3-another">
      <v-card
        v-for="(item, index) in routeList"
        :key="index"
        class="mx-auto"
        :subtitle="`${item.startDate} ~ ${item.endDate}`"
        :title="`${item.startRegion} -> ${item.endRegion}`"
        @click="showRoute(item.travelId)"
      >
      <v-card-text>
      <v-row class="d-flex align-center">
        <v-col cols="auto">
          <v-avatar>
            <v-img
              alt="/src/assets/FoohangLogo.png"
              :src="item.startImage"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col>
          <p class="mb-0">{{item.startAttraction}}</p>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        ~
      </v-row>
      <v-row class="d-flex align-center mt-2">
        <v-col cols="auto">
          <v-avatar>
            <v-img
              alt="/src/assets/FoohangLogo.png"
              :src="item.endImage"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col>
          <p class="mb-0">{{item.endAttraction}}</p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-btn
      icon
      class="close-btn position-absolute top-0 right-0"
      @click.stop="removeItem(item.travelId)"
    >
    <v-icon>mdi-close</v-icon>
    </v-btn>
      </v-card>
    </div>
  </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-around;
}
.search-tool{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  
}

.searchBar{
  margin-right: 10px;
}

.spot {
  width: 600px;
}

.spot-another{
  overflow-y: auto; /* 세로 스크롤을 추가합니다. */
  max-height: 75vh; /* 스크롤 영역의 최대 높이를 지정합니다. */
}

.selected {
  display: flex;
  justify-content: space-around;
}
/* 버튼 */
.v-radio,
.v-label {
  font-size: 12px; /* 원하는 크기로 조정하세요 */
  margin-bottom: 0px; /* 줄 사이 간격 줄이기 */
  padding: 0; /* 패딩 제거 */
}

/* 카드 */
.v-card {
  margin-top: 10px; /* 원하는 간격으로 조절 */
}
/* 스크롤 영역을 가진 컨테이너 */
.cards2 {
  overflow-y: auto; /* 세로 스크롤을 추가합니다. */
  max-height: 80vh; /* 스크롤 영역의 최대 높이를 지정합니다. */
}
.card-text {
  overflow-y: auto;
  max-height: 200px;
}

.attractionList {
  width: 500px;
}
.cards3{
  width: 400px
}

.cards3-another{
  overflow-y: auto;
  max-height: 90vh;
}

.position-absolute {
  position: absolute;
}
.top-0 {
  top: 5;
}
.right-0 {
  right: 5;
}
.close-btn {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  border-radius: 4px;
}

.custom-radio-group {
  display: flex;
  flex-wrap: wrap; /* 버튼들을 여러 줄로 정렬 */
  gap: 0    px; /* 버튼들 사이의 간격을 조절 */
  margin-top: -45px; /* 버튼 위의 공백을 제거 */
}

.custom-radio .v-label {
  font-size: 12px; /* 글자 크기 줄이기 */
}

.v-card-actions {
  padding: 0; /* 카드 액션의 패딩 제거 */
  display: flex;
  flex-direction: row; /* 버튼들을 한 줄로 정렬 */
  justify-content: space-between; /* 버튼들 사이의 간격을 자동으로 조절 */
}

.v-btn {
  margin: 0; /* 버튼의 마진 제거 */
  padding: 2px 8px; /* 버튼의 패딩 줄이기 */
  font-size: 12px; /* 버튼의 글자 크기 조절 */
}

.radio-buttons label {
  font-size: 12px; /* 글자 크기 조절 */
  margin-right: 4px; /* 레이블 사이 간격 줄이기 */
}

</style>
