import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Guardian from './views/Guardian.vue'
import Babysitter from './views/Babysitter.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login },
  { path: '/guardian', name: 'guardian', component: Guardian },
  {
    path: '/guardian/dashboard',
    name: 'guardianDashboard',
    component: {}
  },
  {
    path: '/guardian/manage-children',
    name: 'guardianManageChildren',
    component: {}
  },
  {
    path: '/guardian/book-babysitter',
    name: 'guardianBookBabysitter',
    component: {}
  },
  {
    path: '/guardian/booking-history',
    name: 'guardianBookingHistory',
    component: {}
  },
  { path: '/babysitter', name: 'babysitter', component: Babysitter },
  {
    path: '/babysitter/dashboard',
    name: 'babysitterDashboard',
    component: {}
  },
  {
    path: '/babysitter/availability',
    name: 'babysitterAvailability',
    component: {}
  },
  {
    path: '/babysitter/booking-requests',
    name: 'babysitterBookingRequests',
    component: {}
  },
  {
    path: '/babysitter/booking-history',
    name: 'babysitterBookingHistory',
    component: {}
  },
  {
    path: '/babysitter/earnings',
    name: 'babysitterEarnings',
    component: {}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
