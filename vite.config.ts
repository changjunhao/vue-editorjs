import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: resolve(dirname(fileURLToPath(import.meta.url)), 'src/index.ts'),
      name: 'VueEditorJS',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'vue-editorjs.mjs'
        if (format === 'cjs') return 'vue-editorjs.cjs'
        return 'vue-editorjs.umd.js'
      },
    },
    rollupOptions: {
      external: ['vue', '@editorjs/editorjs'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          '@editorjs/editorjs': 'EditorJS',
        },
      },
    },
  },
})
