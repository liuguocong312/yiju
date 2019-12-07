<template>
  <div class="concact">
    <about-header title="联系我们"></about-header>
    <div class="right_content">
      <h3>新移居中国总部-广州</h3>
      <br>
      地址：公司地址:广州天河区珠江新城珠江西路5号，广州国际金融中心(西塔)37楼
    </div>
    <p><br></p>

      <iframe width="800" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://map.baidu.com/poi/%E5%B9%BF%E5%B7%9E%E7%A7%BB%E5%B1%85%E7%BD%91%E7%BB%9C%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/@12615890.097575558,2630022.5232318505,18.34z?uid=f6c65e4304246bad2b201ae4&primaryUid=7333039006299167040&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&querytype=detailConInfo&da_src=shareurl"></iframe>

  </div>
</template>

<script>
  import aboutHeader from '@/components/aboutheader'
  export default {
    name: 'concact',
    components: {aboutHeader},
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .concact{
    padding: 30px 60px;
    .right_content{
      padding-top: 35px;
      line-height: 25px;
      p{
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        color: #424242;
        font-size: 14px;
      }
    }
  }
</style>
