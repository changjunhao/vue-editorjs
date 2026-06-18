<template>
  <div class="vue-editorjs">
    <div :id="holderId"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import EditorJS from '@editorjs/editorjs'
import type { EditorConfig } from '@editorjs/editorjs/types/configs/editor-config'
import type { OutputData } from '@editorjs/editorjs'
import type { ToolConstructable, ToolSettings } from '@editorjs/editorjs/types/tools'

defineOptions({ name: 'vue-editorjs' })

const props = defineProps<{
  /** 完整的 EditorJS 配置（推荐方式） */
  config?: EditorConfig
  /** 初始数据（快捷用法） */
  data?: OutputData
  /** 编辑器工具（快捷用法） */
  tools?: Record<string, ToolConstructable | ToolSettings>
  /** 占位符（快捷用法） */
  placeholder?: string | false
  /** 只读模式（快捷用法） */
  readOnly?: boolean
  /** 最小高度（快捷用法） */
  minHeight?: number
}>()

const emit = defineEmits<{
  ready: []
  change: [data: OutputData]
  save: [data: OutputData]
}>()

let editor: EditorJS | null = null
const holderId = `editorjs-${Math.random().toString(36).slice(2, 9)}`

const getEditorConfig = (): EditorConfig => {
  if (props.config) {
    return { ...props.config, holder: props.config.holder || holderId }
  }
  return {
    holder: holderId,
    ...(props.data !== undefined && { data: props.data }),
    ...(props.tools !== undefined && { tools: props.tools }),
    ...(props.placeholder !== undefined && { placeholder: props.placeholder }),
    ...(props.readOnly !== undefined && { readOnly: props.readOnly }),
    ...(props.minHeight !== undefined && { minHeight: props.minHeight }),
  }
}

const initEditor = () => {
  editor = new EditorJS({
    ...getEditorConfig(),
    onReady: () => emit('ready'),
    onChange: async () => {
      const data = await editor?.save()
      if (data) emit('change', data)
    },
  })
}

onMounted(() => initEditor())

onBeforeUnmount(() => {
  editor?.destroy()
  editor = null
})

const save = async () => {
  const data = await editor?.save()
  if (data) emit('save', data)
  return data
}

const render = (data: OutputData) => {
  editor?.isReady.then(() => editor?.render(data))
}

defineExpose({ save, render })
</script>
