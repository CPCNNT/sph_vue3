<template>
  <Header />
  <router-view></router-view>
  <Footer v-show="!$route.meta.isHideFooter" />
</template>

<script setup>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
import { useBaseCategoryListStore } from "./stores/home.js"
import { onMounted } from 'vue'

const { getBaseCategoryList } = useBaseCategoryListStore()

onMounted(async () => {
  await getBaseCategoryList()
})
</script>
