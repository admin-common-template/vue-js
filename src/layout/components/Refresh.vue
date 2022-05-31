<script setup>
const refresh = inject('reload')
</script>

<template>
    <Iconify class="ml-4 mr-2 text-[20px] cursor-pointer" icon="ic:outline-refresh" @click="refresh" />
</template>
