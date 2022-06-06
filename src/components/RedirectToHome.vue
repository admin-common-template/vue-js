<script setup>
import { useUserStore } from '@store/user'

const router = useRouter()
const userStore = useUserStore()

const count = ref(0)

// 获取首页路由名并跳转
function toBaseRoute() {
  count.value += 1
  if (userStore.baseName) {
    router.push({ name: userStore.baseName })
  } else {
    setTimeout(() => {
      if (count.value <= 5) toBaseRoute()
    }, 100)
  }
}

onMounted(() => {
  toBaseRoute()
})
</script>

<template>
  <div class="w-full h-full" v-loading="true"></div>
</template>
