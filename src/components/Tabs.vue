<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <span 
      class="tab" 
      v-for="(item, index) in tabList" 
      :key="index" 
      @click="openTab(item.path)"
      :class="item.path === $route.path ? 'on' : ''" 
      size="medium">
      {{item.title}}
      <i class="el-icon-close" @click.stop="closeTab(index)" v-if="item.path !== '/home'"></i>
    </span>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'tabs',
  data () {
    return {
      
    };
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap;
    },
    tabList() {
      return this.$store.state.tabList;
    }
  },
  watch: {
    '$route'(to, from) {
      this.changeTabList(to)
    }
  },
  created() {
    this.changeTabList(this.$route)
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    },
    changeTabList(route) {
      if(this.tabList.findIndex(item => item.path === route.path) > -1) {
        return;
      }
      this.tabList.push({path: route.path,name: route.name, title: route.meta.title})
      if(route.meta && route.meta.title) {
        this.$store.commit('addTabList', this.tabList);
      }
    },
    closeTab(index) {
      this.tabList.splice(index, 1);
      this.$store.commit('addTabList', this.tabList);
      if(this.tabList.findIndex(item => item.path === this.$route.path) > -1) {
        return;
      }
      this.$router.push(this.tabList[this.tabList.length - 1].path);
    },
    openTab(path) {
      if(this.$route.path === path) {
        return;
      }
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .scroll-container >>> .el-scrollbar__bar {
    bottom: 0px;
  }
  .scroll-container >>> .el-scrollbar__wrap {
    height: 51px;
  }
  .tab {
    margin-top: 5px;
    margin-left: 5px;
    cursor: pointer;
    border: 1px solid #d8dce5;
    color: #495060;
    background-color: #fff;
    display: inline-block;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
  }
  .tab.on {
    background-color: #409EFF;
    color: #fff;
    border-color: #409EFF;
  }
  .tab:first-child {
    margin-left: 15px;
  }
  .tab:last-child {
    margin-right: 15px;
  }
  .el-icon-close{
    padding: 3px;
    border-radius: 50%;
    font-size: 12px;
  }
  .el-icon-close:hover{
    background: #ccc;
    transition: background 0.3s;
  }
</style>