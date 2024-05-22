<script setup>
import SearchBar from "@/components/home/SearchBar.vue";
import Picture from "@/components/home/Picture.vue";
import Footer from "@/components/footer/Footer.vue";
</script>

<template>
  <main class="main">
    <Picture></Picture>
    <SearchBar class="searchBar"></SearchBar>
  </main>
  <Footer />
</template>
<style scoped>
.searchBar {
  width: 60%;
}

.main {
  flex-direction: column;
  display: flex;
  align-items: center;
  background-color: #f8f9fb;
}
</style>
