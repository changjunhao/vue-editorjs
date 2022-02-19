<template>
  <div id="vue-editorjs">
    <div :id="holderId"></div>
  </div>
</template>

<script setup>
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import EditorJS from '@editorjs/editorjs'

  const props = defineProps({
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
  })

  const emit = defineEmits(['ready', 'change', 'save'])

  const editor = ref(null)

  const initEditor = () => {
    if (editor.value) {
      editor.value.isReady
          .then(() => {
            editor.value.render(props.data)
          }).catch(e => console.log(e));
    } else {
      editor.value = new EditorJS({
        holder: props.holderId,
        autofocus: props.autofocus,
        placeholder: props.placeholder,
        onReady: () => {
          emit('ready')
        },
        onChange: async () => {
          const response = await editor.value.save()
          emit('change', response)
        },
        data: props.data,
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
    const response = await editor.value.save()
    emit('save', response)
  }
</script>

<style scoped>

</style>
