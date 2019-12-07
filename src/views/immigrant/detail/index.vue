<template>
  <div class="house-details" v-if="show">
    <div class="house-top">
      <!--<div class="crumbs">-->
      <!--<ul>-->
      <!--<li>-->
      <!--<router-link to="/">移居 ></router-link>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link to="/"> 海外房产 ></router-link>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link to="/"> 澳大利亚房产 ></router-link>-->
      <!--</li>-->
      <!--<li>-->
      <!--<router-link to="/"> 墨尔本独栋别墅Cloverton</router-link>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>-->
      <crumb class="crumbs" color="white" v-if="show" :title="detail.projectName"></crumb>

      <div class="house-swiper">
        <div class="left" v-if="show">
          <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide v-for="(item,index) in detail.banners" :key="index"
              :style="'background-image:url('+IMG_URL+item.fileUrl+')'"></swiper-slide>
            <!--<swiper-slide class="slide-2"></swiper-slide>-->
            <!--<swiper-slide class="slide-2"></swiper-slide>-->
            <!--<swiper-slide class="slide-2"></swiper-slide>-->
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          </swiper>

          <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide v-for="(item,index) in detail.banners" :key="index"
              :style="'background-image:url('+IMG_URL+item.fileUrl+')'">
              <div style="width: 100%;height: 100%" @click="slide(index)"></div>
            </swiper-slide>
          </swiper>

        </div>

        <div class="right">
          <div class="title">
            <h2>{{detail.projectName}}</h2>
          </div>
          <p class="price">
            投资要求 :<span>{{detail.minPriceAmt}}</span>{{detail.priceUnit}}元起（ {{detail.priceCcy}}）
            人民币:<span>{{detail.rmbconversion.toFixed(2)}}</span>{{detail.priceUnit}}元起
          </p>
          <div class="details">
            <span>移民类型: {{detail.projCategorys[0].name}}</span>
            <span>办理周期: {{detail.projectPeriod+detail.projectPeriodUnit}}</span>
            <!--<span class="earnest">定金: {{detail.depositAmt}}</span>-->
            <!--<span>房产产权: {{detail.projectLineWithBLOBs.housePropertyRight}}</span>-->
            <!--<span>预期回报:{{detail.projectLineWithBLOBs.houseExpectedRecompense}}%</span>-->
            <!--<span>近一年涨幅: {{detail.projectLineWithBLOBs.houseAnnualIncreasePercent}}%</span>-->
            <!--<span>已销售: {{detail.soldQuantity}}{{detail.projectLineWithBLOBs.houseSurplusResourceUnit}}</span>-->
            <!--<span>交房时间: {{detail.projectLineWithBLOBs.houseDeliveryTime}}</span>-->
            <!--<span>剩余: {{detail.projectLineWithBLOBs.houseSurplusResource}}{{detail.projectLineWithBLOBs.houseSurplusResourceUnit}}</span>-->
          </div>

          <p class="location">项目优势:</p>
          <p class="location">1:{{detail.advantage1}}</p>
          <p class="location">2:{{detail.advantage2}}</p>
          <p class="location">3:{{detail.advantage3}}</p>
          <p class="location">4:{{detail.advantage4}}</p>

          <div class="btn-group">
            <button type="button" @click="openDialog()">在线咨询</button>
            <!--<button type="button">立即认购</button>-->
          </div>
        </div>
      </div>



    </div>
    <!--<div class="house-step">-->
    <!--<div><img src="../../../assets/img/step.jpg" alt=""></div>-->
    <!--</div>-->
    <!--<div class="my-option">-->
    <!--<div class="my-option-content">-->
    <!--<div>-->
    <!--<span>办理周期：</span>-->
    <!--<ul>-->
    <!--<li >{{detail.projectPeriod+detail.projectPeriodUnit}}</li>-->
    <!--</ul>-->
    <!--</div>-->

    <!--<div>-->
    <!--<span>移民类型：</span>-->
    <!--<ul>-->
    <!--<li  v-for="(item,index) in detail.projCategorys " :key="index">{{item.name}}</li>-->
    <!--</ul>-->
    <!--</div>-->

    <!--<div>-->
    <!--<span>项目优势1：</span>-->
    <!--<ul>-->
    <!--<li>{{detail.advantage1}}</li>-->
    <!--</ul>-->
    <!--</div>-->

    <!--<div>-->
    <!--<span>项目优势3：</span>-->
    <!--<ul>-->
    <!--<li>{{detail.advantage3}}</li>-->
    <!--</ul>-->
    <!--</div>-->

    <!--<div>-->
    <!--<span>项目优势2：</span>-->
    <!--<ul>-->
    <!--<li >{{detail.advantage2}}</li>-->
    <!--</ul>-->
    <!--</div>-->

    <!--<div>-->
    <!--<span>项目优势4：</span>-->
    <!--<ul>-->
    <!--<li>{{detail.advantage4}}</li>-->
    <!--</ul>-->
    <!--</div>-->

    <!--</div>-->
    <!--</div>-->
    <div class="house-tab">
      <ul class="left">
        <li :class="{'red-arrow':query.redActive4==index}" @click="changeRed('redActive4',index,item.label)"
          v-for="(item,index) in mylist4">{{item.name}}</li>
      </ul>
      <div class="right">

        <icon-box style="float: right"></icon-box>
        <a class="collectbtn" :class="{'disabled':!detail.hasFavorite && detail.hasFavorite!==null}"
          @click="collect($event,detail.id,detail.hasFavorite)">{{(!detail.hasFavorite && detail.hasFavorite!==null)?"取消收藏":"收藏"}}</a>
      </div>
    </div>
    <div class="house-content" v-html="detail.projectLineWithBLOBs[detailTab]">

    </div>
    <div class="house-youlike">
      <h2>猜你喜欢</h2>·
      <div class="house-main">
        <router-link :to="'/house/detail?id='+item.id" class="item" v-if="index<=3 && item.projectType==1" :key="index"
          v-for="(item,index) in detail.guessLikeList">
          <div class="img" :style="'background-image:url('+IMG_URL+item.projectUrl+')'"></div>
          <div class="introduce">{{item.projectName}}</div>
          <div>总价 <h3>{{item.minPriceAmt}}</h3>{{item.priceUnit}}起 {{item.priceCcy}}</div>
        </router-link>
        <router-link :to="'/immigrant/detail?id='+item.id" class="item" v-if="index<=3 && item.projectType==0"
          :key="index" v-for="(item,index) in detail.guessLikeList">
          <div class="img" :style="'background-image:url('+IMG_URL+item.projectUrl+')'"></div>
          <div class="introduce">{{item.projectName}}</div>
          <div>总价 <h3>{{item.minPriceAmt}}</h3>{{item.priceUnit}}起 {{item.priceCcy}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  import iconBox from '@/components/iconBox';
  import {
    setFavProject,
    cancelFavProject
  } from '@/api/user'
  import {
    projectdetails,
    getProjectCondition
  } from '@/api/info';
  import crumb from '@/components/Breadcrumb'
  export default {
    name: 'detail',
    components: {
      iconBox,
      crumb
    },
    data() {
      return {
        detail: {},
        swiperOptionTop: {
          spaceBetween: 10,
          loop: true,
          autoplay: true,
          loopedSlides: 7, //looped slides should be the same
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionThumbs: {
          //slideToClickedSlide: true,
          spaceBetween: 10,
          //centeredSlides: true,
          //slidesPerView: 'auto',
          slidesPerView: 4,
          touchRatio: 0.2,
          //loop: true,
          //loopedSlides: 4,

        },
        show: false,
        mylist4: [{
            name: '项目介绍',
            label: 'projectDecription'
          },
          {
            name: '申请条件',
            label: 'immigrantApplyRequirement'
          },
          {
            name: '办理流程/交易流程',
            label: 'projectProcedure'
          },
          {
            name: '成功案例',
            label: 'projectShowcase'
          },
          // {name:'区域介绍',label:'houseProperty'},
          // {name:'房屋贷款'},
        ],
        mylist5: [],
        mylist6: [],
        query: {
          redActive4: 0,
        },
        detailTab: 'projectDecription',
        showBox: false
      }
    },

    computed: {

    },

    watch: {
      "$route": "getProjectDetails"
    },

    methods: {
      changeRed(obj, i, lab) {
        this.query[obj] = i;
        this.detailTab = lab
      },

      openDialog() {
        if (window.openModel == 'ok') {
          _MEIQIA('showPanel')
        } else {
          this.$message({
            message: '移民专家正在服务中，请稍等或刷新后重试！专家热线：020-87085113，客服：400-8013-932',
            type: 'warning'
          });
        }

      },

      slide(index) {
        this.$refs.swiperTop.swiper.slideTo(index, 500, false)
        this.$refs.swiperThumbs.swiper.slideTo(index, 500, false)
      },

      getProjectDetails() {
        projectdetails(this.$route.query.id).then(res => {

          this.detail = res.body;
          this.swiperOptionTop.loopedSlides = res.body.banners.length;
          this.show = true;
        });
      },

      collect(e, id, c, i) {
        e.preventDefault();
        e.stopPropagation();
        if (c) {
          //收藏
          setFavProject(0, id).then(res => {
            if (res.header.code == "000") {
              this.$message({
                type: "success",
                message: "收藏成功"
              });
              this.detail.hasFavorite = false;
            }
          })
        } else {
          //收藏
          cancelFavProject(id).then(res => {
            if (res.header.code == "000") {
              this.$message({
                type: "success",
                message: "取消收藏成功"
              });
              this.detail.hasFavorite = true;
            }
          })
        }


      },

    },

    mounted() {
      this.getProjectDetails()

    }

  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .house-details {
    width: 100%;
    min-width: 1280px;
    max-width: 1920px;
    /*border:1px solid red;*/
    background: #f5f5f5;

    .house-top {
      padding: 1px;
      /*border:1px solid yellow;*/
      background: #001528;
      height: 623px;

      .crumbs {
        width: 1200px;
        margin: 0 auto;
        margin-top: 15px;

        /deep/ .navlist {
          padding: 0;
        }

      }

      .house-swiper {
        width: 1200px;
        margin: 0 auto;
        margin-top: 15px;
        /*border:1px solid blue;*/
        overflow: hidden;
        background: rgba(0, 0, 0, 0);

        .left {
          width: 674px;
          height: 549px;
          /*border:1px solid green;*/
          float: left;

          .gallery-top {
            /*border:1px solid red;*/
            height: 445px;
            width: 100%;
            margin-bottom: 20px;

            .swiper-slide {

              background-position: center;
              background-size: 100% 100%;

            }

          }

          .gallery-thumbs {
            height: 85px;
            width: 100%;

            /*border:1px solid red;*/
            .swiper-slide {
              background-size: cover;
              background-position: center;

              &.slide-1 {
                width: 674px;
                background: url('../../../assets/img/house.jpg') no-repeat;
                background-size: 100% 100%;
              }

              &.slide-2 {
                width: 674px;
                background: url('../../../assets/img/1.jpg') no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }

        .right {
          border: 1px solid pink;
          width: 510px;
          height: 549px;
          float: right;
          background: #fff;

          .title {
            border-top: 5px solid #ff8584;
            border-bottom: 1px solid #ca0000;
            padding-left: 30px;
            height: 96px;
          }

          .price {
            /*border:1px solid red;*/
            height: 80px;
            font-size: 16px;
            text-align: left;
            line-height: 80px;
            width: 90%;
            margin: 0 auto;

            span {
              display: inline-block;

              &:first-child {
                font-size: 26px;
                font-weight: bolder;
                margin: 0 3px;
                color: #ff8584;
              }
            }
          }

          .details {
            /*border:1px solid blue;*/

            width: 100%;

            justify-content: space-around;
            padding: 0 25px;

            span {
              display: inline-block;
              /*border:1px solid red;*/
              width: 200px;

              &:nth-of-type(n+3) {
                margin-top: 20px;
              }
            }



            .earnest {
              color: #ca0000;
              font-size: 18px;
            }


          }

          .location {
            padding: 0 25px;
            color: #666;
            line-height: 1.2;
          }

          .btn-group {
            text-align: center;
            /*border:1px solid red;*/
            margin-top: 40px;

            button {
              background: #ca0000;
              width: 150px;
              height: 40px;
              color: #fff;
              border: 0;
              outline: 0;
              border-radius: 15px;
              font-size: 24px;
              font-weight: bolder;
              margin-right: 20px;
            }
          }
        }
      }
    }

    .house-step {
      background: #fff;
      height: 100px;
      box-shadow: 0px 1px 3px #666;

      >div {
        width: 1200px;
        margin: 0 auto;
      }
    }

    .my-option {
      width: 1200px;
      height: 140px;
      box-shadow: 0px 1px 3px #666;
      margin: 0 auto;
      margin-top: 20px;
      background: #fff;
      box-sizing: border-box;
      padding-top: 10px;

      /*border:1px solid red;*/
      &-content {
        width: 90%;
        margin: 0 auto;
        /*border:1px solid red;*/
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        div {
          padding: 0;
          display: flex;
          align-items: center;
          width: 50%;
          height: 40px;

          &:nth-child(1),
          &:nth-child(2) {
            letter-spacing: 2px;
          }

          /*border:1px solid red;*/
          ul {
            display: inline-block;
            padding: 0;
            margin: 0;
            overflow: hidden;

            li {
              /*border:1px solid red;*/

              float: left;
              margin-right: 10px;
              padding: 3px 10px;
              cursor: pointer;
              font-size: 13px;
            }
          }
        }
      }
    }

    .house-tab {
      height: 60px;
      box-shadow: 0px 1px 3px #666;
      background: #fff;
      width: 1200px;
      margin: 0 auto;
      margin-top: 30px;
      margin-bottom: 20px;

      ul {
        margin: 0;
        padding: 0;
        padding-left: 5%;
        /*border:1px solid red;*/
        /*overflow: hidden;*/
        display: inline-block;
        line-height: 60px;

        li {
          float: left;
          margin-right: 30px;
          cursor: pointer;
        }
      }

      .right {
        float: right;
        /*border:1px solid red;*/
        height: 100%;
        position: relative;
        padding-right: 2%;

        .collectbtn {
          width: 100px;
          height: 30px;
          text-align: center;
          display: block;
          background-color: #f23644;
          line-height: 30px;
          color: white;
          border-radius: 3px;
          margin-top: 17px;
          cursor: pointer;
          float: right;

          &.disabled {
            background-color: #999;
          }
        }


      }

    }

    .house-content {
      width: 1200px;
      /*min-height:800px;*/
      padding: 10px 30px;
      background: #fff;
      /*border:1px solid red;*/
      margin: 0 auto;
      box-shadow: 0px 1px 3px #666;

      /deep/ img {
        display: block;
        margin: 0 auto;
      }
    }

    .house-youlike {
      width: 1200px;
      height: 357px;
      margin: 35px auto;

      /*border:1px solid red;*/
      /*padding-bottom: 5px;*/
      h2 {
        font-weight: normal;
        padding-left: 3.5%;
        margin: 0;
        /*border:1px solid red;*/
      }

      .house-main {
        width: 100%;
        height: 306px;
        background: #fff;
        margin-top: 15px;
        /*display: flex;*/
        /*justify-content: space-around;*/
        /*align-items: center;*/
        box-shadow: 0px 1px 3px #666;

        .item {
          /*border:1px solid red;*/
          float: left;
          width: 264px;
          height: 257px;
          color: #9b969a;
          box-shadow: 0px 0px 2px #666;
          margin-right: 20px;
          margin-top: 24px;

          &:first-child {
            margin-left: 40px;
          }

          &:last-child {
            margin-left: 0;
          }

          .img {
            width: 261px;
            height: 175px;
            background: url('../../../assets/img/houseItem.jpg') no-repeat;
            background-size: cover;
          }

          .introduce {
            margin-top: 10px;
            padding-left: 5%;
          }

          & div:last-child {
            font-size: 16px;
            padding-left: 5%;
            margin-top: 15px;

            h3 {
              display: inline-block;
              font-size: 24px;
              margin: 0;
              color: #ff3335;
              font-weight: normal;
            }
          }
        }
      }
    }

    /*active*/
    .red {
      padding: 5px 10px;
      background: #ff3335;
      color: #fff;
      border-radius: 5px;
    }

    .red-arrow {
      padding: 0px 10px;
      background: #ff3335;
      font-weight: bolder;
      color: #fff;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        z-index: 100;
        width: 100%;
        height: 10px;
        bottom: -13px;
        left: 0;
        /*border:1px solid blue;*/
        background: url("../../../assets/img/trigon.png") no-repeat;
        background-position: center;

      }
    }

  }

</style>
