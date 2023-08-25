<template>
  <div v-if="post">
    <div class="absolute w-full left-0 top-0 p-6 flex justify-between items-center space-x-6">
      <div class="flex-grow flex items-center">
        <span class="mr-1">/</span>
        <input type="text" class="p-0 border-none focus:ring-0 w-full" v-model="post.slug" spellcheck="false" @click="$event.target.select()" />
      </div>
      <div class="flex items-center space-x-6">
        <div>
          <span class="text-sm text-gray-500">{{ saveMessage }}</span>
        </div>
        <button
          class="text-sm font-medium"
          @click="post.published = !post.published"
          :class="{ 'text-pink-500': post.published, 'text-green-500': !post.published }"
        >
          {{ !post.published ? 'Publish' : 'Unpublish' }}
        </button>
        <RouterLink :to="{ name: 'post', params: { slug: post.slug } }" class="text-sm font-medium text-gray-800">
          Preview
        </RouterLink>
      </div>
    </div>
    <div>
      <ResizeTextarea v-model="post.title" />
    </div>
    <Editor
      v-model:body="post.body"
      v-model:teaser="post.teaser"  
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue';
import _ from 'lodash';
import useAdminPosts from '../../api/useAdminPosts';
import ResizeTextarea from '../../components/ResizeTextarea.vue';
import Editor from '../../components/Editor.vue';
import slugify from 'slugify';
import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const props = defineProps({
  uuid: {
    required: true,
    type: String
  }
})

const { post, fetchPost, patchPost } = useAdminPosts();

const saveMessage = ref<string | null>(null);
const lastSaved = ref<Dayjs | null>(null);
const updatePost = async () => {
  saveMessage.value = 'saving...';
  await patchPost(props.uuid);
  lastSaved.value = dayjs();
  saveMessage.value = lastSaved.value?.fromNow();

  setInterval(() => {
    saveMessage.value = lastSaved.value?.fromNow() || '';
  }, 60000)
}

const replaceSlug = () => {
  if(!post?.value) return;

  const slug = post.value.slug;

  if(slug.charAt(slug.length - 1) === ' ') {
    return;
  }

  post.value.slug = slug ? slugify(slug, { strict: true }): props.uuid;
}

onMounted(async () => {
  await fetchPost(props.uuid);

  watchEffect(() => {
    replaceSlug();
  })

  watch(() => _.cloneDeep(post), _.debounce(() => {
    updatePost();
  }, 500));
})
</script>