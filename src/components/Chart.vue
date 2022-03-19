<!--
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-02-14 17:08:37
 * @LastEditors: GY
 * @LastEditTime: 2022-02-22 19:52:48
-->
<template>
  <div class="" />
</template>

<script lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'

export default {
  name: 'ChartBox',
  props: [],
  setup() {
    //  const ctx = getCurrentInstance()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {})
    const refData = toRefs(data)
    return {
      ...refData
    }
  }
}
</script>
<style scoped lang='scss'>
</style>