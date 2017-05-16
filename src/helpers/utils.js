let app, store

const Utils = {
  // Initialize
  init (a, s) {
    if (a) app = a
    if (s) store = s
    
    return { app, store }
  },

  // Window userAgent
  UA () {
    return this.isWin() && window.navigator.userAgent
  },

  // Checks if in Client
  isWin () {
    return typeof window !== 'undefined'
  },

  // Checks if in the APP
  isAPP () {
    return this.isWin() && /n8Web/i.test(this.UA())
  },

  // Checks if in the IOS
  isIOS () {
    return this.isWin() && /iphone|ipad|ipod/i.test(this.UA())
  },

  // Checks if in the Android
  isAndroid () {
    return this.isWin() && /android/i.test(this.UA())
  },

  // Checks if in the Weixin
  isWeixin () {
    return this.isWin() && /MicroMessenger/i.test(this.UA())
  },

  // Checks if in the Mobile
  isMobile () {
    return this.isWin() && /iPhone|iPad|iPod|Android|Windows Phone/.test(this.UA())
  },

  // Checks if in the PC
  isPC () {
    return this.isWin() && !this.isMobile()
  },

  // Checks if in the H5
  isH5 () {
    return this.isWin() && !this.isAPP()
  },

  // Alert in Client or Console in Server
  alert (msg) {
    if (!msg) return

    if (this.isWin()) {
      alert(msg)
    } else {
      console.log(msg)
    }
  },

  // UI Alert
  uiAlert (msg) {
    if (!msg) return

    if (this.isWin()) {
      app.$ui.alert.show(msg)
    } else {
      console.log(msg)
    }
  },

  // UI Toast
  uiToast (msg) {
    if (!msg) return

    if (this.isWin()) {
      app.$ui.toast.show(msg)
    } else {
      console.log(msg)
    }
  },

  // UI Image
  uiImage (event) {
    let target = event.target
    let tagName = target.tagName.toLowerCase()
    let imageSrc = target.src

    if (tagName == 'img' && imageSrc) {
      imageSrc = imageSrc.split('?')[0]
      app.$ui.image.show(imageSrc)
    }
  },

  // Get URL param
  getUrlParam (name) {
    let reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)

    if (r != null) return unescape(decodeURI(r[2]))
    return null
  }

}

export default Utils
