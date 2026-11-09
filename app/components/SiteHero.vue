<script setup lang="ts">
import type { HeroMeta } from '~/types/page-meta'

// Lives in the layout, so the band stays mounted across navigations;
// only the text inside cross-fades.
defineProps<{ hero: HeroMeta; routeKey: string }>()
</script>

<template>
  <section class="site-hero" aria-labelledby="page-heading">
    <div class="hero-art" aria-hidden="true" />
    <div class="container site-hero-inner">
      <div class="hero-panel">
        <Transition name="hero-swap" mode="out-in">
          <div :key="routeKey" class="hero-panel-content">
            <p class="eyebrow">{{ hero.eyebrow ?? 'UNSWCSA' }}</p>
            <h1 id="page-heading">{{ hero.title }}</h1>
            <p v-if="hero.subtitle" class="hero-subtitle">{{ hero.subtitle }}</p>
            <p v-if="hero.note" class="hero-note">{{ hero.note }}</p>
            <div v-if="hero.actions?.length" class="hero-actions">
              <NuxtLink
                v-for="a in hero.actions"
                :key="a.label"
                class="button"
                :class="{ 'button-red': a.variant === 'red', 'button-ghost': a.variant === 'ghost' }"
                :to="a.to"
              >
                {{ a.label }} <span aria-hidden="true">{{ a.icon ?? '↗' }}</span>
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Full-bleed illustration under a navy gradient, white text on the left.
   Same fixed height on every page, so navigating only swaps the text. */
.site-hero {
  --hero-h: 360px;
  --hero-pad-top: 76px;
  position: relative;
  height: var(--hero-h);
  overflow: hidden;
  isolation: isolate;
  background: var(--brand-navy);
}
.hero-art {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--brand-sky) url(/brand/patterns/landscape.svg) center 42% / cover no-repeat;
}
.hero-art::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgb(3 32 123 / 0.94) 0%, rgb(3 32 123 / 0.82) 34%, rgb(3 32 123 / 0.25) 70%, rgb(3 32 123 / 0) 100%),
    linear-gradient(0deg, rgb(3 32 123 / 0.25), transparent 40%);
}
.site-hero-inner { height: 100%; padding-top: var(--hero-pad-top); }
.hero-panel { max-width: 560px; }

.eyebrow { color: var(--brand-sky); }
h1 { color: #fff; font-size: clamp(2.4rem, 4.6vw, 3.4rem); margin-bottom: 10px; }
.hero-subtitle { color: rgb(255 255 255 / 0.82); font-size: 1.15rem; margin-bottom: 4px; }
.hero-note { color: rgb(255 255 255 / 0.82); font-size: 0.9rem; margin-bottom: 0; }

.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
.hero-actions .button:not(.button-red):not(.button-ghost) { background: #fff; color: var(--brand-navy); }
.hero-actions .button:not(.button-red):not(.button-ghost):hover { background: var(--pale); }
.hero-actions .button-ghost { color: #fff; border-color: rgb(255 255 255 / 0.7); }
.hero-actions .button-ghost:hover { background: #fff; color: var(--brand-navy); }

/* text swap when navigating between pages */
.hero-swap-enter-active,
.hero-swap-leave-active { transition: opacity 0.16s ease, transform 0.16s ease; }
.hero-swap-enter-from { opacity: 0; transform: translateY(6px); }
.hero-swap-leave-to { opacity: 0; }

@media (max-width: 760px) {
  .site-hero { --hero-h: 288px; --hero-pad-top: 44px; }
  .hero-art { background-position: 64% center; }
  .hero-art::after {
    background: linear-gradient(90deg, rgb(3 32 123 / 0.92) 0%, rgb(3 32 123 / 0.78) 60%, rgb(3 32 123 / 0.45) 100%);
  }
  h1 { font-size: 2.4rem; }
  .hero-subtitle { font-size: 1rem; }
  .hero-actions { margin-top: 18px; gap: 10px; }
  .hero-actions .button { gap: 16px; padding: 11px 18px; }
}
</style>
