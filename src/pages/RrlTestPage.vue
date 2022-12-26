<template>
  <main class="rrl">
    <header>
      <h1>RRL test</h1>
    </header>
    <RrlTestView />
  </main>
</template>

<script setup lang="ts">
import RrlTestView from '@/views/RrlTestView.vue'
</script>

<style scoped lang="scss">
.rrl {
  max-height: 100vh;
  overflow-y: auto;
  header {
    margin-bottom: 1rem;
  }
}
</style>
