<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <Transition name="fade">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="search">
              <div
                class="item"
                v-for="c1 in baseCategoryList"
                :key="c1.categoryId"
                :class="{ bgColor: c1.categoryId === currentC1Id }"
              >
                <h3 @mouseenter="changeC1Id(c1.categoryId)">
                  <a :data-category1id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" v-show="c1.categoryId === currentC1Id">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-category2id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-category3id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useBaseCategoryListStore } from '../stores/home.js'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import throttle from 'lodash/throttle.js'

const { baseCategoryList } = storeToRefs(useBaseCategoryListStore())
const route = useRoute()
const router = useRouter()

const isShow = ref(false)
onMounted(() => {
  if (route.path === '/home') {
    isShow.value = true
  }
})
function enterShow() {
  isShow.value = true
}

const currentC1Id = ref(-1)
const changeC1Id = throttle(c1Id => {
  currentC1Id.value = c1Id
  // console.log('change c1Id')
}, 50)

function leaveShow() {
  currentC1Id.value = -1
  if (route.path !== '/home') {
    isShow.value = false
  }
}

function search(event) {
  const element = event.target
  if (element.tagName === 'A') {
    const query = { categoryName: element.textContent }
    const { category1id, category2id, category3id } = element.dataset
    if (category1id) {
      query.category1Id = category1id
    } else if (category2id) {
      query.category2Id = category2id
    } else if (category3id) {
      query.category3Id = category3id
    }
    router.push({
      name: 'search',
      query,
      params: route.params ?? {}
    })
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 462px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        height: 462px;
        overflow-y: scroll;

        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .bgColor {
          background-color: skyblue;
        }
      }
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
  }
}
</style>
