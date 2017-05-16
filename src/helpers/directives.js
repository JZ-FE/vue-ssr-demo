import Vue from 'vue'

export const scrollBottom = Vue.directive('scroll-bottom', {
  update: (el) => {
    setTimeout(() => el.scrollTop = el.scrollHeight, 1)
  }
})

export const wechatTitile = Vue.directive('wechat-title', {
  bind: (el) => {
    let ua = navigator.userAgent.toLowerCase()

    if ((/MicroMessenger/i).test(ua) && /iphone|ipad|ipod/.test(ua)) {
      let iframe = document.createElement('iframe')
      let iframeCallback
      let iframeInstance

      iframe.style.display = 'none'
      iframe.setAttribute('src', '/favicon.ico')

      iframeCallback = setTimeout(() => {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)

      iframeInstance = setTimeout(() => {
        iframe.addEventListener('load', iframeCallback)
        document.body.appendChild(iframe)
      }, 0)
    }
  }
})
