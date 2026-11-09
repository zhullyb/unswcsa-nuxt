<script setup lang="ts">
import { navItems } from '~/data/site'

const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)
const toggleRef = ref<HTMLButtonElement>()

watch(() => route.path, () => (menuOpen.value = false))

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
    toggleRef.value?.focus()
  }
}
const onScroll = () => (scrolled.value = window.scrollY > 8)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const isActive = (path: string) => (path === '/' ? route.path === '/' : route.path.startsWith(path))
</script>

<template>
  <header class="site-header" :class="{ scrolled }" @keydown="onKey">
    <div class="header-inner container">
      <NuxtLink class="logo-link" to="/" aria-label="新南学联首页">
        <img src="/brand/logos/unswcsa-horizontal.webp" alt="新南学联 UNSWCSA" width="700" height="193">
      </NuxtLink>
      <button
        ref="toggleRef"
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
        :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
        @click="menuOpen = !menuOpen"
      >
        <span class="burger" :class="{ open: menuOpen }" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <nav id="primary-navigation" class="primary-nav" :class="{ 'is-open': menuOpen }" aria-label="主导航">
        <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path" :class="{ active: isActive(item.path) }">
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgb(255 255 255 / 0.9);
  backdrop-filter: saturate(1.6) blur(14px);
  -webkit-backdrop-filter: saturate(1.6) blur(14px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.site-header.scrolled { border-bottom-color: var(--line); box-shadow: 0 6px 24px rgb(3 32 123 / 0.06); }

.header-inner {
  min-height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
.logo-link { display: block; flex-shrink: 0; line-height: 0; }
.logo-link img { display: block; width: 210px; height: auto; }

/* Nav tabs: original site style (text + red underline on hover/active) */
.primary-nav { display: flex; gap: 28px; align-items: center; }
.primary-nav a {
  text-decoration: none;
  color: var(--brand-navy);
  font-weight: 600;
  white-space: nowrap;
  padding: 18px 0;
  position: relative;
}
.primary-nav a::after {
  position: absolute;
  content: '';
  height: 3px;
  bottom: 8px;
  left: 0;
  right: 0;
  background: transparent;
  transition: background-color 0.15s ease;
}
.primary-nav a.active::after,
.primary-nav a:hover::after { background: var(--brand-red); }

.menu-toggle { display: none; }

@keyframes menu-in {
  from { opacity: 0; transform: translateY(-6px); }
}

@media (max-width: 1050px) {
  .primary-nav { gap: 17px; font-size: 0.9rem; }
  .logo-link img { width: 176px; }
}

@media (max-width: 760px) {
  .header-inner { flex-wrap: wrap; gap: 0; position: relative; }
  .logo-link img { width: 150px; }

  .menu-toggle {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line);
    border-radius: var(--radius-sm);
    background: #fff;
    cursor: pointer;
  }
  .burger { display: grid; gap: 5px; width: 20px; }
  .burger i { display: block; height: 2px; background: var(--brand-navy); border-radius: 2px; transition: transform 0.2s, opacity 0.2s; }
  .burger.open i:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger.open i:nth-child(2) { opacity: 0; }
  .burger.open i:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* dropdown overlays the page instead of pushing it down */
  .primary-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: -16px;
    right: -16px;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0 16px 12px;
    background: #fff;
    border-bottom: 1px solid var(--line);
    box-shadow: 0 16px 32px rgb(3 32 123 / 0.12);
  }
  .primary-nav.is-open { display: flex; animation: menu-in 0.18s var(--ease) both; }
  .primary-nav a { padding: 12px 8px; border-top: 1px solid var(--line); font-size: 1rem; }
  .primary-nav a::after { left: 8px; right: auto; width: 28px; bottom: 5px; }
}
</style>
