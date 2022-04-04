import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import { reqUserAddressList, reqOrderInfo, reqSubmitOrder } from "../api/api.js"

export const useUserAddressListStore = defineStore(
  'userAddressList',
  () => {
    const userAddressList = reactive([])
    const defaultAddressId = ref(0)

    async function getUserAddressList() {
      const res = await reqUserAddressList()
      if (res.code === 200) {
        userAddressList.length = 0
        userAddressList.push(...res.data)
        userAddressList.forEach(item => {
          if (item.isDefault === '1') {
            defaultAddressId.value = item.id
          }
        })
      }
    }

    const selectedAddress = computed(() => userAddressList.find(item => item.isDefault === '1') ?? {})

    return {
      userAddressList, getUserAddressList, defaultAddressId, selectedAddress
    }
  }
)

export const useOrderStore = defineStore(
  'order',
  () => {
    const orderInfo = reactive({})
    const orderId = ref(0)

    async function getOrderInfo() {
      const res = await reqOrderInfo()
      // console.log(res)
      if (res.code === 200) {
        Object.assign(orderInfo, res.data)
      }
    }
    async function submitOrder(data) {
      const res = await reqSubmitOrder(orderInfo.tradeNo, data)
      if (res.code === 200) {
        orderId.value = res.data
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }

    const detailArrayList = computed(() => orderInfo.detailArrayList ?? [])
    const totalNum = computed(() => detailArrayList.value.reduce((prev, cur) => prev + cur.skuNum, 0))
    const totalAmount = computed(() => orderInfo.totalAmount ?? 0)

    return {
      orderInfo, orderId, getOrderInfo, submitOrder, detailArrayList, totalNum, totalAmount
    }
  }
)
