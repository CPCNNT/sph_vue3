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
