<template>
  <div id="vue-editorjs">
    <div :id="holderId"></div>
  </div>
</template>

<script>
  import EditorJS from '@editorjs/editorjs'

  export default {
    name: 'Editor',
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
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      this.initEditor()
    },
    beforeDestroy() {
      if (this.editor) {
        this.editor.destroy();
      }
    },
    watch: {
      data: function () {
        this.initEditor()
      }
    },
    methods: {
      initEditor() {
        if (this.editor) {
          this.editor.isReady
            .then(() => {
              this.editor.render(this.data)
            }).catch(e => console.log(e));
        } else {
          this.editor = new EditorJS({
            holder: this.holderId,
            autofocus: this.autofocus,
            placeholder: this.placeholder,
            onReady: () => {
              this.$emit('ready')
            },
            onChange: async () => {
              const response = await this.editor.save()
              this.$emit('change', response)
            },
            data: this.data,
            tools: this.tools
          })
        }
      },
      async save () {
        const response = await this.editor.save()
        this.$emit('save', response)
      },
    }
  }
</script>

<style scoped>

</style>
