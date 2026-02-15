# 邻檬智付小程序脚手架

快速创建基于 UniApp + Vue3 + TypeScript 的企业级小程序项目。

---

## 📦 安装

### 方式一：全局安装（推荐）

```bash
# 克隆项目后，将 scripts 目录复制到你的工具目录
# 然后创建全局链接
cd scripts
npm link

# 现在可以在任何地方使用
lmzf-cli create my-app
```

### 方式二：直接使用

```bash
# 在项目根目录下使用
node scripts/cli.js create my-app
```

### 方式三：package.json 脚本

```bash
# 如果已经将脚手架集成到项目中
npm run cli -- create my-app
```

---

## 🚀 快速开始

### 创建新项目

```bash
lmzf-cli create <project-name>

# 示例
lmzf-cli create my-shop
lmzf-cli create my-order-system --no-git
```

选项：
- `--no-install` - 跳过依赖安装
- `--no-git` - 跳过 git 初始化

### 创建页面

```bash
# 创建主包页面
lmzf-cli page <page-name>

# 创建分包页面
lmzf-cli page <page-name> --subpackage <package-name>

# 示例
lmzf-cli page user-center
lmzf-cli page order-list --subpackage order
lmzf-cli page product-detail --subpackage goods
```

### 创建组件

```bash
lmzf-cli component <component-name>

# 指定组件类型
lmzf-cli component product-card --type business
lmzf-cli component loading-spinner --type common

# 类型可选：business | common | layout（默认 common）
```

### 创建 API 模块

```bash
lmzf-cli api <module-name>

# 示例
lmzf-cli api product
lmzf-cli api order
lmzf-cli api user
```

### 创建组合式函数

```bash
lmzf-cli composable <name>

# 示例
lmzf-cli composable scroll
lmzf-cli composable fetch
```

---

## 📁 生成的项目结构

```
my-app/
├── src/
│   ├── api/                    # API 层
│   │   ├── modules/            # API 模块
│   │   └── request.ts          # 请求封装
│   ├── components/             # 组件
│   │   ├── business/           # 业务组件
│   │   ├── common/             # 通用组件
│   │   └── layout/             # 布局组件
│   ├── composables/            # 组合式函数
│   ├── config/                 # 配置文件
│   ├── constants/              # 常量定义
│   ├── pages/                  # 主包页面
│   ├── static/                 # 静态资源
│   ├── stores/                 # 状态管理
│   ├── styles/                 # 全局样式
│   │   ├── variables.scss      # SCSS 变量
│   │   └── index.scss          # 全局样式入口
│   ├── types/                  # TypeScript 类型
│   └── utils/                  # 工具函数
│   ├── App.vue
│   ├── main.ts
│   ├── manifest.json
│   └── pages.json
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 内置特性

### 1. 完整的开发环境
- ✅ Vue 3 + UniApp 3.0
- ✅ TypeScript 严格模式
- ✅ TDesign 组件库
- ✅ SCSS 预处理器

### 2. 代码规范
- ✅ ESLint + Prettier
- ✅ Husky Git 钩子
- ✅ lint-staged

### 3. 请求封装
- ✅ Token 自动注入
- ✅ 统一的错误处理
- ✅ 加载状态控制

### 4. 设计系统
- ✅ 统一的色彩变量
- ✅ 圆角、间距规范
- ✅ 阴影、动画效果
- ✅ 安全区适配

---

## 📐 代码规范

### 命名规范

| 类型 | 命名方式 | 示例 |
|------|----------|------|
| 组件 | PascalCase | `ProductCard.vue` |
| 页面 | index.vue | `pages/home/index.vue` |
| 组合式函数 | camelCase | `useStorage.ts` |
| API 模块 | camelCase | `product.ts` |
| CSS 类 | BEM | `.product-card__title` |

### 组件模板

生成的组件包含：
```vue
<template>
  <view class="component-name">
    <!-- 内容 -->
  </view>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})

const emit = defineEmits<{
  click: []
}>()
</script>

<style lang="scss" scoped>
.component-name { }
</style>
```

### API 模块模板

生成的 API 模块包含：
```typescript
export const productApi = {
  getList: (params) => http.get('/product/list', params),
  getDetail: (id) => http.get(`/product/${id}`),
  create: (data) => http.post('/product', data),
  update: (id, data) => http.put(`/product/${id}`, data),
  delete: (id) => http.delete(`/product/${id}`),
}
```

---

## 🛠️ 自定义模板

### 修改项目模板

编辑 `templates/project/` 目录下的文件，修改默认生成的项目结构和代码。

### 修改页面模板

编辑 `templates/page/index.vue`，修改生成页面的默认代码。

### 修改组件模板

编辑 `templates/component/Component.vue`，修改生成组件的默认代码。

---

## 📚 常用命令速查

```bash
# 创建项目
lmzf-cli create my-app

# 创建页面
lmzf-cli page user-center
lmzf-cli page order-list --subpackage order

# 创建组件
lmzf-cli component product-card
lmzf-cli component nav-header --type layout

# 创建 API
lmzf-cli api product

# 创建组合式函数
lmzf-cli composable scroll

# 帮助
lmzf-cli --help
```

---

## 🔧  Troubleshooting

### 1. 权限问题

```bash
# Mac/Linux 下添加执行权限
chmod +x scripts/cli.js
```

### 2. Windows 下使用

```bash
# 使用 node 直接运行
node scripts/cli.js create my-app
```

### 3. 模板变量未替换

确保模板文件中使用的是正确的变量格式：
- `{{projectName}}` - 项目名称
- `{{pageName}}` - 页面名称
- `{{ComponentName}}` - 组件名（PascalCase）
- `{{componentName}}` - 组件名（kebab-case）

---

## 📄 License

MIT
