<template>
    <div class="card">
      <div class="card-header">
        <div class="title">Image Title</div>
        <div class="menu-button" @click="toggleMenu">⋮</div>
        <div v-if="menuVisible" class="menu">
          <div @click="editPost">Edit Post</div>
          <div @click="deletePost">Delete Post</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="card-image">
        <div v-for="image in images" :key="image.id" class="image">
          <img :src="image.url" alt="Placeholder" />
        </div>
      </div>
      <div class="details">
        <div class="emotions">
          <span :class="{'active': selectedEmotion === 'happy'}" @click="selectEmotion('happy')">😊</span>
          <span :class="{'active': selectedEmotion === 'neutral'}" @click="selectEmotion('neutral')">😐</span>
          <span :class="{'active': selectedEmotion === 'sad'}" @click="selectEmotion('sad')">😢</span>
          <span :class="{'active': selectedEmotion === 'love'}" @click="selectEmotion('love')">😍</span>
          <span :class="{'active': selectedEmotion === 'angry'}" @click="selectEmotion('angry')">😡</span>
        </div>
        <div class="date">4 days ago</div>
      </div>
      <div class="category">Illustration</div>
      <div class="heading">
        A heading that must span over two lines
        <div class="author">By <span class="name">Abi</span></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedEmotion = ref(null);
  const menuVisible = ref(false);
  
  const images = ref([
    { id: 1, url: '/src/assets/city/31-1.jpg' },
    { id: 2, url: '/src/assets/city/31-1.jpg' },
    { id: 3, url: '/src/assets/city/31-1.jpg' },
    { id: 4, url: '/src/assets/city/31-1.jpg' },
    { id: 5, url: '/src/assets/city/31-1.jpg' },
    { id: 6, url: '/src/assets/city/31-1.jpg' }
  ]);
  
  function selectEmotion(emotion) {
    selectedEmotion.value = emotion;
  }
  
  function toggleMenu() {
    menuVisible.value = !menuVisible.value;
  }
  
  function editPost() {
    alert("Edit Post clicked");
  }
  
  function deletePost() {
    alert("Delete Post clicked");
  }
  </script>
  
  <style scoped>
  .card {
    width: 70%;
    background: white;
    padding: 0.4em;
    border-radius: 6px;
    border: 1px solid black;
    height: 700px; /* Adjusted height */
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
  
  .card-image {
    background-color: rgb(236, 236, 236);
    width: 100%;
    height: 60%; /* Adjusted to allow space for other content */
    border-radius: 0 0 0 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
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
    object-fit: cover; /* Ensure images cover the available space */
  }
  
  .details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
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
  
  .date {
    font-size: 0.9em;
    color: gray;
  }
  
  .category {
    text-transform: uppercase;
    font-size: 0.7em;
    font-weight: 600;
    color: rgb(63, 121, 230);
    padding: 10px 7px 0;
  }
  
  .category:hover {
    cursor: pointer;
  }
  
  .heading {
    font-weight: 600;
    color: rgb(88, 87, 87);
    padding: 7px;
  }
  
  .heading:hover {
    cursor: pointer;
  }
  
  .author {
    color: gray;
    font-weight: 400;
    font-size: 11px;
    padding-top: 20px;
  }
  
  .name {
    font-weight: 600;
  }
  
  .name:hover {
    cursor: pointer;
  }
  </style>
  