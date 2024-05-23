import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useChatStore } from "@/stores/chat";
import axios from "axios";
import attractionApi from "@/api/attractionApi";
import routeApi from "@/api/routeApi";
export const useAttractionStore = defineStore("attraction", () => {
  const chatStore = useChatStore();
  // 기본 attractions
  const attractionList = ref([]);

  const attractionDetail = ref({});

  const clearAttraction = function () {
    attractionList.value = [];
  };

  const getAttraction = async (sidoCode, gugunCode, type) => {
    const response = await attractionApi.get(
      `/${sidoCode}/${gugunCode}/${type}`
    );
    const attractions = response.data.map((attraction) => {
      if (attraction.firstImage === "") {
        attraction.firstImage =
          attraction.firstImage2 !== ""
            ? attraction.firstImage2
            : "/src/assets/noImage.jpg";
      }
      return attraction;
    });
    attractionList.value = attractions;
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
    chatStore.searched(attractionDetail.value.title);
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
  // 경로를 찾는 함수
  const apiKey = "ebf2da93e7122fee5947e193d7330814"; // 카카오디벨로퍼스에서 발급 받은 API 키
  const postUrl = "https://apis-navi.kakaomobility.com/v1/waypoints/directions";
  const getUrl = "https://apis-navi.kakaomobility.com/v1/directions";

  const getDirections = async (locations) => {
    if (locations.length < 2) {
      lineList.value = [];
      return;
    }

    if (locations.length === 2) {
      const origin = `${locations[0].longitude},${locations[0].latitude}`;
      const destination = `${locations[1].longitude},${locations[1].latitude}`;

      const params = new URLSearchParams({
        origin,
        destination,
        priority: "RECOMMEND",
        car_fuel: "GASOLINE",
        car_hipass: "false",
        alternatives: "false",
        road_details: "false",
      });

      try {
        const response = await axios.get(`${getUrl}?${params.toString()}`, {
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        });

        lineList.value = response.data.routes[0].sections.flatMap((section) =>
          section.roads.flatMap((road) =>
            road.vertexes.reduce((acc, vertex, index, array) => {
              if (index % 2 === 0) {
                acc.push({ lat: array[index + 1], lng: vertex });
              }
              return acc;
            }, [])
          )
        );
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      const origin = {
        x: locations[0].longitude.toString(),
        y: locations[0].latitude.toString(),
      };

      const destination = {
        x: locations[locations.length - 1].longitude.toString(),
        y: locations[locations.length - 1].latitude.toString(),
      };

      const waypoints = locations.slice(1, -1).map((location, index) => ({
        name: `name${index}`,
        x: location.longitude,
        y: location.latitude,
      }));

      const data = {
        origin,
        destination,
        waypoints,
        priority: "RECOMMEND",
        car_fuel: "GASOLINE",
        car_hipass: false,
        alternatives: false,
        road_details: false,
      };

      try {
        const response = await axios.post(postUrl, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `KakaoAK ${apiKey}`,
          },
        });
        lineList.value = response.data.routes[0].sections.flatMap((section) =>
          section.roads.flatMap((road) =>
            road.vertexes.reduce((acc, vertex, index, array) => {
              if (index % 2 === 0) {
                acc.push({ lat: array[index + 1], lng: vertex });
              }
              return acc;
            }, [])
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  //직선을 그리기 위한 리스트
  const lineList = ref([]);
  const lineCraete = async () => {
    await getDirections(selectedAttractions.value);
  };

  watch(selectedAttractions, () => {
    lineCraete();
  });

  return {
    attractionList,
    attractionDetail,
    nearRestaurants,
    selectedAttractions,
    lineList,
    clearAttraction,
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
    lineCraete,
  };
});
