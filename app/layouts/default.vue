<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="site">
    <a class="skip-link" href="#main-content">跳至主要内容</a>
    <SiteHeader />
    <main id="main-content" tabindex="-1">
      <SiteHero v-if="route.meta.hero" :hero="route.meta.hero" :route-key="route.path" />
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.site { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }

.skip-link { position: fixed; top: -100px; left: 16px; background: #fff; padding: 12px; z-index: 50; }
.skip-link:focus { top: 12px; }
</style>
