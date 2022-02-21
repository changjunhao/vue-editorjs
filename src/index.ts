/**
 * Vue-editorjs
 * Editor js wrapping component
 *
 * @version 1.0.0
 */
import { App } from 'vue'
import Editor from './Editor.vue'

// Editor.install = (app: App) => {
//   app.component('VueEditorjs', Editor)
// }
//
// export const VueEditorjs = Editor
export default {
  Editor,
  install: (app: App) => {
    app.component('VueEditorjs', Editor)
  }
}
