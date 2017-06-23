# vue-ssr-demo

> Vue SSR Demo built with Vue 2.0 + vue-router + vuex, with server-side rendering.

## Features

- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
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

# serve in production mode
npm start
```

## Without SSR
1. `src/index.template.html` add `<div id="app"></div>`
2. `src/entry-client.js` remove `store.replaceState(window.__INITIAL_STATE__)`
3. `src/router/index.js` modify `mode: 'history'` to `mode: 'hash'`
4. `npm run build:client`
