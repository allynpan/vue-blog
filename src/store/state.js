const state = {
  currentArticleID: 0, // 当前articleID，用于路由跳转识别具体为哪个文章
  currentArticleTitle: '',
  count: 0,
  lastID: 0, // 每页的最后一个文章的ID， 用于分页请求
  currentPage: 1, // 当前分页
  numPerPage: 5, // 每页显示数量
  articles: [], // 浏览器初次加载、或者点击“文章”回到main.vue时使用该数据
  singleArticle: {}, // 跳过main.vue直接进入article.vue 时使用该数据
  loading: false // 是否正在加载文章
}
export default state
