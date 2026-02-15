/**
 * 枚举常量定义
 */

// 页面路径
export enum PagePath {
  HOME = '/pages/home/index',
}

// 存储键名
export enum StorageKey {
  TOKEN = 'access_token',
  USER_INFO = 'user_info',
}

// HTTP 状态码
export enum HttpCode {
  OK = 200,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  ERROR = 500,
}
