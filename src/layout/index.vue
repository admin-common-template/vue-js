<script setup name="Base">
import { useUserStore } from '@store/user'
import { layout } from '@/common/config'
import Aside from './Aside.vue'
import Header from './Header.vue'
import Tags from './Tags.vue'

const userStore = useUserStore()

const isRouterAlive = ref(true)
const cacheList = ref([])

onBeforeMount(() => {
  userStore.getUserMenu()
})
</script>

<template>
  <el-container>
    <el-aside :width="layout.collapseOff">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
        <Tags />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive :include="cacheList">
            <component v-if="isRouterAlive" :is="Component" />
          </keep-alive>
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
  @apply p-2.5;
  background-color: v-bind("layout.bg");
}
</style>
