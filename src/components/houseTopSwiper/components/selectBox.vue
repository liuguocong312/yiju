<template>
  <div class="content">
    <div class="left">
      <h2 v-if="$route.path.indexOf('/house')!=-1">立即搜索 海外房产</h2>
      <h2 v-if="$route.path.indexOf('/immigrant')!=-1">立即搜索 移民项目</h2>
      <div class="select-box">
        <input type="text" placeholder="请输入国家/城市/项目名/学校名 找房" v-model="searchTxt">
        <button type="button" @click="fetch(searchTxt)">
          <span>
            <img src="../../../assets/img/search.png" alt="">
            <span>搜索</span>
          </span>
        </button>
        <!--<router-link to="/">帮我找房</router-link>-->
      </div>
      <!--<ul>-->
        <!--<li>热门搜索:</li>-->
        <!--<li><a href="">曼谷</a></li>-->
        <!--<li><a href="">普吉</a></li>-->
        <!--<li><a href="">伦敦</a></li>-->
        <!--<li><a href="">泰国</a></li>-->
        <!--<li><a href="">英国</a></li>-->
        <!--<li><a href="">投资房</a></li>-->
        <!--<li><a href="">首付低</a></li>-->
        <!--<li><a href="">总价低</a></li>-->
      <!--</ul>-->
    </div>
  </div>
</template>

<script>
    // import {list} from '@/api/house'
    export default {
        name: "select-box",
        data(){
          return {
            searchTxt:'',
          }
        },
        methods:{
          fetch(data){
            if(this.$route.fullPath=='/house'){
              this.$router.push('/house?item='+data);
            }else{
              this.$router.push('/immigrant?item='+data);
            }

          }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .content{
    width:1100px;
    /*border:1px solid red;*/
    margin:0 auto;
    color:#fff;
    overflow: hidden;
    padding-top: 20px;
    box-sizing: border-box;
    .left{
      /*border:1px solid #fff;*/
      float:left;
      h2{
        font-weight: bolder;
      }
      .select-box{
        /*border:1px solid blue;*/
        width:650px;
        height:45px;
        display: flex;
        input{
          height:100%;
          width:505px;
          outline: none;
          padding-left: 21px;
          box-sizing: border-box;
        }
        button{
          background:#ed5758;
          width:120px;
          border:0;
          color:#fff;
          font-weight: bolder;
          outline: none;
          position:relative;
          text-align: center;
          cursor: pointer;
          span{
            display: flex;
            align-items: center;
            justify-content: center;
            img{
              width:25px;
              height:25px;
            }
            span{
              font-size: 20px;
            }
          }

        }
        a{
          width:78px;
          text-align: center;
          display: flex;
          align-items: center;
          margin-left: 20px;
        }
      }
      ul{
        overflow: hidden;
        /*border:1px solid red;*/
        text-align: left;
        padding: 0;
        li{
          float:left;
          /*border:1px solid red;*/
          margin-right: 10px;

          &:last-child{
            margin-right: 0;
          }
          &:hover a {
            transition: .3s all;
            color:#ee5c59
          }
        }
      }
    }
  }

</style>
