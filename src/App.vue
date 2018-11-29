<template>
  <div id="app">
    <transition name="slide-left">
      <keep-alive :include='whiteList'>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import storage from './lib/storage'
import whiteList from './api/whiteList'

export default {
  name: 'App',
  data() {
    return {
      whiteList,
      pushMsg: {
        show: false,
        data: {}
      },
    }
  },
  watch: {
    '$route'(to, from) {
      setTimeout(() => {
        window.scroll(0, 0);
      }, 10);
      return to
    }
  },
  mounted() {
  },
  methods: {
    socket(evt) {
      let data;
      if (typeof evt === 'string') {
        data = JSON.parse(evt);
      } else {
        data = evt;
      }
      if (data.type === 1) {
        this.pushMsg.show = true
        this.pushMsg.data = data.data;
      }

    },
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
    top: 0;
    width: 100vw;
  }
  .slide-right-enter {
    opacity: 0;
  }
  .slide-right-leave-active {
    opacity: 0;
  }
  .slide-left-enter {
    opacity: 0;
  }
  .slide-left-leave-active {
    opacity: 0;
  }
}
</style>
