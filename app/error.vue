<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)
useHead({ title: `${notFound.value ? '页面不存在' : '出错了'} · 新南学联` })
</script>

<template>
  <NuxtLayout>
    <PlaceholderPage
      :eyebrow="error.statusCode ?? 500"
      :title="notFound ? '页面不存在' : '出错了'"
      :description="notFound ? '请检查网址，或从导航选择要访问的页面。' : '页面加载时发生错误，请稍后再试。'"
    >
      <button class="button" @click="clearError({ redirect: '/' })">返回首页 <span aria-hidden="true">↗</span></button>
    </PlaceholderPage>
  </NuxtLayout>
</template>
