import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Turn off loading spinner by setting it to false. (default: true)
NProgress.configure({ showSpinner: false })

const service = axios.create({
  baseURL: '/api',
  timeout: 10 * 1000
})

service.interceptors.request.use(
  config => {
    NProgress.start()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    console.log(error)
    alert(`请求出错：${error.message || '未知错误'}`)
    return Promise.reject(error)
  }
)

export default service
