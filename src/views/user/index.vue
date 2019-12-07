<template>
    <div class="user">

        <div class="main_box clearfloat">
              <div class="left">
                  <div class="avatar_box">
                      <img :src="IMG_URL+$store.getters.avatar" alt="">
                      <!--<img src="../../assets/img/WechatIMG16.jpg" alt="">-->
                      <span>{{$store.getters.name}}</span>
                  </div>

                  <ul class="navbox">
                    <!--<li ><router-link to="/">个人资料</router-link></li>-->
                    <!--<li><router-link to="/">订单合同</router-link></li>-->
                    <!--<li><router-link to="/">我的贷款</router-link></li>-->
                    <!--<li><router-link to="/">我的收藏</router-link></li>-->
                    <!--<li><router-link to="/">我的评估</router-link></li>-->
                    <!--<li><router-link to="/">增值服务</router-link></li>-->
                    <!--<li><router-link to="/">推荐有礼</router-link></li>-->
                    <li  v-for="(item,index) in navList" :key="index"><router-link :class="{'active':$route.fullPath=='/user/'+item.to}"  :to="item.to">{{item.label}}</router-link>
                    <li @click="logout"><a>退出</a></li>

                    <!--<li v-for="(item,index) in navList" :key="index"><router-link :to="item.to" :style="{'background-image':navActive==index?'url('+item.hover+')':'url('+item.bg+')'}">{{item.label}}</router-link></li>-->

                  </ul>
              </div>
              <div class="right clearfloat">
                <router-view></router-view>
              </div>
        </div>

    </div>
</template>

<script>
    import store from '@/store';
    export default {
        name: 'user',
        components: {

        },
        data() {
            return {
                  navActive:0,
                  navList:[
                    {
                        label:"个人资料",
                        to:'profile'

                    },
                    {
                      label:"订单合同",
                      to:'order'

                    },
                    {
                      label:"我的贷款",
                      to:'loan'

                    },
                    {
                      label:"我的收藏",
                      to:'collect'

                    },
                    {
                      label:"我的评估",
                      to:'assess'

                    },
                    {
                      label:"增值服务",
                      to:'vip'

                    },
                    {
                      label:"推荐有礼",
                      to:'invite'

                    }
                  ]
            }
        },
        methods: {
          logout(){
            store.dispatch('FedLogOut').then(res=>{
              store.dispatch('ToggleLogin',false);
              this.$message({
                message: '退出成功',
                type: 'success'
              });
            });
            this.$router.push({path:'/'})

          }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .user{
        padding: 75px 0 70px;
        background-color: #f5f5f5;
      width: 100%;
      max-width: 1920px;
      min-width: 1280px;
      .main_box{
        width:1200px;
        margin: 0 auto;
        .left{
          float: left;
          width: 249px;
          height: 728px;
          color: #9fa2a7;
          background-color: #333d49;

          .avatar_box{
            height: 227px;
            border-bottom: 1px solid #d3d4d6;
            text-align: center;
            img{
              display: block;
              width: 142px;
              height: 142px;
              margin: 16px auto;
              border-radius: 50%;
              border: 6px #fdfdfd solid;
            }
            span{
              font-size: 27px;
            }
          }

          .navbox{

            list-style: none;
            margin: 0;
            padding: 0;
            li{
              list-style: none;
              margin: 0;
              padding: 0;
              height: 46px;
              border-bottom: 1px solid #d3d4d6;
              line-height: 46px;
              font-size: 17px;
              text-align: center;
              text-indent: 15px;
              box-sizing: border-box;


              &:nth-of-type(1) a{
                background-image: url("../../assets/img/people-w.png");
                &:hover{
                  background-image: url("../../assets/img/red-people.png");
                }
                &.active{
                  background-image: url("../../assets/img/red-people.png");
                }
              }
              &:nth-of-type(2) a{
                background-image: url("../../assets/img/paper-w.png");
                &:hover{
                  background-image: url("../../assets/img/red-paper.png");
                }
                &.active{
                  background-image: url("../../assets/img/red-paper.png");
                }
              }

              &:nth-of-type(3) a{
                background-position-x: 50px ;
                background-image: url("../../assets/img/pay-w.png");
                &:hover{
                  background-image: url("../../assets/img/red-pay.png");
                }
                &.active{
                  background-image: url("../../assets/img/red-pay.png");
                }
              }
              &:nth-of-type(5) a{
                background-size: 32px;
                background-position-x: 53px ;
                background-image: url("../../assets/img/RAR-w.png");
                &:hover{
                  background-image: url("../../assets/img/red-RAR.png");
                }
                &.active{
                  background-image: url("../../assets/img/red-RAR.png");
                }
              }

              &:nth-of-type(4) a{

                background-image: url("../../assets/img/Heart-w.png");
                &:hover{
                  background-image: url("../../assets/img/red-heart.png");
                }
                &.active{
                  background-image: url("../../assets/img/red-heart.png");
                }
              }

              &:nth-of-type(6) a{
                background-size: 32px;
                background-position-x: 51px ;
                background-image: url("../../assets/img/diamond _w.png");
                &:hover{
                  background-image: url("../../assets/img/red-diamond.png");
                }
                &.active{
                  background-image: url("../../assets/img/red-diamond.png");
                }
              }

              &:nth-of-type(7) a{
                background-size: 35px;
                background-position-x: 50px ;
                background-image: url("../../assets/img/share_w.png");
                &:hover{
                  background-image: url("../../assets/img/red-share.png");
                }
                &.active{
                  background-image: url("../../assets/img/red-share.png");
                }
              }

              &:nth-of-type(8) a{
                background-size: 35px;
                background-position-x: 53px ;
                background-image: url("../../assets/img/Signout_w.png");
                &:hover{
                  background-image: url("../../assets/img/red-Sign-out.png");
                }
                &.active{
                  background-image: url("../../assets/img/red-Sign-out.png");
                }
              }


              a{
                display: block;
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size:45px;
                background-position: 45px;
                border-left: 5px transparent solid;
                &:hover{
                  color: red;
                  border-left: 5px red solid;
                }

                &.active{
                  color: red;
                  border-left: 5px red solid;
                }

              }
              &:nth-last-of-type(1){
                border-bottom: none;
              }

            }
          }






        }
        .right{
          float: right;
          /*background-color: white;*/
          width: 936px;
          /*padding-bottom: 75px;*/
        }
      }
    }
</style>
