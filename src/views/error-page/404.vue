<template>
  <div class="img-box">
    <i class="iconfont icon-kulian"></i>
    <i class="iconfont icon-404"></i>
    <p class="tip">哎呀，您要找的页面可能在火星吧 (ToT)~~~</p>
    <el-button type="primary" @click="backHome">返回首页</el-button>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  data () {
    return {
      
    };
  },
  methods: {
    backHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
  .img-box {
    text-align: center;
    padding: 50px 0 120px;
  }
  .icon-kulian {
    font-size: 160px;
    color: #666;
    vertical-align: text-top;
  }
  .icon-404 {
    font-size: 100px;
    color: #666;
  }
  .tip {
    margin: 30px 0;
  }
</style>