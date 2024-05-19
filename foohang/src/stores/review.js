import mypageApi from "@/api/mypageApi";
import {useAuthStore} from "@/stores/auth"
import { defineStore } from "pinia";
import { ref } from "vue";

export const useReviewStore = defineStore("review", () => {
    const reviewList = ref([
      {
        title: 'Sample Title',
        postDate: '2023-05-11',
        travelDate: '2023-05-15',
        images: [
          '/src/assets/city/33-1.jpg',
          '/src/assets/city/33-2.jpg',
          '/src/assets/city/33-3.jpg',
          '/src/assets/city/34-1.jpg',
          '/src/assets/city/32-1.jpg',
          '/src/assets/city/33-1.jpg'
        ],
        content: 'This is a sample post content.',
        hashtags: ['#sample', '#post', '#content'],
        selectedEmotion: '1'
      },
      {
        title: 'Sample Title',
        postDate: '2023-05-10',
        travelDate: '2023-05-15',
        images: [
          '/src/assets/city/31-1.jpg',
          '/src/assets/city/31-2.jpg',
          '/src/assets/city/31-3.jpg',
          '/src/assets/city/32-1.jpg',
        ],
        content: 'This is a sample post content.',
        hashtags: ['#sample', '#post', '#content'],
        selectedEmotion: '1'
      },
      {
        title: 'Sample Title',
        postDate: '2023-05-01',
        travelDate: '2023-05-15',
        images: [
          '/src/assets/city/32-1.jpg',
          '/src/assets/city/32-2.jpg',
          '/src/assets/city/32-3.jpg',
        ],
        content: 'This is a sample post content.',
        hashtags: ['#sample', '#post', '#content'],
        selectedEmotion: '1'
      }
    ]);
    
    const postReview = async(formData) =>{
        await mypageApi.post("/reviews/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        getReviews();
    }

    const getReviews = async() =>{
        const response  = await mypageApi.get("/reviews/")
        reviewList.value = response.data;
    }

  
    return { reviewList ,getReviews,postReview };
  });
  