<template>
    <div class="w-full h-full" v-loading="true"></div>
</template>

<script setup name="Refresh">
import { useUserStore } from '@store/user'
import { childInfo } from '@/router/children'

const router = useRouter()
const userStore = useUserStore()

function getChildName(menuList) {
  if (menuList.children) {
    return getChildName(menuList.children[0])
  }
  return menuList.name
}

function handleNext() {
  setTimeout(() => {
    const { menuList } = userStore
    const name = getChildName(menuList?.[0] || {})
    if (name) {
      router.push({ name: childInfo[name] ? name : 'notFund' })
    } else {
      handleNext()
    }
  }, 100)
}

handleNext()
</script>
