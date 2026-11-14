<script setup lang="ts">
import { introText, missions, history, honors } from '~/data/site'

definePageMeta({
  hero: {
    title: '关于我们',
    subtitle: '新南威尔士大学中国学生学者联谊会',
    note: 'University of New South Wales Chinese Student Association',
  },
})
useSeoMeta({
  title: '关于我们',
  description: '新南学联成立于 1992 年，致力于陪伴新生融入、支持学业与职业发展、连接文化与校园生活、关注学生福祉。了解我们的使命、历程与荣誉。',
})
</script>

<template>
  <div>
    <div class="container page-body">
      <section class="page-section">
        <h2 data-en="WHO WE ARE">学联定位</h2>
        <p class="muted lead narrow">{{ introText }}</p>
      </section>

      <section class="page-section">
        <h2 data-en="VISION &amp; MISSION">愿景与使命</h2>
        <p class="muted narrow">家，因为有你。我们希望学联成为同学们可以相遇、参与和找到归属的地方，让支持贯穿从入学适应到未来发展的不同阶段。</p>
        <div class="two-grid">
          <article v-for="m in missions" :key="m.title" class="card">
            <h3>{{ m.title }}</h3>
            <p class="muted">{{ m.text }}</p>
          </article>
        </div>
      </section>

      <section class="page-section">
        <h2 data-en="HISTORY">简短历史</h2>
        <ol class="timeline">
          <li v-for="h in history" :key="h.year">
            <strong>{{ h.year }}</strong>
            <p class="muted">{{ h.text }}</p>
          </li>
        </ol>
        <p class="muted narrow">通过《UNSWCSA 学联手册》与品牌手册，我们持续整理活动策划、工作流程与换届经验，让一届届成员的积累得以传承。</p>
      </section>

      <section class="page-section">
        <h2 data-en="PARTNERSHIPS">组织联系</h2>
        <p class="muted narrow">在 2024/25 与 2025/26 两届工作中，学联与 UNSW、Arc 及校内相关服务团队开展合作，围绕朋辈互助、学生福祉、校园文化与社区建设获得项目支持。</p>
        <p class="muted narrow">从校友交流、企业参访到跨校项目，我们也持续连接校园与行业，让同学有机会接触不同的经验与视角。</p>
      </section>

      <section class="page-section">
        <h2 data-en="ACHIEVEMENTS">荣誉与成果</h2>
        <p class="muted narrow">以下为双年报记录的社团荣誉与体育赛事成绩，每一份认可都属于共同投入的成员。</p>
        <HonorList :items="honors" columns />
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ---- history timeline ---- */
.timeline { list-style: none; padding: 0; margin: 0 0 28px; position: relative; }
.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: var(--line);
}
.timeline li { position: relative; display: flex; align-items: baseline; gap: 28px; padding: 14px 0 14px 36px; }
.timeline li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 22px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--brand-red);
}
.timeline strong { color: var(--brand-navy); font-size: 1.35rem; min-width: 60px; font-variant-numeric: tabular-nums; }
.timeline p { margin: 0; }

@media (max-width: 760px) {
  .timeline li { flex-direction: column; gap: 2px; }
}
</style>
