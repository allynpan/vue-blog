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
        'currentArticleTitle'
      ])
    },
    mounted () {
      this._getArticles({numPerPage: this.numPerPage, currentPage: this.page})
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
//            console.log(data)
            if (data.data && data.code === 0) {
              this.setArticles(data.data)
              this.setLastID(data.data[data.data.length - 1]['_id'])
              this.setCount(data.count)
            }
          })
      },
      ...mapMutations({
        setArticles: 'SET_ARTICLES',
        setLastID: 'SET_LASTID',
        setCount: 'SET_COUNT',
        setPage: 'SET_CURRENT_PAGE'
      })
    },
    watch: {
      page (newPg) {
        this._getArticles({numPerPage: this.numPerPage, currentPage: newPg})
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
