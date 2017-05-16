import UiAlert from 'components/ui/Alert.vue'

let $vm

const plugin = {
  install (Vue, options) {
    const Alert = Vue.extend(UiAlert)

    if (!$vm) {  
      $vm = new Alert({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const alert = {
      show (options) {
        if (typeof options === 'string') {
          $vm.content = options
        } else if (typeof options === 'object') {
          for (let i in options) {
            $vm[i] = options[i]
          }
        }
        
        $vm.show = true
      },

      hide () {
        $vm.show = false
      }
    }

    if (!Vue.$ui) {
      Vue.$ui = {
        alert
      }
    } else {
      Vue.$ui.alert = alert
    }

    Vue.mixin({
      created: function () {
        this.$ui = Vue.$ui
      }
    })

  }
}

export default plugin
