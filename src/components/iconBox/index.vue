<template>
  <div class="icon-box">
    <ul>
      <!--<li>-->
        <!--<img src="../../assets/img/add.jpg" alt="">-->
        <!--<span><img src="../../assets/img/gzh.jpg" alt=""></span>-->
      <!--</li>-->
      <!--<li>-->
        <!--<img src="../../assets/img/qqzone.jpg" alt="">-->
        <!--<span><img src="../../assets/img/gzh.jpg" alt=""></span>-->
      <!--</li>-->
      <li>
        <img style="width:32px" src="../../assets/img/sinna.png" alt="">
        <span><img src="../../assets/img/gzh.jpg" alt=""></span>
      </li>
      <!--<li>-->
        <!--<img src="../../assets/img/tx.jpg" alt="">-->
        <!--<span><img src="../../assets/img/gzh.jpg" alt=""></span>-->
      <!--</li>-->
      <!--<li>-->
        <!--<img src="../../assets/img/ren.jpg" alt="">-->
        <!--<span><img src="../../assets/img/gzh.jpg" alt=""></span>-->
      <!--</li>-->
      <li>
        <img style="width:32px" src="../../assets/img/wechat.png" alt="">
        <span><img src="../../assets/img/gzh.jpg" alt=""></span>
      </li>
    </ul>
  </div>

</template>

<script>
    export default {
        name: "tpl"
    }
</script>

<style  lang="scss" scoped>
  .icon-box{
    ul{
      padding: 0;
      li{
        cursor: pointer;
        float:left;
        margin-left:10px;
        position:relative;
        img{

          vertical-align: middle;

        }
        &:hover span{
          display: block
        }
        span{
          padding: 8px;
          background:#ccc;
          position:absolute;
          right:-70px;
          top:60px;
          display: none;
        }
      }
    }
  }
</style>
