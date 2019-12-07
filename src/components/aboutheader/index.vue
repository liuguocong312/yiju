<template>
    <div class="about_header clearfloat">
      <h2 class="title">{{title}}</h2>

      <div class="service">
            <span class="vm">
              <i class="icon_phone"></i>

            </span>
            <span class="vm m10">
              <p class="phone">客服电话 <span>400-8013-932</span></p>
              <!--<p class="time">接听时间：工作日24小时</p>-->
            </span>
      </div>
    </div>
</template>

<script>

    export default {
        props:{
            title:{
                type:String,
                default:''
            }
        },

        name: 'about_header',
        components: {},
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .about_header{
      padding-bottom: 30px;
      border-bottom: 1px solid #eee;
      .title{
        font-weight: normal;
        margin-bottom: 0;
        display: inline;
        float: left;
        margin-top: 14px;
        line-height: 1;
        font-size: 24px;
      }
      .service{
        display: inline;
        float: right;
        width: 350px;
        text-align: right;
        line-height: 24px;
        .vm{

          &.m10{
            margin-left: 10px!important;
          }
          display: inline-block;
          vertical-align: middle;
          .icon_phone{
            width: 28px;
            height: 23px;
            background-position: -120px -1100px;
            display: inline-block;
            background-image: url(../../assets/img/about2.png);
            background-repeat: no-repeat;
            vertical-align: middle;
          }

          .phone{
            text-align: left;
            font-size: 16px;
            color: #333;
            margin: 0;
            padding: 0;
            span{
              margin-left: 5px;
              color: #c53101;
            }
          }
          .time{
            margin: 0;
            padding: 0;
            font-size: 12px;
            color: #999;
            text-align: left;
          }
        }
      }
    }
</style>
