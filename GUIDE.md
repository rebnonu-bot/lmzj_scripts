# 邻檬智付小程序开发完整指南

> 基于 UniApp + Vue3 + TypeScript 的企业级小程序开发规范与设计系统

---

## 📚 目录

### 第一部分：开发规范
1. [项目架构规范](#一项目架构规范)
2. [目录结构规范](#二目录结构规范)
3. [命名规范](#三命名规范)
4. [代码风格规范](#四代码风格规范)
5. [组件开发规范](#五组件开发规范)
6. [API 开发规范](#六api-开发规范)
7. [状态管理规范](#七状态管理规范)
8. [性能优化规范](#八性能优化规范)
9. [Git 提交规范](#九git-提交规范)

### 第二部分：UI 设计系统
10. [设计规范总览](#十设计规范总览)
11. [颜色系统](#十一颜色系统)
12. [布局与间距](#十二布局与间距)
13. [视觉效果](#十三视觉效果)
14. [组件规范](#十四组件规范)
15. [文字规范](#十五文字规范)
16. [色彩速查表](#十六色彩速查表)

---

## 第一部分：开发规范

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
│   ├── styles/                 # 样式文件
│   │   ├── variables.scss      # SCSS 变量
│   │   ├── mixins.scss         # SCSS 混入
│   │   └── index.scss          # 全局样式
│   │
│   ├── types/                  # TypeScript 类型
│   │   ├── api.d.ts            # API 类型
│   │   ├── components.d.ts     # 组件类型
│   │   └── global.d.ts         # 全局类型
│   │
│   ├── utils/                  # 工具函数
│   │   ├── common.ts           # 通用工具
│   │   ├── validate.ts         # 验证工具
│   │   └── storage.ts          # 存储工具
│   │
│   ├── App.vue                 # 应用入口
│   ├── main.ts                 # 主入口文件
│   ├── manifest.json           # UniApp 配置
│   └── pages.json              # 页面路由配置
│
├── .env.*                      # 环境变量
├── .eslintrc.cjs               # ESLint 配置
├── .prettierrc                 # Prettier 配置
├── package.json                # 项目依赖
├── tsconfig.json               # TypeScript 配置
└── vite.config.ts              # Vite 配置
```

---

## 三、命名规范

### 3.1 文件命名

**Vue 组件**
- 使用 PascalCase：`UserProfile.vue`、`OrderList.vue`
- 业务组件以业务名开头：`UserCard.vue`、`ProductItem.vue`

**TypeScript 文件**
- 使用 camelCase：`useStorage.ts`、`request.ts`
- 工具函数使用 camelCase：`formatDate.ts`、`validate.ts`

**样式文件**
- 使用 kebab-case：`variables.scss`、`mixins.scss`

**目录命名**
- 使用 kebab-case：`user-center/`、`order-list/`

### 3.2 变量命名

**Vue 组件命名**
```typescript
// PascalCase
export default defineComponent({
  name: 'UserProfile'
})
```

**组合式函数命名**
```typescript
// use + 功能名，camelCase
export function useStorage() {}
export function useLoading() {}
export function useFetch() {}
```

**常量命名**
```typescript
// 全大写 + 下划线
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3

// 枚举使用 PascalCase
enum OrderStatus {
  Pending = 'pending',
  Completed = 'completed'
}
```

### 3.3 API 命名

**接口命名**
```typescript
// 使用动词 + 名词
interface GetUserById {
  id: string
}

interface CreateOrder {
  userId: string
  products: Product[]
}
```

**函数命名**
```typescript
// 使用动词前缀
function getUserList() {}
function createOrder() {}
function updateProduct() {}
function deleteCartItem() {}
```

---

## 四、代码风格规范

### 4.1 Vue 组件规范

**组件结构顺序**
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 1. 导入
import { ref, computed } from 'vue'

// 2. Props 定义
interface Props {
  title: string
}
const props = defineProps<Props>()

// 3. Emits 定义
interface Emits {
  (e: 'update', value: string): void
}
const emit = defineEmits<Emits>()

// 4. 响应式数据
const count = ref(0)

// 5. 计算属性
const doubleCount = computed(() => count.value * 2)

// 6. 方法
function increment() {
  count.value++
}

// 7. 生命周期
onMounted(() => {
  console.log('mounted')
})
</script>

<style scoped lang="scss">
// 样式内容
</style>
```

### 4.2 TypeScript 规范

**类型定义**
```typescript
// 使用 interface 定义对象类型
interface User {
  id: string
  name: string
  age: number
}

// 使用 type 定义联合类型
type Status = 'pending' | 'success' | 'error'

// 避免使用 any，使用 unknown
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase()
  }
}
```

**泛型使用**
```typescript
function createList<T>(items: T[]): T[] {
  return items
}

interface ApiResponse<T> {
  code: number
  data: T
  message: string
}
```

### 4.3 样式规范

**BEM 命名**
```scss
// Block
.user-card {
  // Element
  &__header {
    font-size: 16px;
  }
  
  &__body {
    padding: 16px;
  }
  
  // Modifier
  &--active {
    background-color: #3B82F6;
  }
}
```

**使用 SCSS 变量**
```scss
// 使用 variables.scss 中定义的变量
.button {
  background-color: $color-primary;
  border-radius: $border-radius-md;
  padding: $spacing-md;
}
```

---

## 五、组件开发规范

### 5.1 组件分类

**业务组件 (business/)**
- 与业务逻辑强相关
- 示例：`UserCard.vue`、`OrderItem.vue`、`ProductList.vue`

**通用组件 (common/)**
- 可复用的基础组件
- 示例：`Button.vue`、`Input.vue`、`Modal.vue`

**布局组件 (layout/)**
- 页面布局相关
- 示例：`PageHeader.vue`、`PageFooter.vue`、`Sidebar.vue`

### 5.2 组件开发原则

**单一职责**
- 每个组件只负责一个功能
- 组件大小不超过 300 行

**Props 验证**
```typescript
interface Props {
  // 必填项
  title: string
  
  // 可选项
  subtitle?: string
  
  // 类型限制
  count: number
  
  // 默认值
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
  active: false
})
```

**事件命名**
```typescript
// 使用 kebab-case
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'item-click': [item: Item]
  'load-more': []
}>()
```

### 5.3 组件文档

每个组件应包含：
1. 功能描述
2. Props 说明
3. Events 说明
4. Slots 说明
5. 示例代码

```vue
<!--
  @component UserCard
  @description 用户卡片组件，用于展示用户基本信息
  
  @props { string } title - 卡片标题
  @props { string } subtitle - 卡片副标题
  @props { boolean } active - 是否激活状态
  
  @event { string } update:modelValue - 值更新事件
  @event { object } item-click - 点击事件
  
  @slot header - 自定义头部
  @slot default - 默认内容
  
  @example
  <UserCard 
    title="用户名称" 
    subtitle="用户描述"
    v-model="userData"
    @item-click="handleClick"
  />
-->
```

---

## 六、API 开发规范

### 6.1 API 模块结构

```typescript
// api/modules/user.ts
import request from '../request'

// 定义接口类型
interface UserListParams {
  page: number
  pageSize: number
}

interface UserDetail {
  id: string
  name: string
  email: string
}

// 导出 API 函数
export const userApi = {
  // 获取用户列表
  getList(params: UserListParams) {
    return request.get<UserDetail[]>('/users', params)
  },
  
  // 获取用户详情
  getDetail(id: string) {
    return request.get<UserDetail>(`/users/${id}`)
  },
  
  // 创建用户
  create(data: Partial<UserDetail>) {
    return request.post<UserDetail>('/users', data)
  },
  
  // 更新用户
  update(id: string, data: Partial<UserDetail>) {
    return request.put<UserDetail>(`/users/${id}`, data)
  },
  
  // 删除用户
  delete(id: string) {
    return request.delete(`/users/${id}`)
  }
}
```

### 6.2 请求封装

```typescript
// api/request.ts
import {HttpRequest} from '@uni-helper/uniapp-request'

const request = new HttpRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  
  // 请求拦截器
  interceptors: {
    request: [(config) => {
      // 添加 token
      const token = uni.getStorageSync('token')
      if (token) {
        config.header = {
          ...config.header,
          Authorization: `Bearer ${token}`
        }
      }
      return config
    }],
    
    response: [
      // 成功响应
      (response) => {
        const { data, statusCode } = response
        
        if (statusCode >= 200 && statusCode < 300) {
          return data
        }
        
        return Promise.reject(response)
      },
      
      // 错误响应
      (error) => {
        uni.showToast({
          title: error.data?.message || '请求失败',
          icon: 'none'
        })
        return Promise.reject(error)
      }
    ]
  }
})

export default request
```

---

## 七、状态管理规范

### 7.1 Store 结构

```typescript
// stores/user.ts
import { defineStore } from 'pinia'

interface UserState {
  userInfo: UserInfo | null
  token: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    token: ''
  }),
  
  getters: {
    isLogin: (state) => !!state.token,
    userName: (state) => state.userInfo?.name || '游客'
  },
  
  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info
    },
    
    setToken(token: string) {
      this.token = token
      uni.setStorageSync('token', token)
    },
    
    async logout() {
      this.userInfo = null
      this.token = ''
      uni.removeStorageSync('token')
    }
  }
})
```

### 7.2 使用规范

```typescript
// 在组件中使用
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 读取状态
console.log(userStore.userInfo)

// 调用 action
userStore.setUserInfo(newUserInfo)

// 使用 getter
console.log(userStore.userName)
```

---

## 八、性能优化规范

### 8.1 代码优化

**使用计算属性缓存**
```vue
<script setup lang="ts">
import { computed } from 'vue'

const list = ref<Item[]>([])

// ✅ 使用计算属性
const filteredList = computed(() => {
  return list.value.filter(item => item.active)
})

// ❌ 避免在模板中使用复杂表达式
</script>
```

**合理使用 v-show 和 v-if**
```vue
<!-- v-if：条件不满足时不渲染 DOM -->
<div v-if="isLoggedIn">
  <UserProfile />
</div>

<!-- v-show：只是切换 display -->
<div v-show="isVisible">
  <Content />
</div>
```

### 8.2 资源优化

**图片优化**
- 使用 WebP 格式
- 压缩图片大小
- 使用 CDN 加速
- 实现懒加载

**代码分割**
```typescript
// 路由懒加载
const routes = [
  {
    path: '/user',
    component: () => import('@/pages/user/index.vue')
  }
]
```

### 8.3 渲染优化

**使用虚拟滚动**
- 长列表使用虚拟滚动
- 限制渲染节点数量

**避免不必要的响应式**
```typescript
// ✅ 普通常量不需要响应式
const CONFIG = {
  API_URL: 'https://api.example.com',
  TIMEOUT: 10000
}

// ❌ 避免将大量数据设为响应式
const bigData = reactive(largeDataSet)
```

---

## 九、Git 提交规范

### 9.1 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 9.2 Type 类型

| Type | 说明 |
|------|------|
| feat | 新功能 |
| fix | 修复 bug |
| docs | 文档更新 |
| style | 代码格式（不影响功能） |
| refactor | 重构（不是新功能也不是修复） |
| perf | 性能优化 |
| test | 测试相关 |
| chore | 构建过程或辅助工具的变动 |
| revert | 回滚 |

### 9.3 示例

```bash
# 新功能
git commit -m "feat(user): add user login page"

# 修复 bug
git commit -m "fix(order): resolve order status display issue"

# 文档更新
git commit -m "docs: update API documentation"

# 重构
git commit -m "refactor(api): optimize request interceptors"
```

---

## 第二部分：UI 设计系统

## 十、设计规范总览

本文档定义了"邻檬智付"平台的视觉设计语言，确保全平台 UI 风格的一致性。

**设计理念：** Minimalist Tech Blue（极简科技蓝）
- 主色调：科技蓝 (#3B82F6)
- 风格：现代、简洁、专业
- 适用平台：小程序、H5、App

---

## 十一、颜色系统

### 11.1 核心渐变

**顶部背景强渐变**
```
linear-gradient(180deg, #3B82F6 0%, #60A5FA 70%, #F4F9FF 100%)
```
- 用途：页面顶部 Header 背景

**功能卡片反向渐变**
```
linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(240, 249, 255, 0.9) 100%)
```
- 用途：悬浮的金刚区卡片背景，增强立体感

**业务办理卡片渐变**
```
linear-gradient(90deg, #E0F2FE 0%, #F0F9FF 100%)
```
- 用途：底部通栏 Banner 或业务入口

### 11.2 基础色彩

| 色彩类型 | 色值 | 说明 |
|---------|------|------|
| 主色 (Primary) | `#3B82F6` | 科技蓝，用于主要按钮、链接 |
| 背景色 (Background) | `#F4F9FF` | 极浅蓝，全页面底色 |
| 标题色 (Text Primary) | `#334155` | 深灰蓝，用于标题 |
| 描述色 (Text Secondary) | `#64748B` | 中灰蓝，用于描述文字 |
| 边框色 (Border) | `rgba(255, 255, 255, 0.6)` | 卡片描边 |

### 11.3 语义色彩

| 用途 | 色值 | 使用场景 |
|------|------|----------|
| 成功 | `#10B981` | ✅ 完成状态、成功提示 |
| 警告 | `#F59E0B` | ⚠️ 警告、积分、返利 |
| 错误 | `#EF4444` | ❌ 错误提示、删除操作 |
| 信息 | `#64748B` | ℹ️ 次要文字、提示信息 |

### 11.4 灰度色阶

```
Gray 50   #F8FAFC   最浅背景
Gray 100  #F1F5F9   背景色
Gray 200  #E2E8F0   边框、分割线
Gray 300  #CBD5E1   禁用状态
Gray 400  #94A3B8   占位符文字
Gray 500  #64748B   次要文字
Gray 600  #475569   正文文字
Gray 700  #334155   标题文字
Gray 800  #1E293B   主标题
Gray 900  #0F172A   最深色
```

---

## 十二、布局与间距

### 12.1 页面容器

**左右内边距**
- 标准：`32rpx`
- 宽松：`40rpx`

**卡片间距**
- 垂直间距：`32rpx`

### 12.2 核心元素尺寸

**Header 高度**
- 标准高度：`440rpx`
- 状态栏占位：`88rpx`（小程序/App 适配）

**卡片圆角**
- 大卡片：`32rpx`
- 小功能图标背景：`32rpx`
- 业务 Banner：`24rpx`

### 12.3 间距规范

| 级别 | 值 | 用途 |
|------|-----|------|
| XS | `8rpx` | 紧密元素 |
| SM | `16rpx` | 小间距 |
| MD | `24rpx` | 默认间距 |
| LG | `32rpx` | 大间距 |
| XL | `48rpx` | 章节间距 |
| 2XL | `64rpx` | 页面级间距 |

---

## 十三、视觉效果

### 13.1 阴影规范

**悬浮卡片阴影**
```css
box-shadow: 0 16rpx 40rpx rgba(59, 130, 246, 0.12);
```

**描边增强**
```css
border: 1px solid rgba(255, 255, 255, 0.6);
```

### 13.2 质感效果

**毛玻璃效果**
```css
backdrop-filter: blur(10px);
```

**渐变方向**
- 全局背景：从上往下
- 卡片内部：从下往上

---

## 十四、组件规范

### 14.1 图标规范

**图标库**
- 主要图标：使用 `TDesign` 图标库

**图标大小**
- 金刚区主图标：`56rpx`，颜色 `#3B82F6`
- 次级图标：`44rpx`，颜色 `#333` 或 `#64748B`

### 14.2 按钮规范

**按钮尺寸**
- 高度：`88rpx`
- 圆角：`12rpx`（胶囊按钮）

**按钮颜色**
- 主按钮：使用主色渐变
- 次按钮：使用白色背景 + 主色边框

### 14.3 卡片规范

**卡片样式**
```scss
.card {
  background: linear-gradient(0deg, 
    rgba(255, 255, 255, 1) 0%, 
    rgba(240, 249, 255, 0.9) 100%
  );
  border-radius: 32rpx;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 16rpx 40rpx rgba(59, 130, 246, 0.12);
  padding: 32rpx;
  margin-bottom: 32rpx;
}
```

---

## 十五、文字规范

### 15.1 字号规范

| 级别 | 值 | 字重 | 用途 |
|------|-----|------|------|
| 一级标题 | `40rpx` | Bold | 页面主标题 |
| 二级标题 | `32rpx` | Bold | 卡片标题 |
| 正文/标签 | `26rpx` | Medium | 正文内容 |
| 辅助说明 | `24rpx` | Regular | 描述文字 |

### 15.2 行高规范

```scss
line-height: 1.5; // 正文
line-height: 1.2; // 标题
```

### 15.3 字体颜色

```scss
color: #334155; // 标题
color: #64748B; // 描述
color: #94A3B8; // 占位符
```

---

## 十六、色彩速查表

### 16.1 CSS 变量定义

```css
:root {
  /* 主色 */
  --color-primary: #3B82F6;
  --color-primary-light: #60A5FA;
  --color-primary-dark: #2563EB;
  
  /* 渐变 */
  --gradient-primary: linear-gradient(135deg, #3B82F6, #60A5FA);
  --gradient-bg: linear-gradient(180deg, #F4F9FF, #FFFFFF);
  
  /* 背景 */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F4F9FF;
  --bg-tertiary: #F1F5F9;
  
  /* 文字 */
  --text-primary: #1E293B;
  --text-secondary: #64748B;
  --text-tertiary: #94A3B8;
  --text-inverse: #FFFFFF;
  
  /* 边框 */
  --border-color: rgba(255, 255, 255, 0.6);
  
  /* 阴影 */
  --shadow-card: 0 16rpx 40rpx rgba(59, 130, 246, 0.12);
  
  /* 圆角 */
  --border-radius-sm: 12rpx;
  --border-radius-md: 24rpx;
  --border-radius-lg: 32rpx;
}
```

### 16.2 SCSS 变量

```scss
// colors.scss
$color-primary: #3B82F6;
$color-primary-light: #60A5FA;
$color-primary-dark: #2563EB;

$color-success: #10B981;
$color-warning: #F59E0B;
$color-error: #EF4444;
$color-info: #64748B;

// spacing.scss
$spacing-xs: 8rpx;
$spacing-sm: 16rpx;
$spacing-md: 24rpx;
$spacing-lg: 32rpx;
$spacing-xl: 48rpx;
$spacing-2xl: 64rpx;

// typography.scss
$font-size-xs: 22rpx;
$font-size-sm: 24rpx;
$font-size-base: 28rpx;
$font-size-md: 30rpx;
$font-size-lg: 32rpx;
$font-size-xl: 36rpx;
$font-size-2xl: 40rpx;
```

### 16.3 使用示例

```vue
<template>
  <view class="user-card">
    <view class="user-card__header">
      <text class="user-card__title">用户名称</text>
    </view>
    <view class="user-card__body">
      <text class="user-card__desc">用户描述信息</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.user-card {
  background: linear-gradient(0deg, 
    rgba(255, 255, 255, 1) 0%, 
    rgba(240, 249, 255, 0.9) 100%
  );
  border-radius: $border-radius-lg;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: $shadow-card;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  
  &__header {
    margin-bottom: $spacing-md;
  }
  
  &__title {
    font-size: $font-size-lg;
    font-weight: bold;
    color: $text-primary;
  }
  
  &__desc {
    font-size: $font-size-base;
    color: $text-secondary;
  }
}
</style>
```

---

## 📝 开发建议

1. **优先使用变量**：所有的颜色和间距应优先使用 `src/styles/variables.scss` 中定义的变量
2. **渐变方向**：严格遵循全局从上往下、卡片内部从下往上的原则
3. **保持一致性**：确保所有页面和组件遵循统一的设计规范
4. **响应式设计**：使用 rpx 单位确保在不同设备上的显示效果
5. **性能优化**：合理使用 CSS 变量和 SCSS 混入，避免重复代码

---

## 🎯 快速参考

**常用颜色**
```scss
$color-primary: #3B82F6;
$bg-secondary: #F4F9FF;
$text-primary: #334155;
$text-secondary: #64748B;
```

**常用间距**
```scss
$spacing-md: 24rpx;
$spacing-lg: 32rpx;
$spacing-xl: 48rpx;
```

**常用圆角**
```scss
$border-radius-md: 24rpx;
$border-radius-lg: 32rpx;
```

---

**文档版本**：v1.0.0  
**最后更新**：2025-02-15  
**维护团队**：邻檬智付前端团队
