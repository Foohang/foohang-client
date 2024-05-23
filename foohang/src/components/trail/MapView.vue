<script setup lang="ts">
import { ref, watch, Ref } from "vue";
import { KakaoMap, KakaoMapMarker, KakaoMapInfoWindow, KakaoMapPolyline } from "vue3-kakao-maps";
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
console.log(props);
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
  await attractionStore.lineCraete();
  lineList.value = attractionStore.lineList;
  console.log(attractionStore.lineList);
});

const orderBottomMargin = ref<string>("35px");

const getMarkerImageSrc = (order: number): string => {
  // const colors = ["red", "blue", "green", "orange", "purple"];
  const colors = ["#EE703F"];
  const color = colors[order % colors.length];
  return createSVGMarker(order, color);
};

const createSVGMarker = (order: number, color: string): string => {
  const svg = `
  <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M32 2C18.1 2 6 14.1 6 28c0 13 11.5 24.5 23.4 33.8 1.4 1.1 3.7 1.1 5.1 0C46.5 52.5 58 41 58 28 58 14.1 45.9 2 32 2z" fill="${color}" stroke="black" stroke-width="2"/>
  <text x="32" y="36" font-size="22" font-family="Arial" fill="white" text-anchor="middle">${order}</text>
</svg>

  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
</script>

<template>
  <KakaoMap :lat="centerLat" :lng="centerLong" width="100%" height="50rem">
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
      <KakaoMapInfoWindow :marker="marker" :lat="centerLat" :lng="centerLong" :visible="visibleRef">
        <div class="info-window-content">
          <v-img class="align-end text-white" height="100" width="150" :src="centerSrc" cover />
          <v-card-actions>
            <v-btn color="blue" @click.stop="regist">등록</v-btn>
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
        <v-img class="align-end text-white" height="100" :src="restaurant.firstImage" cover>
          <v-card-title>{{ restaurant.title }}</v-card-title>
        </v-img>
        <v-card-actions>
          <v-btn color="orange" @click.stop="registR(restaurant.contentId)">등록</v-btn>
          <v-btn color="gray" @click.stop="onClickKakaoMapMarkerR(index)">닫기</v-btn>
        </v-card-actions>
      </KakaoMapInfoWindow>
    </div>
    <KakaoMapPolyline :latLngList="lineList" />
    <KakaoMapMarker
      v-for="(point, index) in latLngList"
      :key="index"
      :lat="point.lat"
      :lng="point.lng"
      :image="{
        imageSrc: getMarkerImageSrc(index + 1),
        imageWidth: 40,
        imageHeight: 40,
        imageOption: {},
      }"
      :order-bottom-margin="orderBottomMargin"
      class="select-marker"
    />
  </KakaoMap>
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
.slect-marker {
  color: aliceblue;
}
</style>
