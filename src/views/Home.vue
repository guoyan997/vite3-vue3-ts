<!--
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-02-21 13:39:24
 * @LastEditors: GY
 * @LastEditTime: 2022-04-08 09:58:54
-->
<template>
  <div class="home">
    <div>{{ data.label }}</div>
    <div class="aaa">
      默认props值
      {{ props.msg }}
    </div>
    <div>默认props值{{ props.user.name }}</div>
    <div
      :id="chartId"
      class="chart"
    ></div>
    <div class="blank">
    </div>
    <div class="swiper-container">
      <swiper
        class="swiper-con"
        :modules="[Thumbs]"
        watch-slides-progress
        :slides-per-view="1"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <swiper-slide>1111</swiper-slide>
        <swiper-slide>2222</swiper-slide>
        <swiper-slide>33333</swiper-slide>
        <swiper-slide>44444</swiper-slide>
        <swiper-slide>55555</swiper-slide>
      </swiper>
    </div>
    <div
      id="example"
      class="chart chart2"
    ></div>
    <el-button
      type="primary"
      @click="changeTheme('darkTheme')"
    >
      切换主题
    </el-button>
    <el-button
      type="success"
      @click="changeTheme('defaultTheme')"
    >
      浅色主题
    </el-button>
    <div
      id="example2"
      class="chart"
    ></div>
    <!-- <div
      :id="chartId2"
      class="chart"
    ></div>
    <div class="chart">
      <NumberDraw />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, withDefaults, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import _ from 'lodash'
import { sleep } from '@/utils/common'
import { renderEcharts, disposeChartById } from '../utils/echarts'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import useTheme from '@/hooks/useTheme'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

SwiperCore.use([Thumbs, Navigation, Pagination, Scrollbar, A11y])
// 传入数据结构
interface IUser {
  name: string
}
// 设置传入参数
interface IProps {
  msg?: string
  user: IUser
}
// 设置默认值
const props = withDefaults(defineProps<IProps>(), {
  msg: '123',
  user: () => ({ name: 'ld' }) // 对象给默认值
})

const data = reactive({ label: '首页', value: '1234' })
const chartId = _.uniqueId('chart_')
const chartId2 = _.uniqueId('chart_')
const chartOption = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: 'Gradient Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310]
    },
    {
      name: 'Line 3',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 220]
    },
    {
      name: 'Line 4',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 402, 231, 134, 190, 230, 120]
    },
    {
      name: 'Line 5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 302, 181, 234, 210, 290, 150]
    }
  ]
}
const chartOption2 = {
  series: [
    {
      type: 'liquidFill',
      radius: '100px',
      data: [0.6],
      label: {
        normal: {
          color: '#fff',
          insideColor: 'transparent',
          textStyle: {
            fontSize: 30,
            fontWeight: 'bold'
          }
        }
      },
      color: [
        {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 1,
              color: ['#6a7feb'] // 0% 处的颜色
            },
            {
              offset: 0,
              color: ['#27e5f1'] // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      ],
      outline: {
        show: true,
        borderDistance: 5,
        itemStyle: {
          borderColor: 'rgba(67,209,100,1)',
          borderWidth: 0
        }
      }
    }
  ]
}
const onSwiper = (swiper: any) => {
  console.log(swiper)
}
const onSlideChange = () => {
  console.log('slide change')
}
const changeTheme = (type: string) => {
  // defaultTheme、darkTheme
  useTheme(type)
}
const addView = () => {
  let io = new IntersectionObserver((entries) => {
    entries.forEach(dom => {
      console.log('目标' + dom.target.id + '是否可见:' + dom.isIntersecting)
    })
  }, {})
  // 开始观察
  const target1 = document.getElementById('example')
  const target2 = document.getElementById('example2')
  // 观察多个dom节点
  io.observe(target1 as Element)
  io.observe(target2 as Element)

  // 停止观察
  // io.unobserve(element)
  // 关闭观察器
  // io.disconnect()
}
onBeforeMount(() => {})
onMounted(async () => {
  renderEcharts(chartId, chartOption)
  renderEcharts(chartId2, chartOption2)
  window.addEventListener('resize', () => {
    window.location.reload()
  })
  // 休眠方法，延迟执行方法
  console.log('Do some thing, ' + new Date())
  await sleep(3000)
  console.log('Do other things, ' + new Date())
  // 观察dom节点是否在可视区域
  addView()
})
onBeforeUnmount(() => {
  console.log('**********' + chartId)
  disposeChartById(chartId)
  disposeChartById(chartId2)
})
</script>
<style scoped lang="scss">
.home {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  .aaa {
    font-size: px2rem(18);
  }
  .chart {
    margin: 0 auto;
    width: px2rem(375);
    height: px2rem(375);
    background-color: #ffff00;
  }
  .chart2 {
    color: var(--el-text-color-regular);
    background-color: var(--el-color-black);
  }
  .swiper-container {
    margin: 0 auto;
    width: px2rem(375);
    height: px2rem(375);
    background-color: aqua;
    .swiper-con {
      height: 100%;
      .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .blank {
    margin: 0 auto;
    width: px2rem(375);
    height: px2rem(1000);
  }
}
</style>
