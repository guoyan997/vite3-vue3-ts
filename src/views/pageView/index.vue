<!--
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-03-07 10:50:36
 * @LastEditors: GY
 * @LastEditTime: 2022-03-09 17:58:27
-->
<template>
  <div
    class="page-view"
    :style="pageStyle"
  >
    <DraggableContainer>
      <Vue3DraggableResizable
        v-for="(block, index) in page.children"
        :key="index"
        v-model:x="block.location.x"
        v-model:y="block.location.y"
        v-model:w="block.size.w"
        v-model:h="block.size.h"
        :init-w="block.size.w"
        :init-h="block.size.h"
        :active="true"
        :parent="true"
        @drag-end="moveEnd"
        @resize-end="resizeEnd"
      >
        <div class="chart">{{ block.children[0].name }}</div>
      </Vue3DraggableResizable>
    </DraggableContainer>
    <div class="tools-bar">
      <el-button
        type="primary"
        @click="changeScale('add')"
      >
        addScale{{ data.scale }}
      </el-button>
      <el-button
        type="primary"
        @click="changeScale('reduce')"
      >
        reduceScale{{ data.scale }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, onMounted, defineEmits, watchEffect, computed } from 'vue'
 
// setup语法糖中props的用法
defineProps({
  name: {
    type: String,
    default: '我是默认值'
  }
})
// setup语法糖 自定义函数，触发父组件方法
const emit = defineEmits(['updata', 'changeUser'])
const changeData = () => {
  emit('updata', { name: '123' })
}
// 下面是页面数据
const page = reactive({
  initStyle: {
    width: 800,
    height: 800
  },
  children: [
    { id: '1', location: { initX: 0, initY: 0, x: 0, y: 0 }, size: { initW: 200, initH: 200, w: 200, h: 200 }, children: [{ id: 'comp1', name: '组件1' }] },
    { id: '2', location: { initX: 50, initY: 50, x: 50, y: 50 }, size: { initW: 200, initH: 200, w: 200, h: 200 }, children: [{ id: 'comp2', name: '组件2' }] },
    { id: '3', location: { initX: 10, initY: 10, x: 10, y: 10 }, size: { initW: 200, initH: 200, w: 200, h: 200 }, children: [{ id: 'comp3', name: '组件3' }] }
  ]
})
const data = reactive({
  scale: 1
})
const pageStyle = computed(() => {
  const style = {
    width: page.initStyle.width * data.scale + 'px',
    height: page.initStyle.height * data.scale + 'px'
  }
  return style
})
const changeScale = (type:string) => {
  if (type === 'add') {
    data.scale += 0.1
  } else {
    data.scale -= 0.1
  }
  getFactValue(data.scale)
}

// 移动结束
const moveEnd = () => {
  // 修改初始位置信息
  for (const block of page.children) {
    block.location.initX = block.location.x / data.scale
    block.location.initY = block.location.y / data.scale
  }
  console.log('页面数据1:' + JSON.stringify(page))
}
// resize结束
const resizeEnd = () => {
  // 修改初始尺寸信息
  for (const block of page.children) {
    block.size.initW = block.size.w / data.scale
    block.size.initH = block.size.h / data.scale
  }
  console.log('页面数据2:' + JSON.stringify(page))
}

// scale 修改初始位置和尺寸信息
const getFactValue = (scale: number) => {
  for (const block of page.children) {
    block.location.x = block.location.initX * scale
    block.location.y = block.location.initY * scale
    block.size.w = block.size.initW * scale
    block.size.h = block.size.initH * scale
  }
}

watchEffect(() => {
  // console.log('页面数据:' + JSON.stringify(page))
})
onBeforeMount(() => {
})
onMounted(() => {
})
</script>
<style scoped lang='scss'>
.page-view {
  margin: 0 auto;
  width: 800px;
  height: 800px;
  background-color: #fff000;
    .chart {
      width: 100%;
      height: 100%;
      background-color: aqua;
    }
    .tools-bar {
      width: 100%;
      height: 80px;
      background-color: aqua;
    }
}
</style>