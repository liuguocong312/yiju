<template>
  <div class="dialog">
    <div class="dialog-item" :class="{'reg':!this.$store.state.commn.hideReg==true}">
      <div v-if="this.$store.state.commn.hideReg">
        <h3>个人移民者</h3>
        <el-form ref="form" label-width="80px"   :model="form">
          <el-form-item label="账号"  >
            <el-input v-model="form.username" autofocus="true" placeholder="请输入手机号码或邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" >
            <el-input type="password" v-model="form.password" autofocus="true" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="options">
            <span><input type="checkbox" > 记住密码</span>
            <a @click="forget">忘记密码?</a>
          </div>
          <el-button type="danger" @click="logins(form)">登录</el-button>
        </el-form>
        <div class="register">
          <button type="button" @click="hideReg(false)">立即注册</button>
        </div>
      </div>

      <div v-if="!this.$store.state.commn.hideReg" class="register-item" >
        <h3 >个人移民者注册</h3>
        <el-form ref="regform" label-width="80px" :rules="rule"  :model="register">
          <el-form-item label="账号" prop="user">
            <el-input  v-model="register.user" autofocus="true" placeholder="请输入手机号码或邮箱"></el-input>
          </el-form-item>
          <el-form-item class="get-vcode" label="验证码" prop="vcode" >
            <el-input   class="get-vcode-ipt" v-model="register.vcode" autofocus="true" placeholder="请输入验证码"></el-input>
            <button class="get-vcode-btn" :disabled="disabledgetvcode" :class="{'disabled':disabledgetvcode}" @click="getvCode"  type="button">
                {{disabledgetvcode?'重新获取('+distime+')':'获取验证码'}}
            </button>
          </el-form-item>
          <el-form-item label="密码" prop="password"  >
            <el-input type="password" v-model="register.password" autofocus="true" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="所在地" prop="areaVal">

            <el-cascader
              :options="options"
              v-model="register.areaVal"
              @active-item-change="handleItemChange"
              :props="props"
            ></el-cascader>
            <!--<select name="" id="" v-model="register.location">-->
              <!--<option value="">11</option>-->
              <!--<option value="">11</option>-->
            <!--</select>-->
          </el-form-item>

          <el-form-item label="邀请码" prop="icode">
            <el-input v-model="register.icode" autofocus="true" placeholder="请输入邀请码,如没有请输入888888"></el-input>
          </el-form-item>

          <el-button @click="handelRegister" type="danger">立即注册</el-button>
        </el-form>
        <div class="register">
          <p><span>已有账号?</span><a @click="hideReg(true)">立即登录</a></p>
        </div>
      </div>

      <div>
        <div class="close" @click="closeDialog">x</div>
        <div class="app">
          <img src="../../../assets/img/ios.jpg" alt="">
          <p>扫码下载APP</p>
          <p>海外投资项目不错过</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import {listByPid} from '@/api/userInfo'
  import {phoneReg,emailReg} from '@/utils/validate'
  import {login,register,getCode,forgetPassword} from '@/api/user'


    export default {
        name: "app-dialog",

        computed:{ //计算省市
            provinceName(){
                return this.register.areaVal[0]==undefined?null:this.options[this.register.areaVal[0]].label;
            },
            provinceId(){
                return this.register.areaVal[0]==undefined?null:this.options[this.register.areaVal[0]].value;

            },
            cityName(){
              return this.register.areaVal[1]==undefined?null:this.options[this.register.areaVal[0]].cities[this.register.areaVal[1]].label;
            },
            cityId(){
              return this.register.areaVal[1]==undefined?null:this.options[this.register.areaVal[0]].cities[this.register.areaVal[1]].value;
            }
        },
        data(){
          const validateUsername = (rule, value, callback) => {

            if (!value) {
              callback(new Error("账号不能为空"));
            } else {
              if (phoneReg(value) || emailReg(value)) {
                 callback();
              } else {
                callback(new Error("请输入正确的账号,手机号码或邮箱"));
              }
            }
          };
          const validateVcode= (rule, value, callback) => {
            if (!value) {
              callback(new Error("验证码不能为空"));
            }
            callback();

          };

          const validatePwd= (rule, value, callback) => {
            if (!value) {
              callback(new Error("密码不能为空"));
            }else if(value.length<6){
              callback(new Error("密码长度必须大于6位"));
            }
            callback();

          };

          const validateArea = (rule, value, callback) => {

            if (!value) {
              callback(new Error("密码不能为空"));
            }else if(value.length<6){
              callback(new Error("密码长度必须大于6位"));
            }
            callback();

          };


          return {
            options:[],
            props: {
              value: 'index',
              children: 'cities'
            },


            form:{
              username:'',
              password:'',
            },
            register:{
              user:'',
              vcode:'',
              password:'',
              location:'',
              icode:'',
              areaVal:[],
            },
            showLogin:true,
            disabledgetvcode:false,
            distime:60,
            timer:null,

            rule: {
              user: [{ required: true, validator: validateUsername, trigger: "blur" }],
              vcode : [{ required: true, trigger: "blur" , validator: validateVcode}],
              password:[{ required: true, trigger: "blur" , validator: validatePwd}],
              icode:[{ required: true, trigger: "blur" , message:"请输入邀请码"}],
              areaVal:[{ required: true, message: '请选择区域', type:'array',trigger: 'change',}]
            },

          }
        },
        methods:{
          getCity(id){
            listByPid(id).then(res=>{
              this.options=res.body.map((item,index)=>{
                return {
                  index:index,
                  label:item.district,
                  value:item.id,
                  lev:item.level,
                  pid:item.pid,
                  cities:[]
                }
              });
            });
          },
          handleItemChange(idx){
            let item = this.options[idx];
            listByPid(item.value).then(res=>{
              item.cities = res.body.map((item,index)=>{
                return {
                  index:index,
                  label:item.district,
                  value:item.id,
                  lev:item.level,
                  pid:item.pid
                }
              });
            });
          } ,

          getvCode(){
            this.$refs.regform.validateField('user', (p) =>{
              if(p==""){
                getCode(this.register.user).then(res=>{
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

          closeDialog(){
            store.dispatch('ToggleDialog', false);
          },

            hideReg(bool){
              store.dispatch('ToggleReg', bool);
            },

            forget(){
              this.$router.push({path: '/forget'});
              store.dispatch('ToggleDialog', false);
            },

          logins(form){
           if(form.username==''){
             this.$message.error('账号或密码不能为空');
             return false
           }

           if(form.password==''){
             this.$message.error('账号或密码不能为空');
             return false
           }

            this.$store.dispatch('Login', form).then(() => {

              store.dispatch('ToggleLogin', true);
              store.dispatch('ToggleDialog', false);

              this.$message({
                message: '登录成功',
                type: 'success'
              });
              this.$router.push({path:this.$route.fullPath,query:{hash:new Date().getTime()}});
            }).catch(() => {
              store.dispatch('ToggleLogin', false);

            })


          },

          handelRegister(){
            this.$refs.regform.validate(valid => {
              if (valid) {

                register(
                  this.register.user,
                  this.register.password,
                  this.register.icode,
                  this.register.vcode,
                    this.provinceId,
                    this.provinceName,
                    this.cityId,
                    this.cityName,
                ).then(res=>{
                    store.dispatch('ToggleDialog', false);
                    this.$refs.regform.resetFields();
                    this.$message({
                      message: '注册成功',
                      type: 'success'
                    });
                })

              } else {
                console.log('error submit!!')
                return false
              }
            })

          }

        },

       mounted(){

         this.getCity();

       }


    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dialog{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.4);
    z-index:1001;
    .dialog-item{
      width:600px;
      height:380px;
      border-radius: 5px;
      background:#fff;
      margin:0 auto;
      margin-top:100px;
      display: flex;
      .el-button{
        width:318px;margin-left:41px;display: block;margin-top:40px
      }

      .el-input{
        width:280px
      }


    >div{
      &:nth-child(1){
         width:379px;
        h3{
          text-align: center;
          color:#f56c6c;
          margin-bottom: 40px;
        }

        .options{
          width:320px;
          color:#606266;
          font-size: 13px;
          margin-left: 40px;
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          a{
            color:#4083e5
          }

        }
        .register{
          width:100%;
          background:#ffe8e8;
          height:40px;
          margin-top: 24px;
          border-radius: 0 0 0 5px ;
          text-align: right;
          padding-right:20px;
          button{
            height:30px;
            width:80px;
            color:#ee5c59;
            background:rgba(0,0,0,0);
            border:1px solid #f56c6c;
            border-radius: 3px;
            font-size: 12px;
            margin-top: 5px;
            cursor: pointer;
            outline: none;
            position: relative;
            //隐藏溢出的径向渐变背景
            overflow: hidden;
            &:after {
              content: "";
              display: block;
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              pointer-events: none;
              //设置径向渐变
              background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
              background-repeat: no-repeat;
              background-position: 50%;
              transform: scale(10, 10);
              opacity: 0;
              transition: transform .3s, opacity .5s;
            }
            &:active:after {
              transform: scale(0, 0);
              opacity: .3;
              //设置初始状态
              transition: 0s;
            }
            &:hover{
              background:#ee5c59;
              color:#fff;
              transition:.3s all;
            }
          }
        }
      }
      &:nth-child(2){
        width:221px;
        text-align: center;
        background:#ee5c59;
        position:relative;
        .close{
          width:30px;
          height:30px;
          border:1px solid #000;
          text-align: center;
          line-height:24px;
          border-radius: 50%;
          background:#fff;
          position:absolute;
          right:-16px;
          top:-16px;
          cursor: pointer;
          color:#000;
          transition: .3s all;
          &:hover{
            color:#fff;
            background:#000;
          }
        }
        .app{
          color:#fff;
          margin-top: 60px;
          p{
            &:nth-child(3){
              font-size: 14px;
            }
          }
        }
       }
      }

      .register-item{
        h3{
          margin-bottom: 20px!important;
        }

        .el-form-item{
          margin-bottom:17px;

          .el-input{
            width:280px
          }

          .get-vcode{
            /*border:1px solid red;*/


            position:relative;
            &-ipt{
              width:170px
            }
            &-btn{
              position:absolute;
              width:100px;
              height:40px;
              color:#ee5c59;
              background:rgba(0,0,0,0);
              border:1px solid #f56c6c;
              border-radius: 3px;
              font-size: 12px;
              outline: none;
              cursor: pointer;
              top:-20px;
              right:18px;
              &:after {
                content: "";
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                pointer-events: none;
                //设置径向渐变
                background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
                background-repeat: no-repeat;
                background-position: 50%;
                transform: scale(10, 10);
                opacity: 0;
                transition: transform .3s, opacity .5s;
              }
              &:active:after {
                transform: scale(0, 0);
                opacity: .3;
                //设置初始状态
                transition: 0s;
              }
              &:hover{
                background:#ee5c59;
                color:#fff;
                transition:.3s all;
              }
              &.disabled{
                color:#ccc;
                background:rgba(0,0,0,0);
                border:1px solid #ccc;
                &:hover{
                  background:rgba(0,0,0,0);
                }
              }

            }
          }

          select{
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            width:280px;
            line-height: 40px;
            outline: 0;
            padding: 0 15px;
          }

        }

        .register{
          margin-top: 25px;
          p{
            line-height:40px;
            font-size:13px;
            span{
              margin-right: 3px;
              color:#666;
            }
            a{
              color:#ee5c59
            }
          }
        }

        button{
          margin-top: 20px;
        }
      }


    }
    .reg{
      height:453px !important;
    }




  }
</style>
