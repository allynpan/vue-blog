<template>
  <div id="archive" ref="scroll"
       @touchmove="checkTouchEnable($event)"
       @touchend="checkTouchEnable($event)"
       @touchstart="checkTouchEnable($event)"
       @touchcancel="checkTouchEnable($event)"
  >
    <div class="content">
      <div class="all-tags">
        <h1>All Tags</h1>
        <ul class="all-tags-list">
          <li class="all-tags-item" v-for="(item, index) in formattedTags" v-show="formattedTags.length > 0">
            <a
              :style="{fontSize: 18 * (item.blogs.length / 10 + 1) <= 40 ? 18 * (item.blogs.length / 10 + 1) * dpr + 'px' : 40 * dpr + 'px'}"
              @touchstart="scrollToAnchor($event, index)"
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
            <router-link  :to="'/posts/' + blog.blogid">
              {{blog.blogTitle}} <span>{{new Date(blog.blogTime).toLocaleDateString()}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { getTags } from '@/api/api'
  import BackTop from '@/components/back-top/back-top'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        tags: [],
        formattedTags: [],
        dpr: 1,
        lastClientY: 0
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._getTags()
      })
      this.dpr = parseInt(document.documentElement.dataset.dpr) || 1
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
        return arr
      },
      scrollToAnchor (e, index) {
        e.preventDefault()
        let anchor = this.$refs.tagTitle[index]
        let offsetTop = anchor.offsetTop
        document.documentElement.scrollTop = offsetTop - 20
        document.body.scrollTop = offsetTop - 20
        anchor.classList.add('bounce')
        let timer = setTimeout(() => {
          clearTimeout(timer)
          anchor.classList.remove('bounce')
        }, 3000)
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
      BackTop
    },
    destoryed () {
      clearTimeout(this.timer)
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/less/variable';
  #archive {
    .fadeIn();
    position: relative;
    background-color: rgba(255, 255, 255, 0.8);
    .font-dpr(16px);
    max-width: 100%;
    margin: 0 auto; overflow: hidden;
    .pr(margin-top, 110px);
    /*overflow-y: scroll;*/
    .pr(padding-top, @article-padding);
    .pr(padding-bottom, @article-padding);
    .pr(padding-left, @article-padding);
    .pr(padding-right, @article-padding);

    .content {
      margin: 0 auto;
      margin-top: 20px;
      @media(min-width: 1600px) {
        max-width: @content-width-l;
      }
      .all-tags {
        text-align: center;
        margin-bottom: 50px;
        .font-dpr(@font-size-subtitle);
        h1 {
          .font-dpr(@font-size-title);
        }
        .all-tags-list {
          list-style: none;
          margin-top: 20px;
          text-align: center;
          .all-tags-item {
            display: inline-block;
            margin: 10px 20px 10px 0;
            transition: all .3s;
            &:hover {
              transform: scale(1.1)
            }
            a {
              .font-dpr(@font-size-subtitle);
              text-decoration: none;
              border: 0 none;
              color: @highlight-color;
                /*word-break: normal;*/
              white-space: nowrap;
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
              span {
                color: @text-color-light;
                .font-dpr(@font-size-small);
                margin-left: 10px;
                word-wrap: break-word;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
</style>
