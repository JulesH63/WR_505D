import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import movies from '../views/Movies.vue'
import actors from '../views/Actors.vue'
import categories from '../views/Categories.vue'
import login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Home
    },
    {
      path: '/Movies',
      name: 'Movies',
      component: movies
    },
    {
      path: '/Actors',
      name: 'Actors',
      component: actors
    },
    {
      path: '/Categories',
      name: 'Categories',
      component: categories
    },
    {
      path: '/Login',
      name: 'Login',
      component: login
    },
  ]
})
 
export default router
