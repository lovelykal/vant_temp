import { axios } from './axios'

const request = function ({ url, method = 'get', params = {}, urlReplacements = [] }) {
  let reqUrl = url
  if (['post', 'patch', 'put'].includes(method)) {
    return axios({
      url: reqUrl,
      data: params,
      method
    })
  } else if (['get', 'delete'].includes(method)) {
    return axios({
      url: reqUrl,
      params,
      method
    })
  }
}

export default request
