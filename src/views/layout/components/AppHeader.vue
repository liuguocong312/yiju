<template>
    <header class="app-header" :style="{
    'height':this.$router.history.current.path==='/'?'35px':'116px',
    'color':this.$router.history.current.path==='/'?'white':'black'
    }">

      <div class="header">
        <div class="header-body">
          <div class="langbox">
            <span class="lang">
            <a href="#" class="headermenu">China 中国 <!-- <img src="../../../assets/img/iconopen.png" width="15" height="13" alt="">--></a>
          </span>

          </div>

          <ul class="header_sels">
            <!--<li>-->
              <!--移居APP <img src="../../../assets/img/iconopen.png" width="15" height="13" alt="">-->
              <!--<div class="QRcodeBox">-->
                <!--<div class="media_box">-->
                  <!--<div class="media_item">-->
                    <!--<img src="../../../assets/img/ios.jpg" width="100" height="100" alt="">-->
                  <!--</div>-->
                  <!--<div class="media_item media_t1"><span>移居APP</span></div>-->
                  <!--<div class="media_item media_t2"><span>上移居</span></div>-->
                  <!--<div class="media_item media_t2"><span>做全球房东</span></div>-->
                <!--</div>-->

              <!--</div>-->
            <!--</li>-->
            <!--<li>-->
              <!--小程序 <img src="../../../assets/img/iconopen.png" width="15" height="13" alt="">-->

              <!--<div class="QRcodeBox">-->

                <!--<div class="media_box">-->
                  <!--<div class="media_item">-->
                    <!--<img src="../../../assets/img/xcx.jpg" style="border-radius: 50%" width="100" height="100" alt="">-->
                  <!--</div>-->
                  <!--<div class="media_item media_t1"><span>移居APP</span></div>-->
                  <!--<div class="media_item media_t2"><span>上移居</span></div>-->
                  <!--<div class="media_item media_t2"><span>做全球房东</span></div>-->
                <!--</div>-->


              <!--</div>-->

            <!--</li>-->
            <li>
              <!--手机版官网 <img src="../../../assets/img/iconopen.png" width="15" height="13" alt="">-->
              手机版官网
              <div class="QRcodeBox">

                <!--<div class="media_box">-->
                  <div class="media_item">
                    <img src="../../../assets/img/H5.jpg" width="100" height="100" alt="">
                    <span>手机扫描访问</span>
                  </div>
                  <!--<div class="media_item media_t1"><span>移居APP</span></div>-->
                  <!--<div class="media_item media_t2"><span>上移居</span></div>-->
                  <!--<div class="media_item media_t2"><span>做全球房东</span></div>-->
                <!--</div>-->


              </div>
            </li>
          </ul>


          <ul class="header_rbox">

            <li  v-if="!this.$store.state.commn.isLogin">

              <a  @click="showLogin" >登录</a>&nbsp; <span>|</span>&nbsp; <a  @click="showReg">注册</a>

            </li>

            <li  v-if="this.$store.state.commn.isLogin">
              <router-link to="/user" >个人中心</router-link>&nbsp; <span>|</span>&nbsp; <a @click="logout()">退出</a>
            </li>
            <!--<li><a href="#">新手上路</a></li>-->
            <li><img src="../../../assets/img/phone2.png" width="15" height="13" alt=""> <span style="color:#F00">400-8013-932</span></li>
          </ul>

        </div>
      </div>

      <div class="navbar">
          <div class="nav-body">
            <img :src="this.$router.history.current.path==='/'?logo:logob" style="float: left;margin-top: 10px"  height="60" alt="">

            <ul class="nav_menu">

              <template v-for="(item,index) in Navs">
                  <li :class="{'active':isFullPath(item.to)}">
                    <router-link class="navitem" :to="item.to">{{item.name}}</router-link>
                    <div class="bline"></div>
                  </li>
              </template>

            </ul>


            <!--<div class="search_box">-->
              <!--<input type="text" placeholder="国家/城市/项目名" :style="{-->
                <!--'background-color':this.$router.history.current.fullPath==='/index'?'hsla(0,0%,100%,.2)':'#f5f5f5',-->
                <!--'color':this.$router.history.current.fullPath==='/index'?'white':'#000'-->
              <!--}">-->
              <!--<button></button>-->
            <!--</div>-->

          </div>
      </div>
      <AppDialog v-if="this.$store.state.commn.showLogin"></AppDialog>
    </header>
</template>

