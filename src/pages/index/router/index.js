import Vue from 'vue'
import Router from 'vue-router'
// const Main = () => import('@/components/main/main')
// const Article = () => import('@/components/article/article')
// const Archive = () => import('@/components/archive/archive')
// const About = () => import('@/components/about/about')
// const Search = () => import('@/components/search/search')
import Main from '@/components/main/main'
import Article from '@/components/article/article'
import Archive from '@/components/archive/archive'
import About from '@/components/about/about'
import ArticleList from '@/components/article-list/article-list'
import Search from '@/components/search/search'
// import Header from '@/components/header/header'
Vue.use(Router)

let router = new Router({
  mode: 'history',
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
router.beforeEach(function (to, from, next) {
  window.prerenderReady = false
  next()
})
router.afterEach(function () {
  window.prerenderReady = true
})
export default router
