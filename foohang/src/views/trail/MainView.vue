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

const type = ref("0");

const attractionStore = useAttractionStore();
attractionStore.clearSelected();
attractionStore.clearAttraction();
const attractionList = ref(attractionStore.attractionList);

//검색 관련
const searchAttraction = ref("");
const searchList = ref(attractionStore.attractionList);

const search = async () => {
  if (searchAttraction.value === "") {
    searchList.value = attractionStore.attractionList;
  } else {
    searchList.value = attractionStore.attractionList.filter((item) =>
      item.title.includes(searchAttraction.value)
    );
  }
};
const searchToBar = async (sidoCode, gugunCode, type) => {
  console.log(sidoCode);
  console.log(gugunCode);
  if (sidoCode != null && gugunCode != null) {
    await attractionStore.getAttraction(sidoCode, gugunCode, type);
    attractionList.value = attractionStore.attractionList;
    search();
    expandedCardIndex.value = null;
  }
};
const handleEnter = () => {
  searchToBar(sidoCode.value, gugunCode.value, type.value);
};
//시도 변경시 자동실행
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
//gugun변경시 자동실행
watch(gugunName, (newVal) => {
  const matchedGugun = gugunList.value.find(
    (item) => item.gugunName === newVal
  );
  if (matchedGugun) {
    gugunCode.value = matchedGugun.gugunCode;
    searchToBar(sidoCode.value, gugunCode.value, type.value);
  }
});

// type 변경시 자동 실행
watch(type, (newVal) => {
  console.log("watch");
  searchToBar(sidoCode.value, gugunCode.value, newVal);
});

const routeName = ref("내 여행지");
const seen = ref(false);
const getRouteList = async () => {
  if (user.value == null || token.value == null) {
    authStore.logout();
    alert("로그인이 만료되었습니다.");
    router.push({ name: "login" });
  } else {
    if (seen.value) {
      seen.value = false;
      routeName.value = "내 여행지";
    } else {
      seen.value = true;
      routeName.value = "목록 닫기";
    }
    await routeStore.getRoute();
    routeList.value = routeStore.routeList;
  }
};
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
  attractionSeen.value=true;
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
};

watch(
  selectList,
  (newList) => {
    console.log(newList.length);
    attractionSeen.value = newList.length > 0;
  },
  { immediate: true }
);

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
const endDate = ref("2024-05-24");

const saveRoute = async () => {
  if (user.value == null || token.value == null) {
    authStore.logout();
    alert("로그인이 만료되었습니다.");
    router.push({ name: "login" });
  } else {
    await routeStore.saveRoute(
      startDate.value,
      endDate.value,
      selectList.value
    );
    seen.value = true;
    routeName.value = "목록 닫기";
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
};

//최적 경로 삭제
const removeItem = async (travelId) => {
  if (confirm("삭제하시겠습니까?")) {
    await routeStore.deleteRoute(travelId);
    routeList.value = routeStore.routeList;
    alert("삭제 완료");
  }
};

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
  attractionStore.selectedAttractions.forEach((attraction) => {
    attraction.mainAccommodations =
      attraction.contentId === item.contentId ? item.mainAccommodations : 0;
  });
};

initGugun();
</script>

