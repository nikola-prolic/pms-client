import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

export const apiUrl = import.meta.env.VITE_BACKEND_ENDPOINT;

const app = createApp(App);

// Set up Pinia
const pinia = createPinia();
app.use(pinia);

// Set up Router
app.use(router);


// Mount the Vue application
app.mount("#app");
