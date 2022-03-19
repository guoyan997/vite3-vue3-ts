/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-02-21 17:21:46
 * @LastEditors: GY
 * @LastEditTime: 2022-03-04 15:55:57
 */
import { InjectionKey } from 'vue'
import { Store, createStore, useStore as baseUseStore } from 'vuex'
import user from './module/user'

export interface IState {
  count: number
}

// 定义 injection key
export const key: InjectionKey<Store<IState>> = Symbol('vue-store')

const store = createStore<IState>({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    addCount(state, payload) {
      state.count += payload
    },
    redurce(state) {
      state.count--
    }
  },
  modules: {
    user
  }
})
export default store
export function useStore() {
  return baseUseStore(key)
}