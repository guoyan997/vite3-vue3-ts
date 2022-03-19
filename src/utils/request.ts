/**
 * @description 接口
 */
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

// const API = {
//   getIdentifyingCode: '/InterfacePlatform/validate/getIdentifyingCode' // 平台接口获取code
// }
const baseUrl = '/api' // import.meta.env.VITE_APP_BASE_API as string

const axiosConfig:AxiosRequestConfig<any> = {
  method: 'post',
  // 基础url前缀
  baseURL: baseUrl,
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', // 接口平台默认使用表单格式数据提交参数
    token: '111111' // 接口平台需要的token值，有的需要写死，有的需要是动态值，根据项目情况而定
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 1000 * 20,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}
const servier = axios.create(axiosConfig)

/**
 * @description: 接口请求
 * @param {*} url  地址
 * @param {*} params 传输参数
 * @param {*} options axios配置
 * @param {*} loading 是否显示loading
 * @return {*}
 */
function request(url:string, params = {}, options = {}) {
  const configs = {
    ...axiosConfig,
    url,
    data: qs.stringify(params),
    ...options
  }
  return new Promise((resolve, reject) => {
    servier(configs)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      console.log(url)
      reject(err)
      // this.$throw(err)
    })
  })
}

export default request
