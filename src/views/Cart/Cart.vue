<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked === 1"
              :disabled="!canInteract"
              @change="checkItem(item, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">&nbsp;</div>
          </li>-->
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum('mins', item, -1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="changeNum('change', item, $event.target.value * 1)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeNum('plus', item, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteItem(item)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          :disabled="!canInteract"
          @change="checkAllItems"
        />
        <span>&nbsp;全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{ totalNum }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalCost }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" @click="router.push('/trade')">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartListStore } from '../../stores/cart.js'
import { useDetailInfoStore } from '../../stores/detail.js'
// import throttle from 'lodash/throttle.js'
// import { useRouter } from 'vue-router'
import { onBeforeRouteLeave } from 'vue-router'

const {
  getCartList, deleteCartItem, checkCartItem, deleteCheckedCartItems, checkAllCartItems
} = useCartListStore()
const { cartInfoList, totalNum, totalCost, isAllChecked } = storeToRefs(useCartListStore())
const { addToOrUpdateCart } = useDetailInfoStore()
// const router = useRouter()

const canInteract = ref(true)

onMounted(async () => {
  await getCartList()
})

/* const changeNum = throttle(
  async (type, item, val) => {
    let numChange = 0
    switch (type) {
      case 'mins':
        if (item.skuNum + val > 0) {
          numChange = val
        }
        break
      case 'plus':
        numChange = val
        break
      case 'change':
        if (!isNaN(val)) {
          if (val >= 1) {
            numChange = parseInt(val) - item.skuNum
          }
        }
        break
    }
    try {
      await addToOrUpdateCart(item.skuId, numChange)
      getCartList()
    } catch (error) {
      console.log(error)
    }
  },
  1000
) */
// throttle is not the perfect solution, the following is my own one to user's frequent interaction
const changeNum = async (type, item, val) => {
  if (canInteract.value) {
    canInteract.value = false
    let numChange = 0
    switch (type) {
      case 'mins':
        if (item.skuNum + val > 0) {
          numChange = val
        }
        break
      case 'plus':
        numChange = val
        break
      case 'change':
        if (!isNaN(val)) {
          if (val >= 1) {
            numChange = parseInt(val) - item.skuNum
          }
        }
        break
    }
    try {
      await addToOrUpdateCart(item.skuId, numChange)
      await getCartList()
    } catch (error) {
      // console.log(error)
      alert(error)
    }
    canInteract.value = true
  }
}

async function deleteItem(item) {
  canInteract.value = false
  if (window.confirm(`确认删除【${item.skuName}】吗?`)) {
    try {
      await deleteCartItem(item.skuId)
      await getCartList()
    } catch (error) {
      alert(error)
    }
    canInteract.value = true
  }
}

async function checkItem(item, checked) {
  canInteract.value = false
  const isChecked = checked ? '1' : '0'
  try {
    await checkCartItem(item.skuId, isChecked)
    await getCartList()
  } catch (error) {
    alert(error)
  }
  canInteract.value = true
}

async function deleteCheckedItems() {
  canInteract.value = false
  if (window.confirm('确认删除选中的商品吗？')) {
    try {
      await deleteCheckedCartItems()
      await getCartList()
    } catch (error) {
      alert(error)
    }
    canInteract.value = true
  }
}

async function checkAllItems(event) {
  canInteract.value = false
  const isChecked = event.target.checked ? '1' : '0'
  try {
    await checkAllCartItems(isChecked)
    await getCartList()
  } catch (error) {
    alert(error)
  }
  canInteract.value = true
}

onBeforeRouteLeave((to, from) => to.path === '/trade' && totalNum.value < 1 ? false : true)
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 10%;
        }

        .cart-list-con2 {
          width: 40%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
