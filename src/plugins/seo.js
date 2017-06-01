export default {
  install (Vue, options) {
    Vue.prototype.$seo = function (page = 'common', title, keywords, description) {
      let list = {
        'common': ['标题', '关键词', '描述'],
        'list': ['Vue HN 2.0 | List | s%'],
        'item': ['Vue HN 2.0 | Item | s%'],
        'user': ['Vue HN 2.0 | User | s%'],
      }
      let item = list[page] || list['common']

      if (title && item[0]) {
        title = item[0].replace('s%', title)
      } else {
        title = title || item[0]
      }

      if (keywords && item[1]) {
        keywords = item[1].replace('s%', keywords)
      } else {
        keywords = keywords || item[1]
      }

      if (description && item[2]) {
        description = item[2].replace('s%', description)
      } else {
        description = description || item[2]
      }

      return {
        title: title,
        meta: [
          { vmid: 'keywords', name: 'keywords', content: keywords },
          { vmid: 'description', name: 'description', content: description }
        ]
      }
    }
  }
}
