<template>
    <div class="collect">
      <div class="nav">
        <ul>
          <li :class="{'red':active==index}"  v-for="(item,index) in nav" @click="changeRed(index,item.val)">{{item.name}}</li>
        </ul>
      </div>
      <div class="main i-body">
        <div class="item" v-if="(active==0 || active==1)  && list.length>0" :key="index" v-for="(item,index) in list">
          <div class="img" v-if="active==0" :style="{'background-image':'url('+IMG_URL+item.projectImagePath+')'}">
            <router-link :to="'/house/detail?id='+item.id" style="display:block;width: 100%;height: 100%"></router-link>

          </div>
          <div class="img" v-else :style="{'background-image':'url('+IMG_URL+item.projectImagePath+')'}">
            <router-link :to="'/immigrant/detail?id='+item.id" style="display:block;width: 100%;height: 100%"></router-link>
          </div>
          <div class="recommend">
            <div class="title" v-if="active==0"><router-link :to="'/house/detail?id='+item.id">{{item.projectName}}</router-link></div>
            <div class="title" v-else><router-link :to="'/immigrant/detail?id='+item.id">{{item.projectName}}</router-link></div>
            <div class="content" v-if="active==0">
              <div v-if="item.categories!=null"><span>房产类型 :</span> {{item.categories.join(',')}}</div>
              <div v-if="item.houseType.length>0"><span>可选户型 :</span> {{item.houseType}}</div>
              <div><span>套内面积 :</span> {{item.houseArea}}</div>
              <div><span>交楼时间 :</span> {{item.houseDeliveryTime}}</div>
            </div>
            <div class="content" v-else>
              <div v-if="item.categories!=null"><span>办理周期 :</span>{{item. projectPeriod}} {{item.projectPeriodUnit}}</div>
              <div v-if="item.houseType.lenght>0"><span>移民类型: </span> {{item.houseType}}</div>
              <div><span>项目优势1 :</span> {{item.advantage1}}</div>
              <div><span>项目优势2 :</span> {{item.advantage2}}</div>
            </div>
          </div>
          <div class="price">
            <div class="sum">总价:<span>{{item.rmbconversion.toFixed(2)}}</span>万起 (人民币)</div>
            <div class="sum">{{item.priceCcy}}:{{item.minPriceAmt|cut}}万起</div>
            <button type="button" @click="del(item.id)">取消收藏</button>
          </div>
        </div>

          <div   class="i-body-item" v-for="(item,index) in list" v-if="active==2 && list.length>0" :key="index">
            <router-link :to="'/news/hot'+item.tagIds[0]+'/detail?id='+item.id+'&tagid='+item.tagIds[0]"><div class="i-body-img" :style="{'background-image':'url('+IMG_URL+item.articleImageUrl+')'}"><!--<img :src="item.entity.articleImage" alt="">--></div></router-link>
            <div class="i-body-details">
              <!--<a class="collectbtn"  :class="{'disabled':!item.clickable}" @click="collect($event,item.entity.id,item.clickable,index)">{{item.clickable?"收藏":"取消收藏"}}</a>-->
              <router-link :to="'/news/hot'+item.tagIds[0]+'/detail?id='+item.id+'&tagid='+item.tagIds[0]"><h3>{{item.title}}</h3></router-link>
              <p >{{item.createTime}}</p>
              <div class="i-body-content" >
                {{item.articleIntro}}

              </div>
              <a  class="cbutton" @click="cancelcollect($event,item.id)">取消收藏</a>
            </div>

          </div>


        <div class="item" v-if="active==3  && list.length>0" :key="index" v-for="(item,index) in list">
          <div class="img"  :style="{'background-image':'url('+IMG_URL+item.activityImage+')'}">
            <router-link :to="'/activity/detail?id='+item.id" style="display:block;width: 100%;height: 100%"></router-link>
          </div>
          <div class="recommend">
            <div class="title"><router-link :to="'/activity/detail?id='+item.id">{{item.activityName}}</router-link></div>
            <div class="content" >
              <div><span>国家名称 :</span> {{item.nationName}}</div>
              <div><span>活动类型 :</span> {{item.projectType}}</div>
              <div><span>活动地址 :</span> {{item.activityPlace}}</div>
            </div>
          </div>
          <div class="price">

            <button type="button" @click="cancelActivetyCollect(item.id)">取消收藏</button>
          </div>
        </div>


      </div>
      <div class="pagibox">
        <pagination align="right" v-model="pageInfo.pno" :changeHandle="pageChangeHandle" :maxPage="pageInfo.maxPage"></pagination>
      </div>
    </div>
</template>

