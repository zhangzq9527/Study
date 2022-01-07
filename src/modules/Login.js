export default {
  state: {
    user: {
      username: '',
      password: ''
    }
  },
  mutations: {
    login(state, payload) {
      state.user.username = JSON.parse(payload).user
      state.user.password = JSON.parse(payload).password
    },
    loginOut(state) {
      state.user.username = ''
    }
  }
}
