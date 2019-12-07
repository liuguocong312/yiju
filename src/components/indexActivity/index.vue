<template>
  <div class="activity clearfloat">
    <div class="body">
      <div class="remmoned">
        <div class="rtitle">
          <img src="../../assets/img/hot.png" width="36" height="36" alt="">
          <span>热门活动</span>
        </div>
        <div class="rbody">
          <router-link class="" v-if="index<=3" v-for="(item,index) in list" :key="index"
            :to="'/activity/detail?id='+item.id">
            <img class="rimg" style="height:24vh" :src="IMG_URL+item.activityImage" alt="">
            <span class="adr"><i class="gps"></i>{{item.cityName}}</span>
            <span class="cityName">{{item.activityName}}</span>
          </router-link>

        </div>
      </div>
      <!--<div class="remmoned" ref="imghei">-->

      <!--<div class="rtitle">-->
      <!--<img src="../../assets/img/video.png" width="36" height="36" alt="">-->
      <!--<span>视频看房</span>-->
      <!--</div>-->
      <!--<div class="rbody">-->
      <!--<router-link to="/">-->
      <!--<img class="rimg"  src="../../assets/img/1.jpg"  alt="">-->
      <!--</router-link>-->

      <!--</div>-->
      <!--</div>-->
      <!--<div class="remmoned" >-->

      <!--<div class="rtitle">-->
      <!--<img src="../../assets/img/video.png" width="36" height="36" alt="">-->
      <!--<span>开盘预告</span>-->
      <!--</div>-->
      <!--<div class="rbody timebox" :style="{'height':remboxheight+'px'}" >-->

      <!--<div class="timebox_container u-scroll-bar_select_black" ref="scrollbody">-->
      <!--<div style="height: auto">-->
      <!--<el-steps direction="vertical" space="90px">-->
      <!--<el-step>-->
      <!--<div slot="title">-->
      <!--<span class="timetitle">2018-10-01</span>-->
      <!--</div>-->

      <!--<div slot="description">-->
      <!--<div class="step_content">西雅图国会山壹号公馆</div>-->
      <!--<div  class="step_content_sub">联排别墅| ￥562万起</div>-->
      <!--</div>-->
      <!--</el-step>-->
      <!--<el-step>-->
      <!--<div slot="title">-->
      <!--<span class="timetitle">2018-10-01</span>-->
      <!--</div>-->

      <!--<div slot="description">-->
      <!--<div class="step_content">西雅图国会山壹号公馆</div>-->
      <!--<div  class="step_content_sub">联排别墅| ￥562万起</div>-->
      <!--</div>-->
      <!--</el-step>-->
      <!--<el-step>-->
      <!--<div slot="title">-->
      <!--<span class="timetitle">2018-10-01</span>-->
      <!--</div>-->

      <!--<div slot="description">-->
      <!--<div class="step_content">西雅图国会山壹号公馆</div>-->
      <!--<div  class="step_content_sub">联排别墅| ￥562万起</div>-->
      <!--</div>-->
      <!--</el-step>-->
      <!--<el-step>-->
      <!--<div slot="title">-->
      <!--<span class="timetitle">2018-10-01</span>-->
      <!--</div>-->

      <!--<div slot="description">-->
      <!--<div class="step_content">西雅图国会山壹号公馆</div>-->
      <!--<div  class="step_content_sub">联排别墅| ￥562万起</div>-->
      <!--</div>-->
      <!--</el-step>-->
      <!--</el-steps>-->
      <!--</div>-->
      <!--</div>-->

      <!--<div class="scrollBtn" @click="scrolls">-->
      <!--<img src="../../assets/img/scroll.png" width="17px" height="17px" alt="">-->
      <!--</div>-->

      <!--</div>-->
      <!--</div>-->
    </div>

  </div>

</template>

