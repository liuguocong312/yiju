<template>
    <div class="coutry_box">
        <ul class="coutry_list">

          <li class="litem"  @mouseenter="fetch('0')">
            <img class="timg" src="../../../assets/img/worldwide.e5f4850.png" width="25" height="25" alt="">
            <span >全球</span>
            <img src="../../../assets/img/right.png" width="15" height="15" alt="">

            <div class="fix_slist">
              <div class="slist">
                <div class="side_item clearfloat">
                  <div class="country_list">
                    <div class="country_list_title">
                      <span :class="{'white':querty.continent==index}" :key="index" @mouseenter="getCountrys(index,'continent',item.val)" v-for="(item,index) in continentList">{{item.name}}</span>
                    </div>

                    <div class="country_list_box">
                      <router-link  class="country_item" :to="'house?nation='+item.id" v-for="(item,index) in Countrys"  :key="index">
                        <img class="hot-area-img" :src="'https://api2.migrantju.com/images/icons/'+item.nationCode+'.png'" alt="">
                        <span class="hot-area-title">{{item.name}}</span>
                      </router-link>
                    </div>
                  </div>
                  <!--<div class="price_list">-->

                    <!--<div class="price_list_title">-->
                      <!--房产总价（￥CNY）-->
                    <!--</div>-->

                    <!--<div class="price_items">-->
                      <!--<router-link class="price" to="/">50万以下</router-link>-->
                      <!--<router-link class="price" to="/">50万-100万</router-link>-->
                      <!--<router-link class="price" to="/">100万-200万</router-link>-->
                      <!--<router-link class="price" to="/">200万-300万</router-link>-->
                      <!--<router-link class="price" to="/">300万-500万</router-link>-->
                      <!--<router-link class="price" to="/">500万-700万</router-link>-->
                      <!--<router-link class="price" to="/">700万-1000万</router-link>-->
                      <!--<router-link class="price" to="/">1000万以上</router-link>-->
                    <!--</div>-->

                  <!--</div>-->
                </div>


              </div>
            </div>
          </li>

          <li  class="litem" v-for="(data,index) in nationList" v-if="index<=6" :key="index" @mouseenter="_getCity(data.id)">
            <img class="timg" :src="'https://api2.migrantju.com/images/icons/'+data.nationCode+'.png'"  width="40" height="25" alt="">
            <span>{{data.name}}</span>
            <img src="../../../assets/img/right.png" width="15" height="15" alt="">

            <div class="fix_slist">
              <div class="slist">
                <div class="side_item clearfloat">
                  <div class="country_list">
                    <div class="country_list_title">
                      <span style="color:#fff;font-weight: bolder">热门国家/地区</span>
                    </div>

                    <div class="country_list_box">
                      <router-link  class="country_item" :to="'house?nation='+data.id+'&'+'city='+item.id" :key="index"  v-for="(item,index) in citysList">
                        <img class="hot-area-img" :src="'https://api2.migrantju.com/images/icons/'+item.nationCode+'.png'" alt="">
                        <span class="hot-area-title">{{item.name}}</span>
                      </router-link>
                    </div>
                  </div>
                  <!--<div class="price_list">-->

                  <!--<div class="price_list_title">-->
                  <!--房产总价（￥CNY）-->
                  <!--</div>-->

                  <!--<div class="price_items">-->
                  <!--<router-link class="price" to="/">50万以下</router-link>-->
                  <!--<router-link class="price" to="/">50万-100万</router-link>-->
                  <!--<router-link class="price" to="/">100万-200万</router-link>-->
                  <!--<router-link class="price" to="/">200万-300万</router-link>-->
                  <!--<router-link class="price" to="/">300万-500万</router-link>-->
                  <!--<router-link class="price" to="/">500万-700万</router-link>-->
                  <!--<router-link class="price" to="/">700万-1000万</router-link>-->
                  <!--<router-link class="price" to="/">1000万以上</router-link>-->
                  <!--</div>-->

                  <!--</div>-->
                </div>


              </div>
            </div>


          </li>
          <!--<li class="litem">-->
            <!--<img class="timg" src="../../../assets/img/20170122112717139831.jpg" width="40" height="25" alt="">-->
            <!--<span>泰国</span>-->
            <!--<img src="../../../assets/img/right.png" width="15" height="15" alt="">-->
          <!--</li>-->
          <!--<li class="litem">-->
            <!--<img class="timg" src="../../../assets/img/20170210155925854456.jpg" width="40" height="25" alt="">-->
            <!--<span>日本</span>-->
            <!--<img src="../../../assets/img/right.png" width="15" height="15" alt="">-->
          <!--</li>-->
          <!--<li class="litem">-->
            <!--<img class="timg" src="../../../assets/img/20170704111405655094.jpg" width="40" height="25" alt="">-->
            <!--<span>越南</span>-->
            <!--<img src="../../../assets/img/right.png" width="15" height="15" alt="">-->
          <!--</li>-->
          <!--<li class="litem">-->
            <!--<img class="timg" src="../../../assets/img/feilvbin.jpg" width="40" height="25" alt="">-->
            <!--<span>菲律宾</span>-->
            <!--<img src="../../../assets/img/right.png" width="15" height="15" alt="">-->
          <!--</li>-->
          <!--<li class="litem">-->
            <!--<img class="timg" src="../../../assets/img/adly.jpg" width="40" height="25" alt="">-->
            <!--<span>澳大利亚</span>-->
            <!--<img src="../../../assets/img/right.png" width="15" height="15" alt="">-->
          <!--</li>-->
          <!--<li class="litem">-->
            <!--<img class="timg" src="../../../assets/img/20170207161008186065.jpg" width="40" height="25" alt="">-->
            <!--<span>英国</span>-->
            <!--<img src="../../../assets/img/right.png" width="15" height="15" alt="">-->
          <!--</li>-->



        </ul>



    </div>
