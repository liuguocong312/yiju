<template>
    <div class="vip">
      <div class="navbox">
        <a><div class="navitem" :class="{'active':navActive==0}" @click="fetch(0)">委托收益</div></a>
        <a><div class="navitem"  :class="{'active':navActive==1}" @click="fetch(1)">房屋状况</div></a>
      </div>

      <div class="pdfbox">
          <template v-for="(i,k) in list">
                <div  :key="k" class="items" >
                <h3 >{{i.remark}} <span style="float:right;font-weight: normal;color:#666;font-size: 16px">{{i.createTime}}</span></h3>
                  <template v-for="(item,index) in i.filrUrl">
                      <iframe width="100%" height="700" v-if="item.split('.')[1]=='xlsx' || item.split('.')[1]=='xls'" :src="'https://view.officeapps.live.com/op/view.aspx?src='+IMG_URL+item" frameborder="0"></iframe>
                      <img :src="IMG_URL+item" v-else  :key="index" alt="">
                  </template>
                </div>
          </template>


        <!--<p class="arrow">-->

          <!--<span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</span>-->

          <!--<span class="turn2">{{currentPage}} / {{pageCount}}</span>-->

          <!--<span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">下一页</span>-->
        <!--</p>-->

        <!--<pdf-->
          <!--ref="PdfComponent"-->
          <!--:page="currentPage"-->
          <!--src="../../../static/test.pdf"-->
          <!--@num-pages="pageCount = $event"-->
          <!--@page-loaded="currentPage = $event"-->
        <!--&gt;</pdf>-->
      </div>
    </div>
</template>

<script>
  import {getVip} from '@/api/user'
    export default {
        name: 'vip',
        //components: {pdf},
        data() {
            return {
                navActive:0,
                currentPage: 1,
                pageCount: 1,
                list:[]
            }
        },
      mounted(){
            this.fetch(0);
      },
        methods: {

          fetch(type){
            getVip(type).then(res=>{
                //console.log(res);
                this.navActive=type;
                this.list=res.body;
            });
          }

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .vip{
    .navbox{
      height: 60px;
      background-color: white;
      box-shadow: 0px 2px 2px 1px #ccc;
      .navitem{
        height: 60px;
        padding: 0 37px;
        font-size: 22px;
        color: black;
        line-height: 60px;
        text-align: center;
        border-right: 0.5px solid #d0c4c4;
        float: left;
        &.active{
          color: white;
          background-color: #f34d4d;
        }
      }
    }

    .pdfbox{
      margin-top: 35px;
      padding: 20px;
      box-shadow: 0px 2px 2px 1px #ccc;
      background-color: white;
      .items{
        width:90%;
        margin:0 auto;
        border-bottom:1.5px dashed #ccc;
        padding: 20px 0;
        &:first-child{
          padding-top: 0;
        }
        &:last-child{
          border:0
        }
      }
      img{
        max-width: 100%;
      }
    }

    .arrow{
      text-align: center;
      padding: 20px ;
      -moz-user-select: none;
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      .turn{
        cursor: pointer;
        padding: 5px 10px;
        background-color: #f34d4d;
        border-radius: 5px;
      }
      .turn2{
        padding: 0 20px;
      }
    }
    .grey{
      color: #ccc;
    }
  }
</style>
