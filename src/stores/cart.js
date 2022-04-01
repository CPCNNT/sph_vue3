import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { reqCartList, reqDeleteCartItem, reqCheckCartItem } from '../api/api.js'

export const useCartListStore = defineStore(
  'cartList',
  () => {
    const cartList = reactive([])

    async function getCartList() {
      const res = await reqCartList()
      // console.log(res)
      if (res.code === 200) {
        cartList.length = 0
        cartList.push(...res.data)
      }
    }
    async function deleteCartItem(skuId) {
      const res = await reqDeleteCartItem(skuId)
      if (res.code === 200) {
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }
    async function checkCartItem(skuId, isChecked) {
      const res = await reqCheckCartItem(skuId, isChecked)
      if (res.code === 200) {
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }
    function deleteCheckedCartItems() {
      const promises = []
      cartInfoList.value.forEach(item => {
        if (item.isChecked === 1) {
          let res = deleteCartItem(item.skuId)
          // console.log(res)
          promises.push(res)
        }
      })
      return Promise.all(promises)
    }
    function checkAllCartItems(isChecked) {
      const promises = []
      cartInfoList.value.forEach(item => {
        if (item.isChecked !== isChecked) {
          let res = checkCartItem(item.skuId, isChecked)
          promises.push(res)
        }
      })
      return Promise.all(promises)
    }

    const cartInfoList = computed(() => cartList[0]?.cartInfoList ?? [])
    const totalNum = computed(() => {
      let sum = 0
      cartInfoList.value.forEach(item => {
        if (item.isChecked === 1) {
          sum += item.skuNum
        }
      })
      return sum
    })
    const totalCost = computed(() => {
      let sum = 0
      cartInfoList.value.forEach(item => {
        if (item.isChecked === 1) {
          sum += item.skuNum * item.skuPrice
        }
      })
      return sum
    })
    const isAllChecked = computed(() => cartInfoList.value.every(item => item.isChecked === 1))

    return {
      cartList,
      getCartList, deleteCartItem, checkCartItem, deleteCheckedCartItems, checkAllCartItems,
      cartInfoList, totalNum, totalCost, isAllChecked
    }
  }
)
