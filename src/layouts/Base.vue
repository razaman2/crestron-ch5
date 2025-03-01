<script setup lang="ts">
// @ts-nocheck

import {RouterView, useRoute} from "vue-router";
import Navbar from "@components/n2n/Navbar.vue";

const route = useRoute();
</script>

<template>
    <div>
        <Navbar class="px-4"/>
        <RouterView :key="route.fullPath"/>
    </div>
</template>
