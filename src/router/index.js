import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import register from '../components/register.vue'
import index from '../components/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: {
      title: '首页',
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  /* 判断该路由是否需要登录权限 */
  if (to.matched.some(record => record.meta.requireAuth)) {
    var EXPIRESTIME = '6000000'
    let token = localStorage.getItem('token')
    token = JSON.parse(token)
    if (token) {
      const date = new Date().getTime()
      // 如果大于就是过期了，如果小于或等于就还没过期
      if (date - token.startTime > EXPIRESTIME) {
        localStorage.removeItem('token')
        alert('登录已过期，请重新登录')
        next({
          path: '/'
        })
      }
    }
    // else {
    //   alert('用户未登录')
    //   next({
    //     path: '/'
    //   })
    // }
  }
  next()
})

export default router
