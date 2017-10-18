<template>
  <div id="app">
    <keep-alive>
      <b-header></b-header>
    </keep-alive>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import BHeader from '@/components/header/header-m'
  import '@/common/less/code-theme-dracula.css'
//  import HOST from './api/host'
  import { mapMutations } from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        img: '',
        imgData: ''
      }
    },
    mounted () {
    },
    methods: {
      ...mapMutations({
        setBgImg: 'SET_BGIMG'
      })
    },
    components: {
      BHeader
    }
  }
</script>

<style lang="less">
  @import url('../../common/less/variable');
  #app {
    color: @text-color-base;
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    position: relative;
    a {
      color: @text-color-base;
      text-decoration: none;
      &:link, &:hover, &:visited, &:active {
        color: @text-color-base;
      }
    }
  }
</style>
