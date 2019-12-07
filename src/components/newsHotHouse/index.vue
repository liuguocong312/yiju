<template>
    <div class="hotHouse">
        <div class="box">
            <div class="titlebox">
                <span>热门推荐</span>
            </div>

            <ul class="aclist">
                <li v-for="(item,index) in list" :key="index" >
                    <a href="javascript:;" @click=jump(item.entity.id,item.entity.projectType)>
                      <img :src="IMG_URL+item.entity.projectImagePath" alt="">
                      <p class="title">{{item.entity.projectName}}</p>
                    </a>
                      <p class="price">
                        <span class="red"><span class="big">{{item.entity.minPriceAmt|cut}}</span>{{item.entity.priceUnit}}</span> （{{item.entity.priceCcy}}）
                      </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import {projectList,newslis} from '@/api/activity2'
    export default {
        name: 'hotHouse',
        components: {},
        data() {
            return {
              list:[],
            }
        },
        methods: {
          getList(){
            if(this.$route.fullPath=='/activity'){
              projectList(4,6).then(res=>{


                this.list=res.body.records
              });
            }else{
              projectList(3,6).then(res=>{
                // console.log(res);
                this.list=res.body.records
              });
            }

          },

          jump(id,typeId){
            if(typeId==0){
              this.$router.push({path:'/immigrant/detail',query:{id:id}})
            }else{
              this.$router.push({path:'/house/detail',query:{id:id}})
            }
          },
        },
        watch:{
          '$route':function(){this.getList()}
        },
        mounted(){
          this.getList()

        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
      .box{
        float: right;
        width: 300px;
        background-color: #fff;

        .titlebox{
          height: 69px;
          border-bottom: 1px solid #ccc;
          span{
            font-size: 20px;
            display: inline-block;
            height: 69px;
            line-height: 69px;
            margin-left: 50px;
            border-bottom: 1px #f13744 solid;
            width: 45px;
            overflow: visible;
            white-space: nowrap;
            text-indent: -18px;
          }
        }

        .aclist{
          list-style: none;
          margin: 0;
          padding: 0;
          li{
            list-style: none;
            margin: 0;
            padding: 20px;
            padding-bottom: 0;

            img{
              display: block;
              width: 100%;
            }

            .title{
              font-size: 15px;
              margin-top: 24px;
              margin-bottom: 12px;
            }
            .price{
              color: #a29398;
              margin-top: 0;
              .red{
                  color: #e63d66;
                .big{
                    font-size: 24px;
                }
              }
            }
          }
        }

      }
</style>
