<template>
  <form @submit.prevent="login">
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import { useStore } from '../store/useStore';

const store = useStore();

const login = () => {
  store.login({
    email: '',
    password: ''
  });
}
</script>