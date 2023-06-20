import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/posts/:slug',
    name: 'post',
    component: () => import('../views/PostPage.vue'),
    props: true
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
});
