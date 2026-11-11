<script setup lang="ts">
// Old per-event URLs (/activities/:eventbriteId) now go to the list page. The server
// answers them with a 301 (routeRules); this covers client-side navigation.
definePageMeta({ redirect: '/activities' })
</script>

<template>
  <div />
</template>
