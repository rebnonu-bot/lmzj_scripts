/**
 * API 类型定义
 */

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp?: number
}

export interface PageParams {
  page?: number
  pageSize?: number
}

export interface PageResult<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface UserInfo {
  id: string
  nickname: string
  avatar?: string
  phone?: string
}

export interface LoginResult {
  token: string
  refreshToken: string
  expiresIn: number
  userInfo: UserInfo
}
