<script setup>
import SearchBar from "@/components/home/SearchBar.vue";
import Picture from "@/components/home/Picture.vue";
</script>

<template>
  <main class="main">
    <Picture></Picture>
    <SearchBar class="searchBar"></SearchBar>
  </main>
</template>
<style scoped>
.searchBar {
  width: 60%;
}

.main {
  flex-direction: column;
  display: flex;
  align-items: center;
}
</style>
