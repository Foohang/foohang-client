<template>
  <v-carousel
    cycle
    height="450"
    show-arrows="hover"
    hide-delimiters
    v-model="activeIndex"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      @mouseenter="stopHoverTimer"
      @mouseleave="startHoverTimer"
    >
      <video
        v-if="item.type === 'video'"
        :src="item.src"
        class="carousel-media"
        autoplay
        loop
        muted
      />
      <img v-else :src="item.src" class="carousel-media" />
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
          type: "video",
          src: "/src/assets/main/main1.mp4",
          text: "어디를 여행하고 싶으신가요?",
        },
        {
          type: "image",
          src: "/src/assets/main/main1.png",
          text: "최적의 동선으로 즐거운 식사를 만끽하세요",
        },
        {
          type: "video",
          src: "/src/assets/main/main2.mp4",
          text: "최고의 순간을 기록하세요",
        },
      ],
      activeIndex: 0,
      hoverTimer: null,
    };
  },
  methods: {
    startHoverTimer() {
      this.stopHoverTimer();
      this.hoverTimer = setTimeout(() => {
        this.activeIndex = (this.activeIndex + 1) % this.items.length;
      }, 1000);
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
.carousel-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 22px;
  font-weight: lighter;
  text-align: center;
  background-color: #00000090;
  padding: 15px;
  border-radius: 15px;
}
</style>
