import type { CsaEvent } from '~~/server/api/events.json.get'

export type { CsaEvent }
export type EventState = 'upcoming' | 'ongoing' | 'ended' | 'cancelled'

export const TZ = 'Australia/Sydney'

export const stateLabels: Record<EventState, string> = {
  upcoming: '即将举行',
  ongoing: '进行中',
  ended: '已结束',
  cancelled: '已取消',
}

const ymFmt = new Intl.DateTimeFormat('en', { timeZone: TZ, year: 'numeric', month: 'numeric' })
const dateFmt = new Intl.DateTimeFormat('zh-CN', { timeZone: TZ, dateStyle: 'medium', timeStyle: 'short' })
const dayFmt = new Intl.DateTimeFormat('en', { timeZone: TZ, day: '2-digit' })
const monFmt = new Intl.DateTimeFormat('zh-CN', { timeZone: TZ, month: 'short' })

export function yearMonth(e: CsaEvent) {
  const p = ymFmt.formatToParts(new Date(e.start))
  return {
    year: Number(p.find((x) => x.type === 'year')!.value),
    month: Number(p.find((x) => x.type === 'month')!.value),
  }
}

export const formatDate = (iso: string) => dateFmt.format(new Date(iso))
export const formatDay = (iso: string) => dayFmt.format(new Date(iso))
export const formatMonth = (iso: string) => monFmt.format(new Date(iso))

export function eventState(e: CsaEvent, now: number): EventState {
  if (e.status === 'canceled') return 'cancelled'
  if (e.status === 'ended' || e.status === 'completed' || now >= Date.parse(e.end)) return 'ended'
  if (now >= Date.parse(e.start)) return 'ongoing'
  return 'upcoming'
}

/**
 * Events are fetched at build time (`nuxt generate` prerenders /api/events.json and
 * embeds the data in each page's payload), so nothing is requested from the upstream
 * at runtime. Updating the event list means rebuilding the site.
 */
export function useEvents() {
  const { data, status, error, refresh } = useFetch<{ events: CsaEvent[] }>('/api/events.json', {
    key: 'csa-events',
    default: () => ({ events: [] }),
  })

  // `now` starts at the build time so hydration matches the prerendered HTML,
  // then switches to the real time once mounted (updating 即将举行 / 已结束 badges).
  const now = useState('csa-now', () => Date.now())

  if (import.meta.client) {
    let tick: ReturnType<typeof setInterval>
    onMounted(() => {
      now.value = Date.now()
      tick = setInterval(() => (now.value = Date.now()), 15_000)
    })
    onBeforeUnmount(() => clearInterval(tick))
  }

  const events = computed(() => data.value?.events ?? [])
  return { events, status, error, refresh, now }
}

/** True only after hydration. Use it to gate anything that depends on the URL query,
 *  since prerendered HTML is always generated without a query string. */
export function useHydrated() {
  const hydrated = ref(false)
  onMounted(() => (hydrated.value = true))
  return hydrated
}
