<template>
    <div class="order">
        <div class="headerbox">
            我的订单
        </div>

      <div class="navbar">
          <a :class="{'active':navAcitve==index}" v-for="(item,index) in nav" @click="tab(index,item.val)">{{item.name}}</a>
      </div>

      <div class="tablebox">

          <table cellspacing="0">
              <tr>
                <th width="98">创建日期</th>
                <th width="140">订单号</th>
                <th width="203">项目名称</th>
                <th width="154">投资额</th>
                <th width="112">定金额</th>
                <th width="103">交易状态</th>
                <!--<th width="126">交易操作</th>-->
              </tr>


                  <tr v-for="(i,k) in list" :key="k">
                    <td>{{i.createTime}}</td>
                    <td>{{i.orderNo}}</td>
                    <td>
                      <div class="textbox">
                          {{i.projectName}}
                      </div>
                    </td>
                    <td>
                      <div class="price1">RMB:{{i.rmbconversion}}{{i.totalAmtPriceUnit}}元</div>
                      <div class="price2">约{{i.totalAmtCcy}}: {{i.totalAmt }}{{i.totalAmtPriceUnit}}元</div>
                    </td>
                    <td><span class="price">{{i.depositAmt}}元</span></td>
                    <td :style="{'color':getColor(i.orderStatus)}">{{i.orderStatus|orderStatus}}</td>
                    <!--<td>-->
                      <!--<div><router-link to="/" :style="{'color':getColor('查看订单')}" >查看订单</router-link></div>-->
                      <!--<div><router-link to="/" :style="{'color':getColor('发表评价')}" >发表评价</router-link></div>-->
                    <!--</td>-->
                  </tr>


          </table>

        <div class="pagibox">
          <pagination align="right" v-model="pageInfo.pno" :changeHandle="pageChangeHandle" :maxPage="pageInfo.maxPage"></pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import pagination from '@/components/pagination/small2'
  import {orders} from '@/api/myorder'
    export default {
        name: 'order',
        components: {pagination},
        data() {
            return {
                navAcitve:0,
                pageInfo:{
                  pno:1,
                  maxPage:30,
                  size:10
                },
                nav:[
                  {name:'所有订单',val:""},
                  {name:'待付款',val:'PAYING'},
                  {name:'已付款',val:'PAID'},
                  {name:'服务中',val:'ONGOING'},
                  {name:'已完成',val:'DONE'},
                  {name:'退款中',val:'REFUND'},
                  {name:'已关闭',val:'CLOSED'},
                ],
              list:[],
              type:"",
            }
        },
        methods: {
          pageChangeHandle(pno){
            this.getList(this.type,pno)
          },

          tab(i,val){
            this.navAcitve=i;
            this.type=val
            this.getList(val,this.pageInfo.pno)
          },

          getList(val,pno){
            orders(val,pno).then(res=>{
             this.list=res.body.records
              this.pageInfo.maxPage=res.body.totalPages || 1
            })
          },

          getColor(text){
            switch(text){
              case 5:return "#666";break;
              case "查看订单":return "#5f86ff";break;
              case 1:return "#5f86ff";break;
              case 0:return "#fe5b00";break;
              case 3:return "#d427fb";break;
              case 4:return "#fe724f";break;
              default:return "black";
            }
          }


        },

        mounted(){
          this.getList("",this.pageInfo.pno)
        },



    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
      .order{
        background:#fff;
      }
      .headerbox{
        border-bottom: 1px #b5b5b5 solid;
        height: 60px;
        font-size: 28px;
        color: red;
        padding-left: 30px;
        line-height: 60px;
      }
    .navbar{
      height: 49px;
      background-color: #cccccc;
      a{
        display: block;
        float: left;
        height: 49px;
        font-size: 17px;
        text-align: center;
        line-height: 49px;
        padding: 0 23px;
        border-right: 1px solid white;
        &.active{
          background-color: white;
          border-bottom: 4px solid red;
        }
      }

    }

  .tablebox{
    /*border:1px solid red;*/
    min-height: 848px;
    table,table tr th, table tr td { border:0.3px solid #b4b4b4; }
    tr{
      td:not(:nth-last-of-type(1)),th:not(:nth-last-of-type(1)){
        border-right: none;
      }
      th{
        height: 36px;
        font-size: 15px;
      }
      td{
        height: 73px;

        text-align: center;
        font-size: 12.5px;
        .textbox{
          display: -webkit-box;
          font-size: 14px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        div:nth-of-type(2){
         margin-top: 5px;
        }

        .price1,.price2{
          font-size: 15px;
        }
        .price1{
          color: red;
        }
        .price2{
          color: #ce1010;
        }
        .price{
          font-size: 15px;
        }

      }
    }

    tr:not(:nth-last-of-type(1)){
      td,th{
        border-bottom: none;
      }
    }
    table{
      width: 100%;
      margin-top: 10px;
    }
  }

  .pagibox{
    padding-right: 25px;
  }
</style>
