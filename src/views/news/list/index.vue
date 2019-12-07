<template>
    <div class="hot1">
        <div class="main_box">
              <ul class="list_container">
                  <li v-for="(item,index) in list" :key="index">
                      <div class="imgbox">
                         <router-link :to="'/news/hot'+tagId+'/detail?id='+item.entity.id+'&tagid='+tagId">
                            <img :src="IMG_URL+item.entity.articleImage" width="242" height="160" alt="">
                         </router-link>
                      </div>
                      <div class="textbox">
                            <p class="title">
                              <!--<a class="title_link" href="#">#美国#</a>-->
                              <router-link :to="'/news/hot'+tagId+'/detail?id='+item.entity.id+'&tagid='+tagId">{{item.entity.title}}</router-link>
                            </p>
                            <p class="body">
                              {{item.entity.articleIntro}}
                            </p>
                            <span class="date"> {{item.entity.createTime.substring(0,10)}}</span>
                      </div>
                  </li>
              </ul>
              <div class="pagibox">
                <pagination align="center" v-model="pageInfo.pno" :changeHandle="pageChangeHandle" :maxPage="pageInfo.maxPage"></pagination>
              </div>
        </div>
    </div>
</template>

<script>
import pagination from '@/components/pagination/small'
import {infoList} from '@/api/info'
import {botSwiper} from '@/api/banner'
    export default {
        name: 'hot1',
        components: {pagination},
        data() {
            return {
              pageInfo:{
                pno:1,
                maxPage:1,
                size:10
              },
              list:[],
              tagId:0
            }
        },
        methods: {
          pageChangeHandle(pno){
            this.fetch(pno);
          },
          fetch(pno=1){
            this.tagId = this.$route.path.split('hot')[1];
            if(this.tagId<=6){
              infoList(this.tagId,pno).then(res=>{

                this.list = res.body.records;
                this.pageInfo.pno=res.body.page;
                this.pageInfo.maxPage=res.body.totalPages || 1;
                this.pageInfo.size=res.body.pageSize;
                window.scrollTo(0,0)
              })
            }else{
              botSwiper(pno).then(res=>{
                this.pageInfo.pno=res.body.page;
                this.pageInfo.maxPage=res.body.totalPages || 1;
                this.pageInfo.size=res.body.pageSize;
                window.scrollTo(0,0)
                this.list=res.body.records.map(item=>{
                  return {
                    entity:{
                      articleImage:item.entity.caseUrl,
                      id:item.entity.id,
                      title:item.entity.caseTitle,
                      articleIntro:item.entity.caseIntro,
                      createTime:item.entity.publishTime
                    }

                  }
                })
              })
            }



          }

        },
        mounted(){
          this.fetch();
        },
        watch:{
            '$route':function (){
              this.fetch(1);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .clearfloat{zoom:1}
    .main_box{

      .pagibox{
        height: 77px;

      }
        padding: 0 20px;

        ul,li{
          margin: 0;
          padding: 0;
          list-style: none;
        }

      li{
        padding: 20px 0;
        border-bottom: 1px #ddd dashed;
        position: relative;
        .imgbox{
          display: inline-block;
          vertical-align: top;
        }

        .textbox{
          display: inline-block;
          vertical-align: top;
          width: 560px;
          margin-left: 30px;
          font-size: 19px;


          .title{

              a.title_link{
                color: #64b8f6;
              }
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 85%;
            }

          .body{
            font-size: 15px;
            color: #646567;
            margin: 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 32px;
            margin-bottom: 20px;
          }
          .date{
            color: #646567;
            font-size: 15px;
            position: absolute;
            bottom: 25px;
          }

        }
      }



    }
</style>
