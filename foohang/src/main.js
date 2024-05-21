import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";

import App from "./App.vue";
import router from "./router";

import { useKakao } from "vue3-kakao-maps/@utils";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "./assets/global.css";

import "@fortawesome/fontawesome-free/css/all.css"; // Font Awesome CSS 파일 포함
import "@fortawesome/fontawesome-free/js/all.js"; // Font Awesome JS 파일 포함 (선택 사항)

useKakao("0f67d2671dd50723541ec17f40846446");

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");
