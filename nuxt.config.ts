// https://nuxt.com/docs/api/configuration/nuxt-config
// Built as a static site (SSG): run `npm run generate`, deploy `.output/public`.
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/tokens.css', '~/assets/css/base.css', '~/assets/css/ui.css'],
  app: {
    // The hero lives in the layout and stays put; only the page body fades.
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { name: 'description', content: '新南威尔士大学中国学生学者联谊会（UNSWCSA）— 家，因为有你。' },
        { name: 'theme-color', content: '#03207b' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preload', as: 'image', type: 'image/svg+xml', href: '/brand/patterns/landscape.svg' },
      ],
    },
  },
  runtimeConfig: {
    // Upstream feed read at build time; override with NUXT_EVENTS_SOURCE
    eventsSource: 'https://unswcsa.com/api/events',
  },
  // Legacy URLs. Exact paths are prerendered as static redirect pages; deeper paths
  // (e.g. /brand-events/foo) fall back to 404.html and are redirected by the client router.
  routeRules: {
    '/brand-events': { redirect: '/activities' },
    '/brand-events/**': { redirect: '/activities' },
    '/departments': { redirect: '/team' },
    '/leaders': { redirect: '/team' },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/api/events.json', '/admin', '/brand-events', '/departments', '/leaders'],
    },
  },
})
