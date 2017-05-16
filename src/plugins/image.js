import UiImage from 'components/ui/Image.vue'

let $vm

export default {
  install (Vue, options) {
    const Previewer = Vue.extend(UiImage)

    if (!$vm) {
      $vm = new Previewer({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const previewer = {
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
        previewer
      }
    } else {
      Vue.$ui.previewer = previewer
    }

    Vue.mixin({
      created: function () {
        this.$ui = Vue.$ui
      }
    })

  }
}