<script>
  import pagination from '@/components/pagination/small2'
  import {myFavoriteProject,cancelFavProject} from '@/api/user'
  import {farticlelist,farticle} from '@/api/info'
  import {cancelCollect,collectList} from '@/api/activity'
    export default {
        name: 'collect',
        components: {
          pagination,
        },
        data() {
            return {
              active:0,
              nav:[
                {name:'海外购房',val:1},
                {name:'移民项目',val:0},
                {name:'移居文章',val:2},
                {name:'活动',val:3},
              ],
              pageInfo:{
                pno:1,
                maxPage:1,
                size:10
              },
              list:[]
            }
        },
        methods: {
          getlist(typeId,i){
              this.list=[];
              if(i==0 || i==1){
                let config={
                  projectType: typeId,
                  page:this.pageInfo.pno,
                  pageSize:this.pageInfo.size
                };

                myFavoriteProject(config).then(res=>{
                  this.list=res.body.records
                  this.pageInfo.pno=res.body.page;
                  this.pageInfo.maxPage=res.body.totalPages || 1;
                })
              }else if(i==2){

                farticlelist(this.pageInfo.pno).then(res=>{
                  this.list=res.body.records
                  this.pageInfo.pno=res.body.page;
                  this.pageInfo.maxPage=res.body.totalPages || 1;
                })

              }else if(i==3){
                collectList(this.pageInfo.pno).then(res=>{
                  this.list=res.body.records
                  this.pageInfo.pno=res.body.page;
                  this.pageInfo.maxPage=res.body.totalPages || 1;
                });
              }

          },

          changeRed(i,id){
            this.active=i
            this.pageInfo.pno=1;
            this.getlist(id,i)
          },
          cancelcollect(e,id){
            e.preventDefault();
            e.stopPropagation();
            this.$confirm('取消收藏?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              farticle(id).then(res=>{
                this.$message({
                  type: 'success',
                  message: '取消成功!'
                });

                this.getlist(this.nav[this.active].val,this.active);
              })
            }).catch(() => {

            });

          },

          cancelActivetyCollect(id){
            this.$confirm('取消收藏?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              cancelCollect(id).then(res=>{
                this.$message({
                  type: 'success',
                  message: '取消成功!'
                });

                this.getlist(this.nav[this.active].val,this.active);
              })
            }).catch(() => {

            });



          },

          pageChangeHandle(pno){
            this.pageInfo.pno=pno;
            this.getlist(this.nav[this.active].val,this.active);
            window.scrollTo(0,0)
          },

          del(id){
            this.$confirm('取消收藏?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              cancelFavProject(id).then(res=>{
                  this.$message({
                    type: 'success',
                    message: '取消成功!'
                  });

                  this.getlist(this.nav[this.active].val,this.active);
              })
            }).catch(() => {

            });
          }

        },

        mounted(){
          this.getlist(1,0)
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .collect{
    .nav{
      width:100%;
      height:83px;
      background:#fff;
      ul{
        padding:0;
        margin:0;
        border-bottom:2px solid rgba(0,0,0,0);
        overflow: hidden;
        font-size: 26px;
        height:100%;

        li{
          cursor: pointer;
          line-height:79px;
          /*border:1px solid red;*/
          float:left;
          margin-left: 8%;
        }
      }
    }
    .main{
      /*border:1px solid red;*/
      margin-top:30px;
      background:#fff;
      width:100%;
      height:100%;
      padding: 20px;

      .item{
        /*border:1px solid red;*/
        overflow: hidden;
        margin-top: 10px;

        >div{
          float:left;
        }
        .img{
          width:188px;
          height:125px;
          /*border:1px solid red;*/
          background:url('../../../assets/img/wechat.png') no-repeat;
          background-size: cover;
          margin-right: 20px;
        }
        .recommend{
          .title{
            font-weight: bold;
            font-size: 18px;

          }
          .content{
            /*border:1px solid red;*/
            padding: 1px;
            margin-top:6px;
            color:#929798;

            >div{
              margin:5px 0;
            }
          }
        }
        .price{
          /*border:1px solid red;*/
          float:right;
          text-align: right;
          color:#929798;
          margin-top: 17px;
          .sum{
            margin-bottom:10px;
            padding: 1px;
            span{
              font-size: 28px;
              font-weight: bold;
              color:red;
            }
          }

          button{
            width:100px;
            height:25px;
            display: block;
            border:1px solid #929798;
            background:none;
            border-radius: 3px;
            margin-top:10px;
            cursor: pointer;
            float:right
          }

        }
      }


      .i-body{
        position: relative;
        padding-top: 20px;
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

          .cbutton{
            width:100px;
            height:25px;
            display: block;
            border:1px solid #929798;
            background:none;
            border-radius: 3px;
            margin-top:10px;
            cursor: pointer;
            position: absolute;
            right: 5px;
            z-index: 888;
            text-align: center;
            line-height: 25px;
            bottom: 0;
          }
        }

        &-img{
          /*border:1px solid red;*/
          width: 188px;
          height: 125px;
          margin-right: 10px;
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
    }

    .pagibox{
      background:#fff;
      padding-left:20px ;
      padding-right:20px ;
    }
  }

  .red{
    color:red;
    border-bottom:2px solid red !important;
  }
</style>
