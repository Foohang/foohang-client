<script setup>
import CardForm from "@/components/review/CardForm.vue";
import { useReviewStore } from "@/stores/review";
import { ref, onMounted } from "vue";
import { watch } from "vue";
import SearchBar from "@/components/review/SearchBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const reviewStore = useReviewStore();
const reviewList = ref([]);
const selectName = ref("");

const start = async () => {
  await reviewStore.getReviews();
  reviewList.value = reviewStore.reviewList;
  selectList.value = reviewStore.reviewList;
};

const selectedOption = ref("날짜별");

const reverse = ref(null);

const regist = function () {
  router.push({ name: "reviewWrite" });
};

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

watch(reviewStore, () => {
  reviewList.value = reviewStore.reviewList;
  selectList.value = reviewStore.reviewList;
});

// 보여줄 리뷰 리스트
const selectList = ref([]);

watch(selectName, (newVal) => {
  if (newVal === "") {
    selectList.value = reviewList.value;
  } else {
    selectList.value = reviewList.value.filter((item) =>
      item.title.includes(newVal)
    );
  }
});

onMounted(() => {
  start();
});
</script>

<template>
  <div>
    <div class="top">
      <div class="present">
        <img
          src="/src/assets/reviewIcon.png"
          height="50px"
          style="margin-right: 10px"
        />
        <div>
          <h1>추억 돌아보기</h1>
          <p class="subtitle">지난날의 여정을 돌이켜보세요</p>
        </div>
      </div>
      <div>
        <v-btn
          class="memory-btn"
          rounded="xl"
          size="x-large"
          block
          @click="regist"
          >추억 남기기</v-btn
        >
      </div>
    </div>
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
        <SearchBar class @update:search="selectName = $event"></SearchBar>
      </div>
    </div>

    <div v-for="(review, index) in selectList" :key="index" class="card">
      <CardForm :review="review"></CardForm>
    </div>
  </div>
</template>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-bottom: 20px;
}
.present {
  display: flex;
  align-items: center;
}
.subtitle {
  font-size: 14px;
  color: grey;
}
.memory-btn {
  margin-top: 10px;
  background-color: #ee703f;
  color: #f8f9fb;
  text-shadow: 0.4px 0.4px 1px #00000080;
}
.out {
  width: 70%;
}
.card {
  margin-bottom: 20px;
}
.search {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-bottom: 20px;
}
.select {
  display: flex;
  align-items: center;
}
.pick {
  padding-right: 10px;
}
</style>
