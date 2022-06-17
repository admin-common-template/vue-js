<script setup>
import { cloneDeep } from 'lodash'
import { editDialog, delDialog, blackDialog } from '@api/index'
import { ruleDialog } from '@validate/index'

const emit = defineEmits(['reSearch'])

const apiType = {
  edit: editDialog,
  del: delDialog,
  black: blackDialog,
}

const dialogAttr = {
  edit: {
    title: '编辑',
    width: '500px',
  },
  del: {
    title: '删除',
    width: '500px',
  },
  black: {
    title: '禁用',
    width: '500px',
  },
}

const ruleFormRef = ref(null)
const options = reactive({
  show: false,
  loading: false,
  type: '',
  formData: {},
})

const { formData } = toRefs(options)

// 开启弹框方法
const openDialog = (params) => {
  options.show = true
  options.type = params.type
  options.formData = cloneDeep(params.oldData)
}

// 执行提交
async function handleSubmit(sendData) {
  options.loading = true
  const { code, msg } = await apiType[options.type](sendData)
  options.loading = false
  if (code === 0) {
    ElMessage.success(msg)
    emit('reSearch')
    options.show = false
  } else {
    ElMessage.error(msg)
  }
}

// 表单校验提交
function checkSubmit() {
  let sendData
  switch (options.type) {
  case 'edit':
    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        handleSubmit(formData)
      }
    })
    break
  case 'del':
    sendData = {
      id: formData.value.id,
    }
    handleSubmit(sendData)
    break
  case 'black':
    sendData = {
      id: formData.value,
    }
    handleSubmit(sendData)
    break
  default:
    break
  }
}

function handleClose() {
  options.show = false
}

defineExpose({
  openDialog,
})
</script>

<template>
  <el-dialog custom-class="custom-modal" :model-value="options.show" v-bind="dialogAttr[options.type]" :close-on-click-modal="false" draggable :before-close="handleClose">
    <!-- 编辑 -->
    <el-form v-if="options.type === 'edit'" ref="ruleFormRef" :model="formData" :rules="ruleDialog">
      <el-form-item prop="name">
        <el-input v-model="formData.name" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
    </el-form>
    <!-- 删除 -->
    <div v-else-if="options.type === 'del'">是否确定删除？</div>
    <!-- 禁用 -->
    <div v-else-if="options.type === 'black'">是否禁用用户？</div>
    <template #footer>
      <el-button type="primary" :loading="options.loading" @click="checkSubmit">确定</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>
