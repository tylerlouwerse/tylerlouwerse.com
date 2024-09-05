<template>
  <Head title="Home" />

  <AppLayout>
    <div class="mb-16 rounded border p-8 text-right text-stone-800">
      <div>The Tao that can be understood</div>
      <div>is not the eternal, cosmic Tao,</div>
      <div>just as an idea that can be expressed in words</div>
      <div>is not the infinite idea.</div>
      <div class="mt-2 text-xs text-gray-500">- Lao Tzu</div>
    </div>

    <div class="mb-16 space-y-16">
      <div v-for="post in posts" :key="post.uuid">
        <Link :href="route('posts.show', post.slug)">
          <h1 class="text-3xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-4xl">
            {{ post.title }}
          </h1>
          <div class="mt-1 text-xs text-gray-600">
            <span class="font-bold text-indigo-800">{{ post.tag }}</span>
            <span>&nbsp;| Reading Time: {{ post.reading_mins }} {{ pluralize(post.reading_mins, 'min') }}</span>
          </div>
          <p class="mt-4 text-gray-500">
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
import { pluralize } from '@/Utils/helpers'
import AppLayout from '@/Layouts/AppLayout.vue'

defineProps({
  posts: {
    type: Array as PropType<App.Post[]>,
    required: true,
  },
})
</script>
