import { createRouter, createWebHashHistory } from "vue-router"
import routes from './routes.js'
import { useUserStore } from '../stores/user.js'
import { storeToRefs } from "pinia"

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const { getUserInfo, userLogout } = useUserStore()
  const { token, userName } = storeToRefs(useUserStore())
  if (token.value) {
    if (to.path==='/login' || to.path === '/register') {
      next('/home')
    } else {
      if (userName.value) {
        next()
      } else {
        try {
          await getUserInfo()
          next()
        } catch (error) {
          // token 失效了，需重新登陆
          // 清除 token
          await userLogout()
          next('/login')
        }
      }
    }
  } else {
    next()
  }
})

export default router
