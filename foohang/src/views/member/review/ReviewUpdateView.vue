<script setup>
import ReviewForm from "@/components/review/ReviewForm.vue";
import ReviewUpdate from "@/components/review/ReviewUpdate.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const reviewId = computed(() => route.params.reviewId);
</script>

<template>
  <div>
    <ReviewForm></ReviewForm>
    <ReviewUpdate :reviewId="reviewId"></ReviewUpdate>
  </div>
</template>

<style scoped></style>
