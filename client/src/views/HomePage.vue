<template>
  <div>{{ posts }}</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import usePosts from '../api/usePosts';

const { posts, fetchPosts } = usePosts();

onMounted(fetchPosts);
</script>