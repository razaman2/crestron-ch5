<script setup lang="ts">
import {RouterView, useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
    <RouterView :key="route.fullPath" class="h-screen flex flex-col"/>
</template>
