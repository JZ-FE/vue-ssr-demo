import createApp from './app'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
/* eslint-disable arrow-body-style */
export default (context) => {
  return new Promise((resolve, reject) => {
    const s = Date.now()
    const { app, router, store } = createApp()
    const meta = app.$meta()

    const { url, query, cookies } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }

      // get url query
      if (query) store.state.query = query

      // get client cookies
      if (cookies) store.state.cookies = cookies

      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute,
      }))).then(() => {
        console.log(`[Data]"${url}": ${Date.now() - s}ms`) // eslint-disable-line
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state
        context.meta = meta
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
