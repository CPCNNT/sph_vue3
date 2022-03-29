import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import { reqProductList } from '../api/api.js'

/* options API
export const useProductListStore = defineStore('productList', {
  state: () => ({ productList: {} }),
  actions: {
    async getProductList(searchParams = {}) {
      const res = await reqProductList(searchParams)
      if (res.code === 200) {
        this.productList = res.data
      }
    }
  },
  getters: {
    trademarkList: state => state.productList.trademarkList ?? [],
    attrsList: state => state.productList.attrsList ?? [],
    goodsList: state => state.productList.goodsList ?? []
  }
})
*/
// setup()
export const useProductListStore = defineStore(
  'productList',
  () => {
    // state
    const productList = reactive({})
    // actions
    async function getProductList(searchParams = {}) {
      const res = await reqProductList(searchParams)
      if (res.code === 200) {
        Object.keys(productList).forEach(item => {
          delete productList[item]
        })
        // Object.keys(res.data).forEach(item => {
        //   productList[item] = res.data[item]
        // })
        Object.assign(productList, res.data)
      }
    }
    // getters
    const trademarkList = computed(() => productList.trademarkList ?? [])
    const attrsList = computed(() => productList.attrsList ?? [])
    const goodsList = computed(() => productList.goodsList ?? [])
    const pageNo = computed(() => productList.pageNo ?? 0)
    const pageSize = computed(() => productList.pageSize ?? 0)
    const total = computed(() => productList.total ?? 0)
    const totalPages = computed(() => productList.totalPages ?? 0)
    // The same as setup() in Vue 3, you must "return".
    return {
      productList,
      getProductList,
      trademarkList, attrsList, goodsList,
      pageNo, pageSize, total, totalPages
    }
  }
)

export const useSearchParamsStore = defineStore(
  'searchParams',
  () => {
    const searchParams = reactive({
      category1Id: '', // 一级分类ID
      category2Id: '', // 二级分类ID
      category3Id: '', // 三级分类ID
      categoryName: '', // 分类名称
      keyword: '', // 关键字
      trademark: '', // 品牌  "ID:品牌名称"
      props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
      order: '1:desc', // 排序方式  1: 综合, 2: 价格; asc: 升序, desc: 降序; 示例: "1:desc"
      pageNo: 1, // 当前页码
      pageSize: 10, // 每页数量
    })

    function updateKeyword(newValue) {
      searchParams.keyword = newValue
    }
    function updateTrademark(newValue) {
      searchParams.trademark = newValue
    }
    function addProp(prop) {
      if (!searchParams.props.includes(prop)) {
        searchParams.props.push(prop)
        return true
      } else {
        return false
      }
    }
    function updateOrder(newValue) {
      searchParams.order = newValue
    }
    function updatePageNo(newValue) {
      searchParams.pageNo = newValue
    }
    function updateSearchParams(routeQuery, routeParams) {
      Object.assign(searchParams, routeQuery, routeParams)
    }
    function resetCategoryId() {
      searchParams.category1Id = undefined
      searchParams.category2Id = undefined
      searchParams.category3Id = undefined
    }
    function resetCategoryName() {
      searchParams.categoryName = undefined
    }
    function resetKeyword() {
      searchParams.keyword = undefined
    }
    function resetTrademark() {
      searchParams.trademark = undefined
    }
    function deleteProp(index) {
      searchParams.props.splice(index, 1)
    }

    const categoryName = computed(() => searchParams.categoryName ?? '')
    /* const keyword = computed({
      get: () => searchParams.keyword ?? '',
      set: (val) => {
        if (val.trim() !== searchParams.keyword) {
          searchParams.keyword = val
        }
      }
    }) */
    const keyword = computed(() => searchParams.keyword ?? '')
    const trademark = computed(() => searchParams.trademark ?? '')
    const props = computed(() => searchParams.props ?? [])
    const order = computed(() => searchParams.order ?? '')

    const isOne = computed(() => searchParams.order.split(':').includes('1'))
    const isTwo = computed(() => searchParams.order.split(':').includes('2'))
    const isAsc = computed(() => searchParams.order.split(':').includes('asc'))
    const isDesc = computed(() => searchParams.order.split(':').includes('desc'))

    return {
      searchParams, 
      updateKeyword, updateTrademark, addProp, updateOrder, updatePageNo, updateSearchParams,
      resetCategoryId, resetCategoryName, resetKeyword, resetTrademark, deleteProp,
      categoryName, keyword, trademark, props, order,
      isOne, isTwo, isAsc, isDesc
    }
  }
)
