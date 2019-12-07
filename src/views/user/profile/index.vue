<template>
    <div class="profile">
              <div class="header_box">
                <a :class="{'active':navActive==0}" @click="navActive=0">个人资料</a>
                <!--<a @click="navActive=1" :class="{'active':navActive==1}">修改密码</a>-->
              </div>

              <div class="bodybox">
                    <div class="profilebox" v-if="navActive==0">
              <el-form ref="profile" label-width="80px" :rules="rule"  :model="list">

                <el-form-item prop="avatarImgUrl">
                      <div class="formitem">

                          <span class="formlabel">修改头像 </span>

                          <div class="formcontent">
                            <img :src="IMG_URL+list.avatarImgUrl" class="avatar" alt="">

                            <div class="upbtnbox" @click="$refs.file_up.click()">
                              <a>上传头像</a>
                                <input type="file" ref="file_up" style="display: none">
                              <p class="subtext">建议照片像素200*200 大小2M以内 格式为JPG/PNG</p>
                            </div>


                          </div>

                      </div>

                  </el-form-item>

                <el-form-item prop="realName">
                      <div class="formitem">

                        <span class="formlabel">真实姓名:</span>

                        <div class="formcontent">
                          <el-input type="text" v-model="list.realName"></el-input>
                          <span class="placehoder">* </span>
                          <span class="placehoder_sub"> 请输入真实姓名以核实身份 确保你的权益!</span>
                        </div>

                      </div>

                </el-form-item>

                <el-form-item prop="nickName">
                      <div class="formitem">

                        <span class="formlabel">用户昵称:</span>

                        <div class="formcontent">
                          <el-input type="text" class="dis" v-model="list.nickName"></el-input>

                          <span class="placehoder_sub"> 请输入一个你认为很酷的昵称</span>
                        </div>

                      </div>
                </el-form-item>
                <el-form-item prop="idCardNo">
                      <div class="formitem">

                        <span class="formlabel">身份证号:</span>

                        <div class="formcontent">
                          <el-input type="text"   v-model="list.idCardNo"></el-input>
                          <span class="placehoder">* </span>
                          <span class="placehoder_sub"> 请输入身份证号码</span>
                        </div>

                      </div>

                </el-form-item>
                <el-form-item prop="phoneNumber">
                      <div class="formitem">

                        <span class="formlabel">手机号码:</span>

                        <div class="formcontent">
                          <el-input type="text"  v-model="list.phoneNumber"></el-input>
                          <span class="placehoder"> *</span>

                        </div>

                      </div>
                </el-form-item>
                <el-form-item prop="email">
                      <div class="formitem">

                        <span class="formlabel">邮箱地址:</span>

                        <div class="formcontent">
                          <el-input type="text"  class="big" v-model="list.email"></el-input>
                          <span class="placehoder"> *</span>

                        </div>

                      </div>
                </el-form-item>


                <el-form-item prop="areaVal">
                      <div class="formitem">

                        <span class="formlabel">所在地址:</span>

                        <div class="formcontent">

                          <el-cascader
                            :options="options"
                            v-model="list.areaVal"
                            @active-item-change="handleItemChange"
                            :props="props"
                          ></el-cascader>

                          <span class="placehoder"> *</span>

                        </div>

                      </div>
                </el-form-item>

                <!--<el-form-item prop="tags">-->
                      <!--<div class="formitem">-->

                        <!--<span class="formlabel">个人标签:</span>-->

                        <!--<div class="formcontent">-->

                          <!--<select class="citybox" name="city">-->
                            <!--<option value="0">111</option>-->
                          <!--</select>-->

                          <!--<span class="placehoder_sub"> 多项选择</span>-->

                        <!--</div>-->

                      <!--</div>-->

                <!--</el-form-item>-->
                <el-form-item prop="signature">
                      <div class="formitem">

                        <span class="formlabel">个性签名:</span>

                        <div class="formcontent">
                          <el-input type="text"  class="big" v-model="list.signature"></el-input>

                        </div>

                      </div>
                </el-form-item>
                <el-form-item prop="introduction">
                      <div class="formitem">
                        <span class="formlabel">个人介绍</span>
                      </div>

                      <div class="editbox">
                        <quill-editor
                          v-model="list.introduction"
                          ref="myQuillEditor"
                          :options="editorOption"

                          style="height: 380px"
                          >
                        </quill-editor>
                      </div>
                </el-form-item>
              </el-form>
                      <div class="subbox">
                            <button style="cursor: pointer" @click="submit()">提交修改</button>
                            <button  style="cursor: pointer" @click="$router.push('/')">返回</button>
                      </div>


                    </div>
                    <div class="pwdbox" v-else>修改资料页面</div>
              </div>
    </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import {userInfo,listByPid} from '@/api/userInfo'
  import {uploadAvatar,getUserLabel,editInfo} from '@/api/user'
  import {IdCReg,phoneReg,emailReg} from '@/utils/validate'
  import store from '@/store'
  export default {
        name: 'profile',
        components: {

        },
        data() {

          const validateIdCard = (rule, value, callback) => {

            if (!value) {
              callback(new Error("身份证号码不能为空"));
            }else if(!IdCReg(value)){
              callback(new Error("身份证号码格式不正确"));
            }
            callback();
          };
          const validatePhone = (rule, value, callback) => {

            if (!value) {
              callback(new Error("手机号码不能为空"));
            }else if(!phoneReg(value)){
              callback(new Error("手机号码格式不正确"));
            }
            callback();
          };

          const validateEmail = (rule, value, callback) => {

            if (!value) {
              callback(new Error("邮箱不能为空"));
            }else if(!emailReg(value)){
              callback(new Error("邮箱格式不正确"));
            }
            callback();
          };

          const validateArea = (rule, value, callback) => {

            if (value.length!=2) {
              callback(new Error("请正确选择区域"));
            }
            callback();
          };



            return {
              navActive:0,
              editorOption:{},
              imgID:-1,
              list:{
                avatarImgUrl:'',
                realName:'',
                nickName:'',
                idCardNo:'',
                phoneNumber:'',
                email:'',
                tagList:[],
                provinceId: 0,
                provinceName:"",
                cityId: 0,
                cityName: "",
                id:-1,
                introduction:"",
                areaVal:[]
              },
              options:[],
              props: {
                value: 'index',
                children: 'cities'
              },

              rule: {
                realName: [{ required: true, message:"请输入姓名", trigger: "blur" }],
                idCardNo:[{ required: true, trigger: "blur",validator:validateIdCard}],
                phoneNumber:[{ required: true, trigger: "blur",validator:validatePhone}],
                email:[{ required: true, trigger: "blur",validator:validateEmail}],
                areaVal:[{ required: true, trigger: "blur",validator:validateArea}],

              }

            }
        },
        methods: {
          getCity(id){
            listByPid(id).then(res=>{
                this.options=res.body.map((item,index)=>{

                    if(this.list.provinceId){
                      if(item.id==this.list.provinceId){
                        this.list.areaVal[0] = index;
                        listByPid(item.id).then(res2=>{
                          this.options[index].cities = res2.body.map((item2,index2)=>{
                            if(item2.id==this.list.cityId){
                              this.list.areaVal[1] = index2;
                            }
                            return {
                              index:index2,
                              label:item2.district,
                              value:item2.id,
                              lev:item2.level,
                              pid:item2.pid
                            }
                          });
                        })
                      }
                    }

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
          },
          getUserInfo(){
            userInfo().then(res=>{
              this.list=res.body;
              this.list.areaVal=[];
              this.getCity();
              this.$nextTick(function() {
                this.$refs.myQuillEditor.quill.enable(true);
                this.$refs.myQuillEditor.quill.blur();
              });
            });

          },
          submit(){
            this.$refs.profile.validate(valid => {
                if(valid){
                    let config = {
                      "realName":this.list.realName,
                      "idCardNo":this.list.idCardNo,
                      "nickName" : this.list.nickName,
                      "phoneNumber":this.list.phoneNumber,
                      "email" : this.list.email,
                      "provinceId" :this.options[this.list.areaVal[0]].value,
                      "provinceName" : this.options[this.list.areaVal[0]].label,
                      "cityId":this.options[this.list.areaVal[0]].cities[this.list.areaVal[1]].value,
                      "cityName":this.options[this.list.areaVal[0]].cities[this.list.areaVal[1]].label,
                      "signature":this.list.signature,
                      "introduction":this.list.introduction,
                      "tagIds":[1,2]
                    };

                    if(this.imgID!=-1){
                      config.imageFileId=this.imgID;
                    }else{
                      config.imageFileId=0
                    }

                    //editInfo()
                  editInfo(config).then(res=>{
                      if(res.header.code=="000"){
                        store.dispatch('GetInfo').then(res=>{
                            this.$message({
                              type:"success",
                              message:"修改成功"
                            });
                        });
                      }
                  })
                }else{
                    this.$message.error("请检查信息并完整填写");
                }
            });
          }

        },
        mounted(){
          this.$refs.myQuillEditor.quill.enable(false);
          this.getUserInfo();

          this.$refs.file_up.onchange=e=> {

              let _this = e.target;
              let file = _this.files[0];

              if(!file){
                return false;
              }

               let re=/(.[.]bmp)$|(.[.]gif)$|(.[.]jpg)$|(.[.]png)$|(.[.]jpeg)$/i;
               if(!re.test(file.name)){
                 this.$message.error('只支持bmp,gif,jpg,png,jpeg格式文件，请重新上传');
                 _this.value="";
                 return false;
               }

              if(file.size>1024*2*1024){
                this.$message.error('文件必须小于2M');
                _this.value="";
                return false;
              }

              this.$confirm('确定上传头像？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '上传',
                cancelButtonText: '放弃上传'
              }).then(() => {
                  let fd = new FormData();
                  fd.append('file',file);
                  fd.append('bizType',"006");
                uploadAvatar(fd).then(res=>{
                    if(res.header.code=="000"){
                      //this.list.avatarImgUrl = this.IMG_URL+res.body.fileUrl;
                      this.list.avatarImgUrl = res.body.fileUrl;
                      this.imgID=res.body.fileId;
                    }
                });

              })
              .catch(action => {
                _this.value="";
              });

          }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .profile{
        background:#fff;
        .header_box{
          height: 74px;
          border-bottom: 1px #b5b5b5 solid;
          a{
            display: inline-block;
            height: 100%;
            font-size: 30px;
            width: 235px;
            text-align: center;
            line-height: 74px;
            &.active{
              color: red;
            }
          }



        }


      .editbox{
        height: 455px;
        margin-top:15px;
        padding: 0 15px;
      }


      .profilebox{
        /deep/ .el-form-item__content{
          margin-left: 0!important;
        }
        /deep/ .el-form-item{
          margin-bottom: 0!important;
        }
        /deep/ .el-form-item__error{
          left: 150px;
          top: 80%;
        }
        /deep/ .el-cascader .el-icon-arrow-down.is-reverse{
          transform: rotateZ(180deg) translateY(-10px);
        }


        .formitem{
          padding-left:50px;
          margin: 14px 0;
          .formlabel{
            font-size: 18px;
            vertical-align: middle;
            margin-right: 20px;
          }


          .formcontent{
            display: inline-block;
            vertical-align: middle;

            /deep/ .el-cascader{
              input{
                border: 2px #aaaaaa solid;
                width: 228px;
                height: 30px;
                border-radius: 3px;
              }

            }

            img.avatar{
              border-radius: 50%;
              display: inline-block;
              vertical-align: middle;
              width: 125px;
              height:125px;
              margin-left: 5px;
            }

            .change-on-select{
              border: 2px #aaaaaa solid ;
            }

            .upbtnbox{
              display: inline-block;
              vertical-align: middle;
              position: relative;
              top:25px;
              left: 85px;
              a{
                width: 115px;
                height: 38px;
                display: block;
                font-size: 19px;
                text-align: center;
                line-height: 38px;
                border-radius: 5px;
                background-color: #aaaaaa;
                color: white;
              }

              .subtext{
                color: red;
                font-size: 14px;
              }
            }

            /deep/ .el-input{
              width: 228px;
              height: 30px;
              margin-right: 39px;
              &.dis{
                margin-right: 60px;
              }
              &.big {
                width: 267px;
                input{
                  width: 267px;
                }
              }
            }


           /deep/ input{
              border: 2px #aaaaaa solid;
              width: 228px;
              height: 30px;
              border-radius: 3px;
              outline: none;
             padding-left: 5px;
              margin-right:39px;

            }

            select::-ms-expand { display: none; }
            .citybox{
              border: 2px #aaaaaa solid;
              width: 228px;
              height: 30px;
              border-radius: 3px;
              outline: none;
              appearance:none;
              -moz-appearance:none;
              -webkit-appearance:none;
              text-indent: 10px;
              margin-right:39px;
              background-image:url("../../../assets/img/sel_arrow.png") ;
              background-position: right;
              background-repeat:no-repeat ;
              option{
                text-indent: 5px;
                padding-left: 20px;
              }
            }

            .placehoder{
              color: red;
              margin-right: 5px;
            }
            .placehoder_sub{
              color: #d6d6d6;
            }
          }



        }

        .subbox{
          width: 388px;
          margin: 97px auto;
          margin-bottom: 0;
          padding-bottom: 75px;
          button{
            width: 118px;
            height: 45px;
            outline: none;
            background: #fa7f06;
            border: none;
            color: white;
            font-size: 21px;
            border-radius: 5px;
            &:nth-last-of-type(1){
              margin-left: 143px;
            }
          }
        }
      }
    }
</style>
