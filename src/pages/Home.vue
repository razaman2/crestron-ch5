<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="bg-blue-500 h-full px-4">
      <h1>Home Page</h1>

      <button @click="() => {
          router.push('/user/1');
      }">click me</button>
  </div>
</template>
