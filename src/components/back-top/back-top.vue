<template>
  <div class="iconfont icon-top back-top" @click="!sleeping && backTop()"></div>
</template>
<script>
  export default {
    props: {
      scrollTop: { // 与scrollBar 相绑定的需要滚动的div的scrollTop
        type: Number,
        default: 0
      },
      scrollHeight: { // ......scrollHeight
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        sleeping: false // 控制事件频率
      }
    },
    methods: {
      backTop () {
        this.$emit('backTop')
        this.sleeping = true
        // 3 秒过后才能再次点击
        this.timer = setTimeout(() => {
          this.sleeping = false
        }, 1000)
      }
    },
    watch: {
      scrollTop (newVal) {
        if (newVal < this.scrollHeight / 100) {
          this.$el.classList.remove('enter')
        } else {
          this.$el.classList.add('enter')
        }
      }
    },
    destroyed () {
      clearTimeout(this.timer)
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/less/variable';
  @keyframes backTopIn {
    from {
      /*transform: translate3d(0, 100px, 0);*/
      bottom: -50px;
    }
    to {
      /*transform: translate3d(0, 0, 0);*/
      bottom: 50px;
    }
  }
  @keyframes backTopOut {
    from {
      /*transform: translate3d(0, 0, 0);*/
      bottom: 50px;
    }
    to {
      /*transform: translate3d(0, 100px, 0);*/
      bottom: -50px;
    }
  }

  .back-top {
    line-height: 1.0;
    position: fixed;
    right: 50px;
    bottom: 50px;
    font-size: 30px;
    width: 30px; height: 30px;
    padding: 10px;
    color: @text-color-light;
    animation: backTopOut .3s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
    background-color: rgba(red(@background-base), green(@background-base), blue(@background-base), .8);
    &:hover {
     color: @text-color-base;
    }
    &.enter {
      animation: backTopIn .3s;
      animation-fill-mode: forwards;
      animation-timing-function: ease-in;
    }
  }
</style>