<!-- ####################################template######################################-->
<template>
  <div class="out">
    <div class="main">
      <div class="spot">
        <div class="spot-align">
          <img
            class="spotIcon"
            src="/src/assets/selecePlace.png"
            height="35px"
            style="margin-right: 10px"
          />
          <h1 style="text-shadow: 1px 1px 1px #cccccc">장소 선택</h1>
        </div>
        <div class="search-tool">
          <SearchBar
            @update:search="searchAttraction = $event"
            @enter="handleEnter"
            class="searchBar"
          />
          <v-btn class="search-bar-form" variant="outlined" @click="search()">
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
          <!-- ##############################라디오 버튼######################################## -->
          <v-card flat class="custum-card">
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

          <!-- 리스트 -->
          <div class="search-result">
            <img
              class="search-result-icon"
              src="/src/assets/search.png"
              height="20px"
              style="margin-right: 10px"
            />
            <h1>검색 결과</h1>
          </div>
          <div class="cards">
            <v-card
              class="mx-auto"
              max-width="300"
              height="200"
              v-for="(item, index) in searchList"
              :key="index"
            >
              <div v-if="expandedCardIndex !== index">
                <v-img
                  class="align-end text-white"
                  height="140"
                  :src="item.firstImage"
                  cover
                >
                  <v-card-title class="card-title-font">{{
                    item.title
                  }}</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">{{
                  getContentTypeName(item.contentTypeId)
                }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn
                    class="info-button"
                    color="#007bff"
                    @click.stop="expandCard(index, item)"
                    >정보</v-btn
                  >
                  <v-btn
                    class="move-button"
                    color="#F8F9FB"
                    @click.stop="register(item)"
                    >이동</v-btn
                  >
                </v-card-actions>
              </div>
              <div v-else class="card-text">
                <v-card-text v-if="attractionDetail">
                  <p>· 관광지명 : {{ attractionDetail.title }}</p>
                  <br />
                  <p>· 주소 : {{ attractionDetail.addr1 }}</p>
                  <br />
                  <p>· 상세 정보 : {{ attractionDetail.overview }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="gray" @click.stop="closeCard">간단히</v-btn>
                  <v-btn
                    class="move-button"
                    color="#F8F9FB"
                    @click.stop="register(item)"
                    >이동</v-btn
                  >
                </v-card-actions>
              </div>
            </v-card>
          </div>
        </div>
        <div class="travel-action">
          <v-btn
            class="route-button"
            variant="outlined"
            @click="getRouteList"
            style="background-color: #ee703f; color: #f8f9fb"
          >
            {{ routeName }}
          </v-btn>
          <v-btn
            class="route-button"
            variant="outlined"
            @click="clearList"
            style="background-color: #f8f9fb"
          >
            경로 초기화
          </v-btn>
        </div>
      </div>

      <div v-if="attractionSeen" class="attractionList">
        <div class="spot-align">
          <img
            class="spotIcon"
            src="/src/assets/addPlace.png"
            height="35px"
            style="margin-right: 10px"
          />
          <h1 style="text-shadow: 1px 1px 1px #cccccc; text-align: center">
            장소 등록
          </h1>
        </div>

        <!-- ###################선택한 리스트, 카드 생성######################## -->
        <div class="cards2-another">
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
                  height="120"
                  :src="item.firstImage"
                  cover
                >
                  <v-card-title class="card-title-font">{{
                    item.title
                  }}</v-card-title>
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
                <div v-if="!(item.contentTypeId ==32 || item.contentTypeId==39)" class="empty-box"></div>
                <v-card-actions>
                  <v-btn color="007bff" @click.stop="expandCard2(index, item)"
                    >정보</v-btn
                  >
                  <v-btn color="orange" @click.stop="removeList(item.contentId)"
                    >삭제</v-btn
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
                  <v-btn color="gray" @click.stop="closeCard2">간단히</v-btn>
                  <v-btn color="orange" @click.stop="removeList(item.contentId)"
                    >삭제</v-btn
                  >
                </v-card-actions>
              </div>
            </v-card>
          </div>
        </div>
        <div class="route-action2">
          <div class="date-group">
            <p class="travel-date">여행 출발일</p>
            <input type="date" v-model="startDate" required />
          </div>
          <br />
          <div class="date-group">
            <p class="travel-date">여행 종료일</p>
            <input type="date" v-model="endDate" required />
          </div>
          <div class="route-action2-1">
            <v-btn
              class="route-button2"
              variant="outlined"
              @click="getBestRoute"
            >
              최적 경로 요청
            </v-btn>
            <v-btn class="route-button2" variant="outlined" @click="saveRoute">
              경로 저장
            </v-btn>
          </div>
        </div>
      </div>

      <!-- map -->
      <MapView
        :center-lat="centerLat"
        :center-long="centerLong"
        :center-src="centerSrc"
        :center-content="ceterContent"
        :select-list="selectList"
        @attraction-event="attractionAdd"
        class="map"
      ></MapView>

      <!-- 정리리스트 -->
      <div v-if="seen" class="cards3">
        <div class="spot-align">
          <img
            class="spotIcon"
            src="/src/assets/travelLists.png"
            height="35px"
            style="margin-right: 10px"
          />
          <h1 style="text-shadow: 1px 1px 1px #cccccc">내 여행지</h1>
        </div>

        <!-- ##################################카드3################################################-->
        <div class="cards3-another">
          <v-card
            v-for="(item, index) in routeList"
            :key="index"
            class="mx-auto"
            :subtitle="`${item.startDate} ~ ${item.endDate}`"
            :title="`${item.startRegion} → ${item.endRegion}`"
            @click="showRoute(item.travelId)"
          >
            <v-card-text class="card-text2">
              <v-row class="d-flex align-center">
                <v-col cols="auto">
                  <v-avatar class="attraction-icon">
                    <v-img
                      alt="/src/assets/FoohangLogo.png"
                      :src="item.startImage"
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-col>
                  <p class="mb-0">
                    {{ item.startAttraction }}
                  </p>
                </v-col>
              </v-row>
              <v-row justify="center" align="center"> ↓ </v-row>
              <v-row class="d-flex align-center mt-2">
                <v-col cols="auto">
                  <v-avatar class="attraction-icon">
                    <v-img
                      alt="/src/assets/FoohangLogo.png"
                      :src="item.endImage"
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-col>
                  <p class="mb-0">{{ item.endAttraction }}</p>
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
    </div>
  </div>
</template>

<style scoped>
.out {
  display: flex;
  flex-direction: column;
  height: 87vh; /* 전체 뷰포트 높이를 차지하도록 설정 */
  overflow: hidden; /* 스크롤바를 숨깁니다 */
}
.main {
  display: flex;
}
.search-tool {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-right: 10px;
}

.searchBar {
  margin-left: 10px;
  margin-right: 5px;
}

/* 검색 */
.search-bar-form {
  height: 43px;
  margin-left: 100px;
  background-color: #ee703f;
  border-color: #cccccc;

  color: #f8f9fb;

  border-width: 1px;
}

/* 검색결과 */
.search-result {
  display: flex;
  width: 50%;
  align-items: center;
  margin-left: 10px;
  font-size: 10px;
  margin: 10px 0;
  color: #333333;

  padding-bottom: 10px;
  border-bottom: 3px solid #ee703f;
}

.search-result-icon {
  display: flex;
  justify-content: center;
  margin-left: 10px;
  size: 10px;
}

/* 장소 선택 */
.spot {
  width: 400px;
  background-color: #f8f9fb;
  border-right: 1px solid #cccccc;
}

.spot-another {
  overflow-y: auto; /* 세로 스크롤을 추가합니다. */
  max-height: 65vh; /* 스크롤 영역의 최대 높이를 지정합니다. */
}
.spot-another::-webkit-scrollbar {
  display: none;
}

.spotIcon {
  display: flex;
  justify-content: center;
  color: black;
}

.spot-align {
  display: flex;
  align-items: center;
  margin-left: 10px;
  border-bottom: solid 2px #ee703f;

  width: 90%;
}

.selected {
  display: flex;
  justify-content: space-around;
}
/* 라디오 버튼 */
.custom-radio-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Creates three columns */
}

