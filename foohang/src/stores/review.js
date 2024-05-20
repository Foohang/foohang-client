import mypageApi from "@/api/mypageApi";
import { useAuthStore } from "@/stores/auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useReviewStore = defineStore("review", () => {
  const reviewList = ref([]);
  const review = ref({});

  const postReview = async (formData) => {
    await mypageApi.post("/reviews/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    getReviews();
  };

  const getReviews = async () => {
    const response = await mypageApi.get("/reviews/");
    reviewList.value = response.data;
  };

  const sorting = (reverse, standard) => {
    const sortKey = standard === "제목별" ? "title" : "postDate";
    reviewList.value.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return reverse ? 1 : -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return reverse ? -1 : 1;
      }
      return 0;
    });
  };

  const deleteReview = async (id) => {
    // await mypageApi.delete(`/reviews/${id}`);
    const index = reviewList.value.findIndex((review) => review.reviewId == id);

    if (index !== -1) {
      reviewList.value.splice(index, 1);
    }
    console.log(index);
  };

  const findReview = function (id) {
    const foundReview = reviewList.value.find(
      (review) => review.reviewId == id
    );

    if (foundReview) {
      review.value = foundReview;
    }
  };

  return {
    reviewList,
    review,
    getReviews,
    postReview,
    sorting,
    deleteReview,
    findReview,
  };
});
