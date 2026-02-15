/**
 * HTTP 请求封装
 */

import config from '@/config'

const { api } = config

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestOptions {
  method?: RequestMethod
  data?: Record<string, any>
  headers?: Record<string, string>
  showLoading?: boolean
  loadingText?: string
  timeout?: number
}

function request<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    data = {},
    headers = {},
    showLoading = false,
    loadingText = '加载中...',
    timeout = api.timeout,
  } = options

  const fullUrl = url.startsWith('http') ? url : `${api.baseUrl}${url}`

  const header: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  }

  const token = uni.getStorageSync(config.storage.tokenKey)
  if (token) {
    header.Authorization = `Bearer ${token}`
  }

  if (showLoading) {
    uni.showLoading({ title: loadingText, mask: true })
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: fullUrl,
      method,
      data,
      header,
      timeout,
      success: (res: any) => {
        if (showLoading) uni.hideLoading()
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        if (showLoading) uni.hideLoading()
        reject(err)
      },
    })
  })
}

export const http = {
  get<T = any>(url: string, params?: Record<string, any>, options?: Omit<RequestOptions, 'method' | 'data'>) {
    const query = params
      ? '?' + Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
          .join('&')
      : ''
    return request<T>(url + query, { ...options, method: 'GET' })
  },

  post<T = any>(url: string, data?: Record<string, any>, options?: Omit<RequestOptions, 'method' | 'data'>) {
    return request<T>(url, { ...options, method: 'POST', data })
  },

  put<T = any>(url: string, data?: Record<string, any>, options?: Omit<RequestOptions, 'method' | 'data'>) {
    return request<T>(url, { ...options, method: 'PUT', data })
  },

  delete<T = any>(url: string, params?: Record<string, any>, options?: Omit<RequestOptions, 'method'>) {
    const query = params
      ? '?' + Object.entries(params)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
          .join('&')
      : ''
    return request<T>(url + query, { ...options, method: 'DELETE' })
  },
}

export default http
