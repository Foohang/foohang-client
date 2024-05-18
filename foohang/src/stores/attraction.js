import { ref } from "vue";
import { defineStore } from "pinia";
import attractionApi from "@/api/attractionApi";
import routeApi from "@/api/routeApi";

export const useAttractionStore = defineStore("attraction", () => {
  // 기본 attractions
  const attractionList = ref([]);

  const attractionDetail = ref({});

  const getAttraction = async (sidoCode, gugunCode, type) => {
    const response = await attractionApi.get(
      `/${sidoCode}/${gugunCode}/${type}`
    );
    attractionList.value = response.data;
  };

  const getAttractionDetail = async (contentId) => {
    const response = await attractionApi.get(`/${contentId}`);
    attractionDetail.value = response.data;
  };

  //관광지 주변 레스토랑
  const nearRestaurants = ref([]);
  const getNearRestaurants = async (contentId) => {
    const response = await attractionApi.get(`/restaurants/${contentId}`);
    nearRestaurants.value = response.data;
  };

  //선택한 관광지 리스트
  const selectedAttractions = ref([]);
  const setSelectedAttractions = async (response) => {
    selectedAttractions.value = response.data;
  };
  const addSelectedAttracitons = async (contentId) => {
    const alreadySelected = selectedAttractions.value.some(
      (attraction) => attraction.contentId === contentId
    );
    if (alreadySelected) {
      alert("이미 들어있습니다.");
      return;
    }

    const response = await attractionApi.get(`/${contentId}`);
    attractionDetail.value = response.data;
    selectedAttractions.value.push(attractionDetail.value);
  };

  const deleteSelectedAttractions = async (contentId) => {
    const index = selectedAttractions.value.findIndex(
      (attraction) => attraction.contentId === contentId
    );
    if (index !== -1) {
      selectedAttractions.value.splice(index, 1);
    }
  };

  const clearSelectedAttractions = function () {
    nearRestaurants.value = [];
  };

    const clearSelected = function () {
      selectedAttractions.value = [];
  };

  const changeAttribute = function (contentId) {};

  const makeBestRoute = async () => {
    const response = await routeApi.post(
      "/recommendation",
      selectedAttractions.value
    );
    selectedAttractions.value = response.data;
  };

  return {
    attractionList,
    attractionDetail,
    nearRestaurants,
    selectedAttractions,
    getAttraction,
    getAttractionDetail,
    getNearRestaurants,
    setSelectedAttractions,
    addSelectedAttracitons,
    deleteSelectedAttractions,
    clearSelectedAttractions,
    changeAttribute,
    makeBestRoute,
    clearSelected,
  };
});
