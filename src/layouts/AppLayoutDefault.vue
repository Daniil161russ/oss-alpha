<template>
  <div class="app">
    <SideBar />
    <!-- <AppLayoutLinks /> -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import SideBar from '../components/AppNavigation/AppSideBar.vue'
</script>
