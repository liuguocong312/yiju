<template>
  <div class="pagination clearfloat" :style="{'text-align':align}">
    <ul class="pagi">

      <li :class="{'disabled':pno<=1}"  @click="change(pno-1)">上一页</li>
      <!--十页 -->
      <template v-if="maxPage<=10">
        <li v-for="(item,index) in maxPage" :class="{'active':pno==index+1}" @click="change(index+1)">{{index+1}}</li>
      </template>

      <template v-else-if="pno>=maxPage-4">

        <li class="po">...</li>
        <li :class="{'active':pno==maxPage-4}" @click="change(maxPage-4)">{{maxPage-4}}</li>
        <li :class="{'active':pno==maxPage-3}" @click="change(maxPage-3)">{{maxPage-3}}</li>
        <li :class="{'active':pno==maxPage-2}" @click="change(maxPage-2)">{{maxPage-2}}</li>
        <li :class="{'active':pno==maxPage-1}" @click="change(maxPage-1)">{{maxPage-1}}</li>
        <li :class="{'active':pno==maxPage}" @click="change(maxPage)">{{maxPage}}</li>
      </template>

      <template v-else-if="pno<=5">

        <li v-for="(item,index) in 10" :class="{'active':pno==index+1}" @click="change(index+1)">{{index+1}}</li>
        <li class="po">...</li>
      </template>

      <template v-else-if="pno>5">

        <li class="po">...</li>
        <li :class="{'active':pno==pno-2}" @click="change(pno-2)">{{pno-2}}</li>
        <li :class="{'active':pno==pno-1}" @click="change(pno-1)">{{pno-1}}</li>
        <li :class="{'active':pno==pno}" @click="change(pno)">{{pno}}</li>
        <li :class="{'active':pno==pno+1}" @click="change(pno+1)">{{pno+1}}</li>
        <li :class="{'active':pno==pno+2}" @click="change(pno+2)">{{pno+2}}</li>
        <li class="po">...</li>

      </template>

      <li :class="{'disabled':pno>=maxPage}"  @click="change(pno+1)">下一页</li>

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
        border: 1px solid #ffb04b;

        background: linear-gradient(white 50%, #fff5f3 50%,#ffd8b5 100%);
        padding: 4px 8px;
        text-align: center;
        float: left;
        font-size: 14px;
        color: #fe8445;
        margin-left:15px;
        cursor: pointer;
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select:none;
        -khtml-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;

        &.disabled{
          color: #c0bbb8;
          border: 1px solid #fe8d49;
        }

        &.active{
          color: #fe5917;
          border: 1px solid #fe8d49;
          background: #febb90;
        }
      }
    }
  }
</style>
