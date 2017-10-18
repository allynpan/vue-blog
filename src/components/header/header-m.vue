<template>
  <div id="header">
    <div id="progress"></div>
    <div class="logo" @touchend="goHome()">MINGOF</div>
    <div class="menu iconfont icon-menu" @click="toggleMenu"></div>
    <ul class="header-list" v-show="showMenu" @click="toggleMenu">
      <router-link tag="li" to="/posts">
        <span>文章</span>
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
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        showMenu: false
      }
    },
    methods: {
      goHome () {
        this.$router.push({
          path: '/posts'
        })
        this.toPage(1)
      },
      toggleMenu () {
        this.showMenu = !this.showMenu
      },
      toPage (i) {
        this.setPage(i)
        window.sessionStorage.setItem('currentPage', i)
      },
      ...mapMutations({
        setPage: 'SET_CURRENT_PAGE'
      })
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/less/variable';
  @m-content-padding: 50px;
  #header {
    z-index: 1;
    /*box-shadow: 1px 0 3px 1px @background-base-dark;*/
    position: fgitixed;
    width: 100%;
    top: 0;
    background-color: @background-content;
    .pr(height, @header-height + 50);

    #progress {
      height: 2px;
      /*transition: all .2s;*/
      width: 0;
      background-color: @highlight-color;
    }
    .logo {
      .pr(padding-left, @article-padding);
      position: absolute;
      .pr(height, @header-height + 50);
      .pr(line-height, @header-height + 50);
      color: @highlight-color;
      cursor: pointer;
      .font-dpr(20px);
      /*font-style: italic;*/
      font-family: Purisa, Monaco, Consolas, Arial, "Helvetica Neue", Helvetica, sans-serif ;
    }
    .menu {
      .logo;
      .pr(padding-right, @article-padding);
      padding-left: 0;
      .pr(right, @article-padding);
      color: @text-color-light;
      font-weight: 700;

    }
    ul {
      .fadeIn();
      .font-dpr(16px);
      position: absolute;
      width: 100%;
      left: 0;
      background-color: @background-content;
      text-align: right;
      top: 100%;
      li {
        width: 100%;
        border-bottom: 1px solid @background-base;
        .pr(line-height, @header-height + 50);
        text-align: center;
        span {
          display: block;
          width: 100%;
          height: 100%;
        }
        &.router-link-active {
          span {
            color: @highlight-color;
          }
          // color: @highlight-color;
        }
      }
    }
  }
</style>
