import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TrialView from '../views/TrialView.vue'
import WaitingView from '@/views/WaitingView.vue'
import ResultView from '@/views/ResultView.vue'

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
    {
      path: '/result',
      name: 'result',
      component: ResultView,
    },
  ],
})

export default router
