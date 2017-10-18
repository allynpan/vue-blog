import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import vueLazyLoad from 'vue-lazyload'

Vue.use(vueLazyLoad, {
  lazyComponent: true
})
import '@/common/reset.css'
import '@/common/typo.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

