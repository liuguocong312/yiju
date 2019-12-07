<template>
    <div class="assess">
        <div class="navbox">
          <a><div class="navitem" :class="{'active':navActive==0}" @click="navActive=0">移民评估</div></a>
          <a><div class="navitem"  :class="{'active':navActive==1}" @click="navActive=1">澳洲投资移民评估</div></a>
        </div>
        <div class="titlebox">
            <p>移民评估须知</p>
        </div>

        <div class="descbox">
            <p class="nortext">
              移民评估.是移民投资者在办理投资移民或者技术移民过程中的第一个步骤。参加移民评估,可以让移民专家全方便了解移民申请人的综合情况,它是移民专家和各国移民局判断申请
              人是否符合移民资格的一个重要参考。准确的移民评估结果,可以为下一步指定移民计划、递交移民申请,提供成功的移民保障。
            </p>
            <p class="subtext">以下表格,列出了《各国投资移民项目》的主要测试指标和分数,可供移民申请人在线自测:</p>
        </div>

        <div class="titlebox">
          <p>在线自测</p>
        </div>

        <div class="formbox">
              <!--<div class="fromtitle">-->
                 <!--<span class="dot"></span>-->
                  <!--申请人基本信息-->
              <!--</div>-->

              <!--<div class="input_box clearfloat">-->
                  <!--<div class="input_item">-->
                      <!--<span class="input_label"> <span class="red">*</span>姓名:</span>-->
                    <!--<div class="iuput_control">-->
                      <!--<input type="text" class="input_nor" v-model="name" placeholder="输入姓名">-->
                    <!--</div>-->
                  <!--</div>-->

                <!--<div class="input_item">-->
                  <!--<span class="input_label"> <span class="red">*</span>性别:</span>-->
                  <!--<div class="iuput_control">-->
                    <!--<input type="radio"  class="radio" v-model="currentValue" value="0"/>男-->

                    <!--<input type="radio" class="radio" v-model="currentValue" value="1"/>女-->
                  <!--</div>-->
                <!--</div>-->

                <!--<div class="input_item">-->
                  <!--<span class="input_label"> <span class="red">*</span>所在省份:</span>-->
                  <!--<div class="iuput_control">-->
                    <!--<select name="state" class="select" v-model="state" id="state">-->
                      <!--<option value="0">广东</option>-->
                      <!--<option value="1">北京</option>-->
                      <!--<option value="2">上海</option>-->
                    <!--</select>-->
                  <!--</div>-->
                <!--</div>-->

                <!--<div class="input_item">-->
                  <!--<span class="input_label"> <span class="red">*</span>所在城市:</span>-->
                  <!--<div class="iuput_control">-->
                    <!--<select name="city" class="select" v-model="city" id="city">-->
                      <!--<option value="0">深圳</option>-->
                      <!--<option value="1">美洲</option>-->
                      <!--<option value="2">广州</option>-->
                    <!--</select>-->
                  <!--</div>-->
                <!--</div>-->

                <!--<div class="input_item">-->
                  <!--<span class="input_label"> <span class="red">*</span>手机号:</span>-->
                  <!--<div class="iuput_control">-->
                    <!--<input type="text" class="input_nor" v-model="phone" placeholder="输入手机号">-->
                  <!--</div>-->
                <!--</div>-->

                <!--<div class="input_item">-->
                  <!--<span class="input_label"> <span class="red">*</span>验证码:</span>-->
                  <!--<div class="iuput_control">-->
                    <!--<div class="sms_box">-->
                      <!--<input type="text" class="sms" v-model="sms">-->
                      <!--<button class="sms_send">获取验证码</button>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->

                <!--<div class="input_item">-->
                  <!--<span class="input_label"> </span>-->
                  <!--<div class="iuput_control">-->
                    <!--<span class="subred">备注:手机号码,将用于接收评分结果,请准确填写!</span>-->
                  <!--</div>-->
                <!--</div>-->


              <!--</div>-->

            <div class="fromtitle">
              <span class="dot"></span>
              请根据以下提示,选择对应的答案,系统将为您进行在线测试,马上试试吧!
            </div>

          <ul class="selbox">
            <li v-for="(item,index) in qlist" :key="index">
              <span class="seltitle">{{index+1}}、{{item.labelName}}</span>
              <div>
                <template v-if="index==0" v-for="(i,k) in objects.immigrantNationList" >
                  <span class="chek"><input type="checkbox"  :id="'c'+k" :value="i.id" v-model="selcity"><label :for="'c'+k"></label><label :for="'c'+k">{{i.labelName}}</label></span>
                </template>

                <template v-if="index==1" v-for="(i,k) in objects.agesList" >
                  <span><input type="radio"  :id="'r1'+k" :value="i.id" v-model="selage"><label :for="'r1'+k">{{i.labelName}}</label></span>
                </template>

                <template v-if="index==2" v-for="(i,k) in objects.academicDegreeList" >
                  <span><input type="radio"  :id="'r2'+k" :value="i.id" v-model="seledu"><label :for="'r2'+k">{{i.labelName}}</label></span>
                </template>

                <template v-if="index==3" v-for="(i,k) in objects.professionList" >
                  <span><input type="radio"  :id="'r3'+k" :value="i.id" v-model="seljob"><label :for="'r3'+k">{{i.labelName}}</label></span>
                </template>

                <template v-if="index==4" v-for="(i,k) in objects.jobNameList" >
                  <span><input type="radio"  :id="'r4'+k" :value="i.id" v-model="selposition"><label :for="'r4'+k">{{i.labelName}}</label></span>
                </template>


                <template v-if="index==5" v-for="(i,k) in objects.managerialExperiencesList" >
                  <span><input type="radio"  :id="'r'+index+k" :value="i.id" v-model="selexp"><label :for="'r'+index+k">{{i.labelName}}</label></span>
                </template>

                <template v-if="index==6" v-for="(i,k) in objects.corporateStockList" >
                  <span><input type="radio"  :id="'r'+index+k" :value="i.id" v-model="selper"><label :for="'r'+index+k">{{i.labelName}}</label></span>
                </template>


                <template v-if="index==7" v-for="(i,k) in objects.familyAssetsList" >
                  <span><input type="radio"  :id="'r'+index+k" :value="i.id" v-model="selmoney"><label :for="'r'+index+k">{{i.labelName}}</label></span>
                </template>
              </div>
            </li>

          </ul>


           <!--<ul class="selbox">-->
              <!--<li>-->
                  <!--<span class="seltitle">1、您最想移民去哪个国家和地区?（可多选）</span>-->
                  <!--<div>-->
                    <!--<input type="checkbox" value="0" v-model="selcity">澳大利亚-->
                    <!--<input type="checkbox" value="1" v-model="selcity">希腊-->
                    <!--<input type="checkbox" value="2" v-model="selcity">新西兰-->
                    <!--<input type="checkbox" value="3" v-model="selcity">美国-->
                    <!--<input type="checkbox" value="4" v-model="selcity">加拿大-->
                    <!--<input type="checkbox" value="5" v-model="selcity">英国-->
                    <!--<input type="checkbox" value="6" v-model="selcity">新加坡-->
                    <!--<input type="checkbox" value="7" v-model="selcity">香港-->
                    <!--<input type="checkbox" value="8" v-model="selcity">葡萄牙-->
                    <!--<input type="checkbox" value="9" v-model="selcity">塞浦路斯-->
                    <!--<input type="checkbox" value="10" v-model="selcity">其他-->
                  <!--</div>-->
              <!--</li>-->

             <!--<li>-->
               <!--<span class="seltitle">2、您的年龄?（周岁）</span>-->
               <!--<div>-->
                 <!--<input type="radio" value="0" v-model="selage">18岁以下-->
                 <!--<input type="radio" value="1" v-model="selage">18-24岁-->
                 <!--<input type="radio" value="2" v-model="selage">25-32岁-->
                 <!--<input type="radio" value="3" v-model="selage">33-39岁-->
                 <!--<input type="radio" value="4" v-model="selage">30-44岁-->
                 <!--<input type="radio" value="5" v-model="selage">45-54岁-->
                 <!--<input type="radio" value="6" v-model="selage">55岁以上-->
               <!--</div>-->
             <!--</li>-->

             <!--<li>-->
               <!--<span class="seltitle">3、您的学历:</span>-->
               <!--<div>-->
                 <!--<input type="radio" value="0" v-model="seledu">高中以下-->
                 <!--<input type="radio" value="1" v-model="seledu">大专-->
                 <!--<input type="radio" value="2" v-model="seledu">本科-->
                 <!--<input type="radio" value="3" v-model="seledu">硕士及以上-->
                 <!--<input type="radio" value="4" v-model="seledu">国外学士学位-->
                 <!--<input type="radio" value="5" v-model="seledu">国外硕士学位以上-->
               <!--</div>-->
             <!--</li>-->


             <!--<li>-->
               <!--<span class="seltitle">4、您的职业:</span>-->
               <!--<div>-->
                 <!--<input type="radio" value="0" v-model="seljob">上班族-->
                 <!--<input type="radio" value="1" v-model="seljob">商人-->
                 <!--<input type="radio" value="2" v-model="seljob">公务员-->
                 <!--<input type="radio" value="3" v-model="seljob">军警-->
                 <!--<input type="radio" value="4" v-model="seljob">学生-->
                 <!--<input type="radio" value="5" v-model="seljob">教师-->
                 <!--<input type="radio" value="6" v-model="seljob">农民-->
                 <!--<input type="radio" value="7" v-model="seljob">自由职业-->
                 <!--<input type="radio" value="8" v-model="seljob">演艺文体-->
                 <!--<input type="radio" value="9" v-model="seljob">无业或待业-->
                 <!--<input type="radio" value="10" v-model="seljob">其他-->
               <!--</div>-->
             <!--</li>-->


             <!--<li>-->
               <!--<span class="seltitle">5、您的职位:</span>-->
               <!--<div>-->
                 <!--<input type="radio" value="0" v-model="selposition">普通员工-->
                 <!--<input type="radio" value="1" v-model="selposition">中层管理人员-->
                 <!--<input type="radio" value="2" v-model="selposition">高层管理人员-->
                 <!--<input type="radio" value="3" v-model="selposition">总经理-->
                 <!--<input type="radio" value="4" v-model="selposition">董事长-->
                 <!--<input type="radio" value="5" v-model="selposition">股东-->
                 <!--<input type="radio" value="6" v-model="selposition">企业主-->
                 <!--<input type="radio" value="7" v-model="selposition">店主-->
                 <!--<input type="radio" value="8" v-model="selposition">其他-->
               <!--</div>-->
             <!--</li>-->

             <!--<li>-->
               <!--<span class="seltitle">6、您参与企业经营管理的经验(有决策权的岗位):</span>-->
               <!--<div>-->
                 <!--<input type="radio" value="0" v-model="selexp">没有-->
                 <!--<input type="radio" value="1" v-model="selexp">1年以下-->
                 <!--<input type="radio" value="2" v-model="selexp">1-2年-->
                 <!--<input type="radio" value="3" v-model="selexp">2-3年-->
                 <!--<input type="radio" value="4" v-model="selexp">3-5年-->
                 <!--<input type="radio" value="5" v-model="selexp">5-10年-->
                 <!--<input type="radio" value="6" v-model="selexp">10年以上-->
               <!--</div>-->
             <!--</li>-->

             <!--<li>-->
               <!--<span class="seltitle">7、您在公司的股份有多少:</span>-->
               <!--<div>-->
                 <!--<input type="radio" value="0" v-model="selper">没有-->
                 <!--<input type="radio" value="1" v-model="selper">10%以下-->
                 <!--<input type="radio" value="2" v-model="selper">10-20%-->
                 <!--<input type="radio" value="3" v-model="selper">20-30%-->
                 <!--<input type="radio" value="4" v-model="selper">30-50%-->
                 <!--<input type="radio" value="5" v-model="selper">50%以上-->
                 <!--<input type="radio" value="6" v-model="selper">暗股/干股-->
                 <!--<input type="radio" value="7" v-model="selper">其他-->
               <!--</div>-->
             <!--</li>-->

             <!--<li>-->
               <!--<span class="seltitle">8、您的家庭资产约为:(包括房产、股票、现金、存款)(单位:人民币)</span>-->
               <!--<div>-->
                 <!--<input type="radio" value="0" v-model="selmoney">300万元以下-->
                 <!--<input type="radio" value="1" v-model="selmoney">300-400万元-->
                 <!--<input type="radio" value="2" v-model="selmoney">400-500万元-->
                 <!--<input type="radio" value="3" v-model="selmoney">500-1千万元-->
                 <!--<input type="radio" value="4" v-model="selmoney">1-5千万元-->
                 <!--<input type="radio" value="5" v-model="selmoney">5千万-1亿元-->
                 <!--<input type="radio" value="6" v-model="selmoney">1亿元以上-->
               <!--</div>-->
             <!--</li>-->

           <!--</ul>-->

            <div class="subbox">
                <a class="submit" :class="{'disabled':disabled}" @click="submit">提交评估</a>
            </div>

        </div>

        <div class="footerbox">
            <div>系统自动为您计算总分之后,会在1~3个工作日内,将测试结果发送到您的手机上,请耐心等候!</div>
            <div>如有疑问,可以在线咨询移民专家;也可以直接致电以下号码: <span class="redprice">400-8013-932</span></div>
        </div>

    </div>
