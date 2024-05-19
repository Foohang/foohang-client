import mypageApi from "@/api/mypageApi";
import {useAuthStore} from "@/stores/auth"
import { defineStore } from "pinia";
import { ref } from "vue";

export const useReviewStore = defineStore("review", () => {
    const reviewList = ref([]);
    
    const postReview = async(formData) =>{
        await mypageApi.post("/reviews", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        getReviews();
    }

    const getReviews = async() =>{
        const response  = await mypageApi.get("/reviews")
        reviewList.value = response.data;
    }

  
    return { reviewList ,getReviews,postReview };
  });
  