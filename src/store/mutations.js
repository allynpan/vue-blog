import * as TYPES from './mutation-types'

const mutations = {
  [TYPES.SET_ARTICLES] (state, articles) {
    state.articles = articles
  },
  [TYPES.SET_CURRENT_ARTICLE_ID] (state, id) {
    state.currentArticleID = id
  },
  [TYPES.SET_CURRENT_ARTICLE_TITLE] (state, title) {
    state.currentArticleTitle = title
  },
  [TYPES.SET_BGIMG] (state, img) {
    state.bgImg = img
  },
  [TYPES.SET_COUNT] (state, count) {
    state.count = count
  },
  [TYPES.SET_LASTID] (state, lastID) {
    state.lastID = lastID
  },
  [TYPES.SET_CURRENT_PAGE] (state, page) {
    state.currentPage = page
  },
  [TYPES.SET_NUM_PER_PAGE] (state, num) {
    state.numPerPage = num
  },
  [TYPES.SET_SINGLE_ARTICLE] (state, article) {
    state.singleArticle = {...article}
  }
}
export default mutations
