import { createApp } from 'vue';
import App from './App.vue';
import './assets/app.css';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import { useStore } from './store/useStore';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);

router.beforeEach(() => {
  const store = useStore();
  store.authenticate();
})

app.mount('#app');
