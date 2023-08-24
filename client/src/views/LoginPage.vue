<template>
  <div class="max-w-md mx-auto w-full">
    <form class="mt-8 space-y-6" @submit.prevent="attemptLogin">
      <div class="rounded-md space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <div class="mt-1">
            <input
              type="text"
              name="email" 
              id="email"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="you@example.com" 
              v-model="form.email"
            />
            <p class="mt-2 text-sm text-red-600" v-if="errors.email">
              {{ errors.email[0] }}
            </p>
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input
              type="password"
              name="password"
              id="password"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="mySecretPassword"
              v-model="form.password"
            />
            <p class="mt-2 text-sm text-red-600" v-if="errors.password">
              {{ errors.password[0] }}
            </p>
          </div>
        </div>
      </div>
      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:rind-2 focus:rind-offset-2 focus:ring-blue-500">Sign In</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store/useStore';
import { AxiosError } from 'axios';

const errors = ref<{
  email?: string[];
  password?: string[];
}>({})

const form = reactive({
  email: '',
  password: '',
})

const store = useStore();
const router = useRouter();

const attemptLogin = () => {
  store.login(form).then(() => {
    router.push({ name: 'admin.posts' })
  })
  .catch((error) => {
    if(error instanceof AxiosError && error.response?.status === 422) {
      errors.value = error.response?.data.errors;
    } else {
      errors.value = {
        email: ['Something went wrong. Please try again.']
      }
    }
  });
}
</script>