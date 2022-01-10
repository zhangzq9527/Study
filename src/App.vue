<template>
  <div id="app" @mousemove="handleTime">
    <router-view></router-view>
  </div>
</template>

<script>
import { timeOptions } from './config/Config'
export default {
  data() {
    return {
      lastTime: null, // 最后一次点击的时间
      currentTime: null // 当前点击的时间
    }
  },
  methods: {
    handleTime() {
      this.currentTime = new Date().getTime() // 记录这次点击的时间
      if (this.currentTime - this.lastTime > timeOptions.timeOut) {
        // 判断上次最后一次点击的时间和这次点击的时间间隔是否大于15分钟
        // 大于15分钟,跳转路由到login页
        this.lastTime = new Date().getTime()
        this.$message({
          message: '长时间未操作，登陆已过期',
          type: 'warning',
          showClose: true,
          center: true
        })
        localStorage.removeItem('token')
        this.$router.push('/')
      } else {
        this.lastTime = new Date().getTime() // 如果在1分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
      }
    }
  },
  created() {
    this.lastTime = new Date().getTime() // 网页第一次打开时，记录当前时间
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  text-align: center;
}
</style>
