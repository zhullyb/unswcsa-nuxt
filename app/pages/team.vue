<script setup lang="ts">
import { teams } from '~/data/site'

definePageMeta({ hero: { title: '部门与团队', subtitle: '六个部门，一个家' } })
useSeoMeta({
  title: '部门与团队',
  description: '新南学联设有外联部、新媒体部、技术部、策划部、文体部和职规部六个部门。认识各部门的工作内容与历届主席团成员。',
})

const route = useRoute()
const router = useRouter()

const year = computed(() => {
  const q = route.query.year
  return typeof q === 'string' && /^[1-9]\d{3}$/.test(q) ? q : ''
})
const team = computed(() => teams.find((t) => t.year === (year.value || teams[0]!.year)))

function pick(y: string) {
  router.replace({ query: { ...route.query, year: y } })
}
</script>

<template>
  <div>
    <div class="container page-body">
      <section class="page-section">
        <h2 data-en="DEPARTMENTS">部门介绍</h2>
        <DepartmentGrid />
      </section>

      <section class="page-section">
        <div class="section-heading">
          <h2 data-en="LEADERSHIP">{{ team ? `${team.year} 管理层` : '团队档案' }}</h2>
          <div class="segmented" role="group" aria-label="团队年份">
            <button
              v-for="t in teams"
              :key="t.year"
              :aria-pressed="team?.year === t.year"
              @click="pick(t.year)"
            >
              {{ t.year }}
            </button>
          </div>
        </div>
        <p class="muted" role="status">
          {{ team ? `${team.term} 届 · 共 ${team.members.length} 位成员` : '暂无该年份的团队资料，请选择 2025 或 2026。' }}
        </p>
        <Transition name="fade" mode="out-in">
          <div v-if="team" :key="team.year" class="member-grid">
            <article v-for="m in team.members" :key="m.name" class="member-card">
              <div class="member-photo">
                <img :src="m.photo" :alt="`${m.name}的照片`" loading="lazy" width="480" height="480">
              </div>
              <h3>{{ m.name }}</h3>
              <p>{{ m.role }}</p>
            </article>
          </div>
        </Transition>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ---- year switch ---- */
.segmented { display: inline-flex; padding: 4px; background: var(--pale); border-radius: 999px; gap: 4px; }
.segmented button {
  padding: 8px 24px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--brand-navy);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}
.segmented button[aria-pressed='true'] { background: var(--brand-red); color: #fff; box-shadow: var(--shadow-sm); }

/* ---- members ---- */
.member-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; margin-top: 24px; }
.member-card { text-align: center; }
.member-photo {
  aspect-ratio: 1;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--pale-2);
  margin-bottom: 14px;
}
.member-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transform: scale(1.04); /* hides the rounded/transparent corners baked into some source photos */
  transition: transform 0.4s var(--ease);
}
.member-card:hover .member-photo img { transform: scale(1.1); }
.member-card h3 { font-size: 1.05rem; margin-bottom: 2px; }
.member-card p { margin: 0; color: var(--muted); font-size: 0.9rem; }

/* year switch animation */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; transform: translateY(6px); }

@media (max-width: 1050px) {
  .member-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (max-width: 760px) {
  .member-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
}
</style>
