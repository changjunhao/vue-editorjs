<template>
  <div class="demo">
    <h1>Vue EditorJS Demo</h1>

    <!-- 推荐用法：通过 config 传入完整配置 -->
    <vue-editorjs
      ref="editorRef"
      :config="editorConfig"
      @ready="onReady"
      @change="onChange"
      @save="onSave"
    />

    <button @click="handleSave">Save</button>
    <pre v-if="savedData">{{ JSON.stringify(savedData, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, readonly } from 'vue'
import type { EditorConfig, OutputData } from '@editorjs/editorjs'
import type { Editor } from '../src'

// --- Editor.js 工具（全部由外部配置） ---
import Header from '@editorjs/header'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import Embed from '@editorjs/embed'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import Code from '@editorjs/code'
import Link from '@editorjs/link'
import Delimiter from '@editorjs/delimiter'
import Raw from '@editorjs/raw'
import Table from '@editorjs/table'
import Warning from '@editorjs/warning'
import Paragraph from '@editorjs/paragraph'
import Checklist from '@editorjs/checklist'

// --- 初始数据 ---
const initData: OutputData = {
  time: 1558356864490,
  blocks: [
    { type: 'paragraph', data: { text: 'First text' } },
    { type: 'paragraph', data: { text: 'Second text' } },
  ],
  version: '2.13',
}

// --- 完整 EditorJS 配置（推荐方式） ---
const editorConfig = readonly<EditorConfig>({
  data: initData,
  tools: {
    header: {
      class: Header,
      config: { placeholder: 'Enter a header' },
    },
    list: List,
    code: Code,
    inlineCode: InlineCode,
    embed: Embed,
    link: Link,
    marker: Marker,
    table: Table,
    raw: Raw,
    delimiter: Delimiter,
    quote: Quote,
    image: {
      class: ImageTool,
      config: {
        uploader: {
          uploadByFile(file: File): Promise<{ success: number; file: { url: string } }> {
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onload = () => {
                resolve({
                  success: 1,
                  file: { url: reader.result as string },
                })
              }
              reader.readAsDataURL(file)
            })
          },
        },
      },
    },
    warning: Warning,
    paragraph: Paragraph,
    checklist: Checklist,
  },
})

// --- 通过 template ref 调用暴露的方法 ---
const editorRef = ref<InstanceType<typeof Editor>>()
const savedData = ref<OutputData | null>(null)

const onReady = () => {
  console.log('Editor is ready')
}

const onChange = (data: OutputData) => {
  console.log('Content changed', data)
}

const onSave = (data: OutputData) => {
  savedData.value = data
}

const handleSave = () => {
  editorRef.value?.save()
}
</script>

<style scoped>
.demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

button {
  padding: 8px 16px;
  margin: 12px 0;
  cursor: pointer;
}

pre {
  background: #f4f4f4;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
