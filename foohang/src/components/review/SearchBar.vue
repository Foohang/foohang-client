<template>
    <div class="search-bar-container">
      <div class="group">
        <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
            ></path>
          </g>
        </svg>
        <input
          placeholder="입력"
          type="search"
          class="input"
          v-model="query"
          @input="$emit('update:search', query)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const query = ref('');
  </script>
  
  <style scoped>
  .search-bar-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    max-width: 500px;
    width: 100%;
  }
  
  .input {
    width: 100%;
    height: 50px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f7931e;
    color: #ffffff;
    transition: 0.3s ease;
  }
  
  .input::placeholder {
    color: #ffffff;
  }
  
  .input:focus,
  .input:hover {
    outline: none;
    border-color: rgba(255, 112, 67, 0.4);
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(255, 112, 67, 0.1);
    color:#f7931e
  }
  
  .icon {
    position: absolute;
    left: 1rem;
    fill: #ffffff;
    width: 1rem;
    height: 1rem;
  }

  .group:hover .icon {
  fill: #f7931e; /* 호버 시 아이콘 색상 변경 */
}
  </style>
  