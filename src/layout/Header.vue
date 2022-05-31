<script setup name="Header">
import Collapse from './components/Collapse.vue'
import Refresh from './components/Refresh.vue'
import Users from './components/Users.vue'
</script>

<template>
    <div class="flex items-center justify-between h-[50px] px-4">
        <div>
            <Collapse />
            <Refresh />
        </div>
        <div>
            <Users />
        </div>
    </div>
</template>
