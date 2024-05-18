<template>
  <v-carousel
    cycle
    height="200"
    show-arrows="hover"
    hide-delimiters
    v-model="activeIndex"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      @mouseenter="startHoverTimer"
      @mouseleave="stopHoverTimer"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "/src/assets/main/main0.png",
        },
        {
          src: "/src/assets/main/main1.png",
        },
        {
          src: "/src/assets/main/main2.png",
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
</style>
