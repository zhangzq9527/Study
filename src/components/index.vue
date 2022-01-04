<template>
  <div>
    <p>{{ msg }}</p>
    <el-button type="primary" @click="quitLogin()">退出</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  created() {
    // 页面加载时就从本地通过localstorage获取存储的token值
    let token = localStorage.getItem('token')
    token = JSON.parse(token)
    this.msg = token.value
  },
  methods: {
    quitLogin() {
      alert('已退出登录')
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>
<style scoped></style>
