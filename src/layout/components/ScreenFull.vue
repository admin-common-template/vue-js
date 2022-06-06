<script setup name="ScreenFull">
import screenfull from 'screenfull'

const isFullScreen = ref(screenfull.isFullscreen)

// 监听全屏变化
screenfull.on('change', () => {
  isFullScreen.value = screenfull.isFullscreen
})

// 切换全屏状态
function toggleScreen() {
  screenfull.toggle()
}
</script>

<template>
  <Iconify class="cursor-pointer" :icon="isFullScreen ? 'gridicons:fullscreen-exit' : 'gridicons:fullscreen'" @click="toggleScreen" />
</template>
