<template>
  <div>{{ post }}</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useAdminPosts from '../../api/useAdminPosts';

const props = defineProps({
  slug: {
    required: true,
    type: String
  }
})

const { post, fetchPost } = useAdminPosts();

onMounted(async () => {
  await fetchPost(props.slug);
})
</script>