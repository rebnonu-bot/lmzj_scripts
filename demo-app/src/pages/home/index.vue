<template>
  <view class="home-page">
    <view class="header">
      <text class="title">{{ projectName }}</text>
      <text class="subtitle">UniApp + Vue3 + TypeScript</text>
    </view>
    
    <view class="content">
      <view class="card">
        <t-icon name="check-circle" size="48rpx" color="#3B82F6" />
        <text class="card-text">项目初始化成功</text>
      </view>
      
      <view class="features">
        <text class="section-title">已配置功能</text>
        <view class="feature-list">
          <view class="feature-item">
            <t-icon name="check" size="32rpx" color="#10B981" />
            <text>Vue 3 组合式 API</text>
          </view>
          <view class="feature-item">
            <t-icon name="check" size="32rpx" color="#10B981" />
            <text>TypeScript 严格模式</text>
          </view>
          <view class="feature-item">
            <t-icon name="check" size="32rpx" color="#10B981" />
            <text>TDesign 组件库</text>
          </view>
          <view class="feature-item">
            <t-icon name="check" size="32rpx" color="#10B981" />
            <text>ESLint + Prettier</text>
          </view>
          <view class="feature-item">
            <t-icon name="check" size="32rpx" color="#10B981" />
            <text>Husky Git 钩子</text>
          </view>
        </view>
      </view>
      
      <t-button theme="primary" size="large" shape="round" block @click="getStarted">
        开始使用
      </t-button>
    </view>
  </view>
</template>

<script setup lang="ts">
const projectName = 'demo-app'

function getStarted() {
  uni.showToast({
    title: '开始使用',
    icon: 'success',
  })
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #F4F9FF 0%, #FFFFFF 100%);
  padding: 40rpx;
}

.header {
  text-align: center;
  padding: 60rpx 0;
  
  .title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    color: #1E293B;
    margin-bottom: 16rpx;
  }
  
  .subtitle {
    font-size: 28rpx;
    color: #64748B;
  }
}

.content {
  max-width: 600rpx;
  margin: 0 auto;
}

.card {
  background: #FFFFFF;
  border-radius: 32rpx;
  padding: 48rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  margin-bottom: 48rpx;
  
  &-text {
    font-size: 32rpx;
    color: #1E293B;
    font-weight: 500;
  }
}

.features {
  background: #FFFFFF;
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  margin-bottom: 48rpx;
  
  .section-title {
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    color: #1E293B;
    margin-bottom: 32rpx;
  }
  
  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    gap: 16rpx;
    font-size: 28rpx;
    color: #475569;
  }
}
</style>
