<template>
    <div class="w-full h-full" v-loading="true"></div>
</template>

<script setup name="Refresh">
import { useUserStore } from '@store/user'

const router = useRouter()
const userStore = useUserStore()

router.push({ name: userStore.baseName })
</script>
