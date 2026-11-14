<script setup lang="ts">
// Title template, canonical and og:title / og:description / og:url come from nuxt-seo-utils.
// Pages override the share image with their own `ogImage` where they have a better one.
useSeoMeta({
  ogImage: '/images/group-1200.webp',
  ogImageWidth: 1200,
  ogImageHeight: 800,
  ogImageAlt: '新南学联成员合影',
  twitterCard: 'summary_large_image',
})
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
