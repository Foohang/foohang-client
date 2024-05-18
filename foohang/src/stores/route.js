import { ref } from "vue";
import { defineStore } from "pinia";
import { useAttractionStore } from "@/stores/attraction";
import routeApi from "@/api/routeApi";

export const useRouteStore = defineStore("route", () => {
  const routeList = ref([
    {
    "travelId": 1,
    "startRegion": "서울",
    "endRegion": "서울",
"startDate": "2024.04.06",
"endDate": "2024.04.07",
"startImage": "/src/assets/FoohangLogo.png",
"endImage":"/src/assets/FoohangLogo.png",
"startAttraction": "강북문화원",
"endAttraction": "서울 분식"
},
{
    "travelId": 2,
    "startRegion": "서울2",
    "endRegion": "서울2",
"startDate": "2024.04.06",
"endDate": "2024.04.07",
"startImage": "/src/assets/FoohangLogo.png",
"endImage":"/src/assets/FoohangLogo.png",
"startAttraction": "강북문화원",
"endAttraction": "서울 분식"
},
]);
  const attractionStore = useAttractionStore();

  const getRoute = async () => {
    const response = await routeApi.get("/");
    routeList.value = response.data;
  };

  const saveRoute = async (startDate,endDate,selectedAttractions) => {
    await routeApi.post(`/${startDate}/${endDate}`, selectedAttractions);
  };

  const getTravel = async (travelId) => {
    const response = await routeApi.get(`/${travelId}`);
    attractionStore.setSelectedAttractions(response);
  };
  const deleteRoute = async (travelId) => {
    routeApi.delete(`/${travelId}`);
    const index = routeList.value.findIndex(
        (travel) => travel.travelId === travelId
      );
      if (index !== -1) {
        routeList.value.splice(index, 1);
      }
  };

  return { routeList, getRoute, saveRoute, getTravel, deleteRoute };
});
