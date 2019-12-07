<template>
    <div class="topSwiper">
      <div class="mask"></div>


      <!--<swiper class="my-swipe" :options="swiperOption">-->
        <!--<swiper-slide v-for="(item,index) in bannerData" :key="index" :style="{'background-image':'url('+IMG_URL+item.url+')'}" class="slide1 item">-->
          <!--<router-link v-if="item.typeId==1" :to="{path:'/house/detail',query:{id:item.id}}" ></router-link>-->
          <!--<router-link v-if="item.typeId==0" :to="{path:'/immigrant/detail',query:{id:item.id}}" ></router-link>-->
          <!--<router-link v-if="item.typeId==3" :to="{path:'/activity/detail',query:{id:item.id}}" ></router-link>-->
          <!--&lt;!&ndash;<a href="javascript:;" @click="jump(item.id,item)" ></a>&ndash;&gt;-->
        <!--</swiper-slide>-->
        <!--&lt;!&ndash;<swipe-item class="slide2 item item2">&ndash;&gt;-->
          <!--&lt;!&ndash;<router-link to="/user"></router-link>&ndash;&gt;-->
        <!--&lt;!&ndash;</swipe-item>&ndash;&gt;-->

        <!--<div class="swiper-pagination" slot="pagination"></div>-->

        <!--<div class="swiper-button-next swiper_next" slot="button-next"></div>-->
        <!--<div class="swiper-button-prev swiper_prev" slot="button-prev"></div>-->
      <!--</swiper>-->

      <div class="block ">
        <el-carousel height="500px">
          <el-carousel-item v-for="(item,index) in bannerData" class="item" :style="{'background-image':'url('+IMG_URL+item.url+')'}" :key="index">
            <router-link v-if="item.typeId==1" :to="{path:'/house/detail',query:{id:item.id}}" ></router-link>
            <router-link v-if="item.typeId==0" :to="{path:'/immigrant/detail',query:{id:item.id}}" ></router-link>
            <router-link v-if="item.typeId==3" :to="{path:'/activity/detail',query:{id:item.id}}" ></router-link>
          </el-carousel-item>
        </el-carousel>
      </div>



      <coutry-box style="z-index: 3"></coutry-box>


    </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import coutryBox from './components/coutryBox';
  import {banner} from '@/api/banner';

    export default {
        name: 'temp',
        components:{
          'swipe': swiper,
          'swipe-item': swiperSlide,
          'coutry-box':coutryBox
        },
        data() {
            return {
              swiperOption:{
                slidesPerView: 1,
                spaceBetween: 30,
                  autoplay:true,
                  loop: true,
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                  },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }
              },
              bannerData:[{id:'', typeId:'',url:''}]
            }
        },
        methods: {
        },
        mounted(){
          banner(0).then(res=>{
              this.bannerData=res.body.map(item=>{
                return{
                  id:(item.link.split("&")[0]).split("=")[1],
                  typeId:(item.link.split("&")[1]).split("=")[1],
                  url:item.fileUrl,
                }
              });
          })
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .topSwiper{
      /*border:1px solid red;*/
      width: 100%;
      height: 500px;
      position: relative;


      .mask{
        /*border:1px solid red;*/
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 77px;
        z-index: 3;
        background: linear-gradient(rgba(0,0,0,1), rgba(255,255,255,0) 100%);
      }

      .item{
        /*border:1px solid red;*/
        /*background-image: url("../../assets/img/banner1.jpg");*/
        /*background-image: url("https://main-uoolu.uoolu.com/master/20181001193654721935.jpg?imageView2/1/w/1920/h/635/format/jpg/q/90");*/
        background-size: 100% 500px;
        background-repeat: no-repeat;
        width: 100%;
        height: 500px;
        a{
          width: 100%;
          height: 100%;
          display: block;
        }
      }



    }
</style>
