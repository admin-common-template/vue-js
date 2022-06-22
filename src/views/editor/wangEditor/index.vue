<script setup name="wangEditor">
import WangEditor from '@/components/Editor/wangEditor.vue'

const form = reactive({
  content: '',
})

function showResult() {
  console.log(form.content)
}
</script>

<template>
  <el-card class="h-full">
    <WangEditor v-model="form.content" @update:modelValue="form.content= $event" />
    <el-button class="mt-2" @click="showResult">控制台打印结果</el-button>
  </el-card>
</template>

<style lang="scss" scoped>

</style>
