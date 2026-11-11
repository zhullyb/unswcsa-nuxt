<script setup lang="ts">
definePageMeta({ hero: { title: '全部活动', subtitle: '相聚于每一次活动' } })
useHead({ title: '全部活动' })

const PAGE = 12
const route = useRoute()
const router = useRouter()
const { events, status, error, refresh, now } = useEvents()

const year = computed(() => {
  const q = route.query.year
  return typeof q === 'string' && /^[1-9]\d{3}$/.test(q) ? q : ''
})
const month = computed(() => {
  const q = route.query.month
  return typeof q === 'string' && /^(?:[1-9]|1[0-2])$/.test(q) ? q : ''
})

const years = computed(() => {
  const set = new Set(events.value.filter((e) => !e.hideStart).map((e) => String(yearMonth(e).year)))
  if (year.value) set.add(year.value)
  return [...set].sort().reverse()
})

const filtered = computed(() =>
  events.value.filter((e) => {
    if (!year.value && !month.value) return true
    if (e.hideStart) return false
    const ym = yearMonth(e)
    return (!year.value || ym.year === Number(year.value)) && (!month.value || ym.month === Number(month.value))
  }),
)

const limit = ref(PAGE)
watch([year, month], () => (limit.value = PAGE))
const visible = computed(() => filtered.value.slice(0, limit.value))

function update(key: 'year' | 'month', value: string) {
  // vue-router drops undefined values from the query
  router.replace({ query: { ...route.query, [key]: value || undefined } })
}
function clear() {
  const { year: _y, month: _m, ...rest } = route.query
  router.replace({ query: rest })
}

const loading = computed(() => status.value === 'pending' && !events.value.length)
const retrying = ref(false)
async function retry() {
  retrying.value = true
  try {
    await refresh()
  } finally {
    retrying.value = false
  }
}
</script>

<template>
  <div>
    <div class="container page-body">
      <div class="filter-bar">
        <label>
          <span>年份</span>
          <select :value="year" @change="update('year', ($event.target as HTMLSelectElement).value)">
            <option value="">全部年份</option>
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </label>
        <label>
          <span>月份</span>
          <select :value="month" @change="update('month', ($event.target as HTMLSelectElement).value)">
            <option value="">全部月份</option>
            <option v-for="m in 12" :key="m" :value="String(m)">{{ m }} 月</option>
          </select>
        </label>
        <button class="filter-reset" :disabled="!year && !month" @click="clear">清除筛选</button>
        <p class="filter-count muted" role="status">
          <template v-if="!loading && !error">共 {{ filtered.length }} 场活动</template>
        </p>
      </div>

      <div v-if="loading" class="three-grid event-grid" aria-busy="true">
        <div v-for="i in 6" :key="i" class="skeleton" />
      </div>
      <div v-else-if="error && !events.length" class="filter-notice" role="status">
        活动信息暂时无法加载，请稍后重试
        <button class="filter-reset" :disabled="retrying" @click="retry">
          {{ retrying ? '正在重试…' : '重试' }}
        </button>
      </div>
      <div v-else-if="!filtered.length" class="filter-notice" role="status">
        {{ events.length ? '暂无符合条件的活动' : '暂无公开活动' }}
        <button v-if="year || month" class="filter-reset" @click="clear">清除筛选</button>
      </div>
      <template v-else>
        <div class="three-grid event-grid">
          <EventCard v-for="e in visible" :key="e.id" :event="e" :now="now" />
        </div>
        <div v-if="filtered.length > limit" class="load-more">
          <button class="button button-outline" @click="limit += PAGE">
            加载更多（剩余 {{ filtered.length - limit }} 场）
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* ---- filters ---- */
.filter-bar { display: flex; align-items: end; flex-wrap: wrap; gap: 16px; }
.filter-bar label { display: grid; gap: 8px; flex: 0 1 220px; color: var(--brand-navy); font-weight: 600; font-size: 0.9rem; }
.filter-bar select {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%2303207b' stroke-width='1.6'/%3E%3C/svg%3E") right 16px center / 12px no-repeat;
  appearance: none;
  color: var(--brand-navy);
  font: inherit;
  cursor: pointer;
}
.filter-reset {
  padding: 12px 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--brand-blue);
  font-weight: 600;
  cursor: pointer;
}
.filter-reset:disabled { color: #a5b0bd; cursor: default; }
.filter-count { margin: 0 0 12px auto; font-size: 0.9rem; }

/* ---- empty / error state ---- */
.filter-notice {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 28px;
  padding: 18px 22px;
  background: var(--pale);
  color: var(--muted);
  border-radius: var(--radius);
}

/* ---- results ---- */
.event-grid { margin-top: 28px; }
.load-more { display: flex; justify-content: center; margin-top: 40px; }

.skeleton {
  min-height: 340px;
  border-radius: var(--radius);
  background: linear-gradient(100deg, var(--pale) 30%, #fff 50%, var(--pale) 70%) 0 0 / 300% 100%;
  animation: shimmer 1.4s linear infinite;
}
@keyframes shimmer { to { background-position: -150% 0; } }

@media (max-width: 760px) {
  .filter-bar { gap: 12px; }
  .filter-bar label { flex: 1 1 calc(50% - 6px); }
  .filter-count { margin: 0; flex-basis: 100%; }
}
</style>
