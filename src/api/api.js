import request from '../utils/request.js'
import mockRequest from '../utils/mockRequest.js'

export const reqBaseCategoryList = () => request({
  url: '/product/getBaseCategoryList',
  method: 'get'
})

export const reqBanners = () => mockRequest.get('/banners')

export const reqFloors = () => mockRequest.get('/floors')

export const reqProductList = searchParams => request({
  url: '/list',
  method: 'post',
  data: searchParams
})

export const reqDetailInfo = skuId => request({
  url: `/item/${skuId}`,
  method: 'get'
})

export const reqAddToOrUpdateCart = (skuId, skuNum) => request({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
})

export const reqCartList = () => request({
  url: '/cart/cartList',
  method: 'get'
})

export const reqDeleteCartItem = skuId => request({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})

export const reqCheckCartItem = (skuId, isChecked) => request({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

export const reqVerificationCode = phone => request({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

export const reqRegister = registrationInfo => request({
  url: '/user/passport/register',
  data: registrationInfo,
  method: 'post'
})

export const reqLogin = loginInfo => request({
  url: '/user/passport/login',
  data: loginInfo,
  method: 'post'
})

export const reqUserInfo = () => request({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})

export const reqLogout = () => request({
  url: '/user/passport/logout',
  method: 'get'
})

export const reqUserAddressList = () => request({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
})

export const reqOrderInfo = () => request({
  url: '/order/auth/trade',
  method: 'get'
})

export const reqSubmitOrder = (tradeNo, data) => request({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'post'
})

export const reqPayInfo = orderId => request({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
})

export const reqPayStatus = orderId => request({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
})

export const reqMyOrders = (page, limit) => request({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})
