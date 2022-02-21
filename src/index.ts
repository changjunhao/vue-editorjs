/**
 * Vue-editorjs
 * Editor js wrapping component
 *
 * @version 1.0.0
 */
import { App } from 'vue'
import EditorComponent from './Editor.vue'

export const Editor = EditorComponent
export default {
  Editor: EditorComponent,
  install: (app: App) => {
    app.component(EditorComponent.name, EditorComponent)
  }
}
