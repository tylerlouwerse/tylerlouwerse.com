<template>
  <textarea
    ref="el"
    class="w-full text-4xl lg:text-6xl leading-10 font-extrabold tracking-tight text-gray-900 text-center border-none focus:ring-0 resize-none padding-0"
    v-model="content"
    @input="resize"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
});

const content = ref(props.modelValue)
watch(content, (value: string) => {
  emit('update:modelValue', value)
});

const resizeTarget = (target: HTMLTextAreaElement) => {
  target.style.height = 'auto';
  target.style.height = `${target.scrollHeight}px`;
}

const resize = (event: Event) => {
  if(!event.target) return;

  resizeTarget(event.target as HTMLTextAreaElement);
}

const el = ref()
onMounted(() => {
  resizeTarget(el.value)
})
</script>