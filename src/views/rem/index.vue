<!--
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-04-13 09:35:14
 * @LastEditors: GY
 * @LastEditTime: 2022-04-13 10:25:04
-->
<template>
  <div class="rem-index">
    <div class="header">页面自适应测试</div>
    <div class="content">
      <div class="left-up block"></div>
      <div class="left-down block"></div>
      <div class="right-up block"></div>
      <div class="right-down block"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, onBeforeMount, onMounted } from 'vue'

const data = reactive({})
onBeforeMount(() => {
})
onMounted(() => {
})
</script>
<style lang='scss' scoped>
.rem-index {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  .header {
    width: 100%;
    height: px2vh(40);
    background-color: aqua;
    font-size: px2rem(24);
    flex-shrink: 0;
  }
  .content {
    width: 100%;
    flex: 1;
    background-color: aquamarine;
    display: flex;
    justify-content: space-around;
    .block {
      width: px2rem(400);
      height: px2vh(600);
      background-color: #ff0000;
    }
  }
  
}
</style>