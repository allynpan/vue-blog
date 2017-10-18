import IScroll from 'iscroll/build/iscroll-probe'

export default function () {
  // 是否触发上拉刷新
  let triggerPullUp = false
  return setTimeout(() => {
    /* eslint-disable no-new */
    this.scroll = new IScroll(this.$el, {
      click: true,
      probeType: this.listenScroll ? 3 : 0,
      preventDefault: true,
      HWCompositing: true,
      disablePointer: true,
      bounce: true,
      mouseWheel: true,
      vScrollbar: true
    }, 20)
    console.log(this.scroll)
    if (this.listenScroll) {
      let _this = this
      this.scroll.on('scroll', function () {
        _this.$emit('scroll', {
          x: this.x,
          y: this.y,
          maxScrollY: this.maxScrollY,
          directionY: this.directionY
        })
        if (this.y > 100) {
          triggerPullUp = true
        }
      })

      this.scroll.on('scrollEnd', function () {
        // 如果触发上拉刷新， 则在ScrollEnd 后emit 一个pullUpload 事件
        if (triggerPullUp) {
          _this.$emit('pullUpLoad', {
            x: this.x,
            y: this.y,
            maxScrollY: this.maxScrollY
          })
          triggerPullUp = false
        }
      })
    }
  }, 300)
}
