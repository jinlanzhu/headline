import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/Login.vue')
const Home = () => import('@/views/home/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
