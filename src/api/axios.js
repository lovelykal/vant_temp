import axios from 'axios'

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJUT0tFTl9VU0VSX05BTUUiOiJpbm5lciIsIlRPS0VOX1VTRVJfSUQiOi0xLCJUT0tFTl9URU5BTlRfSUQiOjEsImlhdCI6MTU3MTIyMjIyNSwianRpIjoiOWQ4YjlhMTUtNjdkZS00MTM3LTlhYmItODA1ZGY5M2RkOWZlIiwiZXhwIjoxNjY1ODMwMjI1fQ.vjuPiUuNwGjdfKJXzu7hzyNvpItXXhSteXdeEfE5514' // 代替token
const ACCESS_TOKEN = 'authorization' // Access-Token
const baseURl = 'http://139.198.124.180:8020'
const service = axios.create({
  // baseURl: 'http://api',
  timeout: 10000,
  adapter: function (config) {
    return new Promise((resolve, reject) => {
    // console.log(config,'adapter')
      let data = config.method === 'get' ? config.params : JSON.stringify(config.data)
      // wx小程序 发起请求相应 log 就可以http:/看到熟悉的返回啦
      wx.request({
        url: baseURl + config.url,
        method: config.method,
        data: data,
        success: (res) => { return resolve(res) },
        fail: (err) => { return reject(err) }
      })
    })
  }
})
// 请求拦截器
service.interceptors.request.use(
  // 发送请求前配置
  config => {
    // if (token) {
    config.headers[ACCESS_TOKEN] = token
    console.log(config)
    // }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 处理相应数据
  response => {
    const res = response.data
    if (response.headers[ACCESS_TOKEN]) {
    }
    // 请求失败则抛出错误
    if (res.code !== 200) {
      throw new Error(res.message)
    }
  }
)

export { service as axios }
