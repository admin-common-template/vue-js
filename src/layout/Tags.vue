<script setup name="Tags">
import { useAppStore } from '@store/app'
import { useUserStore } from '@store/user'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

// 路由切换时的定时器，延时执行
let timer = null
// 滚动区域 ref
const scrollbarRef = ref(null)
// 标签盒子 ref
const tagBoxRef = ref(null)
// 子标签 ref
const tagRef = ref([])
// 最大滚动距离
const maxScroll = ref(0)
// 盒子移动距离
const tagBodyLeft = ref(0)

// 导航菜单标题
const routesName = computed(() => userStore.routesName)
// 顶部导航菜单标签列表
const tagNavList = computed(() => appStore.tagNavList.filter((item) => Reflect.has(routesName.value, item)))

appStore.setTagList(tagNavList.value)

// 路由切换时，设置激活标签的显示位置
function handleScroll() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    const index = tagNavList.value.indexOf(route.name)
    const dom = scrollbarRef.value
    const active = tagRef.value[index].$el
    // 计算滚动距离左侧的距离
    if (active.offsetLeft + active.offsetWidth > tagBodyLeft.value + dom.offsetWidth) {
      // 靠右侧
      tagBodyLeft.value = active.offsetLeft + active.offsetWidth - dom.offsetWidth
    } else if (active.offsetLeft < tagBodyLeft.value) {
      // 靠左侧
      tagBodyLeft.value = active.offsetLeft
    }
    clearTimeout(timer)
  }, 100)
}

// 滚动标签
function scrollTo(type) {
  if (maxScroll.value <= 0) return
  let value = tagBodyLeft.value + (type === 'left' ? -300 : 300)
  if (value < 0) value = 0
  else if (value > maxScroll.value) value = maxScroll.value
  tagBodyLeft.value = value
}

// 重置标签列表，标签列表不存在当前路由时添加到列表
function reSetTagList() {
  const { name } = route
  if (!tagNavList.value.includes(name)) {
    appStore.setTagList([...tagNavList.value, name])
  }
}

onMounted(() => {
  reSetTagList()
  handleScroll()
  // 屏幕尺寸变化时重新计算滚动距离
  window.addEventListener('resize', () => {
    handleScroll()
  })
})

// 监听路由变化
watch(() => route.name, (value) => {
  if (Reflect.has(routesName.value, value)) {
    reSetTagList()
    handleScroll()
  }
})

// 移除标签, 如果成功删除标签，则跳转临近页面
function removeTag(tag, index) {
  // 获取删除后剩下的列表
  const tagList = tagNavList.value.filter((item) => item !== tag)
  appStore.setTagList(tagList)
  if (route.name === tag) {
    // 当删除的是激活标签时获取下一个激活标签索引，默认往左查找，当索引为0时往右查找
    const nextIndex = index === 0 ? 0 : index - 1
    router.push({ name: tagList[nextIndex] })
  }
}

// 点击菜单选项
function command(e) {
  if (e === 'all') {
    appStore.setTagList([userStore.baseName])
    router.push('/')
  } else if (e === 'other') {
    appStore.setTagList([route.name])
  }
}

</script>

<template>
    <div class="flex items-center h-[40px] box-border select-none shadow-[0_0_3px_2px_rgba(100,100,100,0.1)_inset] bg-[#F0F0F0]">
        <div class="flex items-center h-[38px] mr-1 px-2 bg-white">
            <Iconify class="cursor-pointer" icon="akar-icons:chevron-left" @click="scrollTo('left')" />
        </div>
        <div ref="scrollbarRef" class="relative flex-1 h-[38px] overflow-hidden">
            <div class="absolute top-0 flex items-center flex-1 h-[38px] transition-all ease-in-out" ref="tagBoxRef" :style="{left: -tagBodyLeft + 'px'}">
                <el-tag :ref="el => tagRef[i] = el" v-for="(tag, i) in tagNavList" class="mx-[4px] cursor-pointer" :class="{'bg-white text-gray-600': route.name !== tag}" :closable="tagNavList.length > 1" :effect="route.name === tag ? 'dark' : 'plain'" :type="route.name === tag ? '' : 'info'" @click="router.push({name: tag})" @close="removeTag(tag, i)" :key="tag">{{ routesName[tag] }}</el-tag>
            </div>
        </div>
        <div class="flex items-center h-[38px] ml-1 px-2 bg-white">
            <Iconify class="cursor-pointer" icon="akar-icons:chevron-right" @click="scrollTo('right')" />
        </div>
        <el-dropdown trigger="click" placement="bottom-end" @command="command">
            <div class="flex items-center h-[38px] ml-px px-2 bg-white">
                <Iconify class="cursor-pointer" icon="carbon:close-outline" />
            </div>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="other">关闭其它</el-dropdown-item>
                <el-dropdown-item command="all">关闭所有</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
