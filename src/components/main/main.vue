<template>
  <section id="main" class="fade">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </section>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { getArticles } from '@/api/api'

  export default {
    computed: {
      ...mapGetters([
        'page',
        'lastID',
        'numPerPage',
        'currentArticleTitle',
        'currentArticle',
        'singleArticle'
      ]),
      routeParamDesc () {
        return this.$route.params.desc
      }
    },
    mounted () {
      this._getArticles({
        numPerPage: this.numPerPage,
        currentPage: this.page,
        omit: {
          content: 0, // 不请求正文
          contentMD: 0, // 不请求Markdown
          tags: 0 // 不请求文章标签
        }
      })
      if (this.$route.params.desc) {
        this._getSingleArticles()
      }
      let cp = window.sessionStorage.getItem('currentPage')
      if (Number(cp) > 0) {
        this.setPage(parseInt(cp))
      } else {
        window.sessionStorage.setItem('currentPage', 1)
        this.setPage(1)
      }
    },
    methods: {
      _getArticles (obj) {
        getArticles.call(this, obj)
          .then(data => {
            if (data.data && data.code === 0) {
              this.setArticles(data.data)
              this.setLastID(data.data[data.data.length - 1]['_id'])
              this.setCount(data.count)
            }
          })
      },
      _getSingleArticles () {
        // 请求单个文章， 当从标签页/archive或者搜索页/search 跳转到 /posts的时候使用
        this.setSingleArticle({})
        let desc = this.$route.params.desc
        getArticles.call(this, {blogId: desc})
          .then(data => {
            if (data.data && data.code === 0) {
              this.setSingleArticle(data.data[0])
            }
          })
      },
      ...mapMutations({
        setArticles: 'SET_ARTICLES',
        setLastID: 'SET_LASTID',
        setCount: 'SET_COUNT',
        setPage: 'SET_CURRENT_PAGE',
        setSingleArticle: 'SET_SINGLE_ARTICLE'
      })
    },
    watch: {
      page (newPg) {
        this._getArticles({
          numPerPage: this.numPerPage,
          currentPage: newPg,
          omit: {
            content: 0, // 不请求正文
            contentMD: 0, // 不请求Markdown
            tags: 0 // 不请求文章标签
          }
        })
      },
      routeParamDesc (newDesc) {
        // 监听路由变化， 如果有desc参数，则请求单个文章
        if (!newDesc) return
        this._getSingleArticles()
      }
    },
    destroyed () {
      clearTimeout(this.timer)
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/less/variable';
  #main {
//    .fadeIn();
    max-width: @content-width;
    margin: 0 auto;
    // 隐藏浏览器默认滚动条
    overflow: hidden;
    @media(min-width: 1600px) {
      max-width: @content-width-l;
    }
  }
</style>
