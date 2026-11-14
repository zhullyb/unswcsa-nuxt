<script setup lang="ts">
import { reasons, steps, faqs } from '~/data/site'

definePageMeta({
  hero: {
    title: '加入我们',
    subtitle: '新学期，期待与你相遇',
    actions: [{ label: '查看常见问题', to: '/join#join-faq', icon: '↓', variant: 'red' }],
  },
})
useSeoMeta({
  title: '加入我们',
  description: '加入新南学联：了解招新流程（关注招新推文、填写报名表、参加面试）与常见问题，与我们一起策划活动、服务同学。',
})
</script>

<template>
  <div>
    <div class="container page-body">
      <p class="page-intro">
        招新通常在学期初进行，欢迎关注新南学联微信公众号。具体时间、开放部门和报名入口以当期招新推文为准。
      </p>

      <section class="page-section">
        <h2 data-en="WHY JOIN US">为什么加入</h2>
        <div class="two-grid">
          <article v-for="(r, i) in reasons" :key="r.title" class="card reason-card">
            <span class="reason-mark" aria-hidden="true">{{ ['想', '伴', '视', '承'][i] }}</span>
            <div>
              <h3>{{ r.title }}</h3>
              <p class="muted">{{ r.text }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="page-section">
        <div class="section-heading">
          <h2 data-en="DEPARTMENTS">部门简介</h2>
          <NuxtLink class="text-link" to="/team">认识我们的团队 ↗</NuxtLink>
        </div>
        <DepartmentGrid />
      </section>

      <section class="page-section">
        <h2 data-en="HOW TO APPLY">申请流程</h2>
        <ol class="process-list">
          <li v-for="(s, i) in steps" :key="s.title">
            <span class="step-number" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3>{{ s.title }}</h3>
            <p class="muted">{{ s.description }}</p>
          </li>
        </ol>
      </section>

      <section id="join-faq" class="page-section">
        <h2 data-en="FAQ">常见问题</h2>
        <div class="faq-list">
          <details v-for="f in faqs" :key="f.question">
            <summary>{{ f.question }}</summary>
            <p>{{ f.answer }}</p>
          </details>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-intro {
  padding: 20px 24px;
  background: var(--pale);
  border-left: 4px solid var(--brand-red);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--brand-navy);
  max-width: 880px;
}

/* ---- why join ---- */
.reason-card { display: flex; gap: 20px; align-items: flex-start; }
.reason-mark {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--brand-navy);
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
}

/* ---- application steps ---- */
.process-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.process-list li { position: relative; padding: 0 8px 0 0; }
.process-list li:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 26px;
  left: 68px;
  right: 0;
  border-top: 2px dashed var(--brand-sky);
}
.process-list p { margin: 0; }
.step-number {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--brand-navy);
  color: #fff;
  font-weight: 700;
  margin-bottom: 18px;
  box-shadow: 0 0 0 6px var(--pale);
}

/* ---- FAQ ---- */
.faq-list { display: grid; gap: 12px; max-width: 880px; }
.faq-list details { background: var(--pale); border-radius: var(--radius); overflow: hidden; transition: background-color 0.2s; }
.faq-list details[open] { background: #fff; box-shadow: var(--shadow-sm); outline: 1px solid var(--line); }
.faq-list summary {
  position: relative;
  padding: 20px 60px 20px 24px;
  color: var(--brand-navy);
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary::after {
  content: '+';
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  color: var(--brand-red);
  font-size: 1.2rem;
  transition: transform 0.2s;
}
.faq-list details[open] summary::after { content: '−'; background: var(--pale); }
.faq-list details p { padding: 0 24px 22px; color: var(--muted); margin: 0; }

@media (max-width: 760px) {
  .page-intro { padding: 16px 18px; }

  .process-list { grid-template-columns: 1fr; gap: 28px; }
  .process-list li { padding-left: 76px; min-height: 54px; }
  .process-list .step-number { position: absolute; left: 0; top: 0; }
  .process-list li:not(:last-child)::after {
    top: 64px;
    bottom: -24px;
    left: 26px;
    right: auto;
    border-top: 0;
    border-left: 2px dashed var(--brand-sky);
  }
}
</style>
