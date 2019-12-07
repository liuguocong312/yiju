<template>
    <div class="breadcrumb">
      <div class="navlist">

        <router-link :style="{'color':color}" v-for="(item,index) in navList" :key="index" class="item" :to="item.to">{{item.name}}</router-link>
        <router-link :style="{'color':color}" v-if="title" class="item" :to="$route.fullPath">{{title}}</router-link>
        <!--<router-link class="item" to="/news">海外资讯</router-link>-->
        <!--<router-link class="item" to="/news/hot3">政策快讯</router-link>-->
        <!--<router-link class="item" to="/news/detail?aid=1">移居:澳洲人口突破2500万 房产市场长期繁荣</router-link>-->
      </div>
    </div>
</template>

<script>
    import {info} from '@/api/info'
    export default {
        name: 'breadcrumb',
        props:{
            title:{
                type:String,
            },
            color:{
                type:String,
                default:"#555"

            }

        },
        components: {},
        data() {
            return {
                routerItem:[],
                navList:[
                  {name:'移居',to:'/'}
                ],
                tagMap:[]
            }
        },
        methods: {
            getNavName(path){
                let tagName =  "";
                if(/hot[0-9]{0,2}/.test(path)){
                      let tagId = path.replace('hot','');
                      for(let i of this.tagMap){
                          if(i.id==tagId){
                            tagName=i.tagName
                          }
                      }
                }

                switch(path){
                  case 'news':
                    tagName="海外资讯";break;
                  case 'activity':
                    tagName="展会活动";break;
                  case 'house':
                    tagName="海外房产";break;
                  case 'immigrant':
                    tagName="移民项目";break;
                  default:break;
                }

              return tagName;
            }

        },
        mounted(){
            this.routerItem=this.$route.path.split('/');
            this.routerItem.splice(0,1);
            this.routerItem.pop();
            info().then(res=>{
              let tagMaps=[];
              tagMaps=res.body;
              tagMaps.push({id: 7, tagName: "成功案列",featured: true})
              this.tagMap=tagMaps;
              for(let i in this.routerItem){
                this.navList.push({
                      name:this.getNavName(this.routerItem[i])
                  });
              }
              for(let i in this.navList){
                if(i==1){
                  this.navList[i].to=this.navList[i-1].to+this.routerItem[i-1];
                }
                  if(i>1){
                    this.navList[i].to=this.navList[i-1].to+"/"+this.routerItem[i-1];
                  }
              }

            });

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navlist{
    padding: 20px 0;
    .item{
      color: #555;
      &:after{
        content: " > ";
        margin: 0 3px;
      }

      &:nth-last-of-type(1):after{
        display: none;
      }
    }

  }
</style>
