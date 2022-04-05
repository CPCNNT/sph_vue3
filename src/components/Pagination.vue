<template>
  <div class="pagination">
    <button
      :disabled="pageNo === 1"
      @click="emit('searchAfterSettingPageNo', pageNo - 1)"
    >上一页</button>
    <button
      v-show="startNumAndEndNum.start > 1"
      @click="emit('searchAfterSettingPageNo', 1)"
    >1</button>
    <button v-show="startNumAndEndNum.start > 2" disabled>···</button>

    <button
      v-for="(pageNum, index) in pageNumList"
      :key="index"
      :class="{ active: pageNum === pageNo }"
      @click="emit('searchAfterSettingPageNo', pageNum)"
    >{{ pageNum }}</button>

    <button v-show="startNumAndEndNum.end < totalPages - 1" disabled>···</button>
    <button
      v-show="startNumAndEndNum.end < totalPages"
      @click="emit('searchAfterSettingPageNo', totalPages)"
    >{{ totalPages }}</button>
    <button
      :disabled="pageNo === totalPages"
      @click="emit('searchAfterSettingPageNo', pageNo + 1)"
    >下一页</button>

    <span style="margin-left: 30px">共 {{ total }} 条</span>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps(['pageNo', 'pageSize', 'total', 'totalPages', 'pagesNoShown'])
const { pageNo, pageSize, total, totalPages, pagesNoShown } = toRefs(props)
const emit = defineEmits(['searchAfterSettingPageNo'])

const startNumAndEndNum = computed(() => {
  let start = 0, end = 0
  if (totalPages.value < pagesNoShown.value) {
    start = 1
    end = totalPages.value
  } else {
    start = pageNo.value - parseInt(pagesNoShown.value / 2)
    end = pageNo.value + parseInt(pagesNoShown.value / 2)
    if (start < 1) {
      start = 1
      end = pagesNoShown.value
    }
    if (end > totalPages.value) {
      end = totalPages.value
      start = totalPages.value - pagesNoShown.value + 1
    }
  }
  return { start, end }
})

const pageNumList = computed(() => {
  let numList = []
  for (let i = startNumAndEndNum.value.start; i <= startNumAndEndNum.value.end; i++) {
    numList.push(i)
  }
  return numList
})
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }

  span {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 0;
  }
}
</style>
