import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default function createStore () {
  return new Vuex.Store({
    state: {
      loading: false,
      submitting: false,

      project: '',
      cookies: {},
      userData: {},

      activeType: null,
      itemsPerPage: 20,
      items: {},
      users: {},
      lists: {
        top: [],
        new: [],
        show: [],
        ask: [],
        job: [],
      },
    },

    actions,
    mutations,
    getters,
  })
}
