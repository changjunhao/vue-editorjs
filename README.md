# vue-editorjs

vue-editorjs is editorjs wrapper component.

Please see this first. https://editorjs.io/

Only supports Vue3, Vue2 please check the branch vue2

## Installation

```bash
npm install --save @junhao/vue-editorjs

# or Yarn
yarn add @junhao/vue-editorjs
```

## Usage

```js
// In main.js
// ...
import { createApp } from 'vue'
import App from './app.vue'
import Editor from '@junhao/vue-editorjs'

createApp(App).use(Editor).mount('#app')
// ...
```

```js
// In component
// ...
import { Editor } from '@junhao/vue-editorjs'

export default {
  components: {
    Editor,
  }
}
// ...
```

```Vue
  <vue-editorjs
    ref="editor"
    :data="initData"
    :tools="tools"
    @save="onSave"
    @ready="onReady"
    @change="onChange"
  />
```      

Please see demo for specific usage
