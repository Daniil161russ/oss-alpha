<template>
  <div class="menu">
    <RouterLink class="button" to="/">
      <el-icon class="menu-icon"><House /></el-icon>
      <span class="text">Home</span>
    </RouterLink>
    <RouterLink class="button" to="/statistics">
      <el-icon class="menu-icon"><DataAnalysis /></el-icon>
      <span class="text">Statistics</span>
    </RouterLink>
    <RouterLink class="button" to="/configuration">
      <el-icon class="menu-icon"><SetUp /></el-icon>
      <span class="text">Configuration</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.menu {
  margin: 0 -1rem;

  .button {
    display: flex;
    align-items: center;
    text-decoration: none;

    padding: 0.5rem 1rem;
    transition: 0.2s ease-out;

    .menu-icon {
      font-size: 2rem;
      color: var(--light);
      transition: 0.2s ease-out;
    }

    .text {
      color: var(--light);
      transition: 0.2s ease-out;
    }

    &:hover,
    &.router-link-exact-active {
      background-color: var(--dark-alt);

      .menu-icon,
      .text {
        color: var(--primary);
        transition: 0.2s ease-out;
      }
    }

    &.router-link-exact-active {
      border-right: 5px solid var(--primary);
    }
  }
}
</style>
