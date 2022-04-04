import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import { reqPayInfo } from "../api/api.js"

export const usePayStore = defineStore(
  'pay',
  () => {
    const payInfo = reactive({})

    async function getPayInfo(orderId) {
      const res = await reqPayInfo(orderId)
      // console.log(res)
      if (res.code === 200) {
        Object.assign(payInfo, res.data)
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }

    const totalFee = computed(() => payInfo.totalFee ?? 0)
    const codeUrl = computed(() => payInfo.codeUrl ?? '')

    return {
      payInfo, getPayInfo, totalFee, codeUrl
    }
  }
)
