<script setup lang="ts">
useHead({ titleTemplate: (t) => (t ? `${t} · 新南学联` : '新南学联 UNSWCSA') })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Page transition (app.pageTransition in nuxt.config). Global on purpose: the classes
   land on each page's root element, which no single scoped style can reach. */
.page-enter-active,
.page-leave-active { transition: opacity 0.16s ease; }
.page-enter-from,
.page-leave-to { opacity: 0; }
</style>
