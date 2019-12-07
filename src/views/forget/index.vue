<template>
  <div class="forget">
    <div class="content">
      <h2>找回密码</h2>
      <!--<div class="find">-->
          <!--<div class="item"><span>手机号:</span><input type="text"> </div>-->
          <!--<div class="item"><span>验证码:</span><input type="text"> <button type="button">获取验证码</button></div>-->
          <!--<div class="item"><span>新密码:</span><input type="text"></div>-->
          <!--<div class="item"><span>确认密码:</span><input type="text"></div>-->
          <!--<el-button type="danger" class="reset">确定</el-button>-->
      <!--</div>-->

      <div class="find">
      <el-form ref="findform" label-width="80px"  :rules="rule"  :model="findpwd">
        <el-form-item label="账号" prop="user">
          <el-input v-model="findpwd.user"  autofocus="true" placeholder="请输入手机号码或邮箱"></el-input>
        </el-form-item>
        <el-form-item class="get-vcode" label="验证码" prop="vcode" >
          <el-input   class="get-vcode-ipt" v-model="findpwd.vcode"   autofocus="true" placeholder="请输入验证码"></el-input>


          <button class="get-vcode-btn" :disabled="disabledgetvcode" :class="{'disabled':disabledgetvcode}" @click="getvCode"  type="button">
            {{disabledgetvcode?'重新获取('+distime+')':'获取验证码'}}
          </button>

        </el-form-item>
        <el-form-item label="密码" prop="password"  >
          <el-input type="password" v-model="findpwd.password"   autofocus="true" placeholder="请输入密码"></el-input>
        </el-form-item>


        <el-form-item label="确认密码" prop="cpassword">
          <el-input autofocus="true" v-model="findpwd.cpassword"  type="password" placeholder="请确认密码"></el-input>
        </el-form-item>

        <el-form-item >
          <el-button  type="danger" @click="findpwds">确定</el-button>
        </el-form-item>



      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {phoneReg,emailReg} from '@/utils/validate'
  import {validateEoP,getCode,forgetPassword} from '@/api/user'
    export default {
        name: "findpwd",
      data(){

        const validateUsername = (rule, value, callback) => {

            if (!value) {
              callback(new Error("账号不能为空"));
            } else {
              if (phoneReg(value) || emailReg(value)) {
                validateEoP(value).then(res=>{
                    callback();
                }).catch(res=>{
                  //console.log(res)
                  callback(new Error(res));
                })
                //callback();
              } else {
                callback(new Error("请输入正确的账号,手机号码或邮箱"));
              }
            }
          };
        const validatePwd = (rule, value, callback) => {

          if (!value) {
            callback(new Error("密码不能为空"));
          }else if(value.length<6){
            callback(new Error("密码长度必须大于6位"));
          }
          callback();
        };
        const validatecPwd = (rule, value, callback) => {

          if (!value) {
            callback(new Error("密码不能为空"));
          }else if(value.length<6){
            callback(new Error("密码长度必须大于6位"));
          }else if(value!==this.findpwd.password){
            callback(new Error("两次密码不一致"));
          }
          callback();
        };
          return {

              rule: {
                user: [{ required: true, validator: validateUsername, trigger: "blur" }],
                password:[{ required: true, trigger: "blur" , validator: validatePwd}],
                cpassword:[{ required: true, trigger: "blur" , validator: validatecPwd, message:"两次密码不一致"}],
                vcode:[{ required: true, message: '请输入正确验证码', trigger: 'change',}]
              },
            findpwd:{
              user:'',
              cpassword:'',
              password:'',
              vcode:''
            },
            disabledgetvcode:false,
            distime:60,
            timer:null,

          }
        },
      methods:{
        getvCode(){
          this.$refs.findform.validateField('user', (p) =>{
              //console.log(p)
            if(p==""){
              getCode(this.findpwd.user).then(res=>{
                if(res.header.code=="000"){
                  this.disabledgetvcode=true;
                  this.timer=setInterval(()=>{
                    this.distime--;
                    if(this.distime==0){
                      clearInterval(this.timer);
                      this.timer=null;
                      this.disabledgetvcode=false;
                      this.distime=60;
                    }
                  },1000);
                }
              })
            }
          })
        },
        findpwds(){
          this.$refs.findform.validate(valid => {

            if(valid){
                  forgetPassword(
                      this.findpwd.user,
                      this.findpwd.vcode,
                      this.findpwd.password,
                      this.findpwd.cpassword
                  ).then(res=>{
                      if(res.header.code=="000"){
                        this.$message({
                          message: '密码修改成功,请重新登录',
                          type: 'success'
                        });
                        this.$router.push("/");
                      }
                  })

                }else {
                  console.log('error submit!!')
                  return false
                }
          });
        }
      }


    }
</script>

<style scoped lang="scss">
 .forget{
   background-color: #f5f5f5;
   width: 100%;
   min-width: 1280px;
   max-width: 1920px;
   /*height:400px;*/
   padding: 1px;
   .content{
     width:1200px;
     margin:30px auto ;
     /*border:1px solid red;*/
     /*box-shadow: 0px 0px 3px #666;*/
     background:#fff;
     color:#333;
     padding: 1px;
     h2{
       text-align: center;
       color:#f56c6c;
       /*font-weight: normal;*/
       margin:20px 0;
       margin-top: 30px;
     }
     .find{
       width:400px;
       margin:0 auto;
       height:300px;
       /*margin-top: 10px;*/
       /*border:1px solid red;*/
       /deep/ .el-form-item{
         width:83%;
         margin:0 auto;
         /*border:1px solid blue;*/
         /*text-align: center;*/
         font-size: 14px;
         margin-bottom: 20px;
         span{
           display: inline-block;
           width:65px;
           letter-spacing: 3px;
         }
         .el-input__inner{
           outline: none;
           width: 240px;
           height: 34px;
           border: 1px solid #eee;
           padding: 0 10px;

           border-radius: 5px;
           transition:.5s all;
          &:focus{
             border:1px solid #ca0000;
             background:#fdf8f8;
           }
         }

          &:nth-child(2){
            white-space: nowrap;
           .el-input__inner{width:140px}
            .el-input{width: 140px}
           button{
             display: inline-block;
             margin-left: 10px;
             height:34px;
             background:#f56c6c;
             border:0;
             border-radius: 3px;
             font-size: 14px;
             color:#fff;
             outline: none;
             cursor: pointer;

             &.disabled{
               color:#ccc;
               background:rgba(0,0,0,0);
               border:1px solid #ccc;
             }
           }
         }

         &:nth-child(4){
           span{letter-spacing: 0px;}
         }

       }
       .reset{
         width:80%;
         display: block;
         margin:0 auto;
         margin-top:40px;

       }
     }
   }
 }
</style>
