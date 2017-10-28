<template>
  <section id="archive-wrapper">
    <div id="archive" ref="scroll">
      <div class="content">
        <div class="all-tags">
          <h1>All Tags</h1>
          <ul class="all-tags-list">
            <li class="all-tags-item" v-for="(item, index) in formattedTags" v-show="formattedTags.length > 0">
              <a
                :href="'/archive#' + item.tag"
                :style="{fontSize: 18 * (item.blogs.length / 10 + 1) <= 40 ? 18 * (item.blogs.length / 10 + 1) + 'px' : '40px'}"
                @click="scrollToAnchor($event, index)"
              >
                {{item.tag}}
              </a>
            </li>
          </ul>
        </div>
        <div class="each-tag" v-for="(item, index) in formattedTags" v-show="formattedTags.length > 0">
          <h3 :name="item.tag" ref="tagTitle"># {{item.tag}}</h3>
          <ul class="tag-article-list">
            <li class="tag-article-item"
                v-for="(blog, index2) in item.blogs"
                v-if="blog.blogTitle"
            >
              <router-link :to="'/posts/' + blog.blogid">
                {{blog.blogTitle}} <span>{{new Date(blog.blogTime).toLocaleString()}}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <back-top
        :scrollHeight="scrollHeight"
        :scrollTop="scrollTop"
        @backTop="backTop"
      ></back-top>
      <scroll-bar
        :scrollHeight="scrollHeight"
        :scrollTop="scrollTop"
        :clientHeight="clientHeight"
        @newScrollTop = 'changeScrollTop'
      ></scroll-bar>
    </div>
  </section>
</template>
<script>
  import { getTags } from '@/api/api'
  import BackTop from '@/components/back-top/back-top'
  import { mapMutations } from 'vuex'
  import { smoothScroll } from '@/common/js/dom'
  import ScrollBar from '@/components/scrollbar/scrollbar'
  export default {
    data () {
      return {
        tags: [],
        formattedTags: [],
        scrollTop: 0,
        scrollHeight: 0,
        clientHeight: 0
      }
    },
    mounted () {
      window.prerenderReady = false
      this.init()
      this.$nextTick(() => {
        this._getTags()
      })
      this.$refs.scroll.onscroll = function (e) {
        let { clientHeight, scrollTop, scrollHeight } = e.target || e.srcElement
        this.scrollTop = scrollTop
        this.clientHeight = clientHeight
        this.scrollHeight = scrollHeight
      }.bind(this)
    },
    methods: {
      init () {
        this.$el.style.height = document.documentElement.clientHeight - 60 + 'px'
        window.addEventListener('resize', this.init)
      },
      _getTags () {
        getTags({}).then(data => {
          // console.log(data)
          if (data.code === 0) {
            this.tags = data.data
          }
        })
      },
      formatTags (tags) {
        tags = tags || this.tags
        let tmp = []
        let arr = []
        let obj = {}
        for (let i = 0; i < tags.length; i++) {
          tmp.push(tags[i].tag)
          let ti = tags[i]
          if (!obj[ti.tag]) {
            arr.push({
              tag: ti.tag,
              blogs: [ti]
            })
            obj[ti.tag] = ti
          } else {
            for (let j = 0; j < arr.length; j++) {
              let dj = arr[j]
              if (dj.tag === ti.tag) {
                dj.blogs.push(ti)
                break
              }
            }
          }
        }
        window.prerenderReady = true
        return arr
      },
      backTop () {
        smoothScroll.call(this, {
          offsetTop: 0,
          speed: 200
        })
      },
      changeScrollTop (newScrollTop) {
        this.ScrollTop = newScrollTop
        this.$refs.scroll.scrollTop = newScrollTop
      },
      scrollToAnchor (e, index) {
        e.preventDefault()
        let anchor = this.$refs.tagTitle[index]
        let offsetTop = anchor.offsetTop
        smoothScroll.call(this, {
          offsetTop,
          speed: 200
        }, () => {
          anchor.classList.add('bounce')
          let timer = setTimeout(() => {
            clearTimeout(timer)
            anchor.classList.remove('bounce')
          }, 3000)
        })
      },
      ...mapMutations({
        setTitle: 'SET_CURRENT_ARTICLE_TITLE',
        setSingleArticle: 'SET_SINGLE_ARTICLE'
      })
    },
    watch: {
      tags (newVal) {
        this.formattedTags = this.formatTags(newVal)
      }
    },
    components: {
      BackTop,
      ScrollBar
    },
    destoryed () {
      clearTimeout(this.timer)
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/less/variable';
  #archive-wrapper {
    width: 100%;
    overflow: hidden;
  }
  #archive {
    .fadeIn();
    position: relative;
    width: 100%;
    padding-right: 17px;
    background-color: rgba(255, 255, 255, 0.8);
    height: 1000px;
    max-width: 100%;
    margin: 0 auto; overflow: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      width: 100%;
      background-color: @background-base-dark;
      border-radius: 5px;
    }
    a {
      text-decoration: none;
      border-bottom: 0 none;
    }
    .content {
      margin: 0 auto;
      margin-top: 20px;
      width: @content-width;
      @media(min-width: 1600px) {
        max-width: @content-width-l;
      }
      .all-tags {
        margin-bottom: 50px;
        font-size: @font-size-subtitle;
        h1 {
          font-size: @font-size-title;
        }
        .all-tags-list {
          text-align: left;
          list-style: none;
          margin-top: 20px;
          .all-tags-item {
            display: inline-block;
            margin: 10px 20px 10px 0;
            transition: all .3s;
            &:hover {
              transform: scale(1.1)
            }
            a {
              font-size: @font-size-subtitle;
              text-decoration: none;
              border: 0 none;
              color: @highlight-color;
            }
          }
        }
      }
      .each-tag {
        margin-bottom: 50px;
        h3 {
          margin-bottom: 15px;
        }
        .tag-article-list {
          margin-left: 20px;
          .tag-article-item {
            margin-bottom: 10px;
            a {
              transition: all .3s;
              border-bottom: 0 none;
              color: @highlight-color;
              &:hover {
                border-bottom: 2px solid @text-color-light;
              }
              span {
                color: @text-color-light;
                font-size: @font-size-small;
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
