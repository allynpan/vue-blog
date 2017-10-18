<template>
  <section class="article-detail" ref="scroll">
    <!--文章正文-->
    <article class="typo">
      <div class="cover"></div>
      <header>
        <h1>{{currentArticle && currentArticle.title}}</h1>
        <h4>{{currentArticle.time && new Date(currentArticle.time).toLocaleDateString()}}</h4>
        <p class="tag">
          <span v-for="(tag, index) in currentArticle.tags">{{tag}}</span>
        </p>
      </header>
      <div v-html="currentArticle && currentArticle.content" class="article-content-m" ref="content">
      </div>
    </article>
    <!--文章目录-->
    <!--<aside class="article-catalog" v-if="catalog.length > 0">-->
      <!--<ul class="catalog" v-show="showCatalog">-->
        <!--<li v-for="(item, index) in catalog" class="cata-level1">-->
          <!--<p class="title-level1 title"-->
             <!--@click="goAnchor(item.$1th.el)"-->
             <!--:name="item.$1th.name"-->
          <!--&gt;{{index + 1 + ' ' + item.$1th.text}}</p>-->
          <!--<div class="cata-level2" v-if="item.$2th.length > 0">-->
            <!--<p class="title-level2 title"-->
               <!--v-for="(item2, index2) in item.$2th"-->
               <!--@click="goAnchor(item2.el)"-->
               <!--:name="item2.name"-->
            <!--&gt;-->
              <!--{{(index + 1) + '.' + (index2 + 1)  + ' ' + item2.text}}-->
            <!--</p>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<menu-->
        <!--:class="['menu', 'iconfont', showCatalog ? 'icon-close' : 'icon-menu']"-->
        <!--@click="toggleCatalog"-->
        <!--ref="catalog"-->
        <!--:style="{backgroundColor: showCatalog ? 'transparent' : 'inherit'}"-->
      <!--&gt;-->
      <!--</menu>-->
    <!--</aside>-->
    <comment :currentArticle="currentArticle || {}"></comment>
  </section>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { getArticles } from '@/api/api'
  import Comment from '../../components/comment/comment'
  export default {
    data () {
      return {
        scrollTop: 0,
        scrollHeight: 0,
        clientHeight: 0,
        catalog: [],
        adjust: 0,
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
      this.setCATitle(this.$route.params.desc)  // 设置currentAritcleTitle， vuex 通过currentArticleTitle 计算出currentAritcle
      this._getArticles()
      this.adjust = parseInt(window.getComputedStyle(document.getElementById('header')).height)
      this.$nextTick(() => {
        this.$refs.scroll.style.marginTop = this.adjust + 'px'
      })
    },
    methods: {
      _getArticles () {
        if (this.currentArticle['_id']) {
          return
        }
        let desc = this.$route.params.desc
        getArticles({blogId: desc})
          .then(data => {
            // console.log(data)
            if (data.data && data.code === 0) {
              this.setSingleArticle(data.data[0])
            }
          })
      },
      ...mapMutations({
        setCATitle: 'SET_CURRENT_ARTICLE_TITLE',
        setSingleArticle: 'SET_SINGLE_ARTICLE'
      })
    },
    components: {
      Comment
    },
    destroyed () {
      clearTimeout(this.timer)
    }
  }
  //  const Foo = () => Promise.resolve(article)
  //  export default Foo
</script>
<style lang="less" scoped>
  @import '../../common/less/variable';

  .article-detail {
    .fadeIn();
    // padding: 0 @content-padding;
    margin: 0 auto;
    overflow-y: scroll;
    // hide srocll bar
    width: 100%;
    padding-right: 17px;
    article {
      .article-m;
      &::after {
        display: none;
      }
      header {
        text-align: center;
        border-bottom: 1px solid #eae7eb;
        border-top: 1px solid #eae7eb;
        .pr(margin-bottom, 50px);
      }
    }
  }
</style>
