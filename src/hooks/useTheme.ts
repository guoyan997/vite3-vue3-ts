/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-03-14 10:57:52
 * @LastEditors: GY
 * @LastEditTime: 2022-03-14 16:17:33
 */
import themes from '@/utils/theme'

export default function switchTheme(type: string) {
  // 根据不同的主题类型 获取不同主题数据 
  // themes 对象包含 defaultTheme、darkTheme 两个属性即默认主题与深色主题
  // 通过`import themes from '@/utils/themes'` 导入
  type = type || 'darkTheme'
  const colorObj = themes[type]
  // 获取基本色色阶
  // colorMix是一个函数
  for (let i = 1; i < 10; i += 1) {
    colorObj[`--el-color-primary-light-${10 - i}`] = colorMix(colorObj['--el-color-white'], colorObj['--el-color-primary'], i * 0.1)
  }
  // 设置css 变量， 在css的地方读取相应变量，动态获取样式值
  Object.keys(colorObj).map(item => document.documentElement.style.setProperty(item, colorObj[item]))
}
const colorMix = (color1:string, color2:string, weight:string | number): string => {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  let r1 = parseInt(color1.substring(1, 3), 16)
  let g1 = parseInt(color1.substring(3, 5), 16)
  let b1 = parseInt(color1.substring(5, 7), 16)
  let r2 = parseInt(color2.substring(1, 3), 16)
  let g2 = parseInt(color2.substring(3, 5), 16)
  let b2 = parseInt(color2.substring(5, 7), 16)
  let r:string | number = Math.round(r1 * (1 - weight) + r2 * weight)
  let g:string | number = Math.round(g1 * (1 - weight) + g2 * weight)
  let b:string | number = Math.round(b1 * (1 - weight) + b2 * weight)
  r = ('0' + (r || 0).toString(16)).slice(-2)
  g = ('0' + (g || 0).toString(16)).slice(-2)
  b = ('0' + (b || 0).toString(16)).slice(-2)
  return '#' + r + g + b
}
