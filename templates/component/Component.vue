<template>
  <view class="{{componentName}}">
    <!-- 组件内容 -->
  </view>
</template>

<script setup lang="ts">
/**
 * {{ComponentName}} 组件
 */

interface Props {
  /** 示例属性 */
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
.{{componentName}} {
  /* 样式 */
}
</style>
