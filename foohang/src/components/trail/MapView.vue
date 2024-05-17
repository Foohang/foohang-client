<script setup lang="ts">
import { ref, watch } from "vue";
import { KakaoMap, KakaoMapMarker, KakaoMapInfoWindow } from "vue3-kakao-maps";
import { useAttractionStore } from "@/stores/attraction";
const attractionStore = useAttractionStore();

// 선택시 중심 좌표 이동을 위한 좌표 관리
const props = defineProps({
  centerLat: Number,
  centerLong: Number,
  centerSrc: String,
  centerContent: Number,
});
const emit = defineEmits(["attractionEvent"]);

const visibleRef = ref<boolean>(true);

const onClickKakaoMapMarker = (): void => {
  visibleRef.value = !visibleRef.value;
};

const marker = ref<kakao.maps.Marker>();

const onLoadKakaoMapMarker = (newMarker: kakao.maps.Marker): void => {
  marker.value = newMarker;
};

// 선택된 attraction 마커 리스트 관리
const restaurantList = ref(attractionStore.nearRestaurants);

const around = async () => {
  await attractionStore.getNearRestaurants(props.centerContent);
  restaurantList.value = attractionStore.nearRestaurants;
  console.log(restaurantList.value);
  restaurantList.value.forEach(() => {
    visibleRefs.value.push(false);
    markers.value.push(null);
  });
};

const regist = async () => {
  await attractionStore.addSelectedAttracitons(props.centerContent);
  emit("attractionEvent");
};

//주변 음식점 관리
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

watch(props, () => {
  restaurantList.value = attractionStore.nearRestaurants;
  visibleRefs.value = [];
  markers.value = [];
});
</script>

<template>
  <KakaoMap :lat="centerLat" :lng="centerLong" width="100%" height="50rem">
    <!-- 중심좌표 마커 -->
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
      <v-img class="align-end text-white" height="100" :src="centerSrc" cover />
      <v-card-actions>
        <v-btn color="orange" @click.stop="regist">등록</v-btn>
        <v-btn color="orange" @click.stop="around">주변 맛집 보기</v-btn>
      </v-card-actions>
    </KakaoMapInfoWindow>

    <!-- 음식점 마커 -->
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
  </KakaoMap>
</template>

<style scoped></style>
