import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import { useStore } from '../store/useStore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/admin/posts',
    name: 'admin.posts',
    component: () => import('../views/admin/PostsPage.vue'),
    beforeEnter: (_: RouteLocationNormalized, __: RouteLocationNormalized, next: NavigationGuardNext) => {
      const store = useStore();

      if(!store.authenticated) {
        return next({ name: 'admin.login' })
      }

      return next();
    }
  },
  {
    path: '/admin/posts/:slug/edit',
    name: 'admin.posts.edit',
    component: () => import('../views/admin/Edit.vue'),
    props: true,
    beforeEnter: (_: RouteLocationNormalized, __: RouteLocationNormalized, next: NavigationGuardNext) => {
      const store = useStore();

      if(!store.authenticated) {
        return next({ name: 'admin.login' })
      }

      return next();
    }
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
