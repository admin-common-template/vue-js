<script setup name="echarts">
import Page1 from './Page1.vue'
import Page2 from './Page2.vue'

const tabOption = reactive({
  cache: true,
  tabs: [
    { label: '页面一', name: 'page-page1', page: markRaw(Page1) },
    { label: '页面二', name: 'page-page2', page: markRaw(Page2) },
  ],
})
</script>

<template>
  <Tabs v-bind="tabOption" />
</template>
