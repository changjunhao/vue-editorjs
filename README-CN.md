# @junhao/vue-editorjs

[![npm version](https://img.shields.io/npm/v/@junhao/vue-editorjs.svg)](https://www.npmjs.com/package/@junhao/vue-editorjs)
[![npm downloads](https://img.shields.io/npm/dm/@junhao/vue-editorjs.svg)](https://www.npmjs.com/package/@junhao/vue-editorjs)
[![license](https://img.shields.io/npm/l/@junhao/vue-editorjs.svg)](https://www.npmjs.com/package/@junhao/vue-editorjs)

[English](./README.md) | **中文**

一个轻量级的 Vue 3 [Editor.js](https://editorjs.io/) 封装组件。

## 特性

- 基于 Vue 3 Composition API (`<script setup>`)
- TypeScript 支持，包含类型声明
- ESM / CJS / UMD 多格式产物输出
- 完整透传 EditorJS 配置项
- 通过 template ref 暴露 `save()` 和 `render()` 方法
- 自动生命周期管理（挂载时初始化，卸载时销毁）

## 安装

```bash
npm install @junhao/vue-editorjs
```

按需安装所需的 Editor.js 工具插件（均为可选）：

```bash
npm install @editorjs/header @editorjs/list @editorjs/image
# ...其他 @editorjs/* 工具
```

## 快速开始

### 作为插件使用（全局注册）

```ts
import { createApp } from 'vue'
import Editor from '@junhao/vue-editorjs'
import App from './App.vue'

createApp(App).use(Editor).mount('#app')
```

注册后可在任意组件中使用 `<vue-editorjs>`。

### 作为局部组件使用

```vue
<script setup>
import { Editor } from '@junhao/vue-editorjs'
</script>

<template>
  <Editor :config="editorConfig" @ready="onReady" />
</template>
```

## 使用方式

### 推荐方式：通过 `config` 传入完整配置

传入完整的 `EditorConfig` 对象，支持 Editor.js 的所有选项和工具：

```vue
<script setup>
import { readonly } from 'vue'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'

const editorConfig = readonly({
  data: { blocks: [{ type: 'paragraph', data: { text: '你好！' } }] },
  tools: {
    header: { class: Header, config: { placeholder: '请输入标题' } },
    list: List,
    image: {
      class: ImageTool,
      config: {
        endpoints: { byFile: 'http://localhost:8008/uploadFile' },
      },
    },
  },
})
</script>

<template>
  <vue-editorjs :config="editorConfig" @ready="onReady" @change="onChange" />
</template>
```

### 快捷 Props

对于简单场景，可以直接使用独立的 props，无需构造完整的 config 对象：

```vue
<vue-editorjs
  :data="initData"
  :tools="tools"
  :placeholder="'开始写作...'"
  :read-only="false"
  :min-height="300"
  @save="onSave"
/>
```

> 当同时提供 `config` 和独立 props 时，`config` 优先级更高。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `config` | `EditorConfig` | — | 完整的 EditorJS 配置（推荐） |
| `data` | `OutputData` | — | 编辑器初始数据 |
| `tools` | `Record<string, ToolConstructable \| ToolSettings>` | — | 编辑器工具 |
| `placeholder` | `string \| false` | — | 首个区块的占位文本 |
| `readOnly` | `boolean` | — | 是否启用只读模式 |
| `minHeight` | `number` | — | 编辑器最小高度 |

> 如需使用高级选项（i18n、sanitizer、inlineToolbar、tunes 等），请通过 `config` prop 传入。

## 事件 (Events)

| 事件 | 参数 | 说明 |
|---|---|---|
| `ready` | — | 编辑器准备就绪 |
| `change` | `OutputData` | 内容发生变更 |
| `save` | `OutputData` | 调用 `save()` 方法时触发 |

## 暴露的方法 (Exposed Methods)

通过 template ref 访问：

```vue
<script setup>
import { ref } from 'vue'
import type { Editor } from '@junhao/vue-editorjs'

const editorRef = ref<InstanceType<typeof Editor>>()

const handleSave = () => {
  editorRef.value?.save()
}
</script>

<template>
  <vue-editorjs ref="editorRef" :config="config" @save="onSave" />
  <button @click="handleSave">保存</button>
</template>
```

| 方法 | 返回值 | 说明 |
|---|---|---|
| `save()` | `Promise<OutputData>` | 保存编辑器数据并触发 `save` 事件 |
| `render(data)` | `void` | 将数据渲染到编辑器中 |

## 可用工具插件（可选 peerDependencies）

按需安装所需工具：

| 包名 | 说明 |
|---|---|
| `@editorjs/header` | 标题块 |
| `@editorjs/list` | 有序/无序列表 |
| `@editorjs/nested-list` | 嵌套列表 |
| `@editorjs/image` | 图片（需后端支持） |
| `@editorjs/simple-image` | 简单图片（无需后端） |
| `@editorjs/checklist` | 清单 |
| `@editorjs/quote` | 引用块 |
| `@editorjs/code` | 代码块 |
| `@editorjs/inline-code` | 行内代码 |
| `@editorjs/delimiter` | 分隔线 |
| `@editorjs/embed` | 嵌入（YouTube 等） |
| `@editorjs/link` | 链接工具 |
| `@editorjs/link-autocomplete` | 链接自动补全 |
| `@editorjs/table` | 表格 |
| `@editorjs/marker` | 标记高亮 |
| `@editorjs/warning` | 警告块 |
| `@editorjs/raw` | 原始 HTML |
| `@editorjs/paragraph` | 段落（内置） |
| `@editorjs/personality` | 人物卡片 |
| `@editorjs/attaches` | 文件附件 |
| `@editorjs/underline` | 下划线（行内工具） |

## 许可证

MIT
