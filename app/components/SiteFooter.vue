<script setup lang="ts">
import { navItems, socials } from '~/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-top">
      <div>
        <p class="footer-name">新南学联</p>
        <p class="footer-abbreviation">UNSWCSA</p>
        <p class="official-name">
          新南威尔士大学中国学生学者联谊会<br>
          University of New South Wales Chinese Student Association
        </p>
      </div>
      <div class="footer-cols">
        <nav aria-label="页脚导航">
          <p class="footer-label">导航</p>
          <NuxtLink v-for="item in navItems.slice(1)" :key="item.path" :to="item.path">{{ item.label }}</NuxtLink>
        </nav>
        <div>
          <p class="footer-label">关注我们</p>
          <template v-for="(s, i) in socials" :key="s.name">
            <a v-if="s.url" :href="s.url" target="_blank" rel="noopener noreferrer">{{ s.name }}</a>
            <template v-else>
              <button
                class="qr-trigger"
                type="button"
                :popovertarget="`footer-qr-${i}`"
                :style="{ anchorName: `--footer-qr-${i}` }"
              >
                {{ s.name }}
              </button>
              <div
                :id="`footer-qr-${i}`"
                class="qr-popover"
                popover
                :style="{ positionAnchor: `--footer-qr-${i}` }"
              >
                <img :src="s.qr" :alt="`${s.name}二维码`" width="180" height="180" loading="lazy">
                <p>{{ s.scanWith ? `${s.scanWith}扫码关注` : '扫码关注' }}</p>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© {{ year }} UNSWCSA · 家，因为有你</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  background: var(--brand-navy);
  color: #fff;
  padding: 56px 0 28px;
}
.site-footer::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 4px;
  background: linear-gradient(90deg, var(--brand-red) 0 33%, var(--brand-sky) 33% 66%, var(--brand-blue) 66%);
}

.footer-top { display: flex; justify-content: space-between; gap: 50px; padding-bottom: 36px; }
.footer-name { font-size: 1.65rem; font-weight: 700; margin: 0; }
.footer-abbreviation { letter-spacing: 0.3em; font-size: 0.85rem; margin: 4px 0 20px; color: var(--brand-sky); }
.official-name { font-size: 0.82rem; color: #dbe5fb; max-width: 470px; margin-bottom: 0; }

.footer-cols { display: flex; gap: 72px; }
.footer-cols > * { display: flex; flex-direction: column; gap: 4px; }
.footer-label { font-size: 0.75rem; letter-spacing: 0.16em; color: var(--brand-sky); font-weight: 700; margin-bottom: 8px; }

.site-footer a,
.qr-trigger { color: #fff; text-decoration: none; padding: 3px 0; opacity: 0.88; transition: opacity 0.15s; }
.site-footer a:hover,
.qr-trigger:hover { opacity: 1; text-decoration: underline; }
.site-footer a:focus-visible,
.qr-trigger:focus-visible { outline-color: #fff; }
.qr-trigger { align-self: flex-start; border: 0; background: none; font: inherit; text-align: left; cursor: pointer; }

/* QR popover (native Popover API: light-dismiss and Esc for free).
   Fallback: centered over a dimmed page. With CSS anchor positioning: above its link. */
.qr-popover {
  width: 212px;
  padding: 16px 16px 12px;
  border: 0;
  border-radius: var(--radius);
  background: #fff;
  color: var(--ink);
  box-shadow: var(--shadow-md);
  text-align: center;
}
.qr-popover::backdrop { background: rgb(7 25 85 / 0.4); }
.qr-popover img { display: block; width: 180px; height: 180px; }
.qr-popover p { margin: 8px 0 0; font-size: 0.85rem; color: var(--muted); }

@supports (anchor-name: --a) {
  .qr-popover {
    inset: auto;
    bottom: anchor(top);
    left: anchor(left);
    margin: 0 0 10px;
    position-try-fallbacks: flip-block, flip-inline;
  }
  .qr-popover::backdrop { background: transparent; }
}

.footer-bottom { border-top: 1px solid #2b4691; padding-top: 22px; font-size: 0.78rem; color: #b9c8ee; }
.footer-bottom p { margin: 0; }

@media (max-width: 1050px) {
  .footer-top { flex-direction: column; gap: 32px; }
}

@media (max-width: 760px) {
  .footer-cols { gap: 48px; }
}
</style>
