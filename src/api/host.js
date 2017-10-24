let HOST = 'https://blog.linyqiang.com'
if (window.localStorage.getItem('HOST')) {
  HOST = window.localStorage.getItem('HOST')
}
// const HOST = 'http://localhost:8888'
export default HOST
