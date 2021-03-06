# vue-editorjs

vue-editorjs is editorjs wrapper component.

Please see this first. https://editorjs.io/

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
import Editor from '@junhao/vue-editorjs'

Vue.use(Editor)
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
