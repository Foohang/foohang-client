<template>
  <div class="card">
    <div class="card-header">
      <div class="title">후기 작성</div>
      <div class="menu-button" @click="toggleMenu">⋮</div>
      <div v-if="menuVisible" class="menu">
        <div @click="submitReview">Submit</div>
        <div @click="cancelReview">Cancel</div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="card-content">
      <div class="input-label">제목</div>
      <input
        v-model="reviewTitle"
        placeholder="제목을 입력해주세요..."
        class="title-input"
      />
      <div class="input-label-file">첨부파일</div>
      <image-upload @upload="handleImageUpload" />
      <div class="details">
        <div class="emotions">
          <span
            :class="{ active: selectedEmotion === '1' }"
            @click="selectEmotion('1')"
            >😊</span
          >
          <span
            :class="{ active: selectedEmotion === '2' }"
            @click="selectEmotion('2')"
            >😐</span
          >
          <span
            :class="{ active: selectedEmotion === '3' }"
            @click="selectEmotion('3')"
            >😢</span
          >
          <span
            :class="{ active: selectedEmotion === '4' }"
            @click="selectEmotion('4')"
            >😍</span
          >
          <span
            :class="{ active: selectedEmotion === '5' }"
            @click="selectEmotion('5')"
            >😡</span
          >
        </div>
        <input type="date" v-model="selectedDate" class="date-input" />
      </div>
      <textarea
        v-model="reviewText"
        placeholder="후기를 작성해주세요..."
      ></textarea>
      <input
        v-model="hashtags"
        placeholder="해시태그를 입력해주세요..."
        class="hashtags-input"
      />
      <div class="buttons">
        <button @click="submitReview">Submit</button>
        <button @click="cancelReview">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ImageUpload from "@/components/review/ImageUpload.vue";
import { useReviewStore } from "@/stores/review";

const selectedEmotion = ref(0);
const menuVisible = ref(false);
const reviewText = ref("");
const reviewTitle = ref("");
const hashtags = ref("");
const selectedDate = ref(new Date().toISOString().split("T")[0]);
const uploadedFiles = ref([]);

const reviewStore = useReviewStore();

const router = useRouter();

const handleImageUpload = (images) => {
  uploadedFiles.value = images;
  console.log("Files received from ImageUpload:", uploadedFiles.value);
};

const selectEmotion = (emotion) => {
  selectedEmotion.value = emotion;
};

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const submitReview = async () => {
  // console.log(`Review submitted: ${selectedEmotion.value} ${reviewText.value}\nTitle: ${reviewTitle.value}\nHashtags: ${hashtags.value}\nDate: ${selectedDate.value}\nFiles: ${JSON.stringify(uploadedFiles.value)}`);
  if (confirm("등록하시겠습니까?")) {
    const formData = new FormData();
    formData.append("selectedEmotion", selectedEmotion.value);
    formData.append("reviewText", reviewText.value);
    formData.append("reviewTitle", reviewTitle.value);
    formData.append("hashtags", hashtags.value);
    formData.append("selectedDate", selectedDate.value);
    formData.append("uploadedDate", new Date().toISOString().split("T")[0]);
    for (const fileObj of uploadedFiles.value) {
      formData.append(`files`, fileObj.file);
    }
    try {
      await reviewStore.postReview(formData);
      router.push({ name: "review" });
    } catch (error) {
      console.error("에러:", error);
      alert("등록 실패");
    }
  }
};

const cancelReview = () => {
  if (confirm("리뷰 작성을 취소하시겠습니까?")) {
    reviewText.value = "";
    reviewTitle.value = "";
    hashtags.value = "";
    selectedEmotion.value = null;
    selectedDate.value = new Date().toISOString().split("T")[0];
    uploadedFiles.value = [];
    router.push({ name: "review" });
  }
};
</script>

<style scoped>
.card {
  width: 70%;
  background: white;
  padding: 0.4em;
  border-radius: 6px;
  border: 1px solid black;
  height: auto;
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
  margin: 0 10px;
}

.card-content {
  padding: 10px;
}

.input-label {
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-label-file {
  font-size: 1em;
  font-weight: bold;
  margin-bottom: -40px;
}

.title-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
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

.date-input {
  font-size: 0.9em;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
  resize: none;
}

.hashtags-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

button:first-of-type {
  background-color: #4caf50;
  color: white;
}

button:last-of-type {
  background-color: #f44336;
  color: white;
}
</style>
