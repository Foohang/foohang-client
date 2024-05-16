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
          src: "https://github.com/Foohang/Image/assets/72538151/96d93766-e4fa-4a8d-87c9-380df95e02c2",
        },
        {
          src: "https://github.com/Foohang/Image/assets/72538151/42000ef3-17a0-44eb-8d4c-538282772e7a",
        },
        {
          src: "https://github.com/Foohang/Image/assets/72538151/7185a9a4-6b52-4610-b8e2-c383270f226d",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
