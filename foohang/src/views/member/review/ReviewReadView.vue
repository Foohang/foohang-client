<script setup>
import CardForm from "@/components/review/CardForm.vue";
import { useReviewStore } from "@/stores/review";
import { ref, onMounted } from "vue";
import { watch } from "vue";
import SearchBar from "@/components/review/SearchBar.vue";

const reviewStore = useReviewStore();
const reviewList = ref([]);
const selectName = ref("");

const start = async () => {
  //   await reviewStore.getReviews();
  reviewList.value = reviewStore.reviewList;
};

const selectedOption = ref("날짜별");

const reverse = ref(null);

const sorted = async (reverse, type) => {
  await reviewStore.sorting(reverse, type);
  reviewList.value = reviewStore.reviewList;
};

watch(reverse, (newVal) => {
  sorted(newVal, selectedOption.value);
  console.log(newVal);
});

watch(selectedOption, (newVal) => {
  sorted(reverse.value, newVal);
  console.log(newVal);
});

// 보여줄 리뷰 리스트
const selectList = ref([]);

watch(selectName, (newVal) => {
  if (newVal === "") {
    selectList.value = sidoStore.sidoList.map((item) => ({
      ...item,
      currentIndex: 1, // 각 항목에 currentIndex를 추가
      timer: null, // 각 항목에 timer를 추가
    }));
  } else {
    selectList.value = sidoStore.sidoList
      .filter((item) => item.sidoName.includes(newVal))
      .map((item) => ({
        ...item,
        currentIndex: 1, // 각 항목에 currentIndex를 추가
        timer: null, // 각 항목에 timer를 추가
      }));
  }
});

onMounted(() => {
  start();
});
</script>

<template>
  <div>
    <div class="search out">
      <div class="select">
        <v-select
          v-model="selectedOption"
          label="정렬"
          :items="['날짜별', '제목별']"
          variant="outlined"
          class="pick"
        ></v-select>
        <v-switch v-model="reverse" label="역순"></v-switch>
      </div>
      <div>
        <SearchBar @update:search="selectName = $event"></SearchBar>
      </div>
    </div>

    <div v-for="(review, index) in reviewList" :key="index" class="card">
      <CardForm :review="review"></CardForm>
    </div>
  </div>
</template>

<style scoped>
.out {
  width: 70%;
}
.card {
  margin-bottom: 20px;
}
.search {
  display: flex;
  justify-content: space-between;
  /* width: 100%; */
}
.select {
  display: flex;
  align-content: center;
}
.pick {
  padding-right: 10px;
}
</style>
