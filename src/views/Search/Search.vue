<template>
  <!-- 商品分类导航 -->
  <TypeNav />

  <!--list-content-->
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <li class="with-x" v-if="sP.categoryName">
            {{ sP.categoryName }}
            <i @click="removeCategoryName">×</i>
          </li>
          <li class="with-x" v-if="sP.keyword">
            {{ sP.keyword }}
            <i @click="removeKeyword">×</i>
          </li>
          <li class="with-x" v-if="sP.trademark">
            {{ sP.trademark.split(':')[1] }}
            <i @click="removeTrademark">×</i>
          </li>
          <li class="with-x" v-for="(prop, index) in sP.props" :key="index">
            <!-- {{ prop.split(':')[2] + '：' + prop.split(':')[1] }} -->
            <!-- {{ prop.split(':').reverse().slice(0, 2).join('：') }} -->
            {{ prop.split(':')[1] }}
            <i @click="removeProp(index)">×</i>
          </li>
        </ul>
      </div>

      <!--selector-->
      <SearchSelector
        @searchAfterSettingTrademark="searchAfterSettingTrademark"
        @searchAfterAddingProp="searchAfterAddingProp"
      />

      <!--details-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li :class="{ active: isOne }" @click="changeOrder('1')">
                <a>
                  综合
                  <span
                    v-show="isOne"
                    class="iconfont"
                    :class="{ 'icon-long-arrow-up': isAsc, 'icon-long-arrow-down': isDesc }"
                  ></span>
                </a>
              </li>
              <li :class="{ active: isTwo }" @click="changeOrder('2')">
                <a>
                  价格
                  <span
                    v-show="isTwo"
                    class="iconfont"
                    :class="{ 'icon-long-arrow-up': isAsc, 'icon-long-arrow-down': isDesc }"
                  ></span>
                </a>
              </li>
              <li>
                <a>销量</a>
              </li>
              <li>
                <a>新品</a>
              </li>
              <li>
                <a>评价</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
              <div class="list-wrap">
                <div class="p-img">
                  <router-link :to="`/detail/${item.id}`">
                    <img :src="item.defaultImg" />
                  </router-link>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>&NonBreakingSpace;
                    <i>{{ item.price }}.00</i>
                  </strong>
                </div>
                <div class="attr">
                  <router-link :title="item.title" :to="`/detail/${item.id}`">{{ item.title }}</router-link>
                </div>
                <div class="commit">
                  <i class="command">
                    已有
                    <span>2000</span>人评价
                  </i>
                </div>
                <div class="operate">
                  <a
                    href="success-cart.html"
                    target="_blank"
                    class="sui-btn btn-bordered btn-danger"
                  >加入购物车</a>
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Pagination
          :pageNo="pageNo"
          :pageSize="pageSize"
          :total="total"
          :totalPages="totalPages"
          :pagesNoShown="5"
          @searchAfterSettingPageNo="searchAfterSettingPageNo"
        />
      </div>

      <!--hotsale-->
      <div class="clearfix hot-sale">
        <h4 class="title">热卖商品</h4>
        <div class="hot-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_01.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_03.png" />
                </div>
                <div class="attr">
                  <em>金属A面，360°翻转，APP下单省300！</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_04.png" />
                </div>
                <div class="attr">
                  <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4068.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有20人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TypeNav from '../../components/TypeNav.vue'
import SearchSelector from './SearchSelector/SearchSelector.vue'
import Pagination from '../../components/Pagination.vue'
import { useProductListStore, useSearchParamsStore } from '../../stores/search.js'
import { onBeforeMount, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { getProductList } = useProductListStore()
const { goodsList, pageNo, pageSize, total, totalPages } = storeToRefs(useProductListStore())

const sP = useSearchParamsStore()
const {
  updateSearchParams, updateTrademark, addProp, updateOrder, updatePageNo,
  resetCategoryId, resetCategoryName, resetKeyword, resetTrademark, deleteProp
} = sP
const { isOne, isTwo, isAsc, isDesc } = storeToRefs(sP)

/* const searchParams = reactive({
  category1Id: '', // 一级分类ID
  category2Id: '', // 二级分类ID
  category3Id: '', // 三级分类ID
  categoryName: '', // 分类名称
  keyword: '', // 关键字
  trademark: '', // 品牌  "ID:品牌名称"
  props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
  order: '', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
  pageNo: 1, // 当前页码
  pageSize: 10, // 每页数量
}) */

/* function updateSearchParams() {
  Object.assign(searchParams, route.query, route.params)
} */

/* const getSearchData = async () => {
  await getProductList(searchParams)
} */
async function getSearchData() {
  await getProductList(sP.searchParams)
}

onBeforeMount(
  () => {
    updateSearchParams(route.query, route.params)
  }
)

onMounted(
  async () => {
    await getSearchData()
  }
)

/* function resetCategoryId() {
  searchParams.category1Id = undefined
  searchParams.category2Id = undefined
  searchParams.category3Id = undefined
} */

watch(
  // route,
  () => route.fullPath,
  async (newValue, oldValue) => {
    // console.log(newValue, oldValue)
    resetCategoryId()
    updateSearchParams(route.query, route.params)
    await getSearchData()
  }
)

function removeCategoryName() {
  // searchParams.categoryName = undefined
  resetCategoryName()
  // resetCategoryId()
  // getSearchData()
  router.push({ name: 'search', params: route.params })
}

function removeKeyword() {
  // searchParams.keyword = undefined
  resetKeyword()
  router.push({ name: 'search', query: route.query })
}

async function removeTrademark() {
  resetTrademark()
  await getSearchData()
}

async function searchAfterSettingTrademark(tm) {
  updateTrademark(tm)
  await getSearchData()
}

async function searchAfterAddingProp(prop) {
  if (addProp(prop)) {
    await getSearchData()
  }
}

async function removeProp(index) {
  deleteProp(index)
  await getSearchData()
}

async function changeOrder(flag) {
  const originalFlag = sP.order.split(':')[0]
  const originalSort = sP.order.split(':')[1]
  let newOrder = ''
  if (flag === originalFlag) {
    newOrder = `${originalFlag}:${originalSort === 'asc' ? 'desc' : 'asc'}`
  } else {
    newOrder = `${flag}:desc`
  }
  updateOrder(newOrder)
  await getSearchData()
}

async function searchAfterSettingPageNo(pageNo) {
  updatePageNo(pageNo)
  await getSearchData()
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
