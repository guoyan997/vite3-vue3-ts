/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-02-23 09:04:11
 * @LastEditors: GY
 * @LastEditTime: 2022-02-23 17:22:53
 */
interface ILib { 
  rem: number,
  dpr: number,
  refreshRem(): void,
  rem2px(d: string): string,
  px2rem(d: string): string
}
declare interface Window {
  lib: ILib
}