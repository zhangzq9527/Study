import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/Login'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Login
  }
})

export default store