<script>
  import {
    activityList
  } from '@/api/info'

  export default {
    name: 'index-activity',
    data() {
      return {
        timeAxis2: [{
            time: 1213
          },
          {
            time: 1213
          },
          {
            time: 1213
          }
        ],
        remboxheight: 324,
        list: []

      }
    },
    mounted() {
      this.resizebox();
      window.addEventListener('resize', this.resizebox);
      activityList().then(res => {

        this.list = res.body.records.map((item) => {
          return item.entity;
        });
      });

    },

    created() {

    },

    beforeDestroy() {
      window.removeEventListener('resize', this.resizebox)
    },

    methods: {
      resizebox() {
        if (this.$refs.imghei)
          this.remboxheight = this.$refs.imghei.offsetWidth * 0.75;
      },
      //          scrolls(){
      //                this.$refs.scrollbody.scrollTop+=10;
      //          }

    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }

  .clearfloat {
    zoom: 1
  }

  .activity {
    width: 100%;
    min-width: 1280px;
    max-width: 1920px;
    padding-bottom: 50px;
    background-color: #f9f9f9;

    .body {
      width: 85%;
      margin: 0 auto;
      height: 100%;

      .remmoned {
        float: left;
        width: 100%;

        /*border:1px solid  red;*/
        &:not(:nth-of-type(1)) {
          margin-left: 1%;
          width: 100%;
        }

        .rtitle {
          font-size: 24px;
          color: #333;
          font-weight: 700;
          height: 85px;
          line-height: 85px;

          img {
            vertical-align: middle;

          }

          span {
            vertical-align: middle;
          }
        }

        .rbody {
          &.timebox {
            background-color: #fff;
            padding: 18px 8px 0 28px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .07);
            border-radius: 3px;
            border: 1px solid #eee;

            .timebox_container {
              height: 85%;
              overflow-y: auto;
            }

            .u-scroll-bar_select_black::-webkit-scrollbar {
              width: 21px;
              background-color: transparent;
            }

            .u-scroll-bar_select_black::-webkit-scrollbar-thumb {
              height: 20px;
              width: 3px;
              border-left: 9px solid #fff;
              border-right: 9px solid #fff;
              background-color: #ddd;
            }

            .u-scroll-bar_select_black::-webkit-scrollbar-track {
              background: #ddd;
              border-left: 10px solid #fff;
              border-right: 10px solid #fff;
            }


            .scrollBtn {
              cursor: pointer;
              text-align: center;
              line-height: 17px;
            }

            .step_content {
              font-size: 14px;
              line-height: 20px;
              margin-top: 12px;
              color: #333;
            }

            .step_content_sub {
              font-size: 12px;
              margin-top: 4px;
              opacity: .7;
              color: #999;
            }

          }

          a {
            position: relative;
            vertical-align: top;
            height: 24vh;

            width: 24%;
            margin-left: 0.5%;
            display: inline-block;

            /*border:1px solid red;*/
            .adr {
              position: absolute;
              top: 3px;
              right: 7px;
              color: white;
              background: rgba(0, 0, 0, 0.7);
              border-radius: 10px;
              padding: 0 10px;

              i.gps {
                width: 20px;
                height: 20px;
                display: inline-block;
                background: url("../../assets/img/gpsIcon.png") no-repeat;
                background-size: 15px 20px;
                vertical-align: middle;
              }

            }

            .cityName {
              text-align: center;
              font-size: .9em;
              height: 26px;
              line-height: 26px;
              width: 100%;
              bottom: 0;
              position: absolute;
              color: #fff;
              background: rgba(0, 0, 0, 0.7)
            }
          }


          .rimg {
            max-width: 100%;
            margin-left: 1%;
            //height: 20vh;
          }



        }

        &:nth-of-type(1) {
          .rimg {
            max-width: 100%;


          }
        }
      }



    }







  }

</style>

<style rel="stylesheet/scss" lang="scss">
  .timebox {

    .timetitle {
      font-size: 14px;
      display: inline-block;
      padding: 0 15px;
      height: 26px;
      line-height: 26px;
      background-color: #1682e1;
      border-radius: 13px;
      color: #fff;
    }

    .el-step__line {
      background-color: #1682e1;
      opacity: .3;
    }

    .el-step__icon {
      border-color: #1682e1;
      width: 18px;
      height: 18px;
      left: 3px;
    }

    .el-step__icon-inner {
      display: none;
    }

    .el-step:last-of-type .el-step__line {
      display: block;
    }
  }

</style>
