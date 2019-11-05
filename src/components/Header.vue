<template>
  <div class="header-box">
    <i class="iconfont icon-menu" :class="isNavCollapse ? 'icon-zhankai' : 'icon-shouqi'" @click="$store.commit('changeNavCollapse')"></i>
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
      return this.$store.state.isNavCollapse
    }
  }
}
</script>

<style scoped>
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
</style>