<template>
  <div class="space-y-16">
    <div v-for="post in posts" :key="post.uuid">
      <RouterLink :to="{ name: 'post', params: { slug: post.slug }}" class="block">
        <h1 class="text-3xl sm:text-4xl leading-10 font-extrabold tracking-tight text-gray-900">{{ post.title }}</h1>
        <p class="mt-6 text-gray-500">
          {{ post.teaser }}
        </p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import usePosts from '../api/usePosts';

const { posts, fetchPosts } = usePosts();

onMounted(fetchPosts);
</script>