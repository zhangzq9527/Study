<template>
  <div>
    <p>账号：{{ user }}</p>
    <p>密码：{{ password }}</p>
    <el-button type="primary" @click="quitLogin()">退出</el-button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: state => state.Login.user.username,
      password: state => state.Login.user.password
    })
  },
  // created() {
  //   // 页面加载时就从本地通过localstorage获取存储的token值
  //   let token = localStorage.getItem('token')
  //   token = JSON.parse(token)
  //   this.msg = token.value
  // },
  methods: {
    ...mapMutations(['loginOut']),
    quitLogin() {
      this.$message({
        message: '已退出登录',
        type: 'success',
        showClose: true,
        center: true
      })
      localStorage.removeItem('token')
      this.loginOut()
      // this.$router.push('/')
    }
  }
}
</script>
<style scoped></style>
