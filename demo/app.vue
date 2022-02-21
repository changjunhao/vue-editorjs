<template>
<!--  <vue-editorjs-->
<!--      ref="editor"-->
<!--      :config="config"-->
<!--      @save="onSave"-->
<!--      @ready="onReady"-->
<!--      @change="onChange"-->
<!--  />-->
  <vue-editorjs
      ref="editor"
      :data="initData"
      :tools="tools"
      @save="onSave"
      @ready="onReady"
      @change="onChange"
  />
</template>

<script lang="ts">
  // import { Editor } from '../dist/vue-editorjs.min.js'
  import { defineComponent, readonly, ref } from 'vue'
  import Header from '@editorjs/header'
  import List from '@editorjs/list'
  import ImageTool from '@editorjs/image'
  import inlineCode from '@editorjs/inline-code'
  import embed from '@editorjs/embed'
  import quote from '@editorjs/quote'
  import marker from '@editorjs/marker'
  import code from '@editorjs/code'
  import link from '@editorjs/link'
  import delimiter from '@editorjs/delimiter'
  import raw from '@editorjs/raw'
  import table from '@editorjs/table'
  import warning from '@editorjs/warning'
  import paragraph from '@editorjs/paragraph'
  import checklist from '@editorjs/checklist'

  export default defineComponent({
    // components: {
    //   [Editor.name]: Editor
    // },
    setup() {
      const initData = readonly(JSON.parse('{"time":1558356864490,"blocks":[{"type":"paragraph","data":{"text":"First text"}},{"type":"paragraph","data":{"text":"Second text"}}],"version":"2.13"}'))

      const tools = readonly({
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header'
          }
        },
        list: {
          class: List,
        },
        code: {
          class: code,
        },
        inlineCode: {
          class: inlineCode,
        },
        embed: {
          class: embed,
        },
        link: {
          class: link,
        },
        marker: {
          class: marker,
        },
        table: {
          class: table,
        },
        raw: {
          class: raw,
        },
        delimiter: {
          class: delimiter,
        },
        quote: {
          class: quote,
        },
        image: {
          class: ImageTool,
        },
        warning: {
          class: warning,
        },
        paragraph: {
          class: paragraph,
        },
        checklist: {
          class: checklist,
        },
      })

      const saveData = ref({})

      const config = readonly({
        data: initData,
        tools: tools,
      })

      const onReady = () => {
        console.log('editor are ready')
      }
      const onChange = (response) => {
        saveData.value = response
      }
      const onSave = (response) => {
        saveData.value = response
      }
      return {
        initData,
        tools,
        config,
        onSave,
        onReady,
        onChange
      }
    }
  })

</script>

<style scoped>

</style>
