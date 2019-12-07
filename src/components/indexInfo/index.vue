<template>
  <div class="info">
    <div class="i-heder">
      <div class="left">
        <img src="../../assets/img/success.png" alt="">
        <span>咨询观点</span>
      </div>
      <div class="right">
        <ul>
          <li  v-for="(item, index) in iList" @mouseenter="changeTab(index,item.id)" :class="{'red':index==tabRed}" v-if="index<3">{{item.tagName}}</li>
        </ul>
      </div>
    </div>
    <div class="i-body">

      <router-link :to="'/news/hot'+iList[tabRed].id+'/detail?id='+item.entity.id+'&tagid='+iList[tabRed].id" class="i-body-item" v-for="(item,index) in infoDetails" v-if="index<=6" :key="index">
        <div class="i-body-img" :style="{'background-image':'url('+IMG_URL+item.entity.articleImage+')'}"><!--<img :src="item.entity.articleImage" alt="">--></div>
        <div class="i-body-details">
          <!--<a class="collectbtn"  :class="{'disabled':!item.clickable}" @click="collect($event,item.entity.id,item.clickable,index)">{{item.clickable?"收藏":"取消收藏"}}</a>-->
          <h3>{{item.entity.title}}</h3>
          <p >{{item.entity.createTime}}</p>
          <div class="i-body-content" >
            {{item.entity.articleIntro}}
            <!--2018下半年,希腊购房移民大热,投资者纷纷瞄准希腊房产,进行抄底。希腊购房移民是欧洲移民项目中性价比最高的。目前希腊购房移民项目申请条件非常简单且宽松。只要年满18周岁，在希腊购房25万欧元以上的房产，没有年龄、学历、语言限制，即可获得希腊永居身份，且房屋不出售，居留可保留直至获得希腊护照。-->
          </div>
        </div>

      </router-link>
    </div>
  </div>
</template>

<script>
    import {info,infoList,farticle} from '@/api/info'

    export default {
        name: "index",
        data(){
          return{
            iList:[
              {name:'热门资讯'},
              {name:'新闻快讯'},
              {name:'专家观点'},
            ],
            infoDetails:[],
            tabRed:0,
          }
        },
        methods:{
          //获取观点咨询详情
          getInfoList(id){
            infoList(id).then(res=>{
              this.infoDetails=res.body.records;
            })
          },
          collect(e,id,c,i){
            e.preventDefault();
            e.stopPropagation();
            //console.log(id)
            if(c){
              //收藏
              farticle(id).then(res=>{
                if(res.header.code=="000"){
                  this.$message({
                    type:"success",
                    message:"收藏成功"
                  });
                  this.infoDetails[i].clickable=false;
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
                  this.infoDetails[i].clickable=true;
                }
              })
            }


          },

          changeTab(i,id){
            this.tabRed=i;
            this.getInfoList(id)
          }
        },
        mounted(){
          //获取观点咨询tab栏
          info().then(res=> {
            this.iList=res.body
          })

          this.getInfoList(2)
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .info{
    /*border:1px solid red;*/
    width: 100%;
    min-width: 1280px;
    max-width: 1920px;
    margin-bottom: 100px;
    .i-heder{
      width:85%;
      height:130px;
      /*border:1px solid blue;*/
      margin:0 auto;
      .left{
        height:130px;
        line-height: 130px;
        float:left;
        img{
          height:36px;
          vertical-align: middle;
        }

      }
      .right{
        height:130px;
        float:right;
        /*border:1px solid red;*/
        ul{
          height:130px;
          overflow: hidden;
          margin:0;
          padding: 0;
          padding-top: 50px;
          box-sizing: border-box;
          li{
            border:1px solid rgba(0,0,0,0);
            cursor: pointer;
            margin-right: 8px;
            float:left;
            vertical-align: middle;
            padding:3px 10px;
            border-radius: 30px;
            &:last-child{
              margin: 0;
            }
          }
        }
      }
    }
    .i-body{
      height:auto;
      width:85%;
      /*border:1px solid red;*/
      margin:0 auto;



      &-item{
        /*border:1px solid green;*/
        width:100%;
        display: flex;
        justify-content: space-between;
        position: relative;
        /*align-items: center;*/
        margin-bottom: 1.5%;
        padding:1px;
        cursor: pointer;
        &:hover{
          h3{
            color:#ee5c59
          }
        }

        .collectbtn {
          width: 100px;
          height: 25px;
          text-align: center;
          display: block;
          position: absolute;
          background-color: #f23644;
          line-height: 25px;
          color: white;
          border-radius: 3px;
          margin-top: 10px;
          cursor: pointer;
          right: 10px;
          bottom: 3px;

          &.disabled {
            background-color: #999;
          }
        }
      }
      &-img{
        /*border:1px solid red;*/
        display: flex;
        width:15%;
        height:15vh;
        align-items: center;
        /*vertical-align: middle;*/
        background-size:100% 100%;
      }
      &-details{
        /*border:1px solid red;*/
        width:82%;
        height:100%;
        overflow: hidden;
        padding: 1px;
        h3{
          padding: 0;
          margin: 0;
          transition: .2s all;
          /*border:1px solid red;*/
          float:left;
        }
        p{
          /*border:1px solid red;*/

          color:#666;
          padding: 0;
          margin: 0;
          /*margin-top:2%;*/
          /*border:1px solid rgba(0,0,0,0);*/
          padding-right: .5%;
          padding-top: 6px;
          box-sizing: border-box;
          float:right;
          font-size: 14px;
        }
      }

      &-content{
        /*border:1px solid red;*/
        padding: 1px;
        display: block;
        margin-top:4%;
        padding-left: 1%;
        box-sizing: border-box;
        clear: both;
      }

    }

    .red{
      border:1px solid #ee5c59;
      background:#ee5c59;
      color:#fff;
    }
  }

</style>