.radio-group-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.custom-radio {
  box-sizing: border-box;
}

.custom-radio .v-label {
  font-size: 10px; /* 글자 크기 줄이기 */
}
.radio-buttons{
  margin-left: 15px;
}
 
.radio-buttons label {
  font-size: 10px; /* 글자 크기 조절 */
  margin-right: 4px; /* 레이블 사이 간격 줄이기 */
}

.v-radio-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.v-radio {
  flex: 1 1 33%;
  margin-bottom: 8px;
}

/* 카드 */
.move-button {
  background-color: #ee703f;
}

.info-button {
  background-color: F5F5DC;
}

.pt-4 {
  margin-top: -10px;
}

.mx-auto {
  background-color: #f8f9fb;
  box-shadow: 1px 5px 10px 0px #00000080;
  border-color: solid 0.5px #cccccc;
}

.card-title-font {
  color: #f8f9fb;
  text-shadow: 1.2px 1.5px 1px #00000090;
  background-color: #00000060;
}

.custom-card {
  max-width: 800px; /* 카드의 최대 너비 설정 */
}

.v-card {
  margin-top: 30px; /* 원하는 간격으로 조절 */
}
/* 스크롤 영역을 가진 컨테이너 */
.cards2 {
  overflow-y: auto; /* 세로 스크롤을 추가합니다. */
  max-height: 68vh; /* 스크롤 영역의 최대 높이를 지정합니다. */
}

