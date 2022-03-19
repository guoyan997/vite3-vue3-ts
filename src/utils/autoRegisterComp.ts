/*
 * :Date: 2022-02-18 11:20:59
 * :LastEditTime: 2022-02-21 09:45:50
 * :Description: created by GY
 * :LastEditors: gy
 */

import { defineAsyncComponent } from 'vue'
// 获取src/components文件夹下所有vue文件,可以根据项目需求，
// 在components下创建一个global文件夹专门放置所有的公共组件
// 扫描components/global/目录下，包括子目录的所有组件，自动注册，
const components = import.meta.glob('../components/global/**/*.vue')
export default function install(app: any) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
    app.component(name, defineAsyncComponent(value))
  }
}