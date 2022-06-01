<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style>
:root {
  --el-card-padding: 8px;
}
#app {
  display: flex;
  height: 100vh;
}
</style>
