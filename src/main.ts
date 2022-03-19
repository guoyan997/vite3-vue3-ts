/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-02-14 15:59:45
 * @LastEditors: GY
 * @LastEditTime: 2022-03-07 14:08:53
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 使用pinia管理状态数据
import { createPinia } from 'pinia'
// 重置浏览器默认样式
import './assets/style/reset.scss'
// 引入rem设置
import './utils/flexible'
// 引入自动注册公共组件功能
import autoRegisterComps from './utils/autoRegisterComp'
// 引入封装的axios
import request from './utils/request'
// 引入拖拽组件，支持对齐和吸附
import Vue3DraggableResizable from 'vue3-draggable-resizable'
// 需引入默认样式
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 全局数据和方法挂载
app.config.globalProperties.$request = request
app.config.globalProperties.$user = {
  name: 'gy'
}
app.use(router)
.use(store)
.use(createPinia())
.use(autoRegisterComps)
.use(ElementPlus)
.use(Vue3DraggableResizable)
.mount('#app')
