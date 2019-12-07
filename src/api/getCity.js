import request from '@/utils/request'

export function getHotCity() {
  return request({
    url: '/commons/hotCity',
    method: 'get',
    params: {}
  })
}



