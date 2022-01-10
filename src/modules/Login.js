export default {
  state: {
    user: {
      username: '',
      password: ''
    }
  },
  mutations: {
    login(state, payload) {
      state.user.username = payload.user
      state.user.password = payload.password
    },
    loginOut(state) {
      state.user.username = ''
    }
  }
}
