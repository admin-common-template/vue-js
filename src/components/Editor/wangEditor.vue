<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [String],
  height: {
    type: String,
    default: '300px',
  },
})

const borderStyle = '1px solid #ccc'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = ref('default')
const valueHtml = ref(props.modelValue)

const toolbarConfig = {
  excludeKeys: [
    'fullScreen',
    'group-video',
    'lineHeight',
    'todo',
    'blockquote',
  ],
}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      base64LimitSize: Infinity, // base64 格式上传图片
    },
  },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

watch(() => valueHtml.value, (value) => {
  emit('update:modelValue', value)
})
</script>

<template>
  <div :style="{border: borderStyle}">
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" :style="{borderBottom: borderStyle}" />
    <Editor class="overflow-hidden" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" :style="{height: props.height}" />
  </div>
</template>
