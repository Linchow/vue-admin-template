<template>
  <div class="container">
    <MyHeader></MyHeader>
    <div class="main-container">
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
}
</script>

<style scoped>
  .container {
    height: 100%;
    position: relative;
  }
  .main-container {
    height: 100%;
    margin-left: 210px;
  }
</style>