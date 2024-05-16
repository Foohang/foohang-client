import { ref } from "vue";
import { defineStore } from "pinia";
import attractionApi from "@/api/attractionApi";

export const useAttractionStore = defineStore("attraction", () => {
  const attractionList = ref([
    {
      contentId: 1,
      contentTypeId: 15,
      contentName: "청태산자연휴양림",
      firstImage:
        "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
      first_image2:
        "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image3_1.jpgm",
      latitude: 37.52251412,
      longitude: 128.2919115,
    },
    {
      contentId: 1,
      contentTypeId: 15,
      contentName: "청태산자연휴양림",
      firstImage:
        "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
      first_image2:
        "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image3_1.jpgm",
      latitude: 37.52251412,
      longitude: 128.2919115,
    },
  ]);

  const getAttraction = async (sidoCode, gugunCode, type) => {
    const response = await attractionApi.get(
      `/${sidoCode}/${gugunCode}/${type}`
    );

    //토큰 정보 및 유저 정보 세팅(회원 가입 후, 로그인 따로 할 필요 없음)
    attractionList.value = response.data;
  };

  return { attractionList, getAttraction };
});
