<template>
  <div class="right-nav">
    <ul>
      <li @click="openDialog()">
        <span>
          <img src="../../../assets/img/181113 _01.png" alt="">
          <i>在线客服</i>
        </span>
      </li>
      <li>
        <a>
          <p>移居客服电话:</p>
          <p>400-8013-932</p>
        </a>
        <span>
          <img src="../../../assets/img/181113 _02.png" alt="">
          <i>客服电话</i>
        </span>
      </li>
      <!-- <li>
        <a> <img src="../../../assets/img/wechat_04.jpg" alt=""></a>
        <span>
          <img src="../../../assets/img/181113 _03.png" alt="">
          <i>移居公众号</i>
        </span>
      </li> -->
      <li id="toTop" @click="toTop">
        <span>
          <img src="../../../assets/img/top.png" alt="">
          <i>回到顶部</i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  let timer = null //定义初始值
  export default {
    name: "AppRightNav",
    props: {
      step: { //此数据是控制动画快慢的
        type: Number,
        default: 100
      }
    },

    methods: {
      openDialog() {
        if (window.openModel == 'ok') {
          _MEIQIA('showPanel')
        } else {
          this.$message({
            message: '移民专家正在服务中，请稍等或刷新后重试！专家热线：020-87085113，客服：400-8013-932',
            type: 'warning'
          });
        }

      },

      toTop() { // 动画
        timer = setInterval(function () {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          let ispeed = Math.floor(-osTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          this.isTop = true
          if (osTop === 0) {
            clearInterval(timer)
          }
        }, 30)

      },

    },

    created() {
      let that = this;
      window.onscroll = function () {
        if (document.documentElement.scrollTop > 60) {
          that.isActive = true;
        } else {
          that.isActive = false;
        }
      }
    },

  }

</script>

<style lang="scss" scoped>
  .right-nav {
    /*border:1px solid red;*/
    position: fixed;
    top: 340px;
    right: 20px;
    z-index: 99;
    width: 65px;
    min-height: 200px;

    ul {
      padding: 0;
      margin: 0;

      li {
        cursor: pointer;

        /*margin-bottom: 5px;*/
        &:last-child {
          span {
            border: 0
          }
        }

        &:nth-child(3) {
          a {
            align-items: center;
            bottom: 40px;
            height: 120px;
            width: 120px;

            img {
              height: 100px;
            }
          }
        }

        a {
          display: none;
          position: absolute;
          background: #353c50;
          justify-content: center;
          /*border:1px solid blue;*/
          height: 70px;
          width: 120px;
          right: 80px;
          bottom: 65px;
          color: #fff;
          font-size: 14px;
          padding: 8px;
          border-radius: 5px;
          flex-wrap: wrap;

          &:after {
            position: absolute;
            content: '';
            /*border:1px solid red;*/
            width: 10px;
            height: 10px;
            right: -9px;
            top: 43%;
            /*border:1px solid blue;*/
            background: url("../../../assets/img/rigihtNav.png") no-repeat;
            background-position: center;
            background-size: 100%;
          }

          p {
            margin: 0;
            text-align: center;

            &:first-child {
              margin: 5px 0px;
            }
          }
        }

        span {
          display: flex;
          width: 65px;
          height: 65px;
          background: #f23742;
          border-bottom: 2px solid #fff;
          box-sizing: border-box;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          img {
            width: 35px;
          }

          i {
            display: block;
            font-style: normal;
            font-size: 12px;
            color: #fff;
          }
        }

        &:hover {
          a {
            display: flex !important;
          }

          span {
            background: #353c50;
          }
        }
      }
    }
  }

</style>
