<script setup lang="ts">
defineProps<{
  items: [number, string][]
  /** Lay items out in responsive columns instead of a single stack. */
  columns?: boolean
}>()
</script>

<template>
  <ul class="honor-list" :class="{ columns }">
    <li v-for="[year, title] in items" :key="`${year}-${title}`">
      <span class="honor-year">{{ year }}</span>
      <span>{{ title }}</span>
    </li>
  </ul>
</template>

<style scoped>
.honor-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.honor-list.columns { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }

li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: var(--pale);
  border-radius: var(--radius-sm);
  color: var(--brand-navy);
  font-weight: 500;
}
.honor-year {
  flex-shrink: 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  background: var(--brand-red);
  padding: 2px 10px;
  border-radius: 999px;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 760px) {
  .honor-list.columns { grid-template-columns: 1fr; }
}
</style>
