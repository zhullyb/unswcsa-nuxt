// https://nuxt.com/docs/api/configuration/nuxt-config
// Server-rendered (SSR): run `pnpm build`, then `node .output/server/index.mjs`.
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/robots', '@nuxtjs/sitemap', 'nuxt-schema-org', 'nuxt-seo-utils'],
  devtools: { enabled: false },
  app: {
    // The hero lives in the layout and stays put; only the page body fades.
    pageTransition: { name: 'page', mode: 'out-in' },
    // <html lang>, the title template (`页面 · 新南学联`), canonical URL and default
    // description / Open Graph tags come from nuxt-seo-utils, driven by `site` below.
    head: {
      templateParams: { separator: '·' },
      meta: [
        { name: 'theme-color', content: '#03207b' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preload', as: 'image', type: 'image/svg+xml', href: '/brand/patterns/landscape.svg' },
      ],
    },
  },
  css: ['~/assets/css/tokens.css', '~/assets/css/base.css', '~/assets/css/ui.css'],
  // Shared by the SEO modules (canonical / og:url, sitemap, robots.txt, Schema.org).
  // Set NUXT_SITE_URL when deploying to another domain; non-production deployments
  // can set NUXT_SITE_ENV=staging (or NUXT_SITE_INDEXABLE=false) to block crawlers.
  site: {
    url: 'https://unswcsa.com',
    name: '新南学联',
    description: '新南威尔士大学中国学生学者联谊会（UNSWCSA）成立于 1992 年，陪伴中国留学生在 UNSW 的学习与生活 —— 家，因为有你。',
    defaultLocale: 'zh-CN',
  },
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
    // Placeholder back office: keep it out of search results and the sitemap.
    '/admin': { prerender: true, robots: false },
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    // Formatting rules via ESLint Stylistic instead of Prettier, tuned to the existing code style.
    config: { stylistic: { arrowParens: true, braceStyle: '1tbs' } },
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: '新南威尔士大学中国学生学者联谊会',
      alternateName: '新南学联 UNSWCSA',
      logo: '/brand/logos/unswcsa-horizontal.webp',
      foundingDate: '1992',
      sameAs: [
        'https://www.instagram.com/unswcsa/',
        'https://www.xiaohongshu.com/user/profile/6421819f0000000012011907',
      ],
    },
  },
  // sitemap.xml lists the public pages automatically: dynamic routes (/activities/[id]) are
  // skipped, and /admin is left out because of its `robots: false` route rule.
})
