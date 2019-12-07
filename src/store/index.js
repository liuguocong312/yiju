import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import commn from './modules/commn'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    commn
  },
  getters
})

export default store
