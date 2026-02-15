# 邻檬智付小程序开发规范指南

> 基于 UniApp + Vue3 + TypeScript 的企业级小程序开发规范

---

## 📚 目录

1. [项目架构规范](#一项目架构规范)
2. [目录结构规范](#二目录结构规范)
3. [命名规范](#三命名规范)
4. [代码风格规范](#四代码风格规范)
5. [UI 设计规范](#五ui-设计规范)
6. [组件开发规范](#六组件开发规范)
7. [API 开发规范](#七api-开发规范)
8. [状态管理规范](#八状态管理规范)
9. [性能优化规范](#九性能优化规范)
10. [Git 提交规范](#十git-提交规范)

---

## 一、项目架构规范

### 1.1 技术栈选型

| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 框架 | Vue 3 | ^3.4.x | 组合式 API |
| 跨端 | UniApp | 3.0.x | 支持小程序/H5/App |
| 语言 | TypeScript | ^4.9.x | 严格模式 |
| 构建 | Vite | 5.2.x | 快速构建 |
| UI 库 | TDesign UniApp | ^0.7.x | 腾讯设计体系 |
| 样式 | SCSS/Less | - | CSS 预处理器 |

### 1.2 环境配置

```
.env                    # 默认环境
.env.development        # 开发环境
.env.production         # 生产环境
.env.test               # 测试环境
```

**环境变量命名规范：**
```
VITE_APP_TITLE=邻檬智付
VITE_API_BASE_URL=https://api.example.com
VITE_APP_VERSION=1.0.0
```

---

## 二、目录结构规范

### 2.1 标准目录结构

```
project-name/
├── src/
│   ├── api/                    # API 层
│   │   ├── modules/            # 业务模块 API
│   │   │   ├── user.ts
│   │   │   ├── order.ts
│   │   │   └── index.ts
│   │   ├── interceptors.ts     # 请求拦截器
│   │   └── request.ts          # 请求封装
│   │
│   ├── components/             # 公共组件
│   │   ├── business/           # 业务组件
│   │   ├── common/             # 通用组件
│   │   └── layout/             # 布局组件
│   │
│   ├── composables/            # Vue3 组合式函数
│   │   ├── useStorage.ts
│   │   ├── useLoading.ts
│   │   └── index.ts            # 统一导出
│   │
│   ├── config/                 # 配置文件
│   │   └── index.ts            # 多环境配置
│   │
│   ├── constants/              # 常量定义
│   │   ├── enums.ts            # 枚举常量
│   │   └── index.ts            # 普通常量
│   │
│   ├── package-xxx/            # 分包目录（按功能）
│   │   └── pages/
│   │       └── page-name/
│   │           └── index.vue
│   │
│   ├── pages/                  # 主包页面（Tab页）
│   │   └── page-name/
│   │       └── index.vue
│   │
│   ├── static/                 # 静态资源
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── stores/                 # 状态管理
│   │   ├── user.ts             # 用户状态
│   │   ├── app.ts              # 应用状态
│   │   └── index.ts            # 统一导出
│   │
│   ├── styles/                 # 全局样式
│   │   ├── variables.scss      # SCSS 变量
│   │   ├── mixins.scss         # SCSS 混入
│   │   └── index.scss          # 统一导入
│   │
│   ├── types/                  # TypeScript 类型
│   │   ├── api.d.ts            # API 类型
│   │   ├── business.d.ts       # 业务类型
│   │   └── global.d.ts         # 全局类型
│   │
│   ├── utils/                  # 工具函数
│   │   ├── cache.ts            # 缓存管理
│   │   ├── tracker.ts          # 埋点统计
│   │   ├── validate.ts         # 表单验证
│   │   └── index.ts            # 统一导出
│   │
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 入口文件
│   ├── manifest.json           # 应用配置
│   ├── pages.json              # 页面配置
│   └── uni.scss                # 全局样式变量
│
├── .github/workflows/          # CI/CD 配置
├── .husky/                     # Git 钩子
├── .env.*                      # 环境变量
├── .eslintrc.cjs               # ESLint 配置
├── .prettierrc                 # Prettier 配置
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 2.2 分包规划规范

**分包原则：**
1. Tab 页放入主包
2. 非核心功能放入分包
3. 相关页面放入同一分包
4. 预加载配置常用分包

**推荐分包结构：**
```json
{
  "pages": ["主包Tab页"],
  "subPackages": [
    { "root": "package-user", "pages": ["个人中心相关"] },
    { "root": "package-order", "pages": ["订单相关"] },
    { "root": "package-goods", "pages": ["商品相关"] },
    { "root": "package-webview", "pages": ["webview"] }
  ],
  "preloadRule": {
    "pages/home/index": {
      "packages": ["package-goods"]
    }
  }
}
```

---

## 三、命名规范

### 3.1 文件命名

| 类型 | 命名方式 | 示例 |
|------|----------|------|
| 组件 | PascalCase | `EmptyState.vue`, `CustomTabBar.vue` |
| 页面 | index.vue（小写） | `pages/home/index.vue` |
| 工具函数 | camelCase | `formatDate.ts`, `validatePhone.ts` |
| 组合式函数 | use + PascalCase | `useStorage.ts`, `useLoading.ts` |
| 类型定义 | camelCase.d.ts | `api.d.ts`, `business.d.ts` |
| 常量 | UPPER_SNAKE_CASE | `enums.ts`, `constants.ts` |
| 样式文件 | camelCase | `variables.scss`, `mixins.scss` |

### 3.2 变量命名

```typescript
// 常量 - UPPER_SNAKE_CASE
const MAX_PAGE_SIZE = 100
const DEFAULT_TIMEOUT = 5000

// 枚举 - PascalCase
enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
}

// 类型/接口 - PascalCase
interface UserInfo {
  id: string
  name: string
}

type ApiResponse<T> = {
  code: number
  data: T
}

// 变量/函数 - camelCase
const userInfo = ref<UserInfo>()
const isLoading = ref(false)

function formatDate(date: string): string {
  return dayjs(date).format('YYYY-MM-DD')
}

// 组件 - PascalCase
import EmptyState from '@/components/EmptyState.vue'
```

### 3.3 CSS 类名命名

**BEM 命名规范：**
```scss
// Block - 块
.empty-state { }

// Element - 元素
.empty-state__icon { }
.empty-state__title { }
.empty-state__description { }

// Modifier - 修饰符
.empty-state--small { }
.empty-state__icon--large { }
```

**实际应用：**
```vue
<template>
  <view class="user-card">
    <view class="user-card__header">
      <image class="user-card__avatar" />
      <text class="user-card__name">用户名</text>
    </view>
    <view class="user-card__body user-card__body--highlighted">
      <!-- 内容 -->
    </view>
  </view>
</template>
```

---

## 四、代码风格规范

### 4.1 Vue 单文件组件规范

```vue
<template>
  <!-- 模板 -->
</template>

<script setup lang="ts">
/**
 * 组件描述
 * @description 这是一个示例组件
 * @author 作者名
 * @date 2026-01-01
 */

import { ref, computed, onMounted } from 'vue'
import type { PropType } from 'vue'

// ========== Props & Emits ==========
interface Props {
  title: string
  description?: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  size: 'medium',
})

const emit = defineEmits<{
  click: [id: string]
  change: [value: string]
}>()

// ========== 组合式函数 ==========
const { loading, showLoading, hideLoading } = useLoading()

// ========== 响应式状态 ==========
const count = ref(0)
const list = ref<Item[]>([])

// ========== 计算属性 ==========
const displayTitle = computed(() => {
  return props.title || '默认标题'
})

// ========== 方法 ==========
function handleClick() {
  emit('click', 'id')
}

async function fetchData() {
  showLoading()
  try {
    const res = await http.get('/api/data')
    list.value = res.data
  } finally {
    hideLoading()
  }
}

// ========== 生命周期 ==========
onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.component-name {
  /* 样式 */
}
</style>
```

### 4.2 TypeScript 规范

```typescript
// 必须指定返回值类型
function add(a: number, b: number): number {
  return a + b
}

// 异步函数
async function fetchUser(id: string): Promise<UserInfo> {
  const res = await http.get<UserInfo>(`/user/${id}`)
  return res
}

// 接口定义
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

// 使用泛型
function useCache<T>(key: string): {
  get: () => T | null
  set: (value: T) => void
} {
  // 实现
}

// 避免使用 any
// ❌ bad
const data: any = fetchData()

// ✅ good
const data: UserInfo = fetchData()

// 类型断言（必要时使用）
const element = document.getElementById('app') as HTMLElement
```

### 4.3 注释规范

```typescript
/**
 * 函数描述
 * @param param1 参数1说明
 * @param param2 参数2说明
 * @returns 返回值说明
 * @example
 * ```ts
 * const result = myFunction('value', 123)
 * ```
 */
function myFunction(param1: string, param2: number): boolean {
  return true
}

// 单行注释
const count = ref(0) // 计数器

// 多行注释
/*
 * 这段代码的作用是...
 * 需要注意...
 */
```

---

## 五、UI 设计规范

### 5.1 色彩体系

#### 主色调

| 名称 | 色值 | 用途 |
|------|------|------|
| Primary | `#3B82F6` | 主色、按钮、链接 |
| Primary Light | `#60A5FA` | 渐变、hover |
| Primary Dark | `#2563EB` | 按下状态 |

#### 辅助色

| 名称 | 色值 | 用途 |
|------|------|------|
| Success | `#10B981` | 成功、完成 |
| Warning | `#F59E0B` | 警告、提示 |
| Error | `#EF4444` | 错误、删除 |
| Info | `#64748B` | 信息、次要文字 |

#### 中性色（灰度）

| 名称 | 色值 | 用途 |
|------|------|------|
| Gray 50 | `#F8FAFC` | 最浅背景 |
| Gray 100 | `#F1F5F9` | 背景色 |
| Gray 200 | `#E2E8F0` | 边框、分割线 |
| Gray 300 | `#CBD5E1` | 禁用状态 |
| Gray 400 | `#94A3B8` | 占位符文字 |
| Gray 500 | `#64748B` | 次要文字 |
| Gray 600 | `#475569` | 正文文字 |
| Gray 700 | `#334155` | 标题文字 |
| Gray 800 | `#1E293B` | 主标题 |
| Gray 900 | `#0F172A` | 最深色 |

### 5.2 CSS 变量（支持暗黑模式）

```scss
:root {
  // 背景色
  --bg-primary: #FFFFFF;
  --bg-secondary: #F4F9FF;
  --bg-tertiary: #F1F5F9;
  --bg-card: #FFFFFF;
  --bg-hover: #F8FAFC;
  
  // 文字色
  --text-primary: #1E293B;
  --text-secondary: #64748B;
  --text-tertiary: #94A3B8;
  --text-inverse: #FFFFFF;
  
  // 边框色
  --border-light: #E2E8F0;
  --border-medium: #CBD5E1;
}

// 暗黑模式
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0F172A;
    --bg-secondary: #1E293B;
    --text-primary: #F8FAFC;
    --text-secondary: #CBD5E1;
    --border-light: #334155;
  }
}
```

### 5.3 尺寸规范

#### 圆角

| 名称 | 值 | 用途 |
|------|-----|------|
| Radius SM | `12rpx` | 小标签、小按钮 |
| Radius MD | `24rpx` | 卡片、输入框 |
| Radius LG | `32rpx` | 大卡片、模态框 |
| Radius XL | `40rpx` | 特殊强调 |
| Radius Full | `9999rpx` | 圆形、胶囊按钮 |

#### 间距

| 名称 | 值 | 用途 |
|------|-----|------|
| Space XS | `8rpx` | 紧密间距 |
| Space SM | `16rpx` | 小间距 |
| Space MD | `24rpx` | 默认间距 |
| Space LG | `32rpx` | 大间距 |
| Space XL | `48rpx` | 章节间距 |
| Space 2XL | `64rpx` | 页面间距 |

#### 字号

| 名称 | 值 | 用途 |
|------|-----|------|
| Text XS | `22rpx` | 标签、辅助文字 |
| Text SM | `24rpx` | 次要文字 |
| Text Base | `28rpx` | 正文 |
| Text MD | `30rpx` | 小标题 |
| Text LG | `32rpx` | 标题 |
| Text XL | `36rpx` | 大标题 |
| Text 2XL | `40rpx` | 主标题 |

### 5.4 阴影规范

```scss
// 小阴影
$shadow-sm: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);

// 中阴影（卡片默认）
$shadow-md: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);

// 大阴影（浮层）
$shadow-lg: 0 8rpx 32rpx rgba(0, 0, 0, 0.12);

// 主色阴影（按钮）
$shadow-primary: 0 8rpx 24rpx rgba(59, 130, 246, 0.25);
```

### 5.5 毛玻璃效果

```scss
@mixin glass-effect($bg-color: rgba(255, 255, 255, 0.8)) {
  background: $bg-color;
  backdrop-filter: blur(20rpx);
  -webkit-backdrop-filter: blur(20rpx);
}

// 使用
.card {
  @include glass-effect();
  border-radius: 32rpx;
}
```

---

## 六、组件开发规范

### 6.1 组件结构

```vue
<template>
  <view class="component-name">
    <!-- 内容 -->
  </view>
</template>

<script setup lang="ts">
// 1. 类型导入
import type { PropType } from 'vue'

// 2. 组件导入
import { Icon } from '@tdesign/uniapp'

// 3. 工具导入
import { useLoading } from '@/composables'

// 4. Props 定义
interface Props {
  /** 标题 */
  title: string
  /** 类型 */
  type?: 'primary' | 'secondary'
  /** 是否禁用 */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  disabled: false,
})

// 5. Emits 定义
const emit = defineEmits<{
  click: []
  change: [value: string]
}>()

// 6. 逻辑代码
function handleClick() {
  if (props.disabled) return
  emit('click')
}
</script>

<style lang="scss" scoped>
.component-name {
  /* BEM 命名 */
}
</style>
```

### 6.2 推荐组件列表

**基础组件：**
- `EmptyState` - 空状态
- `ErrorBoundary` - 错误边界
- `SafeArea` - 安全区适配
- `Loading` - 加载状态
- `Skeleton` - 骨架屏

**业务组件：**
- `ProductCard` - 商品卡片
- `OrderItem` - 订单项
- `AddressCard` - 地址卡片

---

## 七、API 开发规范

### 7.1 API 模块组织

```typescript
// api/modules/user.ts
import http from '../request'
import type { UserInfo, LoginParams } from '@/types'

export const userApi = {
  /** 登录 */
  login: (params: LoginParams) => 
    http.post<{ token: string; userInfo: UserInfo }>('/auth/login', params),
  
  /** 获取用户信息 */
  getUserInfo: () => 
    http.get<UserInfo>('/user/info'),
  
  /** 更新用户信息 */
  updateUserInfo: (data: Partial<UserInfo>) => 
    http.put<UserInfo>('/user/info', data),
}

// api/index.ts
export * from './modules/user'
export * from './modules/order'
```

### 7.2 请求封装使用

```typescript
import http from '@/api/request'

// GET 请求
const data = await http.get('/api/data', { id: 1 })

// POST 请求（带加载）
const result = await http.post(
  '/api/submit', 
  { name: 'test' },
  { showLoading: true, loadingText: '提交中...' }
)
```

---

## 八、状态管理规范

### 8.1 Store 结构

```typescript
// stores/user.ts
import { reactive, readonly, computed } from 'vue'

// 状态
const state = reactive({
  userInfo: null as UserInfo | null,
  token: '',
  isLoggedIn: false,
})

// 计算属性
const getters = {
  nickname: computed(() => state.userInfo?.nickname || '未登录'),
}

// Actions
const actions = {
  setUserInfo(userInfo: UserInfo | null) {
    state.userInfo = userInfo
  },
  
  async login() {
    // 登录逻辑
  },
  
  logout() {
    // 登出逻辑
  },
}

export const useUserStore = () => ({
  state: readonly(state),
  ...getters,
  ...actions,
})
```

### 8.2 使用方式

```typescript
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 读取状态
console.log(userStore.state.isLoggedIn)

// 使用计算属性
console.log(userStore.nickname.value)

// 调用方法
await userStore.login()
```

---

## 九、性能优化规范

### 9.1 分包加载

```json
// pages.json
{
  "subPackages": [
    { "root": "package-order", "pages": [...] },
    { "root": "package-user", "pages": [...] }
  ],
  "preloadRule": {
    "pages/home/index": {
      "network": "all",
      "packages": ["package-order"]
    }
  }
}
```

### 9.2 数据缓存

```typescript
import { cachedRequest, CacheKeys, CacheExpires } from '@/utils/cache'

// 使用缓存的请求
const data = await cachedRequest(
  CacheKeys.HOME_DATA,
  () => http.get('/home'),
  CacheExpires.HOME_DATA
)
```

### 9.3 图片优化

- 使用 WebP 格式
- 使用 CDN
- 懒加载
- 适当压缩

### 9.4 代码优化

- 避免不必要的响应式数据
- 使用 `v-show` 替代 `v-if`（频繁切换时）
- 长列表使用虚拟滚动
- 防抖节流处理高频事件

---

## 十、Git 提交规范

### 10.1 分支管理

```
main                    # 生产分支
├── develop             # 开发分支
│   ├── feature/xxx     # 功能分支
│   ├── bugfix/xxx      # 修复分支
│   └── hotfix/xxx      # 热修复分支
```

### 10.2 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）：**
| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 |
| `docs` | 文档 |
| `style` | 格式（不影响代码运行） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试 |
| `chore` | 构建/工具 |

**示例：**
```
feat(user): 添加用户登录功能

- 实现微信一键登录
- 添加登录状态管理
- 添加登录页面UI

Closes #123
```

---

## 📎 附录

### 推荐 VSCode 插件

- Vue Language Features (Volar)
- TypeScript Vue Plugin
- ESLint
- Prettier
- SCSS IntelliSense
- UniApp Snippets

### 常用命令速查

```bash
# 开发
npm run dev:h5
npm run dev:mp-weixin

# 构建
npm run build:h5
npm run build:mp-weixin

# 代码检查
npm run lint
npm run format
npm run type-check

# 依赖安装
npm install --legacy-peer-deps
```

---

**文档版本：** v1.0  
**最后更新：** 2026-02-15  
**维护者：** 开发团队
