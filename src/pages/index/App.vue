<template>
  <div id="app">
    <div id="cover" :style="{backgroundImage: ``}"></div>
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
  import BHeader from '@/components/header/header'
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
    overflow: hidden;
    #cover {
      content: '';
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -9999;
      /*margin: -30px;*/
      /*filter: blur(20px);*/
      background-size: cover;
      /*background-attachment: fixed;*/
      /*background-image: url('http://192.168.1.101:8888/bing-wallpaper');*/
      /*background-position: bottom center;*/
      background-color: @background-base;
      background-image: url('./assets/bg.jpg');
    }
    a {
      color: @text-color-base;
      border-bottom: 1px solid @highlight-color;
      text-decoration: none;
      &:link, &:hover, &:visited, &:active {
        color: @text-color-base;
        border-bottom: 1px solid @text-color-base;
      }
    }
  }
</style>
