<template>
    <div class="activity">
      <swipe class="my-swipe" :options="swiperOption">
        <swipe-item class="item2" :key="index"  :style="{'background-image':'url('+IMG_URL+item.url+')'}"  v-for="(item,index) in bannerData ">
          <router-link v-if="item.typeId==1" :to="{path:'/house/detail',query:{id:item.id}}" ></router-link>
          <router-link v-if="item.typeId==0" :to="{path:'/immigrant/detail',query:{id:item.id}}" ></router-link>
          <router-link v-if="item.typeId==3" :to="{path:'/activity/detail',query:{id:item.id}}" ></router-link>
        </swipe-item>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swipe>

      <div class="main_box">

        <div class="navbox item">
          <a v-for="(item,index) in navData" :key="index" :class="{'active':navActive==index}" @click="stateChange(index,item.val)"><span>{{item.label}}</span></a>

        </div>

        <div class="filterbox item">
              <div class="city">
                  <span>城市</span>
                  <a class="filteritem"  @click="activeCity=0" :class="{'active':activeCity==0}">不限</a>
                  <a class="filteritem" v-for="(item,index) in citys"  :class="{'active':activeCity==index+1}" @click="activeCity=index+1"  :key="index+1">{{item.district}}</a>
              </div>

              <!--<div class="date">-->
                  <!--<span>时间</span>-->
                  <!--<a class="filteritem"  @click="activeDate=0" :class="{'active':activeDate==0}">不限</a>-->
                  <!--<a class="filteritem" v-for="(item,index) in dates"  :class="{'active':activeDate==index+1}" @click="activeDate=index+1"  :key="index+1">{{item.label}}</a>-->
              <!--</div>-->
        </div>

        <div class="content_box item clearfloat">

          <div class="left">

            <ul class="salelist">
              <li class="saleitem" v-for="(item,index) in list" :key="index">
                <div class="imgbox">
                  <router-link  :to="'/activity/detail?id='+item.id"><img :src="IMG_URL+item.activityImage" alt=""></router-link>
                </div>
                <div class="contentbox">
                  <div><router-link :to="'/activity/detail?id='+item.id" class="title"><span class="label">{{item.cityName}}站</span>{{item.activityName}}</router-link></div>
                  <div class="detailbox">
                    <div class="item">活动时间:{{item.activityTime}}</div>

                    <div class="item dateitem">报名截至时间: {{item.applyDeadline}}</div>

                    <div class="item">活动地址:{{item.activityPlace}}</div>
                  </div>
                  <div class="connect_box"  v-if="navStatus=='APPLYING'">
                    <router-link  :to="'/activity/detail?id='+item.id" class="connect_btn" :class="{'redBtn':navStatus=='APPLYING'}">报名中</router-link>
                  </div>
                  <div class="connect_box" v-else>
                    <a class="connect_btn">已关闭</a>
                  </div>
                </div>
              </li>
            </ul>

            <pagination v-model="pageInfo.pno" :changeHandle="pageChangeHandle" :maxPage="pageInfo.maxPage"></pagination>


          </div>
          <hot-house></hot-house>
        </div>

      </div>

    </div>


</template>

