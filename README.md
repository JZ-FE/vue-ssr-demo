# vue-ssr-demo

> Vue SSR Demo built with Vue 2.0 + vue-router + vuex, with server-side rendering.

## Features

- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
  - Preload / prefetch resource hints
  - Route-level code splitting
- Progressive Web App
  - App manifest
  - Service worker
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production

## Build Setup

**Requires Node.js 6+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# serve in production mode
npm start
```

## Without SSR
1. `src/index.template.html` add `<div id="app"></div>`
2. `src/entry-client.js` remove `store.replaceState(window.__INITIAL_STATE__)`, modify `app.$mount('#app')` to
```javascript
const matchedComponents = router.getMatchedComponents()
if (!matchedComponents.length) alert('404')
Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
  store,
  route: router.currentRoute,
}))).then(() => {
  app.$mount('#app')
})
```
3. `src/router/index.js` modify `mode: 'history'` to `mode: 'hash'`, replace `const (.*?) = \(\) => import\((.*?)\)` to `import $1 from $2`
4. `npm run build:client`
