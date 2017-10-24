<template>
  <header id="header">
    <div class="cover" :style="{backgroundImage: ``}">
      <div id="progress"></div>
    </div>
    <div class="logo" @click="goHome">MINGOF</div>
    <ul class="header-list">
      <router-link tag="li" to="/posts">
        <span @click="toPage(1)">文章</span>
      </router-link>
      <router-link tag="li" to="/archive">
        <span>标签</span>
      </router-link>
      <router-link tag="li" to="/search">
        <span>搜索</span>
      </router-link>
      <router-link tag="li" to="/about">
        <span>关于</span>
      </router-link>
    </ul>
  </header>
</template>
<script>
  import Search from '@/components/search/search'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'bgImg'
      ])
    },
    methods: {
      goHome () {
        this.$router.push({
          path: '/posts'
        })
        this.toPage(1)
      },
      toPage (i) {
        this.setPage(i)
        window.sessionStorage.setItem('currentPage', i)
      },
      handleSearch (status, data) {
        if (status === 'success' && data.length > 0) {
        }
      },
      ...mapMutations({
        setPage: 'SET_CURRENT_PAGE'
      })
    },
    components: {
      Search
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/less/variable';
  #header {
    padding: 0 @content-padding;
    position: relative;
    text-align: center;
    height: @header-height;
    //box-shadow: 1px 0 3px 1px @background-base-dark;
    /*overflow: hidden;*/
    .cover {
      position: absolute;
      left: 0; right: 0; top: 0; bottom: 0;
      z-index: -9999;
      //filter: blur(1000px);
      background-color: @background-content;
      /*filter: blur(20px);*/
      background-size: cover;
      /*background-attachment: fixed;*/
      /*margin: -40px;*/
      /*background-color: transparent;*/
      #progress {
        position: absolute;
        bottom: 0;
        height: 1px;
        border-radius: 1px;
        background-color: @highlight-color;
        width: 0;
      }
    }
    .logo {
      position: absolute;
      height: @header-height;
      line-height: @header-height;
      color: @highlight-color;
      cursor: pointer;
      /*font-style: italic;*/
      font-family: Purisa, Monaco, Consolas, Arial, "Helvetica Neue", Helvetica, sans-serif ;
    }
    .header-list {
      li {
        cursor: pointer;
        display: inline-block;
        line-height: @header-height;
        padding: 0 30px;
        @media (min-width: 1600px) {
          padding: 0 40px;
        }
        span {
          transition: .3s;
          padding: 5px 0;
        }
        &:hover {
          color: @highlight-color;
        }
      }
      .router-link-active {
        span {
          border-bottom: 3px solid @highlight-color;
        }
        // color: @highlight-color;
      }
    }
  }
</style>
