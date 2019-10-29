<template>
  <div class="login-box">
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm"
      class="login">
        <div class="login-title">
          系统登录
        </div>
        <el-form-item prop="user">
          <el-input v-model="ruleForm.user">
            <i slot="prefix" class="iconfont icon-account"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="ruleForm.pwd" v-if="isShow">
            <i slot="prefix" class="iconfont icon-pwd"></i>
            <i slot="suffix" class="iconfont icon-eye icon-suffix" @click="isShow = !isShow"></i>
          </el-input>
          <el-input v-model="ruleForm.pwd" type="password" v-else>
            <i slot="prefix" class="iconfont icon-pwd"></i>
            <i slot="suffix" class="iconfont icon-eye-hide icon-suffix" @click="isShow = !isShow"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;margin-top: 20px;" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
        <el-form-item>
          <span class="text-tip" style="margin-right: 30px;">账号：admin</span>
          <span class="text-tip">密码：123456</span>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      isShow: false,
      ruleForm: {
        user: 'admin',
        pwd: '123456'
      },
      rules: {
        user: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    login() {
      this.$http.post('/user/login', this.ruleForm).then(res => {
        if(res.code === 1000) {
          this.$router.push('/home');
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-box {
    background-color: #2d3a4b;
    height: 100%;
    position: relative;
  }
  .login {
    width: 300px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -200px;
    border: 1px solid #ebeef5;
    border-radius: 10px;
  }
  .login >>> .el-form-item {
    margin-left: 25px;
    margin-right: 25px;
  }
  .login >>> .el-input__inner {
    color: #2d3a4b;
  }
  .login-title {
    padding: 40px 0;
    font-size: 24px;
    text-align: center;
    color: #ebeef5;
  }
  .iconfont {
    font-size: 14px;
    color: #2d3a4b;
    padding-left: 5px;
  }
  .icon-suffix {
    padding-right: 5px;
    cursor: pointer;
  }
  .text-tip {
    color: #ebeef5;
  }
</style>