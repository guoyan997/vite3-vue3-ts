/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-02-18 10:49:25
 * @LastEditors: GY
 * @LastEditTime: 2022-02-25 16:51:00
 */
import { getInstanceByDom, init, dispose, ECharts, getInstanceById } from 'echarts'
// import 'echarts-liquidfill'

/**
 * @description: 渲染echart
 * @param {*} id
 * @param {*} op
 * @return {*}
 */
export function renderEcharts(id:string, op:any) {
  const box = document.getElementById(id) as HTMLElement 
  if (!box) return
  const charted = getInstanceByDom(box)
  if (charted) {
    charted.setOption(op)
    return charted
  } 
  const chart = init(box)
  chart.setOption(op)
  return chart
}

/**
 * @description: 注销echart实例
 * @param {*} chart
 * @return {*}
 */
export function disposeChart(chart:ECharts|null) {
  if (chart) {
    chart.dispose()
    dispose(chart)
    chart = null
  }
}

/**
 * @description: 注销echart实例 by ID
 * @param {*} id
 * @return {*}
 */
export function disposeChartById(id:string) {
  if (!id) return
  const charted = getInstanceById(id)
  console.log('销毁qian', id, charted)
  if (charted) {
    charted.dispose()
    dispose(charted)
  }
}

export function resizeChartById(id:string) {
  if (!id) return
  const charted = getInstanceById(id)
  // console.log('刷新',id,charted);
  
  if (charted) {
    charted.resize()
  }
}

/**
 * @description: 刷新chart
 * @param {*} chart
 * @return {*}
 */
export function resizeChart(chart:ECharts) {
  // console.log(chart)
  chart && chart.resize()
}