<script>
    import store from '@/store'
    import AppDialog from './AppDialog';
    import logo from '@/assets/img/logo.png'
    import logob from '@/assets/img/logob.png'
    export default {
        name: 'app-header',
        data() {
            return {
              form:{
                username:'',
                password:'',
              },
              logo,
              logob,
              Navs:[
                {
                    name:"首页",
                    to:'/',
                },
                {
                  name:"海外房产",
                  to:'/house',
                },
                 {
                   name:"移民项目",
                   to:'/immigrant',
                 },
                {
                  name:"海外资讯",
                  to:'/news',
                },
                {
                  name:"展会活动",
                  to:'/activity',
                },
                {
                  name:"品牌移居",
                  to:'/about',
                }
              ]
            }
        },
        computed:{

        },

        mounted(){
              //console.log(this.$route)
        },
        components:{AppDialog},
        methods: {
          showLogin(){
            store.dispatch('ToggleDialog', true);
            store.dispatch('ToggleReg', true);
          },
          isFullPath(to){
              //console.log(to)
              let x = this.$router.history.current.path.indexOf(to);

              return (x===0 && to!='/') || (this.$router.history.current.path=='/' && to=="/");
          },

          showReg(){
            store.dispatch('ToggleDialog', true);
            store.dispatch('ToggleReg', false);
          },
          logout(){
            store.dispatch('FedLogOut').then(res=>{
              store.dispatch('ToggleLogin',false);
              this.$message({
                message: '注销成功',
                type: 'success'
              });
            });
            this.$router.push({path:'/'})

          }
        },
        watch:{

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-header{

    overflow: visible;
    position: relative;
    .navbar{
      position: absolute;
      top: 35px;
      left: 0;
      width: 100%;
      min-width: 1280px;
      max-width: 1920px;
      z-index: 1001;

      .search_box{
        margin-top: 25px;
        float: right;
        width: 20%;
        input{
          width: calc(100% - 60px);
          height: 30px;
          border-radius: 20px 0 0 20px;
          text-indent: 20px;
          outline: none;
          border: none ;
          background-color: hsla(0,0%,100%,.2);
          color:white;
          position: relative;
          top: -8px;
          right: -5px;
        }
        button{
          height: 30px;
          width: 55px;
          display: inline-block;
          background-color: #1681df;
          border: none;
          background-image: url("../../../assets/img/search.png");
          background-repeat: no-repeat;
          background-size: 22px 22px;
          background-position: 13px 3px;
          border-radius: 0 20px 20px 0;
        }

      }


      .nav-body{
        width: 85%;
        margin: 0 auto;
        //padding: 20px 0;

      }

      .nav_menu{
        float: left;
        margin-left: 5%;
       // margin-top: 0;


        li{
          float: left;

          font-size: 19px;
          margin-right: 25px;
          width: 80px;
          height: 45px;
          text-align: center;
          line-height: 45px;
          position: relative;
          cursor: pointer;

          .navitem{
            display: block;
            width: 100%;
            height: 100%;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }

          .bline{
            bottom: 0;
            border-bottom: 1px solid red;
            width: 80%;
            margin: 0 auto;
            display: none;
          }


        }
        li:hover,li.active{
            color: red;
        }

        li:hover .bline,li.active .bline{
          display: block;

        }

        li:nth-of-type(1){
          margin-right: 40px;
        }


        li:nth-of-type(1) .bline{
          width: 40%;
        }
      }




    }


    .header{
      width: 100%;
      height: 35px;
      background: #1b1b1b;
      min-width: 1280px;
      font-size: 15px;
      max-width: 1920px;


      .header_rbox{
        float: right;
        display: inline-block;
        height: 35px;
        margin:0;
        li{
          margin:0;
          height: 35px;
          line-height: 35px;
          float:left;
          margin-left: 40px;
          img{
            position: relative;
            top: 2px;
            right: 8px;
          }
        }
        li:nth-of-type(1){
          margin-left: 0;
        }
      }

      .header_sels{
        list-style: none;
        width: 350px;
        margin: 0;
        display:inline-block;
        height: 35px;
        padding-left: 30px;


        li{
          float: left;
          margin: 0;
          text-align: center;
          padding-left: 10px;
          padding-right: 10px;
          height: 35px;
          line-height: 35px;
          cursor: pointer;
          position: relative;
          width: 100px;
          .QRcodeBox{
            position: absolute;
            top: 35px;
            left: 0;
            background-color:#2e2e2f;
            display: none;
            clear: both;
            padding: 20px;
            z-index: 1002;
            .media_box{
              width:200px;
              height: 100px;
              position: relative;
              .media_item{
                position: absolute;

              }
              .media_t1{
                top: -10px;
                left: 130px;
                font-size: 16px;
                font-weight: 700;
                color: white;
                padding :5px 0;
                padding-bottom: 4px;
                border-bottom: 1px solid #ccc;
              }
              .media_t2:nth-last-of-type(1){
                top: 66px;
              }
              .media_t2{
                  font-size: 14px;
                  left: 130px;
                  top: 45px;
              }



            }

          }

          img{
            position: relative;
            top: 2px;
            left: 3px;
          }
        }
        li:nth-of-type(1){
          margin-left: 0;
        }

        li:hover{
          background-color: #2e2e2f;
        }


        li:hover .QRcodeBox{
          display: block;
          cursor: default;
        }

      }


      .langbox{
        display: inline-block;
        width: 180px;
        height: 35px;
        vertical-align: top;
        line-height: 35px;
      }


      .lang{
        background-image: url('../../../assets/img/icon1.png');
        background-repeat: no-repeat;
        background-size: 27px 23px;
        a.headermenu{
          position: relative;
          left: 30px;

          img{
            position: relative;
            top: 2px;
            left: 3px;
          }
        }
      }

      &-body{
        width: 85%;
        height: 35px;
        margin: 0 auto;
        background: #1b1b1b;
        color: #999893;
      }


    }
  }
</style>
