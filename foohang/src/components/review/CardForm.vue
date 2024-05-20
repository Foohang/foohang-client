<template>
  <div class="card" ref="card">
    <div class="card-header">
      <div class="headers">
        <div class="title">{{ review.title }}</div>
        <div class="divider orange-line"></div>
        <div class="post-date">{{ review.postDate }}</div>
      </div>
      <div class="menu-button" @click="toggleMenu">⋮</div>
      <div v-if="menuVisible" class="menu" ref="menu">
        <div @click="handleMenuOption('edit')">Edit Post</div>
        <div @click="handleMenuOption('delete')">Delete Post</div>
      </div>
    </div>
    <div class="card-image" v-if="review.images != null">
      <div v-for="(image, index) in review.images" :key="index" class="image">
        <img :src="image" alt="Placeholder" />
      </div>
    </div>
    <div class="image-details">
      <div class="travel-date">Travel Date: {{ review.travelDate }}</div>
      <div class="emotions">
        <span :class="{ active: review.selectedEmotion === '1' }">😊</span>
        <span :class="{ active: review.selectedEmotion === '2' }">😐</span>
        <span :class="{ active: review.selectedEmotion === '3' }">😢</span>
        <span :class="{ active: review.selectedEmotion === '4' }">😍</span>
        <span :class="{ active: review.selectedEmotion === '5' }">😡</span>
      </div>
    </div>
    <div class="details">
      <div class="content">{{ review.content }}</div>
      <div class="hashtags">
        <span v-for="(hashtag, index) in review.hashtags" :key="index">{{
          hashtag
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useReviewStore } from "@/stores/review";
import router from "@/router";

const reviewStore = useReviewStore();

const props = defineProps({
  review: Object,
});

const menuVisible = ref(false);
const menu = ref(null);
const card = ref(null);

function toggleMenu() {
  menuVisible.value = !menuVisible.value;
}

function handleMenuOption(option) {
  if (option === "edit") {
    if (confirm("수정하시겠습니까?")) {
      router.push({
        name: "reviewUpdate",
        params: { reviewId: props.review.reviewId },
      });
    }
  } else if (option === "delete") {
    if (confirm("삭제하시겠습니까?")) {
      reviewStore.deleteReview(props.review.reviewId);
    }
  }
  menuVisible.value = false;
}

function handleClickOutside(event) {
  if (menuVisible.value && card.value && !card.value.contains(event.target)) {
    menuVisible.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.headers {
  width: 100%;
}
.card {
  width: 70%;
  background: white;
  padding: 0.4em;
  border-radius: 6px;
  border: 1px solid black;
  position: relative;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
  position: relative;
  z-index: 2;
}

.title {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

.post-date {
  font-size: 0.8em;
  color: gray;
}

.menu-button {
  font-size: 1.5em;
  cursor: pointer;
}

.menu {
  position: absolute;
  right: 10px;
  top: 40px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 3;
}

.menu div {
  padding: 10px;
  cursor: pointer;
}

.menu div:hover {
  background-color: #f0f0f0;
}

.divider {
  height: 1px;
  background-color: #ddd;
  margin: 0 0px;
}

.orange-line {
  background-color: orange;
  width: 50%;
  height: 2px; /* Increased thickness */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added shadow */
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: -10px;
}

.card-image {
  background-color: rgb(236, 236, 236);
  width: 100%;
  /* height: 100;  */
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-bottom: 10px; /* Added space above the images */
}

.image {
  flex: 1 1 33%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.travel-date {
  font-size: 0.9em;
  color: gray;
}

.details {
  padding: 10px;
}

.content {
  font-size: 1em;
  color: #333;
}

.hashtags {
  font-size: 0.9em;
  color: #888;
  margin-top: 10px;
}

.hashtags span {
  margin-right: 10px;
}

.emotions {
  display: flex;
  align-items: center;
}

.emotions span {
  font-size: 2em;
  margin-right: 10px;
  cursor: pointer;
}

.emotions span.active {
  transform: scale(1.2);
  transition: transform 0.2s;
}
</style>
