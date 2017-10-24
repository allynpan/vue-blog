import Vue from 'vue'
import Router from 'vue-router'
const Main = () => import('@/components/main/main-m')
const Article = () => import('@/components/article/article-m')
const Archive = () => import('@/components/archive/archive-m')
const About = () => import('@/components/about/about-m')
const ArticleList = () => import('@/components/article-list/article-list-m')
const Search = () => import('@/components/search/search-m')
// import Main from '@/components/main/main-m'
// import Article from '@/components/article/article-m'
// import Archive from '@/components/archive/archive-m'
// import About from '@/components/about/about-m'
// import ArticleList from '@/components/article-list/article-list-m'
// import Search from '@/components/search/search-m'
// import Header from '@/components/header/header'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/posts',
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/posts',
      component: Main,
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: '/',
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        },
        {
          path: ':desc',
          component: Article,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/archive',
      component: Archive,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        keepAlive: true
      }
    }
  ]
})
