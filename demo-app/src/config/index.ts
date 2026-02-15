/**
 * 全局配置文件
 */

export type EnvType = 'development' | 'production' | 'test'

export const env: EnvType = import.meta.env.MODE as EnvType || 'development'

export const config = {
  app: {
    name: 'demo-app',
    version: '1.0.0',
  },
  
  env,
  isDev: env === 'development',
  isProd: env === 'production',
  isTest: env === 'test',
  
  api: {
    baseUrl: env === 'production' 
      ? 'https://api.example.com/v1'
      : env === 'test'
        ? 'https://test-api.example.com/v1'
        : 'http://localhost:3000/v1',
    timeout: 15000,
  },
  
  storage: {
    tokenKey: 'access_token',
    userKey: 'user_info',
  },
}

export default config
