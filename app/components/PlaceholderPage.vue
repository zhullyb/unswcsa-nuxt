<script setup lang="ts">
defineProps<{ eyebrow: string | number; title: string; description: string }>()
</script>

<template>
  <section class="container placeholder-page">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p class="muted">{{ description }}</p>
    <!-- action, e.g. a "返回首页" button -->
    <slot />
  </section>
</template>

<style scoped>
.placeholder-page { padding-top: 96px; padding-bottom: 120px; min-height: 55vh; }
.placeholder-page :slotted(.button) { margin-top: 20px; }

@media (max-width: 760px) {
  .placeholder-page { padding-top: 48px; padding-bottom: 72px; }
}
</style>
