<template>
  <Head title="Posts" />

  <AppLayout>
    <div class="space-y-16">
      <div v-for="post in posts" :key="post.uuid">
        <Link :href="route('posts.show', post.slug)">
          <h1 class="text-3xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-4xl">
            {{ post.title }}
          </h1>
          <p class="mt-6 text-gray-500">
            {{ post.teaser }}
          </p>
        </Link>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { Head, Link } from '@inertiajs/vue3'
import route from '@/Utils/route'
import AppLayout from '@/Layouts/AppLayout.vue'

defineProps({
  posts: {
    type: Array as PropType<App.Post[]>,
    required: true,
  },
})
</script>
