import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
const pinia = createPinia();
import { vfmPlugin } from 'vue-final-modal';
import App from './App.vue';

const app = createApp(App);
app.use(vfmPlugin);
app.use(pinia);
app.mount('#app');
