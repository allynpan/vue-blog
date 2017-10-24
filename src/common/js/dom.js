// let tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
// export const initCatalog = function ic (el, i) { // 初始化文章目录, 使用递归方式
//   let titles = []
//   let index = i || 0
//   let h = el.getElementsByTagName(tags[index])
//   // console.log(index)
//   // console.log(tags[index])
//   if (h.length <= 0) {
//     if (index >= 6) return
//     ic(el, (index + 1))
//   } else {
//     // console.log(h)
//     let arr = Array.prototype.slice.call(h)
//     for (let j = 0; j < arr.length; j++) {
//       let obj = {}
//       obj.$1th = h[j].innerHTML // 文章的1级标题
//       titles.push(obj)
//     }
//     // console.log(titles)
//     initSubCata(el)
//   }
// }

export const initCatalog = function initCatalog (el) { // 初始化文章目录， 使用遍历节点的方式
  /**
   * 假定处理过后的hArr 如下：
   * [
   *    {tag: "h3", text: "一级1"},
   *    {tag: "h5", text: "二级1-1"},
   *    {tag: "h5", text: "二级1-2"}
   *    {tag: "h3", text: "一级2"},
   *    {tag: "h6", text: "二级2-1"},
   *    {tag: "h6", text: "二级2-2"},
   *    {tag: "h3", text: "一级3"},
   *    {tag: "h3", text: "一级4"}
   * ]
   *
   */
  let els = el.childNodes
  let hArr = []
  for (let i = 0; i < els.length; i++) {
    // 遍历所给元素el 的所有子节点中是标题标签的节点
    if (els[i].nodeType === 1 && /H\d/i.test(els[i].nodeName)) {
      let name = els[i].getElementsByTagName('a')[0].getAttribute('name')
      hArr.push({tag: els[i].nodeName.toLowerCase(), text: els[i].innerText, name: name, el: els[i]})
    }
  }
  if (hArr.length <= 0) {
    return []
  }
  // console.log(hArr)
  let titles = [] // 存放目录的数组，包含1级和2级目录
  let level1tag = hArr[0].tag // 第一次出现的h标签就是第一层标题对应的标签: 比如第一次出现的是<h3>
  let level2tag = ''          // 第二层级的标题对应的标签; 比如可能是任何大于h3的标签，如<h4>,<h5>,<h6>
  let $2th = [] // 二级标题数组
  for (let i = 0; i < hArr.length; i++) {
    let obj = { // 每一个第一级标题下面对应了一组第二级标题
      $1th: '', // 第一级标题
      $2th: [] //  第二级标题
    }
    if (hArr[i].tag === level2tag) {
      $2th.push(hArr[i]) // 如果当前标题2级标题， 那么将该2级标题push 到 $2th, 并且跳过后面的代码；如果下一个标题还是2级标题， 则继续push并跳过
      continue
    } else if (hArr[i].tag === level1tag) {
      // 动态确定第二层标题对应的标签 level2Tag； 可能是任何大于<h3>的标签， 如h4, h5, h6
      for (let j = i + 1; j < hArr.length; j++) {
        if (hArr[j].tag > level1tag) {
          level2tag = hArr[j].tag
          break
        }
      }
      // console.log(level2tag, level1tag)
      obj.$1th = hArr[i]
      $2th = [] // 如果检测到1级的标题， 则置$2th 为空
    } else {
      // 第三级 及 深层次的目录标题直接忽略
      continue
    }
    obj.$2th = $2th
    titles.push(obj)
  }
  // console.log(titles)
  return titles
}

export const smoothScroll = (function () {
  return function scroll (
    {
      offsetTop,  // 滚动到的目标元素的offsetTop
      speed, // 滚动速度
      adjust, // 矫正值, 偏差值, 此处为70(header的高度)
      el, // 滚动的元素
      accelerate // 加速度
    },
    cb  // 回调函数
  ) {
    speed = speed || 50
    adjust = adjust || 70
    accelerate = accelerate || 5
    speed += accelerate
    // console.log(this)
    clearTimeout(this.timer2)
    let oScroll = el
    if (!el && !!this && !!this._isVue && !!this.$refs && !!this.$refs.scroll) {
      oScroll = this.$refs.scroll
    } else {
      el = document.documentElement || document.body
    }
    // console.log(offsetTop, speed, adjust, el)
    if (!oScroll) {
      cb && cb({code: 1, err: 'can not find element to scroll'})
      return
    }
    if (oScroll.scrollTop > offsetTop - adjust) { // 这里要减去header高度60，可以多一点
      if (Math.abs(oScroll.scrollTop - offsetTop + adjust) <= speed) {
        // 当滚动到快要接近标题时， 降低速度， 以保证能够精确滚动到标题的位置
        oScroll.scrollTop = oScroll.scrollTop - 5
      } else {
        oScroll.scrollTop = oScroll.scrollTop - speed
      }
      // console.log('scrollTop - offsetTop: ' + (oScroll.scrollTop - offsetTop + 70))
      if (oScroll.scrollTop <= (offsetTop - adjust) || oScroll.scrollTop <= 0) {
        clearTimeout(this.timer2)
        cb && cb({code: 0})
        return
      }
    } else if (oScroll.scrollTop < offsetTop) {
      if (Math.abs(oScroll.scrollTop - offsetTop + adjust) <= speed) {
        // 当滚动到快要接近标题时， 降低速度， 以保证能够精确滚动到标题的位置
        oScroll.scrollTop = oScroll.scrollTop + 5
      } else {
        oScroll.scrollTop = oScroll.scrollTop + speed
      }
      if (oScroll.scrollTop >= (offsetTop - adjust) || oScroll.scrollTop >= oScroll.scrollHeight - oScroll.clientHeight) {
        clearTimeout(this.timer2)
        cb && cb({code: 0})
        return
      }
    }
    this.timer2 = setTimeout(() => {
      scroll.call(this, {
        offsetTop: offsetTop,
        speed: speed,
        adjust: adjust,
        el: el
      }, cb)
    }, 20)
  }
})()
