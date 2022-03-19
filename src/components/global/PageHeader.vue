<template>
  <div class="header-comp">
    这个是公共组件
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import eventBus from '../../utils/eventBus'

export default {
  name: 'PageHeader',
  props: [],
  setup() {
    //  const ctx = getCurrentInstance()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      eventBus.emit('headerOK', '页面头部加载完成！')
    })
    const refData = toRefs(data)
    return {
      ...refData
    }
  }
}
</script>
<style scoped lang='scss'>
.header-comp {
  width: 100%;
  height: 40px;
  background-color: red;
}
</style>