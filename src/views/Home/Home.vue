<template>
  <TypeNav />
  <ListContainer />
  <TodayRecommend />
  <Rank />
  <Like />
  <Floor v-for="item in floors" :key="item.id" :floor="item" />
  <Brand />
</template>

<script setup>
import TypeNav from '../../components/TypeNav.vue'
import ListContainer from './ListContainer/ListContainer.vue'
import TodayRecommend from './TodayRecommend/TodayRecommend.vue'
import Rank from './Rank/Rank.vue'
import Like from './Like/Like.vue'
import Floor from './Floor.vue'
import Brand from './Brand/Brand.vue'
import { useBannersStore, useFloorsStore } from '../../stores/home.js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const { getBanners } = useBannersStore()
const { getFloors } = useFloorsStore()
const { floors } = storeToRefs(useFloorsStore())

onMounted(async () => {
  await getBanners()
  await getFloors()
})
</script>
