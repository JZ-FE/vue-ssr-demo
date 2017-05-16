import axios from 'axios'
import Utils from 'utils'
import _ from 'lodash'

export function createAPI (options = {}) {
  if (_.isString(options)) options = { url: options }

  let defaults = {
    method: 'get',
    baseURL: 'https://hacker-news.firebaseio.com/v0/',
    headers: {},
    params: {},
    timeout: 10000,
    loading: true,
    retData: false,
    showAlert: true,
    validateStatus: null
  }

  options = _.assign(defaults, options)

  let { store } = Utils.init()
  let state = store ? store.state : {}

  if (options.loading) {
    state.loading = true
  }

  let isPost = options.method === 'post' || options.retData
  if (isPost) state.submitting = true

  let start = Date.now()

  return axios(options)
  .then(res => {
    let status = res.status
    let data = res.data

    state.loading = false
    state.submitting = false

    if (status == 500) {
      Utils.uiAlert('Network Error!')
      return []
    } else if (!data) {
      Utils.uiAlert('Data Error!')
      return []
    }

    console.log(`[API]"${options.url}": ${Date.now() - start}ms`)

    let code = data.code
    let msg = data.msg
    let response = data.response

    if (isPost) {
      return data
    }

    if (code === 1) {
      return response
    } else if (options.showAlert) {
      Utils.uiAlert(msg)
    }

    return []
  }).catch(error => {
    state.loading = false
    state.submitting = false

    let err = String(error)
    if (err.indexOf('timeout') > 0) {
      Utils.uiAlert('Request Timeout!')
    }

    console.log(error)
    return []
  })
}
