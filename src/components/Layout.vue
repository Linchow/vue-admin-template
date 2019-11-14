<template>
  <div class="container" :class="isNavCollapse ? 'menu-mini' : ''">
    <my-menu></my-menu>
    <div class="main-container">
      <my-header></my-header>
      <el-scrollbar class="main-content" wrap-class="overflow-x-auto">
        <transition :name="transitionName" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key" class="content"></router-view>
          </keep-alive>
        </transition>
      </el-scrollbar>
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
      transitionName: 'fade-transform'
    };
  },
  watch: {
    '$route'(to, from) {
      if(this.cachedViews.indexOf(to.name) > -1) {
        this.transitionName = '';
      }else {
        this.transitionName = 'fade-transform'
      }
    }
  },
  computed: {
    isNavCollapse() {
      return this.$store.state.isNavCollapse
    },
    key() {
      return this.$route.path
    },
    cachedViews() {
      return this.$store.state.tabList.map(item => {
          return item.name || '';
      })
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
    position: relative;
    margin-left: 250px;
    transition: .3s;
    background: #f5f5f5;
  }
  .container.menu-mini .main-container {
    margin-left: 64px;
  }
  .container.menu-mini .menu-box {
    width: 64px;
  }
  .main-content {
    position: absolute;
    top: 84px;
    right: 0;
    left: 0;
    bottom: 0;
  }
  .content {
    margin: 15px 20px;
    background: #fff;
    border-radius: 5px;
    padding: 20px 25px 60px;
  }

  .fade-transform-leave-active,
  .fade-transform-enter-active {
      transition: all .5s;
  }
  .fade-transform-enter {
      opacity: 0;
      transform: translateX(-30px);
  }
  .fade-transform-leave-to {
      opacity: 0;
      transform: translateX(30px);
  }

</style>