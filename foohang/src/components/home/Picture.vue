<template>
  <v-carousel
    cycle
    height="300"
    show-arrows="hover"
    hide-delimiters
    v-model="activeIndex"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      @mouseenter="startHoverTimer"
      @mouseleave="stopHoverTimer"
    >
      <img :src="item.src" class="carousel-image" />
      <div class="carousel-text">{{ item.text }}</div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "/src/assets/main/main0.png",
          text: "어디를 여행하고 싶으신가요?",
        },
        {
          src: "/src/assets/main/main1.png",
          text: "최적의 동선으로 즐거운 식사를 만끽하세요",
        },
        {
          src: "/src/assets/main/main2.png",
          text: "최고의 순간을 기록하세요",
        },
      ],
      activeIndex: 0,
      hoverTimer: null,
    };
  },
  methods: {
    startHoverTimer() {
      this.stopHoverTimer(); // clear any existing timer before starting a new one
      this.hoverTimer = setTimeout(() => {
        this.activeIndex = (this.activeIndex + 1) % this.items.length;
      }, 1000); // 1000ms = 1 second
    },
    stopHoverTimer() {
      if (this.hoverTimer) {
        clearTimeout(this.hoverTimer);
        this.hoverTimer = null;
      }
    },
  },
};
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff; /* 주황색 계열 */
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 배경으로 가독성 증가 */
  padding: 30px;
  border-radius: 15px;
}

</style>
