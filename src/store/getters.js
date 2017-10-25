export const articles = (state) => {
  return state.articles
}

export const currentArticleTitle = (state) => state.currentArticleTitle

export const currentArticle = (state) => {
  // console.log(state.singleArticle)
  // if (state.singleArticle['_id']) {
  //   console.log('haha')
  //   return state.singleArticle
  // }
  // for (let i = 0, len = state.articles.length; i < len; i++) {
  //   if (state.articles[i]['_id'] === state.currentArticleID || state.articles[i]['title'] === state.currentArticleTitle) {
  //     return state.articles[i]
  //   }
  // }
  return state.singleArticle
}

export const singleArticle = (state) => state.singleArticle

export const bgImg = (state) => state.bgImg

export const page = (state) => state.currentPage

export const count = (state) => state.count

export const lastID = (state) => state.lastID

export const numPerPage = (state) => state.numPerPage

export const pageCount = (state) => { // 分页数量 = 总数 / 每页显示数量
  return Math.ceil(state.count / state.numPerPage)
}

export const loading = (state) => state.loading
// export const singleArticle = state => state.singleArticle
