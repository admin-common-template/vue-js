<script setup name="EchartsPie">
import * as echarts from 'echarts'
import { eventOn, eventOff } from '@/common/tools'

const props = defineProps({
  detail: {
    type: Object,
    default: () => ({}),
  },
})
const DomRef = ref(null)
const ChartDom = ref(null)

function resize() {
  if (ChartDom.value) ChartDom.value.resize()
}

function createCharts() {
  // 绘制图表时先清除事件监听
  eventOff('resize', resize)
  const { data, hideTitle = false } = props.detail
  const legend = data.map((item) => item.name)
  const option = {
    title: {
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)',
    },
    label: {
      formatter: '{b}: {c} ({d}%)',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        data,
        avoidLabelOverlap: false,
      },
    ],
  }
  if (!hideTitle) {
    option.legend = {
      left: 'center',
      data: legend,
    }
  }
  let myChart = echarts.getInstanceByDom(DomRef.value)
  if (!myChart) {
    myChart = echarts.init(DomRef.value)
    ChartDom.value = myChart
  }
  myChart.setOption(option, true)
  eventOn('resize', resize)
}

onMounted(() => {
  createCharts()
})

onUnmounted(() => {
  eventOff('resize', resize)
})

watch(
  () => props.detail,
  () => createCharts(),
  { deep: true },
)
</script>

<template>
  <div ref="DomRef" style="width: 100%;height: 400px"></div>
</template>
