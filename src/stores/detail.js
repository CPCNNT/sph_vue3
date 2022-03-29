import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { reqDetailInfo, reqAddToOrUpdateCart } from '../api/api.js'

export const useDetailInfoStore = defineStore(
  'detailInfo',
  () => {
    const detailInfo = reactive({})

    async function getDetailInfo(skuId) {
      const res = await reqDetailInfo(skuId)
      if (res.code === 200) {
        Object.assign(detailInfo, res.data)
      }
    }
    async function addToOrUpdateCart(skuId, skuNum) {
      const res = await reqAddToOrUpdateCart(skuId, skuNum)
      if (res.code === 200) {
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }

    const categoryView = computed(() => detailInfo.categoryView ?? {})
    const skuInfo = computed(() => detailInfo.skuInfo ?? {})
    const spuSaleAttrList = computed(() => detailInfo.spuSaleAttrList ?? [])
    const skuImageList = computed(() => detailInfo.skuInfo?.skuImageList ?? [{}])

    return {
      detailInfo,
      getDetailInfo, addToOrUpdateCart,
      categoryView, skuInfo, spuSaleAttrList, skuImageList
    }
  }
)
