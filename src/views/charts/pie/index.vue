<script setup>
import Pie from '@/components/Echarts/Pie.vue'

const detail = reactive({
  hideTitle: false,
  data: [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ],
  showZoomTool: true,
  openSmooth: true,
})

// 重置数据
function resetData() {
  detail.data[0].value = ~~(Math.random() * 1000)
}
</script>

<template>
  <el-card class="h-full">
    <el-button class="mb-8" @click="resetData">重置数据</el-button>
    <Pie :detail="detail" />
  </el-card>
</template>
