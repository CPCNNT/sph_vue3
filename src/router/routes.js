const Home = () => import('../views/Home/Home.vue')
const Login = () => import('../views/Login/Login.vue')
const Search = () => import('../views/Search/Search.vue')
const Register = () => import('../views/Register.vue')
const Detail = () => import('../views/Detail/Detail.vue')
const AddToCartSuccess = () => import('../views/AddToCartSuccess.vue')
const Cart = () => import('../views/Cart/Cart.vue')
const Trade = () => import('../views/Trade/Trade.vue')
const Pay = () => import('../views/Pay/Pay.vue')
const PaySuccess = () => import('../views/PaySuccess/PaySuccess.vue')
const Center = () => import('../views/Center/Center.vue')
const MyOrders = () => import('../views/Center/MyOrders.vue')
const GroupOrders = () => import('../views/Center/GroupOrders.vue')

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
  },
  {
    path: '/addtocartsuccess',
    component: AddToCartSuccess,
    name: 'addtocartsuccess'
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/trade',
    component: Trade
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/paysuccess',
    component: PaySuccess
  },
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: 'myorders',
        component: MyOrders
      },
      {
        path: 'grouporders',
        component: GroupOrders
      },
      {
        path: '/center',
        redirect: '/center/myorders'
      }
    ]
  }
]
