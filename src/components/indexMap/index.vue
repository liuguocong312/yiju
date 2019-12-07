<template>
    <div class="indexMap">
        <div class="main_box">
            <div class="title">
                <span>移居覆盖全球超过1000+资产合作伙伴</span>
            </div>

            <div class="part_container">
                <ul class="part_tab">
                  <li :class="{'active':mapActive==index+1}" v-for="(item,index) in nationTab" @mouseover="change(index,item.val)">{{item.name}}</li>
                </ul>

                <ul class="part_content">
                    <li ><img style="width:100%" :src="'https://img2.migrantju.com/images/web/'+img+'.png'" alt=""></li>
                </ul>

            </div>

            <div class="map_container">
                  <div class="map"></div>
                  <div class="map_cover" v-show="mapActive==i+1" v-for="(item,i) in 4" :key="i" :class="{'active':mapActive==i+1}"></div>

                  <ul class="map_points">
                    <li :class="{'active':mapActive==1}">
                        <div class="points_item">
                          <div>亚洲</div>
                          <div>544</div>
                        </div>
                    </li>
                    <li :class="{'active':mapActive==2}">
                      <div class="points_item">
                        <div>北美</div>
                        <div>352</div>
                      </div>
                    </li>
                    <li :class="{'active':mapActive==3}">
                      <div class="points_item">
                        <div>欧洲</div>
                        <div>322</div>
                      </div>
                    </li>
                    <li :class="{'active':mapActive==4}">
                      <div class="points_item">
                        <div>大洋洲</div>
                        <div>306</div>
                      </div>
                    </li>
                  </ul>

            </div>


        </div>
    </div>


</template>

<script>


    export default {
        name: 'indexMap',
        computed: {},
        components: {},
        methods: {
          change(i,val){
            this.mapActive=i+1;
            this.img=val
          },
        },

        mounted(){

        },

        data(){

            return {
                mapActive:1,
                nationTab:[
                  {name:'亚洲',val:'Asia'},
                  {name:'北美',val:'America'},
                  {name:'欧洲',val:'Europe'},
                  {name:'大洋洲',val:'Oceania'},
                ],
                img:'Oceania'
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .indexMap{
      height: 500px;
      width: 100%;
      max-width: 1920px;
      min-width: 1280px;
      padding-top: 77px;
      background-color: #f5f5f5;
      .main_box{
        width: 1200px;
        margin: 0 auto;
        .title{
          color: #333;
          font-size: 24px;
          font-weight: 700;
          text-align: left;
          line-height: 1;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          margin-bottom: 37px;
        }

        .part_tab{
          list-style: none outside none;
          margin: 0;
          padding: 0;
          font-size: 0;
          position: relative;
          &:after{
            content: "";
            position: absolute;
            width: 100%;
            bottom: 1px;
            left: 0;
            height: 1px;
            background-color: rgba(0,0,0,.14);
          }
          li{
            font-weight: 700;
            user-select: none;
            display: inline-block;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
            font-size: 18px;
            color: #aaa;
            font-weight: 700;
            box-sizing: border-box;
            padding: 0 20px;
            border-bottom: 3px solid transparent;

            &.active{
              color: #ee5c59;

              border-bottom: 3px solid #ee5c59;
            }
          }
        }

        .part_content{
          font-size: 0;
          width: 486px;
          list-style: none outside none;
          margin: 0;
          padding: 0;
          li{
            display: inline-block;
            margin-right: 15px;
            /*margin-top: 17px;*/
            a{
              width: 147px;
              height: 67px;
              box-sizing: border-box;
              border: 1px solid #e5e5e5;
              background-color: #fff;
              display: block;
            }
          }
        }


        .map_container{
          margin-top: -15px;
          float: right;
          //margin-left: 530px;
          width: 670px;
          height: 314px;
          position: relative;
          .map{
            position: absolute;
            width: 669.9594px;
            height: 311.1312px;
            background: url(https://img2.migrantju.com/images/web/map_sprites.png) -691.9734px -333.1452px;
            background-size: 1369.2708px 977.4216px;
          }

          .map_points{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 2;
            margin: 0;
            list-style: none;
            padding: 0;
            li{
              margin: 0;
              list-style: none;
              position: absolute;
              display: none;
              width: 111px;
              height: 138px;
              line-height: 130px;
              box-sizing: border-box;
              padding: 0 10px;
              color: #fff;
              text-align: center;
              font-size: 20px;
              font-weight: 700;
              background: url('../../assets/img/point.png') no-repeat;
              background-size: cover;
              margin-left: -55px;
              margin-top: -69px;
              &:nth-of-type(1).active{
                left: 74%;
                top: 7%;
                display: block;
              }
              &:nth-of-type(2).active{
                left: 20%;
                top: -5%;
                display: block;
              }
              &:nth-of-type(3).active{
                left: 53%;
                top: -5%;
                display: block;
              }
              &:nth-of-type(4).active{
                left: 89%;
                top: 44%;
                display: block;
              }

              .points_item{
                display: inline-block;
                vertical-align: middle;
                line-height: 1.2;
              }

            }
          }

          .map_cover{
            position: absolute;
            width: 669.9594px;
            height: 311.1312px;
            background: url(https://img2.migrantju.com/images/web/map_sprites.png) -691.9734px -333.1452px;
            background-size: 1369.2708px 977.4216px;

            &:nth-child(2).active{
              z-index: 1;
              background-position: -7.338px -7.338px;
            }
            &:nth-child(3).active{
              z-index: 1;
              background-position: -691.9734px -7.338px;
            }
            &:nth-child(4).active{
              z-index: 1;
              background-position: -7.338px -333.1452px;
            }
            &:nth-child(5).active{
              z-index: 1;
              background-position: -7.338px -658.9524px;
            }

          }


        }

        .part_container{
          width: 530px;
          height: 330px;
          background-color: #fff;
          box-shadow: 0 4px 6px 0 rgba(0,0,0,.08);
          border-radius: 10px;
          padding: 0 27px;
          box-sizing: border-box;
          float: left;
          position: relative;
        }


      }

    }

</style>
