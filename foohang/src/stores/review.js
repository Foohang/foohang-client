import mypageApi from "@/api/mypageApi";
import {useAuthStore} from "@/stores/auth"

export const useReviewStore = defineStore("review", () => {
    const reviewList = ref([]);
    
    const postReview = async(review) =>{
        await mypageApi.post("/reviews",review);
        getReviews();
    }

    const getReviews = async() =>{
        const response  = await mypageApi.get("/reviews")
        reviewList.value = response.data;
    }


  
    return { reviewList ,getReviews,postReview };
  });
  