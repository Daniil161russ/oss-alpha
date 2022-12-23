<template>
  <main class="statistics">
    <header>
      <h1>Statistics</h1>
    </header>
    <StatisticsView />
  </main>
</template>

<script setup lang="ts">
import StatisticsView from '@/views/StatisticsView.vue'
</script>

<style scoped lang="scss">
.statistics {
  max-height: 100vh;
  overflow-y: auto;
  header {
    margin-bottom: 1rem;
  }
}
</style>
