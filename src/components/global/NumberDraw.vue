<!--
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-03-02 17:37:55
 * @LastEditors: GY
 * @LastEditTime: 2022-03-02 18:26:00
-->
<template>
  <div class="number-draw number">
    <span
      v-for="c in data"
      :key="c"
    >{{ c }}</span>
    <ul id="dataNums">
      <li
        v-for="(item, index) in data.list"
        :key="index"
      >
        <div class="dataBoc">
          <div
            class="tt"
            :style="{ transition: 'all 2.5s ease-in-out 0s', top: '-' + item.top + 'px' }"
          >
            <span
              v-for="(item2, index2) in numList"
              :key="index2"
            >{{ item2 }} </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive, onBeforeMount, onMounted } from 'vue'

interface IArrItem {
  num: string
  top: number
}
interface IData {
  list: IArrItem[]
}
export default {
  name: 'NumberDraw',
  props: {
    numData: {
      type: Number,
      default: 8888.8
    }
  },
  setup(props: any) {
    const data = reactive<IData>({
      list: []
    })
    // let list = reactive<IArrItem[]>([])
    const numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.']
    const scroll = () => {
      const numStrList = props.numData.toString().split('')
      let arr: IArrItem[] = []
      numStrList.forEach((value: string) => {
        arr.push({ num: value, top: 0 })
      })
      data.list = arr
      let Hei: number = parseFloat(getComputedStyle(document.getElementById('dataNums') as HTMLElement).height)
      data.list.forEach((value, index) => {
        setTimeout(() => { value.top = parseFloat((parseFloat(value.num) * Hei) + (Hei * 10)) },
          index * 300)
      })
    }
    onBeforeMount(() => {
    })
    onMounted(() => {
      scroll()
    })
    return {
      data,
      numList
    }
  }
}
</script>
<style scoped lang="scss">
.number {
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
  ul {
    display: inline-block;
    width: 600px;
    height: 40px;
    text-align: center;
    li {
      float: left;
      width: 40px;
      height: 40px;
      text-align: center;
      margin: 0 4px;
      background-color: aqua;
      // background: url("../assets/images/yuyueshf/number.png") no-repeat center;//背景图
      background-size: 100% 100%;
      .dataBoc {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .tt {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          span {
            width: 100%;
            height: 100%;
            line-height: 40px;
            float: left;
            text-align: center;
            font-size: 26px;
            color: #f64841;
          }
        }
      }
    }
  }
}
</style>
