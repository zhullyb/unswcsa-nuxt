export interface CsaEvent {
  id: string
  title: string
  summary: string
  url: string
  image: string | null
  start: string
  end: string
  hideStart: boolean
  hideEnd: boolean
  status: 'live' | 'started' | 'ended' | 'completed' | 'canceled'
  venue: string
}

const isIso = (d: unknown): d is string =>
  typeof d === 'string' && /(?:Z|[+-]\d{2}:\d{2})$/.test(d) && Number.isFinite(Date.parse(d))

const isHttps = (u: unknown): u is string => {
  if (typeof u !== 'string') return false
  try {
    const url = new URL(u)
    return url.protocol === 'https:' && !url.username && !url.password
  } catch {
    return false
  }
}

const isEventbrite = (u: unknown): u is string =>
  isHttps(u) && /(^|\.)eventbrite\.(com|com\.au)$/.test(new URL(u).hostname)

const STATUSES: readonly unknown[] = ['live', 'started', 'ended', 'completed', 'canceled'] satisfies CsaEvent['status'][]
const isStatus = (s: unknown): s is CsaEvent['status'] => STATUSES.includes(s)

function sanitize(raw: unknown): CsaEvent[] {
  const items: unknown = raw && typeof raw === 'object' && 'events' in raw ? raw.events : undefined
  if (!Array.isArray(items)) {
    throw new Error('Invalid events payload')
  }
  const seen = new Set<string>()
  const out: CsaEvent[] = []
  for (const item of items as unknown[]) {
    const e = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>
    if (typeof e.id !== 'string' || !/^\d+$/.test(e.id) || seen.has(e.id)
      || typeof e.title !== 'string' || !e.title.trim()
      || !isEventbrite(e.url) || !isIso(e.start) || !isIso(e.end)
      || Date.parse(e.end) < Date.parse(e.start)
      || !isStatus(e.status)
      || !(e.image === null || isHttps(e.image))
    ) continue
    seen.add(e.id)
    out.push({
      id: e.id,
      title: e.title.trim(),
      summary: typeof e.summary === 'string' ? e.summary.trim() : '',
      url: e.url,
      image: e.image,
      start: e.start,
      end: e.end,
      hideStart: Boolean(e.hideStart),
      hideEnd: Boolean(e.hideEnd),
      status: e.status,
      venue: typeof e.venue === 'string' ? e.venue : '',
    })
  }
  return out.sort((a, b) => Date.parse(b.start) - Date.parse(a.start))
}

type Payload = { events: CsaEvent[], fetchedAt: string }

// Last successful payload. Kept in memory and persisted to Nitro's `data` storage
// (`.data/kv` on disk), so a server restart during an upstream outage can
// still serve the most recent snapshot instead of an empty page.
const SNAPSHOT_KEY = 'events:snapshot'
let lastGood: Payload | null = null
let lastWarning = ''

async function fromUpstream(source: string): Promise<Payload> {
  // Native fetch (with happy-eyeballs) is more reliable than ofetch on hosts with broken IPv6.
  const res = await fetch(source, {
    signal: AbortSignal.timeout(10_000),
    headers: { accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`Upstream responded ${res.status}`)
  return { events: sanitize(await res.json()), fetchedAt: new Date().toISOString() }
}

export default defineCachedEventHandler(
  async (event) => {
    const { eventsSource } = useRuntimeConfig()
    const storage = useStorage('data')
    try {
      lastGood = await fromUpstream(eventsSource)
      lastWarning = ''
      await storage.setItem(SNAPSHOT_KEY, lastGood).catch(() => {})
      return lastGood
    } catch (err) {
      const fallback = lastGood ?? (await storage.getItem<Payload>(SNAPSHOT_KEY).catch(() => null))
      const reason = err instanceof Error ? (err.cause instanceof Error ? err.cause.message : err.message) : String(err)
      if (reason !== lastWarning) {
        // one line per distinct failure instead of a stack trace on every revalidation
        console.warn(`[events] upstream unavailable (${reason}); ${fallback ? `serving snapshot from ${fallback.fetchedAt}` : 'no snapshot available'}`)
        lastWarning = reason
      }
      if (fallback?.events?.length) return (lastGood = fallback)
      // Respond with 502 instead of throwing: the reason is already logged above, and a
      // thrown error would print a full stack trace for every request. (>= 400 is never cached.)
      setResponseStatus(event, 502, 'Events unavailable')
      return { events: [], error: 'Events unavailable' }
    }
  },
  {
    maxAge: 60,
    swr: true,
    name: 'csa-events',
  },
)
