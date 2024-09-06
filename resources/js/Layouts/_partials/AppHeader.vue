<template>
  <div class="flex items-center justify-between border-b bg-white px-8 py-6">
    <Link :href="route('home')">
      <img src="/img/logo.png" class="w-7" />
    </Link>

    <div class="flex items-center gap-x-8">
      <Link :href="route('posts.index')" class="text-stone-700">Articles</Link>
      <button
        class="inline-flex items-center border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Talk to me
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
import route from '@/Utils/route'
</script>
