# @junhao/vue-editorjs

[![npm version](https://img.shields.io/npm/v/@junhao/vue-editorjs.svg)](https://www.npmjs.com/package/@junhao/vue-editorjs)
[![npm downloads](https://img.shields.io/npm/dm/@junhao/vue-editorjs.svg)](https://www.npmjs.com/package/@junhao/vue-editorjs)
[![license](https://img.shields.io/npm/l/@junhao/vue-editorjs.svg)](https://www.npmjs.com/package/@junhao/vue-editorjs)

**English** | [中文](./README-CN.md)

A lightweight [Editor.js](https://editorjs.io/) wrapper component for Vue 3.

## Features

- Vue 3 Composition API (`<script setup>`)
- TypeScript support with type declarations
- ESM / CJS / UMD multi-format output
- Full EditorJS config pass-through
- Exposed `save()` and `render()` methods via template ref
- Automatic lifecycle management (init on mount, destroy on unmount)

## Installation

```bash
npm install @junhao/vue-editorjs
```

Install the Editor.js tools you need (all optional):

```bash
npm install @editorjs/header @editorjs/list @editorjs/image
# ...any other @editorjs/* tools
```

## Quick Start

### As a plugin (global registration)

```ts
import { createApp } from 'vue'
import Editor from '@junhao/vue-editorjs'
import App from './App.vue'

createApp(App).use(Editor).mount('#app')
```

Then use `<vue-editorjs>` in any component.

### As a local component

```vue
<script setup>
import { Editor } from '@junhao/vue-editorjs'
</script>

<template>
  <Editor :config="editorConfig" @ready="onReady" />
</template>
```

## Usage

### Recommended: `config` prop

Pass a complete `EditorConfig` object — all Editor.js options and tools are supported:

```vue
<script setup>
import { ref, readonly } from 'vue'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'

const editorConfig = readonly({
  data: { blocks: [{ type: 'paragraph', data: { text: 'Hello!' } }] },
  tools: {
    header: { class: Header, config: { placeholder: 'Enter a header' } },
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

### Shortcut props

For simple cases, use individual props instead of a full config object:

```vue
<vue-editorjs
  :data="initData"
  :tools="tools"
  :placeholder="'Start writing...'"
  :read-only="false"
  :min-height="300"
  @save="onSave"
/>
```

> `config` takes priority over individual props when both are provided.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `config` | `EditorConfig` | — | Complete EditorJS config (recommended) |
| `data` | `OutputData` | — | Initial editor data |
| `tools` | `Record<string, ToolConstructable \| ToolSettings>` | — | Editor tools |
| `placeholder` | `string \| false` | — | First block placeholder |
| `readOnly` | `boolean` | — | Enable read-only mode |
| `minHeight` | `number` | — | Minimum editor height |

> For advanced options (i18n, sanitizer, inlineToolbar, tunes, etc.), use the `config` prop.

## Events

| Event | Payload | Description |
|---|---|---|
| `ready` | — | Editor is ready |
| `change` | `OutputData` | Content changed |
| `save` | `OutputData` | `save()` method called |

## Exposed Methods

Access via template ref:

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
  <button @click="handleSave">Save</button>
</template>
```

| Method | Returns | Description |
|---|---|---|
| `save()` | `Promise<OutputData>` | Save editor data and emit `save` event |
| `render(data)` | `void` | Render data into the editor |

## Available Tools (optional peerDependencies)

Install only the tools you need:

| Package | Description |
|---|---|
| `@editorjs/header` | Header block |
| `@editorjs/list` | Ordered/unordered list |
| `@editorjs/nested-list` | Nested list |
| `@editorjs/image` | Image (with backend) |
| `@editorjs/simple-image` | Image (no backend required) |
| `@editorjs/checklist` | Checklist |
| `@editorjs/quote` | Quote block |
| `@editorjs/code` | Code block |
| `@editorjs/inline-code` | Inline code |
| `@editorjs/delimiter` | Delimiter |
| `@editorjs/embed` | Embed (YouTube, etc.) |
| `@editorjs/link` | Link tool |
| `@editorjs/link-autocomplete` | Link autocomplete |
| `@editorjs/table` | Table |
| `@editorjs/marker` | Marker highlight |
| `@editorjs/warning` | Warning block |
| `@editorjs/raw` | Raw HTML |
| `@editorjs/paragraph` | Paragraph (built-in) |
| `@editorjs/personality` | Personality card |
| `@editorjs/attaches` | File attachments |
| `@editorjs/underline` | Underline (inline tool) |

## License

MIT
