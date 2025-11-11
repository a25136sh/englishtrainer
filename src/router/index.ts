import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TrialView from '../views/TrialView.vue'
import WaitingView from '@/views/WaitingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/try/:id',
      name: 'try',
      component: TrialView,
    },
    {
      path: '/wait',
      name: 'wait',
      component: WaitingView,
    },
  ],
})

export default router
