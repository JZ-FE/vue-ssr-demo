export default {
  install (Vue, options) {
    Vue.prototype.linkTo = function (url = '') {
      return `/vue-ssr/${url}`
    }
  }
}
