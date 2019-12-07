<template>
  <div>
    <top-swiper></top-swiper>

    <div class="index-status-box">
          <div class="status-box">
            <div class="box-item">

            <div class="imgbox">
              <div class="img"><img src="../assets/img/nav_icon01.png" alt=""></div>
            </div>
            <div class="textbox">
              <div class="title">
                真实房源
              </div>
              <div class="sm_title">直销优质项目 置业多元选择</div>
              <!--<div class="sm_title" style="margin-top: 5px"></div>-->
            </div>

          </div>
            <div class="box-item">
              <div class="imgbox">
                <div class="img" ><img src="../assets/img/nav_icon02.png" alt=""></div>
              </div>
              <div class="textbox">
                <div class="title">
                  安全交易
                </div>
                <div class="sm_title">贷款服务 流程规范 专属律师</div>
                <!--<div class="sm_title" style="margin-top: 5px">投资全球,与您一路相伴</div>-->
              </div>

            </div>

            <div class="box-item">
              <div class="imgbox">
                <div class="img" ><img src="../assets/img/nav_icon03.png" alt=""></div>
              </div>
              <div class="textbox">
                <div class="title">
                  专业团队
                </div>
                <div class="sm_title">中外团队协作 顾问1对1服务</div>
                <!--<div class="sm_title" style="margin-top: 5px"></div>-->
              </div>

            </div>

            <div class="box-item">
              <div class="imgbox">
                <div class="img" ><img src="../assets/img/nav_icon04.png" alt=""></div>
              </div>
              <div class="textbox">
                <div class="title">
                  一站式服务
                </div>
                <div class="sm_title">开发销售租赁 物业托管服务</div>
                <!--<div class="sm_title" style="margin-top: 5px">最严风控,甄选最优资产</div>-->
              </div>

            </div>


          </div>
    </div>

    <index-activity></index-activity>

    <indexRecommend></indexRecommend>

    <index-activity2></index-activity2>

    <bot-swiper></bot-swiper>

    <index-info></index-info>

    <index-map></index-map>

  </div>
</template>

<script>
  import topSwiper from '@/components/indexTopswiper'
  import indexActivity from '@/components/indexActivity'
  import indexActivity2 from '@/components/indexActivity2'
  import indexRecommend from '@/components/indexRecommend'
  import indexInfo from '@/components/indexInfo'
  import botSwiper from '@/components/indexBotSwiper'
  import indexMap from '@/components/indexMap'
  export default {
    name: 'temp',
    components:{
      topSwiper,
      indexActivity,
      indexRecommend,
      indexActivity2,
      indexInfo,
      botSwiper,indexMap
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .index-status-box{
    width: 100%;
    height: 100px;
    min-width: 1280px;
    font-size: 14px;
    .status-box{
      width: 85%;
      background-color: white;
      margin: 0 auto;
      height: 100%;
      .box-item{
        float: left;
        width: 25%;
        position: relative;
        height: 100%;
        cursor: pointer;
        text-align: center;

        &:nth-last-of-type(1){
            text-align: right;
        }

        &:nth-of-type(1){
          text-align: left;
        }

        &:nth-of-type(3){
          .imgbox{
            margin-left: 10%;
          }

        }

        /*&:hover{*/
          /*.imgbox{*/
            /*background-color: #ee5c59;*/
            /*border: 1px solid #ee5c59;*/
            /*.img{*/
              /*background-image: url("../assets/img/indexicon-white.png");*/
            /*}*/
          /*}*/

        /*}*/


        .textbox{
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          text-align: left;
          .title{
            /*border:1px solid red;*/
            font-size: 20px;
            color: #333;
            margin-bottom: 5px;
            /*margin-bottom:15px;*/
          }
          .sm_title{
            font-size: 12px;
            color: #999;
            margin-bottom: 12px;
          }
        }

        .imgbox{
          width: 71px;
          height: 71px;
          /*border: 1px solid #ccc;*/
          border-radius: 50%;
          text-align: center;
          margin-top: 35px;
          vertical-align: middle;
          display: inline-block;
          transition: .3s;
          .img{
            /*background-image: url("../assets/img/indexicon.png");*/
            background-size: 40px;
            width: 40px;
            height: 40px;
            position: relative;
            top: -10px;
            margin: 0 auto;
          }

        }
      }
    }
  }
</style>

