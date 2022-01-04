<template>
  <div>
    <el-form
      :model="registerForm"
      label-width="100px"
      class="registerForm"
      :rules="rules"
      ref="registerForm"
      @keyup.enter.native="submitregister()"
    >
      <el-form-item label="账号:" prop="username">
        <el-input v-model="registerForm.username" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          :type="eyepassword ? 'text' : 'password'"
          v-model="registerForm.password"
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
      <el-form-item label="确认密码:" prop="checkpassword">
        <el-input
          :type="eyecheckpassword ? 'text' : 'password'"
          v-model="registerForm.checkpassword"
          placeholder="请确认密码"
          prefix-icon="el-icon-lock"
        >
          <div
            slot="suffix"
            class="icon-style"
            :style="{
              'background-image':
                'url(' + (eyecheckpassword ? require('./../image/show.png') : require('./../image/hide.png')) + ')',
              'background-size': '100%'
            }"
            @click="eyecheckpassword = !eyecheckpassword"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="registerForm.email" placeholder="请输入邮箱" prefix-icon="el-icon-message"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitregister()" class="registerbtn">注册</el-button>
        <router-link to="/">
          <el-button type="primary">登录</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkpassword !== '') {
          this.$refs.registerForm.validateField('checkpassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      eyepassword: false,
      eyecheckpassword: false,
      registerForm: {
        username: '',
        password: '',
        checkpassword: '',
        email: ''
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
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkpassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    submitregister() {
      if (
        this.registerForm.username === '' ||
        this.registerForm.password === '' ||
        this.registerForm.checkpassword === '' ||
        this.registerForm.email === ''
      ) {
        this.$alert('必填项不能为空')
      } else {
        this.$alert('注册成功')
        this.$router.push('/')
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

.registerForm {
  width: 350px;
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
}

.registerbtn {
  margin-right: 40px;
}
</style>
