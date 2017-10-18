import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from '@/store/getters'
import state from '@/store/state'
import mutations from '@/store/mutations'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const isDebug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  state,
  mutations,
  strict: isDebug,
  plugin: isDebug ? [createLogger()] : []
})
