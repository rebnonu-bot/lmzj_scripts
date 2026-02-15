/**
 * {{ModuleName}} API 模块
 */

import http from '../request'

export const {{moduleName}}Api = {
  /** 获取列表 */
  getList: (params?: Record<string, any>) => 
    http.get('/{{moduleName}}/list', params),
  
  /** 获取详情 */
  getDetail: (id: string) => 
    http.get(`/{{moduleName}}/${id}`),
  
  /** 创建 */
  create: (data: Record<string, any>) => 
    http.post('/{{moduleName}}', data),
  
  /** 更新 */
  update: (id: string, data: Record<string, any>) => 
    http.put(`/{{moduleName}}/${id}`, data),
  
  /** 删除 */
  delete: (id: string) => 
    http.delete(`/{{moduleName}}/${id}`),
}
