<!--
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-02-21 17:10:28
 * @LastEditors: GY
 * @LastEditTime: 2022-03-04 18:02:06
-->
<template>
  <div class="user-page">
    user页面
    <HelloWorld :msg="userName" />
    <div class="user">{{ userName }}</div>
    <button @click="changeScale">修改缩放比</button>
    <div
      class="page-content"
      :style="pageStyle"
    >
      <DraggableContainer>
        <Vue3DraggableResizable
          :w="itemWidth"
          :h="itemHeight"
          :parent="true"
        >
          <div class="chart">组件1</div>
        </Vue3DraggableResizable>
        <Vue3DraggableResizable
          :w="itemWidth"
          :h="itemHeight"
          :parent="true"
        >
          <div class="chart">组件2</div>
        </Vue3DraggableResizable>
      </DraggableContainer>
    </div>
  </div>
</template>

<script lang="ts" >
import HelloWorld from '../../components/HelloWorld.vue'
import { reactive, toRefs, onBeforeMount, onMounted, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UserPage',
  components: {
    HelloWorld
  },
  props: [],
  setup() {
    const data = reactive({
      itemWidth: 200,
      itemHeight: 200,
      scale: 1
    })
    const userStore = useStore()
    const userName = computed(() => userStore.state.user.name)
    const pageStyle = computed(() => { 
      const style = { backgroundColor: 'red' }
      return style
    })
    const changeScale = () => {
      data.scale -= 0.1
    } 
    watchEffect(() => {
      console.log('*********scale' + data.scale)
    })
    onBeforeMount(() => {})
    onMounted(() => {})
    const refData = toRefs(data)
    return {
      ...refData,
      userName,
      pageStyle,
      changeScale
    }
  }
}
</script>
<style scoped lang="scss">
.user-page {
  width: 100%;
  height: 100%;
  .page-content {
    margin: 0 auto;
    width: 800px;
    height: 800px;
    background-color: #fff000;
    // transform:scale(0.8);
    .chart {
      width: 100%;
      height: 100%;
      background-color: aqua;
    }
  }
}
</style>
