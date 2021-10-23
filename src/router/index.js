import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: { name: 'menu' },
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/MenuView'),
  },
  {
    path: '/meal',
    name: 'meal',
    component: () => import('../views/MealView'),
  },
  {
    path: '/meal/create',
    name: 'meal.create',
    component: () => import('../views/MealCreateView'),
  },
  {
    path: '/meal/:id',
    name: 'meal.edit',
    component: () => import('../views/MealEditView'),
    props(route) {
      const props = route.params
      props.id = +props.id
      return props
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView'),
  },
  {
    path: '*',
    name: 'not-found',
    redirect: { name: 'index' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
