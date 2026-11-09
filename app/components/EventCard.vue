<script setup lang="ts">
import type { CsaEvent } from '~/composables/useEvents'

const props = defineProps<{ event: CsaEvent; now: number; compact?: boolean }>()
const state = computed(() => eventState(props.event, props.now))
const imgFailed = ref(false)
</script>

<template>
  <article class="event-card" :class="{ compact }">
    <a class="event-cover" :href="event.url" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
      <img
        v-if="event.image && !imgFailed"
        :src="event.image"
        alt=""
        loading="lazy"
        @error="imgFailed = true"
      >
      <div v-else class="cover-fallback">
        <img src="/brand/logos/unswcsa-horizontal.webp" alt="">
      </div>
      <span class="event-badge" :class="`status-${state}`">{{ stateLabels[state] }}</span>
      <time v-if="!event.hideStart" class="event-date" :datetime="event.start">
        <strong>{{ formatDay(event.start) }}</strong>
        <span>{{ formatMonth(event.start) }}</span>
      </time>
    </a>
    <div class="event-body">
      <h3 class="event-title">
        <a :href="event.url" target="_blank" rel="noopener noreferrer">
          {{ event.title }}<span class="sr-only">（Eventbrite，新窗口打开）</span>
        </a>
      </h3>
      <dl class="event-meta">
        <div>
          <dt>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            <span class="sr-only">悉尼时间</span>
          </dt>
          <dd>
            {{ event.hideStart ? '开始时间待公布' : formatDate(event.start) }}<template v-if="!event.hideEnd && !compact"> — {{ formatDate(event.end) }}</template>
          </dd>
        </div>
        <div>
          <dt>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
            <span class="sr-only">地点</span>
          </dt>
          <dd>{{ event.venue || '地点待公布' }}</dd>
        </div>
      </dl>
      <p v-if="!compact" class="muted event-summary">{{ event.summary || '完整活动介绍请查看 Eventbrite。' }}</p>
      <a v-if="!compact" class="text-link event-link" :href="event.url" target="_blank" rel="noopener noreferrer">
        前往 Eventbrite <span aria-hidden="true">↗</span><span class="sr-only">（新窗口打开）</span>
      </a>
    </div>
  </article>
</template>

<style scoped>
.event-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  min-width: 0;
  transition: transform 0.2s var(--ease), box-shadow 0.2s;
}
.event-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }

/* ---- cover ---- */
.event-cover { position: relative; display: block; aspect-ratio: 9 / 4; background: var(--pale-2); overflow: hidden; }
.event-cover > img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s var(--ease); }
.event-card:hover .event-cover > img { transform: scale(1.04); }
.cover-fallback { width: 100%; height: 100%; display: grid; place-items: center; background: var(--pale); }
.cover-fallback img { width: 52%; opacity: 0.5; }

.event-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 3px 12px;
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: 999px;
  color: #fff;
}
.status-upcoming { background: var(--brand-red); }
.status-ongoing { background: var(--brand-blue); }
.status-ended { background: rgb(38 48 64 / 0.75); backdrop-filter: blur(4px); }
.status-cancelled { background: #8a3643; }

.event-date {
  position: absolute;
  right: 14px;
  bottom: -1px;
  background: #fff;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  padding: 6px 12px 4px;
  text-align: center;
  line-height: 1.1;
  color: var(--brand-navy);
}
.event-date strong { display: block; font-size: 1.35rem; }
.event-date span { font-size: 0.72rem; color: var(--muted); }

/* ---- body ---- */
.event-body { padding: 20px 22px 22px; display: flex; flex-direction: column; flex: 1; }
.event-title { font-size: 1.1rem; margin-bottom: 12px; overflow-wrap: anywhere; }
.event-title a { color: var(--brand-navy); text-decoration: none; }
.event-title a:hover { color: var(--brand-blue); }

.event-meta { margin: 0 0 12px; display: grid; gap: 6px; font-size: 0.88rem; color: var(--muted); }
.event-meta div { display: flex; gap: 10px; align-items: flex-start; }
.event-meta dt { flex-shrink: 0; padding-top: 3px; }
.event-meta dd { margin: 0; min-width: 0; overflow-wrap: anywhere; }
.event-meta svg {
  display: block;
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--brand-red);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.event-summary {
  font-size: 0.92rem;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
}
.event-link { margin-top: auto; align-self: flex-start; }

.compact .event-meta { margin-bottom: 0; }
</style>
