export default {
  install (Vue, options) {
  	Vue.prototype.linkTo = function (url = '', prefix = '/vue-ssr/') {
      return `${prefix}${url}`
    }
  }
}
