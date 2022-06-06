<script setup name="Collapse">
import { useAppStore } from '@store/app'

const appStore = useAppStore()
const isCollapse = computed(() => appStore.isCollapse)

// 改变导航菜单折叠状态
function changeCollapse() {
  appStore.setCollapse(!isCollapse.value)
}
</script>

<template>
  <Iconify class="cursor-pointer" :icon="isCollapse ? 'ep:expand' : 'ep:fold'" @click="changeCollapse" />
</template>
