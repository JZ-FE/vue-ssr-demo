export default {
  install (Vue) {
    Vue.prototype.$seo = function $seo (page, title, keywords, description) {
      const list = {
        common: ['', '', ''],
        list: ['Vue HN 2.0 | List | s%'],
        item: ['Vue HN 2.0 | Item | s%'],
        user: ['Vue HN 2.0 | User | s%'],
      }
      const item = list[page] || list.common
      const meta = {}

      if (title && item[0]) {
        meta.title = item[0].replace('s%', title)
      } else {
        meta.title = title || item[0]
      }

      if (keywords && item[1]) {
        meta.keywords = item[1].replace('s%', keywords)
      } else {
        meta.keywords = keywords || item[1]
      }

      if (description && item[2]) {
        meta.description = item[2].replace('s%', description)
      } else {
        meta.description = description || item[2]
      }

      return {
        title: meta.title,
        meta: [
          { vmid: 'keywords', name: 'keywords', content: meta.keywords },
          { vmid: 'description', name: 'description', content: meta.description },
        ],
      }
    }
  },
}
