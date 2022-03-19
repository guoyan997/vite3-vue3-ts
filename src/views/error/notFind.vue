<!--
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-03-04 11:05:42
 * @LastEditors: GY
 * @LastEditTime: 2022-03-04 11:06:54
-->
<template>
  <div class="not-find">
    404
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'

export default {
  name: 'NotFind',
  props: [],
  setup() {
    const data = reactive({})
    onBeforeMount(() => {
    })
    onMounted(() => {
    })
    const refData = toRefs(data)
    return {
      ...refData
    }
  }
}
</script>
<style scoped lang='scss'>
.not-find {
  
}
</style>