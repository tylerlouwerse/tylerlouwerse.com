import { createApp } from 'vue';
import App from './App.vue';
import './assets/app.css';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);

app.mount('#app');
