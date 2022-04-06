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

router.beforeEach(async (to, from) => {
  const { getUserInfo, userLogout } = useUserStore()
  const { token, userName } = storeToRefs(useUserStore())
  if (token.value) {
    if (to.path === '/login' || to.path === '/register') {
      return '/home'
    } else {
      if (userName.value) {
        return true
      } else {
        try {
          await getUserInfo()
          return true
        } catch (error) {
          // token 失效了，需重新登陆
          // 清除 token
          await userLogout()
          return '/login'
        }
      }
    }
  } else {
    const toPath = to.path
    if (toPath.includes('trade') || toPath.includes('pay')) {
      return '/login'
    } else if (toPath.includes('center')) {
      return `/login?redirect=${toPath}`
    } else {
      return true
    }
  }
})

export default router