</template>

<script>
    import {getIAQ,ImmigrantAssess,keepImmigrantAssess} from '@/api/user';
    export default {
        name: 'assess',
        components: {},
        data() {
            return {
                navActive:0,
                currentValue:"0",
                selcity:[],
                selage:-1,
                seledu:-1,
                seljob:-1,
                selposition:-1,
                selexp:-1,
                selper:-1,
                selmoney:-1,
                disabled:false,
                qlist:[],
                objects:[]

            }
        },
        methods: {
            submit(){
                if(this.disabled){
                  this.$message({
                    type:"error",
                    message:"请勿重复提交!"
                  });
                  return
                }

                if(this.selcity.length==0
                  || this.selage==-1
                  || this.seledu==-1
                  || this.seljob==-1
                  || this.selposition==-1
                  || this.selexp==-1
                  || this.selper==-1
                  || this.selmoney==-1
                ){
                    this.$message({
                      type:"error",
                      message:"请完整填写信息后再提交!"
                    });
                }

              keepImmigrantAssess(
                this.selcity,
                this.selage,
                this.seledu,
                this.seljob,
                this.selposition,
                this.selexp,
                this.selper,
                this.selmoney
              ).then(res=>{
                 if(res.header.code=="000"){
                   this.$message({
                     type:"success",
                     message:"保存成功"
                   });
                 }
              });

            }
        },
        mounted(){
          getIAQ().then(res=>{
              this.qlist=res.body.assessmentMatterList;
              this.objects=res.body;

            ImmigrantAssess().then(res=>{
                  let data = res.body;
                  for(let i of data.immigrantNationList){
                      if(i.selected){
                          this.selcity.push(i.id);
                          this.disabled=true;
                      }
                  }

                  for(let i of data.agesList){
                    if(i.selected){
                      this.selage=i.id;
                    }
                  }

                  for(let i of data.academicDegreeList){
                    if(i.selected){
                      this.seledu=i.id;
                    }
                  }

                  for(let i of data.professionList){
                    if(i.selected){
                      this.seljob=i.id;
                    }
                  }

                  for(let i of data.jobNameList){
                    if(i.selected){
                      this.selposition=i.id;
                    }
                  }

                  for(let i of data.managerialExperiencesList){
                    if(i.selected){
                      this.selexp=i.id;
                    }
                  }
                  for(let i of data.corporateStockList){
                    if(i.selected){
                      this.selper=i.id;
                    }
                  }
                  for(let i of data.familyAssetsList){
                    if(i.selected){
                      this.selmoney=i.id;
                    }
                  }
            })
          })
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .assess{

   .navbox{
      height: 60px;
      background-color: white;
      .navitem{
        height: 60px;
        padding: 0 37px;
        font-size: 32px;
        color: black;
        line-height: 60px;
        text-align: center;
        float: left;
        &.active{
          color: white;
          background-color: #f34d4d;
        }
      }
    }

  .titlebox{
    height: 68px;
    p{
      font-size: 20px;
      font-weight: bold;
      margin-top: 31px;
      margin-bottom: 0;
      border-left: 5px #c81823 solid;
      text-indent: 12px;
    }


    &:before{
      display: table;
      content: '';

    }
  }

  .descbox{
    height: 137px;
    background-color: white;
    padding: 0 20px;
    &:before{
      display: table;
      content: "";
    }
    .nortext{
      color: #666563;
      font-size: 13px;
      text-indent: 26px;
      line-height:20px ;
      margin-top: 27px;
    }
    .subtext{
      margin-top: 28px;
      color: #666;
      font-weight: bold;
      font-size: 13px;
    }
  }


  .formbox{
    background-color: white;
    padding: 25px 20px;

    padding-bottom: 0;

    .fromtitle{
      font-size: 17px;
      .dot{
          display: inline-block;
        width: 5px;
        height: 5px;
        background-color: #c81823;
        vertical-align: middle;
        margin-right: 7px;
      }

    }

    .input_box{
      width: 100%;
      padding: 20px 0;

      .input_item{
        width: 50%;
        &:nth-of-type(n+3){
          margin-top: 15px;
        }
        float: left;
        .input_label{
          display: inline-block;
          vertical-align: middle;
          width: 115px;
          text-align: right;
          padding-right: 15px;
          height: 35px;
          line-height: 35px;
          font-size: 15px;
          .red{
            color: red;
          }
        }
        .iuput_control{
          display: inline-block;
          line-height: 35px;
          height: 35px;
          vertical-align: middle;
          .subred{
            vertical-align: top;
            color: #c81823;
            font-size: 14px;
          }

          .input_nor{
            width: 300px;
            height: 35px;
            border: 1px #d8d8d8 solid;
            outline: none;
            text-indent: 10px;
          }
          .sms_box{
            width: 300px;
            height: 35px;
            border: 1px #d8d8d8 solid;
            line-height: 35px;
                .sms{
                  width: 205px;
                  height: 22px;
                  font-size: 15px;
                  border: none;
                  outline: none;
                  text-indent: 10px;
                }

            .sms_send{
              width: 85px;
              border: none;
              font-size: 13px;
              display: inline-block;
              background-color: #1879b0;
              color: white;
              height: 22px;
            }


          }

          .select{
            width: 300px;
            height: 35px;
            border: 1px #d8d8d8 solid;
            outline: none;
          }

          .radio:not(:nth-of-type(1)){
            margin-left: 20px;
          }

        }
      }

    }

    .selbox{
      margin: 35px 0;
      padding: 0;
      li{
        color: #656668;
        font-size: 16px;
        &:not(:nth-of-type(1)){
          margin-top: 25px;
        }
        .seltitle{
          color: black;
        }
        div{
          margin-top: 20px;
          overflow-wrap: break-word;
          input[type="checkbox"],input[type="radio"]{
            margin-right: 5px;

            &:not(:nth-of-type(1)){
              margin-left: 10px;
            }
          }


            input[type="checkbox"] + label{
              display: inline-block;
              border:1px solid #666;
              width: 20px;
              height: 20px;
              cursor: pointer;
              position:relative;
              top:3px;
              background: white;
              border-radius: 5px;
              margin-right: 5px;
            }

            input[type="checkbox"]:checked +label{
              display: inline-block;
              width: 20px;
              height: 20px;
              position:relative;
              top:-1px;
              outline: none;
            }

            input[type="checkbox"]:checked +label::before{
              display: block;
              content: "\2714";
              text-align: center;
              font-size: 16px;
              color: rgba(240, 84, 77, 1);
            }
            input[type="checkbox"] {
              position: absolute;
              clip: rect(0, 0, 0, 0);
          }



          input[type="radio"] + label::before {
            content: "\a0"; /*不换行空格*/
            display: inline-block;
            vertical-align: middle;
            font-size: 18px;
            width: 1em;
            height: 1em;
            margin-right: .4em;
            border-radius: 50%;
            border: 1px solid #666;
            text-indent: .15em;
            line-height: 1;
          }

          input[type="radio"]:checked + label::before {
            background-color: rgba(240, 84, 77, 1);
            background-clip: content-box;
            padding: .1em;
          }

          input[type="radio"] {
            position: absolute;
            clip: rect(0, 0, 0, 0);
          }

          span{
            margin-right: 15px;
            margin-top: 15px;
            display: inline-block;
            &:nth-of-type(-n+10){
              margin-top: 0;
            }
          }


        }
      }
    }

    .subbox{
      padding: 35px 100px;
      border-bottom: 1px #d8d8d8 solid;
      padding-bottom: 45px;
      .submit{
        width: 140px;
        height: 35px;
        display: block;
        text-align: center;
        line-height: 35px;
        background-color: #c91723;
        color: white;
        font-size: 17px;
        border: none;
        cursor: pointer;
        border-radius:3px;

        &.disabled{
          background-color: #999;
          color: white;
        }
      }
    }


  }

    .footerbox{
      height: 85px;
      background-color: white;
      &:before{
        display: table;
        content: "";
      }

      div{

        font-size: 15px;
        margin: 8px 20px;
        color: #b0b0b0;
        &:nth-of-type(1){
          margin-top: 20px;
        }
        .redprice{
          color: #cc0001;
          font-size: 24px;


        }
      }
    }
  }
</style>
