<script setup>
import Line from '@/components/Echarts/Line.vue'

const detail = reactive({
  xTitle: '日期',
  yTitle: '数量',
  legend: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  yData: [
    [120, 432, 101, 134, 90, 230, 210],
    [220, 182, 191, 234, 290, 330, 310],
    [150, 232, 201, 154, 190, 330, 410],
    [320, 332, 301, 334, 390, 330, 320],
    [820, 932, 901, 934, 1290, 1330, 1320],
  ],
  showZoomTool: true,
  openSmooth: true,
})

// 重置数据
function resetData() {
  detail.yData[0][0] = ~~(Math.random() * 1000)
}
</script>

<template>
  <el-card class="h-full">
    <el-button class="mb-8" @click="resetData">重置数据</el-button>
    <Line :detail="detail" />
  </el-card>
</template>
