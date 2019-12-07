<template>
    <div id="news">
        <div class="news_container">
            <div class="news_body">
                <top-activity></top-activity>

                <div class="news_bottom_box clearfloat">
                    <div class="left">
                        <div class="navbar">
                            <router-link  v-for="(item,index) in navList" :key="index" v-if="index<6" :to="item.to" :class="{'active':isFullPath(item.to)}" class="navitem">{{item.label}}</router-link>
                            <router-link  class="navitem" to="/news/hot7" :class="{'active':isFullPath('/news/hot7')}">成功案列</router-link>
                        </div>

                        <router-view></router-view>
                    </div>
                    <hot-house></hot-house>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import topActivity from '@/components/newsTopActivity';
    import hotHouse from '@/components/newsHotHouse';
    import {info} from '@/api/info';
    export default {
      name: 'news',
      components: {topActivity,hotHouse},
      mounted(){
        info().then(res=>{
            this.navList=res.body.map((item)=>{
                return {
                    label:item.tagName,
                    to:"/news/hot"+item.id
                }
            });
        });
      },
      data() {
        return {
            navList:[

            ],



        }
      },
      methods: {
        isFullPath(to){
          let x = this.$router.history.current.fullPath.indexOf(to);
          // console.log(this.$router.history.current.fullPath)
          return x===0;
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    .news{
        &_container{
          width: 100%;
          background-color: #f5f5f5;
          padding: 20px 0;

          .news_body{
            width: 1200px;
            margin: 0 auto;

            .news_bottom_box{
              margin-top: 30px;
              width: 100%;
              .left{
                width: 880px;
                float: left;
                background-color: white;
                .navbar{
                  height: 70px;

                  border-bottom: 1px #eee solid;

                  .navitem{
                    display: inline-block;
                    width: 120px;
                    height: 100%;
                    line-height: 70px;
                    text-align: center;
                    font-size: 18px;
                    position: relative;

                    &.active{
                      color: #d23a2d;
                      &:after{
                        content: '';
                        display: block;
                        position: absolute;
                        width: 40px;
                        height: 3px;
                        background-color: #d23a2d;
                        bottom: -1px;
                        left: 35px;
                      }
                    }
                  }

                }

              }


            }

          }
       }

    }
</style>
