<template>
    <div class="about  ">
          <div class="mainbox clearfloat">
            <div class="left">
              <div class="left_title">
                关于我们
              </div>
              <ul class="left_nav">
                <li  :class="{'active':$route.path=='/about'}"><router-link to="/about"><i class="about_icon about_icon_intro"></i>公司介绍</router-link></li>
                <li  :class="{'active':$route.path=='/about/joinus'}"><router-link to="/about/joinus"><i class="about_icon about_icon_joinus"></i>招贤纳士</router-link></li>
                <li  :class="{'active':$route.path=='/about/concact'}"><router-link to="/about/concact"><i class="about_icon about_icon_contact"></i>联系我们</router-link></li>
                <li  :class="{'active':$route.path=='/about/privacy'}"><router-link to="/about/privacy"><i class="about_icon about_icon_privacy"></i>隐私声明</router-link></li>
              </ul>

            </div>
            <div class="right">
                  <router-view></router-view>
            </div>

          </div>
    </div>
</template>

<script>

    export default {
        name: 'about',
        components: {

        },
        data() {
            return {
                navActice:0
            }
        },
        methods: {}
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
      .about{
        width: 100%;
        background-color: #f5f5f5;
        padding-bottom: 190px;
        &:before{
          display: table;
          content: "";
        }
        .mainbox{
          width: 1200px;
          margin: 0 auto;
          margin-top: 60px;

          .left{
            float: left;
            width: 300px;
            margin-right: 25px;
            background-color: #fff;
            .left_title{
              background-color: #f7f7ff;
              padding: 0 25px;
              height: 70px;
              border-bottom: 2px solid #f6f6f6;
              line-height: 70px;
              font-size: 22px;
              color: #333;
              font-weight: 700;
            }
            .left_nav{
              list-style: none outside none;
              margin: 0;
              padding: 0;
              li{
                height: 60px;
                line-height: 60px;
                padding: 0 25px;
                font-size: 18px;
                border-bottom: 1px solid #f6f6f6;
                background-color: #fff;
                cursor: pointer;
                a{
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                }
                &.active{
                  color: #f59316;
                  .about_icon_intro{
                    background-position: -120px 0;
                  }


                  .about_icon_joinus{

                    background-position: -120px -40px;
                  }
                  .about_icon_contact{
                    background-position: -120px -160px;
                  }

                  .about_icon_privacy{
                    background-position: -40px -40px;
                  }


                }

                &:hover{
                  color: #f59316;
                }

                a{
                  display: inline-block;
                  vertical-align: middle;
                }

                .about_icon{
                  display: inline-block;
                  margin-right: 5px;
                  background-image: url(../../assets/img/about.png);
                  background-repeat: no-repeat;
                  vertical-align: middle;
                }

                .about_icon_intro{
                  width: 22px;
                  height: 24px;
                  background-position: -80px 0;
                }


                .about_icon_joinus{

                  width: 24px;
                  height: 28px;
                  background-position: -80px -40px;
                }
                .about_icon_contact{
                  width: 26px;
                  height: 28px;
                  background-position: -80px -160px;
                }

                .about_icon_privacy{
                  width: 26px;
                  height: 28px;
                  background-position: 0px -40px;
                }

              }
            }
          }
        .right{
          float: right;
          width: 875px;
          background-color: #fff;
        }
        }
      }
</style>
