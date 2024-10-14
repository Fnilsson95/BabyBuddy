import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Guardian from './views/Guardian.vue'
import Babysitter from './views/Babysitter.vue'
import BookingsHistory from './views/BookingsHistory.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/guardian', redirect: '/login' },
  { path: '/babysitter', redirect: '/login' },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login },
  { path: '/:id/guardian', name: 'guardian', component: Guardian },
  { path: '/:id/babysitter', name: 'babysitter', component: Babysitter },
  { path: '/:id/guardian/bookings-history', name: 'guardian-bookings-history', component: BookingsHistory },
  { path: '/:id/babysitter/bookings-history', name: 'babysitter-bookings-history', component: BookingsHistory }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
