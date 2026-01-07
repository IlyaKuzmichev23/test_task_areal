import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'articles-home',
      component: () => import('../views/ArticlesList.vue')
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
    },
    {
      path: '/article/:id',
      name: 'article-view',
      component: () => import('../views/ArticleView.vue')
    },
    {
      path: '/analytic',
      name: 'analytic',
      component: () => import('../views/AnalyticComments.vue')
    }
  ],
})

export default router
