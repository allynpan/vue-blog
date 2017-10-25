<template>
  <div class="scrollBar" ref="bar" :style="{'top': adjust + 'px'}">
    <!--<div class="scrollBar-thumb" :style="{height: thumbHeight, top: thumbTop, opacity: scrollTop <=0 ? 0 : 1}" draggable="true" ref="thumb"></div>-->
    <div
      class="scrollBar-thumb"
      :style="{height: thumbHeight, top: thumbTop}"
      draggable="true" ref="thumb"
      @mousedown="handleMouseDown($event)"
      @mouseup="handleMouseUp($event)"
    >
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      scrollTop: { // 与scrollBar 相绑定的需要滚动的div的scrollTop
        type: Number,
        default: 0
      },
      clientHeight: { // 与scrollBar 相绑定的需要滚动的div的的clientHeight
        type: Number,
        default: 0
      },
      scrollHeight: { // 与scrollBar 相绑定的需要滚动的div的scrollHeight
        type: Number,
        default: 0
      },
      adjust: {
        type: Number,
        default: 60 // scrollbar的偏移量，这里是header的高度
      }
    },
    data () {
      return {
        lastY: 0
      }
    },
    computed: {
      thumbHeight () {
        // 初始化滚动条thumb的高度
        return this.clientHeight / this.scrollHeight * this.clientHeight + 'px'
      },
      thumbTop () {
        // 初始化滚动条thumb的Top值
        return this.scrollTop / this.scrollHeight * this.clientHeight + 'px'
      }
    },
    methods: {
      handleMouseDown (e) {
        // 拖动滚动条实现页面滚动
        let _self = this
        let thumb = e.target
        e.preventDefault()
        e.stopPropagation()
        let lastY = e.clientY // 记录上一次的Y值
        thumb.style.borderRadius = 0
        document.onmousemove = function (e) {  // 为了防止鼠标移动过快而离开了thumb, 需要给整个document添加事件
          let diffY = e.clientY - lastY // 滚动条拖动的距离 = 当前Y值 - 上一次的Y值
          // 边界判定
          if (_self.scrollTop <= 0 && diffY < 0) {
            return
          }
          if (_self.scrollHeight - _self.scrollTop <= _self.clientHeight && diffY > 0) {
            return
          }
          lastY = e.clientY // 更新上一次的Y值
          let newThumbTop = parseFloat(thumb.style.top) + diffY
          thumb.style.top = newThumbTop + 'px'
          let newScrollTop = newThumbTop / _self.clientHeight * _self.scrollHeight
          _self.$emit('newScrollTop', newScrollTop)
          document.onmouseup = function (e) {
            document.onmousemove = null
            thumb.style.borderRadius = ''
          }
        }
      },
      handleMouseUp (e) {
        let thumb = e.target
        document.onmousemove = null
        thumb.style.borderRadius = ''
      }
    },
    mounted () {
      let thumb = this.$refs.thumb
      document.onmouseup = function (e) {
        document.onmousemove = null
        thumb.style.borderRadius = ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/less/variable';
  .scrollBar {
    width: 8px;
    height: 100%;
    position: fixed;
    right: 0;
    top: @header-height;
    .scrollBar-thumb {
      box-sizing: content-box;
      position: absolute;
      width: 8px;
      height: 50px;
      right: 0;
      border-radius: 5px;
      background-color: @background-base-dark;
      background-clip: padding-box;
      transition: background-color .3s, opacity 1s;
      &:hover {
        background-color: @background-base-dark / 1.3;
      }
    }
  }
</style>
