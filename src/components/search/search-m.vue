<template>
  <div id="search">
    <input class="search-bar"
           @keydown="handleSearch($event)"
           title="搜索"
           autofocus
           @focus="($event) => $event.target.select()"
           @input="handleSearch($event)"
           ref="searchBar"
           placeholder="请输入标题、标签"
    >
    <div class="loadingWrapper" v-show="searchStatus !== 'success'">
      <div class="loading iconfont icon-loading"></div>
    </div>
    <ul class="result">
      <li v-for="(item, index) in data" class="result-item">
        <a :href="/mobile#posts/ + item['_id']" @click="toArticle($event, item)">
          <span class="result-item-title" v-html="highlights[index]"></span>
          <span class="result-item-time">{{new Date(item.time).toLocaleDateString()}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  import { search, getArticles } from '@/api/api'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        searchStatus: 'success',
        data: [],
        searchKey: '',
        adjust: 0
      }
    },
    mounted () {
      this.$refs.searchBar.focus()
      this.adjust = parseInt(window.getComputedStyle(document.getElementById('header')).height)
      this.$nextTick(() => {
        this.$el.style.marginTop = this.adjust + 'px'
      })
    },
    computed: {
      highlights () {
        // 搜索关键字高亮
        // console.log(this.data)
        if (!this.data || this.data.length < 0) {
          return ''
        }
        let arr = []
        for (let i = 0; i < this.data.length; i++) {
          let reg = new RegExp(this.searchKey, 'i')
          let title = this.data[i].title.replace(reg, function (a) {
            return `<span class="highlight">${a}</span>`
          })
          arr.push(title)
        }
        return arr
      }
    },
    methods: {
      handleSearch (e) {
        // console.log(e)
        this.searchStatus = 'pending'
        let value = e.target.value
        this.searchKey = value
        search.call(this, {value: value}).then(data => {
          // console.log(data)
          if (!data || data.code === 1) {
            this.searchStatus = 'failed'
            this.$emit('searchDone', this.searchStatus, [])
          } else if (data.code === 0) {
            this.searchStatus = 'success'
            this.$emit('searchDone', this.searchStatus, data.data)
            this.data = data.data
          }
        })
      },
      toArticle (e, article) {
        this.setSingleArticle('')
        this.setTitle('')
        getArticles({blogId: article['_id']})
          .then(data => {
            // console.log(data)
            if (data.code === 0) {
              this.setSingleArticle(data.data[0])
            }
          })
      },
      ...mapMutations({
        setTitle: 'SET_CURRENT_ARTICLE_TITLE',
        setSingleArticle: 'SET_SINGLE_ARTICLE'
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/variable";
  .highlight {
    color: @highlight-color;
  }
  @keyframes loading {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg)
    }
  }
  #search {
    .fadeIn();
    position: relative;
    max-width: @content-width;
    margin: 0 auto; overflow: hidden;
    .pr(margin-top, 50px);
    @media(min-width: 1600px) {
      max-width: @content-width-l;
    }
    background-color: @background-content;
    .loadingWrapper {
      position: absolute;
      .pr(height, 100px);
      .pr(width, 100px);
      top: 0; right: 0;
      display: -webkit-box;
      -webkit-box-orient: horizontal;
      -webkit-box-align: center;
      -webkit-box-pack: center;
    }
    .loading {
      color: @text-color-light;
      vertical-align: middle;
      /*height: 50px;*/
      .font-dpr(20px);
      /*line-height: 50px;*/
      animation: loading 1s infinite linear;
    }
    input {
      display: block;
      /*box-shadow: 0 1px 3px 0 @background-base-dark;*/
      outline: none;
      border: 0 none;
      width: 100%; .pr(height, 100px);
      padding: 0; margin: 0;
      text-align: center;
      color: @text-color-light;
      .font-dpr(@font-size-title);
      background-color: transparent;
      &::-webkit-input-placeholder {
        font-family: 'Microsoft YaHei', Arial, monospace;
        .font-dpr(@font-size-title);
        color: @text-color-light
      }
      &::-moz-placeholder {
        font-family: 'Microsoft YaHei', Arial, monospace;
        font-size: @font-size-title;
        color: @text-color-light
      }
      &::selection {
        background-color: @background-base
      }
    }
    .result {
      list-style: none;
      max-height: 750px;
      overflow: auto;
      .font-dpr(16px);
      .result-item {
        a {
          text-decoration: none;
          border-bottom: 0 none;
        }
        padding: @article-padding;
        .result-item-title {
          margin-right: 10px;
          text-decoration: none;
          &:hover {
            color: @highlight-color;
          }
        }
        .result-item-time {
          color: @text-color-light;
          .font-dpr(@font-size-small);
        }
      }
    }
  }
</style>
