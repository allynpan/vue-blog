<template>
  <section class="article-detail" ref="scroll">
    <!--文章正文-->
    <article class="typo">
      <div class="cover" :style="{backgroundImage: ``}"></div>
      <header>
        <h2>{{currentArticle && currentArticle.title}}</h2>
        <h4>{{currentArticle.time && new Date(currentArticle.time).toLocaleString()}}</h4>
        <p class="tag">
          <span v-for="(tag, index) in currentArticle.tags">{{tag}}</span>
        </p>
      </header>
      <div v-html="currentArticle && currentArticle.content" class="article-content" ref="content">
      </div>
    </article>
    <!--滚动条-->
    <scroll-bar
      :scrollHeight="scrollHeight"
      :scrollTop="scrollTop"
      :clientHeight="clientHeight"
      @newScrollTop = 'changeScrollTop'
    ></scroll-bar>
    <!--文章目录-->
    <aside class="article-catalog" v-if="catalog.length > 0">
      <ul class="catalog" v-show="showCatalog">
        <li v-for="(item, index) in catalog" class="cata-level1">
          <p class="title-level1 title"
             @click="goAnchor(item.$1th.el)"
             :name="item.$1th.name"
          >{{index + 1 + ' ' + item.$1th.text}}</p>
          <div class="cata-level2" v-if="item.$2th.length > 0">
            <p class="title-level2 title"
               v-for="(item2, index2) in item.$2th"
               @click="goAnchor(item2.el)"
               :name="item2.name"
            >
              {{(index + 1) + '.' + (index2 + 1)  + ' ' + item2.text}}
            </p>
          </div>
        </li>
      </ul>
      <menu
        :class="['menu', 'iconfont', showCatalog ? 'icon-close' : 'icon-menu']"
        @click="toggleCatalog"
        ref="catalog"
        :style="{backgroundColor: showCatalog ? 'transparent' : 'inherit'}"
      >
      </menu>
    </aside>
    <back-top
      @backTop="backTop"
      :scrollHeight="scrollHeight"
      :scrollTop="scrollTop"
    ></back-top>
    <comment :currentArticle="currentArticle || {}"></comment>
  </section>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import ScrollBar from '../../components/scrollbar/scrollbar'
  import BackTop from '../../components/back-top/back-top'
  import { initCatalog, smoothScroll } from '../../common/js/dom'
