/**
 * Vue-editorjs
 * Editor js wrapping component
 *
 * @version 1.0.0
 */

import EditorComponent from './Editor.vue';

const EditorPlugin = {
  install(Vue) {
    if (this.installed) return;
    this.installed = true;
    Vue.component('VueEditorjs', EditorComponent);
  }
}

export const Editor = EditorComponent;

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(EditorPlugin);
}

export default EditorPlugin;
