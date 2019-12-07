<template>
    <div class="detail">
        <div class="main_box"  v-if="$route.query.tagid<7">
          <div class="container">
            <crumb :title="detail.title"></crumb>

            <div class="body_box clearfloat ">
                <div class="left">
                    <div class="titlebox">
                        <h2>移居:{{detail.title}}</h2>
                        <div class="author_box">
                          <div class="aitem">发布时间: {{detail.createTime}}</div>
                          <!--<div class="aitem">作者:{{detail.createdBy}}</div>-->
                          <div class="aitem" ><a class="collectbtn" :class="{'disabled':detail.faved}" @click="collect($event,detail.id,detail.faved)">{{!detail.faved?"收藏":"取消收藏"}}</a></div>
                          <div class="aitem" >
                            <icon-box></icon-box>
                          </div>
                        </div>

                    </div>

                    <div class="body_content" v-html="detail.content">

                    </div>

                    <div class="footer_box">
                        <div>
                          上一篇: <router-link v-if="this.prev!=null" class="link" :to="'/news/detail?id='+prev.id+'&tagid='+$route.query.tagid">{{prev.title}}</router-link>
                                  <span v-else>没有了</span>
                        </div>
                        <div >
                          下一篇: <router-link v-if="this.next!=null" class="link" :to="'/news/detail?id='+next.id+'&tagid='+$route.query.tagid">{{next.title}}</router-link>
                          <span v-else>没有了</span>
                        </div>

                    </div>


                </div>
                <hot-house></hot-house>
            </div>

          </div>
        </div>

        <div class="main_box"  v-else>
        <div class="container">
          <crumb :title="detail.caseTitle"></crumb>

          <div class="body_box clearfloat ">
            <div class="left">
              <div class="titlebox">
                <h2>移居:{{detail.caseTitle}}</h2>
                <div class="author_box">
                  <div class="aitem">发布时间: {{detail.createTime}}</div>
                  <!--<div class="aitem">作者:{{detail.createdBy}}</div>-->
                  <!--<div class="aitem" ><a class="collectbtn" :class="{'disabled':detail.faved}" @click="collect($event,detail.id,detail.faved)">{{!detail.faved?"收藏":"取消收藏"}}</a></div>-->
                  <div class="aitem" style="margin-bottom:20px">
                    <icon-box></icon-box>
                  </div>
                </div>

              </div>

              <div class="body_content" v-html="detail.content">

              </div>
            </div>
            <hot-house></hot-house>
          </div>

        </div>
      </div>
    </div>


</template>

<script>

    import hotHouse from '@/components/newsHotHouse'
    import iconBox from '@/components/iconBox'
    import {getArticleDetail,farticle,getSuccessCaseDetail} from '@/api/info'
    import crumb from '@/components/Breadcrumb'
    export default {
        name: 'detail',
        computed: {},
        components: {hotHouse,iconBox,crumb},
        methods: {
          fetch(){
            if(this.$route.query.tagid<7){
              getArticleDetail(this.$route.query.id,this.$route.query.tagid).then(res=>{

                this.detail=res.body.articleDetail;
                this.detail.faved = !res.body.faved;
                this.prev=res.body.previousGage;
                this.next=res.body.nextPage;
              });
            }else{
              getSuccessCaseDetail(this.$route.query.id).then(res=>{
                this.detail = res.body
              })
            }

          },
          collect(e,id,c){
            e.preventDefault();
            e.stopPropagation();

            if(!c){
              //收藏
              farticle(id).then(res=>{
                if(res.header.code=="000"){
                  this.$message({
                    type:"success",
                    message:"收藏成功"
                  });
                  this.$delete(this.detail,'faved');
                  this.$set(this.detail,'faved',true);
                  this.detail.faved=true;
                }
              })
            }else{
              //收藏
              farticle(id).then(res=>{
                if(res.header.code=="000"){
                  this.$message({
                    type:"success",
                    message:"取消收藏成功"

                  });
                  this.$delete(this.detail,'faved');
                  this.$set(this.detail,'faved',false);
                  this.detail.faved=false;
                }
              })
            }


          },
        },

        mounted(){
            //this.fetch();

        },
        created(){
          this.fetch();
        },

        data(){
            return {
              detail:{},
              prev:{},
              next:{}
            }
        },
      watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "fetch"
      }
    }
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
    .main_box{
      background-color: #f5f5f5;
      padding-bottom: 60px;
      .container{
        width: 1200px;
        margin: 0 auto;

        .body_box{

          .left{
            width: 880px;
            float: left;

            background: white;
            padding: 10px 15px;
            .titlebox{
              h2{
                margin-bottom: 5px;
              }
              border-bottom: 1px dashed #ccc;
              .author_box{
                padding:10px 0;
                padding-top: 0;
                text-align: right;
                .aitem{
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 17px;
                  color: #333;

                  .collectbtn {
                    width: 100px;
                    height: 25px;
                    text-align: center;
                    display: block;
                    position: relative;
                    background-color: #f23644;
                    line-height: 25px;
                    color: white;
                    border-radius: 3px;
                    margin-top: 10px;
                    cursor: pointer;
                    top:-5px;

                    &.disabled {
                      background-color: #999;
                    }
                  }
                  &:not(:nth-of-type(3)){
                    position: relative;
                    top: 10px;
                    margin-right: 20px;
                  }

                }
              }
            }

            .body_content{
              width:92%;
              margin:0 auto;
              padding: 50px 0;
              /deep/ img{
                max-width: 100%;
              }

            }

            .footer_box{
              padding: 5px 0;
              div{
                margin: 10px;
                .link:hover{
                  color: red;
                }
              }
            }
          }
        }
      }
    }

</style>
