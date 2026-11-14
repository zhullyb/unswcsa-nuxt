<script setup lang="ts">
import { introText, featuredHonors, socials } from '~/data/site'

definePageMeta({
  hero: {
    eyebrow: 'UNSWCSA · SINCE 1992',
    title: '新南学联',
    subtitle: '家，因为有你',
    actions: [
      { label: '了解我们', to: '/about' },
      { label: '近期活动', to: '/activities', icon: '→', variant: 'ghost' },
    ],
  },
})
useSeoMeta({
  // The home page leads with the brand instead of `首页 · 新南学联`.
  title: '新南学联 UNSWCSA',
  titleTemplate: '%s · 新南威尔士大学中国学生学者联谊会',
  description: '新南威尔士大学中国学生学者联谊会（UNSWCSA）官网：了解学联、查看近期活动、关注我们的社交账号。成立于 1992 年 —— 家，因为有你。',
})

const { events, now } = useEvents()
const latest = computed(() => events.value.slice(0, 3))
</script>

<template>
  <div>
    <div class="container">
      <div class="intro-grid">
        <section aria-labelledby="intro-heading">
          <h2 id="intro-heading" data-en="INTRODUCTION">学联简介</h2>
          <p class="muted lead">{{ introText }}</p>
          <NuxtLink class="text-link" to="/about">阅读更多 →</NuxtLink>
        </section>
        <section aria-labelledby="honors-heading">
          <h2 id="honors-heading" data-en="HONOURS">荣誉与影响力</h2>
          <HonorList :items="featuredHonors" />
        </section>
      </div>

      <figure class="group-photo">
        <img
          src="/images/group.webp"
          srcset="/images/group-1200.webp 1200w, /images/group.webp 2400w"
          sizes="(max-width: 1248px) 100vw, 1200px"
          alt="新南学联合照"
          width="2400"
          height="1600"
          loading="lazy"
        >
        <figcaption>2025 新州留学人员国庆中秋晚会</figcaption>
      </figure>
    </div>

    <section v-if="latest.length" class="container latest-section" aria-labelledby="latest-heading">
      <div class="section-heading">
        <h2 id="latest-heading" data-en="LATEST EVENTS">最新活动</h2>
        <NuxtLink class="text-link" to="/activities">查看全部活动 →</NuxtLink>
      </div>
      <div class="three-grid">
        <EventCard v-for="e in latest" :key="e.id" :event="e" :now="now" compact />
      </div>
    </section>

    <section class="join-strip" aria-labelledby="join-heading">
      <div class="container join-inner">
        <div>
          <p class="eyebrow">JOIN UNSWCSA</p>
          <h2 id="join-heading">加入我们</h2>
          <p class="muted">和我们一起把想法变成现实，在参与和协作中找到属于你的校园连接。</p>
        </div>
        <NuxtLink class="button button-red" to="/join">了解招新 <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </section>

    <section class="container social-section" aria-labelledby="social-heading">
      <div class="section-heading">
        <h2 id="social-heading" data-en="FOLLOW US">关注我们</h2>
        <p class="muted">扫码关注我们，点击二维码可查看原图</p>
      </div>
      <ul class="social-grid">
        <li v-for="s in socials" :key="s.name">
          <a :href="s.qr" target="_blank" rel="noopener noreferrer" :aria-label="`查看${s.name}二维码原图（新窗口）`">
            <img :src="s.qr" :alt="`${s.name}关注二维码`" width="190" height="190" loading="lazy">
          </a>
          <span>{{ s.name }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
/* ---- intro + honours ---- */
.intro-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 72px; padding: 56px 0 72px; }
.intro-grid section + section { border-left: 1px solid var(--line); padding-left: 64px; }

/* ---- group photo ---- */
.group-photo { position: relative; margin: 0 0 80px; border-radius: var(--radius); overflow: hidden; background: var(--pale-2); }
.group-photo img { display: block; width: 100%; height: auto; aspect-ratio: 2 / 1; object-fit: cover; object-position: center 60%; }
.group-photo figcaption {
  position: absolute;
  left: 20px;
  bottom: 20px;
  padding: 6px 14px;
  background: rgb(3 32 123 / 0.82);
  color: #fff;
  font-size: 0.85rem;
  border-radius: 999px;
  backdrop-filter: blur(4px);
}

.latest-section { padding-bottom: 80px; }

/* ---- join call-to-action ---- */
.join-strip {
  background:
    radial-gradient(circle at 92% 20%, rgb(123 196 236 / 0.35), transparent 40%),
    var(--pale);
  padding: 64px 0;
}
.join-inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; }
.join-inner p:last-child { margin-bottom: 0; }

/* ---- social QR codes ---- */
.social-section { padding-top: 72px; padding-bottom: 88px; }
.social-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.social-grid li {
  background: var(--pale);
  border-radius: var(--radius);
  padding: 24px 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: var(--brand-navy);
  font-weight: 600;
  transition: transform 0.2s var(--ease), box-shadow 0.2s;
}
.social-grid li:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.social-grid a { display: block; max-width: 100%; background: #fff; padding: 10px; border-radius: var(--radius-sm); }
.social-grid img { display: block; width: 190px; height: auto; aspect-ratio: 1; object-fit: contain; max-width: 100%; }

@media (max-width: 1050px) {
  .intro-grid { gap: 48px; }
  .intro-grid section + section { padding-left: 48px; }
}

@media (max-width: 760px) {
  .intro-grid { grid-template-columns: 1fr; gap: 36px; padding: 36px 0 48px; }
  .intro-grid section + section { border-left: 0; border-top: 1px solid var(--line); padding: 36px 0 0; }
  .group-photo { margin-bottom: 48px; }
  .group-photo figcaption { left: 10px; bottom: 10px; font-size: 0.72rem; }
  .latest-section { padding-bottom: 48px; }
  .join-strip { padding: 44px 0; }
  .join-inner { align-items: flex-start; flex-direction: column; gap: 20px; }
  .social-section { padding-block: 48px; }
  .social-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .social-grid li { padding: 16px 10px; }
}
</style>
