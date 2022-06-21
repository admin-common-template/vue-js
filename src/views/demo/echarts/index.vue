<script setup name="echarts">
import Line from './Line.vue'
import Bar from './Bar.vue'
import Pie from './Pie.vue'

const tabOption = reactive({
  cache: true,
  tabs: [
    { label: '折线图', name: 'page-line', page: markRaw(Line) },
    { label: '柱状图', name: 'page-bar', page: markRaw(Bar) },
    { label: '饼图', name: 'page-pie', page: markRaw(Pie) },
  ],
})
</script>

<template>
  <Tabs v-bind="tabOption" />
</template>
