<template>
  <template v-for="item of menuList">
    <!-- 判断有无子组件，有的为submenu，且需要继续调用本组件 -->
    <el-sub-menu v-if="item.children" :index="item.name" :key="item.name">
      <template #title>
        <Iconify v-if="item.meta.icon" :icon="item.meta.icon" />
        <span>{{item.meta.title}}</span>
      </template>
      <!-- 调用子组件，传入需要递归的数据 -->
      <MenuItemVue :menu-list="item.children" />
    </el-sub-menu>
    <!-- 没有子组件，直接渲染最后一级菜单 -->
    <el-menu-item v-else :index="item.name" :key="item.name+'else'">
      <Iconify v-if="item.meta.icon" :icon="item.meta.icon" />
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup name="MenuItemVue">
defineProps({
  menuList: Array,
})
</script>

<style lang="scss" scoped>
</style>
