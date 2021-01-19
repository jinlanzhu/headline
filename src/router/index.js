import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/Login.vue')
const Home = () => import('@/views/home/Home.vue')
const Layout = () => import('@/views/layout/Layout.vue')
const Article = () => import('@/views/article/Article.vue')
const Fans = () => import('@/views/fans/Fans.vue')
const Publish = () => import('@/views/publish/Publish.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'article',
        name: 'article',
        component: Article
      },
      {
        path: 'fans',
        name: 'fans',
        component: Fans
      },
      {
        path: 'publish',
        name: 'publish',
        component: Publish
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由导航守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {

  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()
  const user = JSON.parse(window.sessionStorage.getItem('user'))
  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

export default router