<script>
  import hotHouse from '@/components/newsHotHouse'
  import pagination from '@/components/pagination/small'
  import {getHotCity} from "@/api/getCity";
  import {activityList} from '@/api/activity';
  import {swiper, swiperSlide } from 'vue-awesome-swiper';
  import {banner} from "@/api/banner";


  export default {
        name: 'activity',

        computed: {
            navStatus(){return this.navData[this.navActive].val},
            cityID(){
                return this.activeCity==0?[]:[this.citys[this.activeCity-1].id];
            }
        },
        components: {
          hotHouse,
          pagination,
          'swipe': swiper,
          'swipe-item': swiperSlide,
        },
        methods: {



          pageChangeHandle(pno){
            this.pageInfo.pno=pno;
            this.getList();
          },

          stateChange(i){
            this.navActive=i;
            this.pageInfo.pno=1;
            this.getList();
          },

          getList(){
              let config = this.getConfig();

              activityList(config).then(res=>{
                    this.list=res.body.records.map(item=>{
                      return item.entity;
                    });
                    this.pageInfo.maxPage=res.body.totalPages || 1;
              })
          },
          getConfig(){
              let config = {
                "sort":"activityTime",
                "direction":"DESC",
                "cityIds":[],
                "projectTypeIds":[],
                "nationCodes":[],
                "tagIds":[],
                "page":1,
                "status":'APPLYING',
                "pageSize":10
              }
              config.status=this.navStatus;
              config.cityIds=this.cityID;
              config.page=this.pageInfo.pno;
              return config;

          }


        },

        mounted(){

          getHotCity().then(res=>{
            this.citys=res.body
            this.getList();
          });

          banner(1).then(res=>{
            //console.log(res)
            // console.log(res.body[0].link.split("&")[0].split("=")[1]);
            this.bannerData=res.body.map(item=>{
              return{
                id:item.link.split("&")[0].split("=")[1],
                url:item.fileUrl,
                typeId:item.link.length>0?(item.link.split("&")[1]).split("=")[1]:'',
              }
            });
          })

        },

        data(){

            return {
              pageInfo:{
                pno:1,
                maxPage:1,
                size:10
              },

              bannerData:[{id:'', typeId:'',url:''}],

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

                navActive:0,
                activeCity:0,
                activeDate:0,
                citys:[
                  { val:0,label:"深圳" },
                  { val:1,label:"上海" },
                  { val:2,label:"北京" },
                  { val:3,label:"广州" },
                  { val:4,label:"杭州" },
                  { val:5,label:"南京" },
                  { val:6,label:"苏州" },
                  { val:7,label:"无锡" },
                  { val:8,label:"宁波" },
                  { val:9,label:"昆明" },
                  { val:10,label:"长沙" },
                  { val:11,label:"西安" },
                  { val:12,label:"成都" },
                  { val:13,label:"青岛" },
                  { val:14,label:"天津" },
                  { val:15,label:"合肥" }
                ],
                // dates:[
                //   { val:0,label:"2018年" },
                //   { val:1,label:"2017年" },
                //   { val:2,label:"2016年" },
                //   { val:3,label:"2015年" },
                //   { val:4,label:"2014年" },
                //   { val:5,label:"2013年" },
                //   { val:6,label:"2012年" },
                //   { val:7,label:"2011年" },
                // ],
                list:[],

                navData:[
                  {
                    val:'FINISHED',
                    label:"展会回顾"
                  },
                  {
                      val:"APPLYING",
                      label:"最新展会"
                  }
                  
                ],


            }
        },
        watch:{
            'cityID':function () {
              this.pageInfo.pno=1;
              this.getList();
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .activity{
      width: 100%;
      max-width: 1920px;
      min-width: 1280px;
      background-color: #f5f5f5;
      .topbg{
          img{
            max-width: 100%;
            min-width: 1280px;
            display: block;
          }

      }

      .my-swipe{
        height:43vh;
        width:100%;
        .item2{
          background-size:100% 100%;
        }
        a{
          display: block;
          width:100%;
          height:100%;
        }

      }

      .main_box{
        width: 1200px;
        margin: 0 auto;
        padding: 30px 0;
        .item{
          margin-top: 20px;

        }

        .filterbox{
          background: white;
          padding: 10px 15px 40px 15px;
          .filteritem{
            margin-left:20px;
            &.active{
              color:#f23742 ;
            }
          }

          .city{
              padding: 10px 0;
              border-bottom: 1px solid #ddd;
          }
          .date{
            padding: 15px 0;
          }
        }

        .navbox{
          height: 50px;
          background: white;
          a{
            display: inline-block;
            height: 100%;
            text-align: center;
            padding: 15px;
            color: #333;
            &.active{
              background-color: #f23742;
              color: white;
              position: relative;

              &:after{
                position: absolute;
                content: "";
                display: block;
                width: 15px;
                height: 15px;
                background-color: #f23742;
                left: 50%;
                bottom: -7px;
                transform: translateX(-50%) rotate(45deg);
              }
            }

          }

        }

        .content_box{
          .left{
            float: left;
            width: 880px;
            .salelist{
              margin: 0 auto;
              padding: 0;

              list-style: none;
              .saleitem{
                margin: 0 auto;
                padding: 10px;
                list-style: none;
                position: relative;
                background-color: white;
                margin-bottom: 20px;

                .imgbox{
                  display: inline-block;
                  vertical-align: top;
                  margin-right: 15px;
                  height: 160px;
                  img{
                    height: 160px;
                    width: 220px;
                  }
                }
                .contentbox{
                  display: inline-block;
                  vertical-align: top;
                  .title{
                      .label{
                        background-color: #3288ef;
                        padding: 3px 15px;
                        border-radius: 5px;
                        color: white;
                        font-size: 14px;
                        margin-right: 8px;
                      }
                  }
                  .detailbox{
                    margin-left: 15px;
                    margin-top: 35px;
                    .item{
                      margin-top: 26px;
                      &.dateitem{
                        color: #cd4140;
                      }

                    }
                  }

                  .connect_box{
                    position: absolute;
                    top:60px;
                    right: 50px;

                    .connect_btn{
                      width: 140px;
                      height: 55px;
                      display: block;
                      line-height: 55px;
                      text-align: center;
                      border-radius: 5px;
                      background-color: #cccccc;
                      font-size: 23px;
                      color: #ebebeb;
                      &.active{
                        color: red;
                      }

                    }

                  }

                }


              }
            }


          }

          .hotHouse{
            float: right;
          }
        }


      }
      .redBtn{
        background-color:red !important;
      }
    }

</style>
