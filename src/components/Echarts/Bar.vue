<script setup name="EchartsBar">
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
  const { title = '', xTitle = '', yTitle = '', legend, xData, yData, cover = {} } = props.detail
  if (!xData || !yData) return
  // 默认大于8条数据时开启缩放功能
  const showZoomTool = Reflect.has(props.detail, 'showZoomTool') ? props.detail.showZoomTool : xData.length > 8
  const series = yData.map((item, i) => ({
    name: legend?.[i] || '',
    type: 'bar',
    data: item,
    stack: 'total',
    barMaxWidth: '80',
  }))
  const option = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: legend,
      type: 'scroll',
    },
    grid: {
      left: 40,
      right: 60,
      bottom: 10,
      containLabel: true,
    },
    toolbox: {
      show: showZoomTool,
      top: 20,
      feature: {
        saveAsImage: {},
        dataZoom: {
          realtime: false,
          yAxisIndex: 'none',
        },
        restore: {},
      },
    },
    dataZoom: showZoomTool ? [
      { type: 'inside' }, // 用于添加滚轮缩放
      { type: 'slider' }, // 用于添加滑动条缩放，
    ] : [],
    xAxis: {
      type: 'category',
      name: xTitle,
      data: xData,
    },
    yAxis: {
      name: yTitle,
      type: 'value',
    },
    series,
  }
  let myChart = echarts.getInstanceByDom(DomRef.value)
  if (!myChart) {
    myChart = echarts.init(DomRef.value)
    ChartDom.value = myChart
  }
  myChart.setOption({ ...option, ...cover }, true)
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
