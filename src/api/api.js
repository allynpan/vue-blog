import axios from 'axios'
import HOST from './host'
let progress = document.getElementById('progress')
export const getArticles = function ({numPerPage, lastBlogId, currentPage, blogTitle, blogId}) {
  return axios({
    url: `${HOST}/articles`,
    method: 'POST',
    withCredentials: true,
    data: {
      num: numPerPage,
      lastID: lastBlogId,
      page: currentPage,
      title: blogTitle,
      id: blogId
    },
    onUploadProgress: () => {
      return
    },
    onDownloadProgress: (event) => {
      if (!this || !this._isVue) return
      this.$nextTick(() => {
        progress = !progress ? progress = document.getElementById('progress') : progress
        if (!progress || !this || !this._isVue) return
        let percent = event.loaded / event.total * 100
        progress.style.width = event.loaded / event.total * 100 + '%'
        if (percent === 100) {
          progress.style.width = '100%'
          let timer = setTimeout(() => {
            progress.style.width = 0
            clearTimeout(timer)
          }, 200)
        }
      })
    }
  }).then(response => response.data)
}

export const bingWallpaper = function () {
  return axios({
    url: `${HOST}/bing-wallpaper`,
    method: 'GET'
  }).then(response => response.data)
}

export const getTags = function ({blogId, tagId, tagName}) {
  return axios({
    url: `${HOST}/tags`,
    method: 'post',
    widthCredentials: true,
    data: {
      blogId,
      tagId,
      tagName
    }
  }).then(response => response.data)
}

export const search = function ({value}) {
  return axios({
    url: `${HOST}/search-article`,
    method: 'post',
    widthCredentials: true,
    data: {
      value
    }
  }).then(response => response.data)
}
