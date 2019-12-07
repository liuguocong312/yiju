<template>
  <div class="activity clearfloat">
      <div class="body">
          <div class="header">
              <div class="rtitle">
                <img src="../../assets/img/hot.png" width="36" height="36" alt="">
                <span>移民项目</span>
              </div>

              <ul class="menu_list">
                <li v-for="(item,index) in tab" :class="{'redTab':index==tabColor}" v-if="index>=3 " @mouseenter="changeTab(index,item.id)">{{item.tagName}}</li>
              </ul>
          </div>

          <div class="content clearfloat">
            <div class="left">

                <ul class="contry_list">
                    <li  v-for="(item,index) in list" :key="index" v-if="index<9">
                        <router-link :to="'/immigrant/detail?id='+item.entity.id">
                          <div class="textbox">
                            <span class="title">{{item.entity.projectName}}</span>
                            <span class="title_sub">{{item.entity.advantage1}}</span>
                          </div>
                          <div class="imgtbox" >
                            <img style="max-height: 56px" :src="'https://api2.migrantju.com/images/icons/'+item.entity.nationCode+'.png'" width="70" alt="">
                          </div>
                          <div class="blance">
                            <span>{{item.entity.advantage2}}</span>
                          </div>
                        </router-link>
                    </li>
                </ul>

            </div>

            <div class="right" v-if="tab.length>0">
              <div class="news-content">
                <router-link class="news-item" v-for="(item,index) in details" :key="index" v-if="index<7" :to="'/news/hot'+tab[tabColor].id+'/detail?id='+item.entity.id+'&tagid='+tab[tabColor].id">
                  <span class="ball"></span>
                  <span class="title" v-if="item.entity.title.length>20">{{item.entity.title.substring(0,18)}}...</span>
                  <span class="title" v-else>{{item.entity.title}}</span>
                  <span class='time'>{{item.entity.createTime.substring(0,10)}}</span>
                </router-link>
              </div>

              <div class="more" >
                  <router-link to="news/hot1">查看更多</router-link>
              </div>
            </div>

          </div>
      </div>
    </div>
</template>

<script>
    import {projectList,newslis} from '@/api/activity2'
    import {info,infoList} from '@/api/info';

    export default {
        name: 'temp',
        data() {
            return {
              list:[],
              tab:[

              ],
              tabColor:3,
              details:null,
            }
        },
        methods: {
          getNewlis(){
            newslis().then(res=>{
              // console.log(res)
            })
          },

          changeTab(index,id){
            this.tabColor=index
            // console.log(id)

            infoList(id).then(res=>{
              this.details=res.body.records
            })
          }
        },

        mounted(){
          infoList(4).then(res=>{
            this.details=res.body.records
          })

          projectList(2).then(res=>{
            this.list=res.body.records
            //console.log(res);
          });



          this.getNewlis()



          info().then(res=>{
            // console.log(res)
            this.tab=res.body
          })



        },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .clearfloat{zoom:1}
  .activity{
    width: 100%;
    min-width: 1280px;
    max-width: 1920px;
    padding-bottom: 50px;
    background-color: #f9f9f9;
      .body {
        width: 85%;
        margin: 0 auto;
        height: 100%;
        .header{
          position: relative;

          .rtitle{
            font-size: 24px;
            color: #333;
            font-weight: 700;
            height: 85px;
            line-height: 85px;
            img{
              vertical-align: middle;

            }
            span{
              vertical-align: middle;
            }
          }

          .menu_list{
            position: absolute;
            right: 0;
            top: 20px;
            li{
              border:1px solid rgba(0,0,0,0);
              float: left;
              font-size: 20px;
              cursor: pointer;
              margin-right: 30px;
              transition: .3s;
              padding: 8px;
              border-radius: 20px;
            }
          }

        }

        .content{
            .left{
              width: 63%;


              float: left;
              margin-right: 5%;
              padding: 15px;
              padding-top: 0;

              .contry_list{
                margin: 0;
                padding: 0;
                  li{
                    float: left;
                    width: 31%;
                    margin-right: 3%;
                    height: 120px;
                    background-color: white;
                    padding: 15px;
                    position: relative;
                    &:nth-of-type(3n){
                      margin-right: 0;
                    }

                    &:nth-of-type(n+4){
                      margin-top: 25px;
                    }
                    .textbox{
                        display: inline-block;
                        width: 55%;
                      vertical-align: top;
                        .title{
                          display: block;
                          font-size: .85em;
                        }
                      .title_sub{
                       padding:1px ;
                        display: block;
                        font-size: .7em;
                        color: #999;
                        margin-top: 12px;
                      }

                    }
                    .blance{
                      position: absolute;
                      bottom: 15px;
                      left: 10px;
                      span{
                        background-color: #ee5c59;
                        padding: 4px;
                        font-size:.7em ;
                        color: white;

                      }
                    }

                    .imgtbox{
                      /*border:1px solid red;*/
                      vertical-align: middle;
                      display: inline-block;
                      width: 40%;
                      text-align: right;
                      img{
                        width: 100%;
                        height:100%;
                      }
                    }

                  }

              }
            }

            .right {
              position: relative;
              width: 32%;
              height: 410px;
              /*border: 1px solid blue;*/
              float: right;
              /*background:#fff;*/
              border-radius: 3px;
              /*overflow: auto;*/
              .news-content{
                height:365px;
                background:#fff;
                .news-item {
                  border: 1px solid #ededed;
                  color: #666;
                  line-height: 45px;
                  font-size: .7em;
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  border-radius: 3px;
                  background:#fff;
                  margin-bottom: 5px;
                  transition: .3s all;
                  &:hover{
                    transform: scale(1.1);
                  }
                  /*box-shadow: 0px 1px 2px #666;*/
                  .ball {
                    display: inline-block;
                    position: relative;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background: #ee5c59;
                  }
                  .title{
                    display: inline-block;
                    width:60%;
                    /*border:1px solid red;*/
                  }
                  .time {
                    color: #a7a09e;
                    font-size: 12px;
                  }

                }
              }

              .more{
                /*margin-top: 5px;*/
                height:40px;
                /*border:1px solid red;*/
                background:#fff;
                text-align: center;
                line-height:40px;
                color:#ee5c59
              }

            }


          }
        }
      .redTab{
        border:1px solid #ee5c59;
        background:#ee5c59;
        color:#fff;
      }
    }
</style>
