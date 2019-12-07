<template>
    <div class="invite">
      <div class="headerbox">推荐分享</div>
      <div class="main">
        <div class="qrcode"><img src="../../../assets/img/android.jpg" alt=""></div>
        <div class="my-code">
          <p>我的邀请码 <span>{{code}}</span></p>
          <p>让好友扫码一起来移民吧</p>
        </div>
      </div>
      <div class="icons">
        <icons></icons>
      </div>
      <div class="my-invite">
        <div class="headerbox">我的邀请</div>
        <div class="item" :key="index" v-for="(item,index) in list">
          <div class="portrait" v-if="item.portrait.length>37"><img :src="item.portrait" alt=""></div>
          <div class="portrait" v-else><img src="../../../assets/img/user.png" alt=""></div>
          <div class="name">{{item.name}}</div>
          <div class="city">城市:{{item.city}}</div>
          <div class="signature">{{item.signature}}</div>
          <el-button type="danger">已邀请注册</el-button>
        </div>
      </div>
      <div class="pagibox">
        <pagination align="right" v-model="pageInfo.pno" :changeHandle="pageChangeHandle" :maxPage="pageInfo.maxPage"></pagination>
      </div>
    </div>
</template>

<script>
  import pagination from '@/components/pagination/small2'
  import {inviteCode,InvitationList} from '@/api/invite'
    import icons from '@/components/iconBox'
    export default {
        name: 'invite',
        components: {
          icons,
          pagination
        },
        data() {
            return {
              pageInfo:{
                pno:1,
                maxPage:30,
                size:10
              },
              code:'',
              list:[
                {portrait:'',name:'',city:'',signature:''}
              ],
            }
        },
        methods: {
          pageChangeHandle(pno){
            this.getList(pno)
          },

          getList(pno){
            let that=this;
            InvitationList(pno).then(res=>{
             this.list=res.body.records.map(item=>{
               return {
                 portrait:that.IMG_URL+'/upload'+item.fileUrl,
                 name:item.nickName,
                 city:item.cityName,
                 signature:item.personalSignature
               }
             })
             this.pageInfo.maxPage=res.body.totalPages  || 1
            })
          }

        },
        mounted(){
          inviteCode().then(res=>{
            this.code=res.body
          })

          this.getList(this.pageInfo.pno)
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .invite{
    background:#fff;
    .headerbox{
      border-bottom: 1px #b5b5b5 solid;
      height: 60px;
      font-size: 28px;
      color: red;
      padding-left: 30px;
      line-height: 60px;
    }

    .main{
      /*border:1px solid red;*/
      height:233px;
      background:url('../../../assets/img/share.jpg') no-repeat;
      background-position:30px 45px;
      display: flex;
      .qrcode{
        width:108px;
        height:108px;
        margin-top: 40px;
        margin-left: 50px;
        margin-right: 45px;
        img{
          width:108px;
          height:108px;
        }
      }
      .my-code{
        margin-top:50px;
        color:#b5b5b5;
        span{
          font-size: 28px;
          color:red;
          margin-left: 10px;
        }
      }
    }

    .icons{
      background: #fff;
      height:70px;
      /*display: flex;*/
      border-bottom: 1px #b5b5b5 solid;
      padding-right: 2%;
      >div{
        float:right;
      }
    }

    .my-invite{

      font-size: 16px;
      .item{
        height:90px;
        display: flex;
        align-items: center;
        border-bottom:1px #b5b5b5 solid;
          div{
            width:20%;
          }
        .portrait{
          margin-left: 5%;
          img{
            width:60px;
            border-radius: 50%;
          }
        }
        .name{
          margin-right:94px
        }
        .city{
          margin-right:110px
        }
        .el-button{
          margin-right: 20px;
          margin-left: 50px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bolder;
        }
      }


    }


  }
</style>
