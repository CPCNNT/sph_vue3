import { createApp } from 'vue'
import App from './App.vue'
// import TypeNav from './components/TypeNav.vue'
import router from './router/router.js'
import { createPinia } from 'pinia'
import './mock/mockServe.js'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import VueLazyloadNext from 'vue-lazyload-next'

const app = createApp(App)

// app.component('TypeNav', TypeNav) // Global Registration

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn })

import loadingImage from './assets/loading.gif'
app.use(
  VueLazyloadNext,
  {
    preLoad: 1.3,
    loading: loadingImage,
    attempt: 1,
    throttleWait: 500
  }
)

app.mount('#app')
