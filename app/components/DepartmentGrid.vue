<script setup lang="ts">
import { departments } from '~/data/site'
</script>

<template>
  <div class="three-grid">
    <article v-for="(d, i) in departments" :key="d.name" class="card dept-card">
      <span class="dept-index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
      <h3>{{ d.name }}</h3>
      <p class="dept-en">{{ d.en }}</p>
      <p class="muted">{{ d.description }}</p>
    </article>
  </div>
</template>

<style scoped>
.dept-card { position: relative; }
.dept-card h3 { margin-bottom: 2px; }
.dept-index {
  position: absolute;
  top: 18px;
  right: 22px;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--brand-sky);
  opacity: 0.45;
  line-height: 1;
}
.dept-en {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brand-red);
  font-weight: 600;
  margin-bottom: 14px;
}
</style>
