import request from '@/utils/request'

export function login(username,password) {
  return request({
    url: '/customer-login',
    method: 'post',
    params:{
      username,
      password
    },
    headers: {
      'Content-Type':"application/x-www-form-urlencoded"
    }
  })
}

export function uploadAvatar(fd) {


  return request({
    url: '/common/upload',
    method: 'post',
    data:fd,
    headers: {
      //'Content-Type':'multipart/form-data'
      'Content-Type':'application/x-www-form-urlencoded'
    }
  })

}


export function register(username,password,inviteCode,verifyCode,provinceId,provinceName,cityId,cityName) {
  return request({
    url: '/customer-registration',
    method: 'post',
    data:{
      username,password,inviteCode,verifyCode,provinceId,provinceName,cityId,cityName
    }
  })
}


export function getCode(phoneOrEmail) {
  return request({
    url: '/sendSmsOrEmailVerifyCode',
    method: 'get',
    params:{
      phoneOrEmail,
      appid:3
    }
  })
}

export function validateEoP(phoneOrEmail) {
  return request({
    url: '/commons/customer/validate-emailOrPhone/'+phoneOrEmail,
    method: 'get',
    params:{
    }
  })
}

export function forgetPassword(phoneOrEmail,verifyCode,newPassword,confirmPassword) {
  return request({
    url: '/commons/customer/forgetPassword',
    method: 'post',
    data:{
      phoneOrEmail,verifyCode,newPassword,confirmPassword
    }
  })
}

export function getUserLabel() {
  return request({
    url: '/commons/individualLabel',
    method: 'get'
  })
}




export function editInfo(data) {
  return request({
    url: '/customer/editCustomerInfo',
    method: 'post',
    data
  })
}

export function getInfo(customerId) {
  return request({
    url: '/public/details',
    method: 'get',
    params: { customerId }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

//个人收藏
export function myFavoriteProject(config) {
  return request({
    url: '/user/my-favorite-project',
    method: 'get',
    params:config
  })
}

//取消收藏项目
export function cancelFavProject(id) {
  return request({
    url: '/user/cancel-fav-project',
    method: 'get',
    params:{projectId:id}
  })
}

export function setFavProject(projectType,projectId) {
  return request({
    url: '/user/fav-project',
    method: 'get',
    params:{projectType,projectId}
  })
}
//移民评估

export function getIAQ() {
  return request({
    url: '/commons/getImmigrantAssessQuestion',
    method: 'get'

  })
}

//保存移民


export function keepImmigrantAssess(immigrantNation,ages,academicDegree,profession,jobName,managerialExperiences,corporateStock,familyAssets) {
  return request({
    url: '/customer/keepImmigrantAssess',
    method: 'post',
    data:{
      immigrantNation,ages,academicDegree,profession,jobName,managerialExperiences,corporateStock,familyAssets
    }

  })
}


//获取移民


export function ImmigrantAssess() {
  return request({
    url: '/customer/immigrantAssess',
    method: 'get'
  })
}

//贷款
export function getLoans() {
  return request({
    url: '/user/getImUsersLoans',
    method: 'get'
  })
}


//增值服务

export function getVip(type) {
  return request({
    url: '/user/getAppreciation',
    method: 'get',
    params:{type}
  })
}