.empty-box{
  height: 23px;
}
.card-text {
  overflow-y: auto;
  max-height: 200px;
}

.cards2 {
  overflow-y: auto; /* 세로 스크롤을 추가합니다. */
  max-height: 65vh; /* 스크롤 영역의 최대 높이를 지정합니다. */
  padding: 10px;
  padding-bottom: 20px;
}

.cards2::-webkit-scrollbar {
  display: none;
}

.map {
  height: 1;
}

/* ###################################장소 등록############################ */
.attractionList {
  width: 400px;
  max-width: 300px;
  padding: 0 10px;
  border-right: solid 1px #cccccc;
  background-color: #f8f9fb;
  /* overflow-y: auto;
  flex-grow: 1; */
}
.cards3 {
  width: 450px;
  padding: 0 10px;
  background-color: #f8f9fb;
  border-left: solid 1px #cccccc;
}

.cards3-another {
  overflow-y: auto;
  max-height: 75vh;
  padding: 0 10px;
}
.cards3-another::-webkit-scrollbar {
  display: none;
}

/* 관광지명 */
.mb-0 {
  margin-left: -12px;
  font-size: 18px;
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

.v-card-actions {
  padding: 0; /* 카드 액션의 패딩 제거 */
  display: flex;
  flex-direction: row; /* 버튼들을 한 줄로 정렬 */
  justify-content: flex-end; /* 버튼들 사이의 간격을 자동으로 조절 */
  margin-top: -15px;
  margin-right: 5px;
}

.v-btn {
  margin: 0; /* 버튼의 마진 제거 */
  padding: 2px 8px; /* 버튼의 패딩 줄이기 */
  font-size: 12px; /* 버튼의 글자 크기 조절 */
}

/* 내 여행지, 경로 초기화 */
.travel-action {
  width: 80%;
  border-top: solid 2px #cccccc;
  padding: 10px;
  display: flex;
  justify-content: center;

  margin: 10px 30px;
}
.route-button {
  width: 120px;
  height: 40px;
  margin: 0 30px;
  font-size: 18px;
  border-color: #cccccc;
  text-shadow: 0.5px 0.5px 1px #cccccc;
  box-shadow: 1px 5px 5px 0px #cccccc;
}

/* 내 여행지, 장소 등록 */
.route-action2 {
  position: fixed;
  width: 80%;
  border-top: solid 2px #cccccc;
  padding: 10px;
  /* display: flex; */
  /* justify-content: center; */
  /* flex-direction: column; */
  /* height: 100vh; */
  /* overflow: hidden;  */
}

.route-action2-1 {
  max-width: 200px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 10px 50px;
}

.route-button2 {
  width: 120px;
  height: 40px;
  margin: 0 10px;
  border-color: #cccccc;
  color: #000000;
  text-shadow: 1px 1px 1px #cccccc;
  box-shadow: 1px 1px 1px 0 #cccccc;
}

.date-group {
  display: flex;
  flex-direction: row;
  margin-left: -10px;
}

.travel-date {
  /* font-size: 1px; */
  background-color: #ee703f90;
  box-shadow: 1px 1px 1px 0 #cccccc;
  color: #f8f9fb;
  text-shadow: 1px 1px 1px #00000080;
  border-radius: 10px;
  padding: 2px 5px;
  margin-right: 8px;
}
.card-text2 {
  width: 90%;
  border-top: solid 2.5px #ee703f;
  margin-top: -10px;
  padding-top: 10px;
}

.attraction-icon {
  background-color: white;
  border-color: 3px solid #cccccc;
  box-shadow: 0px 0px 1px 1px #cccccc;
}
</style>
