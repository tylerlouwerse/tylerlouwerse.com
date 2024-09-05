<template>
  <Head :title="`${post.title} | Edit`" />

  <AppLayout>
    <div class="absolute left-0 top-0 flex w-full items-center justify-between space-x-6 p-6">
      <div class="flex flex-grow items-center">
        <span class="mr-1">/</span>
        <input
          type="text"
          class="w-full border-none p-0 focus:ring-0"
          v-model="form.slug"
          spellcheck="false"
          @click="($event.target as HTMLInputElement).select()"
        />
      </div>
      <div class="flex items-center space-x-6">
        <div>
          <span class="text-sm text-gray-500">{{ saveMessage }}</span>
        </div>
        <button
          class="text-sm font-medium"
          @click="form.published = !form.published"
          :class="{ 'text-pink-500': form.published, 'text-green-500': !form.published }"
        >
          {{ !form.published ? 'Publish' : 'Unpublish' }}
        </button>
        <Link :href="route('posts.show', form.slug)" class="text-sm font-medium text-gray-800">Preview</Link>
      </div>
    </div>

    <div class="mb-3">
      <Link :href="route('admin.posts.index')" class="text-sm font-extrabold text-purple-700 hover:underline">
        <ArrowLeftIcon class="-mt-1 mr-1 inline-block h-3 w-3" />
        <span>Posts</span>
      </Link>
    </div>

    <div>
      <ResizeTextarea
        class="w-full resize-none border-none p-0 text-4xl font-extrabold leading-10 tracking-tight text-gray-900 focus:ring-0 lg:text-6xl"
        v-model="form.title"
      />
    </div>

    <PostEditor v-model:body="form.body" v-model:teaser="form.teaser" />
  </AppLayout>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, watch, watchEffect, onMounted } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import route from '@/Utils/route'
import AppLayout from '@/Layouts/AppLayout.vue'
import ResizeTextarea from '@/Components/ResizeTextarea.vue'
import PostEditor from './_partials/PostEditor.vue'
import _ from 'lodash'
import slugify from 'slugify'
import dayjs, { Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

dayjs.extend(relativeTime)

const props = defineProps({
  post: {
    type: Object as PropType<App.Post>,
    required: true,
  },
})

const form = useForm({
  title: props.post.title,
  slug: props.post.slug,
  body: props.post.body,
  teaser: props.post.teaser,
  published: props.post.published,
})

const saveMessage = ref<string | null>(null)
const lastSaved = ref<Dayjs | null>(null)

const updatePost = async function () {
  saveMessage.value = 'saving...'

  form.patch(route('admin.posts.update', props.post.uuid), {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      lastSaved.value = dayjs()
      saveMessage.value = lastSaved.value?.fromNow()

      setInterval(() => {
        saveMessage.value = lastSaved.value?.fromNow() || ''
      }, 60000)
    },
  })
}

const replaceSlug = function () {
  const slug = form.slug

  if (slug.charAt(slug.length - 1) === ' ') return

  form.slug = slug ? slugify(slug, { strict: true }) : props.post.uuid
}

onMounted(() => {
  watchEffect(() => {
    replaceSlug()
  })

  watch(
    () => form.data(),
    _.debounce(() => {
      updatePost()
    }, 500)
  )
})
</script>
