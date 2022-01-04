<template>
  <div>
    <el-form :model="loginForm" label-width="80px" class="loginForm" :rules="rules" @keyup.enter.native="submitLogin()">
      <el-form-item label="账号:" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          :type="eyepassword ? 'text' : 'password'"
          v-model="loginForm.password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
        >
          <div
            slot="suffix"
            class="icon-style"
            :style="{
              'background-image':
                'url(' + (eyepassword ? require('./../image/show.png') : require('./../image/hide.png')) + ')',
              'background-size': '100%'
            }"
            @click="eyepassword = !eyepassword"
          />
        </el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="code">
        <el-input
          placeholder="请填写验证码"
          class="inputText"
          v-model="loginForm.code"
          prefix-icon="el-icon-key"
        ></el-input>
        <div @click="changeCode()" class="code">
          <identify :identifyCode="identifyCode"></identify>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitLogin()" class="loginbtn">登录</el-button>
        <router-link to="/register">
          <el-button type="primary">注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import identify from './identify' // 引入子元素

export default {
  name: 'Login',
  components: {
    identify
  },
  data() {
    return {
      eyepassword: false,
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码'
          }
        ]
      },
      // 验证码初始值
      identifyCode: 'm6a8', // 这个就是随机生成的验证码
      // 验证码的随机取值范围
      identifyCodes: '123456789abcdefghjkmnpqrstuvwxyz'
    }
  },
  mounted() {
    // 刷新页面就生成随机验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    //  下一步按钮 拿到code值跟随机生成的验证码进行对比
    submitLogin() {
      if (this.loginForm.username === '' || this.loginForm.password === '' || this.loginForm.code === '') {
        this.$alert('必填项不能为空')
      } else if (this.identifyCode !== this.loginForm.code) {
        this.loginForm.code = ''
        this.$alert('验证码错误')
        this.changeCode() // 改变验证码
      } else if (this.loginForm.username !== '' && this.loginForm.password !== '') {
        const paramss = {
          name: 'token',
          value: this.loginForm.username
        }
        var datas = Object.assign(paramss, {
          startTime: new Date().getTime()
        })
        localStorage.setItem('token', JSON.stringify(datas))
        this.$router.push('index')
      } else {
        this.$alert('账号或密码不正确')
        this.loginForm.code = ''
        this.changeCode()
      }
    },
    // 点击验证码刷新验证码
    changeCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum(min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
    }
  }
}
</script>
<style scoped>
.icon-style {
  width: 20px;
  height: 20px;
  margin-top: 10px;
  font-size: 18px;
}

.loginForm {
  width: 350px;
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
}

.inputText {
  width: 150px;
  float: left;
}

.code {
  float: right;
  height: 30px;
  margin-top: 2px;
}

.loginbtn {
  margin-right: 40px;
}
</style>
