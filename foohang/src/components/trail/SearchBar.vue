<template>
  <div class="search-bar-container">
    <div class="form">
      <label for="search">
        <input
          required
          autocomplete="off"
          placeholder="관광지를 검색해보세요."
          id="search"
          type="search"
          class="input"
          v-model="query"
          @input="$emit('update:search', query)"
          @keyup.enter="onEnter"
        />
        <div class="icon">
          <svg
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="swap-on"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
          <svg
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="swap-off"
          >
            <path
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </div>
        <button type="reset" class="close-btn" @click="query = ''">
          <svg
            viewBox="0 0 20 20"
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

const query = ref("");
const emit = defineEmits(["enter"]);

const onEnter = () => {
  emit("enter");
};
</script>

<style scoped>
.search-bar-container {
  /* margin-top: 10px; */
}
.form {
  --input-bg: #fff;
  --padding: 1.5em;
  --rotate: 80deg;
  --gap: 2em;
  --icon-change-color: #15a986;
  --height: 40px;
  width: 300px; /* 길이를 늘리기 위해 값을 조정했습니다 */
  padding-inline-end: 1em;
  background: var(--input-bg);
  position: relative;
  border-radius: 4px;
  border: 2px solid #070707; /* 테두리 색상 추가 */
}

.form label {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--height);
}

.form input {
  width: 100%;
  padding-inline-start: calc(var(--padding) + var(--gap));
  outline: none;
  background: none;
  border: 0;
}

.form svg {
  color: #111;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  height: 15px;
}

.icon {
  position: absolute;
  left: var(--padding);
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.swap-off {
  transform: rotate(-80deg);
  opacity: 0;
  visibility: hidden;
}

.close-btn {
  background: none;
  border: none;
  right: calc(var(--padding) - var(--gap));
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111;
  padding: 0.1em;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: 0.3s;
  opacity: 0;
  transform: scale(0);
  visibility: hidden;
}

.form input:focus ~ .icon {
  transform: rotate(var(--rotate)) scale(1.3);
}

.form input:focus ~ .icon .swap-off {
  opacity: 1;
  transform: rotate(-80deg);
  visibility: visible;
  color: var(--icon-change-color);
}

.form input:focus ~ .icon .swap-on {
  opacity: 0;
  visibility: visible;
}

.form input:valid ~ .icon {
  transform: scale(1.3) rotate(var(--rotate));
}

.form input:valid ~ .icon .swap-off {
  opacity: 1;
  visibility: visible;
  color: var(--icon-change-color);
}

.form input:valid ~ .icon .swap-on {
  opacity: 0;
  visibility: visible;
}

.form input:valid ~ .close-btn {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  transition: 0s;
}
</style>
