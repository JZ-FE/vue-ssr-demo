import axios from 'axios'
import Utils from 'utils'
import _ from 'lodash'

export default function createAPI (config = {}) {
  let options = config

  if (_.isString(options)) options = { url: options }

  const defaults = {
    method: 'get',
    baseURL: 'https://hacker-news.firebaseio.com/v0/',
    headers: {

    },
    params: {

    },
    timeout: 10000,
    loading: true,
    retData: false,
    showAlert: true,
    validateStatus: null,
  }

  options = _.assign(defaults, options)

  const { store } = Utils.init()
  const state = store ? store.state : {}

  if (options.loading) {
    state.loading = true
  }

  const isPost = options.method === 'post'
  if (isPost) state.submitting = true

  const start = Date.now()

  return axios(options).then((res) => {
    const { status, data } = res

    state.loading = false
    state.submitting = false

    if (status === 500) {
      Utils.uiAlert('Network Error!')
      return []
    } else if (!data) {
      Utils.uiAlert('Data Error!')
      return []
    }

    console.log(`[API]"${options.url}": ${Date.now() - start}ms`) // eslint-disable-line

    const { code, msg, response } = data

    if (options.retData) return data

    if (isPost) Utils.uiToast(msg)

    if (code === 1) {
      return response
    } else if (options.showAlert) {
      Utils.uiAlert(msg)
    }

    return []
  }).catch((error) => {
    state.loading = false
    state.submitting = false

    const err = String(error)
    if (err.indexOf('timeout') > 0) {
      Utils.uiAlert('Request Timeout!')
    }

    console.log(error) // eslint-disable-line
    return []
  })
}
