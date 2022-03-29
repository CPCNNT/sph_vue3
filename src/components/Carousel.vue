<template>
  <!-- :loop="true" -->
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    :autoplay="{ disableOnInteraction: false, pauseOnMouseEnter: true }"
  >
    <swiper-slide v-for="item in props.carouselList" :key="item.id">
      <img :src="item.imgUrl" alt />
    </swiper-slide>
  </swiper>
</template>

<script setup>
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [Navigation, Pagination, Autoplay]

const props = defineProps(['carouselList'])
</script>
