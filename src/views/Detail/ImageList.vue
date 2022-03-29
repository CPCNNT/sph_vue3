<template>
  <div class="swiper" ref="swp">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in skuImageList" :key="item.id">
        <img
          :src="item.imgUrl"
          :class="{ active: currrentIndex === index }"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script setup>
import Swiper, { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { nextTick, ref, watch } from 'vue'
import { useDetailInfoStore } from '../../stores/detail.js'
import { storeToRefs } from 'pinia'

const swp = ref()
const { skuImageList } = storeToRefs(useDetailInfoStore())
const emit = defineEmits(['changeCurrentImgIndex'])

watch(
  skuImageList,
  (newValue, oldValue) => {
    nextTick(() => {
      // console.log(newValue, oldValue)
      new Swiper(swp.value, {
        modules: [Navigation],
        slidesPerView: 3,
        slidesPerGroup: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
    })
  }
)

const currrentIndex = ref(0)

function changeCurrentIndex(index) {
  currrentIndex.value = index
  emit('changeCurrentImgIndex', index)
}
</script>

<style lang="less" scoped>
.swiper {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