//  import { getArticles } from '@/api/api'
  import Comment from '../../components/comment/comment'
  export default {
    data () {
      return {
        scrollTop: 0,
        scrollHeight: 0,
        clientHeight: 0,
        catalog: [],
        showCatalog: false,
        currentAnchorIdx: 0
      }
    },
    computed: {
      ...mapGetters([
        'currentArticle',
        'bgImg'
      ])
    },
    mounted () {
      this.$nextTick(() => {
        // set section height
        let docH = document.documentElement.clientHeight
        this.$refs.scroll.style.height = parseInt(docH) - 60 + 'px'
        // 动态调整高度
        window.onresize = function (e) {
          let docH = document.documentElement.clientHeight
          this.$refs.scroll.style.height = parseInt(docH) - 60 + 'px'
        }.bind(this)
        // set srollBar 和 目录标题滚动
        let titles = document.getElementsByClassName('title')
        let anchor = document.getElementsByClassName('catalog-title')
        this.$refs.scroll.onscroll = function (e) {
          let { clientHeight, scrollTop, scrollHeight } = e.target || e.srcElement
          this.scrollTop = scrollTop
          this.clientHeight = clientHeight
          this.scrollHeight = scrollHeight
          // 给目录动态添加active类
          if (titles.length <= 0 || anchor.length <= 0) {
            return
          }
          for (let i = 0, len = anchor.length; i < len - 1; i++) {
            if (titles.length !== anchor.length) { // 等到目录的titles 和 anchor都加载完毕， 确保两个数组的长度是一致的
              break
            }
            // 遍历每一个anchor， 如果scrollTop 在 anchor[i].offsetTop 和 anchro[i+1].offsetTop 之间， 当前active标题为title[i]
            if (scrollTop >= anchor[i].offsetTop - 100 && scrollTop <= anchor[i + 1].offsetTop - 100) {
              titles[i].classList.add('active')
            } else {
              titles[i].classList.remove('active')
            }
          }
            // 最后一个anchor 要单独判断， 因为最后一个anchor 不存在anchor[i + 1]的情况，
            // scrollTop <= anchor[i + 1].offsetTop - 100  会导致下标越界
          if (scrollTop >= scrollHeight - clientHeight || scrollTop >= anchor[anchor.length - 1].offsetTop - 100) {
            let actived = document.getElementsByClassName('active')[0]
            actived && actived.classList.remove('active')
            titles[titles.length - 1].classList.add('active')
          } else {
            titles[titles.length - 1].classList.remove('active')
          }
        }.bind(this)
        document.onmousewheel = function (e) {
          clearTimeout(this.timer2)
        }.bind(this)
      })
      // content 的innerHTML在mounted 或者$nextTick 中无法获取到，原因是浏览器渲染content需要时间？
      this.timer = setTimeout(() => { this.catalog = initCatalog(this.$refs.content) }, 300)
    },
    methods: {
      changeScrollTop (newScrollTop) {
        this.scrollTop = newScrollTop
        this.$refs.scroll.scrollTop = newScrollTop
      },
      goAnchor (el) {
        let offsetTop = el.offsetTop
        smoothScroll.call(this, {offsetTop}, () => {
        })
      },
      toggleCatalog () {
        this.showCatalog = !this.showCatalog
      },
      backTop () {
        smoothScroll.call(this, {offsetTop: 0, speed: 200})
      },
      ...mapMutations({
        setCATitle: 'SET_CURRENT_ARTICLE_TITLE'
      })
    },
    components: {
      ScrollBar,
      BackTop,
      Comment
    },
    watch: {
      currentArticle (newVal) {
        this.scrollTop = 0
        this.timer = setTimeout(() => { this.catalog = initCatalog(this.$refs.content) }, 300)
        this.$nextTick(() => {
          if (!newVal.title) return
          let meta = document.getElementById('description')
          document.title = 'MINGOF  --' + newVal.title
          let metaContent = newVal.content.replace(/<\/?[^>]*>/g, '')
          meta.content = metaContent.slice(0, 70) + '...'
        })
      }
    },
    destroyed () {
      clearTimeout(this.timer)
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/less/variable';
  @keyframes catalogIn {
    from {
      /*opacity: 0;*/
      /*width: 0; height: 0;*/
    }
    to {
      /*opacity: 1;*/
      /*width: 100px; height: 100px;*/
    }
  }

  .article-detail {
    .fadeIn();
    // padding: 0 @content-padding;
    margin: 0 auto;
    overflow-y: scroll;
    // 隐藏浏览器默认滚动条
    width: 100%;
    padding-right: 17px;
    article {
      .article;
    }
    .article-catalog {
      position: fixed;
      /*padding: 50px;*/
      right: 50px;
      bottom: 110px;
      opacity: .99;
      padding: 50px 0;
      max-width: 200px;
      max-height: 200px;
      overflow-y: auto;
      overflow-x: hidden;

      @media (min-width: 1600px) {
        max-width: 400px;
        max-height: 600px;
      }
      @media (max-device-width: 1200px) {
        display: none;
      }
      background-color: rgba(red(@background-base), green(@background-base), blue(@background-base), .8);
      .catalog {
        /*animation: catalogIn .3s;*/
      }
      .menu {
        position: fixed;
        right: 50px;
        font-size: 20px;
        text-align: center;
        line-height: 30px;
        width: 30px; height: 30px;
        padding: 10px;
        bottom: 110px;
        color: @text-color-light;
        background-color: inherit;
        transition: all .3s;
        &:hover {
          color: @text-color-base;
        }
      }
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 5px 50px;
        cursor: pointer;
        color: @text-color-light;
        /*padding: 5px 0;*/
        transition: color .3s;
        &.active {
          color: @text-color-base
        }
        &.title-level2 {
          padding-left: 70px;
        }
      }
      ul {
        list-style: none;
      }
    }
  }
</style>
