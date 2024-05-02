import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

export const apiUrl = import.meta.env.VITE_BACKEND_ENDPOINT;

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
