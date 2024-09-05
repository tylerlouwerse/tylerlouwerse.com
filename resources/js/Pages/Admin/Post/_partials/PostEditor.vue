<template>
  <div>
    <editor-content :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const emit = defineEmits<{
  (e: 'update:body', value: string): void
  (e: 'update:teaser', value: string): void
}>()

const props = defineProps({
  body: {
    type: String,
    default: '',
  },
  teaser: {
    type: String,
    default: '',
  },
})

const editor = useEditor({
  content: props.body,
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'min-w-full w-full text-gray-500 prose prose-sm lg:prose focus:outline-none',
    },
  },
  onUpdate: (context) => {
    // extract and emit the teaser
    const content = context.editor.state.doc.content

    let teaser = content ? content.firstChild?.textContent : ''

    if (teaser && teaser.length > 100) {
      teaser = teaser.split(' ').slice(0, 20).join(' ') + '...'
    }

    emit('update:teaser', teaser || '')

    // emit the content body
    emit('update:body', context.editor.getHTML())
  },
})

watch(
  () => props.body,
  (value: string) => {
    if (editor.value?.getHTML() === value) return

    editor.value?.commands.setContent(value)
  }
)
</script>
