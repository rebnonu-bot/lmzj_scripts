<template>
  <view class="{{pageName}}-page">
    <!-- 页面内容 -->
  </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // 页面加载
})
</script>

<style lang="scss" scoped>
.{{pageName}}-page {
  min-height: 100vh;
  background: #F4F9FF;
}
</style>
