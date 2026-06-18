/**
 * Vue-editorjs
 * Editor.js wrapping component for Vue 3
 */
import type { App, Plugin } from 'vue'
import EditorComponent from './Editor.vue'

export const Editor = EditorComponent

const plugin: Plugin = {
  install(app: App) {
    app.component('VueEditorjs', EditorComponent)
  },
}

export default plugin
