<template>
  <section id="article-list" ref="scroll">
    <article v-for="(item, index) in articles" key={index} class="typo">
      <div class="cover" :style="{backgroundImage: ``}"></div>
      <header>
        <h2 @click="readMore(item)">{{item.title}}</h2>
        <h4>{{new Date(item.time).toLocaleString()}}</h4>
      </header>
      <div v-html="item.abstract" class="article-content">
      </div>
      <footer @click="readMore(item)">继续阅读</footer>
    </article>
    <scroll-bar
      :scrollHeight="scrollHeight"
      :scrollTop="scrollTop"
      :clientHeight="clientHeight"
      @newScrollTop = 'changeScrollTop'
    ></scroll-bar>
    <back-top
      @backTop="backTop"
      :scrollHeight="scrollHeight"
      :scrollTop="scrollTop"
    ></back-top>
    <div class="pagination" :style="{width: paginationWidth}">
      <div class="prev iconfont icon-pagination_arrow_l" @click="prev" title="上一页"></div>
      <div
        v-for="i in pageCount"
        :class="['page-item', page === i ? 'active' : '']"
        @click="toPage(i)"
        v-if="i < pgOmitIndex - 1"
      >
        {{i}}
      </div>
      <div
        v-for="i in pageCount"
        :class="['page-item', page === i || (page > i && page < pageCount) ?  'active' : '']"
        @click="toPage(i)"
        v-if="i === pgOmitIndex - 1"
      >
        {{page > i && page < pageCount ? page : i}}
      </div>
      <!--从第pgOmitIndex个开始省略-->
      <div class="omit page-item"
           v-if="pageCount >= pgOmitIndex && pgOmitIndex !== pageCount"
           @click="togglePgOmit"
      >...</div>
      <div
        :class="['page-item', page === pageCount ? 'active' : '']"
        @click="toPage(pageCount)"
        v-if="pgOmitIndex <= pageCount"
      >
        {{pageCount}}
      </div>
      <div class="next iconfont icon-pagination_arrow_r"
           @click="next"
           title="下一页"></div>
    </div>
  </section>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import ScrollBar from '../../components/scrollbar/scrollbar'
  import BackTop from '../../components/back-top/back-top'
  import { smoothScroll } from '../../common/js/dom'
  export default {
    data () {
      return {
        scrollTop: 0,
        scrollHeight: 0,
        clientHeight: 0,
        pgOmitIndex: 7
      }
    },
    computed: {
      ...mapGetters([
        'articles',
        'count',
        'page',
        'pageCount'
      ]),
      paginationWidth () {
        let value = (Math.ceil(this.pageCount / 5) - 1) * 40
        return value > 0 && this.pageCount === this.pgOmitIndex ? value + 'px' : '40px'
      }
    },
    mounted () {
      this.$nextTick(() => {
        let docH = document.documentElement.clientHeight
        this.$refs.scroll.style.height = parseInt(docH) - 60 + 'px'
        window.onresize = function () {
          let docH = document.documentElement.clientHeight
          this.$refs.scroll.style.height = parseInt(docH) - 60 + 'px'
        }.bind(this)
        this.$refs.scroll.onscroll = function (e) {
          let { clientHeight, scrollTop, scrollHeight } = e.target || e.srcElement
          this.scrollTop = scrollTop
          this.clientHeight = clientHeight
          this.scrollHeight = scrollHeight
        }.bind(this)
      })
      document.onmousewheel = function (e) {
        clearTimeout(this.timer2)
      }.bind(this)
    },
    components: {
      ScrollBar,
      BackTop
    },
    methods: {
      readMore (article) {
        this.setCATitle(article['title'])
        this.setSingleArticle({})
        this.$router.push(`/posts/${article['_id']}`)
      },
      backTop () {
        smoothScroll.call(this, {
          offsetTop: 0,
          speed: 200
        })
      },
      toPage (i) {
        this.setPage(i)
        window.sessionStorage.setItem('currentPage', i)
        this.scrollTop = 0
        this.$refs.scroll.scrollTop = 0
      },
      next () {
        if (this.page >= this.pageCount) return
        this.toPage(this.page + 1)
      },
      prev () {
        if (this.page <= 1) return
        this.toPage(this.page - 1)
      },
      togglePgOmit () {
        this.pgOmitIndex = this.pageCount
      },
      changeScrollTop (newScrollTop) {
        this.ScrollTop = newScrollTop
        this.$refs.scroll.scrollTop = newScrollTop
      },
      ...mapMutations({
        setCATitle: 'SET_CURRENT_ARTICLE_TITLE',
        setPage: 'SET_CURRENT_PAGE',
        setLastID: 'SET_LASTID',
        setSingleArticle: 'SET_SINGLE_ARTICLE'
      })
    },
    destroyed () {
      clearTimeout(this.timer2)
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/less/variable';
  #article-list {
    .fadeIn();
  //  padding: 0 @content-padding;
    position: relative;
    margin: 0 auto;
    /*margin-top: 20px;*/
    height: 100%;
    overflow-y: scroll;
    // hide sroll bar
    width: 100%;  padding-right: 17px;
    article {
      .article;
    }
    .pagination {
      width: 40px;
      margin: 20px 0;
      -moz-user-select: none;
      -webkit-user-select: none;
      position: fixed; top: 50%; right: 50px;
      transform: translate3d(0, -50%, 0);
      text-align: right;
      .page-item {
        float: right;
        transition: all 1s;
        background-color: @background-content;
        display: inline-block;
        padding: 5px;
        font-size: 20px;
        width: 30px; height: 30px;
        text-align: center;
        line-height: 30px;
        font-weight: 400;
        /*margin-right: 10px;*/
        /*margin-top: 10px;*/
        cursor: pointer;
        /*border-radius: 50%;*/
        // color: @highlight-color;
        color: @text-color-light;
        &.active {
          // background-color: @highlight-color;
          /*color: #fff;*/
          font-size: 25px;
          color: @highlight-color;
        }
      }
      .prev, .next {
        .page-item;
        width: 100%;
        padding: 5px 0;
        /*clear: both;*/
        /*transform: rotate(90deg);*/
        float: none;
        &:hover {
          color: @text-color-base;
        }
      }
      .prev {
        /*margin-bottom: 10px;*/
        text-indent: -2px;
        border-radius: 3px 3px 0 0;
      }
      .next {
        /*margin-top: 10px;*/
        text-indent: 2px;
        border-radius: 0 0 3px 3px;
      }
    }
  }
</style>
