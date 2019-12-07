<template>
  <div class="recommend">
    <div class="r-head">
      <div class="left">
        <img src="../../assets/img/recommend.png" alt="">
        <span>房产推荐</span>
      </div>
      <div class="right">
        <ul >
          <li  v-for="(item, index) in newRlist" v-if="index<=6" @mouseenter="changeTab(index,item.id)"  :class="{'red':index==tabRed}">{{item.name}}</li>
          <router-link to="/house">全部 <img src='../../assets/img/right.png' alt=""></router-link>
        </ul>
      </div>
    </div>

    <div class="r-body" ref="rbody">
        <router-link :to="'/house/detail?id='+item.entity.id" class="r-body-item" v-for="(item, index) in detailsList" v-if="index<=7"  :key="index">
          <div class="top" :style="{'background-image':'url('+IMG_URL+item.entity.projectImagePath+')','height':remboxheight+'px'}">
            <div class="sell"><span>{{item.entity.projectStatus|sellState}}</span></div>
            <div class="country"><img src="../../assets/img/gpsIcon.png" alt=""><span>{{item.entity.nationName}}</span></div>
            <div class="price"><span>{{item.entity.minPriceAmt.split(",")[0]}}</span>{{item.entity.priceUnit}} {{item.entity.priceCcy}}</div>
            <div class="deceive">
              <template v-for="categories in item.entity.categories">
              {{categories}}
              </template>
            </div>
          </div>
          <div class="bottom">
            <p style="font-weight: bolder" :class="{'small-font':item.entity.projectName.length>=20}">{{item.entity.projectName}}</p>

              <p class="bottom-subtile">
                <template v-for="categories in item.entity.categories">
                {{categories}}
                </template>
                <!--{{item.entity.housingTypes}} <br>-->
                <!--{{item.entity.houseType}}-->
              </p>

            <p class="bottom-earnings"><span>最近一年涨幅{{item.entity.houseAnnualIncreasePercent}}%</span><span>预期回报{{item.entity.houseExpectedRecompense}}%</span></p>
            <p> {{item.entity.advantage1}}</p>
          </div>
        </router-link>
    </div>
  </div>
</template>

