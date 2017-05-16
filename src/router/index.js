import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const ListView = () => import('../views/list/index.vue')
const ItemView = () => import('../views/item/index.vue')
const UserView = () => import('../views/user/index.vue')

let routes = [
  { path: '/item/:id(\\d+)', component: ItemView },
  { path: '/user/:id', component: UserView },
  { path: '/:type/:page(\\d+)?', component: ListView },
  { path: '/', redirect: '/top' }
]

const baseDir = '/vue-ssr'
routes.forEach((item) => {
  let path = item.path
  
  if (path === '/') {
    item.redirect = `${baseDir + item.redirect}`
  } else {
    path = `${baseDir + path}`    
  }

  item.path = path
})

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })
}
