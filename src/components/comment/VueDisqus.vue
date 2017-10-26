<template>
  <div id="disqus_thread"></div>
</template>

<script>
  /**
   * Copyright 2017 ktquez https://github.com/ktquez/vue-disqus

   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  export default {
    name: 'vue-disqus',
    props: {
      shortname: {
        type: String,
        required: true
      },
      identifier: {
        type: String,
        required: false
      },
      url: {
        type: String,
        required: false
      },
      title: {
        type: String,
        required: false
      },
      remote_auth_s3: {
        type: String,
        required: false
      },
      api_key: {
        type: String,
        required: false
      },
      sso_config: {
        type: Object,
        required: false
      },
      resetTrigger: {
        type: [String, Number, Boolean, Object, Array]
      }
    },
    mounted () {
      if (window.DISQUS) {
        this.reset(window.DISQUS)
        return
      }
      this.init()
    },
    watch: {
      resetTrigger (newVal) {
        console.log(newVal)
        this.$nextTick(() => {
          if (window.DISQUS && !!newVal) {
            this.reset(window.DISQUS)
            return
          }
        })
      }
    },
    methods: {
      reset (dsq) {
        const self = this
        dsq.reset({
          reload: true,
          config: function () {
            this.page.identifier = (self.identifier || self.$route.path || window.location.pathname)
            this.page.url = (self.url || self.$el.baseURI)
            if (self.title) {
              this.page.title = self.title
            }
            if (self.remote_auth_s3) {
              this.page.remote_auth_s3 = self.remote_auth_s3
            }
            if (self.key) {
              this.page.api_key = self.key
            }
            if (self.sso_config) {
              this.sso = self.sso_config
            }
          }
        })
      },
      init () {
        const self = this
        window.disqus_config = function () {
          this.page.identifier = (self.identifier || self.$route.path || window.location.pathname)
          this.page.url = (self.url || self.$el.baseURI)
          if (self.title) {
            this.page.title = self.title
          }
          if (self.remote_auth_s3) {
            this.page.remote_auth_s3 = self.remote_auth_s3
          }
          if (self.api_key) {
            this.page.api_key = self.api_key
          }
          if (self.sso_config) {
            this.sso = self.sso_config
          }
        }
        setTimeout(() => {
          let d = document
          let s = d.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.setAttribute('id', 'embed-disqus')
          s.setAttribute('data-timestamp', +new Date())
          s.src = `//${this.shortname}.disqus.com/embed.js`
          ;(d.head || d.body).appendChild(s)
          s.onload = () => this.$emit('load')
          s.onerror = () => this.$emit('error')
        }, 0)
      }
    }
  }
</script>
