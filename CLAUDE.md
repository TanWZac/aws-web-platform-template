# Next.js 前端仓库 — Claude 指南

## 关键约束：静态导出
`next.config.ts` 使用 `output: "export"`：
- 无服务端渲染，无 API 路由，无 `getServerSideProps`
- 所有 API 调用须在 `"use client"` 组件的 `useEffect` 中进行
- 新页面须验证静态导出兼容性（`npm run build`）

## 目录结构
```
src/app/          ← Next.js 页面（App Router）
src/components/
  layout/         ← AppShell、Header、Sidebar（平台级，谨慎修改）
  platform/       ← MetricCard 等业务组件
  ui/             ← Card 等通用组件
src/lib/
  api-client.ts   ← 唯一 API 入口（platformApi.getHealth / getExample）
  config.ts       ← 环境变量（NEXT_PUBLIC_*）
src/types/api.ts  ← API 响应类型定义
```

## API 调用模式
```typescript
// 正确：客户端组件中使用 useEffect
"use client";
const [result, setResult] = useState<ApiResult<T>>({ data: null, error: null });
useEffect(() => {
  platformApi.getXxx()
    .then(data => setResult({ data, error: null }))
    .catch((err: Error) => setResult({ data: null, error: err.message }));
}, []);
```

## 常用命令
```bash
npm test          # Vitest 测试
npm run typecheck # TypeScript 检查
npm run lint      # ESLint + typecheck
npm run build     # 静态构建（必须无错误）
npm run dev       # 本地开发服务器
```

## 新增页面规则
1. 客户端数据页面须添加 `"use client"` 指令
2. 须处理加载、成功、错误三种状态
3. 须在 `globals.css` 添加缺失的 CSS 类
4. 须在 Header 和 Sidebar 添加导航链接
5. 须在 `src/__tests__/` 添加测试

## 禁止
- 禁止使用服务端 Next.js 功能（ISR、server actions、middleware）
- 禁止绕过 `appConfig`（`src/lib/config.ts`）直接读取 `process.env`
- 禁止在组件中直接调用 `fetch()`，须通过 `platformApi`

## 工作流程规范

### 复杂功能先写规格
实现前须先写失败测试或功能规格（输入/输出/边界），再请 Claude 使其通过。

### 长会话管理
- 每 ~30 轮或上下文超 50% 时执行 `/compact`（压缩历史，消除"中间迷失"）
- 任务切换时执行 `/clear`
- 大型任务分解为独立子任务并行执行

### 首次使用插件（在 Claude Code 中执行两条独立提示）
claude-mem（跨会话记忆）：
  /plugin marketplace add thedotmack/claude-mem
  /plugin install claude-mem@claude-mem
