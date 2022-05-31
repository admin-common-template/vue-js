<script setup name="Aside">
import { useAppStore } from '@store/app'
import { useUserStore } from '@store/user'
import config from '@/common/config'
import { childInfo } from '@/router/children'
import MenuItemVue from './components/MenuItemVue.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const menuList = computed(() => userStore.menuList)
// 是否收起
const isCollapse = computed(() => appStore.isCollapse)
// 当前激活路由name
const data = reactive({
  active: route.name || userStore.baseName,
})

watch(() => route.name, (name) => {
  if (name !== 'Login') data.active = name
})
// 路由跳转激活
const handleSelect = (e) => {
  if (childInfo[e]) {
    data.active = e
    router.push({ name: e })
  } else {
    data.active = ''
    router.push({ name: 'notFund' })
  }
}
</script>

<template>
  <el-menu class="min-h-full border-none menu" :default-active="data.active" :collapse-transition="false" unique-opened :collapse="isCollapse" @select="handleSelect" background-color="#03152A" text-color="#B3B7BA" active-text-color="#FFFFFF">
    <div v-if="!isCollapse" class="flex items-center justify-center text-[#B3B7BA] h-[50px]">{{ config.title }}</div>
    <MenuItemVue :menu-list="menuList" />
  </el-menu>
</template>
