<template>
  <el-scrollbar class="menu-box" wrap-class="overflow-x-auto">
    <el-menu
      :default-active="$route.path"
      router
      unique-opened
      collapse-transition
      :collapse="isNavCollapse"
      background-color="#2d3a4b"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      <template v-for="(item, index) in permissionList">
        <el-submenu v-if="item.children && item.children.length > 0" :key="index" :index="item.id">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item v-for="(item2, index2) in item.children" :index="item2.path" :key="index2">
            <span slot="title">{{item2.name}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="index">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'my-menu',
  data () {
    return {
      
    };
  },
  computed: {
    isNavCollapse() {
      return this.$store.state.isNavCollapse;
    },
    permissionList() {
      return this.$store.state.userInfo.permissionList;
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .menu-box {
    position: absolute;
    width: 250px;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #2d3a4b;
    transition: width 0.3s;
  }
  .el-menu:not(.el-menu--collapse) {
    width: 100%;
  }
  .menu-box >>> .el-menu {
    border-right: none;
  }
  .menu-box >>> .iconfont {
    display: inline-block;
    width: 20px;
    color: inherit;
  }
  .el-menu--inline .el-menu-item {
    background-color: #1f2d3d !important;
  }
  .el-menu--inline .el-menu-item:hover {
    background-color: #001529 !important;
  }
  .el-menu-item:hover {
    background-color: #263445 !important;
  }
</style>