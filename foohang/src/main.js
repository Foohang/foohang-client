// import "@/assets/css/reset.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";

import App from "./App.vue";
import router from "./router";

import { useKakao } from "vue3-kakao-maps/@utils";

useKakao("0f67d2671dd50723541ec17f40846446");

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
