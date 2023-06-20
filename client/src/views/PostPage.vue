<template>
  <div>
    {{ post }}
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