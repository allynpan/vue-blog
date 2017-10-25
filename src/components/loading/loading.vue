<template>
  <transition name="fade">
    <div class="loading iconfont" v-show="loading">
      <div class="iconfont icon-loading"></div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/variable";
  @keyframes loading {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg)
    }
  }
  .loading {
    position: fixed;
    right: 43px; top: @header-height + 5;
    div {
      animation: loading 1s infinite linear;
      position: absolute;
      left: 50%;
      top: 50%;
      font-size: 30px;
      color: @text-color-light
    }
  }
  .fade-leave-active {
    .fadeOut();
  }
</style>
