<script setup name="icon">
import { domHeight } from '@/common/config'

const boxRef = ref(null)
const height = ref(0)

onMounted(() => {
  height.value = domHeight.pageHeight - domHeight.cardPadding - boxRef.value.offsetHeight
})
</script>

<template>
  <div ref="boxRef" class="pb-4">
    <div>图标插件：iconify   网址：<a class="text-blue-700" href="https://icon-sets.iconify.design" target="_blank">https://icon-sets.iconify.design</a></div>
    <div>基础图标 {{`<Iconify icon="fa-solid:user" />`}} <Iconify icon="fa-solid:user" /></div>
    <p>在线搜索图标：</p>
  </div>
  <iframe src="https://icon-sets.iconify.design" class="w-full border border-solid border-gray-400" :style="{height: height+'px'}"></iframe>
</template>
