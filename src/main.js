import { createApp } from 'vue'
import App from './App.vue'
// import TypeNav from './components/TypeNav.vue'
import router from './router/router.js'
import { createPinia } from 'pinia'
import './mock/mockServe.js'

const app = createApp(App)

// app.component('TypeNav', TypeNav) // Global Registration

app.use(router)

app.use(createPinia())

app.mount('#app')
