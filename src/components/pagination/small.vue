<template>
  <div class="pagination clearfloat" :style="{'text-align':align}">
    <ul class="pagi">
      <li :class="{'disabled':pno<=1}" @click="change(1)">首页</li>
      <li :class="{'disabled':pno<=1}"  @click="change(pno-1)">上一页</li>
      <!--十页 -->
      <template v-if="maxPage<=6">
        <li v-for="(item,index) in maxPage" :class="{'active':pno==index+1}" @click="change(index+1)">{{index+1}}</li>
      </template>

      <template v-else-if="pno>=maxPage-1">
        <li :class="{'active':pno==1}" @click="change(1)">{{1}}</li>
        <li class="po">...</li>
        <li :class="{'active':pno==maxPage-2}" @click="change(maxPage-2)">{{maxPage-2}}</li>
        <li :class="{'active':pno==maxPage-1}" @click="change(maxPage-1)">{{maxPage-1}}</li>
        <li :class="{'active':pno==maxPage}" @click="change(maxPage)">{{maxPage}}</li>
      </template>

      <template v-else-if="pno<=3">
        <!--前五-->
        <li v-for="(item,index) in 3" :class="{'active':pno==index+1}" @click="change(index+1)">{{index+1}}</li>
        <li class="po">...</li>
        <li :class="{'active':pno==maxPage}" @click="change(maxPage)">{{maxPage}}</li>
      </template>

      <template v-else-if="pno>3">
        <!--前五-->
        <li :class="{'active':pno==1}" @click="change(1)">{{1}}</li>
        <li class="po">...</li>

        <li :class="{'active':pno==pno-1}" @click="change(pno-1)">{{pno-1}}</li>
        <li :class="{'active':pno==pno}" @click="change(pno)">{{pno}}</li>
        <li :class="{'active':pno==pno+1}" @click="change(pno+1)">{{pno+1}}</li>
        <li class="po">...</li>
        <li :class="{'active':pno==maxPage}" @click="change(maxPage)">{{maxPage}}</li>
      </template>

      <li :class="{'disabled':pno>=maxPage}"  @click="change(pno+1)">下一页</li>
      <li :class="{'disabled':pno>=maxPage}" @click="change(maxPage)">末页</li>
    </ul>
  </div>
</template>

<script>


  export default {
    name: 'pagination-small',
    model: {
      // 使用model， 这儿2个属性，prop属性说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）
      // v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
      prop: 'pno',
      event: 'changepno'
    },
    props: {
      pno: '',
      maxPage:'',
      changeHandle:'',
      align:{
          type:String,
          default:'right'
      }
    },
    methods:{

      change(pno){
        if(pno<1 || pno>this.maxPage){
          return
        }
        this.$emit('changepno',pno);
        this.changeHandle(pno);
      }
    },

    data() {
      return {}
    },
    computed: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .pagination{
    width: 100%;

    .pagi{

     display: inline-block;
      padding: 0;
      margin-top: 25px;
      li{
        border: 1px solid #dfdfdf;
        background-color: white;
        padding: 6px 15px;
        text-align: center;
        float: left;
        margin-left:15px;
        cursor: pointer;
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select:none;
        -khtml-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;
        &.po{
          border: none;
          cursor: inherit;
          background-color: transparent;
        }
        &.disabled{
          color: #ccc;
          border: 1px solid #dfdfdf;
          background-color: #f2f2f2;
        }

        &.active{
          color: white;
          border: 1px solid #f23644;
          background-color: #f23644;
        }
      }
    }
  }
</style>
