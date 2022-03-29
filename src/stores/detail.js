import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { reqDetailInfo } from '../api/api.js'

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

    const categoryView = computed(() => detailInfo.categoryView ?? {})
    const skuInfo = computed(() => detailInfo.skuInfo ?? {})
    const spuSaleAttrList = computed(() => detailInfo.spuSaleAttrList ?? [])
    const skuImageList = computed(() => detailInfo.skuInfo?.skuImageList ?? [{}])

    return {
      detailInfo,
      getDetailInfo,
      categoryView, skuInfo, spuSaleAttrList, skuImageList
    }
  }
)
