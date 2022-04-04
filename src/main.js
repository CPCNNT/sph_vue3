import { createApp } from 'vue'
import App from './App.vue'
// import TypeNav from './components/TypeNav.vue'
import router from './router/router.js'
import { createPinia } from 'pinia'
import './mock/mockServe.js'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

// app.component('TypeNav', TypeNav) // Global Registration

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
