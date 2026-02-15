/**
 * 常量统一导出
 */

export * from './enums'

// 默认分页
export const DEFAULT_PAGE_PARAMS = {
  page: 1,
  pageSize: 20,
}

// 正则
export const REGEX = {
  PHONE: /^1[3-9]\\d{9}$/,
  EMAIL: /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$/,
}
