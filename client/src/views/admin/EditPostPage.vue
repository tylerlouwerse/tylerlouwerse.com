<template>
  <div v-if="post">
    <div class="absolute w-full left-0 top-0 p-6 flex justify-between items-center space-x-6">
      <div class="flex-grow flex items-center">
        <span class="mr-1">/</span>
        <input type="text" class="p-0 border-none focus:ring-0 w-full" v-model="post.slug" />
      </div>
      <div class="flex items-center space-x-6">
        <div>
          <span class="text-sm text-gray-500">Autosaved</span>
        </div>
        <button class="text-sm font-medium">
          Published
        </button>
        <RouterLink :to="{ name: 'post', params: { slug: post.slug } }" class="text-sm font-medium text-gray-800">
          Preview
        </RouterLink>
      </div>
    </div>
    <ResizeTextarea v-model="post.title" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import _ from 'lodash';
import useAdminPosts from '../../api/useAdminPosts';
import ResizeTextarea from '../../components/ResizeTextarea.vue';

const props = defineProps({
  uuid: {
    required: true,
    type: String
  }
})

const { post, fetchPost, patchPost } = useAdminPosts();

const updatePost = async () => {
  await patchPost(props.uuid);
}

onMounted(async () => {
  await fetchPost(props.uuid);

  watch(() => _.cloneDeep(post), _.debounce(() => {
    updatePost();
  }, 500));
})
</script>