const Home = () => import('../views/Home/Home.vue')
const Login = () => import('../views/Login/Login.vue')
const Search = () => import('../views/Search/Search.vue')
const Register = () => import('../views/Register.vue')
const Detail = () => import('../views/Detail/Detail.vue')

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/search/:keyword?', // params参数可传可不传
    component: Search,
    name: 'search'
  },
  {
    path: '/login',
    component: Login,
    meta: { isHideFooter: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { isHideFooter: true }
  },
  {
    path: '/detail/:skuId',
    component: Detail
  }
]
