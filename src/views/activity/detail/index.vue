<template>
  <div class="activity-detail">
    <div class="content">
      <!--<div class="crumbs">-->
        <!--<router-link to="/">移动平台 ></router-link>-->
        <!--<router-link to="/">展会活动 ></router-link>-->
        <!--<router-link to="/">澳洲132商业天才移民说明会</router-link>-->
      <!--</div>-->
      <crumb :title="list.activityName"></crumb>
      <div class="body_box clearfloat ">
        <div class="left">
        <div class="banner" :style="'background-image:url('+IMG_URL+list.activityImage+')'"></div>
        <div class="title">
          <h2>{{list.activityName}}</h2>
              <!--<div><span>发布时间:{{list.crteamTime}} </span><icon-box></icon-box></div>-->
        </div>
        <div class="item">
          <span><b>时间: </b>{{list.activityBeginDate}} {{list.activityBeginTime}}</span>
          <span style="color:red;padding-right: 5%"><b>截止报名时间: </b> {{list.applyDeadlineDate}}</span>
          <a class="collectbtn" :class="{'disabled':hasCollect}" @click="collect()">{{hasCollect?"取消收藏":"收藏"}}</a>
        </div>
        <div class="item">
          <span><b>地点: </b>{{list.activityPlace}}</span>
        </div>
        <!--<div class="item">-->
        <!--<span>报名列表</span><join :applyUsers="list.applyUsers" style="margin-right: 2%"></join>-->
        <!--</div>-->
        <div class="item item-flow">
          <span>活动介绍/详情</span> <span>{{list.activityPreparation|disTag}}</span> <el-button :class="{'btnState':list.activityStatus!='APPLYING'}" :disabled="list.activityStatus!='APPLYING'" @click="signUp($route.query.id)"  type="button">{{list.activityStatus|applyState}}</el-button>
        </div>
        <!--<div class="item item-detail">-->
          <!--&lt;!&ndash;<h3>活动介绍/详情</h3>&ndash;&gt;-->
        <!--</div>-->
        <div class="description" >
          <div v-html="list.description"></div>
        </div>
        </div>
      <hot-house></hot-house>
      </div>
    </div>
  </div>
</template>

<script>
    import hotHouse from '@/components/newsHotHouse'
    import iconBox from '@/components/iconBox';
    import join from '@/components/join'
    import crumb from '@/components/Breadcrumb'
    import {activityDetail} from "@/api/activityDetail";
    import {Collect,cancelCollect,hasCollect,applyActivity} from "@/api/activity";


    export default {
        name: "index",
        components:{
            hotHouse,
            iconBox,
            join,
            crumb
        },
        data(){
          return{
            list:[],
            hasCollect:false,
          }
        },
        mounted(){
          //判断是否收藏
          if(this.$store.getters.isLogin){
            hasCollect(this.$route.query.id).then(res=>{
              this.hasCollect=res.body;
            });
          }

          activityDetail(this.$route.query.id).then(res=>{
            this.list=res.body
          })
        },
      methods:{

        signUp(id){
          let prams={
            activityId:id,
            headCount:this.list.appliedCount
          };
          if(!this.$store.getters.isLogin){
            this.$message.error('请先登录!');
          }else{
            applyActivity(prams).then(res=>{
              if(res.header.code=="000"){
                this.$message({
                  type:"success",
                  message:res.body
                });
              }else{
                this.$message({
                  type:"error",
                  message:res.body
                })
              }
            })
          }
        },

        collect(){
          if(!this.$store.getters.isLogin){
            this.$message.error('请先登录!');
          }else{
              if(this.hasCollect){
                cancelCollect(this.$route.query.id).then(res=>{
                   if(res.header.code=="000"){
                     this.$message({
                       type:"success",
                       message:"取消收藏成功"
                     });
                     this.hasCollect=false;
                   }
                });
              }else{
                Collect(this.$route.query.id).then(res=>{
                  if(res.header.code=="000"){
                    this.$message({
                      type:"success",
                      message:"收藏成功"
                    });
                    this.hasCollect=true;
                  }
                });
              }
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .activity-detail {
    width: 100%;
    min-width: 1280px;
    max-width: 1920px;
    /*border:1px solid red;*/
    background: #f5f5f5;
    padding: 1px;

    .content {
      width: 1200px;
      margin: 0 auto;

      .body_box {

        .left {
          width: 880px;
          float: left;

          /*background: white;*/
          padding: 10px 15px;

          .crumbs {
            height: 90px;
            line-height: 90px;
          }

          .banner {
            /*border:1px solid red;*/
            width: 850px;
            height: 340px;
            /*background:url('../../../assets/img/activity.jpg');*/
            margin-bottom: 1px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
          }

          .title {
            margin-bottom:28px;

            h2 {
              padding: 0;
              margin: 0;
              font-weight: normal;
              margin-bottom: 28px
            }

            > div {
              /*border:1px solid red;*/
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-left: 304px;
              padding-right: 20px;

              .icon-box {
                margin-top: -10px;
              }
            }
          }
        }

        .item {
          width: 850px;
          height: 50px;
          margin: 0 auto;
          background: #fff;
          box-shadow: 0px 0px 10px #dcdddd;
          margin-bottom: 20px;
          padding-left: 2%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .collectbtn {
            width: 100px;
            height: 30px;
            text-align: center;
            display: block;
            background-color: #f23644;
            line-height: 30px;
            color: white;
            border-radius: 3px;
            margin-right: 10px;
            cursor: pointer;
            float: right;

            &.disabled {
              background-color: #999;
            }
          }

          &-flow {
            display: block;
            line-height: 60px;
            padding-left: 2%;
            position: relative;

            button {
              float: right;
              display: block;
              height: 100%;
              width: 120px;
              color: #fff;
              background: #cc0001;
              border-radius: 10px;
              font-size: 20px;
              font-weight: bolder;
            }
            /*button {*/
              /*width: 100px;*/
              /*height: 30px;*/
              /*text-align: center;*/
              /*display: block;*/
              /*background-color: #f23644;*/
              /*line-height: 30px;*/
              /*color: white;*/
              /*border-radius: 3px;*/
              /*margin-right: 10px;*/
              /*cursor: pointer;*/
              /*float: right;*/
            /*}*/

            span {
              &:first-child {
                font-size: 20px;
                font-weight: bolder;
                margin-right: 5%;
              }
            }
          }

          &-detail {
            padding-left: 4%;
          }
        }

        .description {
          background: #fff;
          margin-top: -19px;
          padding: 1px;
          margin-bottom: 20px;

          div {
            width: 90%;
            margin: 0 auto;

            /deep/ img {
              padding-top: 20px;
              display: block;
              margin: 0 auto;
              width: 100%;
            }
          }
        }
      }

      .btnState {
        background: #9c9c9c !important;

      }
    }
  }
</style>
