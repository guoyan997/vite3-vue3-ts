<!--
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-04-08 09:56:40
 * @LastEditors: GY
 * @LastEditTime: 2022-04-08 14:34:19
-->
<template>
  <div
    class="bg-style"
    @click="changeBgColor"
  >
    <canvas
      id="space"
    >
    </canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import sky from '../../hooks/canvasBgStyle/sky'
import colliedBall from '../../hooks/canvasBgStyle/colliedBall'
// 通过数据，控制css样式
const backColor = ref('#ff0000')
const changeBgColor = () => {
  backColor.value = backColor.value === '#ff0000' ? '#ffff00' : '#ff0000'
}
onMounted(() => {
  // 添加canvas背景
  // sky('space')
  colliedBall('space')
})

</script>
<style lang='scss' scoped>
.bg-style {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: v-bind(backColor);
  #space {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>