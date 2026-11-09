# unswcsa-nuxt

新南学联（UNSWCSA）官网，基于 Nuxt 4 复刻 [unswcsa.com](https://unswcsa.com)，并在视觉与性能上做了调整。

静态站点（SSG），使用 pnpm：

```bash
pnpm install
pnpm dev                    # 开发：http://localhost:3000
pnpm generate               # 生成静态站点到 .output/public，直接部署到任意静态托管即可
pnpm dlx serve .output/public   # 本地预览生成结果
```

活动数据在 `generate` 时从上游拉取并写入页面，**更新活动需要重新构建**（可以用 CI 定时构建，例如每小时一次）。

上游不可用时的行为：

- 每次成功拉取都会把数据存成快照（`.data/kv/events/snapshot`）。上游失败时使用最近一次快照，终端打印一行 `[events] upstream unavailable …` 警告。
- 既连不上上游、也没有快照时，dev 下活动页显示「暂时无法加载」和重试按钮；`generate` 会直接失败，不会发布空的活动页。
- CI 中如果希望上游故障时也能继续发布，需要缓存 `.data/` 目录。

## 结构

- `app/data/site.ts`：全部静态内容（部门、荣誉、团队、FAQ 等）
- `app/pages/`：首页、关于我们、部门与团队、全部活动、加入我们、admin 占位页
- `app/layouts/default.vue` + `app/components/`：页头、页脚、常驻 hero（各页通过 `definePageMeta({ hero })` 声明标题）等
- 样式：组件和页面各自的样式写在对应 `.vue` 的 `<style scoped>` 中；全局只保留 `app/assets/css/` 下的
  `tokens.css`（设计变量）、`base.css`（reset 与元素默认样式）、`ui.css`（跨页面复用的按钮、卡片、栅格等）
- `server/api/events.json.get.ts`：构建时读取上游活动数据并校验，预渲染为静态的 `/api/events.json`
  - 上游地址可通过环境变量 `NUXT_EVENTS_SOURCE` 覆盖
- 旧链接重定向：`/departments`、`/leaders`、`/brand-events` 预渲染为静态跳转页；`/brand-events/**`、`/activities/:id` 依赖托管平台返回 `404.html`，由前端路由跳转
