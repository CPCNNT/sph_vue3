<template>
  <div class="spec-preview">
    <img :src="props.imgUrl" />
    <div class="event" @mousemove="handleMove"></div>
    <div class="big">
      <img :src="props.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import throttle from 'lodash/throttle.js'

const props = defineProps({
  imgUrl: {
    type: String,
    default: ''
  }
})

const mask = ref()
const big = ref()

const handleMove = throttle( // 高频调用
  event => {
    if (mask.value && big.value) {
      let left = event.offsetX - mask.value.offsetWidth / 2
      let top = event.offsetY - mask.value.offsetHeight / 2
      // 约束范围
      if (left <= 0) {
        left = 0
      } else if (left >= mask.value.offsetWidth) {
        left = mask.value.offsetWidth
      }
      if (top <= 0) {
        top = 0
      } else if (top >= mask.value.offsetHeight) {
        top = mask.value.offsetHeight
      }
      // 修改元素的 left | top 属性值
      mask.value.style.left = left + 'px'
      mask.value.style.top = top + 'px'
      big.value.style.left = - 2 * left + 'px'
      big.value.style.top = - 2 * top + 'px'
    }
  },
  50
)
</script>

<style lang="less" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
