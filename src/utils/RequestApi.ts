import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  CancelTokenStatic
} from 'axios'
import qs from 'qs'

interface MyResponseType<T>{
  code: number
  data: T[]
  message: string
  [propName: string]: any // 任意属性
}

export class Request {
  protected instance: AxiosInstance

  protected pending: Array<{
    url: string
    cancel: Function
  }> = []

  protected CancelToken: CancelTokenStatic = axios.CancelToken

  protected axiosRequestConfig: AxiosRequestConfig = {}

  protected successCode: Array<Number> = [200, 201, 204]

  protected baseURL = '/'

  constructor() {
    this.requestConfig()
    this.instance = axios.create(this.axiosRequestConfig)
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<MyResponseType<T>> {
    try {
      const data: MyResponseType<T> = await this.instance.get(url, config)
      return data
    } catch (err: any) {
      const message = err.message || '请求失败'
      return {
        code: -1,
        message,
        data: null as any
      }
    }
  }

  async post<T = any>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<MyResponseType<T>> {
    try {
      const res: MyResponseType<T> = await this.instance.post(url, data, config)
      return res
    } catch (err: any) {
      const message = err.message || '请求失败'
      return {
        code: -1,
        message,
        data: null as any
      }
    }
  }

  // axios请求配置
  protected requestConfig(): void {
    this.axiosRequestConfig = {
      baseURL: this.baseURL,
      headers: {
        timestamp: String(new Date().getTime()),
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      // transformRequest: [(obj) => qs.stringify(obj)],
      // transformResponse: [
      //   (data: AxiosResponse) => data
      // ],
      timeout: 10000,
      withCredentials: true,
      responseType: 'json',
      // xsrfCookieName: 'XSRF-TOKEN',
      // xsrfHeaderName: 'X-XSRF-TOKEN',
      maxRedirects: 5,
      maxContentLength: 2000,
      validateStatus(status: number) {
        return status >= 200 && status < 500
      }
    }
  }

  // 请求拦截
  protected interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        this.removePending(config)
        config.cancelToken = new this.CancelToken((c: any) => {
          this.pending.push({
            url: `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`,
            cancel: c
          })
        })
        const token = 'myCustomToken'
        if (token) {
          Object.assign(config.headers, { 'x-token': token || '' })
        }
        this.requestLog(config)
        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )
  }

  // 响应拦截
  protected interceptorsResponse(): void {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.responseLog(response)
        this.removePending(response.config)
        if (this.successCode.indexOf(response.status) === -1) {
          // Message({
          //   message: response.data.message || 'Error',
          //   type: 'error',
          //   duration: 5 * 1000
          // })
          // if (response.data.code === 401) {
          //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          //     confirmButtonText: '重新登录',
          //     cancelButtonText: '取消',
          //     type: 'warning'
          //   }).then(() => {
          //     UserModule.ResetToken()
          //     location.reload()
          //   })
          // }
          return Promise.reject(new Error(response.data || 'Error'))
        }
        return response.data
      },
      (error: AxiosError) => Promise.reject(error)
    )
  }

  // 取消重复请求
  protected removePending(config: AxiosRequestConfig): void {
    this.pending.map((v, index) => {
      if (v.url === `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`) {
        v.cancel()
        console.log('=====', this.pending)
        this.pending.splice(index, 1)
        console.log('+++++', this.pending)
      }
      return v
    })
  }

  // 请求日志
  protected requestLog(request: AxiosRequestConfig): void {
    if (process.env.NODE_ENV === 'development') {
      const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`
      console.log(
        '%c┍------------------------------------------------------------------┑',
        `color:${randomColor};`
      )
      console.log('| 请求地址：', request.url)
      console.log(
        '| 请求参数：',
        qs.parse(
          ((request.method || 'get').toLowerCase() === 'get' ? request.params : request.data) as any
        )
      )
      console.log(
        '%c┕------------------------------------------------------------------┙',
        `color:${randomColor};`
      )
    }
  }

  // 响应日志
  protected responseLog(response: AxiosResponse): void {
    if (process.env.NODE_ENV === 'development') {
      const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`
      console.log(
        '%c┍------------------------------------------------------------------┑',
        `color:${randomColor};`
      )
      console.log('| 请求地址：', response.config.url)
      console.log('| 请求参数：', qs.parse(response.config.data as any))
      console.log('| 返回数据：', response.data)
      console.log(
        '%c┕------------------------------------------------------------------┙',
        `color:${randomColor};`
      )
    }
  }
}

export default new Request()