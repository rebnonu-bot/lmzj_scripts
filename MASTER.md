# 邻檬智付 UI 设计规范 (Minimalist Tech Blue)

本文档定义了“邻檬智付”平台的视觉设计语言，确保全平台 UI 风格的一致性。

## 1. 颜色系统 (Color System)

### 1.1 核心渐变 (Core Gradients)
- **顶部背景强渐变**: `linear-gradient(180deg, #3B82F6 0%, #60A5FA 70%, #F4F9FF 100%)`
  - *用途*: 页面顶部 Header 背景。
- **功能卡片反向渐变**: `linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(240, 249, 255, 0.9) 100%)`
  - *用途*: 悬浮的金刚区卡片背景，增强立体感。
- **业务办理卡片渐变**: `linear-gradient(90deg, #E0F2FE 0%, #F0F9FF 100%)`
  - *用途*: 底部通栏 Banner 或业务入口。

### 1.2 基础色彩 (Base Colors)
- **主色 (Primary)**: `#3B82F6` (科技蓝)
- **背景色 (Background)**: `#F4F9FF` (极浅蓝，全页面底色)
- **标题色 (Text Primary)**: `#334155` (深灰蓝)
- **描述色 (Text Secondary)**: `#64748B` (中灰蓝)
- **边框色 (Border)**: `rgba(255, 255, 255, 0.6)` (用于卡片描边)

## 2. 布局与间距 (Layout & Spacing)

### 2.1 页面容器 (Page Container)
- **左右内边距**: `32rpx` 或 `40rpx`
- **卡片间距**: `32rpx` (Vertical)

### 2.2 核心元素 (Core Elements)
- **Header 高度**: `440rpx`
- **状态栏占位**: `88rpx` (小程序/App 适配)
- **卡片圆角 (Border Radius)**:
  - 大卡片: `32rpx`
  - 小功能图标背景: `32rpx`
  - 业务 Banner: `24rpx`

## 3. 视觉效果 (Visual Effects)

### 3.1 阴影 (Shadows)
- **悬浮卡片阴影**: `0 16rpx 40rpx rgba(59, 130, 246, 0.12)`
- **描边**: 卡片需带 `1px solid rgba(255, 255, 255, 0.6)` 增强精致感。

### 3.2 质感 (Texture)
- **毛玻璃效果**: 在悬浮卡片上使用 `backdrop-filter: blur(10px)`。

## 4. 组件规范 (Component Standards)

### 4.1 图标 (Icons)
- **主要图标**: 使用 `TDesign` 图标库。
- **金刚区图标大小**: `56rpx`，颜色统一使用 `#3B82F6`。
- **次级图标大小**: `44rpx`，颜色使用 `#333` 或 `#64748B`。

### 4.2 文字 (Typography)
- **一级标题**: `40rpx`, Bold
- **二级标题**: `32rpx`, Bold
- **正文/标签**: `26rpx`, Medium
- **辅助说明**: `24rpx`, Regular

## 5. 开发建议
- 所有的颜色和间距应优先使用 `src/styles/theme.less` 中定义的变量。
- 渐变方向应严格遵循：全局从上往下，卡片内部从下往上。
