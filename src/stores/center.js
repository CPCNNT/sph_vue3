import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import { reqMyOrders } from "../api/api.js"

export const useMyOrdersStore = defineStore(
  'myOrders',
  () => {
    const myOrders = reactive({})
    const pageNo = ref(1)
    const limit = ref(5)

    async function getMyOrders() {
      const res = await reqMyOrders(pageNo.value, limit.value)
      if (res.code === 200) {
        Object.assign(myOrders, res.data)
      }
    }
    function updatePageNo(currentPageNo) {
      pageNo.value = currentPageNo
    }

    const myOrdersList = computed(() => myOrders.records ?? [])
    const total = computed(() => myOrders.total ?? 0)
    const totalPages = computed(() => myOrders.pages ?? 0)

    return {
      myOrders, pageNo, limit, getMyOrders, updatePageNo, myOrdersList, total, totalPages
    }
  }
)
