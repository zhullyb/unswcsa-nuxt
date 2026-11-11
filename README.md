# unswcsa-nuxt

新南学联（UNSWCSA）官网，基于 Nuxt 4 复刻 [unswcsa.com](https://unswcsa.com)，并在视觉与性能上做了调整。

服务端渲染（SSR），使用 pnpm，需要 Node 运行：

```bash
pnpm install
pnpm dev                          # 开发：http://localhost:3000
pnpm build                        # 构建到 .output/
node .output/server/index.mjs     # 启动生产服务（PORT / HOST 环境变量可改监听地址）
```

活动数据由服务端在用户访问时从上游拉取并渲染进页面，**更新活动无需重新构建**。

- 服务端缓存上游数据 60 秒（过期后先返回旧数据、后台刷新），不会每次访问都请求上游。
- 每次成功拉取都会把数据存成快照（`.data/kv/events/snapshot`）。上游失败时使用最近一次快照，终端打印一行 `[events] upstream unavailable …` 警告。部署时保留 `.data/` 目录，重启后快照仍然可用。
- 既连不上上游、也没有快照时，活动页显示「暂时无法加载」和重试按钮，首页不显示「最新活动」。
- `/about`、`/join`、`/admin` 不依赖实时数据，构建时预渲染为静态文件；其余页面按请求渲染。

## 开发约定

- Node 与 pnpm 版本见 `package.json` 的 `engines` 和 `packageManager`（pnpm 会自动切换到声明的版本）。
- 代码检查和格式化统一用 ESLint（`@nuxt/eslint` + ESLint Stylistic），不使用 Prettier：

  ```bash
  pnpm lint        # 检查
  pnpm lint:fix    # 自动修复（含格式）
  pnpm typecheck   # 类型检查
  ```

- 规则在 `nuxt.config.ts` 的 `eslint.config.stylistic` 和 `eslint.config.mjs` 中调整。
- VS Code 打开项目时会推荐安装 ESLint、Vue 和 EditorConfig 插件，保存时自动执行 ESLint 修复（见 `.vscode/settings.json`）。

## 结构

- `app/data/site.ts`：全部静态内容（部门、荣誉、团队、FAQ 等）
- `app/pages/`：首页、关于我们、部门与团队、全部活动、加入我们、admin 占位页
- `app/layouts/default.vue` + `app/components/`：页头、页脚、常驻 hero（各页通过 `definePageMeta({ hero })` 声明标题）等
- 样式：组件和页面各自的样式写在对应 `.vue` 的 `<style scoped>` 中；全局只保留 `app/assets/css/` 下的
  `tokens.css`（设计变量）、`base.css`（reset 与元素默认样式）、`ui.css`（跨页面复用的按钮、卡片、栅格等）
- `server/api/events.json.get.ts`：服务端读取上游活动数据、校验并缓存，提供 `/api/events.json`
  - 上游地址可通过环境变量 `NUXT_EVENTS_SOURCE` 覆盖
- 旧链接重定向：`/departments`、`/leaders`、`/brand-events/**`、`/activities/:id` 在 `nuxt.config.ts` 的 `routeRules` 中配置，由服务端返回 301 永久重定向
