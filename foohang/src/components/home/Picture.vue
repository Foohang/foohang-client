<template>
  <v-carousel cycle height="200" show-arrows="hover" hide-delimiters>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
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
    };
  },
};
</script>

<style scoped></style>
