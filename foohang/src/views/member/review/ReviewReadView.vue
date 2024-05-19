<script setup>
import CardForm from "@/components/review/CardForm.vue";
import { useReviewStore } from "@/stores/review";
import { ref, onMounted } from 'vue';
import { watch } from "vue";

const reviewStore = useReviewStore();
const reviewList = ref([]);

const start = async () => {
//   await reviewStore.getReviews();
  reviewList.value = reviewStore.reviewList;
};

const selectedOption = ref("날짜별");

const reverse = ref(null);

const sorted = async (reverse, type) => {
  await reviewStore.sorting(reverse, type);
  reviewList.value = reviewStore.reviewList;
}

watch(reverse, (newVal) => {
  sorted(newVal, selectedOption.value);
  console.log(newVal);
});

watch(selectedOption, (newVal) => {
  sorted(reverse.value, newVal);
  console.log(newVal);
});

onMounted(() => {
  start();
});
</script>

<template>
  <div>
    <div class="search out">
        <v-select
          v-model="selectedOption"
          label="정렬"
          :items="['날짜별', '제목별']"
          variant="outlined"
          class="search"
        ></v-select>
        <v-switch
          v-model="reverse"
          label="역순"
        ></v-switch>
    </div>
    
    <div v-for="(review, index) in reviewList" :key="index" class="card">
      <CardForm :review="review"></CardForm>
    </div>
  </div>
</template>

<style scoped>
.out{
    width: 70%;
}
.card{
    margin-bottom: 20px;
}
.search{
    display: flex;
    justify-content: space-around;
}
</style>
