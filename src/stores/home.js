import { defineStore } from "pinia"
import { reactive } from "vue"
import { reqBaseCategoryList, reqBanners, reqFloors } from "../api/api.js"

/* export const useBaseCategoryListStore = defineStore('baseCategoryList', {
  state: () => ({ baseCategoryList: [] }),
  actions: {
    async getBaseCategoryList() {
      const res = await reqBaseCategoryList()
      if (res.code === 200) {
        this.baseCategoryList = res.data
      }
    }
  },
  getters: {}
}) */
export const useBaseCategoryListStore = defineStore(
  'baseCategoryList',
  () => {
    const baseCategoryList = reactive([])
    async function getBaseCategoryList() {
      const res = await reqBaseCategoryList()
      if (res.code === 200) {
        // Attention: you ought not to directly reassign a new value to a reactive object!
        baseCategoryList.length = 0
        baseCategoryList.push(...res.data)
      }
    }
    return {
      baseCategoryList, getBaseCategoryList
    }
  }
)

export const useBannersStore = defineStore(
  'banners',
  () => {
    const banners = reactive([])
    async function getBanners() {
      const res = await reqBanners()
      if (res.code === 200) {
        banners.length = 0
        banners.push(...res.data)
      }
    }
    return {
      banners, getBanners
    }
  }
)

export const useFloorsStore = defineStore(
  'floors',
  () => {
    const floors = reactive([])
    async function getFloors() {
      const res = await reqFloors()
      if (res.code === 200) {
        floors.length = 0
        floors.push(...res.data)
      }
    }
    return {
      floors, getFloors
    }
  }
)
