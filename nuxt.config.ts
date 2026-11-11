// https://nuxt.com/docs/api/configuration/nuxt-config
// Server-rendered (SSR): run `pnpm build`, then `node .output/server/index.mjs`.
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: false },
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
  css: ['~/assets/css/tokens.css', '~/assets/css/base.css', '~/assets/css/ui.css'],
  runtimeConfig: {
    // Upstream feed fetched by the server at request time (cached); override with NUXT_EVENTS_SOURCE
    eventsSource: 'https://unswcsa.com/api/events',
  },
  routeRules: {
    // Legacy URLs, answered by the server with permanent redirects.
    '/brand-events': { redirect: { to: '/activities', statusCode: 301 } },
    '/brand-events/**': { redirect: { to: '/activities', statusCode: 301 } },
    '/activities/:id': { redirect: { to: '/activities', statusCode: 301 } },
    '/departments': { redirect: { to: '/team', statusCode: 301 } },
    '/leaders': { redirect: { to: '/team', statusCode: 301 } },
    // Pages with no live data or query-dependent content are prerendered at build time
    // and served as static files; everything else is rendered per request.
    '/about': { prerender: true },
    '/join': { prerender: true },
    '/admin': { prerender: true },
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    // Formatting rules via ESLint Stylistic instead of Prettier, tuned to the existing code style.
    config: { stylistic: { arrowParens: true, braceStyle: '1tbs' } },
  },
})
