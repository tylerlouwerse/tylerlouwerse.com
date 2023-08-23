<template>
  <div>
    <h1 class="block text-center text-4xl sm:text-6xl leading-10 font-extrabold tracking-tight text-gray-900">{{ post?.title }}</h1>
    <div class="mt-16 text-gray-500 prose-sm lg:prose" v-html="post?.body"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import usePosts from '../api/usePosts';

const props = defineProps({
  slug: {
    required: true,
    type: String
  }
})

const { post, fetchPost } = usePosts();

onMounted(async () => {
  await fetchPost(props.slug);
})
</script>