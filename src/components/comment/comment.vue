<template>
  <div id="comments"
  >
    <vue-disqus
      @load="this.loaded"
      @error="this.error"
      api_key="tmHRCivRggJ0fnbsBLg5JTUYIpgKPy3QevGkgYlCRw6kzSGruIPskuFmxe5yCiwc"
      :title="currentArticle.title"
      shortname="mingof"
      :url="'http://localhost:8080/post?id=' + currentArticle['_id']"
    ></vue-disqus>
    <div v-if="!loading && !loadSuccess" style="padding: 20px;">
      加载评论失败，请确保当前网络能访问&nbsp;<a target="_blank" href="https://disqus.com">https://disqus.com</a>
    </div>
    <div v-if="loading" style="padding: 20px;">
      评论加载中...
    </div>
  </div>
</template>
<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'
  export default {
    props: {
      currentArticle: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        loadSuccess: true,
        loading: true
      }
    },
    methods: {
      loaded () {
        this.loadSuccess = true
        this.loading = false
      },
      error () {
        this.loadSuccess = false
        this.loading = false
      }
    },
    components: {
      VueDisqus
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/variable";
  #comments {
    background-color: rgba(255, 255, 255, .8);
    /*margin: 20px 0;*/
    padding: @article-padding;
    margin-bottom: 20px;
  }
  [data-dpr] {
    #comments {
      margin-bottom: 0;
    }
  }
</style>
