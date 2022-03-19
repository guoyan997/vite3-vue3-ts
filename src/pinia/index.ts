/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-03-04 11:12:25
 * @LastEditors: GY
 * @LastEditTime: 2022-03-04 11:23:20
 */
// 具体的pinia的使用方法，参考如下文档
// https://juejin.cn/post/7068113574043844622?utm_source=gold_browser_extension#heading-6
import { defineStore } from 'pinia'
// 创建一个pinia状态数据，命名为main
export const useMainStore = defineStore('main', {
  // 定义state数据
  state: () => ({
    appId: '1234556',
    appVersion: '1.0.2',
    teacherName: '艾伦',
    userList: [
      { name: '小明', age: 18 },
      { name: '小李', age: 15 },
      { name: '小白', age: 16 }
    ]
  }),
  getters: {
    userInfo: (state) => `老师是${state.teacherName},app版本是${state.appVersion}`,
    userBesidesDesc(): string { // 需注明类型
      return `${this.teacherName}岁的${this.appVersion}` // 可以使用 this 获取值
    },
    returnUserInfo(): string {
      return this.userInfo // 也可以使用 this 获取其他getters
    }
  },
  // 由于pinia取消了mutations，所以状态的改变可以直接通过actions改变
  actions: {
    changeAppId() {
      this.appId = 'aaaaaaaaa' + new Date()
    },
    changeTeacherName(name: string) {
      this.teacherName = name
    }
  }
})
export default useMainStore