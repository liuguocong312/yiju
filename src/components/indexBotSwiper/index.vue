<template>
    <div class="container">
        <div class="body">
            <div class="title">
              <img src="../../assets/img/assiant.png" width="25" alt="">
              <span>成功案例</span>
            </div>
            <swipe class="my-swipe" ref="rbody" :options="swiperOption">
              <swipe-item class="slide1 item" v-for="(item,index) in swiperList"  :key="index">
                <router-link :to="{path:'/news/hot7/detail',query:{id:item.entity.id,tagid:7}}">
                  <div class="top" :style="{'height':remboxheight+'px'}"><img  :src="IMG_URL+item.entity.caseUrl" alt=""></div>
                  <div class="bottom">
                        <div class="avatar"><img :src="IMG_URL+item.entity.userImageUrl" alt=""></div>
                        <div class="title_sub" v-if="item.entity.nickName.length<10">来自于：{{item.entity.nickName}}</div>
                        <div class="title_sub" v-else>来自于：{{item.entity.nickName.substring(0,10)}}...</div>
                        <!--<div class="titles">{{item.entity.userGrade}}</div>-->

                        <div class="textbody" >

                          {{item.entity.caseIntro}}

                          <!--有路是我第一个接触并且了解较深入的海外房产APP  第一次购买海外房产的时候，我在Appstore下载了4-5个海外房产APP ，当逐一打开app在看到有路APP的海外房产时，“这就是我想要的app”内心欣喜的想到 ，水天一色的开屏广告凸显了有路HOUSE质优价美；频道栏目布局清晰明确；头条栏目内及时突出当下热销的房产；推荐房产栏目较大型电商平台的猜你喜欢栏目也不遑多让；托管模块以及我的模块用购房进度条及时告诉用户购买房屋进度，让用户有一种京东、淘宝购物次日达的喜悦感…….-->

                        </div>
                        <div class="card_footer">
                          <img src="../../assets/img/recommend.png" width="20" alt="">
                          <span class="address">购买项目:{{item.entity.nationName}}</span>
                        </div>
                  </div>
                </router-link>
              </swipe-item>

              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-next swiper_next" slot="button-next"></div>
              <div class="swiper-button-prev swiper_prev" slot="button-prev"></div>
            </swipe>



        </div>


    </div>
</template>

<script>

  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { botSwiper } from '@/api/banner';
    export default {
        name: 'temp',
        components:{
          'swipe': swiper,
          'swipe-item': swiperSlide,
        },
        data() {
            return {

              swiperOption:{
                slidesPerView: 4,
                spaceBetween: 30,
//                slidesPerGroup: 1,
//                loop: true,
//                loopFillGroupWithBlank: true,
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }
              },

              swiperList:'',
              remboxheight:169,
            }
        },
        methods: {
          resizebox(){

            if(this.$refs.rbody)
              this.remboxheight=((this.$refs.rbody.$el.offsetWidth-90)/4)*0.64;
          },
        },


        beforeDestroy(){
          window.removeEventListener('resize',this.resizebox)
        },


        mounted(){

          botSwiper(1).then(res=>{
            this.swiperList=res.body.records;
            // console.log(res)
            this.resizebox();
            window.addEventListener('resize',this.resizebox);
          })

        },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .container{
      width: 100%;
      max-width: 1920px;
      min-width: 1280px;
      background:url("../../assets/img/swiperbg.png") no-repeat 100%;

      .body{
        width: 85%;
        margin: 0 auto;
        .title{
            padding-top: 25px;
            padding-bottom: 35px;
            span{
              vertical-align: middle;
              color: white;
              font-size: 18px;
            }

            img{
              vertical-align: middle;
              border-radius: 50px;
              border: 1px solid #fff;
              padding: 5px;
            }
        }


          .swiper-pagination{
            bottom: 20px;
          }

          .swiper-container{
            padding: 0 30px;
            padding-bottom: 60px;
          }

          .swiper-button-next{
              right: 0;
          }
          .swiper-button-prev{
            left: 0;
          }


        .item{
          font-size: 18px;
          background: #fff;
          position: relative;



          .top{
            width: 100%;
            img{
              width: 100%;
              max-width: 100%;
              height:100%

            }
          }

          .bottom{
            position: relative;
            padding: 20px;
            padding-top: 0;

            .avatar{
              width: 20%;
              min-width: 60px;
              position: absolute;
              border-radius: 50%;
              border: 2px solid white;
              transform: translateY(-30%);
              left: 5%;
              img{
                max-width: 100%;
                border-radius: 50%;
                display: block;

              }
            }
            .title_sub{
              font-size: 14px;
              color: #999;
              text-indent: 30%;
              padding: 2px 0  ;
            }
            .titles{
              font-size: 16px;
              font-weight: bold;
              text-indent: 30%;
              padding: 7px 0;
            }
            .textbody{
              font-size: 12px;
              color: #333;
              margin-bottom: 10px;
              text-indent: 30%;
              height: 120px;
              overflow-y: hidden;
              line-height: 20px;
              margin-top: 20px;
            }
            .card_footer{
              white-space:nowrap;
              .address{
                vertical-align: middle;
                font-size: 14px;
                white-space: nowrap;

              }

              img{
                vertical-align: middle;
              }
            }
          }
        }
      }

    }
</style>
