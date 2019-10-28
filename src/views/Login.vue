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
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;margin-top: 20px;" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {},
      rules: {
        name: [
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
          alert('submit!');
        } else {
          return false;
        }
      });
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
    background-color: rgba(0,0,0,.1);
  }
  .login-title {
    padding: 40px 0;
    font-size: 26px;
    text-align: center;
    color: #eee;
  }
</style>