</template>

<script>
  import {getCountry,nationList,getCitys} from "@/api/coutryBox";

  export default {
        name: 'coutryBox',
        data() {
            return {
              continentList:[
                {name:'亚洲',val:0},
                {name:'欧洲',val:1},
                {name:'北美洲',val:2},
                {name:'大洋洲',val:3},
                {name:'非洲',val:4},
              ],
              querty:{
                continent:0,
              },
              //全球的国家
              Countrys:[],
              //国家的列表
              nationList:[],
              //获取城市
              citysList:[],
            }
        },
        methods: {
          fetch(id){
            getCountry(id).then(res=>{
              this.Countrys=res.body
            })
          },

          getCountrys(i,item,id){
            this.querty[item]=i;
            this.fetch(id)
          },

          _getCity(id){
            // console.log(id);
            getCitys(id).then(res=>{
              this.citysList=res.body;
            })

          },
        },

        mounted(){
          nationList().then(res=>{
            // console.log(res);
            this.nationList=res.body
          })
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .coutry_box{
    width: 252px;
    height: 372px;
    padding: 8px;
    background-color: rgba(0,0,0,.8);
    top: 100px;
    position: absolute;
    border-radius: 8px;
    left:7.5%;
    .coutry_list{
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
      position: relative;

      li:nth-of-type(1) span{
        left: 15px;

      }
      li.litem{
        list-style: none;
        margin: 0;
        padding: 0 10px;
        height: 45px;
        line-height: 45px;
        color: white;

        .fix_slist{
          display: none;
          position: absolute;
          top: -8px;
          left: 243px;
          line-height: 1.15;
          .slist{
            margin-left: 23px;
            background-color: rgba(0,0,0,.8);
            border-radius: 8px;
            padding: 25px;
            height: 372px;

            .side_item{
              width:523px;
              /*border:1px solid red;*/
              .country_list{
                float: left;
                /*border:1px solid yellow;*/
                width:100%;
                &_title{
                  width: 100%;
                  /*border:1px solid blue;*/
                  font-size: 18px;
                  color: #f9f9f9;
                  padding-bottom: 12px;
                  box-shadow: 0 1px 0 0 hsla(0,0%,100%,.2);
                  span{
                    display: inline-block;
                    color: #666;
                    cursor: pointer;
                    margin-right: 10%;
                    /*border:1px solid red;*/
                    /*height:100px;*/
                  }
                }

                &_box{
                  /*border:1px solid red;*/
                  width: 100%;
                  margin-top: 27px;

                  .country_item{
                    display: inline-block;
                    width: 100px;
                    height: 60px;
                    border-radius: 3px;
                    overflow: hidden;
                    position: relative;
                    margin-bottom: 17px;
                    transition: all .3s ease;
                    margin-right: 15px;
                    font-size: 0;
                    left: 0px;

                    &:hover{
                      left: 12px;
                    }

                    img{
                      width: 100%;
                      height: 100%;
                      display: block;
                    }

                    /*&:nth-of-type(3n){*/
                      /*margin-right: 0;*/
                    /*}*/

                    span{
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      text-align: center;
                      line-height: 60px;
                      font-size: 14px;
                      color: #fff;
                      font-weight: 700;
                      background-color: rgba(0,0,0,.3);
                    }

                  }
                }
              }

              .price_list{
                float: right;
                &_title{
                  font-size: 16px;
                  color: #f9f9f9;
                  padding-bottom: 12px;
                  box-shadow: 0 1px 0 0 hsla(0,0%,100%,.2);
                }

                .price_items{
                  padding-top: 27px;
                  .price{
                    width: 100%;
                    display: block;
                    font-size: 14px;
                    color: #f9f9f9;
                    opacity: .5;
                    margin-bottom: 20px;
                  }

                  .price:nth-last-of-type(1){
                    margin-bottom: 0;
                  }

                }
              }
            }


          }
        }


        span{
          position: relative;
          top: 0;
          left: 0;
          transition: .8s;
        }

        img.timg{
          position: relative;
          top: 5px;
          left:0;
          margin-right: 23px;
          transition: .8s;
        }
        img:nth-of-type(2){
          float: right;
          margin-top: 15px;
          left: 15px;

        }

      }
      li:hover{
        background-color: hsla(0,0%,100%,.1);

        img.timg{
          left: 20px;
        }

        span{
          left: 20px;
        }
        .fix_slist{
          display: block;
        }

      }

    }


    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}

    .white{
      color:#fff!important;
      font-weight: bolder;
    }
  }
</style>
