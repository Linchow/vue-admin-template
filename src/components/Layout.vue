<template>
  <div class="container" :class="isNavCollapse ? 'menu-mini' : ''">
    <my-menu></my-menu>
    <div class="main-container">
      <my-header></my-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MyMenu from './Menu';
import MyHeader from './Header';

export default {
  name: 'layout',
  components: {
    MyMenu, MyHeader
  },
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
  .container {
    height: 100%;
    position: relative;
  }
  .main-container {
    height: 100%;
    margin-left: 250px;
    transition: .3s;
  }
  .container.menu-mini .main-container {
    margin-left: 64px;
  }
  .container.menu-mini .menu-box {
    width: 64px;
  }
</style>