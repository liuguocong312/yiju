<template>
  <div class="hot2">
    <div class="main_box">
      <ul class="list_container">
        <li v-for="(item,index) in list" :key="index">
          <div class="titlebox"> <router-link :to="'/news/hot'+tagId+'/detail?id='+item.entity.id+'&tagid='+tagId">{{item.entity.title}}</router-link></div>
          <div class="imgbox">
            <router-link :to="'/news/hot'+tagId+'/detail?id='+item.entity.id+'&tagid='+tagId">
              <img :src="IMG_URL+item.entity.articleImage" width="192" height="123" alt="">
            </router-link>
          </div>
          <div class="textbox">
            <p class="body">
              {{item.entity.articleIntro}} <router-link class="detail" :to="'/news/hot'+tagId+'/detail?id='+item.entity.id+'&tagid='+tagId">详情></router-link>
            </p>
            <div class="footer">
                <span class="author">作者:移居平台</span>

                <div class="good">
                  <a>
                    <img src="../../../assets/img/good.png" alt=""><span>{{item.entity.likeCount}}</span>
                  </a>
                </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagibox">
        <pagination  align="center" v-model="pageInfo.pno" :changeHandle="pageChangeHandle" :maxPage="pageInfo.maxPage"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import pagination from '@/components/pagination/small'
  import {infoList,farticle} from '@/api/info'
  export default {
    name: 'hot1',
    components: {pagination},
    data() {
      return {
        pageInfo:{
          pno:1,
          maxPage:1,
          size:10
        },
        list:[],
        tagId:0
      }
    },
    methods: {
      pageChangeHandle(pno){
        this.fetch(this.tagId,pno);
      },
      fetch(tagId,pno){
        infoList(tagId,pno).then(res=>{
          this.list = res.body.records;
          //this.pageInfo.pno=res.body.page;
          this.pageInfo.maxPage=res.body.totalPages || 1;
          this.pageInfo.size=res.body.pageSize;
          window.scrollTo(0,0)
        })
      }

    },
    mounted(){
      this.tagId = this.$route.path.split('hot')[1];
      this.fetch(this.tagId,this.pno);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .clearfloat{zoom:1}
  .main_box{

    .pagibox{
      height: 77px;

    }
    padding: 0 20px;

    ul,li{
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li{
      padding: 20px 0;
      border-bottom: 1px #ddd dashed;
      .titlebox{
        font-size: 15px;
        font-weight: bold;
        margin: 15px 0;
      }

      .imgbox{
        display: inline-block;
        vertical-align: top;
      }

      .textbox{
        display: inline-block;
        vertical-align: top;
        width: 560px;
        margin-left: 30px;
        font-size: 19px;
        position: relative;
        height: 123px;

        .body{
          font-size: 14px;
          color: #646567;
          margin: 0;
          /*display: -webkit-box;*/
          /*-webkit-box-orient: vertical;*/
          /*-webkit-line-clamp: 2;*/
          /*overflow: hidden;*/
          /*text-overflow: ellipsis;*/
          line-height: 23px;
          margin-bottom: 40px;
          text-indent: 28px;
          .detail{
            color: #bf1427;
          }
        }
        .footer{
          .author{
            font-size: 14px;
            font-weight: bold;
            position: absolute;
            left: 0;
            bottom:0;
          }
          .good{
            position: absolute;
            right: 0;
            bottom: 0;
            span{
              vertical-align: middle;
              color: #646567;
              font-size: 14px;
              margin-left: 3px;
            }
            img{
              vertical-align: middle;
            }
          }
        }



      }
    }



  }
</style>
