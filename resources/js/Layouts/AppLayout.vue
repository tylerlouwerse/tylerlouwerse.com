<template>
  <AppHeader />

  <div class="mx-auto my-16 max-w-4xl px-4 sm:px-6 lg:px-8">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from './_partials/AppHeader.vue'
</script>
