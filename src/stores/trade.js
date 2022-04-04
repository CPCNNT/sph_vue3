import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import { reqUserAddressList, reqOrderInfo } from "../api/api.js"

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

    return {
      userAddressList, getUserAddressList, defaultAddressId
    }
  }
)

export const useOrderInfoStore = defineStore(
  'orderInfo',
  () => {
    const orderInfo = reactive({})

    async function getOrderInfo() {
      const res = await reqOrderInfo()
      // console.log(res)
      if (res.code === 200) {
        Object.assign(orderInfo, res.data)
      }
    }

    const detailArrayList = computed(() => orderInfo.detailArrayList ?? [])
    const totalNum = computed(() => detailArrayList.value.reduce((prev, cur) => prev + cur.skuNum, 0))
    const totalAmount = computed(() => orderInfo.totalAmount ?? 0)

    return {
      orderInfo, getOrderInfo, detailArrayList, totalNum, totalAmount
    }
  }
)
