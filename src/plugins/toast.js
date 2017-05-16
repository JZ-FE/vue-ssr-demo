import UiToast from 'components/ui/Toast.vue'

let $vm
let watcher

export default {
  install (Vue, options) {
    const Toast = Vue.extend(UiToast)

    if (!$vm) {
      $vm = new Toast({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const toast = {
      show (options) {
        watcher && watcher()

        if (typeof options === 'string') {
          $vm.text = options
        } else if (typeof options === 'object') {
          for (let i in options) {
            $vm[i] = options[i]
          }
        }

        if (typeof options === 'object' && (options.onShow || options.onHide)) {
          watcher = $vm.$watch('show', (val) => {
            val && options.onShow && options.onShow($vm)
            val === false && options.onHide && options.onHide($vm)
          })
        }

        $vm.show = true
      },

      hide () {
        $vm.show = false
      }
    }

    if (!Vue.$ui) {
      Vue.$ui = {
        toast
      }
    } else {
      Vue.$ui.toast = toast
    }

    Vue.mixin({
      created: function () {
        this.$ui = Vue.$ui
      }
    })
  }
}
