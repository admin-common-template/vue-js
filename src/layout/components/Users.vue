<script setup name="Users">
import { useUserStore } from '@store/user'
import { userLogout } from '@api/index'

const router = useRouter()
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

// 退出登录
function logout() {
  userLogout().then(() => {
    userStore.$patch({
      userInfo: {},
      menuList: [],
      buttonList: [],
      routesName: {},
    })
    router.push({ name: 'login' })
  })
}
</script>

<template>
  <el-dropdown trigger="click">
    <div class="flex items-center ml-4 cursor-pointer">
      {{ userInfo.nick_name }}
      <Iconify class="text-[12px] ml-1" icon="ant-design:caret-down-filled" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
