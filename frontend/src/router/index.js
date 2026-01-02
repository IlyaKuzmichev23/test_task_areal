import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticlesList.vue')
    },
    {
      path: '/article/add',
      name: 'article-add',
      component: () => import('../views/ArticleForm.vue')
    },
    {
      path: '/article/:id/edit',
      name: 'article-edit',
      component: () => import('../views/ArticleForm.vue')
    },
    {
      path: '/article/:id/comments',
      name: 'article-comments',
      component: () => import('../views/ArticleComments.vue')
    }
  ],
})

export default router
