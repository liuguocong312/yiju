import request from '@/utils/request'

export function orders(type,pno) {
  return request({
    url: '/customer/orders',
    method: 'get',
    params:{
      orderStatus:type,
      page:pno,
      pageSize:10
    }
  })
}






