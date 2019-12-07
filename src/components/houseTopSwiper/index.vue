<template>
  <div class="main">
    <my-select class="slect-box"></my-select>

    <swipe  class="my-swipe" :options="swiperOption" v-if="$route.path.indexOf('/house')!=-1">
      <swipe-item class="item" :key="index"  :style="{'background-image':'url('+IMG_URL+item.url+')'}"  v-for="(item,index) in bannerData1 " >
        <router-link v-if="item.typeId==1" :to="{path:'/house/detail',query:{id:item.id}}" ></router-link>
        <router-link v-if="item.typeId==0" :to="{path:'/immigrant/detail',query:{id:item.id}}" ></router-link>
        <router-link v-if="item.typeId==3" :to="{path:'/activity/detail',query:{id:item.id}}" ></router-link>
        <!--<div class="weather" >-->
          <!--<h2>上海</h2>-->
          <!--<div>-->
            <!--<img src="../../assets/img/sunny.png" alt="">-->
            <!--<p><span>19℃ </span>晴</p>-->
          <!--</div>-->
        <!--</div>-->
      </swipe-item>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swipe>

    <swipe  class="my-swipe" :options="swiperOption"  v-if="$route.path.indexOf('/immigrant')!=-1">
      <swipe-item class="item2" :key="index"  :style="{'background-image':'url('+IMG_URL+item.url+')'}"  v-for="(item,index) in bannerData2 ">
        <router-link v-if="item.typeId==1" :to="{path:'/house/detail',query:{id:item.id}}" ></router-link>
        <router-link v-if="item.typeId==0" :to="{path:'/immigrant/detail',query:{id:item.id}}" ></router-link>
        <router-link v-if="item.typeId==3" :to="{path:'/activity/detail',query:{id:item.id}}" ></router-link>
        <!--<div class="weather" >-->
        <!--<h2>上海</h2>-->
        <!--<div>-->
        <!--<img src="../../assets/img/sunny.png" alt="">-->
        <!--<p><span>19℃ </span>晴</p>-->
        <!--</div>-->
        <!--</div>-->
      </swipe-item>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swipe>


  </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import mySelect from './components/selectBox'
    import {banner} from "@/api/banner";

    export default {
        name: "house-top-swiper",
        components:{
          'swipe': swiper,
          'swipe-item': swiperSlide,
          'mySelect':mySelect
        },
        data() {
          return {
            swiperOption:{
              autoplay:true,
              pagination: {
                el: '.swiper-pagination'
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },

            },
            bannerData1:[{id:'', typeId:'',url:''}],
            bannerData2:[{id:'', typeId:'',url:''}],
          }
        },
        methods:{
          getBankData(){
            if(this.$route.path.indexOf('/house')!=-1){
              //海外房产
              banner(6).then(res=>{
                //console.log(res)
                this.bannerData1=res.body.map(item=>{
                  return{
                    id:item.link.length>0?(item.link.split("&")[0]).split("=")[1]:'',
                    typeId:item.link.length>0?(item.link.split("&")[1]).split("=")[1]:'',
                    url:item.fileUrl,
                  }
                });
              })
            }else{
              // 移民项目
              banner(7).then(res=>{
                this.bannerData2=res.body.map(item=>{
                  return{
                    id:item.link.length>0?(item.link.split("&")[0]).split("=")[1]:'',
                    typeId:item.link.length>0?(item.link.split("&")[1]).split("=")[1]:'',
                    url:item.fileUrl,
                  }
                });
              })
            }
          },
        },
      mounted(){
        this.getBankData()
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main{
    /*border:1px solid green;*/
    width: 100%;
    min-width: 1280px;
    max-width: 1920px;
    height: 218px;
    position: relative;
    .my-swipe{
      /*border:1px solid blue;*/
      /*position:absolute;*/
      a{
        width: 100%;
        height: 100%;
        display: block;
      }

      .item{
        background-image: url('https://ucom-qiniu.uoolu.com/weather_1_52.jpg?111');
        background-size: 100% 218px;
        background-repeat: no-repeat;
        width: 100%;
        height: 218px;
      }

      .item2{
        background-image: url('https://ucom-qiniu.uoolu.com/weather_1_101.jpg?111');
        background-size: 100% 218px;
        background-repeat: no-repeat;
        width: 100%;
        height: 218px;
      }

      .swiper-pagination{
        /*border:1px solid red;*/
        position:absolute;
        text-align: right;
        padding-right: 20%;
        padding-bottom: 1%;

      }
    }
    .slect-box{
      position:absolute;
      z-index: 2;
      left:0px;
      right:0px ;
      margin:auto;
    }

    .weather{
      width:1200px;
      /*border:1px solid #fff;*/
      color:#fff;
      text-align: right;
      overflow: hidden;
      margin: 0 auto;
      /*padding-right: 18%;*/
      margin-top: 2%;
      h2{
        /*border:1px solid red;*/
        padding-right: 6%;
      }
      >div{
        /*border:1px solid blue;*/
        width:10%;
        display: flex;
        align-items: center;
        float: right;
        img{
          width:45px;
          height:45px;
        }
        p{
          /*border:1px solid red;*/
          width:50px;
          margin-left: 15px;
          text-align: left;
          font-size: 14px;
          span{
            display: inline-block;
            font-size: 20px;
            font-weight: bolder;
            margin-bottom: 5px;
          }
        }
      }
    }

  }
</style>
