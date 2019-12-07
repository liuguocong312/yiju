<template>
    <div class="loan">
      <div class="header-box">
        我的贷款
      </div>
      <div class="main">
        <table border="1">
          <thead>
            <tr>
              <td>序号</td>
              <td>项目名称</td>
              <td>贷款合同</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td>{{item.fileId}}</td>
              <td v-if="item.projectType==1"><router-link :to="'/house/detail?id='+item.projectId">{{item.projectName}}</router-link></td>
              <td v-if="item.projectType==0"><router-link :to="'/immigrant/detail?id='+item.projectId">{{item.projectName}}</router-link></td>
              <td>{{item.loansTitle}}</td>
              <td>
                 <a type="button" target="_blank"  :href="IMG_URL+item.fileUrl"  class="btn open">打开</a>
                 <a class="btn" :href="'https://api2.migrantju.com/common/download?filename='+item.fileUUid" target="_blank" type="button">下载</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--<div class="pagibox">-->
        <!--<pagination align="right" v-model="pageInfo.pno" :changeHandle="pageChangeHandle" :maxPage="pageInfo.maxPage"></pagination>-->
      <!--</div>-->
    </div>
</template>

<script>
    import pagination from '@/components/pagination/small2'
    import {getLoans} from '@/api/user'
    export default {
        name: 'loan',
        components: {
          pagination
        },
        data() {
            return {
              pageInfo:{
                pno:1,
                maxPage:30,
                size:10
              },
              list:[]
            }
        },
        methods: {
          pageChangeHandle(pno){

          },
          getList(){
            getLoans().then(res=>{
                //xls 读取  微软接口
                //https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls
                this.list=res.body;
            })
          }

        },
      mounted(){
        this.getList();
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .loan{
    background:#fff;
    .header-box{
      /*border-bottom: 1px #b5b5b5 solid;*/
      height: 60px;
      font-size: 28px;
      color: red;
      padding-left: 30px;
      line-height: 60px;
    }

    .main{
      table{
        width:100%;
        border-collapse:collapse;
        border:1px solid #b5b5b5;

        tr{
          height:84px;
          text-align: center;
          td{
            &:first-child{
              width:10%;
              font-size: 18px;
            }
          }
        }

        tbody{
          tr{
            td{
              &:first-child{
                font-size: 32px;
              }
              a{
                &:hover{
                  color:#0067fe
                }
              }
              .btn{
                height:41px;
                width:57px;
                display: inline-block;
                text-align: center;
                line-height: 41px;
                border-radius: 8px;
                outline: none;
                color:#fff;
                border:0;
                font-size: 19px;
                font-weight: bold;
                cursor: pointer;
              }

              .open{
                background:#fe6700;
                margin-right: 10px;
              }

              .open+.btn{
                background:#fe0000
              }

            }
          }
        }

      }
    }

    .pagibox{
      /*border:1px solid red;*/
      padding-right: 25px;
      /*margin-top: 25px;*/
    }


  }
</style>
