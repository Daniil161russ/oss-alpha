<template>
  <main class="configuration">
    <header>
      <h1>This is an configuration page</h1>
    </header>
    <ConfigurationView />
  </main>
</template>

<script setup lang="ts">
import ConfigurationView from '@/views/ConfigurationView.vue'
</script>

<style scoped lang="scss">
.configuration {
  header {
    margin-bottom: 1rem;
  }
}
</style>
