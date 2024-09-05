<template>
  <Head :title="post.title" />

  <AppLayout>
    <div>
      <div class="mb-8">
        <Link :href="route('posts.index')" class="text-sm font-extrabold text-indigo-700 hover:underline">
          <ArrowLeftIcon class="-mt-1 mr-1 inline-block h-3 w-3" />
          <span>Posts</span>
        </Link>
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
import { Head, Link } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

defineProps({
  post: {
    type: Object as PropType<App.Post>,
    required: true,
  },
})
</script>
