/**
 * 全局类型声明
 */

declare module '@dcloudio/types' {
  interface Uni {
    $on(eventName: string, callback: (...args: any[]) => void): void
    $off(eventName?: string, callback?: (...args: any[]) => void): void
    $emit(eventName: string, ...args: any[]): void
    $once(eventName: string, callback: (...args: any[]) => void): void
  }
}

declare const uni: UniNamespace.Uni

declare module '*.png' {
  const src: string
  export default src
}
