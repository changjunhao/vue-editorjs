import { createApp } from 'vue'
import App from './app.vue'
import Editor from '../src'
// import Editor from '../dist/vue-editorjs.min.js'

createApp(App).use(Editor).mount('#app')
