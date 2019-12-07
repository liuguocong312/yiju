// 个人信息中心
import request from '@/utils/request'

export function userInfo() {
  return request({
    url: '/customer/getCustomerDetails',
    method: 'get',
  })
}

//获取各省份
export function listByPid(id) {

  let pid = id||1;
  let fd = new FormData();

  fd.append('pid',pid);

  return request({
    url: '/commons/rcDistrict-listByPid',
    method: 'post',
    data:fd,
    headers: {
      'Content-Type':'multipart/form-data'
    }
  })

}

