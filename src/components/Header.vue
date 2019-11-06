<template>
  <div class="header-box">
    <i class="iconfont icon-menu" :class="isNavCollapse ? 'icon-zhankai' : 'icon-shouqi'" @click="$store.commit('changeNavCollapse')"></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
        <span :class="$route.path !== item.path ? 'no-current' : 'current'" @click="routeLink(item)">{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown class="header-menu" trigger="click" @command="handleCommand">     
      <span class="el-dropdown-link">
        <i class="el-icon-user"></i>欢迎您
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
        <el-dropdown-item command="signOut" divided>退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'my-header',
  data () {
    return {
      
    };
  },
  computed: {
    isNavCollapse() {
      return this.$store.state.isNavCollapse;
    },
    levelList() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);

      if(matched[0].path !== '/home') {
        matched.unshift({ path: '/home', meta: { title: '首页' } });
      }
      
      return matched;
    }
  },
  methods: {
    handleCommand(command) {
      
    },
    routeLink(item) {
      if(this.$route.path === item.path) {
        return;
      }
      this.$router.push(item.path);
    }
  }
}
</script>

<style scoped>
  .header-box {
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    z-index: 2;
  }
  .icon-menu {
    display: inline-block;
    margin: 0 15px;
    font-size: 22px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    color: #666;
  }
  .header-menu {
    float: right;
    margin: 13px;
    cursor: pointer;
  }
  .el-icon-user {
    font-size: 20px;
    margin-right: 5px;
    border: 1px solid #666;
    border-radius: 50%;
  }
  .el-breadcrumb {
    display: inline-block;
  }
  .current {
    color: #97a8be;
  }
  .no-current {
    color: #333;
    cursor: pointer;
  }
</style>