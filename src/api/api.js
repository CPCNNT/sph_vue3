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

export const reqRegister = userInfo => request({
  url: '/user/passport/register',
  data: userInfo,
  method: 'post'
})
