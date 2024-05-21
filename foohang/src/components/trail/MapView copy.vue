<script setup lang="ts">
import { ref, watch, Ref } from "vue";
import {
  KakaoMap,
  KakaoMapMarker,
  KakaoMapInfoWindow,
  KakaoMapPolyline,
} from "vue3-kakao-maps";
import type { KakaoMapLatLngItem } from "vue3-kakao-maps";
import { useAttractionStore } from "@/stores/attraction";
const attractionStore = useAttractionStore();

const props = defineProps({
  centerLat: Number,
  centerLong: Number,
  centerSrc: String,
  centerContent: Number,
  selectList: Object,
});
const chceckContent = ref(0);
const emit = defineEmits(["attractionEvent"]);

const visibleRef = ref<boolean>(true);
const loading = ref<boolean>(false);

const onClickKakaoMapMarker = (): void => {
  visibleRef.value = !visibleRef.value;
};

const marker = ref<kakao.maps.Marker>();

const onLoadKakaoMapMarker = (newMarker: kakao.maps.Marker): void => {
  marker.value = newMarker;
};

const restaurantList = ref(attractionStore.nearRestaurants);
const around = async () => {
  await attractionStore.getNearRestaurants(props.centerContent);
  restaurantList.value = attractionStore.nearRestaurants;
  restaurantList.value.forEach(() => {
    visibleRefs.value.push(false);
    markers.value.push(null);
  });
};

const regist = async () => {
  await attractionStore.addSelectedAttracitons(props.centerContent);
  emit("attractionEvent");
};

const visibleRefs = ref<boolean[]>([]);
const markers = ref<kakao.maps.Marker[]>([]);
const onClickKakaoMapMarkerR = (index: number): void => {
  visibleRefs.value[index] = !visibleRefs.value[index];
};

const onLoadKakaoMapMarkerR =
  (index: number) =>
  (newMarker: kakao.maps.Marker): void => {
    markers.value[index] = newMarker;
  };

const registR = async (contentId) => {
  attractionStore.addSelectedAttracitons(contentId);
  emit("attractionEvent");
};

const latLngList: Ref<KakaoMapLatLngItem[]> = ref([]);
const lineList: Ref<KakaoMapLatLngItem[]> = ref([]);

watch(props, (newProps) => {
  if (newProps.centerContent === -1) {
    restaurantList.value = [];
    visibleRefs.value = [];
    markers.value = [];
    latLngList.value = newProps.selectList.map((item) => ({
      lat: item.latitude,
      lng: item.longitude,
    }));
  } else if (chceckContent.value !== props.centerContent) {
    restaurantList.value = attractionStore.nearRestaurants;
    visibleRefs.value = [];
    markers.value = [];
    chceckContent.value = props.centerContent;
    if (newProps.centerContent === 0) {
      latLngList.value = newProps.selectList.map((item) => ({
        lat: item.latitude,
        lng: item.longitude,
      }));
    }
  } else {
    latLngList.value = newProps.selectList.map((item) => ({
      lat: item.latitude,
      lng: item.longitude,
    }));
  }
});

watch(latLngList, async () => {
  loading.value = true;
  await attractionStore.lineCraete();
  lineList.value = attractionStore.lineList;
  console.log(attractionStore.lineList);
  loading.value = false;
});
</script>

<template>
  <div :class="{ 'loading-wrapper': true, 'loading-active': loading }">
    <KakaoMap
      :lat="centerLat"
      :lng="centerLong"
      width="100%"
      height="50rem"
      :class="{ blur: loading }"
    >
      <div v-if="centerContent > 0">
        <KakaoMapMarker
          :image="{
            imageSrc: '/src/assets/restaurantMarker.png',
            imageWidth: 64,
            imageHeight: 64,
          }"
          :lat="centerLat"
          :lng="centerLong"
          :clickable="true"
          @onClickKakaoMapMarker="onClickKakaoMapMarker"
          @onLoadKakaoMapMarker="onLoadKakaoMapMarker"
        />
        <KakaoMapInfoWindow
          :marker="marker"
          :lat="centerLat"
          :lng="centerLong"
          :visible="visibleRef"
        >
          <div class="info-window-content">
            <v-img
              class="align-end text-white"
              height="100"
              width="150"
              :src="centerSrc"
              cover
            />
            <v-card-actions>
              <v-btn color="orange" @click.stop="regist">등록</v-btn>
              <v-btn color="orange" @click.stop="around">주변 맛집 보기</v-btn>
            </v-card-actions>
          </div>
        </KakaoMapInfoWindow>
        <KakaoMapMarker
          v-for="(restaurant, index) in restaurantList"
          :key="restaurant.contentId"
          :image="{
            imageSrc: '/src/assets/restaurantMarker.png',
            imageWidth: 32,
            imageHeight: 32,
          }"
          :lat="restaurant.latitude"
          :lng="restaurant.longitude"
          :clickable="true"
          @onClickKakaoMapMarker="onClickKakaoMapMarkerR(index)"
          @onLoadKakaoMapMarker="onLoadKakaoMapMarkerR(index)"
        />
        <KakaoMapInfoWindow
          v-for="(restaurant, index) in restaurantList"
          :key="'infoWindow-' + restaurant.contentId"
          :marker="markers[index]"
          :lat="restaurant.latitude + 0.0001"
          :lng="restaurant.longitude"
          :visible="visibleRefs[index]"
        >
          <v-img
            class="align-end text-white"
            height="100"
            :src="restaurant.firstImage"
            cover
          >
            <v-card-title>{{ restaurant.title }}</v-card-title>
          </v-img>
          <v-card-actions>
            <v-btn color="orange" @click.stop="registR(restaurant.contentId)"
              >등록</v-btn
            >
            <v-btn color="gray" @click.stop="onClickKakaoMapMarkerR(index)"
              >닫기</v-btn
            >
          </v-card-actions>
        </KakaoMapInfoWindow>
      </div>
      <KakaoMapPolyline :latLngList="lineList" />
      <KakaoMapMarker
        v-for="(point, index) in latLngList"
        :key="index"
        :lat="point.lat"
        :lng="point.lng"
      />
    </KakaoMap>
    <div v-if="loading" class="loading-screen">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<style scoped>
.info-window-content {
  width: 200px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.blur {
  filter: blur(5px);
}

.loading-active .blur {
  filter: blur(5px);
}

.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}
</style>
