<script setup>
import CardForm from "@/components/review/CardForm.vue";
import { useReviewStore } from "@/stores/review";
import { ref, onMounted } from 'vue';

const reviewStore = useReviewStore();
const reviewList = ref([]);

const start = async () => {
//   await reviewStore.getReviews();
  reviewList.value = reviewStore.reviewList;
};

onMounted(() => {
  start();
});
</script>

<template>
  <div>
    <div v-for="(review, index) in reviewList" :key="index" class="card">
      <CardForm :review="review"></CardForm>
    </div>
  </div>
</template>

<style scoped>
.card{
    margin-bottom: 20px;
}
</style>