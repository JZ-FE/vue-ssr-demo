import UiImage from 'components/ui/Image.vue'

let $vm

export default {
  install (Vue, options) {
    const UImage = Vue.extend(UiImage)

    if (!$vm) {
      $vm = new UImage({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const image = {
      show (options) {
        if (typeof options === 'string') {
          $vm.image = options
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
        image
      }
    } else {
      Vue.$ui.image = image
    }

    Vue.mixin({
      created: function () {
        this.$ui = Vue.$ui
      }
    })

  }
}
