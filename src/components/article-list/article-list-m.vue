<template>
  <section id="article-list"
           ref="scroll"
           @touchmove="checkTouchEnable($event)"
           @touchend="checkTouchEnable($event)"
           @touchstart="checkTouchEnable($event)"
           @touchcancel="checkTouchEnable($event)"
  >
    <!-- uc 浏览器不会触发touchend事件， 但是会补发touchcancel事件-->
    <article v-for="(item, index) in articles" key={index} class="typo">
      <header>
        <h1><span @touchend="lastClientY === 0 && readMore($event, item)">{{item.title}}</span></h1>
        <h4><span>{{new Date(item.time).toLocaleDateString()}}</span></h4>
      </header>
      <div v-html="item.abstract" class="article-content-m">
      </div>
      <footer><div @touchend="lastClientY === 0 && readMore($event, item)">继续阅读</div></footer>
    </article>

    <div class="pagination">
      <div :class="['prev', page === 1 && 'disabled']" @click="prev" title="上一页" v-show="page !== 1">
        <span class="iconfont icon-pagination_arrow_l"></span>
        上一页
      </div>
      <div :class="['next', page === pageCount && 'disabled']"
           @click="next"
           title="下一页"
           v-show="page !== pageCount"
      >
        下一页
        <span class="iconfont icon-pagination_arrow_r"></span>
      </div>
      <div class="number"><span>{{page}}</span>/<span>{{pageCount}}</span></div>
    </div>
  </section>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
//  import ScrollBar from '../../components/scrollbar/scrollbar'
//  import BackTop from '../../components/back-top/back-top'
  export default {
    data () {
      return {
        adjust: 0,
        lastClientY: 0
      }
    },
    computed: {
      ...mapGetters([
        'articles',
        'count',
        'page',
        'pageCount',
        'loading'
      ]),
      paginationWidth () {
        let value = (Math.ceil(this.pageCount / 5) - 1) * 40
        return value > 0 && this.pageCount === this.pgOmitIndex ? value + 'px' : '40px'
      }
    },
    mounted () {
      this.adjust = parseInt(window.getComputedStyle(document.getElementById('header')).height)
      this.$nextTick(() => {
        this.$refs.scroll.style.marginTop = this.adjust + 'px'
      })
    },
    methods: {
      checkTouchEnable (e) {
        // 防止滑动的时候误触
        if (e.type === 'touchmove') {
          this.lastClientY = e.touches[0].clientY
        } else if (e.type === 'touchstart') {
          this.lastClientY = 0
        } else {
          this.lastClientY = 0
        }
      },
      readMore (e, article) {
        this.setCATitle(article['title'])
        this.setSingleArticle({})
        this.$router.push(`/posts/${article['_id']}`)
      },
      toPage (i) {
        this.setPage(i)
        window.sessionStorage.setItem('currentPage', i)
      },
      next () {
        if (this.page >= this.pageCount) return
        this.toPage(this.page + 1)
//        document.documentElement.scrollTop = 0
//        document.body.scrollTop = 0
      },
      prev () {
        if (this.page <= 1) return
        this.toPage(this.page - 1)
//        document.documentElement.scrollTop = 0
//        document.body.scrollTop = 0
      },
      togglePgOmit () {
        this.pgOmitIndex = this.pageCount
      },
      ...mapMutations({
        setCATitle: 'SET_CURRENT_ARTICLE_TITLE',
        setPage: 'SET_CURRENT_PAGE',
        setLastID: 'SET_LASTID',
        setSingleArticle: 'SET_SINGLE_ARTICLE'
      })
    },
    watch: {
      loading (flag) {
        if (flag === false) {
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        }
      }
    },
    destroyed () {
      clearTimeout(this.timer2)
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/less/variable';
  #article-list {
    /*overflow: hidden;*/
    /*height: 500px;*/
    .fadeIn();
    article {
      .article-m;
      header {
        h1 {
          .font-dpr(20px);
        }
      }
      &:last-of-type {
        .pr(margin-bottom, 50px);
        &::after {
          display: none;
        }
      }
    }
    .pagination {
      .pr(padding-left, @article-padding);
      .pr(padding-right, @article-padding);
      .pr(padding-bottom, @article-padding);
      .prev {
        .font-dpr(16px);
        .pr(height, 50px);
        .pr(line-height, 50px);
        text-align: left;
        .pr(width, 200px);
        float: left;
        color: @highlight-color;
        span {
          .font-dpr(14px);
          vertical-align: top;
        }
      }
      .next {
        .prev;
        float: right;
        text-align: right;
      }
      .number {
        color: @text-color-light;
        .font-dpr();
        .pr(height, 50px);
        .pr(line-height, 50px);
        .pr(margin-left, 200px);
        .pr(margin-right, 200px);
        text-align: center;
      }
      .disabled {
        color: @text-color-light;
      }
    }
  }
</style>
