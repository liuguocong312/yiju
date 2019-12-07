<template>
    <div class="topActivity">
        <div class="box clearfloat" v-if="list.length>0">
            <div class="left">
                <router-link :to="{path:'/news/hot1/detail',query:{id:list[0].entity.id,tagid:list[0].entity.tagIds[0]}}">
                  <img :src="IMG_URL+list[0].entity.articleImage" alt="">
                  <div class="desc_text">
                    {{list[0].entity.title}}
                  </div>
                </router-link>
            </div>
            <div class="right">
                <div class="item" v-for="(item,index) in list" :key="index" v-if="index<=2">
                  <router-link :to="{path:'/news/hot1/detail',query:{id:item.entity.id,tagid:item.entity.tagIds[0]}}">
                  <img :src="IMG_URL+item.entity.articleImage" width="171" height="113.3" alt="">
                  </router-link>
                  <div class="desc_box">
                      <router-link :to="{path:'/news/hot1/detail',query:{id:item.entity.id,tagid:item.entity.tagIds[0]}}">
                          <span class="desc_title">
                              {{item.entity.title}}
                          </span>
                      </router-link>
                      <p class="desc_body">
                       {{item.entity.articleIntro}}
                      </p>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getTopNews} from '@/api/newTopActivity'
    export default {
        name: 'topActivity',
        components: {},
        data() {
            return {
              list:[],
            }
        },
        methods: {

        },
        mounted(){
          getTopNews().then(res=>{
            this.list=res.body.records
          })
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    .topActivity{
      .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
      .clearfloat{zoom:1}
        .box{
          width: 100%;
          padding: 20px;
          background-color: #fff;
          .left{
            float: left;
            width: 540px;
            height: 360px;
            position: relative;
            margin-right: 20px;
            img{
              width: 540px;
              height: 360px;
            }
            .desc_text{
              position: absolute;
              background-color: rgba(0,0,0,0.3);
              bottom: 0;
              left: 0;
              font-size: 19px;
              color: white;
              width: 100%;
              padding: 15px;
            }
          }

          .right{
            float: right;
            .item{
              width: 600px;
              height: 113.3px;
              margin-bottom: 10px;
              background-color: #f6f9fe;
              vertical-align: top;
              .desc_box{
                vertical-align: top;
                display: inline-block;
                height: 100%;
                width: 420px;
                padding: 20px;
                .desc_body{
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  color: #979b9c;
                  height: 44px;
                  font-size: 14px;
                  line-height: 22px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }


        }
    }
</style>
