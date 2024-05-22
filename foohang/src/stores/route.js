import { ref } from "vue";
import { defineStore } from "pinia";
import { useAttractionStore } from "@/stores/attraction";
import routeApi from "@/api/routeApi";

export const useRouteStore = defineStore("route", () => {
  const routeList = ref([]);
  const attractionStore = useAttractionStore();

  const getRoute = async () => {
    const response = await routeApi.get("/");
    routeList.value = response.data;
  };

  const saveRoute = async (startDate, endDate, selectedAttractions) => {
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
