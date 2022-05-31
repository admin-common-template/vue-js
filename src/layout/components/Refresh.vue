<script setup>
const refresh = inject('reload')
</script>

<template>
    <Iconify class="mx-2 text-[20px] cursor-pointer" icon="ic:outline-refresh" @click="refresh" />
</template>
