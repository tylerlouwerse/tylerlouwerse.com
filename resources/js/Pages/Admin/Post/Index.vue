<template>
  <Head title="Posts" />

  <AppLayout>
    <div class="space-y-16">
      <button
        type="button"
        class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        @click="handleCreatePost"
      >
        New post
      </button>

      <div v-for="post in posts" :key="post.uuid">
        <div
          class="flex flex-wrap items-baseline space-x-0 space-y-3 sm:flex-nowrap sm:justify-between sm:space-x-6 sm:space-y-0"
        >
          <p class="text-xl font-bold tracking-tight text-gray-900">
            {{ post.title }}
          </p>
          <div class="flex items-center space-x-6">
            <p class="text-base text-gray-500">
              <span
                class="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium"
                :class="{ 'bg-green-100 text-green-800': post.published, 'bg-gray-100 text-gray-800': !post.published }"
              >
                {{ !post.published ? 'Unpublished' : 'Published' }}
              </span>
            </p>
            <div>
              <Link :href="route('admin.posts.edit', post.uuid)">Edit</Link>
            </div>
            <div>
              <button class="text-sm font-medium" @click="handleDeletePost(post.uuid)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
import route from '@/Utils/route'
import AppLayout from '@/Layouts/AppLayout.vue'

defineProps({
  posts: {
    type: Array as PropType<App.Post[]>,
    required: true,
  },
})

const handleCreatePost = function () {
  router.post(route('admin.posts.store'))
}

const handleDeletePost = function (uuid: string) {
  router.delete(route('admin.posts.destroy', uuid))
}
</script>
