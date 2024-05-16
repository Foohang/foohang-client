import { ref } from "vue";
import { defineStore } from "pinia";
import attractionApi from "@/api/attractionApi";

export const useAttractionStore = defineStore("attraction", () => {
  const attractionList = ref([]);

  const attractionDetail = ref({});

  const getAttraction = async (sidoCode, gugunCode, type) => {
    const response = await attractionApi.get(
      `/${sidoCode}/${gugunCode}/${type}`
    );
    attractionList.value = response.data;
  };

  const getAttractionDetail = async (contentId)=>{
    const response = await attractionApi.get(
      `/${contentId}`
    );
    attractionDetail.value = response.data;
  }

  return { attractionList, attractionDetail, getAttraction, getAttractionDetail };
});
