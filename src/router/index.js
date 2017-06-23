import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const ListView = () => import('../views/list/index.vue')
const ItemView = () => import('../views/item/index.vue')
const UserView = () => import('../views/user/index.vue')

const routes = [
  { path: '/item/:id(\\d+)', component: ItemView },
  { path: '/user/:id', component: UserView },
  { path: '/:type/:page(\\d+)?', component: ListView },
  { path: '/', redirect: '/top' },
]

routes.forEach((item) => {
  const meta = item.meta
  let path = item.path
  let baseDir = '/vue-ssr'

  if (meta && meta.project) {
    baseDir = `/${meta.project}`
  }

  if (path === '/home') {
    path = `${baseDir}/`
  } else if (path === '/' && item.redirect) {
    item.redirect = `${baseDir + item.redirect}/`
  } else {
    path = `${baseDir + path}`
  }

  item.path = path
})

export default function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes,
  })
}
