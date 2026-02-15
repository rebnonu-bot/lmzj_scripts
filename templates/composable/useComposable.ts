/**
 * use{{ComposableName}} 组合式函数
 */

import { ref, computed } from 'vue'

export function use{{ComposableName}}() {
  const loading = ref(false)
  const data = ref<any>(null)
  
  const computedData = computed(() => data.value)
  
  async function fetchData() {
    loading.value = true
    try {
      // 请求数据
    } finally {
      loading.value = false
    }
  }
  
  return {
    loading,
    data,
    computedData,
    fetchData,
  }
}
