<!--
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-03-10 08:59:21
 * @LastEditors: GY
 * @LastEditTime: 2022-03-11 14:31:34
-->
<template>
  <div class="charts-demo">
    <div
      ref="chartLine"
      class="chart"
    ></div>
    <div
      ref="chartBar"
      class="chart"
    ></div>
    <div
      ref="chartMap"
      class="chart"
    ></div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, ref, Ref } from 'vue'
import { useECharts } from '@/hooks/useECharts'
// eslint-disable-next-line
import chinaJson from '/public/map/china.json'

export default {
  name: 'ChartDemo',
  props: [],
  setup() {
    const data = reactive({})
    const chartLine = ref<HTMLDivElement | null>(null)
    const chartBar = ref<HTMLDivElement | null>(null)
    const chartMap = ref<HTMLDivElement | null>(null)
    const line = useECharts(chartLine as Ref<HTMLDivElement>)
    const bar = useECharts(chartBar as Ref<HTMLDivElement>)
    const map = useECharts(chartMap as Ref<HTMLDivElement>, 'default', 'china', chinaJson)
    const randomData = () => Math.round(Math.random() * 500)
    const mapOption = {
      // geo: {
      // // 地理坐标系组件,支持在地理坐标系上绘制散点图、线图
      //   map: 'china',
      //   aspectScale: 0.75,
      //   zoom: 1.1
      // },
      series: [
        {
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: true,
          aspectScale: 0.75,
          zoom: 1.5,
          label: {
            normal: {
              show: true,
              formatter(params: any) {
                return params.name + '\n' + params.value
              },
              textStyle: {
                fontWeight: 'normal',
                fontSize: 12,
                color: '#fff'
              }
            }
          },
          // 下面这个可以设置鼠标悬停上面的效果
          emphasis: { // 对应的鼠标悬浮效果
            show: true,
            label: {
              textStyle: { color: '#ff0000' }
            },
            itemStyle: {
              areaColor: '#ffff00'
            }
          },
          itemStyle: {
            //  设置边框为白色
            normal: {
              borderWidth: 0.5, // 边际线大小
              borderColor: '#fff', //  边界线颜色
              areaColor: '#42bdff'
            }
          },
          data: [
            { name: '北京', value: 100 },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '重庆', value: randomData() },
            { name: '河北', value: randomData() },

            { name: '河南', value: randomData() },

            { name: '云南', value: randomData() },

            { name: '辽宁', value: randomData() },

            { name: '黑龙江', value: randomData() },

            { name: '湖南', value: randomData() },

            { name: '安徽', value: randomData() },

            { name: '山东', value: randomData() },

            { name: '新疆', value: randomData() },

            { name: '江苏', value: randomData() },

            { name: '浙江', value: randomData() },

            { name: '江西', value: randomData() },

            { name: '湖北', value: randomData() },

            { name: '广西', value: randomData() },

            { name: '甘肃', value: randomData() },

            { name: '山西', value: randomData() },

            { name: '内蒙古', value: randomData() },

            { name: '陕西', value: randomData() },

            { name: '吉林', value: randomData() },

            { name: '福建', value: randomData() },

            { name: '贵州', value: randomData() },

            { name: '广东', value: randomData() },

            { name: '青海', value: randomData() },

            { name: '西藏', value: randomData() },

            { name: '四川', value: randomData() },

            { name: '宁夏', value: randomData() },

            { name: '海南', value: randomData() },

            { name: '台湾', value: randomData() },

            { name: '香港', value: randomData() },

            { name: '澳门', value: randomData() }
          ] // 数据
        }
      ],
      visualMap: {
        show: false,
        x: 'left',
        y: 'center',
        // 改变地图区域颜色
        splitList: [
          { start: 500, end: 600 },
          { start: 400, end: 500 },
          { start: 300, end: 400 },
          { start: 200, end: 300 },
          { start: 100, end: 200 },
          { start: 0, end: 100 }
        ],
        color: [
          '#ffff00',
          '#0e94eb',
          '#70bcf0',
          '#f0f26c',
          '#00cd00',
          '#eff26f'
        ]
      }
    }
    onMounted(() => {
      line.setOptions({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '6:00',
            '7:00',
            '8:00',
            '9:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00'
          ],
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            max: 80000,
            splitNumber: 4,
            axisTick: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)']
              }
            }
          }
        ],
        grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
        series: [
          {
            smooth: true,
            data: [
              111,
              222,
              4000,
              18000,
              33333,
              55555,
              66666,
              33333,
              14000,
              36000,
              66666,
              44444,
              22222,
              11111,
              4000,
              2000,
              500,
              333,
              222,
              111
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#5ab1ef'
            }
          },
          {
            smooth: true,
            data: [
              33,
              66,
              88,
              333,
              3333,
              5000,
              18000,
              3000,
              1200,
              13000,
              22000,
              11000,
              2221,
              1201,
              390,
              198,
              60,
              30,
              22,
              11
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#019680'
            }
          }
        ]
      })
      bar.setOptions({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '6:00',
            '7:00',
            '8:00',
            '9:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00'
          ],
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            max: 80000,
            splitNumber: 4,
            axisTick: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)']
              }
            }
          }
        ],
        series: [
          {
            data: [
              111,
              222,
              4000,
              18000,
              33333,
              55555,
              66666,
              33333,
              14000,
              36000,
              66666,
              44444,
              22222,
              11111,
              4000,
              2000,
              500,
              333,
              222,
              111
            ],
            type: 'bar',
            areaStyle: {},
            itemStyle: {
              color: '#5ab1ef'
            }
          },
          {
            data: [
              33,
              66,
              88,
              333,
              3333,
              5000,
              18000,
              3000,
              1200,
              13000,
              22000,
              11000,
              2221,
              1201,
              390,
              198,
              60,
              30,
              22,
              11
            ],
            type: 'bar',
            areaStyle: {},
            itemStyle: {
              color: '#019680'
            }
          }
        ]
      })
      map.setOptions(mapOption)
    })
    const refData = toRefs(data)
    return {
      ...refData,
      chartLine,
      chartBar,
      chartMap
    }
  }
}
</script>
<style scoped lang='scss'>
.charts-demo{
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: 400px;
  }
}
</style>