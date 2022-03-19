<!--
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-02-14 15:59:45
 * @LastEditors: GY
 * @LastEditTime: 2022-03-07 10:48:17
-->
<template>
  <h1>{{ msg }}</h1>
  <!--加载自动注册的公共组件-->
  <PageHeader />
  <span>{{ count }}</span>
  <span>vuex中的值{{ stateCount }}</span>
  <div @click="add">
    +
  </div>
  <div @click="redurce">
    -
  </div>
  <span>{{ userCode }}</span>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import eventBus from '../utils/eventBus'
import RequestApi from '../utils/RequestApi'

defineProps<{ msg: string }>()
const count = ref(0)
const store = useStore()
const stateCount = computed(() => store.state.count)
const add = () => {
  store.commit('addCount', 2)
}
const redurce = () => {
  store.commit('redurce')
}
const userCode = ref(0)
const knowHeaderOk = (msg: string) => {
  console.log(msg)
}

const getUserCode = async () => {
  const resp = await RequestApi.get('./data.json')
  userCode.value = resp.userCode
  console.log('用户编码222：' + resp.userCode)
}
const getUserName = async () => {
  const resp = await RequestApi.get('./data.json')
  console.log('用户编码222：' + resp.userCode)
  console.log('用户名称222：' + resp.userName)
}
// 页面加载前，用于发送请求
onBeforeMount(() => {
  // 两个相同的请求，只发送一次请求
  getUserCode()
  getUserName()
})
onMounted(() => {
  eventBus.on('headerOK', knowHeaderOk)
  console.log('环境变量数据：' + import.meta.env.VITE_APP_API)
})
onUnmounted(() => {
  console.log('页面卸载')
  eventBus.off('headerOK', knowHeaderOk)
})
</script>
<style scoped lang="scss">
h1 {
  color: $baseColor;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
