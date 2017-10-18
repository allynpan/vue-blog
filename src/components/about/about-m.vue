<template>
  <div id="about">
    <div>
      <ul>
        <li>嗯......</li>
        <li>前端菜狗</li>
        <li>没有工作的前端菜狗</li>
        <li>没有工作的宅男属性的前端菜狗</li>
        <li>没有工作的宅男属性的并且没有女朋友的前端菜狗</li>
        <li>TAG： 前端、吃狗粮infinitely、瘦、NO MONEY、need 关爱</li>
        <li>特长： (() => null)()</li>
      </ul>
      <ul style="list-style: none">
        <li>copyright: nothing</li>
        <li></li>
        <li style="text-align: center; color: #666">傲娇的我采用VueJS纯手工自建的博客</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/less/variable";
  #about {
    font-family: Monaco, Consolas, Arial, 'Microsoft YaHei';
    .font-dpr(16px);
    .fadeIn();
    overflow: hidden;
    @media(min-width: 1600px) {
      max-width: @content-width-l;
    }
    .pr(margin-top, 110px);
    ul {
      margin-bottom: 20px;
      background-color: @background-content;
      li {
        font-family: inherit;
        padding: 20px;
        /*font-family: Monaco;*/
      }
    }
    & > div {
      @media(max-width: 1600px) {
        overflow-y: scroll;
        /*height: 500px;*/
        padding-right: 17px;
        width: 100%;
        li {
          padding: 15px;
        }
      }
    }
  }
</style>
