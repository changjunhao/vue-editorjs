<template>
  <div id="vue-editorjs">
    <div :id="holderId"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onBeforeUnmount, ref, Ref } from 'vue'
  import EditorJS, { OutputData } from '@editorjs/editorjs'

  export default defineComponent({
    name: 'VueEditorJS',
    props: {
      holderId: {
        type: String,
        default: () => 'codex-editor',
        required: false
      },
      autofocus: {
        type: Boolean,
        default: () => true,
        required: false
      },
      placeholder: {
        type: String,
        default: () => 'Let`s write an awesome story!',
        required: false
      },
      data: {
        type: Object,
        default: () => {},
        required: false
      },
      tools: {
        type: Object,
        default: () => {},
        required: false
      }
    },
    setup(props, context) {
      const editor: Ref<EditorJS | null> = ref(null)
      const initEditor = () => {
        if (editor.value) {
          editor.value.isReady
              .then(() => {
                editor.value?.render(props.data as OutputData)
              }).catch(e => console.log(e));
        } else {
          editor.value = new EditorJS({
            holder: props.holderId,
            autofocus: props.autofocus,
            placeholder: props.placeholder,
            onReady: () => {
              context.emit('ready')
            },
            onChange: async () => {
              const response = await editor.value?.save()
              context.emit('change', response)
            },
            data: props.data as OutputData,
            tools: props.tools
          })
        }
      }

      onMounted(() => {
        initEditor()
      })

      onBeforeUnmount(() => {
        if (editor.value) {
          editor.value.destroy();
        }
      })

      const save = async () => {
        const response = await editor.value?.save()
        context.emit('save', response)
      }
    }
  })
</script>

<style scoped>

</style>
