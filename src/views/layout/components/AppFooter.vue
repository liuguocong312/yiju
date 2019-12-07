<template>
    <footer class="footer">
        <div class="footer-main">
          <div class="footer-item">
            <div class="about">
              <dl>
                <dt>关于我们</dt>
                <dd><router-link to="/about">了解新移居</router-link></dd>
                <dd><router-link to="/about/joinus">招贤纳士</router-link></dd>
                <dd><router-link to="/about/privacy">隐私声明</router-link></dd>
                <dd><router-link to="/about/concact">联系我们</router-link></dd>
              </dl>
              <dl>
                <dt>服务内容</dt>
                <dd><a href="">migrantju.com</a></dd>
                <dd><a href="../house">海外房产</a></dd>
                <dd><a href="../immigrant">移民项目</a></dd>
              </dl>
              <dl>
                <dt>关注我们</dt>
                 <dd><a href="https://www.toutiao.com/c/user/100198846233/#mid=1603779000957956" target="_blank">新移居头条</a></dd>
                 <dd><a href="" >微信订阅号</a></dd>
                <dd><a href="https://m.migrantju.com" target="_blank">手机版网站</a></dd>
              </dl>
            </div>
            <div class="QRcode">
              <div>
                <img src="../../../assets/img/181113 _03.png" alt="">
                <span>微信公众号</span>
              </div>
               <div>
                 <!--<img style="width:140px" src="../../../assets/img/H5.jpg" alt="">-->
                 <img src="../../../assets/img/H5.jpg" alt="">
                <span>手机官网</span>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-low">
          <div class="relation">
            <p>
              <span style="color:#F00">400-8013-932</span>
              <span>全国统一服务热线( 24小时 )</span>
            </p>
            <p>
              邮箱: support@migrantju.com
            </p>
          </div>
          <div class="details">
            <p>Copyright &copy; 2018-2019 migrantju.com.All Rights Reserved. 广州移居网络科技有限公司</p>
            <p>
              <span style="cursor: pointer" @click="jump()">网站备案号：粤ICP备18018605号 </span>
              <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602005329" target="_blank"><img src="../../../assets/img/beian.png" alt="">粤公网安备44010602005329号</a>
            </p>
          </div>
        </div>
    </footer>
</template>

<script>
    import {protocol} from '@/api/protocol'
    export default {
        name: 'app-footer',
        data() {
            return {
              xieyi:'',
            }
        },
        mounted(){
          protocol().then(res=>{
            this.xieyi=res.body
          })
        },
        methods: {
          jump(){
            window.location.href= 'http://www.miitbeian.gov.cn/publish/query/indexFirst.action'
          },

          openHTML() {
            this.$message({
              type: 'success',
              showClose: true,
              message: this.xieyi
            });
          },

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $b:1px solid red;
  .footer{
    width: 100%;
    height: 500px;
    background: #1b1b1b;
    min-width: 1280px;
    font-size: 15px;
    &-main{
      background:url('../../../assets/img/footer.png') no-repeat  center;
      background-size:100% 100%;
      height:344px;
      padding-top: 1px;
    }
    &-item{
      vertical-align: middle;
      width:85%;
      margin:0 auto;
      margin-top:33px;
      display: flex;
      justify-content: space-between;
      .about{
        display: flex;
        margin-right: 40px;
        dl{
          color:#fff;
          font-size:14px;
          margin-right:118px;
          width:100px;
          dt{
            font-size:16px;
            margin-bottom: 50px;
          }
          dd{
            margin-left:4px;
            margin-bottom:27px;
            a:hover{
              color:#1477dd;
              display: block;
              transition:.3s all;
            }
          }

          &:nth-child(2){
            dd{
              margin-left: 13px;
            }
          }

          &:nth-child(3){
            margin-right: 0;
            dd{
              margin-left: 14px;

            }
          }
        }
      }

      .QRcode{
        display: flex;
        padding-top:14px;
        width:770px;
        justify-content: center;
        div{

          text-align: center;
          color:#fff;
          margin-right:55px;
          /*&:last-child{*/
            /*margin-right:0*/
          /*}*/
          img{
            width:120px;
            display: block;
            margin-bottom:20px
          }
        }
      }

    }
    &-low{
      width:85%;
      margin:0 auto;
      color:#999;
      margin-top:15px;
      .relation{
        display: flex;
        font-size: 15px;
        p{
          margin-right: 4.5%;

        }
      }
      .details{
        /*border:1px solid red;*/
        font-size:14px;
        display: flex;
        p{
          &:first-child{
            /*border:1px solid red;*/
            margin-right:8.5% ;
          }
          &:nth-child(2){
            width:500px;
            /*border:1px solid red;*/
            /*font-size: 16px;*/
            span{
              &:first-child{
                margin-right: 5%;
              }
              img{
                position:absolute;
              }
            }
          }
        }
      }
    }


  }
</style>
