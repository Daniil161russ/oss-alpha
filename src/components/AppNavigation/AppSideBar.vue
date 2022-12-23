<template>
  <aside :class="`${isExpanded && 'is-expanded'}`">
    <div class="logo">
      <!-- <img src="@/assets/logo.png" alt="app logo" /> -->
      <img src="@/assets/OSS.png" alt="app logo" />
    </div>
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <el-icon class="menu-toggle-icon"><DArrowRight /></el-icon>
      </button>
    </div>

    <h3>Menu</h3>
    <AppLayoutLinks />
  </aside>
</template>

<script setup lang="ts">
import AppLayoutLinks from '@/layouts/AppLayoutLinks.vue'
import { ref } from 'vue'

const isExpanded = ref(localStorage.getItem('isExpanded') === 'true')

const ToggleMenu = () => {
  isExpanded.value = !isExpanded.value

  localStorage.setItem('isExpanded', new Boolean(isExpanded.value).toString())
}
</script>

<style lang="scss">
aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: var(--dark);
  color: var(--light);

  transition: 0.2s ease-out;

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;
      &-icon {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
        &:hover {
          transform: translateX(0.5rem);
          color: var(--primary);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  h3 {
    color: var(--gray);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
      transition: 0.3s ease-out;
    }

    .menu {
      .button {
        .menu-icon {
          margin-right: 1rem;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
