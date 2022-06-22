<script setup name="Tabs">

const props = defineProps({
  // 指定激活tab页name
  modelValue: {
    type: String,
    default: '',
  },
  // 是否开启缓存
  cache: {
    type: Boolean,
    default: false,
  },
  // tab页列表
  tabs: {
    type: Array,
    default: () => ([]),
  },
  // 挂载到tabPane上的属性
  tabPane: {
    type: Object,
    default: () => ({}),
  },
})

// 声明tab页激活name及缓存列表
const tabInfo = reactive({
  activeName: ref(props.modelValue || props.tabs[0]?.name || ''),
  activeList: [],
})
// 把初始激活name添加到缓存列表
if (tabInfo.activeName) {
  tabInfo.activeList.push(tabInfo.activeName)
}

function tabChange(name) {
  tabInfo.activeName = name
  // 如果开启缓存则添加name，否则替换
  if (props.cache) {
    if (!tabInfo.activeList.includes(name)) tabInfo.activeList.push(name)
  } else {
    tabInfo.activeList[0] = name
  }
}
</script>

<template>
  <el-tabs class="h-full rounded shadow" type="border-card" :model-value="tabInfo.activeName" @tab-change="tabChange">
    <el-tab-pane v-for="(item, i) in props.tabs" :key="i" :label="item.label" :name="item.name" lazy>
      <component :is="item.page" v-if="tabInfo.activeList.includes(item.name)" v-bind="props.tabPane"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
    .h-full {
        // tabPane内容设置最大高度，内容溢出滚动显示
        ::v-deep .el-tabs__content {
          height: calc(100% - 40px);
          overflow: auto;
        }
    }
</style>
