<template>
  <div class="join">
    <span @click="left"><img src="../../assets/img/left.png" alt=""></span>
    <div class="show-box">
      <ul v-if="applyUsers" :style="{'width':44*applyUsers.length+'px','left':(count*-44)+'px'}" ref="main">
        <li v-for="(item,index) in applyUsers" :key="index">
            <div class="cycle" :style="{'background-image':'url('+IMG_URL+item.avatarImg+')'}"></div>
        </li>
      </ul>
    </div>
    <span @click="right"><img src="../../assets/img/rightArrow.png"></span>

  </div>
</template>

<script>
    import {activityDetail} from "@/api/activityDetail";
    export default {
        name: "tpl",
        props:['applyUsers'],
        data(){
          return {
            count:0,
          }
        },
        methods:{
          right(){
            if(this.count>(this.applyUsers.length)-22)
                return
            this.count++;
          },
          left(){

            if(this.count<=0)
              return
            this.count--;

          },
        },
        mounted(){

        },
        updated(){

        }
    }
</script>

<style lang="scss" scoped>
  .join{
    /*border:1px solid blue;*/
    width:1000px;
    height:50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      cursor: pointer;
    }
    .show-box{
      display: inline-block;
      /*border:1px solid red;*/
      height:50px;
      width:925px;
      overflow: hidden;
      position: relative;

      ul{
        margin: 0;
        padding: 4px 0;
        /*border:1px solid yellow;*/
        overflow: hidden;
        width:100%;
        transition: .5s all;
        position: absolute;
        left: 0;

        li{
          float:left;
          width:40px;
          height:40px;
          margin-right:4px;
          .cycle{
            width:40px;
            height:40px;
            /*background:#666;*/
            border-radius: 50%;
            background-size:100% 100%;
          }

          &:nth-last-of-type(1){
            margin-right: 0;
          }

        }
      }
    }
  }
</style>
