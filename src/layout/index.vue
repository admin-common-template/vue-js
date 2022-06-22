<script setup name="layout">
import { useUserStore } from '@store/user'
import { layout } from '@/common/config'
import { useAppStore } from '@store/app'
import { cacheList } from '@/router/children'
import Aside from './Aside.vue'
import Header from './Header.vue'
import Tags from './Tags.vue'

const appStore = useAppStore()
const userStore = useUserStore()

const isRouterAlive = ref(true)

// 局部组件刷新
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)

const isCollapse = computed(() => appStore.isCollapse)

onBeforeMount(() => {
  userStore.getUserMenu()
})
</script>

<template>
  <el-container>
    <el-aside :width="isCollapse ? layout.collapseOn : layout.collapseOff">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
        <Tags />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive :include="cacheList">
              <component :is="Component" :key="route.name"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-aside {
  @include hideScroll(y);
}

.el-header {
  @apply box-border px-0 bg-white;
  height: v-bind("layout.headerHeight");
}

.el-main {
  @apply p-1.5;
  background-color: v-bind("layout.bg");
}
</style>
