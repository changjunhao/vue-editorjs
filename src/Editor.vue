<template>
  <div id="vue-editorjs">
    <div :id="config?.holder || holder "></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onBeforeUnmount, PropType, ref, Ref } from 'vue'
  import EditorJS, { LogLevels, OutputData } from '@editorjs/editorjs'
  import { SanitizerConfig } from "@editorjs/editorjs/types/configs/sanitizer-config";
  import { ToolConstructable, ToolSettings } from "@editorjs/editorjs/types/tools";
  import { I18nConfig } from "@editorjs/editorjs/types/configs/i18n-config";
  import { EditorConfig } from "@editorjs/editorjs/types/configs/editor-config";

  export default defineComponent({
    name: 'vue-editorjs',
    props: {
      config: Object as PropType<EditorConfig>,
      holder: {
        type: String as PropType<string | HTMLElement>,
        default: () => 'codex-editor',
        required: false
      },
      autofocus: {
        type: Boolean,
        default: () => false,
        required: false
      },
      initialBlock: String,
      placeholder: {
        type: String,
        default: () => 'Let`s write an awesome story!',
        required: false
      },
      sanitizer: Object as PropType<SanitizerConfig>,
      hideToolbar: {
        type: Boolean,
        default: () => false,
        required: false
      },
      data: {
        type: Object as PropType<OutputData>,
        default: () => {},
        required: false
      },
      tools: {
        type: Object as PropType<{
          [toolName: string]: ToolConstructable | ToolSettings;
        }>,
        default: () => {},
        required: false
      },
      minHeight: Number,
      logLevel: String as PropType<LogLevels>,
      readOnly: Boolean,
      i18n: Object as PropType<I18nConfig>,
      inlineToolbar: Array as PropType<string[]>,
      tunes: Array as PropType<string[]>,
    },
    setup(props, context) {
      const editor: Ref<EditorJS | null> = ref(null)
      const initEditor = () => {
        if (editor.value) {
          editor.value.isReady
              .then(() => {
                editor.value?.render(props.data)
              }).catch(e => console.log(e));
        } else {
          const { config, ...otherConfig } = props
          const configuration = config || otherConfig
          editor.value = new EditorJS({
            holder: configuration.holder || 'codex-editor',
            ...configuration,
            onReady: () => {
              context.emit('ready')
            },
            onChange: async () => {
              const response = await editor.value?.save()
              context.emit('change', response)
            },
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
