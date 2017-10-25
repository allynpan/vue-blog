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
    <comment :currentArticle="currentArticle || {}"></comment>
  </section>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
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
      this.adjust = parseInt(window.getComputedStyle(document.getElementById('header')).height)
      this.$nextTick(() => {
        this.$refs.scroll.style.marginTop = this.adjust + 'px'
      })
    },
    methods: {
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
