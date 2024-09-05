<template>
  <Head :title="post.title" />

  <AppLayout>
    <div>
      <div class="mb-8 mt-1 text-xs text-gray-600">
        <span class="font-bold text-indigo-800">{{ post.tag }}</span>
        <span>&nbsp;| Reading Time: {{ post.reading_mins }} {{ pluralize(post.reading_mins, 'min') }}</span>
      </div>
      <h1 class="mb-16 block text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-6xl">
        {{ post.title }}
      </h1>
      <div class="prose-sm lg:prose whitespace text-gray-500" v-html="post.body" />
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { Head } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import { pluralize } from '@/Utils/helpers'

defineProps({
  post: {
    type: Object as PropType<App.Post>,
    required: true,
  },
})
</script>
