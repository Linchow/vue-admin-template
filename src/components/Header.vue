<template>
  <div class="top-box">
    <div class="header-box">
      <i class="iconfont icon-menu" :class="isNavCollapse ? 'icon-zhankai' : 'icon-shouqi'" @click="$store.commit('changeNavCollapse')"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
          <span :class="$route.path !== item.path ? 'no-current' : 'current'" @click="routeLink(item)">{{item.meta.title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-dropdown size="small" class="header-menu" trigger="click" @command="handleCommand">     
        <span class="el-dropdown-link">
          <i class="el-icon-user"></i>欢迎您，{{userInfo.userName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="signOut" divided>退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <tabs></tabs>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
export default {
  name: 'my-header',
  data () {
    return {
      
    };
  },
  components: {
    Tabs
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
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    handleCommand(command) {
      if(command === 'signOut') {
        this.$confirm('确定退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/user/signOut', {}).then((res) => {
            if (res.code === 1000) {
              this.$message({
                message: '退出登录成功',
                type: 'success'
              })
              this.$store.commit('setUserInfo', {})
              this.$router.push('/login');
            }
          })
        })
      }
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
  .top-box {
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    z-index: 2;
  }
  .header-box {
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
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