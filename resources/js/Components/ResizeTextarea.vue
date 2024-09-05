<template>
  <textarea ref="el" v-model="content" @input="resize" />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const content = ref(props.modelValue)

watch(content, (value: string) => {
  emit('update:modelValue', value)
})

const resizeTarget = function (target: HTMLTextAreaElement) {
  target.style.height = 'auto'
  target.style.height = `${target.scrollHeight}px`
}

const resize = function (event: Event) {
  if (!event.target) return

  resizeTarget(event.target as HTMLTextAreaElement)
}

const el = ref()
onMounted(() => {
  resizeTarget(el.value)
})
</script>