<script>
    import {recommend,choicenessList,sateList} from '@/api/recommend';

    export default {
        name: "index",
      data(){
          return {
            rList:[
              {name:'精选'}
            ],
            newRlist:'',
            tabRed:0,
            detailsList:[],
            remboxheight:255
          }
      },
      methods:{
        changeTab(index,id){
          this.tabRed=index;
          if(index==0){
            //精选
            choicenessList().then(res=>{

              this.detailsList=res.body.records
            })
          }else{
            //其他国家
            sateList(id).then(res=>{

              this.detailsList=res.body.records
            })
          }

        },
        resizebox(){
          if(this.$refs.rbody)
            this.remboxheight=this.$refs.rbody.offsetWidth*0.235*0.86;
        }
      },
      beforeDestroy(){
        window.removeEventListener('resize',this.resizebox)
      },

      mounted(){
        recommend().then(res=>{
          this.newRlist = this.rList.concat(res.body)
          this.resizebox();
          window.addEventListener('resize',this.resizebox);
        });

        choicenessList().then(res=>{
         this.detailsList=res.body.records
        })



      }

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .recommend{
    /*border:1px solid red;*/
    width: 100%;
    min-width: 1280px;
    max-width: 1920px;

    .r-head{
        width:85%;
        height:130px;
        /*border:1px solid blue;*/
        margin:0 auto;
        overflow: hidden;
      .left{
        height:130px;
        line-height: 130px;
        float:left;
        img{
          height:36px;
          vertical-align: middle;
        }
        span{
          vertical-align: middle;
          font-size: 24px;
          color: #333;
          font-weight: 700;
        }
      }
      .right{
        height:130px;
        float:right;
        ul{
          height:130px;
          overflow: hidden;
          margin:0;
          padding: 0;
          padding-top: 50px;
          box-sizing: border-box;
          /*border:1px solid red;*/
          a{
            position:relative;
            color:#666;
            /*border:1px solid red;*/
            font-size: 18px;
            top:6px;
            img{
              width:14px;
              height:14px
            }
          }
          li{
            border:1px solid rgba(0,0,0,0);
            cursor: pointer;
            margin-right: 5px;
            float:left;
            vertical-align: middle;
            padding:5px 10px;
            border-radius: 30px;
            &:last-child{
              margin: 0;
            }
          }
        }
      }

    }
    .r-body{
      height:auto;
      width:90%;
      // border:1px solid red;
      margin:0 auto;
      overflow: hidden;
      .r-body-item{
        width:23.5%;
        height:auto;
        .top{
          width:100%;
          /*border:1px solid red;*/
          height:28vh;
          background-size:100% 100%;
          position:relative;
          .country{
            /*border:1px solid blue;*/
            font-size: .7em;
            padding: 5px 10px;
            height:30px;
            line-height: 18px;
            display: block;
            background:rgba(0,0,0,.7);
            border-radius: 10px;
            float: right;
            margin-right: 2%;
            color:#fff;
            /*padding-left: 1%;*/

            align-items: center;
            box-sizing: border-box;
            img{
              width:15px;
              height:15px;
              vertical-align: middle;
              margin-right: 3px;
            }

            span{
              display: inline-block;
              vertical-align: middle;
              text-align: center;
              box-sizing: border-box;
              /*border:1px solid yellow*/
            }

          }
          .price{
            /*border:1px solid red;*/
            background:rgba(0,0,0,.6);
            position:absolute;
            color:#fff;
            bottom:0px;
            left:0px;
            font-size: 16px;
            height:7vh;
            width:18vh;
            padding-left: 3%;
            padding-top: 5%;
            box-sizing: border-box;
            span{
              font-size: 20px;
              font-weight: bold;
              margin-left: 5px ;
              margin-right: 5px ;
            }
          }
          .sell{
            float:left;
            width: 10px;
            height: 10px;
            border-top: 8vh solid #ee5c59;
            border-right: 8vh solid transparent;
            position:relative;
            font-size: .7em;
            span{
              position:absolute;
              text-align: center;
              top:-6.3vh;
              left:-1.2vh;
              font-size: .9em;
              /*border:1px solid red;*/
              width:8vh;
              color:#fff;
              transform: rotate(-45deg);
            }

          }
        }
        .bottom{
          font-size: .8em;
          &-subtile{
            padding-bottom: 10px;
            white-space: nowrap;
          }
          &-earnings{
            margin-bottom: 10px;
          }
        }

      }

      &-item{
        /*border:1px solid green;*/
        display: block;
        box-shadow:  0 0 8px #9c9899;
        margin-bottom: 2%;
        transition: .2s all;
        margin-right: 1.8%;
        float:left;
        &:nth-child(4), &:nth-child(8){
          margin-right: 0;
        }
        &:hover{
          transform: translate(0, -5px)
        }
        /*margin-right: 1%;*/
        .top{
          /*border:1px solid yellow;*/
          overflow: hidden;
          position:relative;
          .deceive{
            position:absolute;
            background:rgba(0,0,0,.5);
            width:100%;
            height:100%;
            top:0;
            right:0;
            color:#fff;
            justify-content:center;
            align-items:center;
            display: none;

          }
          img{
            width:100%;
            height:100%;
            transform: scale(1);
            transition: .4s all;
          }
          &:hover{
            img{
              transform: scale(1.1);
            }
            .deceive{
              display:flex;

            }
          }
        }
        .bottom{
          /*border:1px solid red;*/
          width:85%;
          margin:0 auto;
          &-subtile{
            /*border:1px solid red;*/
            color:#9c9899;
            border-bottom:1px solid #eee
          }
          &-earnings{

            display: flex;
            justify-content: space-between;
          }
          p:last-child{
            /*margin-bottom: 0;*/
            /*border:1px solid red;*/
            overflow: hidden;
            height:1.7vh;
            color:#9c9899
          }
        }
      }
    }
    .red{
      border:1px solid #ee5c59;
      background:#ee5c59;
      color:#fff;
    }

    .small-font{
      font-size: 10px !important;
    }
  }
</style>
